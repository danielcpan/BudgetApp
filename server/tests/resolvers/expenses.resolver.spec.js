const axios = require('axios');

describe('Expense Resolver', () => {
  let expense1;
  let category1;

  before(async () => {
    await truncateTables();
    expense1 = await factory.create('Expense');
    category1 = await factory.create('Category');
  });

  describe('Queries', () => {
    context('#Expense', () => {
      it('responds with status 200', async () => {
        const query = `
          query getExpense($id: ID!) {
            expense(id: $id) {
              id
              cost
              note
              date
            }
          }
        `;
        const variables = {
          id: expense1.id,
        };
        const response = await axios.get('http://localhost:4000/graphql', { params: { query, variables } });
        expect(response.status).to.equal(200);
        expect(response.data.errors).to.be.undefined;
      });
    });

    context('#Expenses', () => {
      it('responds with status 200', async () => {
        const query = `
          query getExpenses {
            expenses {
              id
              cost
              note
              date
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
    context('#createExpense', () => {
      it('responds with status 200', async () => {
        const query = `
          mutation createExpense($input: ExpenseInput!) {
            createExpense(input: $input) {
              id
              cost
              note
              date
            }
          }
        `;
        const variables = {
          input: {
            cost: '5.99',
            note: 'Mcdonalds',
            date: new Date(),
            userId: expense1.userId,
            categoryId: category1.id,
          },
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
        expect(response.data.errors).to.be.undefined;
      });
    });

    context('#updateExpense', () => {
      it('responds with status 200', async () => {
        const query = `
          mutation updateExpense($input: ExpenseInput!){
            updateExpense(input: $input) {
              id
              cost
              note
              date
            }
          }
        `;
        const variables = {
          input: {
            id: expense1.id,
            cost: '3.99',
          },
        };
        const response = await axios.post('http://localhost:4000/graphql', { query, variables });
        expect(response.status).to.equal(200);
        expect(response.data.errors).to.be.undefined;
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
        expect(response.data.errors).to.be.undefined;
      });
    });
  });
});
