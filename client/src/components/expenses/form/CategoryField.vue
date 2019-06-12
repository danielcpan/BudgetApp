<template>
  <div id="category-field" class="input-field">
    <div class="field-title">Category</div>
    <v-select
      v-model="category"
      @input="$emit('input', category)"
      :items="categories"
      label="Category"
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

export default {
  props: ['value'],
  data: () => ({
    categories: [
      { name: 'Eating Out', icon: 'fa-utensils', color: '#5ad09a' },
      { name: 'Rent', icon: 'fa-home', color: '#ff0000' },
    ],
    category: {},
  }),
  mounted() {
    this.category = this.value;
  },
};
</script>

<style>
</style>
