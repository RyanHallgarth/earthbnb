import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import serverRouter from './routes/server';

require('dotenv').config();

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', serverRouter);

export default app;
