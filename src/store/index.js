import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import cover from './modules/cover'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        server: 'http://localhost:8000',
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
    modules: { user, cover }
})