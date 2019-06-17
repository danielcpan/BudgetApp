/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';
import SnackbarModule from './modules/snackbar';
import UsersModule from './modules/users';
import CategoriesModule from './modules/categories';
import ExpensesModule from './modules/expenses';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users: UsersModule,
    categories: CategoriesModule,
    expenses: ExpensesModule,
    snackbar: SnackbarModule,
  },
});
