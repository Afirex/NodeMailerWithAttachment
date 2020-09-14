const express = require('express');
const bodyParser = require('body-parser');
const urlmailer = require('./model/urlmailer');
const autotrigger = require('./model/urlmailer');

const app = express();

require('dotenv').config()
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/mail',urlmailer);

const Email = '';
const Name = '';

autotrigger(Email,Name);

app.listen(process.env.PORT || 5000,function(req,res){
    console.log(5000);
});
