<template>
  <v-data-table
    ref="dTable"
    :headers="headers"
    :items="tableData"
    :search="search"
    :pagination.sync="pagination"
    item-key="note"
    must-sort
    id="expenses-table-body">
    <template v-slot:items="props">
      <tr
        @mouseover="showIndex = props.index"
        @mouseleave="showIndex = null">
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
          <div class="expense-name">{{ format(props.item.date, 'MMMM DD, YYYY') }}</div>
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
                <v-list-tile @click="$router.push({ path: `/expenses/${props.item.id}/edit`})">
                  <v-list-tile-title>
                    <v-layout justfy-center>
                      <v-flex xs1>
                        <v-icon>fas fa-cog</v-icon>
                      </v-flex>
                      <v-flex xs11 class="manage-menu px-4">Edit Expense</v-flex>
                    </v-layout>
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="deleteExpense(props.item)">
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
</template>

<script>
import { mapState, mapActions } from 'vuex';
import format from 'date-fns/format'

export default {
  props: ['tableData'],
  data: () => ({
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
      search: state => state.expenses.search,
    }),
  },
  methods: {
    ...mapActions('expenses', ['deleteExpense']),
    format,
  },
};
</script>

<style>

</style>
