const axios = require('axios');

describe('Category Resolver', () => {
  let category1;

  before(async () => {
    await truncateTables();
    category1 = await factory.create('Category');
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
      });
    });

    context('#Categorys', () => {
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
          },
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
      });
    });

    context('#updateCategory', () => {
      it('responds with status 200', async () => {
        const query = `
          mutation updateCategory($id: ID!, $input: CategoryInput!){
            updateCategory(id: $id, input: $input) {
              id
              name
              icon
              color
            }
          }      
        `;
        const variables = {
          id: category1.id,
          input: {
            name: 'Leisure',
          },
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
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
      });
    });
  });
});
