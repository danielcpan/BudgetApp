<template>
  <div id="note-field" class="input-field">
    <div class="field-title">Note</div>
    <v-text-field
      label="Note"
      v-model="note"
      :rules="noteRules"
      @input="$emit('input', note)"
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
    note: '',
  }),
  mounted() {
    this.note = this.value;
  },
  computed: {
    noteRules() {
      const requiredRule = v => !!v || 'Note is required';

      return [requiredRule];
    },
  },  
};
</script>

<style>
</style>
