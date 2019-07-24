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
  loading: false,
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
  async getExpensesList({ commit }, filters) {
    commit('SET_LOADING', true);
    console.log('filters: ');
    console.log(filters);
    const { startDate, endDate } = filters;
    let defaultStartDate; let
      defaultEndDate;

    if (!startDate && !endDate) {
      const date = new Date();
      defaultStartDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
      defaultEndDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
    }

    const response = await apolloClient.query({
      query: EXPENSES_QUERY,
      variables: {
        startDate: startDate || defaultStartDate,
        endDate: endDate || defaultEndDate,
      },
    });

    commit('SET_LOADING', false);
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
  async deleteExpense({ commit }, expense) {
    await apolloClient.mutate({
      mutation: DELETE_EXPENSE_MUTATION,
      variables: {
        id: expense.id,
      },
    });

    commit('DELETE_EXPENSE', expense.id);
    this.dispatch('categories/getCategoriesList', { root: true });
    this.dispatch('users/getCurrentUser', { root: true });
    this.dispatch('snackbar/setAndDisplaySnackbar', {
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
  SET_LOADING(state, loading) {
    state.loading = loading;
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
