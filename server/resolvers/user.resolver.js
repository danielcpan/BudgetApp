/* eslint no-unused-vars: 0 */
const bcrypt = require('bcrypt');

module.exports = {
  User: {
    totalExpenses: (parent, args, { models }, info) => parent.getTotalExpenses(),
    expenses: (parent, args, { models }, info) => parent.getExpenses(),
  },
  Query: {
    user: (parent, { id }, { models }, info) => models.User.findByPk(id),
    users: (parent, args, { models }, info) => models.User.findAll(),
  },
  Mutation: {
    register: async (parent, { input: { password, ...otherInputArgs }}, { models }, info) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await models.User.create({ ...otherInputArgs, password: hashedPassword });
        return true;
      } catch (err) {
        return false;
      }
    },
    updateUser: async (parent, { input }, { models }, info) => {
      await models.User.update(input, { where: { id: input.id } });
      return models.User.findByPk(input.id);
    },
    deleteUser: (parent, { id }, { models }, info) => (
      models.User.destroy({ where: { id } })
    ),
  },
};
