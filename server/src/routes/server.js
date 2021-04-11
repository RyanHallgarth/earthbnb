const express = require('express');
const welcomeMessage = require('../settings');

const serverRouter = express.Router();

serverRouter.get('/', (req, res) => {
  res.status(200).json({ message: welcomeMessage });
});

module.exports = serverRouter;
