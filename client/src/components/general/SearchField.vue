<template>
  <div id="search-field" class="input-field">
    <v-text-field
      v-model="searchValue"
      @input="$emit('input', searchValue)"
      append-icon='fa-search'
      :label="label"
      type="text"
      single-line
      outline
      class="search-box dp-form"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: ['value', 'label'],
  data: () => ({
    searchValue: '',
  }),
  mounted() {
    this.searchValue = this.value;
  },
};
</script>

<style>
.search-box i.v-icon.fa.fa-search.theme--dark {
  font-size: 1rem;

}
.search-box.v-text-field--outline > .v-input__control > .v-input__slot{
  /* width: 5rem; */
}
</style>
