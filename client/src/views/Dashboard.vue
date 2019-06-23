<template>
  <div id="dashboard">
    <!-- <v-container>
      <v-layout align-center justify-center row fill-height>
        <v-flex md12>
          WELCOME TO THE BUDGET APP
        </v-flex>
      </v-layout>
    </v-container> -->
    <CategoriesTable />
    <ExpensesTable />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import CategoriesTable from '../components/categories/table/CategoriesTable.vue';
import ExpensesTable from '../components/expenses/table/ExpensesTable.vue';

export default {
  components: {
    CategoriesTable,
    ExpensesTable,
  },
  // computed: {
  //   ...mapState({
  //     user: state => state.users.user
  //   })
  // }
  methods: {
    ...mapActions('users', ['getCurrentUser']),
  },
  mounted() {
    this.getCurrentUser();
  },
};
</script>

<style>

</style>
