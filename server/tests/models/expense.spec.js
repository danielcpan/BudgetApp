describe('Expense Model', () => {
  describe('Validations', () => {

    it('has valid factory', async () => {
      expect(await isValid(factory.build('Expense'))).to.be.true
    })

    context('categoryId', () => {
      it('is invalid when null', async () => {
        expect(await isValid(factory.build('Expense', { categoryId: null }))).to.be.false
      })
    })

    context('userId', () => {
      it('is invalid when null', async () => {
        expect(await isValid(factory.build('Expense', { userId: null }))).to.be.false
      })
    })
  })
})
