<template>
    <div class="pa-8">
        <v-row class="text-h4 mb-3" color="text">Авторизация</v-row>
        <v-form ref="form" v-model="valid" @submit.prevent="login_req()">
            <v-row cols="12" md="4">
                <v-text-field
                    v-model="loginData.login"
                    :rules="[rules.req]"
                    label="Логин"
                    required
                    outlined
                    ></v-text-field>
            </v-row>
            <v-row cols="12" md="4">
                <v-text-field
                v-model="loginData.password"
                label="Пароль"
                outlined
                required
                :rules="[rules.req]"
                type='password'
                ></v-text-field>
            </v-row>
            <v-row cols="12" class="error--text mb-4">
                {{validMessage}}
            </v-row>
            <v-row cols="12" md="4">
                <v-spacer></v-spacer>

                <router-link :to="{ name: 'Register' }" >
                    <v-btn color="secondary">
                    Регистрация
                    </v-btn>
                </router-link>

                <v-btn color="primary" :disabled="!valid || log_req" :loading="log_req" class="ml-3" type="submit">
                Войти
                </v-btn>

            </v-row>
        </v-form>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    name: 'Login',
    data(){
        return{
            valid: false,
            validMessage: '',
            log_req: false,
            loginData:{
                login:'',
                password: ''
            },
            rules: {
                req: (v) => !!v || "Обязательно для заполнения",
            }
        }
    },
    methods:{
        ...mapActions(['login']),
        login_req(){
            this.log_req = true
            this.$axios.post(`${this.$store.state.server}/authorize`, this.loginData)
                .then(res => {
                    this.login(res.data)
                        .then(()=>{this.$router.push({name: 'Profile', params: {login: this.loginData.login}})})
                })
                .catch(err=>{
                    console.error(err)
                    this.validMessage = 'Ошибка: комбинация данных логина и пароля не найдена'
                    this.log_req = false
                })
        }
    }
}
</script>