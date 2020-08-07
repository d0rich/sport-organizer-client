import axios from 'axios'
import {Group} from "@/classes";

export default {
  state: {
    group: new Group()
  },
  mutations: {
    set_group(state, grData) {
      state.group = new Group(grData)
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
          .catch(err => { console.error(err); reject(err) })
      })
    }

  },
  getters: {
    watch_group(state) {
      return state.group
    }
  }
}