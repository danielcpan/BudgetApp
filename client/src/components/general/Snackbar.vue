<template>
  <v-snackbar
    v-model="snack.show"
    :timeout="snack.timeout || defaultTimeout"
    color="#424242"
    top
    class="dp-snackbar"
  >
    <div class="snackbar-text">
      <v-icon color="#5ad09a" style="padding-right: 1rem;">fas fa-check-circle</v-icon>
        <span style="font-weight: bold; color: black;">{{ snack.header }}</span>
        <span style="color: black;">{{ snack.body }}</span>
    </div>

    <v-btn
      color="white"
      flat
      @click="forceHideSnackBar()"
    >
      <v-icon color="#5ad09a">fas fa-times</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    defaultTimeout: 3000,
    isForcedHidden: false,
  }),
  computed: {
    ...mapState({
      snack: state => state.snackbar.snack,
    }),
  },
  watch: {
    snack: {
      handler() {
        if (!this.isForcedHidden && this.snack.show === false) {
          this.$store.dispatch('snackbar/clearAndHideSnackbar');
        }
      },
      deep: true,
    },
  },
  methods: {
    forceHideSnackBar() {
      this.isForcedHidden = true;
      this.$store.dispatch('snackbar/clearAndHideSnackbar');
    },
  },
};
</script>

<style>

.dp-snackbar .v-snack__wrapper {
  min-width: 500px;
}

.dp-snackbar .snackbar-text {
  color: black;
}
</style>
