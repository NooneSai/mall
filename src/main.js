import Vue from 'vue'
import App from './App.vue'
import router from 'router/index.js'
import store from './store'

Vue.config.productionTip = false
// 通过原形设置总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
