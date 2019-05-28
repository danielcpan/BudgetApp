describe('Category Model', () => {
  describe('Validations', () => {

    it('is valid with correct fields', async () => {
      expect(await isValid(await factory.build('Category'))).to.be.true
    })

    context('name', () => {
      it('is invalid when null', async () => {
        expect(await isValid(await factory.build('Category', { name: null }))).to.be.false
      })

      it('is invalid when length less than 2 characters', async () => {
        expect(await isValid(await factory.build('Category', { name: '' }))).to.be.false
      })

      it('is invalid when length greater than 35 characters', async () => {
        expect(await isValid(await factory.build('Category', { name: 'a'.repeat(36) }))).to.be.false
      })
    })
  })
})
