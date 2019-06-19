<template>
  <div id="name-field" class="input-field">
    <div class="field-title" v-show="titleType">
      {{ `${titleType} Name` }}
    </div>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      @input="$emit('input', name)"
      :label="`${titleType} Name`"
      type="text"
      single-line
      outline
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: ['value', 'titleType'],
  data: () => ({
    name: '',
  }),
  mounted() {
    this.name = this.value;
  },
  computed: {
    nameRules() {
      const requiredRule = v => !!v || `${this.titleType} Name is required`;
      const lengthRule = v => (v.length >= 2 && v.length <= 35) || 'Please enter a value between 2 and 35 characters long';

      return [requiredRule, lengthRule];
    },
  },
};
</script>

<style>
</style>
