/* eslint no-console: 0 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const models = require('./models');

const app = express();

// Middleware
app.use(cors());


const { customScalarTypeDefs, customScalarResolvers } = require('./customScalars');

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

const schema = makeExecutableSchema({
  typeDefs: [
    customScalarTypeDefs,
    typeDefs,
  ],
  resolvers: [
    customScalarResolvers,
    resolvers,
  ],
});

const server = new ApolloServer({
  schema,
  context: { models },
});

server.applyMiddleware({ app });

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

module.exports = app;
