/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import { apolloClient } from '../../apolloProvider';
import gql from 'graphql-tag';

const state = () => ({
  currentUser: {},
  loading: false,
});

const actions = {
  async getCurrentUser({ commit }) {
    commit('SET_LOADING', true);

    const response = await apolloClient.query({
      query: gql`
        query {
          user(id: 1) {
            totalExpenses
          }
        }
      `
    });

    commit('SET_LOADING', false);
    commit('GET_CURRENT_USER', response.data.user);
  },
};

const mutations = {
  GET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  }  
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
};