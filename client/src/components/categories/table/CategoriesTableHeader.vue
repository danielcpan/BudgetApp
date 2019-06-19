<template>
  <v-container pb-0 fluid>
    <v-layout px-4 row wrap>
      <v-flex xs12 sm6 md5>
        <v-layout row>
          <span class="dp-head-1">
            Total Categories:
            <span class="total-expense-header-value">
                ({{ headerValue }})
            </span>
          </span>
        </v-layout>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm12 md6>
        <v-layout row wrap justify-end>
          <v-flex xs6 sm7 md8>
            <search-field
              label="Search categories..."
              v-model="search">
            </search-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs5 sm5 md4>
            <button
              @click="$router.push({ path: '/categories/new' })"
              type="button"
              class="dp-btn dp-btn--primary dp-btn-size--medium"
              style="float: right">
                Add Category +
            </button>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import SearchField from '../../general/SearchField.vue';

export default {
  components: {
    SearchField,
  },
  props: ['headerValue'],
  computed: {
    search: {
      get() {
        return this.$store.state.categories.search;
      },
      set(val) {
        this.setSearch(val);
      },
    },
  },
  mounted() {
    this.setSearch('');
  },
  methods: {
    ...mapActions('categories', ['setSearch']),
  },
};
</script>

<style>

</style>
