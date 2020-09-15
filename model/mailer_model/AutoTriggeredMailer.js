const nodemailer = require('nodemailer');
const fs = require('fs');
const myConsole = new console.Console(fs.createWriteStream('./Errorlogs.logs'));

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
        expires: 1484314697598
    }
 });
 
 
function autoTrigger(Email, Name){
    let mailOptions={
        from: process.env.EMAIL,
        to: Email,
        subject: 'NOTIFICATION ',
        text: 'Hi '+Name+',\n\n'+'We have Successfully Received your file\n\n\n Warm Regards\n Starwisp'
    }
    transporter.sendMail(mailOptions,function(err,data){
        if(err){myConsole.log('AutoMailer'+ err);
         }
        else 
        {    }
    });
}

module.exports = autoTrigger;