<template>
  <div>
    <div v-if="$store.state.trainerMode">
      <Invites @usedinv="fetch_profile_data($route.params.login)" />
      <v-list >
        <v-subheader>Группы, которые тренирует пользователь {{user_profile.Login}} ({{user_profile.TrainerIn.length}}):</v-subheader>
        <transition-group name="slide-fade">
        <router-link v-for="group in user_profile.TrainerIn" :key="group.ID" :to="{ name: 'Group', params: { groupID: group.ID } }">
          <v-list-item link >
            {{group.Name}}
          </v-list-item>
        </router-link>
        </transition-group>
      </v-list>
    </div>

    <div v-if="!$store.state.trainerMode" class="mt-10">
      <v-form ref="form" v-model="valid" @submit.prevent="useInv()">
        <v-row cols="12" md="2" class="px-5">
          <v-text-field
              v-model="invCode"
              :rules="[rules.req]"
              label="Пригласительный код"
              required
              outlined
          ></v-text-field>
        </v-row>
        <v-row cols="12" md="4" class="error--text mb-4 px-5">{{errMessage}}</v-row>
        <v-btn color="primary" class="mt-4" :loading="invReq" :disabled="invReq" block @click="useInv()">
          Присоединиться к группе
        </v-btn>
      </v-form>
      <v-list >
        <v-subheader>Группы, в которых тренируется пользователь {{user_profile.Login}} ({{user_profile.TraineeIn.length}}):</v-subheader>
        <v-divider />
        <transition-group name="slide-fade">
        <router-link v-for="group in user_profile.TraineeIn" :key="group.ID" :to="{ name: 'Group', params: { groupID: group.ID } }">
          <v-list-item link >
            {{group.Name}}
          </v-list-item>
        </router-link>
        </transition-group>
      </v-list>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Invites from "@/views/entities/group/trainer/Invites";
export default {
name: "Groups",
  components:{
    Invites
  },
  data(){
  return{
    invReq: false,
    errMessage: '',
    valid: false,
    invCode: '',
    rules: {
      req: (v) => !!v || "Обязательно для заполнения",
    }
  }
  },
  computed:{
    ...mapGetters(['user_profile', 'get_auth_user'])
  },
  methods:{
    ...mapActions(['fetch_profile_data']),
    useInv(){
      if(this.valid){
        this.invReq = true
        this.$axios
            .post(`${this.server}/groups/trainees/invitaions/use`, {ID: this.get_auth_user.ID , invCode: this.invCode})
            .then(() => {
              this.fetch_profile_data(this.$route.params.login)
              this.invReq = false
              this.login()
            })
            .catch(err => {
              console.error(err)
              this.invReq = false
              this.errMessage = 'Данный код недействителен'
            })
      }
      else{
        this.$refs.form.validate()
      }
    }
  },
  mounted(){
    this.loaderOn()
    this.fetch_profile_data(this.$route.params.login)
        .then(()=>{
          this.loaderOff()
        })
  }
}
</script>

<style scoped>

</style>
