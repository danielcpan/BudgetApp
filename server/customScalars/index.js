import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

export const customScalarTypeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
export const customScalarResolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
