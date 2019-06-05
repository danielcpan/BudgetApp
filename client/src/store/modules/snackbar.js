/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

const state = () => ({
  snack: {
    show: false,
    timeout: 3000,
    header: '',
    body: '',
  },
});

const actions = {
  setAndDisplaySnackbar({ commit }, snack) {
    commit('SET_AND_DISPLAY_SNACKBAR', snack);
  },
  clearAndHideSnackbar({ commit }) {
    commit('CLEAR_AND_HIDE_SNACKBAR');
  },
};

const mutations = {
  SET_AND_DISPLAY_SNACKBAR(state, snack) {
    state.snack.show = true;
    state.snack = Object.assign({}, state.snack, snack);
  },
  CLEAR_AND_HIDE_SNACKBAR(state) {
    state.snack = {};
  },
};

export default {
  namespaced: true,
  actions,
  state,
  mutations,
};
