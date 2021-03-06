/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import { apolloClient } from '../../apolloProvider';

import {
  CATEGORY_QUERY,
  CATEGORIES_QUERY,
  CREATE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
} from '../../graphql/category';

const state = () => ({
  categoriesList: [],
  search: '',
});

const actions = {
  async getCategory({ commit }, id) { // eslint-disable-line no-unused-vars
    const response = await apolloClient.query({
      query: CATEGORY_QUERY,
      variables: {
        id,
      },
    });

    const { category } = response.data;

    return category;
  },
  async getCategoriesList({ commit }, dateRange) {
    const response = await apolloClient.query({
      query: CATEGORIES_QUERY,
      variables: {
        dateRange,
      },
    });

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
  },
  async deleteCategory({ commit, dispatch }, category) {
    await apolloClient.mutate({
      mutation: DELETE_CATEGORY_MUTATION,
      variables: {
        id: category.id,
      },
    });

    commit('DELETE_CATEGORY', category.id);
    dispatch('expenses/getExpensesList', null, { root: true });
    dispatch('users/getCurrentUser', null, { root: true });
    dispatch('snackbar/setAndDisplaySnackbar', {
      header: 'Deleted Category: ',
      body: category.name,
    }, { root: true });
  },
  setSearch({ commit }, search) {
    commit('SET_SEARCH', search);
  },
  resetModuleState({ commit }) {
    commit('RESET_MODULE_STATE');
  },
};

const mutations = {
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
  DELETE_CATEGORY(state, id) {
    const index = state.categoriesList.findIndex(cat => cat.id === id);
    state.categoriesList.splice(index, 1);
  },
  SET_SEARCH(state, search) {
    state.search = search;
  },
  RESET_MODULE_STATE(state) {
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
