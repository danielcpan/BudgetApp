/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import gql from 'graphql-tag';
import { apolloClient } from '../../apolloProvider';

const state = () => ({
  expensesList: [],
  loading: false,
});

const actions = {
  async getExpensesList({ commit }) {
    commit('SET_LOADING', true);

    const query = gql`
      query {
        expenses(userId: 1) {
          id
          note
          value
          date
          category {
            name
            icon
            color
          }
        }
      }
    `

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
