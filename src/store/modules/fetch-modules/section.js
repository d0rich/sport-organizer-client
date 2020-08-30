import axios from 'axios'
import {Section} from '@/classes'
export default {
    state: {
        section: new Section()
    },
    mutations: {
        set_section(state, secData) {
            state.section = new Section(secData)
        }
    },
    actions: {
        fetch_section_data(ctx, id) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`${ctx.rootState.server}/sections/get?sectionID=${id}`)
                    .then(res => {
                        ctx.commit('set_section', res.data)
                        resolve()
                    })
                    .catch(err => { console.error(err);
                        reject(err) })
            })
        }

    },
    getters: {
        watch_section(state) {
            return state.section
        }
    }
}
