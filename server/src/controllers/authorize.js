import axios from "axios";
import UserModel from '../models/user.js'
import CartModel from "../models/cart.js";
import send from '../utils/mail/send.js';



const auth0Config = {
    domain: "dev-zcla3tzkhoocgn1y.us.auth0.com",
    clientId: "4XnRrKDQ94UFtWYnHpfnjQ5n3WXApUNm",
    audience: "https://dev-zcla3tzkhoocgn1y.us.auth0.com/api/v2/",
    scope: "read:current_user update:current_user_metadata",
};
const origins = {
    client: ["http://localhost:3000", "http://localhost:3001"],
    admin: ["http://localhost:3000", "https://dashboard-ab660.web.app"],
}

// name,sub,picture,email,ip,phone,location,role,status
// name,sub,picture,phone,email,ip,location,role,status
const compareUser = async (newUser) => {

    const validate = await validator(newUser);

    if (!validate) {
        throw new Error('User data not valid')
    }
    const { sub } = validate
    const user = await UserModel.findOne({ sub: sub });

    console.log('user: ', user)

    if (!user || user === null) {//if user not exist
        await send({ user: validate, body: { type: "welcome", issue: "welcome to chiccloset" } })//send welcome email
        return createNewUser(validate);
    } else {//if user exist
        return updateUser(user, validate);
    }
}
const validator = async (user) => {
    console.log(user)
    try {
        const { name, user_id, picture, email, email_verified, given_name } = user;
        if (!name || !user_id || !picture || !email || !email_verified) { throw new Error('User data not valid') }

        const newUser = {
            fullName: name,
            name: given_name,
            sub: user_id,
            picture: picture,
            email: email,
            role: 'user',
            status: 'active',
            email_verified: email_verified
        }
        return newUser;
    } catch (error) {
        console.log('error: in validator')
        throw new Error('User data not valid')
    }
}
const updateUser = async (user, newUser) => {
    try {
        const { name, picture, email, email_verified } = newUser;
        const userObj = {
            name: name,
            picture: picture,
            email: email,
            email_verified: email_verified
        }

        const updatedUser = await UserModel.findByIdAndUpdate(user._id.toString(), userObj, { new: true });
        return updatedUser;
    } catch (error) {
        console.log('error: in updateUser')

        throw new Error('User data not valid')
    }

}
const createNewUser = async (newUser) => {
    try {
        const save = new UserModel(newUser);
        const newCart = new CartModel({ id: save._id });
        await save.save();

        console.log('new user saved and welcome email send')
        await newCart.save();
        console.log('new user saved')
        return save;
    } catch (error) {
        console.log('error: in saveUserAfterCompare')
        throw new Error('User data not valid')
    }

}

export const userAuthorize = async (req, res) => {
    if (Object.keys(req.headers).find(key => key === 'authorization') === undefined) { res.status(401).json({ message: "Unauthorized", error: 'token or userId not found' }); }
    const token = req.headers.authorization?.split(' ')[1];
    // const origin = req.headers.origin;
    const { user, origin } = req.headers
    if (!token || !user) { res.status(401).json({ message: "Unauthorized", error: 'token or userId not found' }); }

    try {

        const response = await axios.get(`https://${auth0Config.domain}/api/v2/users/${user}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const userData = response.data;
        const newUser = await compareUser(userData);

        const mixData =  {...userData,...newUser._doc} 

        //  if(newUser===null){res.status(401).json({message:"Unauthorized",error:'user not found'});}
        //  if(newUser.role==='admin'&&origins.admin.includes(origin)){
        //     res.status(201).json({message:"Authorized",user:userData});

        //  }else if(newUser.role==='user'&&origins.client.includes(origin)){
        //   res.status(201).json({message:"Authorized",user:userData});
        //  }else{
        //         res.status(401).json({message:"Unauthorized",error:'user not found'});
        //     }
        res.status(201).json({ message: "Authorized", user: mixData });
    } catch (err) {
        res.status(401).json({ message: "Unauthorized", error: err });
    }
}