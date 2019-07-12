/* eslint no-unused-vars: 0 */
const { auth } = require('../helpers/permissions');

module.exports = {
  Category: {
    totalExpenses: (parent, args, { models }, info) => parent.getTotalExpenses(),
    expenses: (parent, { startDate, endDate }, { models }, info) => {
      if (startDate && endDate) {
          return parent.getExpenses({ where: { date: { between : [startDate, endDate]}}})  
      }
      return parent.getExpenses()
    }
  },
  Query: {
    category: (parent, { id }, { models }, info) => (
      models.Category.findByPk(id)
    ),
    categories: auth((parent, args, { models, user }, info) => (
      models.Category.findAll({ where: { userId: user.id} })
    )),
    categoriesAll: async (parent, args, { models }, info) => {
      return models.Category.findAll()
    },
  },
  Mutation: {
    createCategory: auth((parent, { input }, { models, user }, info) => (
      models.Category.create({ ...input, userId: user.id, isDefault: false })
    )),
    updateCategory: auth(async (parent, { input }, { models, user }, info) => {
      await models.Category.update({ ...input, userId: user.id }, { where: { id: input.id, isDefault: false } });
      return models.Category.findByPk(input.id);
    }),
    deleteCategory: async (parent, { id }, { models, user }, info) => {
      const category = await models.Category.findByPk(id, { raw: true });
      
      // Reassign Category's expenses to Other
      const otherCategory = await models.Category.findOne({ where: { userId: user.id, isDefault: true }})
      await models.Expense.update({ categoryId: otherCategory.id }, { where: { categoryId: category.id }})
      return models.Category.destroy({ where: { id, isDefault: false }})
    },
  },
};
