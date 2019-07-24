<template>
  <div id="date-field" class="input-field">
    <div class="field-title">Date</div>
    <v-menu
      lazy
      :close-on-content-click="false"
      v-model="menu"
      transition="scale-transition"
      full-width
    >
      <v-text-field
        label="Date"
        :rules="dateRules"
        v-model="formattedDate"
        slot="activator"
        readonly
        required
        single-line
        outline
      >
        <template v-slot:append>
          <v-icon>fas fa-calendar-day</v-icon>
        </template>
      </v-text-field>
      <v-date-picker
        v-model="date"
        @change="menu = false; $emit('input', new Date().toISOString())">
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import format from 'date-fns/format';

export default {
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      date: '',
      menu: false,
    };
  },
  watch: {
    value() {
      console.log('something changed');
      this.date = this.value;
    },
  },
  computed: {
    formattedDate() {
      return this.date ? format(this.date, 'MMM DD, YYYY') : '';
    },
    dateRules() {
      const requiredRule = v => !!v || 'Date is required';

      return [requiredRule];
    },
  },
  // mounted() {
  //   if (this.value === '') {
  //     this.date = new Date().toISOString().substr(0, 10);
  //   } else {
  //     this.date = new Date(this.value).toISOString().substr(0, 10);
  //   }
  // }
};
</script>

<style>
</style>
