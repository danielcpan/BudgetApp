<template>
  <v-toolbar app flat id="default-toolbar">
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <div>
        <v-list subheader class="elevation-9">
          <v-list-group append-icon="fas fa-sort-down">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title class="user-hi">
                  <span>Welcome, <a>{{ user.email }}</a></span>
                </v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="link in links"
              :key="link.title"
              :to="{ path: link.path }"
              class="link-button">
                <v-list-tile-title
                  @click="link.title === 'Logout' ? logout() : ''">
                    {{ link.title }}
                </v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </div>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    links: [
      { title: 'Logout', path: '/login' },
    ],
  }),
  computed: {
    ...mapState({
      user: state => state.users.currentUser,
      isLoggedIn: state => state.users.isLoggedIn,
    }),
  },
  methods: {
    ...mapActions('users', ['logout', 'getCurrentUser']),
  },
};
</script>

<style>
#default-toolbar {
  padding-top: 8px;
}
#default-toolbar .v-list--subheader {
  padding-bottom: 0px;
}
#default-toolbar .v-list,
#default-toolbar .theme--light.v-list .v-list__group__header:hover {
  border-radius: 4px;
}
.link-button {
  height: 50px !important;
}
#default-toolbar .v-list__group__header--active .v-list__group__header__append-icon .v-icon {
  transform: none !important;
  -moz-transform: none !important;
  -webkit-transform: none !important;
}
#default-toolbar .v-list__group__header {
  height: 34px;
}
#default-toolbar .v-list__group__header--active {
  height: 42px;
  border-radius: 4px 4px 0 0 !important;
  border-bottom: 1px solid white;
}
#default-toolbar .v-list__group__header--active .user-hi,
#default-toolbar .v-list__group__header--active .v-list__group__header__append-icon {
  position: relative;
  bottom: 4px;
}
#default-toolbar .theme--dark.v-icon {
  font-size: 14px;
  margin-bottom: 3px;
}
#default-toolbar .v-list__tile__title {
  font-size: 14px !important;
}
#default-toolbar .theme--dark.v-list {
  background: #2d2d2d !important;
}
</style>
