<template>
    <div>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
            <div class="text-h6">
                {{`Группа "${watch_group.Name}"`}}
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
                <router-link :to="{name: 'Section', params:{ sectionID: watch_group.SectionID }}" class="text--primary">
                    {{sectionName}}
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
                <router-link v-for="trainer in trainers" :key="trainer.ID" :to="{name: 'Profile', params: { login: trainer.Login }}">
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
                <router-link v-for="trainee in trainees" :key="trainee.ID" :to="{name: 'Profile', params: { login: trainee.Login }}">
                    <v-chip  class="ma-2" color="primary">
                        {{`${trainee.Name} ${trainee.Surname} (${trainee.Login})`}}
                    </v-chip>
                </router-link>
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="button" class="pa-2">
            <v-btn color=primary :loading="cr_inv_req" :disabled="cr_inv_req" @click="GenInv()">
                Создать пригласительный код
            </v-btn>
        </v-skeleton-loader>
    </div>    
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Group',
    data(){
        return{
            cr_inv_req: false
        }
    },
    computed:{
        ...mapGetters(['watch_group']),
        sectionName(){
            if (this.watch_group.Section) return this.watch_group.Section.Name
            else return null 
        },
        trainers(){
            if(this.watch_group) return this.watch_group.Trainers
            else return []
        },
        trainees(){
            if(this.watch_group) return this.watch_group.Trainees
            else return []
        }
    },
    methods:{
        ...mapActions(['fetch_group_data']),
        GenInv(){
            this.cr_inv_req = true
            this.$axios
            .post(`${this.server}/createInvitation`, {EntranceNum: 1, GroupID: this.$route.params.groupID})
            .then(res=>{
                console.log(res)
                this.cr_inv_req = false
            })
            .catch(err => console.error(err))
        }
    },
    mounted(){
        this.loaderOn()
        this.fetch_group_data(this.$route.params.groupID)
            .then(()=>{
                console.log(this.watch_group)
                this.loaderOff()
            })
    },
}
</script>