/* eslint no-unused-vars: 0 */
const { auth } = require('../utils/permissions.utils');
const { buildDateRange } = require('../utils/date.utils');

module.exports = {
  Category: {
    totalExpenses: (parent, { dateRange }, { models }, info) => parent.getTotalExpenses(dateRange),
    expenses: (parent, { dateRange }, { models }, info) => {
      if (dateRange) {
        const { startDate, endDate } = buildDateRange(dateRange);

        return parent.getExpenses({ where: { date: { between: [startDate, endDate] } } });
      }
      return parent.getExpenses();
    },
  },
  Query: {
    category: (parent, { id }, { models }, info) => (
      models.Category.findByPk(id)
    ),
    categories: auth((parent, { dateRange }, { models, user }, info) => (
      models.Category.findAll({ where: { userId: user.id } }))),
    categoriesAll: async (parent, args, { models }, info) => models.Category.findAll(),
  },
  Mutation: {
    createCategory: auth((parent, { input }, { models, user }, info) => (
      models.Category.create({ ...input, userId: user.id, isDefault: false })
    )),
    updateCategory: auth(async (parent, { input }, { models, user }, info) => {
      await models.Category.update(
        { ...input, userId: user.id },
        { where: { id: input.id, isDefault: false } },
      );
      return models.Category.findByPk(input.id);
    }),
    deleteCategory: async (parent, { id }, { models, user }, info) => {
      const category = await models.Category.findByPk(id, { raw: true });

      // Reassign Category's expenses to Other
      const otherCategory = await models.Category.findOne(
        { where: { userId: user.id, isDefault: true } },
      );
      await models.Expense.update(
        { categoryId: otherCategory.id },
        { where: { categoryId: category.id } },
      );
      return models.Category.destroy({ where: { id, isDefault: false } });
    },
  },
};
