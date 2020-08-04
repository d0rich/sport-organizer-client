import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { mapMutations, mapGetters, mapActions, mapState } from 'vuex'
import crypto from 'crypto'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios;
Vue.prototype.$crypto = crypto;

Vue.mixin({
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['onLoad', 'modeName']),
    ...mapState(['server']),
    Today() {
      const date = new Date()
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    }
  },
  methods: {
    ...mapMutations(['loaderOn', 'loaderOff', 'setMode']),
    ...mapActions(['sportsmanMode', 'trainerMode', 'login']),
    send_params(params) {
      //[['key', param],['key', param],['key', param]]
      let res = `?${params[0][0]}=${params[0][1]}`
      params.shift()
      params.forEach(param => {
        res += `&${param[0]}=${param[1]}`
      });
      return res
    }
  },

})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')