<template>
  <div id="dashboard">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex md12>
          WELCOME TO THE BUDGET APP
        </v-flex>
      </v-layout>
    </v-container>
    <CategoriesTable />
    <ExpensesTable />
  </div>
</template>

<script>
import CategoriesTable from '../components/categories/table/CategoriesTable.vue';
import ExpensesTable from '../components/expenses/table/ExpensesTable.vue';

export default {
  components: {
    CategoriesTable,
    ExpensesTable,
  },
};
</script>

<style>

</style>
