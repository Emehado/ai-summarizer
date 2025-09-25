import dayjs from 'dayjs';
import type { Review } from '../generated/prisma';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();
export const reviewRepository = {
  getReviews(productId: Review['productId'], limit?: number) {
    return prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },

  async storeReviewSummary(
    productId: Review['productId'],
    summary: Review['content'],
  ) {
    const now = new Date();
    const expiresAt = dayjs().add(7, 'days').toDate();

    const data = {
      content: summary,
      expiresAt,
      productId,
      generatedAt: now,
    };
    const response = await prisma.summary.upsert({
      where: { productId },
      create: data,
      update: data,
    });
    return response;
  },

  async getReviewSummary(productId: Review['productId']) {
    const response = await prisma.summary.findFirst({
      where: {
        AND: [{ productId: productId }, { expiresAt: { gt: new Date() } }],
      },
    });
    return response?.content;
  },
};
