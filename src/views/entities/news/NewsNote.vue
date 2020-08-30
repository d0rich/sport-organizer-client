<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card style="overflow-x: hidden"
              :class="`elevation-${hover ? 24 : 0}`"
              class="transition-swing">
        <v-toolbar color="primary">
          <v-toolbar-title>
            <router-link :to="{name: 'Section', params: { sectionID: newsNote.Section.ID }}">
              <v-btn icon>
                <v-icon>mdi-account-group</v-icon>
              </v-btn>
            </router-link>
            {{newsNote.Section.Name}}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-title>{{newsNote.Header}}</v-card-title>
        <v-card-text v-for="(p,index) in newsNote.Text.split('\n')" :key="index" >{{p}}</v-card-text>
        <v-card-actions v-if="newsNote.Event">
          <span>Привязанное событие: </span>
          <v-chip @click="showEvent($event, newsNote.Event)" class="ma-2" :color="getEventColor(newsNote.Event)" >
            {{newsNote.Event.Name}}
          </v-chip>
        </v-card-actions>
        <v-card-actions >
          <span>Автор: </span>
          <router-link class="ma-2" :to="{name: 'Profile', params: { login: newsNote.User.Login }}">
            <v-chip  color="primary" style="cursor: pointer">
              {{newsNote.User.fullNameLogin}}
            </v-chip>
          </router-link>
        </v-card-actions>
        <v-card-text style="text-align: left !important;">
          <p v-if="newsNote.createdAt.toISOString() !== newsNote.updatedAt.toISOString()">
            Дата изменения: {{ dateTime(newsNote.updatedAt)}}
          </p>
          <p>
            Дата публикации: {{ dateTime(newsNote.createdAt)}}
          </p>
        </v-card-text>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import {ClientEvent, News} from '@/classes'
export default {
  name: "NewsNote",
  props: {
    newsNote: News
  },
  methods: {
    showEvent (nativeEvent, event){
      this.$emit('show-event', {nativeEvent, event})
    },
    getEventColor (event) {
      return new ClientEvent(event).color
    },
  }
}
</script>

<style scoped>

</style>
