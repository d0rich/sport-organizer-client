<template>
    <div>
      <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item" >
        <v-list>
          <v-list-item>
            <v-list-item-title>Секции пользователя {{get_auth_user.Login}} ({{get_auth_user.Sections.length}}):</v-list-item-title>
          </v-list-item>
          <v-divider/>
            <v-list-item link>
              <router-link :to="{name: 'CreateSection'}">
                <v-list-item-action class="secondary--text lighten-3" >Создать секцию...</v-list-item-action>
              </router-link>
            </v-list-item>
          <v-divider/>
            <router-link v-for="section in get_auth_user.Sections" :key="section.ID" :to="{ name: 'Section', params: { sectionID: section.ID } }">
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
import {mapGetters} from 'vuex'
export default {
    name: "Sections",
    data(){
    return{
    }
  },
  computed:{
    ...mapGetters(['get_auth_user']),
    secNumber(){
      if (this.get_auth_user.Sections) return this.get_auth_user.Sections.length
      else return 0
    }
  },

}
</script>
