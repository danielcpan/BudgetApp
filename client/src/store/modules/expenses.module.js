/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { apolloClient } from '../../apolloProvider';

import {
  EXPENSE_QUERY,
  EXPENSES_QUERY,
  CREATE_EXPENSE_MUTATION,
  UPDATE_EXPENSE_MUTATION,
  DELETE_EXPENSE_MUTATION,
} from '../../graphql/expense';

const state = () => ({
  expensesList: [],
  search: '',
});

const actions = {
  clearCurrentExpense({ commit }) {
    commit('CLEAR_CURRENT_EXPENSE');
  },
  async getExpense({ commit }, id) {
    const response = await apolloClient.query({
      query: EXPENSE_QUERY,
      variables: {
        id,
      },
    });

    const { expense } = response.data;

    return expense;
  },
  async getExpensesList({ commit }, dateRange) {
    const response = await apolloClient.query({
      query: EXPENSES_QUERY,
      variables: {
        dateRange
      },
    });

    commit('GET_EXPENSES_LIST', response.data.expenses);
  },
  async createExpense({ commit }, expense) {
    const response = await apolloClient.mutate({
      mutation: CREATE_EXPENSE_MUTATION,
      variables: {
        input: expense,
      },
    });

    commit('CREATE_EXPENSE', response.data.createExpense);
  },
  async updateExpense({ commit }, expense) {
    const response = await apolloClient.mutate({
      mutation: UPDATE_EXPENSE_MUTATION,
      variables: {
        input: expense,
      },
    });

    commit('UPDATE_EXPENSE', response.data.updateExpense);
  },
  async deleteExpense({ commit, dispatch }, expense) {
    await apolloClient.mutate({
      mutation: DELETE_EXPENSE_MUTATION,
      variables: {
        id: expense.id,
      },
    });

    commit('DELETE_EXPENSE', expense.id);
    dispatch('categories/getCategoriesList', null, { root: true });
    dispatch('users/getCurrentUser', null, { root: true });
    dispatch('snackbar/setAndDisplaySnackbar', {
      header: 'Deleted Expense: ',
      body: expense.note,
    }, { root: true });
  },
  setSearch({ commit }, search) {
    commit('SET_SEARCH', search);
  },
  resetModuleState({ commit }) {
    commit('RESET_MODULE_STATE');
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
    const expenseIndex = state.expensesList.findIndex(exp => exp.id === expense.id);
    if (expenseIndex !== -1) state.expensesList.splice(expenseIndex, 1, expense);
  },
  DELETE_EXPENSE(state, id) {
    const index = state.expensesList.findIndex(exp => exp.id === id);
    state.expensesList.splice(index, 1);
  },
  SET_SEARCH(state, search) {
    state.search = search;
  },
  RESET_MODULE_STATE(state) {
    state.expensesList = [];
    state.search = '';
  },
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
};
