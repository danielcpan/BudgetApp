/* eslint no-unused-vars: 0 */
const { auth } = require('../helpers/permissions');

module.exports = {
  Category: {
    totalExpenses: (parent, args, { models }, info) => parent.getTotalExpenses(),
    expenses: (parent, args, { models }, info) => parent.getExpenses(),
  },
  Query: {
    category: auth((parent, { id }, { models }, info) => (
      models.Category.findByPk(id)
    )),
    categories: auth((parent, args, { models, user }, info) => (
      models.Category.findAll({ where: { userId: user.id} })
    )),
  },
  Mutation: {
    createCategory: auth((parent, { input }, { models, user }, info) => (
      models.Category.create({ ...input, userId: user.id})
    )),
    updateCategory: auth(async (parent, { input }, { models, user }, info) => {
      await models.Category.update({ ...input, userId: user.id}, { where: { id: input.id } });
      return models.Category.findByPk(input.id);
    }),
    deleteCategory: auth((parent, { id }, { models }, info) => (
      models.Category.destroy({ where: { id } })
    )),
  },
};
