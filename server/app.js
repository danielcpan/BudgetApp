/* eslint no-console: 0 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import models from './models';

const app = express();

// Middleware
app.use(cors());


// import { customScalarTypeDefs, customScalarResolvers } from './customScalars'

// Force close connection, sometimes it persists
// db.sequelize.close()

// if (process.env.NODE_ENV === 'development') {
//   // Sync the database models
//   models.sequelize.sync({
//     force: true,
//   });
// }

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

// console.log(customScalarTypeDefs)
// console.log(customScalarResolvers)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
});

server.applyMiddleware({ app });

export default app;