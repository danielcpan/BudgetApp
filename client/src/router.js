import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './views/Dashboard.vue';
import Test from './views/Test.vue';
import ExpensesTable from './components/expenses/ExpensesTable.vue';
import ExpenseForm from './components/expenses/ExpenseForm.vue';
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
      children: [
        {
          path: 'new',
          name: 'New',
          component: ExpenseForm
        },
        {
          path: ':id/edit',
          name: 'Edit',
          component: ExpenseForm
        }        
      ]
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/expense',
      name: 'Expense',
      component: Index,
      children: [
        {
          path: 'new',
          name: 'New',
          component: ExpenseForm
        },
        {
          path: ':id/edit',
          name: 'Edit',
          component: ExpenseForm
        }        
      ]
    },    
    // {
    //   path: '/expense/:id/edit',
    //   name: 'expense',
    //   component: ExpenseForm,
    // },
    // {
    //   path: '/expense/:id/new',
    //   name: 'Expense Form',
    //   component: ExpenseForm,
    // },
  ],
});
