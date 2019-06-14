<template>
  <div id="category-form" class="dp-form" v-if="!$store.state.expenses.loading">
    {{ $route.params.id }}
    <v-container fluid>
      <v-layout row wrap justify-center align-center>
        <v-flex md6>
          <v-card>
            <v-container grid-list-md pt-0>
            <v-card-title>
              <span class="dp-head-1 pt-3 pb-0">{{ $route.name === 'New' ? 'Add' : 'Edit' }} Expense Details</span>
            </v-card-title>
            <v-card-text class="pt-0">
              <v-divider></v-divider>
              <v-layout row wrap pt-3>
                <v-flex xs6>
                  <cost-field v-model="expense.cost"></cost-field>
                </v-flex>
                <v-flex xs6>
                  <date-field v-model="expense.date"></date-field>
                </v-flex>
                <v-flex xs12>
                  <category-field v-model="expense.category"></category-field>
                </v-flex>
                <v-flex xs12>
                  <note-field v-model="expense.note"></note-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions class="px-3">
              <router-link to="/" tag="button" class="dp-btn dp-btn--secondary dp-btn-size--medium">Cancel</router-link>
              <v-spacer></v-spacer>
              <button
                @click="submit()"
                type="button"
                class="dp-btn dp-btn--primary dp-btn-size--medium">
                  {{ $route.name === 'New' ? 'Add' : 'Edit' }} Expense
              </button>
            </v-card-actions>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import CostField from './form/CostField.vue';
import CategoryField from './form/CategoryField.vue';
import DateField from './form/DateField.vue';
import NoteField from './form/NoteField.vue';

export default {
  components: {
    CostField,
    CategoryField,
    DateField,
    NoteField,
  },
  props: ['value'],
  computed: {
    ...mapState({
      user: state => state.users.currentUser,
      expense: state => state.expenses.currentExpense,
    }),
  },
  created() {
    if (this.$route.name === 'New') {
      this.clearCurrentExpense();
    } else {
      this.getExpense(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions('expenses', ['getExpense', 'clearCurrentExpense', 'createExpense', 'updateExpense']),
    submit() {
      const expenseToSubmit = {
        id: this.expense.id,
        cost: this.expense.cost,
        note: this.expense.note,
        date: this.expense.date || new Date().toISOString().substr(0, 10),
        categoryId: this.expense.category.id,
        userId: this.expense.userId,
      };
      if (this.$route.name === 'New') {
        delete expenseToSubmit.id;
        this.createExpense(expenseToSubmit);
      } else {
        this.updateExpense(expenseToSubmit);
      }
      this.$router.push('/');
    },
  },
};
</script>

<style>
</style>
