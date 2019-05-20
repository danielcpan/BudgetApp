import express from 'express';
import cors from 'cors';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import {fileLoader, mergeTypes, mergeResolvers} from 'merge-graphql-schemas';
import models from './models';

var db = require(__dirname + '/models/index');

// Force close connection, sometimes it persists
// db.sequelize.close();
// Sync the database models
db.sequelize.sync({
  force: true
});

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
const ssuiSchema = makeExecutableSchema({ typeDefs, resolvers});

const runServer = async () => {
  const server = new ApolloServer({
    ssuiSchema,
    context: { models }
  });

  const app = express();
  app.use(cors());
  server.applyMiddleware({ app });
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

try {
  runServer();
} catch (err) {
  console.error(err);
}
