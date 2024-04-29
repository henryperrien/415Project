const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require("fs");

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.cookies.auth) {
      fs.readFile('./Views/showmessages.html', 'utf8', (err, data) => {
        if(err){
          res.status(500).send('An error occurred while reading the topics file.');
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

app.get('/addtopic', (req, res) => {
  if (req.cookies.auth) {
      fs.readFile('./Views/createtopic.html', 'utf8', (err, data) => {
          if(err){
              res.send('some err occured ',err);
            }
            res.send(data);
          });
          
  } else {
      res.send("Not Rogged in");
  }
});

app.get('/topics', (req, res) => {
  if (req.cookies.auth) {
       fs.readFile('./Views/topics.html', 'utf8', (err, data) => {
           if(err){
               res.status(500).send('An error occurred while reading the topics file.');
             } else {
               res.send(data);
             }
           });
  } else {
       res.send("Not logged in");
  }
 });


app.get('/post', (req, res) => {
    if (req.cookies.auth) {
            fs.readFile('./Views/postmessage.html', 'utf8', (err, data) => {
              if(err){
                  res.send('some err occured ',err);
                }
                res.send(data);
              });
            
    } else {
        res.send("Not logged in");
    }
});

app.get('/showcookie', function (req, res) {
    mycookies=req.cookies;
    res.send(JSON.stringify(mycookies) + ' <a href="/clearcookie">Delete Cookie</a>');
  
  });

  app.get('/clearcookie', function (req, res) {
    res.clearCookie('auth');
    res.send('Cookie deleted. <a href="/showcookie">Show Cookies</a>')
  });
module.exports = app;
