/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import gql from 'graphql-tag';
import { apolloClient } from '../../apolloProvider';

const state = () => ({
  categoriesList: [],
  loading: false,
});

const actions = {
  async getCategoriesList({ commit }) {
    commit('SET_LOADING', true);

    const query = gql`
      query {
        categories(userId: 1) {
          id
          name
          icon
          color
          totalExpenses
          expenses {
            id
            note
            value
            date
          }    
        }
      }
    `

    const response = await apolloClient.query({ query });
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
