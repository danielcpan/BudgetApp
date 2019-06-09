<template>
  <v-layout row justify-center>
    <v-btn color="primary" dark @click="showCategoryForm = true">Open Dialog</v-btn>
    <category-form v-model="showCategoryForm"></category-form>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag';
import { mapState, mapActions } from 'vuex';

import CategoryForm from '../components/categories/CategoryForm.vue';

export default {
  components: {
    CategoryForm,
  },
  data: () => ({
    showCategoryForm: false,
    name: 'My Category',
    icon: {
      name: 'fa-utensils'
    },
    color: {
      hex: '#000000'
    }
  }),
  computed: {
  },
  mounted() {
  },
  methods: {

  },
};
</script>

<style>
.vc-swatches {
  width: 286px !important;
}
.theme--dark.v-sheet {
  background-color: #2d2d2d;
}
</style>
