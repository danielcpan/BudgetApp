<template>
  <v-app dark>
    <default-layout />
    <v-content>
      <router-view/>
    </v-content>
    <snackbar />
  </v-app>
</template>

<script>
import DefaultLayout from './components/layouts/Default.vue';
import Snackbar from './components/general/Snackbar.vue';

export default {
  components: {
    DefaultLayout,
    Snackbar,
  },

};
</script>

<style>
</style>
