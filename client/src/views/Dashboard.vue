<template>
  <div>
    <v-container fluid pb-0>
      <v-layout px-4 row wrap> <!-- entire top row -->
        <v-flex xs12 lg6> <!-- left half -->
          <v-layout row wrap> <!-- page title header -->
            <span class="im-head-1 im-black pb-3">Total Expenses: <span class="im-dark-grey user-count">${{ totalExpenses }}</span></span>
            <search-field label="Search my apps..."></search-field>
          </v-layout>
        </v-flex>
        <v-flex xs12 lg4 offset-lg2> <!-- right half -->
          <v-layout justify-end row>
            <router-link to="/expense/new" tag="button" class="im-btn im-btn--primary im-btn-size--medium">
              <span>Add New Expense</span>
              <v-icon class="im-btn__icon plus-icon">fas fa-plus</v-icon>
            </router-link>
          </v-layout>
        </v-flex>
      </v-layout>
      <div class="px-4 pt-4"><v-divider></v-divider></div>
    </v-container>
    <v-container fluid py-0> <!-- bottom section -->
      <v-layout px-4 pb-4> <!-- entire bottom row -->
        <v-flex>
          <v-data-table 
            ref="dTable" 
            :headers="headers" 
            :items="categories"
            :pagination.sync="pagination" 
            item-key="categories" 
            must-sort>
            <template v-slot:items="props">
              <tr @mouseover="showIndex=props.index" @mouseleave="showIndex=null">


                <td>
                  <v-layout row wrap>
                    <v-flex xs4 sm3 md2>
                      <v-icon 
                        :color="props.item.color" 
                        class="category-icon">
                        {{ props.item.icon }}
                      </v-icon>
                    </v-flex>
                    <v-flex xs8 sm9 md10>
                      <div style="padding-top: 0.25rem">{{ props.item.name }}</div>
                    </v-flex>
                  </v-layout>
                </td>


                <td valign="middle">
                  <v-layout row wrap>
                    <v-flex xs4 sm3 md2 lg1>
                      <div style="padding-top: 0.5rem">{{props.item.totalExpense}}</div>
                    </v-flex>
                    <v-flex xs8 sm9 md10 lg11>
                      <v-progress-linear :color="props.item.color" :value="props.item.valueDeterminate"></v-progress-linear>                      
                    </v-flex> 
                  </v-layout>                 
                  <!-- <div>
                  <div><span>{{props.item.totalExpense}}</span></div>
                  <v-progress-linear :color="props.item.color" :value="props.item.valueDeterminate"></v-progress-linear>
                  </div> -->
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
import SearchField from '../components/general/SearchField.vue';

export default {
  components: {
    SearchField
  },
  data: () => ({
    headers: [
      {text: 'Categories', value: 'categories', width: 250},
      {text: 'Expenses', value: 'expenses', width: 750},
    ],
    rowsPerPageItems: [],
    showIndex: null,
    pagination: {
      rowsPerPage: 10
    },
    totalExpenses: "47.29",
    categories: [
      { 
        name: "Eating Out",
        icon: "fa-utensils",
        color: "#4684FF",
        valueDeterminate: 100,
        totalExpense: "37.43",
        expenses: [
          { note: "Pizza", value: "$7.69" }
        ]
      },
      { 
        name: "Gas",
        icon: "fa-gas-pump",
        color: "#4684FF",
        valueDeterminate: 70,
        totalExpense: "21.08",
        expenses: [
          { note: "Pizza", value: "$7.69" }
        ]
      },
      { 
        name: "Rent",
        icon: "fa-home",
        color: "#4684FF",
        valueDeterminate: 30,
        totalExpense: "7.29",
        expenses: [
          { note: "Pizza", value: "$7.69" }
        ]
      }      
    ]
  })
}
</script>

<style>
.category-icon.theme--dark.v-icon{
  width: 1.5rem;
}
</style>
