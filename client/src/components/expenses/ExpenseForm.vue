<template>
  <div id="category-form" class="dp-form">
    <v-dialog
      v-model="show"
      max-width="450px">
      <v-card>
        <v-container grid-list-md pt-0>
        <v-card-title>
          <span class="dp-head-1 pt-3 pb-0">Add Expense Details</span>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-divider></v-divider>
          <v-layout row wrap pt-3>
            <v-flex xs12>
              <cost-field v-model="expense.cost"></cost-field>
            </v-flex>
            <v-flex xs12>
              <category-field v-model="expense.category"></category-field>
            </v-flex>
            <v-flex xs12>
              <date-field v-model="expense.date"></date-field>
            </v-flex>
            <v-flex xs12>
              <note-field v-model="expense.note"></note-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="px-3">
          <button
            @click="show = false"
            type="button"
            class="dp-btn dp-btn--secondary dp-btn-size--medium">
              Cancel
          </button>
          <v-spacer></v-spacer>
          <button
            type="button"
            class="dp-btn dp-btn--primary dp-btn-size--medium">
              Add Expense
          </button>
        </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
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
  data: () => ({
    expense: {
      cost: '5.95',
      category: { name: 'Eating Out', icon: 'fa-utensils', color: '#5ad09a' },
      date: new Date().toISOString().substr(0, 10),
      note: 'McDonalds',
    },
  }),
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>

<style>
</style>
