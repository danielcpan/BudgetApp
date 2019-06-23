/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import { apolloClient } from '../../apolloProvider';

import {
  CURRENT_USER_QUERY,
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
  isLoggedIn: !!localStorage.getItem('token'),
  // currentUser: {},
  loading: false,
});

const actions = {
  async getCurrentUser({ commit }) {
    commit('SET_LOADING', true);

    const response = await apolloClient.query({
      query: CURRENT_USER_QUERY,
    });

    commit('SET_LOADING', false);
    commit('GET_CURRENT_USER', response.data.currentUser);
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
      commit('LOG_IN', response.data.login)
      // commit('SET_CURRENT_USER', response.data.login.user);
      // commit('SET_IS_LOGGED_IN', true);
    }
  },
  logout({ commit }) {
    // localStorage.clear();
    commit('LOG_OUT')
    // commit('SET_IS_LOGGED_IN', false);
    // commit('SET_CURRENT_USER', )
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
  LOG_IN(state, { token, refreshToken }){
    console.log("token: " + token)
    console.log("refresh-token: " + refreshToken)
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  },
  LOG_OUT(state) {
    localStorage.clear();
  },
  SET_IS_LOGGED_IN(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
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
