<template>
  <div>
    <Toolbar />
    <NavDrawer />
    <v-content class="im-default inventory">
      <v-container fluid pb-0>
        <v-layout px-4 pt-5 row wrap> <!-- entire top row -->
          <v-flex xs12 md2> <!-- left half -->
            <v-layout row wrap> <!-- page title header -->
              <span class="im-head-1 im-black">My Apps <span class="im-dark-grey apps-count">({{ apps.length }})</span></span>
            </v-layout>
          </v-flex>
          <v-flex md3>
            <v-layout row wrap>
              <search-field
                label="Search my apps..."
                v-model="search">
              </search-field>
            </v-layout>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 md2> <!-- right half -->
            <v-layout justify-end row>
              <router-link to="/apps/new" tag="button" class="im-btn im-btn--primary im-btn-size--medium">
                <span>Add New App +</span>
              </router-link>
            </v-layout>
          </v-flex>
        </v-layout>
        <div class="px-4 pt-4"><v-divider></v-divider></div>
      </v-container>
      <v-container fluid py-0> <!-- bottom section -->
        <v-layout px-4 pb-4> <!-- entire bottom row -->
          <v-flex>
            <v-data-table
              ref="dTable"
              :headers="headers"
              :items="apps"
              :search="search"
              hide-actions
              item-key="email"
              must-sort
              class="im-basic-table apps-table">
              <template v-slot:items="props">
                <tr @mouseover="showIndex=props.index" @mouseleave="showIndex=null">
                  <td>
                    <v-layout row class="app-cell">
                      <div v-if="props.item.platform == 'Android'">
                        <v-icon color="transparent" class="platform-icon">fab fa-android</v-icon>
                      </div>
                      <div v-else-if="props.item.platform == 'iOS'">
                        <v-icon color="transparent" class="platform-icon">fab fa-apple</v-icon>
                      </div>
                      <v-flex xs1 sm1 md1 pl-4>
                        <v-img
                          :src="require('../assets/images/33c503dc4342c51573ead0ff6b8ab4e0.png')"
                          aspect-ratio="1"
                          height="40"
                          width="40"
                        ></v-img>
                      </v-flex>
                      <v-flex xs8 sm9 md9 pl-4>
                        <div class="app-name">{{props.item.name}}</div>
                        <div class="app-platform">{{props.item.platform}}</div>
                      </v-flex>
                      <v-flex xs1 sm1 md1 pt-2>
                        <v-layout justify-end>
                          <router-link v-show="showIndex == props.index" to="/edit-app">
                            EDIT
                          </router-link>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </td>
                  <td v-if="props.item.placements.length">
                    <v-layout>
                      <v-flex xs6 sm6 md4>
                        <div v-for="(placement, index) in props.item.placements.slice(0,3)" :key="index">
                          <div class="placement-status">
                            <span class="placement-count">({{ placement.count }})</span>
                            <span>{{ placement.type}}</span>
                          </div>
                        </div>
                      </v-flex>
                      <v-flex xs6 sm6 md4>
                        <div v-for="(placement, index) in props.item.placements.slice(3,5)" :key="index">
                          <div class="placement-status">
                            <span class="placement-count">({{ placement.count }})</span>
                            <span>{{ placement.type}}</span>
                          </div>
                        </div>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs6 sm6 md1 v-show="showIndex == props.index" pt-3>
                        <v-menu left offset-y class="ma-0 pa-0">
                          <template v-slot:activator="{on}">
                            <v-flex class="text-xs-center">
                            <v-icon class="ma-0 pa-0" v-on="on">more_horiz</v-icon>

                            </v-flex>
                          </template>
                          <v-list class="ma-0 pa-0">
                            <v-list-tile @mouseover="addHoverColor = '#4D89FF'" @mouseleave="addHoverColor = null" @click="openEdit()" >
                              <v-list-tile-title>
                                <v-layout justfy-center>
                                  <v-flex xs1>
                                  <v-icon :style="{color: addHoverColor}" size="12" >fas fa-plus-square</v-icon>
                                  </v-flex>
                                  <v-flex xs11 class="manage-menu px-4">
                                  Add Placements
                                  </v-flex> </v-layout></v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @mouseover="manageHoverColor = '#4D89FF'" @mouseleave="manageHoverColor = null"  @click="openDelete(); toDelete=props.item.id">
                              <v-list-tile-title>
                                <v-layout  justify-center>
                                  <v-flex xs1>
                                    <v-icon :style="{color: manageHoverColor}" size="12" class="pb-1"> fas fa-cog </v-icon>
                                  </v-flex>
                                  <v-flex xs11  class="manage-menu px-4">Manage Placements</v-flex>
                                  </v-layout></v-list-tile-title>
                            </v-list-tile>
                          </v-list>
                        </v-menu>
                      </v-flex>
                  </v-layout>
                  </td>
                  <td v-if="!props.item.placements.length" class="add-placement-container">
                    <v-layout>
                        <v-flex xs6 sm6 md4>
                          <div class="placement-status missing">
                            <span class="placement-count">(0) </span>
                            <span>Missing!</span>
                          </div>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs12 sm12 md12>
                          <v-layout justify-end>
                            <router-link to="/apps/new" tag="button" class="im-btn im-btn--secondary im-btn-size--medium">
                              <span>Add Placement +</span>
                            </router-link>
                          </v-layout>
                        </v-flex>
                    </v-layout>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Toolbar from '../components/Toolbar.vue';
import NavDrawer from '../components/NavDrawer.vue';
import SearchField from '../components/general/SearchField.vue';

export default {
  components: {
    Toolbar,
    NavDrawer,
    SearchField,
  },
  data() {
    return {
      search: null,
      manageHoverColor: null,
      addHoverColor: null,
      showIndex: null,
      numApps: 5,
      headers: [
        { text: 'Apps', value: 'name', width: 600 },
        { text: 'Placements', value: 'email', width: 400, sortable: false },
      ],
    };
  },
  computed: {
    ...mapState({
      apps: state => state.apps.appsList,
    }),
  },
  mounted() {
    this.$store.dispatch('apps/getApps');
  },
};
</script>

<style>
.apps-count {
  font-weight: 400;
}
.apps-table table.v-table tbody td, table.v-table tbody th{
  height: 90px;
}
.apps-table .app-name {
  font-size: 14px;
  color: #4684FF;
  font-weight: 500;
}
.apps-table .app-platform {
  font-size: 12px;
  color: #647184;
}
.apps-table .missing {
  color: #FD5C49;
  text-transform: uppercase;
  padding-top: 1rem;
}
.apps-table .placement-count {
  font-weight: 600;
  padding-right: 1rem;
}
.apps-table .add-placement-container {
  background-image: url('../assets/images/empty-card-image.8f2f782291ba5eb2f46ddf961050fda7.png');
  background-position: bottom right;
  background-size: 100px 100px;
}
.apps-table .platform-icon {
  font-size: 33px !important;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #E2E9F8;
  margin-left: -2.2rem;
}
.apps-table .app-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.apps-table .apps-count {
  font-weight: 400;
}
.apps-table .app-cell {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  border-right: 1px dashed #E2E9F8;
}
</style>
