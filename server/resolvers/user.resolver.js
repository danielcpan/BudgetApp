/* eslint no-unused-vars: 0 */
const { tryLogin } = require('../helpers/auth');

module.exports = {
  User: {
    totalExpenses: (parent, args, { models }, info) => parent.getTotalExpenses(),
    expenses: (parent, args, { models }, info) => parent.getExpenses(),
  },
  Query: {
    // currentUser: (parent, args, { models, user }, info) => (
    //   models.User.findByPk(user.id)
    // ),
    currentUser: (parent, args, { models, user }, info) => {
      console.log("BACKEND USER")
      console.log(user)
      return models.User.findByPk(user.id)
    },
    user: (parent, { id }, { models }, info) => models.User.findByPk(id),
    users: (parent, args, { models }, info) => models.User.findAll(),
    isEmailUnique: async (parent, { email }, { models }, info) => {
      const user = await models.User.findOne({ where: { email: email.toLowerCase() } });
      return !user;
    },
  },
  Mutation: {
    login: async (parent, { email, password }, { models, SECRET, SECRET2 }, info) => (
    tryLogin(email, password, models, SECRET, SECRET2)
    ),
    logout: async (parent, { email, password }, { user }, info) => {
      console.log("LOGGING OUT!!!!!!!!!!")
      console.log("user: ");
      console.log(user);
      return true;
    },
    // login: async (parent, { email, password }, { models, SECRET, SECRET2, user }, info) => {
    //   console.log(user)
    //   return tryLogin(email, password, models, SECRET, SECRET2)
    // },
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
