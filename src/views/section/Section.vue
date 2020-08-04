<template>
    <div>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
            <div class="text-h6">
                {{`Секция "${watch_section.Name}"`}}
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
            <div class="text-h8">
                {{`Создатель секции:`}}
                <router-link :to="{name: 'Profile', params:{ login: creatorLogin }}" class="text--primary">
                    {{`${creatorName} (${creatorLogin})`}}
                </router-link>
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
            <div class="text-h8">
                {{`Вид спорта: ${sport}`}}
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
            <div class="text-h8">
                {{`Описание секции:`}}
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="paragraph" class="pa-2">
            <v-sheet class="pa-2 rounded" color="secondary darken-4" elevation=4 >
                {{watch_section.Description}}
            </v-sheet>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
            <div class="text-h8">
                {{`Группы:`}}
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="chip" class="pa-2">
            <div>
                <router-link v-for="group in watch_section.Groups" :key="group.ID" :to="{name: 'Group', params: { groupID: group.ID }}">
                    <v-chip  class="ma-2" color="primary">
                        {{group.Name}}
                    </v-chip>
                </router-link>
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="button" class="pa-2">
            <v-btn color=primary @click="crGroup = true">
                Прикрепить новую группу
            </v-btn>
        </v-skeleton-loader>

        <v-dialog v-model="crGroup" max-width="600">
            <v-card>
            <CreateGroup @created="Created()" />
            </v-card>
        </v-dialog>

    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import CreateGroup from '../group/Create.vue'
export default {
    name: 'Section',
    data(){
        return{
            crGroup: false
        }
    },
    components: {
        CreateGroup
        },
    computed: {
        ...mapGetters(['watch_section']),
        sport(){
            if(this.watch_section['Sport-type']) return this.watch_section['Sport-type'].Name
            else return null
        },
        creatorLogin(){
            if(this.watch_section.User) 
                return this.watch_section.User.Login
            else return null
        },
        creatorName(){
            if(this.watch_section.User) 
                return `${this.watch_section.User.Name} ${this.watch_section.User.Surname}`
            else return null
        }
    },
    methods:{
        ...mapActions(['fetch_section_data']),
        Created(){
            this.crGroup = false
            this.loaderOn()
            this.fetch_section_data(this.$route.params.sectionID)
            .then(()=>{
                this.loaderOff()
            })

        }
    },
    mounted(){
    this.Created()
  }
}
</script>