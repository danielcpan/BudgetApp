export default {
  Query: {
    expense: async (parent, { id }, { models }, info) => 
      await models.Expense.findByPk(id),
    expenses: async (parent, args, { models }, info) => 
      await models.Expense.findAll()
  },
  Mutation: {
    createExpense: async (parent, { input }, { models }, info) => 
      await models.Expense.create(input),
    updateExpense: async (parent, { id, input }, { models }, info) => {
      await models.Expense.update(input, {where: {id: id}})
      return await models.Expense.findByPk(id) 
    },
    deleteExpense: async (parent, { id }, { models }, info) => 
      await models.Expense.destroy({where: {id: id}})
  }
}