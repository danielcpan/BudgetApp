/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';
import Snackbar from './modules/snackbar';
import Users from './modules/users';
import Categories from './modules/categories';
import Expenses from './modules/expenses';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users: Users,
    categories: Categories,
    expenses: Expenses,
    snackbar: Snackbar,
  },
});
