<template>
  <v-navigation-drawer
    :mini-variant.sync="mini"
    permanent
    width="225"
    app
    class="default-drawer"
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon id="logo">fa-wallet</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Budget App</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile
        v-for="item in items"
        :key="item.title"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title class="link-title">
            <router-link :to="item.path">
              {{ item.title }}
            </router-link>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    mini: true,
    items: [
      { title: 'Dashboard', icon: 'dashboard', path: '/' },
      // { title: 'Categories', icon: 'fas fa-signal', path: '/categories-table' },
      // { title: 'Expenses', icon: 'history', path: '/expenses-table' },
      // { title: 'History', icon: 'history' },
      // { title: 'Goals', icon: 'fas fa-piggy-bank' },
      // { title: 'Save', icon: 'lightbulb' },
    ],
  }),
};
</script>

<style>
.default-drawer .link-title:hover {
  color: #5ad09a;
}

.link-title a {
  text-decoration: none;
  color: white;
}
</style>
