/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';
import Snackbar from './modules/snackbar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    snackbar: Snackbar,
  }
});
