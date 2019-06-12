<template>
  <div id="note-field" class="input-field">
    <div class="field-title">Note</div>
    <v-text-field
      label="Note"
      v-model="note"
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
};
</script>

<style>
</style>
