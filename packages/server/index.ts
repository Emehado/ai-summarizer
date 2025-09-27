import express from 'express';
import router from './routes';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter, createContext } from './trpc/routes';

const app = express();
app.use(express.json());
app.use(router);
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
