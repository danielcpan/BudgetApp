<template>
   <div id="category-form" class="dp-form" v-if="!$store.state.categories.loading">
    <v-container fluid>
      <v-layout row wrap justify-center align-center>
        <v-flex md6>
          <v-card>
            <v-container grid-list-md>
            <v-card-title>
              <span class="dp-head-1 pb-0">
                {{ $route.name }}
              </span>
            </v-card-title>
            <v-card-text class="pt-0">
              <v-divider></v-divider>
              <v-layout row wrap pt-3>
                <v-flex xs12 sm6>
                  <email-field v-model="email" :validate="false"></email-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <password-field
                    v-model="password"
                    :revealOption="false">
                  </password-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions class="px-3">
              <router-link
                to="/signup"
                tag="button"
                class="dp-btn dp-btn--secondary dp-btn-size--medium">
                  Create an account
              </router-link>
              <v-spacer></v-spacer>
              <button
                @click="submit()"
                type="button"
                class="dp-btn dp-btn--primary dp-btn-size--medium">
                  Login
              </button>
            </v-card-actions>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import EmailField from './EmailField.vue';
import PasswordField from './PasswordField.vue';

export default {
  components: {
    EmailField,
    PasswordField,
  },
  data: () => ({
    email: 'dp2test@gmail.com',
    password: 'Inmobi@123456',
  }),
  computed: {
  },
  methods: {
    ...mapActions('users', ['login']),
    async submit() {
      await this.login({
        email: this.email,
        password: this.password,
      });
      this.$router.push('/');
    },
  },
};
</script>

<style>
</style>
