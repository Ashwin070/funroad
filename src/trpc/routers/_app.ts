import { authRouter } from '@/modules/auth/server/procedures';
import {  createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/procedures';
export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;