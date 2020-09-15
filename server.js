const express = require('express');
const bodyParser = require('body-parser');


const urlmailer = require('./model/mailer_model/urlmailer');
const autotrigger = require('./model/mailer_model/AutoTriggeredMailer');

const app = express();

require('dotenv').config()
app.use(bodyParser.urlencoded({extended: true}));

app.use('/mail',urlmailer);

const Email = 'insurgentforge@gmail.com ';
const Name = 'Aftab';

autotrigger(Email,Name);

app.listen(process.env.PORT || 5000,function(req,res){
    console.log(5000);
});
