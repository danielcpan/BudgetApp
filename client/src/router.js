import Vue from 'vue';
import Router from 'vue-router';
import decode from 'jwt-decode';

import Dashboard from './views/Dashboard.vue';
import UserForm from './components/users/form/UserForm.vue';
import UserLoginForm from './components/users/form/UserLoginForm.vue';
import CategoryForm from './components/categories/form/CategoryForm.vue';
import ExpenseForm from './components/expenses/form/ExpenseForm.vue';
import Index from './views/Index.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: UserForm,
    },
    {
      path: '/login',
      name: 'Login',
      component: UserLoginForm,
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
          meta: { requiresAuth: true },
        },
        {
          path: ':id/edit',
          name: 'Edit',
          component: CategoryForm,
          meta: { requiresAuth: true },
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
          meta: { requiresAuth: true },
        },
        {
          path: ':id/edit',
          name: 'Edit',
          component: ExpenseForm,
          meta: { requiresAuth: true },
        },
      ],
    },
    // {
    //   path: '/expenses-table',
    //   component: ExpensesTable,
    //   meta: { requiresAuth: true },
    // },
    // {
    //   path: '/categories-table',
    //   component: CategoriesTable,
    //   meta: { requiresAuth: true },
    // },
  ],
});

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }

  return true;
};

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: '/login',
        // query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
