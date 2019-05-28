import models from '../../models'

describe('Expense Model', () => {
  describe('Validations', () => {

    it('is valid with correct fields', async () => {
      // console.log(models.get('User'))
      // let expense = await factory.build('Expense');
      // console.log(expense);
      // let user = await factory.build('User')
      // console.log(user.toJSON())
      // let category = await factory.build('Category')
      // console.log(category.toJSON())
      // console.log(expense);
      // console.log(expense.toJSON());
      // expect(true).to.be.true
      // expect(await isValid(await factory.build('expense'))).to.be.true
    })

    context('name', () => {
      it('is invalid when null', async () => {
        // expect(await isValid(await factory.build('expense', { name: null }))).to.be.false
      })

      it('is invalid when length less than 2 characters', async () => {
        // expect(await isValid(await factory.build('expense', { name: '' }))).to.be.false
      })

      it('is invalid when length greater than 35 characters', async () => {
        // expect(await isValid(await factory.build('expense', { name: 'a'.repeat(36) }))).to.be.false
      })
    })
  })
})
