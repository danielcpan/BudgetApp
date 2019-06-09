<template>
  <div id="categories-table" class="dp-table" v-if="!$store.state.users.loading && !$store.state.categories.loading">
    <v-container pb-0 fluid>
      <v-layout px-4 row wrap>
        <v-flex xs12 sm6 md5>
          <v-layout row>
            <span class="dp-head-1">
              Total Categories:
              <span class="total-expense-header-value">
                 ({{ categories.length }})
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
                @click="showCategoryForm = true"
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
                  <div class="category-name">$ {{ props.item.totalExpenses }}</div>
                </td>
                <td>
                  <div class="category-name">{{ props.item.expenses.length }}</div>
                </td>
                <td>
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
    <category-form v-model="showCategoryForm"></category-form>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { mapState, mapActions } from 'vuex';

// import CategoryForm from '';
import CategoryForm from '../../components/categories/CategoryForm.vue';
import SearchField from '../general/SearchField.vue';

export default {
  components: {
    CategoryForm,
    SearchField,
  },
  data: () => ({
    showCategoryForm: false,
    expand: true,
    search: null,
    manageHoverColor: null,
    addHoverColor: null,
    showIndex: null,
    headers: [
      { text: 'Category', value: 'name', width: 300 },
      { text: 'Expenses', value: 'totalExpenses', width: 100 },
      { text: 'Items', value: 'expenses.length', width: 100 },
      { text: 'Percent of Total', value: 'totalExpenses', width: 400 },
      { text: 'Manage', value: '', width: 100, sortable: false },
    ],
    pagination: {
      rowsPerPage: 10,
    },
  }),
  computed: {
    ...mapState({
      user: state => state.users.currentUser,
      categories: state => state.categories.categoriesList,
    }),
  },
  mounted() {
    this.getCurrentUser();
    this.getCategoriesList();
  },
  methods: {
    ...mapActions('users', ['getCurrentUser']),
    ...mapActions('categories', ['getCategoriesList']),
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
