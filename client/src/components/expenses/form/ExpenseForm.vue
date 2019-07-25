<template>
  <div id="expense-form" class="dp-form">
    <v-container fluid>
      <v-layout row wrap justify-center align-center>
        <v-flex md6>
          <v-card>
            <v-container grid-list-md>
            <v-card-title>
              <span class="dp-head-1 pb-0">{{ header }}</span>
            </v-card-title>
            <v-card-text class="pt-0">
              <v-divider></v-divider>
              <v-form
                ref="form"
                v-model="isValid"
                @keyup.native.enter="submit"
                lazy-validation>
                <v-layout row wrap pt-3>
                  <v-flex xs6>
                    <cost-field v-model="expenseFormData.cost"></cost-field>
                  </v-flex>
                  <v-flex xs6>
                    <date-field v-model="expenseFormData.date"></date-field>
                  </v-flex>
                  <v-flex xs12>
                    <category-field v-model="expenseFormData.categoryId"></category-field>
                  </v-flex>
                  <v-flex xs12>
                    <note-field v-model="expenseFormData.note"></note-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions class="px-3">
              <router-link
                to="/"
                tag="button"
                class="dp-btn dp-btn--secondary dp-btn-size--medium"
              >Cancel
              </router-link>
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
import CostField from './CostField.vue';
import CategoryField from './CategoryField.vue';
import DateField from './DateField.vue';
import NoteField from './NoteField.vue';

export default {
  components: {
    CostField,
    CategoryField,
    DateField,
    NoteField,
  },
  props: {
    header: {
      type: String,
      required: true,
    },
    submitCallback: {
      type: Function,
      required: true,
    },
    expenseData: {
      type: Object,
      default: () => ({
        cost: '',
        note: '',
        date: new Date().toLocaleDateString(),
        categoryId: null,
      }),
    },
  },
  data() {
    return {
      isValid: true,
      expenseFormData: this.expenseData,
    };
  },
  watch: {
    expenseData() {
      this.expenseFormData = this.expenseData;
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.submitCallback(this.expenseFormData);
      }
    },
  },
};
</script>

<style>
</style>
