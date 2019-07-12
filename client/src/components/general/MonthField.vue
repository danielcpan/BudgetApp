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
        if (this.date.substr(5,2) === currentDate.substr(5,2)) return 'This month'
        return this.date ? format(this.date, 'MMMM YYYY') : ''
    },
    dateRules() {
      const requiredRule = v => !!v || 'Date is required';

      return [requiredRule];
    },    
  },
  methods: {
    createDateRange() {
      console.log(this.date)

      // this.date = new Date(`${this.date}-01`)

      const dateObj = new Date(`${this.date}-01`)
      console.log(dateObj)

      // this.startDate = new Date(`${this.date}-01`)
      // // current.setMonth(current.getMonth()+1);
      // this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1)
      // this.endDate = new Date(this.endDate.getTime() - 1000)

      // console.log("startDate: " + this.startDate)
      // console.log("this.endDate: " + this.endDate)

      // this.startDate = 
      this.menu = false
    }
  }
};
</script>

<style>
</style>
