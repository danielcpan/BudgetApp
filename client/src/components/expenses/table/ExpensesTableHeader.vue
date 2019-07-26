<template>
  <v-container pb-0 fluid grid-list-md id="expenses-table-header">
    <v-layout px-4 row wrap>
      <v-flex xs12 sm12 md12 pb-3>
        <v-layout row>
          <div class="dp-head-1">
            Total Expenses:
            <span class="header-value">$ {{ headerValue }}</span>
          </div>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md12>
        <v-layout row wrap justify-end>
          <v-flex xs12 sm5 md4>
            <search-field
              v-model="search"
              label="Search expenses...">
            </search-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6 sm3 md2>
            <month-field :submitCallback="submitDateRangeFilter"></month-field>
          </v-flex>
          <v-flex xs6 sm3 md2>
            <button
              @click="$router.push({ path: '/expenses/new'})"
              type="button"
              class="dp-btn dp-btn--primary dp-btn-size--medium"
              style="float: right"
            >
              Add Expense +
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
      type: String,
      required: true,
    },
  },
  computed: {
    search: {
      get() {
        return this.$store.state.expenses.search;
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
    ...mapActions('expenses', ['setSearch', 'getExpensesList']),
    submitDateRangeFilter(dateRange) {
      return this.getExpensesList(dateRange);
    },
  },
};
</script>

<style>
</style>
