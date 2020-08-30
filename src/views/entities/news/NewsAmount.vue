<template>
  <div>
    <div class="text-h6">
      Моя лента новостей:
    </div>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header color="secondary darken-4">Настройки ленты</v-expansion-panel-header>
        <v-expansion-panel-content color="secondary darken-4">
          <v-row cols="12" class="mx-0 px-2">
            <v-select
                v-model="sectionsReq"
                :items="sections"
                item-text='Name'
                item-value='ID'
                label="Выберите секции"
                outlined
                chips
                multiple
                clearable
                :loading="onLoad"
                :disabled="onLoad"
            ></v-select>
          </v-row>
          <v-row cols="12" class="mx-0 px-2">
            <v-select
                v-model="sportsReq"
                :items="sports"
                item-text='Name'
                item-value='ID'
                label="Выберите виды спорта"
                outlined
                chips
                multiple
                clearable
                :loading="onLoad"
                :disabled="onLoad"
            ></v-select>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <Event @close="selectedOpen = false"
           :selected-event="selectedEvent" :selected-element="selectedElement" :selected-open="selectedOpen" />
    <transition-group name="slide-fade">
      <NewsNote class="my-2" v-for="newsNote in news" :key="newsNote.ID"
         :news-note="newsNote" @show-event="showEvent" />
    </transition-group>
  </div>
</template>

<script>
import {ClientEvent, News} from "@/classes";
import {mapGetters} from 'vuex'
import Event from "@/views/entities/events/Event";
import NewsNote from "@/views/entities/news/NewsNote";

export default {
  name: "NewsAmount",
  components:{
    Event, NewsNote
  },
  data(){
    return{
      news: [],
      selectedEvent: new ClientEvent(),
      selectedElement: null,
      selectedOpen: false,
      sectionsReq: [],
      sportsReq: []
    }
  },
  computed:{
    ...mapGetters(['get_auth_user']),
    sections(){
      let sections = []
      if (this.tMode) {
        this.get_auth_user.Sections.forEach( section => {
          if(!sections.includes(section))
            sections.push(section)
        })
        this.get_auth_user.TrainerIn.forEach( group => {
          if(!sections.includes(group.Section))
            sections.push(group.Section)
        })
      }
      else {
        this.get_auth_user.TraineeIn.forEach( group => {
          if(!sections.includes(group.Section))
            sections.push(group.Section)
        })
      }
      return sections
    },
    sports(){
      let sports = []
      if (this.tMode) {
        this.get_auth_user.Sections.forEach( section => {
          if(!sports.includes(section['Sport-type']))
            sports.push(section['Sport-type'])
        })
        this.get_auth_user.TrainerIn.forEach( group => {
          if(!sports.includes(group.Section['Sport-type']))
            sports.push(group.Section['Sport-type'])
        })
      }
      else {
        this.get_auth_user.TraineeIn.forEach( group => {
          if(!sports.includes(group.Section['Sport-type']))
            sports.push(group.Section['Sport-type'])
        })
      }
      return sports
    }
  },
  watch: {
    tMode(){
      this.sectionsReq = []
      this.sportsReq = []
    },
    sectionsReq(){
      this.getNews()
    },
    sportsReq(){
      this.getNews()
    }
  },
  methods:{
    getNews(){
      let sectionsReq = JSON.parse(JSON.stringify(this.sectionsReq))
      let sportsReq = JSON.parse(JSON.stringify(this.sportsReq))
      if (sectionsReq.length === 0){
        this.sections.forEach( section => {
          sectionsReq.push(section.ID)
        })
      }
      if (sportsReq.length === 0){
        this.sports.forEach( sport => {
          sportsReq.push(sport.ID)
        })
      }
      this.$axios
        .get(`${this.server}/news-notes/get/byParams?sections=${JSON.stringify(sectionsReq)}&sports=${JSON.stringify(sportsReq)}`)
        .then( res => {
          this.news = []
          res.data.forEach( news =>{
            this.news.push(new News(news))
          } )
        })
    },
    showEvent ({nativeEvent, event}) {
      event = new ClientEvent(event)
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
    }
  },
  mounted() {
    this.getNews()
  }
}
</script>

