import { prisma } from "../prisma";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const decksRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.ostring(),
        coverImageUrl: z.ostring(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const deck = await prisma.deck.create({
        data: input,
      });
      return deck;
    }),
  all: publicProcedure.query(async () => {
    const allDecks = await prisma.deck.findMany();
    return allDecks;
  }),
});
