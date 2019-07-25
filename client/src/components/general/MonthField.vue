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
        type="month" 
        @change="createDateRange()">
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import format from 'date-fns/format'
import { mapActions } from 'vuex';

export default {
  props: ['value'],
  data: () => ({
    date: new Date().toISOString().substr(0, 7),
    startDate: new Date(),
    endDate: new Date(),
    menu: false
  }),
  computed: {
    formattedDate() {
        const currentDate = new Date().toISOString().substr(0, 7)
        console.log("this.date1: " + this.date)
        console.log("this.date.substr(5,2): " + this.date.substr(5,2))
        console.log("currentDate: " + currentDate.substr(5,2))
        if (this.date.substr(5,2) === currentDate.substr(5,2)) return 'This month'
        return this.date ? format(this.date, 'MMMM YYYY') : ''
    },
    dateRules() {
      const requiredRule = v => !!v || 'Date is required';

      return [requiredRule];
    },
  },
  methods: {
    ...mapActions('expenses', ['getExpensesList', 'updateDateRange']),
    createDateRange() {
      const year = this.date.substr(0, 4)
      const month = this.date.substr(5, 2)

      this.startDate = new Date(year, month-1, 1)
      this.endDate = new Date(year, month, 1)
      this.endDate = new Date(this.endDate.getTime()-1000)

      this.getExpensesList({ startDate: this.startDate, endDate: this.endDate })
      this.menu = false
    }
  }
};
</script>

<style>
</style>
