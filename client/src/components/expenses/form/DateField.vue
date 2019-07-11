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
      <v-date-picker v-model="date">
        <v-card-actions>
          <v-flex pr-5 mr-5>
            <button 
              @click="menu = false"
              type="button" 
              class="dp-btn dp-btn--secondary dp-btn-size--small"
            >
              Cancel
            </button>
          </v-flex>
          <v-flex>
            <button 
              @click="menu = false"
              type="button" 
              class="dp-btn dp-btn--primary dp-btn-size--small"
            >
              Ok
            </button>
          </v-flex>
        </v-card-actions>
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
    menu: false
  }),
  computed: {
    formattedDate() {
      return format(this.date)
    },
    dateRules() {
      const requiredRule = v => !!v || 'Date is required';

      return [requiredRule];
    },    
  },
  mounted() {
    if (this.value === '') {
      this.date = new Date().toISOString().substr(0, 10)
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
