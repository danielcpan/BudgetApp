<template>
  <div id="icon-field" class="input-field">
    <div class="field-title" style="">Font Awesome Icon</div>
    <v-select
      v-model="icon"
      @input="$emit('input', icon)"
      :items="iconsList"
      label="Icon"
      required
      single-line
      outline
    >
      <template slot="selection" slot-scope="data">
        <template>
          <v-flex xs9>
            {{data.item.name}}
          </v-flex>
          <v-icon>{{data.item.name}}</v-icon>
        </template>
      </template>

      <template slot="item" slot-scope="data">
        <template>
          <v-layout row>
            <v-flex xs9>
              {{data.item.name}}
            </v-flex>
            <v-flex xs2>
              <v-icon>{{data.item.name}}</v-icon>
            </v-flex>
          </v-layout>
        </template>
      </template>

      <template v-slot:append>
        <v-icon>{{ icon }}</v-icon>
      </template>
    </v-select>
  </div>
</template>

<script>

export default {
  props: ['value'],
  data: () => ({
    iconsList: [
      { name: 'fa-utensils' },
      { name: 'fa-home' },
      { name: 'fa-plug' },
      { name: 'fa-wrench' },
      { name: 'fa-briefcase-medical' },
      { name: 'fa-gifts' },
      { name: 'fa-shopping-cart' },
      { name: 'fa-graduation-cap' },
      { name: 'fa-hamburger' },
      { name: 'fa-gas-pump' },
      { name: 'fa-basketball-ball' },
      { name: 'fa-church' },
      { name: 'fa-wine-bottle' },
      { name: 'fa-dog' },
      { name: 'fa-birthday-cake' },
      { name: 'fa-mountain' },
      { name: 'fa-plane-departure' },
    ],
    icon: {
      name: 'fa-utensils',
    },
  }),
  mounted() {
    this.icon = this.value;
  },
};
</script>

<style>
</style>
