<template>
  <v-menu
      v-model="open"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
  >
    <v-card >
      <v-toolbar
          :color="selectedEvent.color"
          dark
      >
        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <span v-html="details"></span>
      </v-card-text>
      <v-card-actions>
        <v-btn
            text
            color="secondary"
            @click="$emit('close')"
        >
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>

export default {
name: "Event",
  props: ['selectedEvent', 'selectedElement', 'selectedOpen'],
  data(){
    return {
      open: false
    }
  },
  computed:{
    details(){
      let details = ''
      const event = this.selectedEvent
      if(!event) return details
      details += `<p>Начало: ${this.twoSimbols(event.start.getDate())}/${this.twoSimbols(event.start.getMonth() + 1)}/${event.start.getFullYear()} ${this.twoSimbols(event.start.getHours())}:${this.twoSimbols(event.start.getMinutes())}</p>`
      details += `<p>Планируемое окончание: ${this.twoSimbols(event.end.getDate())}/${this.twoSimbols(event.end.getMonth() + 1)}/${event.end.getFullYear()} ${this.twoSimbols(event.end.getHours())}:${this.twoSimbols(event.end.getMinutes())}</p>`
      if (event.description) {
        const strings = event.description.split(`\n`)
        strings.forEach(s => {
          details += `<p>${s}</p>`
        })
      }
      return details
    }
  },
  watch: {
    selectedOpen(v){
      this.open = v
    }
  }
}
</script>

<style scoped>

</style>
