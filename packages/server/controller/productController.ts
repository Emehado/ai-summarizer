import type { Request, Response } from 'express';
import { productRepository } from '../repositories/product.repository';

export const productController = {
  async getProducts(req: Request, res: Response) {
    try {
      const products = await productRepository.getProducts();
      res.json({ products });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  },
};
