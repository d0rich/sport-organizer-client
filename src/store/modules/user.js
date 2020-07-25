import axios from 'axios'

export default {
    state: {
        auth_user: null
    },
    mutations: {
        set_auth_user(state, userData) {
            state.authUser = userData
        }
    },
    actions: {
        async fetch_auth_user(ctx, login = '') {
            axios
                .get(ctx.server + '/user' + ctx.send_params([
                    ['login', login]
                ]))
                .then(response => {
                    ctx.commit('set_auth_user', response)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    getters: {
        get_auth_user(state) {
            return state.auth_user
        }
    }
}