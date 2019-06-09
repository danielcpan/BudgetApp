<template>
  <div id="background-color-field" class="input-field">
    <div class="field-title">Background Color</div>
    <v-menu left offset-y>
      <template v-slot:activator="{on}">
        <v-text-field 
          label="Color" 
          v-model="color.hex" 
          @input="$emit('input', color)"
          color="red"
          required
          single-line
          outline
        >
          <template v-slot:append>
            <v-icon v-on="on">fas fa-palette</v-icon>
          </template>
        </v-text-field>
      </template>
      <swatches v-model="color"></swatches>
    </v-menu>
  </div>
</template>

<script>
import { Swatches } from 'vue-color'

export default {
  components: {
    Swatches,
  },
  props: ['value'],
  data: () => ({
    color: {
      hex: '#000000'
    }
  }),
  mounted() {
    this.color = this.value
  }
};
</script>

<style>
</style>
