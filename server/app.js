/* eslint no-console: 0 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
const models = require('./models');

const app = express();
const SECRET = 'KSAJDJASKDNKASUEIHQJKDMASSD';
const SECRET2 = 'JAKSDKASDNASDNAKNJQWIOQWEJAS';

// Middleware
app.use(cors());


const { customScalarTypeDefs, customScalarResolvers } = require('./customScalars');

// Force close connection, sometimes it persists
// db.sequelize.close()

// if (process.env.NODE_ENV === 'development') {
  // Sync the database models
  // models.sequelize.sync({
  //   force: true,
  // });
// }

// // seed on start
// require('./seeders/testData');

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
  context: { models, SECRET, SECRET2 },
});

server.applyMiddleware({ app });

// Uncomment Below for heroku build

// app.use(express.static('dist'));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
// });

// seed on start
// require('./seeders/testData');
module.exports = app;
