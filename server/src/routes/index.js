import express from 'express';
import { welcomeMessage } from '../settings';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
  res.status(200).json({ message: welcomeMessage });
});

export default indexRouter;
