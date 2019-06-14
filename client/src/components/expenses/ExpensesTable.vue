<template>
  <div id="expenses-table" class="dp-table" v-if="!$store.state.users.loading && !$store.state.expenses.loading">
    <v-container pb-0 fluid>
      <v-layout px-4 row wrap>
        <v-flex xs12 sm6 md5>
          <v-layout row>
            <span class="dp-head-1">
              Total Expenses:
              <span class="header-value">
                $ {{ user.totalExpenses }}
              </span>
            </span>
          </v-layout>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md6>
          <v-layout row wrap justify-end>
            <v-flex xs6 sm7 md8>
              <search-field
                label="Search expenses..."
                v-model="search">
              </search-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs5 sm5 md4>
              <button
                @click="$router.push({ path: '/expense/new'})"
                type="button"
                class="dp-btn dp-btn--primary dp-btn-size--medium"
                style="float: right">
                  Add Expense +
              </button>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container pt-0 fluid>
      <v-layout px-4 pb-4>
        <v-flex>
          <v-data-table
            ref="dTable"
            :headers="headers"
            :items="expenses"
            :search="search"
            :pagination.sync="pagination"
            item-key="note"
            must-sort>
            <template v-slot:items="props">
              <tr
                @mouseover="showIndex=props.index"
                @mouseleave="showIndex=null">
                <td class="name-col">
                  <v-layout row wrap>
                  <v-flex xs11>
                    <div class="expense-name">{{ props.item.note }}</div>
                  </v-flex>
                  </v-layout>
                </td>
                <td class="cost-col">
                  <div class="expense-name">$ {{ props.item.cost }}</div>
                </td>
                <td class="category-col">
                  <v-layout row wrap>
                    <v-flex xs4 sm3 md2>
                      <v-icon
                        color="white"
                        v-bind:style="{backgroundColor: props.item.category.color}"
                        class="category-icon">
                        {{ props.item.category.icon }}
                      </v-icon>
                    </v-flex>
                    <v-flex xs8 sm9 md10 pl-5 pt-2>
                      <div class="category-name">{{ props.item.category.name }}</div>
                    </v-flex>
                  </v-layout>
                </td>
                <td class="date-col">
                  <div class="expense-name">{{ format(props.item.date) }}</div>
                </td>
                <td class="manage-col">
                  <v-layout>
                  <v-flex xs12 pl-2 v-show="showIndex == props.index">
                    <v-menu left offset-y>
                      <template v-slot:activator="{on}">
                        <v-flex>
                          <v-icon v-on="on">more_horiz</v-icon>
                        </v-flex>
                      </template>
                      <v-list>
                        <v-list-tile @click="$router.push({ path: `/expense/${props.item.id}/edit`})">
                          <v-list-tile-title>
                            <v-layout justfy-center>
                              <v-flex xs1>
                                <v-icon>fas fa-cog</v-icon>
                              </v-flex>
                              <v-flex xs11 class="manage-menu px-4">Edit Expense</v-flex>
                            </v-layout>
                          </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="deleteExpense(props.item.id)">
                          <v-list-tile-title>
                            <v-layout justify-center>
                              <v-flex xs1>
                                <v-icon>fas fa-trash</v-icon>
                              </v-flex>
                              <v-flex xs11 class="manage-menu px-4">Delete Expense</v-flex>
                            </v-layout>
                          </v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </v-flex>
                  </v-layout>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import { format } from '../../utils/dateFormatter';
import SearchField from '../general/SearchField.vue';

export default {
  components: {
    SearchField,
  },
  data: () => ({
    expenseObj: null,
    showExpenseForm: false,
    actionType: null,
    search: null,
    showIndex: null,
    headers: [
      { text: 'Expenses', value: 'note', width: 250 },
      { text: 'Cost', value: 'cost', width: 150 },
      { text: 'Category', value: 'category.name', width: 300 },
      { text: 'Date', value: 'date', width: 200 },
      {
        text: 'Manage', value: '', width: 100, sortable: false,
      },
    ],
    pagination: {
      rowsPerPage: 10,
    },
  }),
  computed: {
    ...mapState({
      user: state => state.users.currentUser,
      expenses: state => state.expenses.expensesList,
    }),
  },
  mounted() {
    this.getCurrentUser();
    this.getExpensesList(1);
  },
  methods: {
    ...mapActions('users', ['getCurrentUser']),
    ...mapActions('expenses', ['getExpensesList', 'deleteExpense']),
    format,
  },
};
</script>

<style>
.dp-table .expense-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
