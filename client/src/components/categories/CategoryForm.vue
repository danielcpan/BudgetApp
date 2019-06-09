<template>
  <div id="category-form" class="dp-form">
    <v-dialog 
      v-model="show"
      max-width="450px">
      <v-card>
        <v-container grid-list-md pt-0>
        <v-card-title>
          <span class="dp-head-1 pt-3 pb-0">Add Category Details</span>
        </v-card-title>
        <v-card-text class="pt-0">
            <v-divider></v-divider>
            <v-layout row wrap pt-3>
              <v-flex xs12>
                <name-field v-model="name"></name-field>
              </v-flex>
              <v-flex xs12 sm6>
                <icon-field v-model="icon"></icon-field>
              </v-flex>
              <v-flex xs12 sm6>
                <background-color-field v-model="color"></background-color-field>
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
              Add Category
          </button>
        </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import NameField from './NameField.vue';
import IconField from './IconField.vue';
import BackgroundColorField from './BackgroundColorField.vue';

export default {
  components: {
    NameField,
    IconField,
    BackgroundColorField,
  },
  props: ['value'],
  data: () => ({
    name: 'My Category',
    icon: {
      name: 'fa-utensils'
    },
    color: {
      hex: '#000000'
    }
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
.vc-swatches {
  width: 286px !important;
}
.theme--dark.v-sheet {
  background-color: #2d2d2d;
}
</style>
