import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import { resolvers } from './resolver';

(async () => {
  const app = express();
  app.use(
    cors(),
    // cors({
    //   origin: process.env.ORIGIN_URI,
    //   credentials: false,
    // }),
  );
  app.use(cookieParser());

  await createConnection();

  const schema = await buildSchema({
    resolvers,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.SERVER_PORT || 4000;

  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(
      `Server started at http://localhost:${port}${apolloServer.graphqlPath}`,
    );
  });

  SubscriptionServer.create({ schema, execute, subscribe }, { server });
})();
