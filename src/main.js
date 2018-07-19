import Vue from 'vue'
import VueSkycons from 'vue-skycons'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueSkycons, { color: '#ddd' })

new Vue({
  render: h => h(App)
}).$mount('#app')
