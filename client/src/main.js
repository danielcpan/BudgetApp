import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuetify);

new Vue({
  render: h => h(App),
}).$mount('#app')
