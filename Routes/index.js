const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require("fs");

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.cookies.auth) {
        fs.readFile('./Views/postmessage.html', 'utf8', (err, data) => {
            if(err){
                res.send('some err occured ',err);
              }
              res.send(data);
            });
            
    } else {
        fs.readFile('./Views/login.html', 'utf8', (err, data) => {
            if(err){
                res.send('some err occured ',err);
              }
              res.send(data);
            });
    }
});

app.get('/mymessages', (req, res) => {
    if (req.cookies.auth) {
        fs.readFile('./Views/showmessages.html', 'utf8', (err, data) => {
            if(err){
                res.send('some err occured ',err);
              }
              res.send(data);
            });
            
    } else {
        res.send("");
    }
});

module.exports = app;
