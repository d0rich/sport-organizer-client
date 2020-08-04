import axios from 'axios'

export default {
  state: {
    group: {}
  },
  mutations: {
    set_group(state, grData) {
      state.group = grData
    }
  },
  actions: {
    fetch_group_data(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${ctx.rootState.server}/get_group?groupID=${id}`)
          .then(res => {
            ctx.commit('set_group', res.data)
            resolve()
          })
          .catch(err => { console.error(err), reject(err) })
      })
    }

  },
  getters: {
    watch_group(state) {
      return state.group
    }
  }
}