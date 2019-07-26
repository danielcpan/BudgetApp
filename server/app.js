/* eslint no-console: 0 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const models = require('./models');

const app = express();
const addUserToContext = require('./middleware/addUserToContext.middleware');
const { SECRET, SECRET2 } = require('./config/config');

// Middleware
app.use(cors());
app.use(addUserToContext);

const { customScalarTypeDefs, customScalarResolvers } = require('./customScalars');

// Force close connection, sometimes it persists
// db.sequelize.close()

// if (process.env.NODE_ENV === 'development') {
// Sync the database models
// models.sequelize.sync({
//   force: true,
// });
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
  context: ({ req }) => ({
    models, user: req.user, SECRET, SECRET2,
  }),
});

server.applyMiddleware({ app });

if (process.env.DATABASE_URL) {
  console.log("using build fo heroku");
  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
}

// seed on start
// const { createTestData } = require('./seeders/testData');
// createTestData()
// require('./seeders/testData');
module.exports = app;
