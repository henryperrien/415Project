const express = require('express');
const app = express();
const UserController = require('../Controllers/UserController');

app.post('/login', async (req, res) => {
  try {
      await UserController.login(req, res);
  } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

app.post('/register', async (req, res) => {
  try {
      await UserController.register(req, res);
  } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

  
module.exports = app;