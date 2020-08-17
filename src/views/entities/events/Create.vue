<template>
  <div class="mb-4" style="width: 100%">
      <v-card class="pa-2">
        <v-card-subtitle>Создание события</v-card-subtitle>
        <v-form ref="form" v-model="valid" @submit.prevent="crEvent()">
          <v-row cols="12" class="mt-5 mx-0">
            <v-select
                v-model="newEvent.Groups"
                :items="get_auth_user.TrainerIn"
                item-text='Name'
                item-value='ID'
                label="Выберите группы"
                :rules="[rules.arrReq]"
                outlined
                chips
                multiple
                clearable
                :loading="onLoad"
                :disabled="onLoad"
            ></v-select>
          </v-row>
          <v-row cols="12" class="mx-0">
            <v-text-field
                v-model="newEvent.Name"
                :rules="[rules.req, rules.maxl]"
                label="Название"
                required
                outlined
            ></v-text-field>
          </v-row>
          <v-row cols="12" class="mx-0">
            <v-select
                v-model="newEvent.EventTypeID"
                :items="EvTypes"
                :rules="[rules.req]"
                item-text='Name'
                item-value='ID'
                label="Укажите тип события"
                outlined
                required
                :loading="disableTypes"
                :disabled="disableTypes"
            ></v-select>
          </v-row>
          <v-row cols="12" class="mx-0 justify-center">
            <v-menu
                ref="calendar"
                v-model="startDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    style="width: 50%"
                    v-model="sDate"
                    label="Дата начала"
                    :rules="[rules.req]"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    required
                    outlined
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="startDate"
                  no-title
                  scrollable
                  @input="startDatePicker = false"
                  locale="ru"
                  :min="Today([-1,0,0])"
              ></v-date-picker>
            </v-menu>
            <v-menu
                ref="calendar"
                v-model="startTimePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    class="pl-2"
                    style="width: 50%"
                    v-model="startTime"
                    label="Время начала"
                    :rules="[rules.req]"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-on="on"
                    required
                    outlined
                ></v-text-field>
              </template>
              <v-time-picker
                  v-model="startTime"
                  format="24hr"
                  @input="startTimePicker = false"
                  locale="ru"
              ></v-time-picker>
            </v-menu>
          </v-row>
          <v-row cols="12" class="mx-0 justify-center">
            <v-menu
                ref="calendar"
                v-model="endDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    style="width: 50%"
                    v-model="eDate"
                    label="Дата окончания"
                    :rules="[rules.req]"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    required
                    outlined
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="endDate"
                  no-title
                  scrollable
                  @input="endDatePicker = false"
                  locale="ru"
                  :min="Today([-1,0,0])"
              ></v-date-picker>
            </v-menu>
            <v-menu
                ref="calendar"
                v-model="endTimePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                    class="pl-2"
                    style="width: 50%"
                    v-model="endTime"
                    label="Время окончания"
                    :rules="[rules.req]"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-on="on"
                    required
                    outlined
                ></v-text-field>
              </template>
              <v-time-picker
                  v-model="endTime"
                  format="24hr"
                  @input="endTimePicker = false"
                  locale="ru"
              ></v-time-picker>
            </v-menu>
          </v-row>
          <v-row cols="12" class="mx-0">
            <v-textarea
                v-model="newEvent.Description"
                label="Описание"
                outlined
            ></v-textarea>
          </v-row>

          <v-alert type="error" :value="error" transition="scale-transition">
            Ошибка при создании события. Попробуйте повторить операцию позже.
          </v-alert>
          <v-alert type="success" :value="success" transition="scale-transition">
            Событие успешно создано.
          </v-alert>
          <v-btn color="primary" :loading="crRequest"
                 :disabled="crRequest" block @click="crEvent()">
            Создать событие
          </v-btn>
        </v-form>

      </v-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import {EventType} from "@/classes";

export default {
name: "CreateEvent",
  props: ['focus'],
  data(){
    return{
      valid: false,
      EvTypes: [],
      disableTypes: true,
      startDate: this.focus || this.Today([0,0,1]),
      startDatePicker: false,
      startTime: '',
      startTimePicker: false,
      endDate: this.focus || this.Today([0,0,1]),
      endDatePicker: false,
      endTime: '',
      endTimePicker: false,
      success: false,
      error: false,
      crRequest: false,
      newEvent: {
        Groups: [],
        Name: '',
        Description: '',
        EventTypeID: 1

      } ,
      max: 50,
      rules: {
        req: (v) => !!v || "Обязательно для заполнения",
        arrReq: (v) => v.length > 0 || 'Выберите хотя бы один элемент',
        maxl: (v) =>
            (v && v.length <= this.max) ||
            `Слово должно быть короче ${this.max} символов`,
      },
    }
  },
  watch:{
    focus(v){
      this.startDate = this.endDate = v
    }
  },
  computed:{
    ...mapGetters(['get_auth_user']),
    sDate(){
      return this.dateFormatted(this.startDate)
    },
    eDate(){
      return this.dateFormatted(this.endDate)
    }
  },
  methods:{
    crEvent(){
      if(this.valid && !this.crRequest)
      {
        let newEvent = this.newEvent
        newEvent.ST = `${this.startDate} ${this.startTime}`
        newEvent.ET = `${this.endDate} ${this.endTime}`
        this.crRequest = true
        this.$axios.post(`${this.server}/events/create`, newEvent)
            .then(() =>{
              this.success = true
              this.error = false
              this.crRequest = false
              this.$emit('created')
            })
            .catch(err => {
              console.error(err)
              this.crRequest = false
              this.success = false
              this.error = true
            })
      }
      else
      {
        this.$refs.form.validate()
      }
    },
    getEvTypes(){
      this.disableTypes = true
      this.$axios
        .get(`${this.server}/dictionaries/events`)
        .then(res => {
          this.EvTypes = []
          res.data.forEach(type => {
            this.EvTypes.push(new EventType(type))
          })
          this.disableTypes = false
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mounted(){
    this.getEvTypes()
  }
}
</script>

<style scoped>

</style>
