<template>
  <div>
    <v-container fluid grid-list-xl>
      <v-layout px-4 row wrap> <!-- entire top row -->
        <v-flex xs12 sm12 md6> <!-- left half -->
            <span class="dp-head-1">
              Total Expenses: 
              <span class="total-expense-header-value">
                ${{ totalExpenses }}
              </span>
            </span>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 sm4 md3>
          <search-field class="dp-input" label="Search my apps..."></search-field>
        </v-flex>
        <v-flex xs12 sm6 md3> <!-- right half -->
          <router-link to="/expense/new" tag="button" class="dp-btn dp-btn--primary dp-btn-size--medium">
            <span>Add New Expense</span>
            <v-icon class="dp-btn__icon plus-icon">fas fa-plus</v-icon>
          </router-link>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid> <!-- bottom section -->
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

                <td>
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
        color: "#5ad09a",
        valueDeterminate: 90,
        totalExpense: "37.43",
        expenses: [
          { note: "Pizza", value: "$7.69" }
        ]
      },
      { 
        name: "Gas",
        icon: "fa-gas-pump",
        color: "#ff0000",
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
.plus-icon {
  font-size: 0.6rem !important;
  color: white !important;
  padding-bottom: 0.15rem !important;
  margin-left: 0.25rem !important;
}
.total-expense-header-value {
  background: -webkit-linear-gradient(left, #5ad09a , #38af79);
  background: -o-linear-gradient(right, #5ad09a, #38af79);
  background: -moz-linear-gradient(right, #5ad09a, #38af79);
  background: linear-gradient(to right, #5ad09a , #38af79); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>
