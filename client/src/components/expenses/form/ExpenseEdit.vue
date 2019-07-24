<template>
  <expense-form
    :header="'Edit Expense'"
    :expenseData="expenseData"
    :submitCallback="submitUpdateExpense">
  </expense-form>
</template>

<script>
import { mapActions } from 'vuex';

import ExpenseForm from './ExpenseForm.vue';

export default {
  components: {
    ExpenseForm,
  },
  data: () => ({
    // Unsure if best practice but set as
    // undefined so it can use default prop
    expenseData: undefined,
  }),
  async beforeMount() {
    this.expenseData = await this.getExpense(this.$route.params.id);
  },
  methods: {
    ...mapActions('expenses', ['getExpense', 'updateExpense']),
    async submitUpdateExpense(expense) {
      await this.updateExpense(expense);
      this.$router.push('/');
    },
  },
};
</script>

<style>
</style>
