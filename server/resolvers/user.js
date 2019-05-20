export default {
  Query: {
    user: async (parent, args, { dataSources }, info) => 
      await dataSources.userAPI.getUser(),
  },
  Mutation: {
    updateUser: async (parent, { input }, { dataSources }, info) => 
      await dataSources.userAPI.updateUser(input),
  }
}