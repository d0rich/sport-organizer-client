import axios from 'axios'

export default {
  state: {
    watch_profile: {}
  },
  mutations: {
    set_watch_profile(state, data) {
      state.watch_profile = data
    }
  },
  actions: {
    fetch_profile_data(ctx, login) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${ctx.rootState.server}/user?login=${login}`)
          .then(res => {
            ctx.commit('set_watch_profile', res.data)
            resolve()
          })
          .catch(err => { console.error(err), reject(err) })
      })

    }
  },
  getters: {
    user_profile(state) {
      return state.watch_profile
    }
  }
}