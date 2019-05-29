describe('User Resolver', () => {

  before(async () => {
    let user1 = factory.create('User')
    // let user2 = factory.create('User')
  })

  describe('Queries', () => {

    context('user', () => {
      it('is invalid when null', async () => {
        // console.log(user.toJSON())
        expect(await isValid(factory.build('User', { firstName: null }))).to.be.false
      })

      it('is invalid when length less than 2 characters', async () => {
        // expect(await isValid(factory.build('User', { firstName: '' }))).to.be.false
      })

      it('is invalid when length greater than 35 characters', async () => {
        // expect(await isValid(factory.build('User', { firstName: 'a'.repeat(36) }))).to.be.false
      })
    })

    // context('users', () => {
    //   it('is invalid when null', async () => {
    //     expect(await isValid(factory.build('User', { lastName: null }))).to.be.false
    //   })

    //   it('is invalid when length less than 2 characters', async () => {
    //     expect(await isValid(factory.build('User', { lastName: '' }))).to.be.false
    //   })

    //   it('is invalid when length greater than 35 characters', async () => {
    //     expect(await isValid(factory.build('User', { lastName: 'a'.repeat(36) }))).to.be.false
    //   })
    // })
  })
})
