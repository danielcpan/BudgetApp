/* eslint no-unused-vars: 0 */

module.exports = {
  Expense: {
    user: (parent, args, { models }, info) => parent.getUser(),
  },
  Query: {
    expense: (parent, { id }, { models }, info) => models.Expense.findByPk(id),
    expenses: (parent, args, { models }, info) => models.Expense.findAll(),
  },
  Mutation: {
    createExpense: (parent, { input }, { models }, info) => (
      models.Expense.create(input)
    ),
    updateExpense: async (parent, { id, input }, { models }, info) => {
      await models.Expense.update(input, { where: { id } });
      return models.Expense.findByPk(id);
    },
    deleteExpense: (parent, { id }, { models }, info) => (
      models.Expense.destroy({ where: { id } })
    ),
  },
};
