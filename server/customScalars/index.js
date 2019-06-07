const path = require('path');
const { fileLoader, mergeResolvers } = require('merge-graphql-schemas');

module.exports.customScalarTypeDefs = `
  scalar Date
  scalar Email
`

module.exports.customScalarResolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
