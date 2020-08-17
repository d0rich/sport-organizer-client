<template>
  <div class="pa-8">
    <v-row class="text-h4 mb-3" color="text">Регистрация</v-row>
    <v-form ref="form" v-model="valid" @submit.prevent="Register()">
      <v-row cols="12" md="4">
        <v-text-field
          v-model="regData.Login"
          :rules="[rules.req, rules.maxl]"
          :counter="max"
          label="Логин"
          required
          outlined
        ></v-text-field>
      </v-row>
      <v-row cols="12">
        <v-col class="pl-0">
          <v-text-field
            v-model="regData.Name"
            :rules="[rules.req, rules.maxl]"
            :counter="max"
            label="Имя"
            required
            outlined
          ></v-text-field>
        </v-col>

        <v-col class="pr-0">
          <v-text-field
            v-model="regData.Surname"
            :rules="[rules.req, rules.maxl]"
            :counter="max"
            label="Фамилия"
            required
            outlined
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row cols="12" md="4">
        <v-text-field
          v-model="regData.Email"
          :rules="[rules.req, rules.email]"
          label="E-mail"
          required
          outlined
        ></v-text-field>
      </v-row>
      <v-row cols="12" md="4">
        <v-text-field v-model="regData.PhoneNumber" label="Телефон" outlined></v-text-field>
      </v-row>
      
      <v-menu
        ref="calendar"
        v-model="calendar"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="bdateFormatted"
            label="Дата рождения"
            :rules="[rules.req]"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
            required
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="regData.Birthdate"
          no-title
          scrollable
          @input="calendar = false"
          locale="ru"
          min="1900"
          :max="Today([0, 1, 0])"
        ></v-date-picker>
      </v-menu>
      <v-row cols="12" md="4">
        <v-select
          v-model="regData.Gender"
          :items="genders"
          :rules="[rules.req]"
          item-text='Name'
          item-value='ID'
          label="Укажите ваш пол"
          outlined
          required
          :loading="disableGS"
          :disabled="disableGS"
        ></v-select>
      </v-row>
      <v-row cols="12" md="4">
        <v-select
          v-model="regData.Sports"
          :items="sports"
          :rules="[rules.arrReq]"
          item-text='Name'
          item-value='ID'
          label="Укажите ваши виды спорта"
          outlined
          chips
          multiple
          clearable
          required
          :loading="disableGS"
          :disabled="disableGS"
        ></v-select>
      </v-row>
      <v-row cols="12" md="4">
        <v-text-field
          v-model="Password"
          label="Пароль"
          outlined
          required
          :rules="[rules.req]"
          :append-icon="showP ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showP ? 'text' : 'password'"
          @click:append="showP = !showP"
        ></v-text-field>
      </v-row>
      <v-row cols="12" md="4">
        <v-text-field
          v-model="confirmPassword"
          label="Повторите пароль"
          outlined
          required
          :rules="[rules.req, rules.confirmPassword]"
          :append-icon="showP ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showP ? 'text' : 'password'"
          @click:append="showP = !showP"
        ></v-text-field>
      </v-row>
      <v-btn color="primary" :loading="regRequest" :disabled="regRequest" type="submit" block>
        Зарегестрироваться
      </v-btn>


      <v-dialog v-model="regSuccess" max-width="400">
        <v-card>
          <v-card-title class="headline">Регистрация успешна</v-card-title>
          <v-card-text>
            Регистрация успешно завершена!
          </v-card-text>
          <v-card-text>
            Теперь вы можете войти в свой аккаунт и ввести код, который пришёл вам на почту.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link :to="{ name: 'Login' }" >
            <v-btn color="primary">
              Войти в аккаунт
            </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </v-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      disableGS: true,
      valid: true,
      showP: false,
      Password:'',
      confirmPassword:'',
      calendar: false,
      genders: [{ ID: null, Name: null }],
      sports: [{ ID: null, Name: null }],
      max: 30,
      regData: {
        Login: "",
        PhoneNumber: "",
        Email: "",
        Password: "",
        Salt: "",
        Name: "",
        Surname: "",
        Birthdate: "",
        Gender: '',
        Sports: []
      },
      rules: {
        req: (v) => !!v || "Обязательно для заполнения",
        arrReq: (v) => v.length > 0 || 'Выберите хотя бы один элемент',
        maxl: (v) =>
          (v && v.length <= this.max) ||
          `Слово должно быть короче ${this.max} символов`,
        email: (v) => /.+@.+\..+/.test(v) || "E-mail должен быть корректным",
        confirmPassword: (v) => v === this.Password || 'Пароли должны совпадать'
      },
      regSuccess: false,
      regRequest: false
    };
  },
  computed: {
    bdateFormatted() {
      if (!this.regData.Birthdate) return "";
      const [year, month, day] = this.regData.Birthdate.split("-");
      return `${day}/${month}/${year}`;
    },
  },
  methods: {
    Register(){
      if(this.valid)
      {

        this.regData.Salt = this.$crypto.randomBytes(64).toString('hex')
        this.$crypto.pbkdf2(this.Password, this.regData.Salt, 1000, 256, (err,key) =>{
          if (err) console.log(err) ;
          this.regData.Password = key.toString('hex')
          this.regRequest = true
          this.$axios.post(`${this.$store.state.server}/account/register`, this.regData)
            .then(res=>{
              console.log(res)
              this.regSuccess = true
              })
        })
        
      }
      else
      {
        this.$refs.form.validate()
      }
    }
  },
  mounted() {
    this.$axios
      .get(`${this.$store.state.server}/dictionaries/genders`)
      .then((genders) => {
        this.$axios
          .get(`${this.$store.state.server}/dictionaries/sports`)
          .then(sports =>{
            this.genders = genders.data
            this.sports = sports.data
            this.disableGS = false
          })
      })
  },
};
</script>

<style scoped>
</style>
