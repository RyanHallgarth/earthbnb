const dotenv = require('dotenv').config();

const welcomeMessage = process.env.WELCOME_MESSAGE;

module.exports = welcomeMessage;
