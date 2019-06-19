<template>
  <div id="password-field" class="input-field">
    <div class="field-title">{{ titleType }}</div>
    <v-text-field
      v-model="password"
      @input="$emit('input', password)"
      :rules="passwordRules"
      :label="`Enter ${titleType} Password`"
      :type="show ? 'text' : 'password'"
      single-line
      outline
    >
    <template v-slot:append>
      <v-layout row wrap v-if="revealOption">
        <v-flex pt-2 mt-1>
          <span @click="show = !show" style="color: #5ad09a">SHOW</span>
        </v-flex>
      </v-layout>
    </template>

    </v-text-field>
  </div>
</template>

<script>
export default {
  props: ['value', 'titleType', 'revealOption'],
  data: () => ({
    password: '',
    show: false
  }),
  mounted() {
    this.password = this.value;
  },
  computed: {
    passwordRules() {
      const requiredRule = v => !!v || `${this.titleType} is required`;
      const lengthRule = v => (v.length >= 8 && v.length <= 255) || 'Please enter a value between 8 and 255 characters long';

      return [requiredRule, lengthRule];
    }
  }
}
</script>

<style>
</style>
