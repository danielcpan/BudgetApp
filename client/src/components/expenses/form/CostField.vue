<template>
  <div id="cost-field" class="input-field">
    <div class="field-title">Cost</div>
    <v-text-field
      label="Cost"
      v-model="cost"
      :rules="costRules"
      @input="$emit('input', cost)"
      required
      type="number"
      single-line
      outline>
    <template v-slot:prepend-inner>
      <span class="pt-1">$</span>
    </template>
    </v-text-field>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
    },
  },
  data () {
    return {
      cost: this.value,  
    }
  },
  watch: {
    value() {
      this.cost = this.value;
    }
  },
  computed: {
    costRules() {
      const requiredRule = v => !!v || 'Valid cost is required';

      return [requiredRule];
    },
  },
};
</script>

<style>
</style>
