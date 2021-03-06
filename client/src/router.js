import Vue from 'vue';
import Router from 'vue-router';
import decode from 'jwt-decode';

import Dashboard from './views/Dashboard.vue';
import UserForm from './components/users/form/UserForm.vue';
import UserLoginForm from './components/users/form/UserLoginForm.vue';
import CategoryAdd from './views/CategoryAdd.vue';
import CategoryEdit from './views/CategoryEdit.vue';
import ExpenseAdd from './views/ExpenseAdd.vue';
import ExpenseEdit from './views/ExpenseEdit.vue';
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
          component: CategoryAdd,
          meta: { requiresAuth: true },
        },
        {
          path: ':id/edit',
          name: 'Edit',
          component: CategoryEdit,
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
          component: ExpenseAdd,
          meta: { requiresAuth: true },
        },
        {
          path: ':id/edit',
          name: 'Edit',
          component: ExpenseEdit,
          meta: { requiresAuth: true },
        },
      ],
    },
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
