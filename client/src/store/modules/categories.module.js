/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import { apolloClient } from '../../apolloProvider';

import {
  CATEGORY_QUERY,
  CATEGORIES_QUERY,
  CREATE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
} from '../../graphql/category';

const state = () => ({
  currentCategory: {
    id: '',
    name: '',
    icon: '',
    color: '',
  },
  categoriesList: [],
  search: '',
  loading: false,
});

const actions = {
  clearCurrentCategory({ commit }) {
    commit('CLEAR_CURRENT_CATEGORY');
  },
  async getCategory({ commit }, id) {
    commit('SET_LOADING', true);

    const response = await apolloClient.query({
      query: CATEGORY_QUERY,
      variables: {
        id,
      },
    });

    commit('GET_CATEGORY', response.data.category);
    commit('SET_LOADING', false);
  },
  async getCategoriesList({ commit }) {
    commit('SET_LOADING', true);

    const response = await apolloClient.query({
      query: CATEGORIES_QUERY,
    });

    commit('GET_CATEGORIES_LIST', response.data.categories);
    commit('SET_LOADING', false);
  },
  async createCategory({ commit }, category) {
    const response = await apolloClient.mutate({
      mutation: CREATE_CATEGORY_MUTATION,
      variables: {
        input: category,
      },
    });

    commit('CREATE_CATEGORY', response.data.createCategory);
  },
  async updateCategory({ commit }, category) {
    const response = await apolloClient.mutate({
      mutation: UPDATE_CATEGORY_MUTATION,
      variables: {
        input: category,
      },
    });

    commit('UPDATE_CATEGORY', response.data.updateCategory);
    this.dispatch('expenses/getExpensesList', { root: true });
  },
  setSearch({ commit }, search) {
    commit('SET_SEARCH', search);
  },
  resetModuleState({ commit }) {
    commit('RESET_MODULE_STATE');
  },
};

const mutations = {
  CLEAR_CURRENT_CATEGORY(state) {
    state.currentCategory = {
      id: '',
      name: '',
      icon: '',
      color: '',
    };
  },
  GET_CATEGORY(state, category) {
    state.currentCategory = category;
  },
  GET_CATEGORIES_LIST(state, categories) {
    state.categoriesList = categories;
  },
  CREATE_CATEGORY(state, category) {
    state.categoriesList.push(category);
  },
  UPDATE_CATEGORY(state, category) {
    const categoryIndex = state.categoriesList.findIndex(cat => cat.id === category.id);
    if (categoryIndex !== -1) state.categoriesList.splice(categoryIndex, 1, category);
  },
  SET_SEARCH(state, search) {
    state.search = search;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  RESET_MODULE_STATE(state) {
    state.currentCategory = {
      id: '',
      name: '',
      icon: '',
      color: '',
    };
    state.categoriesList = [];
    state.search = '';
  },
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
};
