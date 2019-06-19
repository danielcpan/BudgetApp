import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './views/Dashboard.vue';
import UserForm from './components/users/form/UserForm.vue';
import UserLoginForm from './components/users/form/UserLoginForm.vue';
import CategoryForm from './components/categories/form/CategoryForm.vue';
import ExpenseForm from './components/expenses/form/ExpenseForm.vue';
import Index from './views/Index.vue';
import decode from 'jwt-decode';

Vue.use(Router);

// export default new Router({
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
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
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
  ],
});

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  console.log("token: " + token)
  console.log("refresh-token: " + refreshToken);
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
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    console.log("attemtping to check before")
    if (!isAuthenticated()) {
      console.log("not authenticated for routes")
      next({
        path: '/login',
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;