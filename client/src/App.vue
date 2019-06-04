<template>
  <v-app>
    <default-layout />
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import DefaultLayout from './components/layouts/Default.vue'

export default {
  components: {
    DefaultLayout,
  }

}
</script>

<style>
</style>
