export default {
  Query: {
    user: async (parent, args, { models }, info) => 
      await models.User.findByIk(id),
    users: async (parent, args, { models }, info) => 
      await models.User.findAll()
  },
  Mutation: {
    createUser: async (parent, { input }, { models }, info) => 
      await models.User.create(input),
    updateUser: async (parent, { id, input }, { models }, info) => {
      await models.User.update(input, {where: {id: id}});
      return await models.User.findByPk(id);
    },
    deleteUser: async (parent, { input }, { models }, info) => 
      await models.User.destroy({where: {id: id}})
  }
}