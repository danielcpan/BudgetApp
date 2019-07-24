<template>
  <div
    id="categories-table"
    class="dp-table">
    <catagories-table-header :headerValue="categories.length"></catagories-table-header>
    <v-container pt-0 fluid>
      <v-layout px-4 pb-4>
        <v-flex>
          <categories-table-body :tableData="categories"></categories-table-body>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import CatagoriesTableHeader from './CategoriesTableHeader.vue';
import CategoriesTableBody from './CategoriesTableBody.vue';

export default {
  components: {
    CatagoriesTableHeader,
    CategoriesTableBody,
  },
  computed: {
    ...mapState({
      user: state => state.users.currentUser,
      categories: state => state.categories.categoriesList,
    }),
  },
  mounted() {
    this.getCategoriesList();
  },
  methods: {
    ...mapActions('users', ['getCurrentUser']),
    ...mapActions('categories', ['getCategoriesList']),
    getPercentOfTotal(category) {
      return ((category.totalExpenses / this.user.totalExpenses) * 100).toFixed(2);
    },
  },
};
</script>

<style>
.dp-table .category-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
