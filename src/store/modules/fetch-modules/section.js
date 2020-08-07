import axios from 'axios'

export default {
  state: {
    section: {}
  },
  mutations: {
    set_section(state, secData) {
      state.section = secData
    }
  },
  actions: {
    fetch_section_data(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${ctx.rootState.server}/get_section?sectionID=${id}`)
          .then(res => {
            ctx.commit('set_section', res.data)
            resolve()
          })
          .catch(err => { console.error(err); reject(err) })
      })
    }

  },
  getters: {
    watch_section(state) {
      return state.section
    }
  }
}