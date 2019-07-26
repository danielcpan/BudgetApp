<template>
  <v-container pb-0 fluid grid-list-md>
    <v-layout px-4 row wrap>
      <v-flex xs12 sm12 md12 pb-3>
        <v-layout row>
          <div class="dp-head-1">
            Total Categories:
            <span class="total-expense-header-value"> ({{ headerValue }}) </span>
          </div>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <v-layout row wrap justify-end>
          <v-flex xs12 sm5 md4>
            <search-field
              label="Search categories..."
              v-model="search">
            </search-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6 sm3 md2>
            <month-field :submitCallback="submitDateRangeFilter"></month-field>
          </v-flex>
          <v-flex xs6 sm3 md2>
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
import MonthField from '../../general/MonthField.vue';
import SearchField from '../../general/SearchField.vue';

export default {
  components: {
    MonthField,
    SearchField,
  },
  props: {
    headerValue: {
      type: Number,
      required: true,
    },
  },
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
    ...mapActions('categories', ['setSearch', 'getCategoriesList']),
    submitDateRangeFilter(dateRange) {
      return this.getCategoriesList(dateRange);
    },
  },
};
</script>

<style>

</style>
