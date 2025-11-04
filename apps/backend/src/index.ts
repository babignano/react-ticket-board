import { ApolloServer } from '@apollo/server';
import fastifyApollo, { fastifyApolloDrainPlugin } from '@as-integrations/fastify';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';

const app = Fastify({
  logger: true,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [fastifyApolloDrainPlugin(app)],
});

await server.start();

await app.register(cors, {
  origin: true, // Allow all origins in development
});

await app.register(fastifyApollo(server), {
  context: async (request) => ({
    token: request.headers.authorization,
  }),
});

const PORT = Number(process.env.PORT) || 4000;

try {
  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
