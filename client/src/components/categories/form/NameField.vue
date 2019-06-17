<template>
  <div id="name-field" class="input-field">
    <div class="field-title">Name</div>
    <v-text-field
      label="Name"
      v-model="name"
      @input="$emit('input', name)"
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
    name: '',
  }),
  mounted() {
    this.name = this.value;
  },
};
</script>

<style>
</style>
