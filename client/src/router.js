import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './views/Dashboard.vue';
import UserForm from './components/users/form/UserForm.vue';
import UserLoginForm from './components/users/form/UserLoginForm.vue';
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
      path: '/signup',
      name: 'Sign Up',
      component: UserForm
    },
    {
      path: '/login',
      name: 'Login',
      component: UserLoginForm
    },
    {
      path: '/users',
      name: 'User',
      component: Index,
      children: [
        // {
        //   path: 'signup',
        //   name: 'New',
        //   component: UserForm,
        // },
        // {
        //   path: 'signup',
        //   name: 'Signup',
        //   component: UserForm,
        // },
        {
          path: ':id/edit',
          name: 'Edit',
          component: UserForm,
        },
      ],
    },    
    {
      path: '/categories',
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
      path: '/expenses',
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
