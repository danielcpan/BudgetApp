/* eslint no-unused-vars: 0 */

module.exports = {
  Query: {
    user: (parent, { id }, { models }, info) => models.User.findByPk(id),
    users: (parent, args, { models }, info) => models.User.findAll(),
  },
  Mutation: {
    createUser: (parent, { input }, { models }, info) => (
      models.User.create(input)
    ),
    updateUser: async (parent, { id, input }, { models }, info) => {
      await models.User.update(input, { where: { id } });
      return models.User.findByPk(id);
    },
    deleteUser: (parent, { id }, { models }, info) => (
      models.User.destroy({ where: { id } })
    ),
  },
};
