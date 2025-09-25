import express, { type Request, type Response } from 'express';
import { chatController } from './controller/chatController';
import { reviewController } from './controller/reviewController';
import { productController } from './controller/productController';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

router.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products', productController.getProducts);
router.get('/api/products/:id/reviews', reviewController.getReviews);

router.post(
  '/api/products/:id/reviews/summarize',
  reviewController.summarizeReviews,
);

export default router;
