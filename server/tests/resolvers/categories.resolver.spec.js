const axios = require('axios');

describe('Category Resolver', () => {
  let category1;
  let user1;

  before(async () => {
    await truncateTables();
    category1 = await factory.create('Category');
    user1 = await factory.create('User');
  });

  describe('Queries', () => {
    context('#Category', () => {
      it('responds with status 200', async () => {
        const query = `
          query getCategory($id: ID!) {
            category(id: $id) {
              id
              name
              icon
              color
            }
          }
        `;
        const variables = {
          id: category1.id,
        };
        const response = await axios.get('http://localhost:4000/graphql', { params: { query, variables } });
        expect(response.status).to.equal(200);
        expect(response.data.errors).to.be.undefined;
      });
    });

    context('#Categories', () => {
      it('responds with status 200', async () => {
        const query = `
          query getCategories {
            categories {
              id
              name
              icon
              color
            }
          }
        `;
        const response = await axios.get('http://localhost:4000/graphql', { params: { query } });
        expect(response.status).to.equal(200);
        expect(response.data.errors).to.be.undefined;
      });
    });
  });

  describe('Mutations', () => {
    context('#createCategory', () => {
      it('responds with status 200', async () => {
        const query = `
          mutation createCategory($input: CategoryInput!) {
            createCategory(input: $input) {
              id
              name
              icon
              color
            }
          }
        `;
        const variables = {
          input: {
            name: 'Shopping',
            icon: 'fa-icon-shopping',
            color: '#f0f8ff',
            userId: user1.id,
          },
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
        expect(response.data.errors).to.be.undefined;
      });
    });

    context('#updateCategory', () => {
      it('responds with status 200', async () => {
        const query = `
          mutation updateCategory($input: CategoryInput!){
            updateCategory(input: $input) {
              id
              name
              icon
              color
            }
          }      
        `;
        const variables = {
          input: {
            id: category1.id,
            name: 'Leisure',
          },
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
        expect(response.data.errors).to.be.undefined;
      });
    });

    context('#deleteCategory', () => {
      it('responds with status 200', async () => {
        const query = `
          mutation deleteCategory($id: ID!) {
            deleteCategory(id: $id)
          }
        `;
        const variables = {
          id: category1.id,
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
        expect(response.data.errors).to.be.undefined;
      });
    });
  });
});
