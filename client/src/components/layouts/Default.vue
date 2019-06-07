<template>
  <div class="layout">
    <toolbar></toolbar>
    <nav-drawer></nav-drawer>
  </div>
</template>

<script>
import Toolbar from '../core/Toolbar';
import NavDrawer from '../core/NavDrawer.vue';

export default {
  components: {
    Toolbar,
    NavDrawer,
  },
};
</script>

<style>
</style>
