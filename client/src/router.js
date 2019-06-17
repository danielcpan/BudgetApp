import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './views/Dashboard.vue';
import CategoryForm from './components/categories/form/CategoryForm.vue';
import ExpenseForm from './components/expenses/form/ExpenseForm.vue';
import Index from './views/Index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Dashboard,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/category',
      name: 'Category',
      component: Index,
      children: [
        {
          path: 'new',
          name: 'New',
          component: CategoryForm,
        },
        {
          path: ':id/edit',
          name: 'Edit',
          component: CategoryForm,
        },
      ],
    },
    {
      path: '/expense',
      name: 'Expense',
      component: Index,
      children: [
        {
          path: 'new',
          name: 'New',
          component: ExpenseForm,
        },
        {
          path: ':id/edit',
          name: 'Edit',
          component: ExpenseForm,
        },
      ],
    },
  ],
});
