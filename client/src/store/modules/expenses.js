/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import { apolloClient } from '../../apolloProvider';

const state = () => ({
  currentExpense: {},
  expensesList: [],
  loading: false,
});

const actions = {
  async getExpensesList({ commit }, payload) {
    commit('SET_LOADING', true);

    const response = await apolloClient.query(payload);

    commit('SET_LOADING', false);
    commit('GET_EXPENSES_LIST', response.data.expenses);
  },
  async createExpense({ commit }, payload) {
    const response = await apolloClient.mutate(payload);

    commit('CREATE_EXPENSE', response.data.createExpense);
  },
  async updateExpense({ commit }, payload) {
    const response = await apolloClient.query(payload);
    
    commit('UPDATE_EXPENSE', response.data.updateExpense);
  },
  async deleteExpense({ commit }, payload) {
    await apolloClient.mutate(payload);

    commit('DELETE_EXPENSE', payload.variables.id);
  }
};

const mutations = {
  GET_EXPENSES_LIST(state, expenses) {
    state.expensesList = expenses;
  },
  CREATE_EXPENSE(state, expense) {
    state.expensesList.push(expense);
  },
  UPDATE_EXPENSE(state, expense) {
    let expenseToUpdate = state.expensesList.find(exp => exp.id === expense.id)
    expenseToUpdate = expense;
  },
  DELETE_EXPENSE(state, id) {
    let index = state.expensesList.findIndex(exp => exp.id === id);
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
