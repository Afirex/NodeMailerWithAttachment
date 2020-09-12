const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const express = require('express');
const bodyParser = require('body-parser');

const multer  = require('multer')

const path = require('path');


const app = express();
require('dotenv').config()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// in multer , we make a copy of attachment on server, and send that copy , because
// not all browser will give you complete path

 let Storage = multer.diskStorage({
     destination: function(req,file,callback){
         callback(null,'./attachment')
     },
     filename: function(req,file,callback){
         callback(null,"attach_"+file.originalname); //just a string name for files uploaded
     }
 });

var upload = multer({
    storage: Storage
}).single('attachment');


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


app.post('/', function (req, res) {
    upload(req,res,function(err)
    {
        if(err){console.log(err); res.write('OOOPS!! Something is wrong with the network')}

       // console.log(req.body);
        let To = req.body.to;
        let Subject= req.body.subject;
        let Text= req.body.text;
        var pathy= req.file==undefined? 'no' :req.file.path;
        if(pathy==='no')
        {        
        let mailOptions={
            from: 'afirexnum1@gmail.com',
            to: To,
            subject: Subject,
            text: Text
        }
        transporter.sendMail(mailOptions,function(err,data){
            if(err) {console.log(err);}
            else 
            { console.log('Mail Sent');}
        });
     }


     else{     
        let mailOptions={
            from: 'afirexnum1@gmail.com',
            to: To,
            subject: Subject,
            text: Text,
            attachments: [        
                {   
                    path: pathy
                }
        ]
        }
        
     transporter.sendMail(mailOptions,function(err,data){
        if(err) {console.log(err);}
        else 
        { console.log('Mail Sent');}
    });
     }


    });
    res.send('Request done');

});

app.get('/',function(req,res){
    res.sendFile('/index.html');
});
app.listen(5000,function(req,res){
    console.log(5000);
});