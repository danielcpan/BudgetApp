export default {
  Query: {
    category: async (parent, args, { models }, info) => 
      await models.Category.findByIk(id),
    categories: async (parent, args, { models }, info) => 
      await models.Category.findAll()
  },
  Mutation: {
    createCategory: async (parent, { input }, { models }, info) => 
      await models.Category.create(input),
    updateCategory: async (parent, { id, input }, { models }, info) => {
      await models.Category.update(input, {where: {id: id}})
      return await models.category.findByPk(id) 
    },
    deleteCategory: async (parent, { input }, { models }, info) => 
      await models.Category.destroy({where: {id: id}})
  }
}