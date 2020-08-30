<template>
  <div>
    <v-form ref="form" v-model="valid" @submit.prevent="crNot()" >
      <v-row cols="12" class="mx-0">
        <v-select
            v-model="newNot.NotTypeID"
            :items="NotTypes"
            item-text='Name'
            item-value='ID'
            label="Тип оповещения"
            :rules="[rules.req]"
            required
            outlined
            :loading="loadTypes"
            :disabled="loadTypes"
        ></v-select>
      </v-row>
      <v-row cols="12" md="4" class="mx-0">
        <v-text-field
            v-model="newNot.Comment"
            :rules="[rules.req]"
            label="Текст оповещения"
            required
            outlined
        ></v-text-field>
      </v-row>
      <v-alert type="error" :value="error" transition="scale-transition">
        Ошибка. Попробуйте повторить повторить попытку позже.
      </v-alert>
      <v-alert type="success" :value="success" transition="scale-transition">
        Оповещение успешно.
      </v-alert>
      <v-btn color=primary block type=submit :loading="create_req" :disabled="create_req">
        Оповестить
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import {NotType, ClientEvent} from '@/classes'
import {mapGetters} from 'vuex'
export default {
  name: "CreateNotification",
  props:{
    event: ClientEvent
  },
  data(){
    return{
      error: false,
      success: false,
      valid: false,
      NotTypes: [],
      loadTypes: false,
      create_req: false,
      newNot:{
        Comment: '',
        NotTypeID: '1'
      },
      max:50,
      rules: {
        req: (v) => !!v || "Обязательно для заполнения",
        maxl: (v) =>
            (v && v.length <= this.max) ||
            `Слово должно быть короче ${this.max} символов`,
      },
    }
  },
  computed:{
    ...mapGetters(['get_auth_user'])
  },
  methods:{
    crNot(){
      if(this.valid)
      {
        this.create_req = true
        this.$axios
            .post(`${this.server}/notifications/create`, {...this.newNot, EventID: this.event.ID, UserID: this.get_auth_user.ID})
            .then(() => {
              this.create_req = false
              this.newNot.Comment = ''
              this.newNot.NotTypeID = '1'
              this.$emit('created')
              this.error = false
              this.success = true
            })
            .catch(() => {
              this.error = true
              this.success = false
            })
      }
      else {this.$refs.form.validate()}
    },
    getNotTypes(){
      this.loadTypes = true
      this.$axios
          .get(`${this.server}/dictionaries/nots`)
          .then(res => {
            this.NotTypes = []
            res.data.forEach(notType => {
              this.NotTypes.push(new NotType(notType))
            })
            this.loadTypes = false
          })
          .catch(() =>{
            this.loadTypes = false
          })
    }
  },
  mounted(){
    this.getNotTypes()
  }
}
</script>

