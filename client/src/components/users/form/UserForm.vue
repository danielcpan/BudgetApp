<template>
   <div id="user-form" class="dp-form" v-if="!$store.state.categories.loading">
    <v-container fluid>
      <v-layout row wrap justify-center align-center>
        <v-flex md6>
          <v-card>
            <v-container grid-list-md>
              <v-card-title>
                <span
                  class="dp-head-1 pb-0">
                    {{ $route.name === 'Sign Up' ? 'Sign Up' : 'Edit Account Details' }}
                </span>
              </v-card-title>
              <v-card-text class="pt-0">
                <v-divider></v-divider>
                <v-form
                  ref="form"
                  v-model="isValid"
                  @keyup.native.enter="submit"
                  lazy-validation>
                  <v-layout row wrap pt-3>
                    <v-flex xs6>
                      <name-field v-model="user.firstName" titleType="First"></name-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <name-field v-model="user.lastName" titleType="Last"></name-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <email-field v-model="user.email" :validate="true"></email-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <password-field
                        v-model="user.password"
                        :revealOption="true">
                      </password-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions class="px-3">
                <router-link
                  to="/login"
                  tag="button"
                  class="dp-btn dp-btn--secondary dp-btn-size--medium">
                    Have an account? Log in!
                </router-link>
                <v-spacer></v-spacer>
                <button
                  @click="submit()"
                  type="button"
                  class="dp-btn dp-btn--primary dp-btn-size--medium">
                    {{ $route.name === 'Sign Up' ? 'Create ' : 'Update' }} my account
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
import NameField from './NameField.vue';
import EmailField from './EmailField.vue';
import PasswordField from './PasswordField.vue';

export default {
  components: {
    NameField,
    EmailField,
    PasswordField,
  },
  data: () => ({
    user: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    isValid: true,
  }),
  methods: {
    ...mapActions('users', ['createUser']),
    submit() {
      if (this.$refs.form.validate()) {
        this.createUser(this.user);
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style>
</style>
