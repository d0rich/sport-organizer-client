<template>
  <div class="mb-4" style="width: 100%">
    <v-divider />
    <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>Создание возрастной группы</v-expansion-panel-header>
      <v-expansion-panel-content>
      <v-form ref="form" v-model="valid" @submit.prevent="crAT()" class="pa-4">
        <v-row cols="12" md="4">
          <v-text-field
              v-model="newAT.Name"
              :rules="[rules.req, rules.maxl]"
              :counter="max"
              label="Название"
              required
              outlined
          ></v-text-field>
        </v-row>
        <v-row cols="12" class="mb-4">
          <v-text-field
              v-model="newAT.SA"
              :rules="[rules.req, rules.first]"
              required
              dense
              type="number"
              @input="editSA()"
              class="px-3"
              style="width: 3em"
          ></v-text-field>
          {{' - '}}
          <v-text-field
              v-model="newAT.EA"
              :rules="[rules.req, rules.second]"
              required
              dense
              type="number"
              @input="editEA()"
              class="px-3"
              style="width: 3em"
          ></v-text-field>
          {{' лет'}}
        </v-row>
        <v-alert type="error" :value="error" transition="scale-transition">
          Ошибка при создании возрастной группы. Попробуйте повторить операцию позже.
        </v-alert>
        <v-alert type="success" :value="success" transition="scale-transition">
          Возрастная группа успешно создана
        </v-alert>
        <v-btn block :disabled="create_req" :loading="create_req" color="secondary" type="submit">Создать</v-btn>
      </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-expansion-panels>
    <v-divider />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
name: "CreateAgeType",
  data(){
    return{
      opened: false,
      valid: false,
      create_req: false,
      max: 50,
      newAT: {
        Name: '',
        SA: '0',
        EA: '99',
        UserID: ''
      },
      rules: {
        req: (v) => !!v || "Обязательно для заполнения",
        maxl: (v) =>
            (v && v.length <= this.max) ||
            `Слово должно быть короче ${this.max} символов`,
        first: (v) => (parseInt(v) < parseInt(this.newAT.EA)) || 'Первое число должно быть меньше второго',
        second: (v) => (parseInt(v) > parseInt(this.newAT.SA)) || 'Второе число должно быть больше первого',
      },
      error: false,
      success: false
    }
  },
  computed:{
  ...mapGetters(['get_auth_user'])
  },
  methods:{
    crAT(){
      if(this.valid)
      {
        this.create_req = true
        this.$axios
            .post(`${this.server}/age-types/create`, this.newAT)
            .then(() => {
              this.create_req = false
              this.newAT.Name = ''
              this.newAT.SA = '0'
              this.newAT.SA = '99'
              this.$emit('created')
              this.success = true
              this.error = false
            })
            .catch(err => {
              console.error(err)
              this.create_req = false
              this.success = false
              this.error = true
            })
      }
      else {this.$refs.form.validate()}
    },
    editSA(){
      let replacer = ('').match('')
      if((/[1-9]{1}[0-9]{0,1}/).test(this.newAT.SA)) {
        replacer = this.newAT.SA.match(/[1-9]{1}[0-9]{0,1}/)
      }
      this.newAT.SA = replacer
    },
    editEA(){
      let replacer = ('').match('')
      if((/[1-9]{1}[0-9]{0,1}/).test(this.newAT.EA)) {
        replacer = this.newAT.EA.match(/[1-9]{1}[0-9]{0,1}/)
      }
        this.newAT.EA = replacer
    },
  },
  mounted(){
    this.newAT.UserID = this.get_auth_user.ID
  }
}
</script>
