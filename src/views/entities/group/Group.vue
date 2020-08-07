<template>
    <div>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
            <div class="text-h6">
                {{`Группа "${watch_group.Name}"`}}
            </div>
        </v-skeleton-loader>
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
        <div class="text-h8">
          {{`Возрастная группа: ${watch_group.AgeType.ItemName}`}}
        </div>
      </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
            <div class="text-h8">
                {{`Описание группы:`}}
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="paragraph" class="pa-2">
            <v-sheet class="pa-2 rounded" color="secondary darken-4" elevation=4 >
                {{watch_group.Description}}
            </v-sheet>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
            <div class="text-h8">
                {{`Группа прикреплена к секции:`}}
                <router-link :to="{name: 'Section', params:{ sectionID: watch_group.Section.ID}}" class="text--primary">
                    {{watch_group.Section.Name}}
                </router-link>
            </div>
        </v-skeleton-loader>

        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
            <div class="text-h8">
                {{`Тренера группы:`}}
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="chip" class="pa-2">
            <div>
                <router-link v-for="trainer in watch_group.Trainers" :key="trainer.ID" :to="{name: 'Profile', params: { login: trainer.Login }}">
                    <v-chip  class="ma-2" color="primary">
                        {{`${trainer.Name} ${trainer.Surname} (${trainer.Login})`}}
                    </v-chip>
                </router-link>
            </div>
        </v-skeleton-loader>

        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
            <div class="text-h8">
                {{`Состав группы:`}}
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="chip" class="pa-2">
            <div>
                <router-link v-for="trainee in watch_group.Trainees" :key="trainee.ID" :to="{name: 'Profile', params: { login: trainee.Login }}">
                    <v-chip  class="ma-2" color="primary">
                        {{`${trainee.Name} ${trainee.Surname} (${trainee.Login})`}}
                    </v-chip>
                </router-link>
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader v-if="showInvites" :loading="onLoad" transition="fade-transition" type="list-item">
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
        </v-skeleton-loader>

    </div>    
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Group',
    data(){
        return{
            cr_inv_req: false,
            invites: []
        }
    },
    computed:{
        ...mapGetters(['watch_group', 'get_auth_user']),
        showInvites(){
          return this.get_auth_user.ID === this.watch_group.Section.UserID
        }
    },
    methods:{
        ...mapActions(['fetch_group_data']),
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
    mounted(){
        this.loaderOn()
        this.fetch_group_data(this.$route.params.groupID)
            .then(()=>{
              this.getInvites()
              .then(() => this.loaderOff())
            })
    },
}
</script>
