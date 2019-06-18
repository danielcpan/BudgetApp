/* eslint no-unused-vars: 0 */

module.exports = {
  Expense: {
    user: (parent, args, { models }, info) => parent.getUser(),
    category: (parent, args, { models }, info) => parent.getCategory(),
  },
  Query: {
    expense: (parent, { id }, { models }, info) => (
      models.Expense.findByPk(id)
    ),
    expenses: (parent, args, { models }, info) => (
      models.Expense.findAll({ where: args })
    ),
  },
  Mutation: {
    createExpense: (parent, { input }, { models }, info) => (
      models.Expense.create(input)
    ),
    updateExpense: async (parent, { input }, { models }, info) => {
      await models.Expense.update(input, { where: { id: input.id } });
      return models.Expense.findByPk(input.id);
    },
    deleteExpense: (parent, { id }, { models }, info) => (
      models.Expense.destroy({ where: { id } })
    ),
  },
};
