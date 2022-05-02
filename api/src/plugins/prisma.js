const fp = require("fastify-plugin");
const { PrismaClient } = require("@prisma/client");

module.exports = fp(async (server, options) => {
  const prisma = new PrismaClient({
    log: ["error", "warn"],
  });

  await prisma.$connect();

  server.decorate("prisma", prisma);

  server.addHook("onClose", async (server) => {
    server.log.info("Closing Prisma..");

    await server.prisma.$disconnect();
  });
});
