/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import gql from 'graphql-tag';
import { apolloClient } from '../../apolloProvider';

const state = () => ({
  currentExpense: {},
  expensesList: [],
  loading: false,
});

const actions = {
  async getExpensesList({ commit }, userId) {
    commit('SET_LOADING', true);

    const query = gql`
      query getExpenses($userId: ID!){
        expenses(userId: $userId) {
          id
          note
          cost
          date
          category {
            id
            name
            icon
            color
          }
        }
      }
    `;

    const response = await apolloClient.query({
      query,
      variables: {
        userId,
      },
    });

    commit('SET_LOADING', false);
    commit('GET_EXPENSES_LIST', response.data.expenses);
  },
  async createExpense({ commit }, expense) {
    const mutation = gql`
      mutation createExpense($input: ExpenseInput!) {
        createExpense(input: $input) {
          id
          note
          cost
          date
          category {
            id
            name
            icon
            color
          }
        }
      }
    `;

    const response = await apolloClient.mutate({
      mutation,
      varaibles: {
        input: expense,
      }
    });

    commit('CREATE_EXPENSE', response.data.createExpense);
  },
  async updateExpense({ commit }, expense) {
    const mutation = gql`
      mutation updateExpense($input: ExpenseInput!) {
        updateExpense(input: $input) {
          id
          note
          cost
          date
          category {
            id
            name
            icon
            color
          }
        }
      }
    `;

    const response = await apolloClient.query({
      mutation,
      variables: {
        input: expense,
      },
    });

    commit('UPDATE_EXPENSE', response.data.updateExpense);
  },
  async deleteExpense({ commit }, id) {
    const mutation = gql`
      mutation deleteExpense($id: ID!) {
        deleteExpense(id: $id)
      }
    `;

    await apolloClient.mutate({
      mutation,
      variables: { id },
    });

    commit('DELETE_EXPENSE', id);
  },
};

const mutations = {
  GET_EXPENSES_LIST(state, expenses) {
    state.expensesList = expenses;
  },
  CREATE_EXPENSE(state, expense) {
    state.expensesList.push(expense);
  },
  UPDATE_EXPENSE(state, expense) {
    let expenseToUpdate = state.expensesList.find(exp => exp.id === expense.id);
    expenseToUpdate = expense;
  },
  DELETE_EXPENSE(state, id) {
    const index = state.expensesList.findIndex(exp => exp.id === id);
    state.expensesList.splice(index, 1);
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
};
