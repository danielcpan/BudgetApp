<template>
  <div id="category-field" class="input-field">
    <div class="field-title">Category</div>
    <v-select
      v-model="category"
      :rules="categoryRules"
      :items="categories"
      label="Category"
      item-value="id"
      required
      single-line
      outline
    >
      <template slot="selection" slot-scope="data">
        <template>
          <v-layout row wrap>
            <v-flex xs4 sm3 md2 pt-1 mt-1>
              <v-icon
                color="white"
                v-bind:style="{backgroundColor: data.item.color}"
                class="category-icon">
                {{ data.item.icon }}
              </v-icon>
            </v-flex>
            <v-flex xs8 sm9 md10 pl-3 pt-3>
              <div class="category-name">{{ data.item.name }}</div>
            </v-flex>
          </v-layout>
        </template>
      </template>

      <template slot="item" slot-scope="data">
        <template>
          <v-layout row wrap>
            <v-flex xs4 sm3 md2>
              <v-icon
                color="white"
                v-bind:style="{backgroundColor: data.item.color}"
                class="category-icon">
                {{ data.item.icon }}
              </v-icon>
            </v-flex>
            <v-flex xs8 sm9 md10 pl-3 pt-2>
              <div class="category-name">{{ data.item.name }}</div>
            </v-flex>
          </v-layout>
        </template>
      </template>
    </v-select>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    value: {
      type: String,
    },
  },
  computed: {
    ...mapState({
      categories: state => state.categories.categoriesList,
    }),
    category: {
      get() {
        return this.value;
      },
      set(val) {
        const pickedCategory = this.categories.find(cat => cat.id === val);
        this.$emit('input', pickedCategory.id);
      },
    },
    categoryRules() {
      const requiredRule = v => !!v || 'Category is required';

      return [requiredRule];
    },
  },
  mounted() {
    // Temporary Solution
    this.getCategoriesList({ startDate: new Date('2019/06/01'), endDate: new Date() });
  },
  methods: {
    ...mapActions('categories', ['getCategoriesList']),
  },
};
</script>

<style>
</style>
