/* eslint no-console: 0 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const models = require('./models');

const app = express();

// Middleware
app.use(cors());


// const { customScalarTypeDefs, customScalarResolvers } = require('./customScalars'

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

module.exports = app;