import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import cover from './modules/cover'
import fetch from './modules/fetch-data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //server: 'http://localhost:3000',
    server: 'https://sport-organizer-server.herokuapp.com',
    loader: false
  },
  mutations: {
    loaderOn(state) {
      state.loader = true
    },
    loaderOff(state) {
      state.loader = false
    }
  },
  getters: {
    onLoad(state) {
      return state.loader
    }
  },
  modules: { user, cover, fetch }
})