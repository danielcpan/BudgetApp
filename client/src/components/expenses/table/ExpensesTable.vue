<template>
  <div
    id="expenses-table"
    class="dp-table">
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
    this.getExpensesList({ startDate: null, endDate: null });
  },
  methods: {
    ...mapActions('expenses', ['getExpensesList']),
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
