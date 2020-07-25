<template>
  <div id="app">
    <CoverElements />
    <div id="content">
      <transition name="slide-fade" mode="out-in">
       <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import CoverElements from './components/CoverElements'

export default Vue.extend({
  name: "App",
  components:{
    CoverElements
  },
  mounted(){
    const body = document.body;
    body.classList.add('commonTheme')
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
<!-- Темы -->
<style>
.commonTheme{
  --color11: #131414;
  --color12: #212426;
  --color21: #285985;
  --color22: #2793F2;
  --color31: #662020;
  --color32: #f22727;
  --textcolor: white;
  transition: ease 0.3s;
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
}
body{
  background-color: var(--color11);
  margin:auto;
}

#content{
  max-width: 600px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-top: 85px;
  color: var(--textcolor)
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
<!-- Элементы формы -->
<style>
textarea{
  font-family: 'Jura';
  background-color: var(--color12);
  border-style: solid;
  border-width: 3px;
  border-color: var(--color31);
  padding: 0.5rem
}
input{
  font-family: 'Jura';
  background-color: var(--color12);
  border-style: solid;
  border-width: 3px;
  border-color: var(--color31);
  padding: 0.3rem
}
select{
  font-family: 'Jura';
  background-color: var(--color12);
  border-style: solid;
  border-width: 3px;
  border-color: var(--color21);
  padding: 0.3rem
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