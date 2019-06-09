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
              <div id="icon-field" class="input-field">
                <div class="field-title">Name</div>
                <!-- <v-text-field 
                  label="Name" 
                  v-model="value" 
                  @input="$emit('input', value)"
                  required
                  single-line
                  outline>
                </v-text-field> -->
              </div>
            </v-flex>
            <v-flex xs12 sm6>
              <!-- <icon-field v-model="icon"></icon-field> -->
            </v-flex>
            <v-flex xs12 sm6>
              <!-- <background-color-field v-model="color"></background-color-field> -->
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
// import NameField from '../categories/NameField.vue';
// import IconField from '../categories/IconField.vue';
// import BackgroundColorField from '../categories/BackgroundColorField.vue';

export default {
  components: {
    // NameField,
    // IconField,
    // BackgroundColorField,
  },
  props: ['value'],
  data: () => ({
    // value: 0,
    category: {},
    date: 'June 7, 2019',
    note: 'McDonalds',
  }),
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
};
</script>

<style>
</style>
