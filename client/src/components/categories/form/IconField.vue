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
            {{data.item}}
          </v-flex>
        </template>
      </template>

      <template slot="item" slot-scope="data">
        <template>
          <v-layout row>
            <v-flex xs10>
              {{data.item}}
            </v-flex>
            <v-flex xs2>
              <v-icon>{{data.item}}</v-icon>
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
      'fa-utensils',
      'fa-home',
      'fa-plug',
      'fa-wrench',
      'fa-briefcase-medical',
      'fa-gifts',
      'fa-shopping-cart',
      'fa-graduation-cap',
      'fa-hamburger',
      'fa-gas-pump',
      'fa-basketball-ball',
      'fa-church',
      'fa-wine-bottle',
      'fa-dog',
      'fa-birthday-cake',
      'fa-mountain',
      'fa-plane-departure',
    ],
    icon: 'fa-utensils',
  }),
  mounted() {
    this.icon = this.value;
  },
};
</script>

<style>
</style>
