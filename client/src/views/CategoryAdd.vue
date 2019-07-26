<template>
  <category-form
    :header="'Add a New Category'"
    :submitCallback="submitCreateCategory">
  </category-form>
</template>

<script>
import { mapActions } from 'vuex';

import CategoryForm from '../components/categories/form/CategoryForm.vue';

export default {
  components: {
    CategoryForm,
  },
  methods: {
    ...mapActions('categories', ['createCategory']),
    async submitCreateCategory(Category) {
      await this.createCategory(Category);
      this.$router.push('/');
    },
  },
};
</script>

<style>
</style>
