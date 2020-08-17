<template>
    <div>
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item" >
        <v-list>
          <v-list-item>
            <v-list-item-title>Секции пользователя {{user_profile.Login}} ({{user_profile.Sections.length}}):</v-list-item-title>
          </v-list-item>
          <v-divider/>
            <v-list-item v-if="get_auth_user.Login === $route.params.login" link>
              <router-link :to="{name: 'CreateSection'}">
                <v-list-item-action class="secondary--text lighten-3" >Создать секцию...</v-list-item-action>
              </router-link>
            </v-list-item>
          <v-divider/>
            <router-link v-for="section in user_profile.Sections" :key="section.ID" :to="{ name: 'Section', params: { sectionID: section.ID } }">
              <v-list-item link >
                  {{section.Name}}
              </v-list-item>
            </router-link>
        </v-list>
      </v-skeleton-loader>
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item" >
        <v-spacer />
      </v-skeleton-loader>
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item" >
        <v-spacer />
      </v-skeleton-loader>
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
    ...mapGetters(['user_profile', 'get_auth_user']),
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
