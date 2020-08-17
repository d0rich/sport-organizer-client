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
          <CreateTrinerInv />
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
        <v-skeleton-loader v-if="showInvites || get_auth_user.Sections.find(item => item.ID === watch_group.Section.ID) || get_auth_user.TrainerIn.find(item => item.ID === watch_group.ID)"
          :loading="onLoad" transition="fade-transition" type="list-item">
          <Invites showInvites="showInvites" />
        </v-skeleton-loader>

    </div>    
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import CreateTrinerInv from "@/views/entities/group/trainer/CreateInv"
import Invites from "@/views/entities/group/trainee/Invites";
export default {
    name: 'Group',
    data(){
        return{

        }
    },
  components:{ CreateTrinerInv, Invites },
    computed:{
        ...mapGetters(['watch_group', 'get_auth_user']),
        showInvites(){
          return this.get_auth_user.ID === this.watch_group.Section.UserID
        }
    },
    methods:{
        ...mapActions(['fetch_group_data']),

    },
    mounted(){
        this.loaderOn()
        this.fetch_group_data(this.$route.params.groupID)
            .then(()=>{
              this.loaderOff()
            })
    },
}
</script>
