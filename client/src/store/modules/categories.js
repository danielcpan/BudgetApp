/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import { apolloClient } from '../../apolloProvider';

import {
  CATEGORY_QUERY,
  CATEGORIES_QUERY,
} from '../../graphql/category';

const state = () => ({
  categoriesList: [],
  loading: false,
});

const actions = {
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
};

const mutations = {
  GET_CATEGORIES_LIST(state, categories) {
    state.categoriesList = categories;
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
