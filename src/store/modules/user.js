import axios from 'axios'
import '../../classes'
import { User, DecToken } from "@/classes";

export default {
    state: {
        status: '',
        auth_user: new User(),
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        set_auth_user(state, userData) {
            state.auth_user = new User(userData)
        },
        set_status(state, status) {
            state.status = status
        },
        set_token(state, token = null) {
            if (token == null)
                state.token = localStorage.getItem('token')
            else {
                localStorage.setItem('token', token)
                state.token = token
            }
        },
        del_token(state) {
            localStorage.removeItem('token')
            state.token = ''
        }
    },
    actions: {
        async fetch_auth_user(ctx, id = '') {
            return new Promise((resolve, reject) => {
                axios
                    .get(`${ctx.rootState.server}/users/get?id=${id}`)
                    .then(response => {
                        ctx.commit('set_auth_user', response.data)
                        ctx.commit('loaderOff')
                        resolve()
                    })
                    .catch(err => {
                        console.error(err)
                        reject()
                    })
            })
        },
        async login(ctx, token = null) {
            return new Promise((resolve, reject) => {
                ctx.commit('loaderOn')
                ctx.commit('set_token', token)
                token = ctx.state.token
                const decToken = new DecToken(token)
                if (decToken.verified) {
                    ctx.dispatch('fetch_auth_user', decToken.payload.userID).then(resolve())
                } else {
                    ctx.dispatch('logout')
                    reject()
                }
            })
        },
        logout(ctx) {
            ctx.commit('set_auth_user', new User())
            ctx.commit('del_token')
        }
    },
    getters: {
        auth_status(state) {
            return !!state.auth_user.ID;
        },
        get_auth_user(state) {
            return state.auth_user
        },
        auth_username(state) {
            if (state.auth_user.ID)
                return `${state.auth_user.Name} ${state.auth_user.Surname}`
            else return ''
        },
        auth_login(state) {
            if (state.auth_user)
                return state.auth_user.Login
            else return ''
        },
        auth_id(state) {
            if (state.auth_user)
                return state.auth_user.ID
            else return ''
        },
        user_confirmed(state) {
            if (state.auth_user.ID == null) return true
            return state.auth_user.ActivateCode == null;
        }
    }
}
