<template>
  <div
    id="expenses-table"
    class="dp-table"
    v-if="!$store.state.users.loading && !$store.state.expenses.loading">
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
  data: () => ({
    
  }),
  computed: {
    ...mapState({
      user: state => state.users.currentUser,
      expenses: state => state.expenses.expensesList,
      startDate: state => state.startDate,
      endDate: state => state.endDate
    }),
  },
  mounted() {
    this.getExpensesList({ startDate: this.startDate, endDate: this.endDate });
  },
  methods: {
    ...mapActions('users', ['getCurrentUser']),
    ...mapActions('expenses', ['getExpensesList']),
    getDefaultDateRange() {
      const date = new Date()
      const defaultStartDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString()
      const defaultEndDate = new Date(date.getFullYear(), date.getMonth()+1, 0).toISOString()
      console.log(defaultStartDate)
      console.log(defaultEndDate)
      return { startDate: defaultStartDate, endDate: defaultEndDate}
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
