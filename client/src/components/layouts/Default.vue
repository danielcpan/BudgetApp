<template>
  <div class="layout" v-if="$route.name !== 'Login'&& $route.name !== 'Sign Up'">
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
