/* eslint no-unused-vars: 0 */
const { auth } = require('../utils/permissions.utils');
const { buildDateRange } = require('../utils/date.utils');

module.exports = {
  Expense: {
    user: (parent, args, { models }, info) => parent.getUser(),
    category: (parent, args, { models }, info) => parent.getCategory(),
  },
  Query: {
    expense: (parent, { id }, { models }, info) => (
      models.Expense.findByPk(id)
    ),
    expenses: auth((parent, { dateRange }, { models, user }, info) => {
      if (dateRange) {
        const { startDate, endDate } = buildDateRange(dateRange);

        console.log("inside resolver")
        console.log("startDate: " + startDate)
        console.log("endDate: " + endDate)

        return models.Expense.findAll({
          where: { userId: user.id, date: { between: [startDate, endDate] } },
        });
      }
      return models.Expense.findAll({ where: { userId: user.id } });
    }),
  },
  Mutation: {
    createExpense: auth((parent, { input }, { models, user }, info) => (
      models.Expense.create({ ...input, userId: user.id })
    )),
    updateExpense: auth(async (parent, { input }, { models, user }, info) => {
      await models.Expense.update({ ...input, userId: user.id }, { where: { id: input.id } });
      return models.Expense.findByPk(input.id);
    }),
    deleteExpense: auth((parent, { id }, { models }, info) => (
      models.Expense.destroy({ where: { id } })
    )),
  },
};
