import express from 'express';
import { welcomeMessage } from '../settings';

const serverRouter = express.Router();

serverRouter.get('/', (req, res) => {
  res.status(200).json({ message: welcomeMessage });
});

export default serverRouter;
