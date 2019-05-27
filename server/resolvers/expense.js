export default {
  Query: {
    expense: async (parent, args, { models }, info) => 
      await models.Expense.findByIk(id),
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
    deleteExpense: async (parent, { input }, { models }, info) => 
      await models.Expense.destroy({where: {id: id}})
  }
}