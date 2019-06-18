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

    commit('SET_LOADING', false);
    commit('GET_CATEGORY', response.data.category);
  },
  async getCategoriesList({ commit }, userId) {
    commit('SET_LOADING', true);

    const response = await apolloClient.query({
      query: CATEGORIES_QUERY,
      variables: {
        userId,
      },
    });

    commit('SET_LOADING', false);
    commit('GET_CATEGORIES_LIST', response.data.categories);
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
    this.dispatch('expenses/getExpensesList', 1, { root: true });
  },
  setSearch({ commit }, search) {
    commit('SET_SEARCH', search);
  },
};

const mutations = {
  SET_CURRENT_CATEGORY(state, category) {
    state.currentCategory = category;
  },
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
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
};
