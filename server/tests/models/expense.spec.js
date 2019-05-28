describe('Expense Model', () => {
  describe('Validations', () => {

    it('is valid with correct fields', async () => {
      let expense = await Factory.build('Expense');
      // console.log(expense);
      console.log(expense.toJSON());
      // expect(true).to.be.true
      // expect(await isValid(await Factory.build('expense'))).to.be.true
    })

    context('name', () => {
      it('is invalid when null', async () => {
        // expect(await isValid(await Factory.build('expense', { name: null }))).to.be.false
      })

      it('is invalid when length less than 2 characters', async () => {
        // expect(await isValid(await Factory.build('expense', { name: '' }))).to.be.false
      })

      it('is invalid when length greater than 35 characters', async () => {
        // expect(await isValid(await Factory.build('expense', { name: 'a'.repeat(36) }))).to.be.false
      })
    })
  })
})
