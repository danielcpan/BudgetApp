/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import { apolloClient } from '../../apolloProvider';

import {
  CURRENT_USER_QUERY,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  CREATE_USER_MUATION,
  // UPDATE_USER_MUTATION,
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
    console.log("CURRENT USER")
    console.log(response.data)

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
      commit('LOG_IN', response.data.login)
    }
  },
  async logout({ commit }) {
    commit('RESET_MODULE_STATE')
    this.dispatch('categories/resetModuleState', { root: true });
    this.dispatch('expenses/resetModuleState', { root: true });
    // this.dispatch('users/getCurrentUser', { root: true });    
    const response = await apolloClient.mutate({
      mutation: LOGOUT_MUTATION,
    })
    console.log("response: ")
    console.log(response)
    commit('LOG_OUT')
    console.log("APOLLO CLIENT")
    console.log(apolloClient)
    console.log("CLEARING STORE");
    apolloClient.clearStore()
    console.log("APOLLO CLIENT")
    console.log(apolloClient)    
    // apolloClient.clearStore()
    // console.log(apolloClient.clearStore())
  },
  async createUser({ commit }, user) {
    const response = await apolloClient.mutate({
      mutation: CREATE_USER_MUATION,
      variables: {
        input: user,
      },
    });
  },
  resetModuleState({ commit }) {
    commit('RESET_MODULE_STATE');
  }
};

const mutations = {
  LOG_IN(state, { token, refreshToken }){
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  },
  LOG_OUT(state) {
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
      totalExpenses: ''
    }
  }
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
};
