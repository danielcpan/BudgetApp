/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import { apolloClient } from '../../apolloProvider';

import {
  CURRENT_USER_QUERY,
  LOGIN_MUTATION,
  CREATE_USER_MUATION,
} from '../../graphql/user';

const state = () => ({
  currentUser: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    totalExpenses: '',
  },
  isLoggedIn: !!localStorage.getItem('token'),
  loading: false,
});

const actions = {
  async getCurrentUser({ commit }) {
    commit('SET_LOADING', true);

    const response = await apolloClient.query({
      query: CURRENT_USER_QUERY,
    });

    commit('SET_CURRENT_USER', response.data.currentUser);
    commit('SET_LOADING', false);
  },
  async login({ commit }, credentials) {
    const response = await apolloClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    if (response.data.login.ok) {
      commit('LOG_IN', response.data.login);
    }
  },
  async logout({ commit }) {
    commit('RESET_MODULE_STATE');
    this.dispatch('categories/resetModuleState', { root: true });
    this.dispatch('expenses/resetModuleState', { root: true });
  },
  async createUser({ commit }, user) { // eslint-disable-line no-unused-vars
    await apolloClient.mutate({
      mutation: CREATE_USER_MUATION,
      variables: {
        input: user,
      },
    });
  },
  resetModuleState({ commit }) {
    commit('RESET_MODULE_STATE');
  },
};

const mutations = {
  LOG_IN(state, { token, refreshToken }) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  },
  LOG_OUT() {
    localStorage.clear();
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  RESET_MODULE_STATE(state) {
    state.currentUser = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      totalExpenses: '',
    };
  },
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
};
