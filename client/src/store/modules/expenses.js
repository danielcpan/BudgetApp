/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import gql from 'graphql-tag';
import { apolloClient } from '../../apolloProvider';

import {
  EXPENSE_QUERY, 
  EXPENSES_QUERY, 
  CREATE_EXPENSE_MUTATION,
  UPDATE_EXPENSE_MUTATION,
  DELETE_EXPENSE_MUTATION
} from '../../graphql/expense';

const state = () => ({
  currentExpense: {
    id: '',
    cost: '',
    note: '',
    date: '',
    category: {
      id: '',
      name: '',
      icon: '',
      color: '',
    },
    userId: 1,
  },
  expensesList: [],
  loading: false,
});

const getters = {
  currentExpense: state => state.currentExpense
}

const actions = {
  setCurrentExpense({ commit }, expense) {
    commit('SET_CURRENT_EXPENSE', expense);
  },
  clearCurrentExpense({ commit }) {
    commit('CLEAR_CURRENT_EXPENSE');
  },
  async getExpense({ commit }, id) {
    commit('SET_LOADING', true);

    const response = await apolloClient.query({
      query: EXPENSE_QUERY,
      variables: {
        id
      }
    })
    
    commit('SET_LOADING', false);
    commit('GET_EXPENSE', response.data.expense);
  },
  async getExpensesList({ commit }, userId) {
    commit('SET_LOADING', true);

    const response = await apolloClient.query({
      query: EXPENSES_QUERY,
      variables: {
        userId,
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
      }
    });

    commit('CREATE_EXPENSE', response.data.createExpense);
  },
  async updateExpense({ commit }, expense) {
    console.log(expense)
    const response = await apolloClient.mutate({
      mutation: UPDATE_EXPENSE_MUTATION,
      variables: {
        input: expense,
      },
    });

    commit('UPDATE_EXPENSE', response.data.updateExpense);
  },
  async deleteExpense({ commit }, id) {
    await apolloClient.mutate({
      mutation: DELETE_EXPENSE_MUTATION,
      variables: { id },
    });

    commit('DELETE_EXPENSE', id);
  },
};

const mutations = {
  SET_CURRENT_EXPENSE(state, expense) {
    state.currentExpense = expense;
  },
  CLEAR_CURRENT_EXPENSE(state) {
    state.currentExpense = {
      id: '',
      cost: '',
      note: '',
      date: '',
      category: {
        id: '',
        name: '',
        icon: '',
        color: '',
      },
      userId: 1,
    }
  },
  GET_EXPENSE(state, expense) {
    state.currentExpense = expense;
  },
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
  getters,
  actions,
  state,
  mutations,
};
