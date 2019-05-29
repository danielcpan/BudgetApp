describe('Expense Model', () => {
  describe('Validations', () => {

    it('has valid factory', async () => {
      expect(await isValid(await factory.build('Expense'))).to.be.true
    })
  })
})
