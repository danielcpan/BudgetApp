import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './assets/app.css';
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false
Vue.use(Vuetify);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')