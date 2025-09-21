import express, { type Request, type Response } from 'express';
import { chatController } from './controller/chatController';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

router.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

router.post('/api/chat', chatController.sendMessage);

export default router;
