import type { Product } from '../generated/prisma';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const productRepository = {
  getProduct(productId: Product['id']) {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  },
};
