<template>
  <div class="expenses-table">
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
                      <div>{{ props.item.name }}</div>
                    </v-flex>
                  </v-layout>
                </td>
                <td>
                  <v-layout row wrap>
                    <v-flex xs4 sm3 md2 lg1 pt-2>
                      <div>$ {{props.item.totalExpense}}</div>
                    </v-flex>
                    <v-flex xs7 sm8 md9 lg10>
                      <v-progress-linear 
                        :color="props.item.color" 
                        :value="props.item.valueDeterminate">
                      </v-progress-linear>                      
                    </v-flex>
                    <v-flex xs4 sm3 md2 lg1 pt-2 pl-3>
                      <div>3</div>
                    </v-flex>                     
                  </v-layout>
                </td>
              </tr>
            </template>

            <template v-slot:expand="props">
              <v-data-table
                ref="dTable" 
                :headers="headers" 
                :items="categories"
                :search="search"
                :pagination.sync="pagination" 
                :expand="expand"
                item-key="name" 
                hideHeaders
                hideActions
                must-sort>
                <template v-slot:items="props">
                  <tr 
                    @mouseover="showIndex=props.index" 
                    @mouseleave="showIndex=null"
                    @click="props.expanded = !props.expanded">
                    <td>
                      <v-layout row wrap>
                        <v-flex xs4 sm3 md1>
                          <!-- <v-icon 
                            color="white"
                            v-bind:style="{backgroundColor: props.item.color}"
                            class="category-icon">
                            {{ props.item.icon }}
                          </v-icon> -->
                        </v-flex>
                        <v-flex xs8 sm9 md10 pl-1 pt-2>
                          <div>{{ props.item.name }}</div>
                        </v-flex>
                      </v-layout>
                    </td>
                    <td>
                      <v-layout row wrap>
                        <v-flex xs4 sm3 md2 lg1 pt-2>
                          <div>{{props.item.totalExpense}}</div>
                        </v-flex>
                        <v-flex xs8 sm9 md10 lg11>
                          <!-- <v-progress-linear 
                            :color="props.item.color" 
                            :value="props.item.valueDeterminate">
                          </v-progress-linear> -->
                        </v-flex> 
                      </v-layout>
                    </td>
                  </tr>
                </template>
              </v-data-table>
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
    expand: true,
    search: null,
    headers: [
      {text: 'Category', value: 'name', width: 250},
      {text: 'Expense', value: 'totalExpense', width: 750},
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
</style>
