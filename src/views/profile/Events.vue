<template>
  <div>
    <EventWindow @close="selectedOpen = false"
           :selected-event="selectedEvent" :selected-element="selectedElement" :selected-open="selectedOpen" />
    <v-row class="text-h4 mb-3 mx-0" color="text">Мои события</v-row>
    <v-row cols="12" class="mx-0 px-2">
      <v-select
          v-model="groupsReq"
          :items="groups"
          item-text='Name'
          item-value='ID'
          label="Выберите группы"
          outlined
          chips
          multiple
          clearable
          :loading="onLoad"
          :disabled="onLoad"
      ></v-select>
    </v-row>
    <v-row class="mx-2 justify-center">
      <v-btn outlined class="mr-4 mt-2" @click="setToday">
        Сегодня
      </v-btn>
      <v-select
          class="mt-2"
          style="width: 50%"
          v-model="type"
          :items="calendarTypes"
          item-text='text'
          item-value='type'
          label="Масштаб"
          outlined
          dense
          :loading="onLoad"
          :disabled="onLoad"
      ></v-select>
    </v-row>

    <v-dialog v-if="tMode" v-model="dialog" scrollable max-width="570px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="ml-3"
            color="primary"
            v-bind="attrs"
            v-on="on"
        >
          Создать событие
        </v-btn>
      </template>
      <Create @created="getEvents" :focus="focus" />
    </v-dialog>
    <v-row class="mx-0 justify-center">
      <v-btn fab text small  @click="prev()">
        <v-icon small>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>
        {{title}}
      </v-toolbar-title>
      <v-btn fab text small  @click="next()">
        <v-icon small>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
    <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="date-picker-days" class="pa-2">
      <v-calendar
          style="overflow: hidden"
          ref="calendar"
          v-model="focus"
          locale="ru"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="setTimeRange"
      />
    </v-skeleton-loader>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ClientEvent, Event} from "@/classes";
import Create from "@/views/entities/events/Create";
import EventWindow from "@/views/entities/events/Event";

export default {
  name: "Events",
  components:{
    Create, EventWindow
  },
  data(){
    return{
      title: '',
      timeRange: { start: null, end: null } ,
      events: [],
      groupsReq: [],
      calendarTypes: [
        {text: 'День', type: 'day'},
        {text: '4 дня', type: '4day'},
        {text: 'Неделя', type: 'week'},
        {text: 'Месяц', type: 'month'}

      ] ,
      dialog: false,
      type: 'month',
      focus: this.Today(),
      selectedEvent: new ClientEvent(),
      selectedElement: null,
      selectedOpen: false,
    }
  },
  computed:{
    ...mapGetters(['get_auth_user','tMode']),
    groups(){
      if(this.tMode) return this.get_auth_user.TrainerIn
      else return this.get_auth_user.TraineeIn
    }
  },
  watch:{
    tMode(){
      this.groupsReq = []
      this.getEvents()
    },
    groupsReq(){
      this.getEvents()
    },
    title(){
      this.getEvents()
    },
    get_auth_user(){
      this.getEvents()
    }
  },
  methods: {
    ...mapActions(['fetch_profile_data']),
    getEvents(){
      this.loaderOn()
      this.dialog = false
      let groups = []
      if (this.groupsReq.length === 0){
        if (this.tMode)
          this.get_auth_user.TrainerIn.forEach( group => {
            groups.push(group.ID)
          } )
        else
          this.get_auth_user.TraineeIn.forEach( group => {
            groups.push(group.ID)
          } )
      }
      else {
        groups = this.groupsReq
      }
      return new Promise( (resolve, reject) => {
        this.$axios
            .get(`${this.server}/events/get/byGroups?groups=${JSON.stringify(groups)}&LowTime=${this.dateForServer(this.timeRange.start, true)}&UpTime=${this.dateForServer(this.timeRange.end, false)}`)
            .then(res => {
              this.events = []
              res.data.forEach( event => {
                this.events.push(new ClientEvent( new Event(event) ))
              } )
              this.loaderOff()
              resolve(res.data)
            })
            .catch(err => {
              reject(err)
              this.loaderOff()
            })
      })
    },
    dateForServer(date, lowDate = false){
      let d = new Date(date)
      if (lowDate) d.setMilliseconds(-10*24*60*60*1000)
      else d.setMilliseconds(10*24*60*60*1000)
      return `"${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} 00:00:00"`
    },
    getEventColor (event) {
      return event.color
    },
    showEvent ({ nativeEvent, event }) {
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

      nativeEvent.stopPropagation()
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    setToday () {
      this.focus = this.Today()
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    setTimeRange({start,end}){
      this.timeRange = { start: start.date, end:end.date }
      if(this.$refs.calendar)
      this.title = this.$refs.calendar.title.toString()
    }
  },
}
</script>

