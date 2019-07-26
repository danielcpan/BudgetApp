<template>
  <expense-form
    :header="'Add a New Expense'"
    :submitCallback="submitCreateExpense">
  </expense-form>
</template>

<script>
import { mapActions } from 'vuex';

import ExpenseForm from '../components/expenses/form/ExpenseForm.vue';

export default {
  components: {
    ExpenseForm,
  },
  methods: {
    ...mapActions('expenses', ['createExpense']),
    async submitCreateExpense(expense) {
      await this.createExpense(expense);
      this.$router.push('/');
    },
  },
};
</script>

<style>
</style>
