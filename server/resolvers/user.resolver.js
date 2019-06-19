/* eslint no-unused-vars: 0 */
const { tryLogin } = require('../helpers/auth');

module.exports = {
  User: {
    totalExpenses: (parent, args, { models }, info) => parent.getTotalExpenses(),
    expenses: (parent, args, { models }, info) => parent.getExpenses(),
  },
  Query: {
    user: (parent, { id }, { models }, info) => models.User.findByPk(id),
    users: (parent, args, { models }, info) => models.User.findAll(),
    isEmailUnique: async (parent, { email }, { models }, info) => {
      const user = await models.User.findOne({where: { email: email.toLowerCase() }});
      return user ? false :true;
    }
  },
  Mutation: {
    login: async (parent, { email, password }, { models, SECRET, SECRET2 }, info) => (
      tryLogin(email, password, models, SECRET, SECRET2)
    ),    
    createUser: (parent, { input }, { models }, info) => (
      models.User.create(input)
    ),
    updateUser: async (parent, { input }, { models }, info) => {
      await models.User.update(input, { where: { id: input.id } });
      return models.User.findByPk(input.id);
    },
    deleteUser: (parent, { id }, { models }, info) => (
      models.User.destroy({ where: { id } })
    ),
  },
};
