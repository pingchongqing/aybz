var express = require('express');
var bzcls = require('./routes/bzcls');
var article = require('./routes/article');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname));


app.use('/bzcls', bzcls);
app.use('/article', article);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.listen(3009,function(){
  console.log('port 3009 is working');
});
