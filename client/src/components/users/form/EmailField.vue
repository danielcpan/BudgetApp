<template>
  <div id="email-field" class="input-field">
    <div class="field-title">Email</div>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      :error-messages="errors"
      :disabled="isDisabled"
      @input="$emit('input', email.toLowerCase())"
      label='Email'
      type="email"
      single-line
      outline
    ></v-text-field>
  </div>
</template>

<script>
import { IS_EMAIL_UNIQUE_QUERY } from '../../../graphql/user';

export default {
  props: ['value', 'isDisabled', 'validate'],
  data: () => ({
    email: '',
    errors: [],
  }),
  mounted() {
    this.email = this.value;
  },
  watch: {
    async email(val) {
      if (!this.validate) return;
      // To reduce unnecessary validation calls to the database
      if (this.isEmailValid(this.email) && this.isEmailLengthValid(this.email)) {
        const isValid = await this.isEmailUnique(val);
        this.errors = isValid ? [] : ['Email address is already being used'];
      }
    },
  },
  computed: {
    emailRules() {
      const requiredRule = v => !!v || 'E-mail is required';
      const validRule = v => this.isEmailValid(v) || 'E-mail must be valid';
      const lengthRule = v => this.isEmailLengthValid(v) || 'Please enter a value no longer than 254 characters';

      return [requiredRule, validRule, lengthRule];
    },
  },
  methods: {
    isEmailValid(email) {
      const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailReg.test(email);
    },
    isEmailLengthValid(email) {
      return email.length < 255;
    },
    async isEmailUnique(email) {
      const response = await this.$apollo.query({
        query: IS_EMAIL_UNIQUE_QUERY,
        variables: {
          email,
        },
      });

      return response.data.isEmailUnique;
    },
  },
};
</script>

<style>
</style>
