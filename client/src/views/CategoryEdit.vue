<template>
  <category-form
    :header="'Edit Category'"
    :categoryData="categoryData"
    :submitCallback="submitUpdateCategory">
  </category-form>
</template>

<script>
import { mapActions } from 'vuex';

import CategoryForm from '../components/categories/form/CategoryForm.vue';

export default {
  components: {
    CategoryForm,
  },
  data: () => ({
    // Unsure if best practice but set as
    // undefined so it can use default prop
    categoryData: undefined,
  }),
  async beforeMount() {
    this.categoryData = await this.getCategory(this.$route.params.id);
  },
  methods: {
    ...mapActions('categories', ['getCategory', 'updateCategory']),
    async submitUpdateCategory(category) {
      await this.updateCategory(category);
      this.$router.push('/');
    },
  },
};
</script>

<style>
</style>
