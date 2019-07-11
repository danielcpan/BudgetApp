<template>
  <div id="name-field" class="input-field">
    <div class="field-title">Name</div>
    <v-text-field
      label="Name"
      v-model="name"
      :rules="nameRules"
      @input="$emit('input', name)"
      required
      single-line
      outline>
    </v-text-field>
  </div>
</template>

<script>

export default {
  props: ['value'],
  data: () => ({
    name: '',
  }),
  mounted() {
    this.name = this.value;
  },
  computed: {
    nameRules() {
      const requiredRule = v => !!v || 'Name is required';
      const lengthRule = v => (v.length >= 2 && v.length <= 23) || 'Please enter a value between 2 and 23 characters long';

      return [requiredRule, lengthRule];
    },
  },  
};
</script>

<style>
</style>
