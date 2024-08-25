import { decksRouter } from "./endpoints/decks";
import { router } from "./trpc";

export const appRouter = router({
  decks: decksRouter,
});

export type AppRouter = typeof appRouter;
