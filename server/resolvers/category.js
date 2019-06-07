/* eslint no-unused-vars: 0 */

module.exports = {
  Category: {
    expenses: (parent, args, { models }, info) => parent.getExpenses(),
  },
  Query: {
    category: (parent, { id }, { models }, info) => models.Category.findByPk(id),
    categories: (parent, args, { models }, info) => models.Category.findAll({ where: args }),
  },
  Mutation: {
    createCategory: (parent, { input }, { models }, info) => (
      models.Category.create(input)
    ),
    updateCategory: async (parent, { id, input }, { models }, info) => {
      await models.Category.update(input, { where: { id } });
      return models.Category.findByPk(id);
    },
    deleteCategory: (parent, { id }, { models }, info) => (
      models.Category.destroy({ where: { id } })
    ),
  },
};
