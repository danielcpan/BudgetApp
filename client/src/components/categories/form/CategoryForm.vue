<template>
   <div id="category-form" class="dp-form" v-if="!$store.state.categories.loading">
    <v-container fluid>
      <v-layout row wrap justify-center align-center>
        <v-flex md6>
          <v-card>
            <v-container grid-list-md>
            <v-card-title>
              <span
                class="dp-head-1 pb-0">
                  {{ $route.name === 'New' ? 'Add' : 'Edit' }} Category Details
              </span>
            </v-card-title>
            <v-card-text class="pt-0">
              <v-divider></v-divider>
              <v-form
                ref="form"
                v-model="isValid"
                @keyup.native.enter="submit"
                lazy-validation>
                <v-layout row wrap pt-3>
                  <v-flex xs12>
                    <name-field v-model="category.name"></name-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <icon-field v-model="category.icon"></icon-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <background-color-field v-model="category.color"></background-color-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions class="px-3">
              <router-link
                to="/"
                tag="button"
                class="dp-btn dp-btn--secondary dp-btn-size--medium">
                  Cancel
              </router-link>
              <v-spacer></v-spacer>
              <button
                @click="submit()"
                type="button"
                class="dp-btn dp-btn--primary dp-btn-size--medium">
                  {{ $route.name === 'New' ? 'Add' : 'Edit' }} Category
              </button>
            </v-card-actions>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import NameField from './NameField.vue';
import IconField from './IconField.vue';
import BackgroundColorField from './BackgroundColorField.vue';

export default {
  components: {
    NameField,
    IconField,
    BackgroundColorField,
  },
  data: () => ({
    isValid: true,
  }),
  computed: {
    ...mapState({
      category: state => state.categories.currentCategory,
    }),
  },
  created() {
    if (this.$route.name === 'New') {
      this.clearCurrentCategory();
    } else {
      this.getCategory(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions('categories', [
      'getCategory',
      'clearCurrentCategory',
      'createCategory',
      'updateCategory',
    ]),
    submit() {
      if (this.$refs.form.validate()) {
        const categoryToSubmit = {
          id: this.category.id,
          name: this.category.name,
          icon: this.category.icon,
          color: this.category.color,
          userId: this.category.userId,
        };
        if (this.$route.name === 'New') {
          delete categoryToSubmit.id;
          this.createCategory(categoryToSubmit);
        } else {
          this.updateCategory(categoryToSubmit);
        }
        this.$router.push('/');
      }
    },
  },
};
</script>

<style>
.vc-swatches {
  width: 286px !important;
}
</style>
