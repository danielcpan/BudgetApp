<template>
  <v-data-table
    ref="dTable"
    :headers="headers"
    :items="tableData"
    :search="search"
    :pagination.sync="pagination"
    item-key="name"
    must-sort
    id="categories-table-body">
    <template v-slot:items="props">
      <tr
        @mouseover="showIndex = props.index"
        @mouseleave="showIndex = null">
        <td class="category-col">
          <v-layout row wrap>
            <v-flex xs4 sm3 md2>
              <v-icon
                color="white"
                v-bind:style="{backgroundColor: props.item.color}"
                class="category-icon">
                {{ props.item.icon }}
              </v-icon>
            </v-flex>
            <v-flex xs8 sm9 md10 pl-3 pt-2>
              <div class="category-name">{{ props.item.name }}</div>
            </v-flex>
          </v-layout>
        </td>
        <td class="total-expenses-col">
          <div class="category-name">$ {{ props.item.totalExpenses }}</div>
        </td>
        <td>
          <div class="category-name">{{ props.item.expenses.length }}</div>
        </td>
        <td class="percent-of-total-col">
          <v-layout row wrap>
            <v-flex xs8 sm8 md9>
              <v-progress-linear
                :color="props.item.color"
                :value="getPercentOfTotal(props.item)">
              </v-progress-linear>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs3 sm3 md2 pt-2>
              {{ getPercentOfTotal(props.item) }}%
            </v-flex>
          </v-layout>
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
                <v-list-tile @click="$router.push({ path: `/category/${props.item.id}/edit`})" >
                  <v-list-tile-title>
                    <v-layout justfy-center>
                      <v-flex xs1>
                        <v-icon>fas fa-cog</v-icon>
                      </v-flex>
                      <v-flex xs11 class="px-4">Edit Category</v-flex>
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
import { mapState } from 'vuex';

export default {
  props: ['tableData'],
  data: () => ({
    showIndex: null,
    headers: [
      { text: 'Category', value: 'name', width: 300 },
      { text: 'Expenses', value: 'totalExpenses', width: 100 },
      { text: 'Items', value: 'expenses.length', width: 100 },
      { text: 'Percent of Total', value: 'totalExpenses', width: 400 },
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
      search: state => state.categories.search,
    }),
  },
  methods: {
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
