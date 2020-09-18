const nodemailer = require('nodemailer');
const fs = require('fs');
const myConsole = new console.Console(fs.createWriteStream('./Errorlogs.logs',{flags:'a'}));

require('dotenv').config()

var transporter = nodemailer.createTransport({
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
 
 
function sendMail(Msg){
    console.log(Msg);
    transporter.sendMail(Msg,function(err,data){
        if(err){
            myConsole.log('AutoMailer: '+ err);
        }
        else{
            myConsole.log('AutoMailer: '+ `Mail has been send to ${Email}`);
        }
    });
}

module.exports = {
    sendMail: sendMail,
}