<template>
    <div>
        <v-list>
            <v-subheader>Секции пользователя {{user_profile.Login}} ({{secNumber}}):</v-subheader>
            <v-list-item link>
              <router-link :to="{name: 'CreateSection'}">
                <v-list-item-action >Создать секцию...</v-list-item-action>
              </router-link>
            </v-list-item>
            <router-link v-for="section in user_profile.Sections" :key="section.ID" :to="{ name: 'Section', params: { sectionID: section.ID } }">
              <v-list-item link >
                  {{section.Name}}
              </v-list-item>
            </router-link>
        </v-list>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: "Sections",
    data(){
    return{
    }
  },
  computed:{
    ...mapGetters(['user_profile']),
    secNumber(){
      if (this.user_profile.Sections) return this.user_profile.Sections.length
      else return 0
    }
  },
  methods:{
    ...mapActions(['fetch_profile_data'])
  },
  mounted(){
    this.loaderOn()
    this.fetch_profile_data(this.$route.params.login)
      .then(()=>{
        this.loaderOff()
      })
  }
}
</script>