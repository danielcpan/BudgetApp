/* eslint no-console: 0 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const jwt = require('jsonwebtoken');
const { refreshTokens } = require('./helpers/auth');

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

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    models, user: req.user, SECRET, SECRET2,
  }),
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
