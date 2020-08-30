<template>
  <div>
    <div v-if="$store.state.trainerMode">
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="card" >
        <Invites @usedinv="fetch_auth_user(get_auth_user.ID)" />
      </v-skeleton-loader>
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item" >
        <v-list >
          <v-subheader>Группы, которые тренирует пользователь {{get_auth_user.Login}} ({{get_auth_user.TrainerIn.length}}):</v-subheader>
          <transition-group name="slide-fade">
          <router-link v-for="group in get_auth_user.TrainerIn" :key="group.ID" :to="{ name: 'Group', params: { groupID: group.ID } }">
            <v-list-item link >
              {{group.Name}}
            </v-list-item>
          </router-link>
          </transition-group>
        </v-list>
      </v-skeleton-loader>
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item" >
        <v-spacer />
      </v-skeleton-loader>
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item" >
        <v-spacer />
      </v-skeleton-loader>
    </div>

    <div v-if="!$store.state.trainerMode" class="mt-10">
      <v-form  v-if="get_auth_user.Login === $route.params.login" ref="form" v-model="valid" @submit.prevent="useInv()">
        <v-row cols="12" md="2" class="px-5">
          <v-text-field
              v-model="invCode"
              :rules="[rules.req]"
              label="Пригласительный код"
              required
              outlined
              :loading="onLoad"
              :disabled="onLoad"
          ></v-text-field>
        </v-row>
        <v-alert type="error" :value="error" transition="scale-transition">
          Ошибка: данный пригласительный код недействителен.
        </v-alert>
        <v-alert type="success" :value="success" transition="scale-transition">
          Приглашение успешно принято.
        </v-alert>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="button" >
          <v-btn color="primary" class="mt-4" :loading="invReq" :disabled="invReq" block @click="useInv()">
            Присоединиться к группе
          </v-btn>
        </v-skeleton-loader>
      </v-form>
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item">
        <v-list >
          <v-subheader>Группы, в которых тренируется пользователь {{get_auth_user.Login}} ({{get_auth_user.TraineeIn.length}}):</v-subheader>
          <v-divider />
          <transition-group name="slide-fade">
          <router-link v-for="group in get_auth_user.TraineeIn" :key="group.ID" :to="{ name: 'Group', params: { groupID: group.ID } }">
            <v-list-item link >
              {{group.Name}}
            </v-list-item>
          </router-link>
          </transition-group>
        </v-list>
      </v-skeleton-loader>
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item" >
        <v-spacer />
      </v-skeleton-loader>
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item" >
        <v-spacer />
      </v-skeleton-loader>
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
    error: false,
    success: false,
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
              this.error = false
              this.success = true
              this.login()
            })
            .catch(() => {
              this.invReq = false
              this.error = true
              this.success = false
            })
      }
      else{
        this.$refs.form.validate()
      }
    }
  },
}
</script>

<style scoped>

</style>
