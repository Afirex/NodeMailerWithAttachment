const multer  = require('multer')
const express = require('express');
const rout = express.Router();
const nodemailer = require('nodemailer');

require('dotenv').config()

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

rout.post('/post', function (req, res) {
    upload(req,res,function(err)
   {  var errormsg="";
       if(err)
       {    errormsg+='Client error';  console.log(err);
            res.json({module: errormsg}); 
        }
      
       let To = req.body.to;
       let Subject= req.body.subject;
       let Text= req.body.text;
       var pathy= req.file==undefined? 'no' :req.file.path;

       if(pathy==='no')
       {  // if no file is attached , this segment will be executed     
       
        let mailOptions={
           from: process.env.EMAIL,
           to: To,
           subject: Subject,
           text: Text
       }
       transporter.sendMail(mailOptions,function(err,data){
           if(err){
               //console.log("NoAttachMail: "+err); 
               errormsg+=" "+err; 
               res.json({"Error_msg_NA: ": errormsg}); // _NM denotes mail without attachment
            }
           else 
           { res.json({msg: "Success, Mail Will be Sent if email is correct"});  }
       });
    }

    else{     
       let mailOptions={
           from: process.env.EMAIL,
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
       if(err) { //console.log("tiktik mailWithAttach: "+err); 
       errormsg+=" "+err; 
       res.json({"Error_msg_MA: ": errormsg});   // _M denotes mail with attachment  
      }
       else 
       { res.send({msg: "Success, Mail Will be Sent if email is correct"});}
   });
    }
 
   });
 
}).get('/get',function(req,res){
  //  res.sendFile(__dirname+'\\public\\index.html');
  res.json({'msg': 'You just called GET request, Hi'});
});

module.exports = rout;
