<template>
  <div>
    <v-divider />
    <v-list style="max-height: 300px; overflow-y: scroll">
      <v-subheader>Пригласительные коды:</v-subheader>
      <v-list-item v-for="invite in invites" :key="invite.Code" >
        {{invite.Code}}
      </v-list-item>
      <v-divider/>
      <v-list-item link>
        <v-list-item-action color="primary" @click="genInv()">Создать пригласительный код</v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider />
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
name: "Invites",
  props: ['showInvites'],
  data(){
    return {
      cr_inv_req: false,
      invites: []
    }
  },
  computed:{
    ...mapGetters(['get_auth_user']),
  },
  methods:{
    genInv(){
      this.cr_inv_req = true
      this.$axios
          .post(`${this.server}/createInvitation`, {EntranceNum: 1, GroupID: this.$route.params.groupID})
          .then(()=>{
            this.cr_inv_req = false
            this.getInvites()
          })
          .catch(err => console.error(err))
    },
    getInvites(){
      return new Promise((resolve, reject) => {
        if(this.showInvites) {
          this.$axios
              .get(`${this.server}/get_invitations?GroupID=${this.$route.params.groupID}`)
              .then(res => {
                this.invites = res.data
                resolve()
              })
              .catch(err => {
                console.error(err)
                reject(err)
              })
        }
        else {
          resolve()
        }
      })

    }
  },
  watch:{
    get_auth_user(){
      this.getInvites()
    }
  },
  mounted() {
    this.getInvites()
  }
}
</script>

<style scoped>

</style>
