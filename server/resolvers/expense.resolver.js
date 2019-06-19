/* eslint no-unused-vars: 0 */
const requiresAuth = require('../helpers/permissions');
const { auth } = require('../helpers/permissions');

module.exports = {
  Expense: {
    user: (parent, args, { models }, info) => parent.getUser(),
    category: (parent, args, { models }, info) => parent.getCategory(),
  },
  Query: {
    expense: auth((parent, { id }, { models }, info) => (
      models.Expense.findByPk(id)
    )),
    expenses: auth((parent, args, { models }, info) => (
      models.Expense.findAll({ where: args })
    )),
  },
  Mutation: {
    createExpense: auth((parent, { input }, { models }, info) => (
      models.Expense.create(input)
    )),
    updateExpense: auth(async (parent, { input }, { models }, info) => {
      await models.Expense.update(input, { where: { id: input.id } });
      return models.Expense.findByPk(input.id);
    }),
    deleteExpense: auth((parent, { id }, { models }, info) => (
      models.Expense.destroy({ where: { id } })
    )),
  },
};
