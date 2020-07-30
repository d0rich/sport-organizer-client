<template>
  <div>
    <v-app-bar
      absolute
      color="primary darken-3"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#contentWindow"
      scroll-threshold="500"
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"></v-img>
      </template>

      <v-app-bar-nav-icon @click.stop="MovePanel()"></v-app-bar-nav-icon>

      <v-toolbar-title>Sport orginizer</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Боковая панель -->
    <v-navigation-drawer v-model="ShowPanel" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{auth_login}}</v-list-item-title>
          <v-list-item-title>{{auth_username}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <router-link v-for="(nav, index) in SideNavs" :key="index" :to="{name:nav.name, params:{login: auth_login}}">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ nav.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ nav.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <v-list-item v-if="auth_status" link @click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
  name: "CoverElements",
  data() {
    return {
      ShowPanel: false,
    };
  },
  methods: {
    ...mapActions(['logout']),
    MovePanel() {
      this.ShowPanel = !this.ShowPanel;
    },
  },
  computed: {
    ...mapGetters(["SideNavs", 'auth_username', 'auth_login', 'auth_status']),
  },
});
</script>

<style>
#Header {
  position: fixed;
  left: 0px;
  background-color: var(--color21);
  height: 55px;
  width: 100%;
  display: flex;
  flex-direction: row;
  z-index: 1001;
}
#SidePanelButton {
  width: 40px;
  height: 40px;
  background-color: var(--color32);
  margin-top: calc(55px / 2 - 20px);
  margin-left: 10px;
}
#SidePanelButton:hover {
  cursor: pointer;
  transform: scale(1.15);
}
#SidePanel {
  background-color: var(--color12);
  position: fixed;
  z-index: 1000;
  width: 300px;
  height: 100%;
  padding-top: 55px;
  border-style: solid;
  border-color: var(--color32);
  border-width: 0 5px 0 0;
}
#SidePanel.show {
  left: 0;
  transition: 0.2s ease;
}
#SidePanel.notShow {
  left: -300px;
  transition: 0.2s ease;
}
#SidePanel li {
  list-style-type: none; /* Убираем маркеры */
}
</style>