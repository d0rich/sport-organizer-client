import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.mixin({
    data() {
        return {

        }
    },
    methods: {
        send_params(params) {
            //[['key', param],['key', param],['key', param]]
            let res = `?${params[0][0]}=${params[0][1]}`
            params.shift()
            params.forEach(param => {
                res += `&${param[0]}=${param[1]}`
            });
            return res
        }
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')