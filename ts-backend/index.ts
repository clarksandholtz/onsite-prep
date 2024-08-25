import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./app-router";
import { prisma } from "./prisma";
import cors from "cors";

const PORT = 3000;
const corsOptions = {
  origin: "*",
};

const server = createHTTPServer({
  middleware: cors(corsOptions),
  router: appRouter,
});

console.log(`Now serving on port: ${PORT}`);
server.listen(PORT);
server.addListener("close", async () => {
  console.log("Server closing");
  await prisma.$disconnect();
  console.log("Db disconnected");
});
