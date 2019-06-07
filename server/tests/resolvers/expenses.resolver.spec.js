const axios = require('axios');

describe('Expense Resolver', () => {
  let expense1;

  before(async () => {
    await truncateTables();
    expense1 = await factory.create('Expense');
  });

  describe('Queries', () => {
    context('#Expense', () => {
      it('responds with status 200', async () => {
        const query = `
          query getExpense($id: ID!) {
            expense(id: $id) {
              id
              value
              note
            }
          }
        `;
        const variables = {
          id: expense1.id,
        };
        const response = await axios.get('http://localhost:4000/graphql', { params: { query, variables } });
        expect(response.status).to.equal(200);
      });
    });

    context('#Expenses', () => {
      it('responds with status 200', async () => {
        const query = `
          query getExpenses {
            expenses {
              id
              value
              note
            }
          }
        `;
        const response = await axios.get('http://localhost:4000/graphql', { params: { query } });
        expect(response.status).to.equal(200);
      });
    });
  });

  describe('Mutations', () => {
    context('#createExpense', () => {
      it('responds with status 200', async () => {
        const query = `
          mutation createExpense($input: ExpenseInput!) {
            createExpense(input: $input) {
              id
              value
              note
            }
          }
        `;
        const variables = {
          input: {
            value: '5.99',
            note: 'Mcdonalds',
            userId: (await expense1.getUser()).id,
            categoryId: (await expense1.getCategory()).id,
          },
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
      });
    });

    context('#updateExpense', () => {
      it('responds with status 200', async () => {
        const query = `
          mutation updateExpense($id: ID!, $input: ExpenseInput!){
            updateExpense(id: $id, input: $input) {
              id
              value
              note
            }
          }      
        `;
        const variables = {
          id: expense1.id,
          input: {
            value: '3.99',
          },
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
      });
    });

    context('#deleteExpense', () => {
      it('responds with status 200', async () => {
        const query = `
          mutation deleteExpense($id: ID!) {
            deleteExpense(id: $id)
          }
        `;
        const variables = {
          id: expense1.id,
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
      });
    });
  });
});
