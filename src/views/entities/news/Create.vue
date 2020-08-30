<template>
  <v-card>
    <v-toolbar color="primary">
      Новый пост
    </v-toolbar>
    <v-form ref="form" v-model="valid" @submit.prevent="crNews()" >
    <v-card-text>
      Секция: {{section.Name}}
        <v-row cols="12" md="4">
          <v-text-field
              v-model="newNews.Header"
              :rules="[rules.req, rules.maxl]"
              :counter="max"
              label="Заголовок"
              required
              outlined
          ></v-text-field>
        </v-row>
        <v-row cols="12" md="4">
          <v-textarea
              v-model="newNews.Text"
              :rules="[rules.req]"
              :counter="max"
              label="Содержание"
              required
              outlined
          ></v-textarea>
        </v-row>
        <v-menu ref="calendar" v-model="DatePicker"
            :close-on-content-click="false" :nudge-right="40"
            transition="scale-transition" min-width="290px" >
          <template v-slot:activator="{ on }">
            <v-text-field style="width: 50%" v-model="eDate" label="Дата события"
                prepend-icon="mdi-calendar" readonly v-on="on"
                required outlined ></v-text-field>
          </template>
          <v-date-picker v-model="EventDate" no-title scrollable
              @input="dateInput()" locale="ru" ></v-date-picker>
        </v-menu>
        <v-row cols="12" class="mx-0">
          <v-select
              v-model="newNews.EventID"
              :items="Events"
              item-text='Name'
              item-value='ID'
              label="Прикрепить событие"
              clearable
              outlined
              :loading="loadEvents"
              :disabled="loadEvents"
          ></v-select>
        </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color=primary block type=submit :loading="create_req" :disabled="create_req">
        Создать
      </v-btn>
    </v-card-actions>
    </v-form>
  </v-card>

</template>

<script>
import {Section, Event} from '@/classes'
import {mapGetters} from 'vuex'
export default {
  name: "CreateNews",
  props:{
    section: Section
  },
  data(){
    return{
      valid: false,
      create_req: false,
      DatePicker: false,
      Events:[],
      loadEvents: false,
      EventDate: '',
      newNews: {
        Header: '',
        Text: '',
        SectionID: '',
        EventID: '',
        UserID: ''
      },
      max: 50,
      rules: {
        req: (v) => !!v || "Обязательно для заполнения",
        maxl: (v) =>
            (v && v.length <= this.max) ||
            `Слово должно быть короче ${this.max} символов`,
      },
    }
  },
  computed:{
    ...mapGetters(['get_auth_user']),
    eDate(){
      return this.dateFormatted(this.EventDate)
    }
  },
  methods:{
    crNews(){
      if(this.valid)
      {
        let newNews = this.newNews
        newNews.SectionID = this.section.ID
        newNews.UserID = this.get_auth_user.ID
        if (newNews.EventID === '') newNews.EventID = null
        this.create_req = true
        this.$axios
            .post(`${this.server}/news-notes/create`, newNews)
            .then(() => {
              this.create_req = false
              this.newNews.Header = ''
              this.newNews.Text = ''
              this.$emit('created')
            })
            .catch(() => {
              this.error = true
            })
      }
      else {this.$refs.form.validate()}
    },
    getEvents(){
      this.loadEvents = true
      this.$axios
        .get(`${this.server}/events/get/bySections?sectionID=${this.section.ID}&date=${this.EventDate}`)
        .then(res=>{
          this.Events = []
          res.data.forEach(event =>{
            this.Events.push(new Event(event))
          })
          this.loadEvents = false
        })
      .catch(() =>{
        this.loadEvents = false
      })
    },
    dateInput(){
      this.DatePicker = false
      this.getEvents()
    }
  }
}
</script>

<style scoped>

</style>
