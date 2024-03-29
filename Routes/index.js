const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require("fs");

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.cookies.loggedInUser) {
        res.send('');
    } else {
        fs.readFile('./Views/login.html', 'utf8', (err, data) => {
            if(err){
                res.send('some err occured ',err);
              }
              res.send(data);
            });
    }
});

module.exports = app;
