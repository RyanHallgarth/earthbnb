const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const serverRouter = require('./routes/server');

const passport = require('../passport/setup');
const auth = require('./routes/auth');

const MongoStore = require('connect-mongo');

require('dotenv').config();

const app = express();

// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true })
//   .then(console.log('MongoDB connected'))
//   .catch((err) => console.log(err));

// Bodyparser middleware, extended true allows nested payloads
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'im2wise4u',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(cookieParser());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/v1', serverRouter);
app.use('/auth', auth);

module.exports =  app;
