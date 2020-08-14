<template>
  <div>
  <v-calendar
      locale="ru"
      :events="events"
  />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ClientEvent} from "@/classes";

export default {
  name: "Events",
  data(){
    return{
      events: []
    }
  },
  computed:{
    ...mapGetters(['user_profile', 'get_auth_user'])
  },
  methods: {
    ...mapActions(['fetch_profile_data']),
    getEvents(){
      let groups = []
      this.user_profile.TraineeIn.forEach( group => {
        groups.push(group.ID)
      } )
      return new Promise( (resolve, reject) => {
        this.$axios
            .get(`${this.server}/events/get/byGroups?groups=${JSON.stringify(groups)}`)
            .then(res => {
              this.events = []
              res.data.forEach( event => {
                this.events.push(new ClientEvent( event ))
              } )
              resolve(res.data)
            })
            .catch(err => {
              reject(err)
              console.error(err)
            })
      })
    }
  },
  mounted(){
    this.loaderOn()
    this.fetch_profile_data(this.$route.params.login)
        .then(()=>{
          this.getEvents()
            .then(res => {
              console.log(res)
              this.loaderOff()
            })
        })
  }
}
</script>

