/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import { apolloClient } from '../../apolloProvider';

import {
  USER_QUERY,
  LOGIN_MUTATION,
  CREATE_USER_MUATION,
  UPDATE_USER_MUTATION,
} from '../../graphql/user';

const state = () => ({
  currentUser: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    totalExpenses: '',
  },
  // currentUser: {},
  loading: false,
});

const actions = {
  async getCurrentUser({ commit }) {
    commit('SET_LOADING', true);

    const response = await apolloClient.query({
      query: USER_QUERY,
      variables: {
        id: 1,
      },
    });

    commit('SET_LOADING', false);
    commit('GET_CURRENT_USER', response.data.user);
  },
  async login({ commit }, credentials) {
    // console.log('credentials');
    // console.log(credentials);
    const response = await apolloClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email: credentials.email,
        password: credentials.password,
      },
    });
    // console.log(response.data.login);
    if (response.data.login.ok) {
      commit('SET_CURRENT_USER', response.data.login);
    }
  },
  async createUser({ commit }, user) {
    const response = await apolloClient.mutate({
      mutation: CREATE_USER_MUATION,
      variables: {
        input: user,
      },
    });

    commit('CREATE_USER', response.data.createUser);
  },
  async updateUser({ commit }, user) {
    const response = await apolloClient.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: {
        input: user,
      },
    });

    commit('UPDATE_USER', response.data.updateUser);
  },
};

const mutations = {
  GET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },
  SET_CURRENT_USER(state, { token, refreshToken, user }) {
    // console.log(`token: ${token}`);
    // console.log(`refreshToken: ${refreshToken}`);
    state.currentUser = user;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  },
  CREATE_USER(state, user) {
    state.currentUser = user;
  },
  UPDATE_USER(state, user) {
    state.currentUser = user;
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
