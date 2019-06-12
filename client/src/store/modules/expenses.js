/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import { apolloClient } from '../../apolloProvider';

const state = () => ({
  expensesList: [],
  loading: false,
});

const actions = {
  async getExpensesList({ commit }, query) {
    commit('SET_LOADING', true);

    const response = await apolloClient.query({ query });

    commit('SET_LOADING', false);
    commit('GET_EXPENSES_LIST', response.data.expenses);
  },
};

const mutations = {
  GET_EXPENSES_LIST(state, expenses) {
    state.expensesList = expenses;
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
