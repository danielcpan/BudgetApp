<template>
  <div id="dashboard">
    <CategoriesTable />
    <ExpensesTable />
  </div>
</template>

<script>
import CategoriesTable from '../components/categories/CategoriesTable.vue';
import ExpensesTable from '../components/expenses/ExpensesTable.vue';

export default {
  components: {
    CategoriesTable,
    ExpensesTable,
  },
  data: () => ({

  }),
  mounted() {

  },
  methods: {

  },
};
</script>

<style>

</style>
