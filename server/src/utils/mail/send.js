import nodemailer from "nodemailer";
import { google } from "googleapis";
import welcome from './welcome.js';
import Order from "./order.js";


const OAuth2 = google.auth.OAuth2;
const gmailConfig = {
    "service": "gmail",
    auth: {
        user: 'chicclosethenry@gmail.com',
        pass: 'ctpixsqrulounfhz',
        clientId: "956005574935-qerrom8npnp0ri09po4scb8cqa6b52gf.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//043kKgV4lnlhlCgYIARAAGAQSNwF-L9IroUobCVvzElkPKMQYGPDuMSRXCY8Q8XMFSiT6FuqBkmphpPxVd-TWR7mdp8eG6FFNV2A"
    }
}


const mailRover = async (callback) => {
    const oauth2Client = new OAuth2(
        gmailConfig.auth.clientId,
        gmailConfig.auth.clientSecret,
        "https://developers.google.com/oauthplayground",
    );
    oauth2Client.setCredentials({
        refresh_token: gmailConfig.auth.refreshToken,
        tls: {
            rejectUnauthorized: false
        }
    });
    oauth2Client.getAccessToken((err, token) => {
        if (err)
            return console.log(err);;
        gmailConfig.auth.accessToken = token;
        callback(nodemailer.createTransport(gmailConfig));
    });

};

const sendEmail = async (mailOptions) => {
    mailRover((transporter) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log({ send: false, message: err });
                return err;
            }
            return info;
        });
    });
};

const send = async ({ model, body, user }) => {
    const types = {
        welcome: welcome,
        order: Order,
        notification: `<div>notification</div>`
    }
    const { html, issue, text, from, to, type,data } = body;

    var newHtml = html ? html : types[type] ? types[type] : undefined;
    var newIssue = issue ? issue : 'undefined';
    var newFrom = from ? from : 'chicclosethenry@gmail.com'
    var newUser = model ? await model.findOne({ email: to }) : user;
    var newTo = to ? to : newUser.email;
    if (!newUser) {
        throw new Error('User not found')
    }

    if ((newHtml === undefined && text === undefined)) {
        throw new Error('Email not found')
    }

    const mailOptions = {
        from: newFrom,
        to:newTo,
        subject: newIssue,
        html: newHtml(newUser,data),
        text: text
    };

    return sendEmail(mailOptions);
}



export default send;