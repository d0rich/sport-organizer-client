<template>
  <v-app id="app" class="overflow-hidden">
    <CoverElements />
    <div id="contentWindow" class="overflow-y-auto pt-11" style="max-height:100vh">
      <ConfirmEmail />
      <div id="content">
        <transition name="slide-fade" mode="out-in">
          <router-view  style="min-height: 80vh"/>
        </transition>
      </div> 
      <Footer class="mt-15" />
    </div>
  </v-app>
</template>

<script>
import Vue from 'vue'
import CoverElements from './components/CoverElements'
import Footer from './components/Footer.vue'
import ConfirmEmail from './components/ConfirmEmail.vue'


export default Vue.extend({
  name: "App",
  components:{
    CoverElements, Footer, ConfirmEmail
  },
  mounted(){
    this.$vuetify.theme.dark = true;
    this.login()
  }
})
</script>
<!-- Шрифты -->
<style>
@font-face {
  font-family: 'Jura';
  src: url('./assets/fonts/Jura-VariableFont_wght.ttf');
}
</style>

<!-- Основные настройки -->
<style>
html{
  font-family: 'Jura';
  font-size: 20px;
}
#app {
  overflow:hidden;
  font-family: 'Jura';
  font-size: 20px;
}
#content{
  max-width: 600px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 85px;
  min-height: 100vh
}
a{
  text-decoration: none
}
a:visited{
  color: var(--textcolor)
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<!-- Переходы -->
<style>
.long-fade-enter-active {
  transition: all 0.5s;
}
.long-fade-leave-active {
  transition: all 0.5s;
}
.long-fade-leave-to{
  opacity: 0;
}
.long-fade-enter{
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-leave-to{
  transform: translateX(100px);
  opacity: 0;
}
.slide-fade-enter{
  transform: translateX(-100px);
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.1s;
}
.fade-leave-active {
  transition: all 0.1s;
}
.fade-leave-to{
  opacity: 0;
}
.fade-enter{
  opacity: 0;
}
</style>