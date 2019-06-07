<template>
  <div class="expenses-table" v-if="!$apollo.queries.categories.loading">
    <v-container pb-0 fluid>
      <v-layout px-4 row wrap>
        <v-flex xs12 sm6 md4>
          <v-layout row>
            <span class="dp-head-1">
              Total Expenses: 
              <span class="total-expense-header-value">
                $ {{ totalExpenses }}
              </span>
            </span>
          </v-layout>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 sm12 md5>
          <v-layout row wrap justify-end>
            <v-flex xs6>
            <search-field 
              label="Search my apps..."
              v-model="search">
            </search-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs5>
            <router-link to="/expense/new" tag="button" class="dp-btn dp-btn--primary dp-btn-size--medium">
              <span>Add Expense + </span>
            </router-link>
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
            :items="categories"
            :search="search"
            :pagination.sync="pagination" 
            :expand="expand"
            item-key="name" 
            must-sort>
            <template v-slot:items="props">
              <tr 
                @mouseover="showIndex=props.index" 
                @mouseleave="showIndex=null"
                @click="props.expanded = !props.expanded">
                <td>
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
                <td>
                  <div class="category-name">$ {{ getCategoryTotalExpense(props.item) }}</div>
                </td>
                <td>
                  <div class="category-name">{{ props.item.expenses.length }}</div>
                </td>
                <td>
                  <div class="category-name">06/04/2019</div>
                </td>
                <td>
                  <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12>
                      <v-progress-linear 
                        :color="props.item.color" 
                        :value="props.item.valueDeterminate">
                      </v-progress-linear>                      
                    </v-flex>
                  </v-layout>
                </td>
                <td>
                  <v-layout>
                  <v-flex xs12 pl-2 v-show="showIndex == props.index">
                    <v-menu left offset-y>
                      <template v-slot:activator="{on}">
                        <v-flex>
                          <v-icon v-on="on">more_horiz</v-icon>
                        </v-flex>
                      </template>
                      <v-list>
                        <v-list-tile @mouseover="addHoverColor = '#4D89FF'" @mouseleave="addHoverColor = null" @click="openEdit()" >
                          <v-list-tile-title>
                            <v-layout justfy-center>
                              <v-flex xs1>
                              <v-icon :style="{color: 'addHoverColor'}" size="12" >fas fa-plus-square</v-icon>
                              </v-flex>
                              <v-flex xs11 class="manage-menu px-4">
                              Add Expense
                              </v-flex> </v-layout></v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @mouseover="manageHoverColor = '#4D89FF'" @mouseleave="manageHoverColor = null"  @click="openDelete(); toDelete=props.item.id">
                          <v-list-tile-title>
                            <v-layout justify-center>
                              <v-flex xs1>
                                <v-icon :style="{color: manageHoverColor}" size="12" class="pb-1"> fas fa-cog </v-icon>
                              </v-flex>
                              <v-flex xs11 class="manage-menu px-4">Edit Category</v-flex>
                              </v-layout></v-list-tile-title>
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
import gql from 'graphql-tag';

import SearchField from '../components/general/SearchField.vue';

const GET_EXPENSES = gql`
  query {
    expenses(userId: 23) {
      id
      note
      value
      category {
        name
      }
    }
  }
`

const GET_CATEGORIES = gql`
  query {
    categories(userId: 1) {
      id
      name
      icon
      color
      expenses {
        id
        note
        value
      }    
    }
  }
`

export default {
  components: {
    SearchField
  },
  data: () => ({
    expand: true,
    search: null,
    manageHoverColor: null,
    addHoverColor: null,
    showIndex: null,    
    headers: [
      {text: 'Category', value: 'name', width: 300},
      {text: 'Expenses', value: 'totalExpense', width: 100},
      {text: 'Items', value: 'totalExpense', width: 100},
      {text: 'Last Entry Date', value: 'totalExpense', width: 100},
      {text: '', value: 'totalExpense', width: 300},
      {text: 'Manage', value: 'totalExpense', width: 100},
    ],
    rowsPerPageItems: [],
    pagination: {
      rowsPerPage: 10
    },
    totalExpenses: "47.29",
  }),
  apollo: {
    $loadingKey: 'Loading',
    categories: {
      query: GET_CATEGORIES
    }
  },
  methods: {
    getCategoryTotalExpense(category) {
      console.log("getting total");
      let totalExpense = 0;

      for (let expense of category.expenses) {
        totalExpense += parseFloat(expense.value)
      }

      return totalExpense.toFixed(2)
    }
  },
  getCategoryLastInputDate(category) {
    let lastDate = '';


  }
}
</script>

<style>
.category-icon.theme--dark.v-icon{
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 20px;
}
.total-expense-header-value {
  background: -webkit-linear-gradient(left, #5ad09a , #38af79);
  background: -o-linear-gradient(right, #5ad09a, #38af79);
  background: -moz-linear-gradient(right, #5ad09a, #38af79);
  background: linear-gradient(to right, #5ad09a , #38af79); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.category-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.theme--dark.v-table {
  /* background-color: #1a1a1c; */
  background-color: #2d2d2d;
}
.theme--dark.v-datatable .v-datatable__actions {
  background-color: #2d2d2d;
  border-top: none;
}
table.v-table tbody td, table.v-table tbody th {
  /* height: 70px; */
}
.nested-table table.v-table tbody td, table.v-table tbody th {
  height: 48px;
}
</style>
