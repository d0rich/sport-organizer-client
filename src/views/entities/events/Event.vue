<template>
  <v-menu
      v-model="open"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
  >
    <v-card>
      <v-toolbar
          :color="selectedEvent.color"
          dark
      >
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <div style="max-height: 40vh; max-width: 400px; overflow-y: auto">
        <v-tabs color="primary lighten-2" v-model="tab">
          <v-tab v-show="canWatchNots"> Оповещения </v-tab>
          <v-tab> Информация </v-tab>
          <v-tab> Предупредить </v-tab>
          <v-tab> Мои оповещения </v-tab>

        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-show="canWatchNots">
            <v-card-text>
              <v-list dense shaped three-line>
                <v-list-item link v-for="not in selectedEvent.nots" :key="not.ID">
                  <v-list-item-icon class="notificationIcon">
                    <v-icon>{{not.icon}}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{not.NotType.Name}}</v-list-item-title>
                    <v-list-item-subtitle>{{not.User.fullNameLogin}} - {{not.Comment}}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{dateTime(not.createdAt)}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-tab-item>
          <v-tab-item>
            <v-card-text><span v-html="details"></span></v-card-text>
          </v-tab-item>
          <v-tab-item>
            <v-card-text><CreateNot :event="selectedEvent" @created="getNots()" /></v-card-text>
          </v-tab-item>
          <v-tab-item>
            <v-card-text>
              <v-list dense shaped three-line>
                <v-list-item link v-for="not in selectedEvent.myNots" :key="'my'+not.ID">
                  <v-list-item-icon class="notificationIcon">
                    <v-icon>{{not.icon}}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{not.NotType.Name}}</v-list-item-title>
                    <v-list-item-subtitle>{{get_auth_user.fullNameLogin}} - {{not.Comment}}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{dateTime(not.createdAt)}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-tab-item>

        </v-tabs-items>
      </div>

    </v-card>
  </v-menu>
</template>

<script>
import {ClientEvent} from "@/classes";
import {mapGetters} from 'vuex'
import CreateNot from '../notification/Create'

export default {
name: "Event",
  components:{
    CreateNot
  },
  props: {
    selectedEvent: ClientEvent,
    selectedElement: HTMLElement,
    selectedOpen: Boolean
  },
  data(){
    return {
      open: false,
      tab: 1
    }
  },
  computed:{
    ...mapGetters(['get_auth_user']),
    canWatchNots(){
      let result  = false
      let trainerIn = []
      this.get_auth_user.TrainerIn.forEach(group =>{
        trainerIn.push(group.ID)
      })
      this.selectedEvent.groups.forEach(group =>{
        if(trainerIn.includes(group.ID))
          result = true
      })
      return result
    },
    details(){
      let details = ''
      const event = this.selectedEvent
      if(!event) return details
      details += `<p>Тип события: ${event.type.Name}</p>`
      details += `<p>Начало: ${this.dateTime(event.start)}</p>`
      details += `<p>Планируемое окончание: ${this.dateTime(event.end)}</p>`
      details += `<hr>`
      if (event.description) {
        const strings = event.description.split(`\n`)
        strings.forEach(s => {
          details += `<p>${s}</p>`
        })
      }
      return details
    }
  },
  watch: {
    selectedOpen(v){
      this.open = v
    },
    selectedEvent(){
      this.getNots()
    }
  },
  methods:{
    getNots(){
      if (this.canWatchNots)
        this.$axios.get(`${this.server}/notifications/get/all/byEvent?eventID=${this.selectedEvent.ID}`)
          .then(res => {
              this.selectedEvent.fetchNots(res.data)
          })
      this.$axios.get(`${this.server}/notifications/get/byUser?eventID=${this.selectedEvent.ID}&userID=${this.get_auth_user.ID}`)
          .then(res => {
            this.selectedEvent.fetchMyNots(res.data)
          })
    }
  }
}
</script>

<style scoped>
@media(max-width: 500px){
  .notificationIcon{
      display: none !important; 
  }
}

</style>
