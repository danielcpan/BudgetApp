
describe('User Model', () => {
  describe('Validations', () => {

    it('is valid with correct fields', async () => {
      expect(await isValid(await factory.build('User'))).to.be.true
    })

    context('firstName', () => {
      it('is invalid when null', async () => {
        expect(await isValid(await factory.build('User', { firstName: null }))).to.be.false
      })

      it('is invalid when length less than 2 characters', async () => {
        expect(await isValid(await factory.build('User', { firstName: '' }))).to.be.false
      })

      it('is invalid when length greater than 35 characters', async () => {
        expect(await isValid(await factory.build('User', { firstName: 'a'.repeat(36) }))).to.be.false
      })
    })

    context('lastName', () => {
      it('is invalid when null', async () => {
        expect(await isValid(await factory.build('User', { lastName: null }))).to.be.false
      })

      it('is invalid when length less than 2 characters', async () => {
        expect(await isValid(await factory.build('User', { lastName: '' }))).to.be.false
      })

      it('is invalid when length greater than 35 characters', async () => {
        expect(await isValid(await factory.build('User', { lastName: 'a'.repeat(36) }))).to.be.false
      })
    })

    context('email', () => {
      it('is invalid when null', async () => {
        expect(await isValid(await factory.build('User', { email: null }))).to.be.false
      })

      it('is invalid when length greater than 254 characters', async () => {
        expect(await isValid(await factory.build('User', { email: 'a'.repeat(255) + 'foo@bar.com' }))).to.be.false
      })      

      it('must be a valid email', async () => {
        expect(await isValid(await factory.build('User', { email: 'foo@bar,com' }))).to.be.false
      })
    })
  })
})
