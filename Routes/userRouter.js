const express = require('express');
const app = express();
const User = require('../Models/user-model');

app.post('/login', async function(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password});
    if(user){
      res.cookie('loggedInUser',username , { maxAge: 60000 });
      res.send('Successfully Logged In. Cookie has been set <a href="/showcookie">Show Cookies</a>');
    } else{
      res.send('No user found. <a href="/showcookie">Show Cookies</a> <a href="/">Back</a> ');
    }
  });

  
module.exports = app;