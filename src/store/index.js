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
    loader: false,
    trainerMode: false
  },
  mutations: {
    loaderOn(state) {
      state.loader = true
    },
    loaderOff(state) {
      state.loader = false
    },
    setMode(state) {
      if (localStorage.getItem('trainerMode') !== '')
        state.trainerMode = JSON.parse(localStorage.getItem('trainerMode'))
    },

  },
  actions: {
    trainerMode(ctx) {
      localStorage.setItem('trainerMode', 'true')
      ctx.commit('setMode')
    },
    sportsmanMode(ctx) {
      localStorage.setItem('trainerMode', 'false')
      ctx.commit('setMode')
    }
  },
  getters: {
    onLoad(state) {
      return state.loader
    },
    modeName(state) {
      if (state.trainerMode === true) return 'Режим тренера'
      else return 'Режим спортсмена'
    },
    tMode(state){
      return state.trainerMode
    }
  },
  modules: { user, cover, fetch }
})
