/* eslint no-unused-vars: 0 */
const requiresAuth = require('../helpers/permissions');
const { auth } = require('../helpers/permissions');

module.exports = {
  Expense: {
    user: (parent, args, { models }, info) => parent.getUser(),
    category: (parent, args, { models }, info) => parent.getCategory(),
  },
  Query: {
    expense: (parent, { id }, { models }, info) => (
      models.Expense.findByPk(id)
    ),
    expenses: auth((parent, { startDate, endDate }, { models, user }, info) => {
      if (startDate && endDate) {
        return models.Expense.findAll({ where: { userId: user.id, date: { between : [startDate, endDate]}}})
      }
      return models.Expense.findAll({where: { userId: user.id}})
    }),
  },
  Mutation: {
    createExpense: auth((parent, { input }, { models, user }, info) => (
      models.Expense.create({ ...input, userId: user.id })
    )),
    updateExpense: auth(async (parent, { input }, { models, user }, info) => {
      console.log("input")
      console.log(input)
      await models.Expense.update({ ...input, userId: user.id }, { where: { id: input.id } });
      return models.Expense.findByPk(input.id);
    }),
    deleteExpense: auth((parent, { id }, { models }, info) => (
      models.Expense.destroy({ where: { id } })
    )),
  },
};
