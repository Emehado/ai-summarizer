import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

export const reviewController = {
  async getReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid Product Id' });
    }

    const product = await productRepository.getProduct(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found!' });
    }

    const summary = await reviewRepository.getReviewSummary(productId);
    const reviews = await reviewRepository.getReviews(productId);

    res.json({ reviews, summary });
  },

  async summarizeReviews(req: Request, res: Response) {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      res.status(400).json({ error: 'Invalid Product Id' });
    }

    const response = await productRepository.getProduct(productId);
    if (!response) {
      return res.status(404).json({ error: 'product not found!' });
    }

    const reviews = await reviewRepository.getReviews(productId, 1);
    if (!reviews.length) {
      return res
        .status(400)
        .json({ error: 'Invalid request! There are no reviews to summarize' });
    }

    const summary = await reviewService.summarizeReviews(productId);

    res.json({ summary });
  },
};
