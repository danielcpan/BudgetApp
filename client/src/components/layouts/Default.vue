<template>
  <div class="layout">
    <Toolbar />
    <NavDrawer />
  </div>
</template>

<script>
import Toolbar from '../core/Toolbar.vue';
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
