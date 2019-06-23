<template>
  <div
    id="expenses-table"
    class="dp-table"
    v-if="!$store.state.users.loading && !$store.state.expenses.loading">
    <!-- <expenses-table-header
      :headerValue="getTotalExpenses()">
    </expenses-table-header> -->
    <expenses-table-header
      :headerValue="user.totalExpenses">
    </expenses-table-header>    
    <v-container pt-0 fluid>
      <v-layout px-4 pb-4>
        <v-flex>
          <expenses-table-body :tableData="expenses"></expenses-table-body>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import ExpensesTableHeader from './ExpensesTableHeader.vue';
import ExpensesTableBody from './ExpensesTableBody.vue';

export default {
  components: {
    ExpensesTableHeader,
    ExpensesTableBody,
  },
  computed: {
    ...mapState({
      user: state => state.users.currentUser,
      expenses: state => state.expenses.expensesList,
    }),
  },
  mounted() {
    // this.getCurrentUser();
    this.getExpensesList();
  },
  methods: {
    ...mapActions('users', ['getCurrentUser']),
    ...mapActions('expenses', ['getExpensesList']),
    getTotalExpenses() {
      let totalExpense = 0;
      this.expenses.forEach(expense => {
        totalExpense += parseFloat(expense.cost);
      });

      return totalExpense.toFixed(2);
    }
  },
};
</script>

<style>
.dp-table .expense-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
