const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const customScalarTypeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const customScalarResolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
