require('dotenv').config();
const logger = require('morgan');
const express = require('express');
var cors = require('cors');
const cookieParser = require('cookie-parser');
var session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { notFound, errorHandler } = require('../middleware/error.middleware');

const passport = require('passport');
const listingRouter = require('./routes/listing.route');
const favoriteRouter = require('./routes/favorite.route');
const authRouter = require('./routes/auth');

const MongoStore = require('connect-mongo');

const app = express();
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('public'));
}

// app.all('/*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next(); // dont forget this
});

app.use('/', express.static('public'));
app.set('trust proxy', 1); // trust first proxy

// CONNECT TO MONGO VIA MONGOOSE
const mongoosePromise = mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((m) => m.connection.getClient())
  .catch((err) => console.log(err));

// setup the session
app.use(
  session({
    genid: (req) => {
      console.log(req.sessionID);
      return uuidv4();
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 2 },
    store: MongoStore.create({
      clientPromise: mongoosePromise,
    }),
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Bodyparser middleware, extended true allows nested payloads
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors({ origin: 'http://localhost:3000' }));

app.use(cookieParser());
//app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Routes
app.use(cors());
app.use('/api/v1/listings', listingRouter);
app.use('/api/v1/favorite', favoriteRouter);
app.use('/api/auth', authRouter);
app.get('/api/v1', (req, res) => {
  res.status(200).json({ message: 'WELCOME TO V1 API' });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
