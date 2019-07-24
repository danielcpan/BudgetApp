<template>
  <div id="expense-form" class="dp-form">
    <expense-form
      :header="'Add a New Expense'"
      :submitCallback="submitCreateExpense">
    </expense-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import ExpenseForm from './ExpenseForm.vue';

export default {
  components: {
    ExpenseForm,
  },
  methods: {
    ...mapActions('expenses', ['createExpense']),
    async submitCreateExpense(expense) {
      console.log('got here');
      await this.createExpense(expense);
      this.$router.push('/');
    },
  },
};
</script>

<style>
</style>
