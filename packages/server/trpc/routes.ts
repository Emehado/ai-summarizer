import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { PrismaClient } from '../generated/prisma';
import { productRepository } from '../repositories/product.repository';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

const prisma = new PrismaClient();

export const appRouter = t.router({
  getProducts: t.procedure.query((opts) => {
    return productRepository.getProducts();
  }),
  getProduct: t.procedure.input(z.number()).query((opts) => {
    return productRepository.getProduct(opts.input);
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
