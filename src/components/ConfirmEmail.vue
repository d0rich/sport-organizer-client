<template>
    <v-dialog
      v-model="show"
      persistent
      max-width="500"
    >
      <v-card>
        <v-card-title>Подтвердите регистрацию кодом, высланным вам на почту</v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
                v-model="actCode"
                label="Введите код активации"
                outlined
                :rules="[rules.req]"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="secondary lighten-2" text :disabled="act_req"
            @click="dismissed = true" >
            Позже
          </v-btn>

          <v-btn color="primary lighten-2" text :loading="act_req" :disabled="act_req"
            @click="actRequest()" >
            Подтвердить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name:"ConfirmEmail",
    data(){
        return{
            valid: false,
            act_req: false,
            actCode:'',
            dismissed: false,
            rules: {
                req: (v) => !!v || "Обязательно для заполнения",
            }
        }
    },
    computed:{
        ...mapGetters(['user_confirmed', 'auth_login']),
        show(){
            if(!this.dismissed && !this.user_confirmed) return true
            else return false
        }
    },
    methods:{
        ...mapActions(['login']),
        actRequest(){
            if(this.valid)
            {
                this.act_req = true
                this.$axios.post(`${this.$store.state.server}/act-account`, {login: this.auth_login, activateCode: this.actCode})
                    .then(res => {
                        if(res.status == 200)
                        {
                            this.login().then(()=>{this.act_req = false})
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                        this.act_req = false
                    })
            }
            else
            {
                this.$refs.form.validate()
            }
        }
    }
}
</script>