import type { Review } from '../generated/prisma';
import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';
import template from '../prompts/summarise.txt';

export const reviewService = {
  async summarizeReviews(productId: Review['productId']) {
    const reviews = await reviewRepository.getReviews(productId, 10);
    if (reviews.length === 0) {
      throw new Error('No reviews found for this product');
    }

    const joinedReviews = reviews.map((review) => review.content).join('\n\n');
    const prompt = template.replace('{{joinedReviews}}', joinedReviews);
    const { output_text: summary } = await llmClient.generateText({
      prompt,
      maxToken: 500,
    });

    reviewRepository.storeReviewSummary(productId, summary);

    return summary;
  },
};
