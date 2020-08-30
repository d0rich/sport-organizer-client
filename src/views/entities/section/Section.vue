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
                <router-link :to="watch_section.User.route" class="text--primary">
                    {{watch_section.User.fullNameLogin}}
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
          {{`Тренерский состав:`}}
        </div>
      </v-skeleton-loader>
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="chip" class="pa-2">
        <div>
          <router-link v-for="trainer in watch_section.Trainers" :key="trainer.ID" :to="trainer.route">
            <v-chip  class="ma-2" color="primary">
              {{trainer.fullNameLogin}}
            </v-chip>
          </router-link>
        </div>
      </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
            <div class="text-h8">
                {{`Группы:`}}
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="chip" class="pa-2">
            <div>
                <router-link v-for="group in watch_section.Groups" :key="group.ID" :to="group.route">
                    <v-chip  class="ma-2" color="primary">
                        {{group.Name}}
                    </v-chip>
                </router-link>
            </div>
        </v-skeleton-loader>
        <v-skeleton-loader v-if="get_auth_user.Sections.find(item => item.ID === watch_section.ID)" :loading="onLoad" transition="fade-transition" type="button" class="pa-2">
            <v-btn color=primary @click="crGroup = true">
                Прикрепить новую группу
            </v-btn>
        </v-skeleton-loader>

        <v-dialog scrollable v-model="crGroup" max-width="600" >
            <v-card>
            <CreateGroup @created="group_created()" />
            </v-card>
        </v-dialog>
      <v-divider />

      <div class="text-h6 row mx-0">
        <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="pa-2">
          <div>
            {{`Новости секции:`}}
          </div>
        </v-skeleton-loader>
        <v-skeleton-loader v-if="get_auth_user.Sections.find(item => item.ID === watch_section.ID)
                            || watch_section.Trainers.find(item => item.ID === get_auth_user.ID)  "
                           :loading="onLoad" transition="fade-transition" type="button" class="pa-2">
          <v-btn color=primary @click="crNews = true">
            + пост
          </v-btn>
        </v-skeleton-loader>
      </div>
      <v-dialog scrollable v-model="crNews" max-width="600" >
          <CreateNews :section="watch_section" @created="news_created()" />
      </v-dialog>
        <Event @close="selectedOpen = false"
               :selected-event="selectedEvent" :selected-element="selectedElement" :selected-open="selectedOpen" />
        <transition-group name="slide-fade">
          <NewsNote class="my-2 mx-8" v-for="newsNote in news" :key="newsNote.ID"
                    :news-note="newsNote" @show-event="showEvent" />
        </transition-group>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import CreateGroup from '../group/Create.vue'
import CreateNews from '../news/Create'
import Event from "@/views/entities/events/Event";
import NewsNote from "@/views/entities/news/NewsNote";
import {ClientEvent, News} from "@/classes";
export default {
    name: 'Section',
    data(){
        return{
          crGroup: false,
          crNews: false,
          selectedEvent: new ClientEvent(),
          selectedElement: null,
          selectedOpen: false,
          news: []
        }
    },
    components: {
        CreateGroup, Event, NewsNote, CreateNews
        },
    computed: {
        ...mapGetters(['watch_section', 'get_auth_user']),
        sport(){
            if(this.watch_section['Sport-type']) return this.watch_section['Sport-type'].Name
            else return null
        },
    },
    methods:{
        ...mapActions(['fetch_section_data']),
        group_created(){
            this.crGroup = false
            this.loaderOn()
            this.fetch_section_data(this.$route.params.sectionID)
            .then(()=>{
                this.loaderOff()
            })

        },
      news_created(){
        this.crNews = false
        this.getNews()
      },
      getNews(){
        this.$axios
            .get(`${this.server}/news-notes/get/byParams?sections=${JSON.stringify([this.$route.params.sectionID])}&sports=${JSON.stringify([])}`)
            .then( res => {
              this.news = []
              res.data.forEach( news =>{
                this.news.push(new News(news))
              } )
            })
      },
      showEvent ({nativeEvent, event}) {
        event = new ClientEvent(event)
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      }
    },
    mounted(){
      this.group_created()
      this.getNews()
  }
}
</script>
