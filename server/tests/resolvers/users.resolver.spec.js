const axios = require('axios');

describe('User Resolver', () => {
  let user1;

  before(async () => {
    await truncateTables();
    user1 = await factory.create('User');
  });

  describe('Queries', () => {
    context('#user', () => {
      it('responds with status 200', async () => {
        const query = `
          query getUser($id: ID!) {
            user(id: $id) {
              id
              firstName
              lastName
              email
              userRole
            }
          }
        `;
        const variables = {
          id: user1.id,
        };
        const response = await axios.get('http://localhost:4000/graphql', { params: { query, variables } });
        expect(response.status).to.equal(200);
      });
    });

    context('#users', () => {
      it('responds with status 200', async () => {
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
        `;
        const response = await axios.get('http://localhost:4000/graphql', { params: { query } });
        expect(response.status).to.equal(200);
      });
    });
  });

  describe('Mutations', () => {
    context('#createUser', () => {
      it('responds with status 200', async () => {
        const query = `
          mutation createUser($input: UserInput!) {
            createUser(input: $input) {
              id
              firstName
              lastName
              email
              userRole
            }
          }
        `;
        const variables = {
          input: {
            firstName: 'Daniel',
            lastName: 'Pan',
            email: 'dp@gmail.com',
            userRole: 'admin',
          },
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
      });
    });

    context('#updateUser', () => {
      it('responds with status 200', async () => {
        const query = `
          mutation updateUser($id: ID!, $input: UserInput!){
            updateUser(id: $id, input: $input) {
              id
              firstName
              lastName
              email
            }
          }      
        `;
        const variables = {
          id: user1.id,
          input: {
            firstName: 'Billy',
          },
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
      });
    });

    context('#deleteUser', () => {
      it('responds with status 200', async () => {
        const query = `
          mutation deleteUser($id: ID!) {
            deleteUser(id: $id)
          }
        `;
        const variables = {
          id: user1.id,
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
      });
    });
  });
});
