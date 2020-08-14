<template>
  <div>
    <v-divider />
    <v-list style="max-height: 300px; overflow-y: scroll; overflow-x:hidden">
      <v-subheader>Приглашения:</v-subheader>
      <v-alert type="success" :value="success" transition="scale-transition">
        {{sucMes}}
      </v-alert>
      <v-alert type="error" :value="error" transition="scale-transition">
        Ошибка: приглашение не найдено. Попробуйте перезагрузить страницу или повторить попытку позже.
      </v-alert>
      <transition-group name="slide-fade">
        <v-list-item v-for="group in invites" :key="group.ID" >
          <v-list-item-action-text>
            {{'Группа: '}}<router-link :to="{name:'Group', params: { groupID: group.ID }}">{{group.Name}}</router-link>
            {{' - Секция: '}}
            <router-link :to="{name:'Section', params: { sectionID: group.Section.ID }}">{{group.Section.Name}}</router-link>
            {{` - Вид спорта: ${group.Section['Sport-type'].Name}`}}
          </v-list-item-action-text>
          <v-btn color="success"  class="mr-3" @click="useInv(group,true)" :loading="req" :disabled="req" >Принять</v-btn>
          <v-btn color="error" @click="useInv(group,false)" :loading="req" :disabled="req" >Отклонить</v-btn>
        </v-list-item>
      </transition-group>

    </v-list>
    <v-divider />
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {Group} from "@/classes";
export default {
  name: "invites",
  data() {
    return {
      invites: [],
      req: false,
      sucMes: '',
      success: false,
      error: false
    }
  },
  computed:{
    ...mapGetters(['get_auth_user'])
  },
  watch:{
    get_auth_user(){
      this.getInvs()
    }
  },
  methods: {
    ...mapActions(['login']),
    getInvs(){
      this.$axios
          .get(`${this.server}/groups/trainers/invitations/get?userID=${this.get_auth_user.ID}`)
          .then(res => {
            this.invites = []
            res.data.forEach( group => {
              this.invites.push(new Group(group))
            } )
            this.req = false
          })
    },
    useInv(group, react){
      this.req = true
      this.$axios
        .post(`${this.server}/groups/trainers/invitations/accept`,
            { UserID: this.get_auth_user.ID, GroupID: group.ID, Accept: react })
        .then(() =>{
          this.getInvs()
          this.login()
          this.$emit('usedinv')
          this.error = false
          if(react) this.sucMes = `Теперь вы являетесь тренером группы ${group.Name}`
          else this.sucMes = `Приглашение тренировать группу ${group.Name} было успешно отклонено`
          this.success = true

        })
        .catch(err => {
          console.error(err)
          this.getInvs()
          this.error = true
          this.success = false
          this.req = false
        })
    }
  },
  mounted() {
    this.getInvs()
  }


}
</script>

<style scoped>

</style>
