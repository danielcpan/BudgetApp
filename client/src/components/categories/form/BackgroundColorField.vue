<template>
  <div id="background-color-field" class="input-field">
    <div class="field-title">Background Color</div>
    <v-menu left offset-y>
      <template v-slot:activator="{on}">
        <v-text-field
          label="Color"
          :rules="backgroundColorRules"
          v-model="color"
          required
          single-line
          outline
        >
          <template v-slot:append>
            <v-icon v-on="on">fas fa-palette</v-icon>
          </template>
        </v-text-field>
      </template>
      <swatches v-model="swatchColor" @input="$emit('input', swatchColor.hex)"></swatches>
    </v-menu>
  </div>
</template>

<script>
import { Swatches } from 'vue-color';

export default {
  components: {
    Swatches,
  },
  props: ['value'],
  data: () => ({
    swatchColor: '',
  }),
  computed: {
    color: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    backgroundColorRules() {
      const requiredRule = v => !!v || 'Color is required';

      return [requiredRule];
    },
  },
};
</script>

<style>
</style>
