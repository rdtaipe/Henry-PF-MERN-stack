import nodemailer from 'nodemailer'


export const emailerConfig = async (email, name) => {
    
    try {
    //const {msj}=req.query
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'chicclosethenry@gmail.com', // generated ethereal user
        pass: process.env.EMAILPASS, // generated ethereal password
      },
    });

transporter.sendMail({
      from: '"Welcome ' + name + '" <chicclosethenry@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Welcome " + name, // Subject line
      // text:  // plain text body
      html: 
      `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
          <style>
              p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
              h1{ font-size: 30px !important;}
              h2{ font-size: 25px !important;}
              h3{ font-size: 18px !important;}
              h4{ font-size: 16px !important;}
              p, a{font-size: 15px !important;}
      
              .claseBoton{
                  width: 30%;
                      background-color: #2f0361;
                      border: 2px solid #5a09a7;
                      color: rgb(255, 255, 255); 
                      padding: 16px 32px;
                      text-align: center;
                      text-decoration: none;
                      font-weight: bold;
                      display: inline-block;
                      font-size: 16px;
                      margin: 4px 2px;
                      transition-duration: 0.4s;
                      cursor: pointer;
              }
              .claseBoton:hover{
                  background-color: #fffcfc;
                  color: #000000;
              }
              .imag{
                  width: 20px;
                  height: 20px;
              }
              .contA{
                  margin: 0px 5px 0 5px;
              }
              .afooter{
                  color: #ffffff !important; 
                  text-decoration: none;
                  font-size: 13px !important;
              }
          </style>
      </head>
      <body>
          <div style="width: 100%; background-color: #e3e3e3;">
              <div style="padding: 20px 10px 20px 10px;">
                  <!-- Imagen inicial -->
                  <div style="background-color: #1e023d; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
                      <img src="Link de cloudinary" alt="" style="width: 200px; height: 60px;">
                  </div>
                  <!-- Imagen inicial -->
      
                  <!-- Contenido principal -->
                  <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                      <h1>Thank you for register on ChicCloset</h1>
                      <p>Welcome to the ChicCloset Family, we invite
                           you to check our website and see all of the offers
                           we have for you
                      </p>
      
                      <!-- Gracias -->
                      <p>Thanks you so much.</p>
                      <p style="margin-bottom: 50px;"><i>Sincerely:</i><br>The ChicCloset Team</p>
      
                      <!-- Botón -->
                      <a class="claseBoton" href="Link del deploy">ChicCloset Website</a>
                  </div>
                  <!-- Contenido principal -->
      
                  <!-- Footer -->
                  <div style="background-color: #1e023d; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
      
                      <h4>Support</h4>
                      <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                          Contact us by the following means:<br>
                          Mail: <a class="afooter" href="chicclosethenry@gmail.com">chicclosethenry@gmail.com</a><br>
                      </p>
                      <p style="background-color: #06010e; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                          © 2023 ChicCloset, All rights reserved.
                      </p>
                  </div>
                  
      
      
      
              </div>
          </div>
      </body>
      </html>`
    });
    return 'email enviado con exito'
  } catch (e) {
    console.error(e);
    return 'error email'
  }
}