<template>
  <div id="date-field" class="input-field">
    <div class="field-title">Date</div>
    <v-menu left offset-y>
      <template v-slot:activator="{on}">
        <v-text-field
          label="Date"
          v-model="formattedDate"
          v-on="on"
          readonly
          required
          single-line
          outline
        >
          <template v-slot:append>
            <v-icon v-on="on">fas fa-calendar-day</v-icon>
          </template>
        </v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        @input="$emit('input', date)">
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import { format } from '../../../utils/dateFormatter';

export default {
  props: ['value'],
  data: () => ({
    date: '',
  }),
  computed: {
    formattedDate() {
      return format(this.date);
    },
  },
  mounted() {
    if (this.value === '') {
      this.date = new Date().toISOString().substr(0, 10);
    } else {
      this.date = new Date(this.value).toISOString().substr(0, 10);
    }
  },
  methods: {
    format,
  },
};
</script>

<style>
</style>
