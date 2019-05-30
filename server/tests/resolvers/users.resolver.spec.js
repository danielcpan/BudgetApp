import axios from 'axios'
import models from '../../models'

describe('User Resolver', () => {

  before(() => {
    let user1 = factory.create('User')
    let user2 = factory.create('User')
  })

  describe('Queries', () => {

    context('user', () => {
      it('is invalid when null', async () => {
        const query = `
          query getUsers {
            users {
              id
              firstName
              lastName
              email
              userRole
            }
          }
        `
        // const response = await axios.get('http://localhost:4000/graphql', { params: { query }})

        // let response = await axios.get('https://api.openbrewerydb.org/breweries')


        // let response = await axios({
        //   url: 'http://localhost:4000/graphql',
        //   method: 'GET',
        //   params: {
        //     query: `
        //       query {
        //         users {
        //           id
        //           firstName
        //           lastName
        //           email
        //           userRole
        //         }
        //       }
        //     `
        //   }
        // })
        // const { data } = response.data;
        // console.log(await response.data.users);
        // console.log(data.users)
        // console.log(await models.User.count())
        // expect(response.data.users.length).to.be.equal(2)
        // expect(async () => await axios.get('http://localhost:4000/graphql', { params: { query }})).to.alter(models.User.count(), { by: 1 })
        // expect(data.users.length).to.be.equal(2)
        // console.log(user.toJSON())
        // expect(await isValid(factory.build('User', { firstName: null }))).to.be.false
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
