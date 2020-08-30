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
    ...mapGetters(['onLoad', 'modeName', 'tMode']),
    ...mapState(['server', 'token']),
    timeZone(){
      const offset = - (new Date().getTimezoneOffset()/60)
      if(offset > 0) return `+${this.twoSimbols(offset)}`
      else return `-${this.twoSimbols(offset)}`
    }
  },
  methods: {
    ...mapMutations(['loaderOn', 'loaderOff', 'setMode']),
    ...mapActions(['sportsmanMode', 'trainerMode', 'login', 'fetch_auth_user']),
    send_params(params) {
      //[['key', param],['key', param],['key', param]]
      let res = `?${params[0][0]}=${params[0][1]}`
      params.shift()
      params.forEach(param => {
        res += `&${param[0]}=${param[1]}`
      });
      return res
    },
    twoSimbols(number){
      number = Math.abs(number)
      if (number<10) return `0${number}`
      else return `${number}`
    },
    dateTime(date){
      date = new Date(date)
      return `${this.twoSimbols(date.getDate())}/${this.twoSimbols(date.getMonth() + 1)}/${date.getFullYear()} ${this.twoSimbols(date.getHours())}:${this.twoSimbols(date.getMinutes())}`
    },
    dateFormatted(date) {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    Today( delay = [0, 0, 0] ) {
      const date = new Date()
      return `${date.getFullYear() + delay[0]}-${date.getMonth() + 1 + delay[1]}-${date.getDate() + delay[2]}`
    },
  },

})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
