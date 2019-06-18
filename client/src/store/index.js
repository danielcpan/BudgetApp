/* eslint-disable no-param-reassign */

import Vue from 'vue';
import Vuex from 'vuex';
import SnackbarModule from './modules/snackbar.module';
import UsersModule from './modules/users.module';
import CategoriesModule from './modules/categories.module';
import ExpensesModule from './modules/expenses.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users: UsersModule,
    categories: CategoriesModule,
    expenses: ExpensesModule,
    snackbar: SnackbarModule,
  },
});
