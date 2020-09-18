const multer  = require('multer')
const express = require('express');
const router = express.Router();
const mail= require('./genericMailer');

var upload  = multer( { 
    storage: multer.memoryStorage()
}).array('attachment',4);


router.post('/', (req,res) => {
    upload(req,res, (error) => {
      //  console.log(req.files);        
        if (error) {
           console.log(error); res.json({error_code:1,err_desc:"Upload Error"})
            return
        }
        try{
            let mailOptions= {
                to:         req.body.to,
                subject:    req.body.subject,
                text:       req.body.text
            }
            if(req.files.length>0)
            {
                mailOptions.attachments =[];
                for (var i = 0; i < req.files.length; i++) {
                   var obj=  {
                        filename: req.files[i].originalname,
                        content: req.files[i].buffer,
                        encoding: req.files[i].encoding
                    }
                    console.log(obj.content.length);
                    // Check for file Size
                    if(obj.content.length>200000000)
                    {   console.log(obj.content.length);
                        throw 'LENGTH EXCEEDED'; 
                    }
                     mailOptions.attachments.push(obj); 
                }
            }
            mail.sendMail(mailOptions);
            res.json({success:true, desc:"Email has been send"});
        }catch(e){
            console.log(e);
            res.json({error_code:1,err_desc:"Email can't be send"});
        }
    });
});

module.exports = router