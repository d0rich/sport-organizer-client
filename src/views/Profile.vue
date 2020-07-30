<template>
  <div>
    <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="heading" class="ma-3">
      <div class="text-h5">
        {{user_profile.Login}}
      </div>
    </v-skeleton-loader>

    <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item">
      <div class="text-h5">
        {{`${user_profile.Name} ${user_profile.Surname}`}}
      </div>
    </v-skeleton-loader>
    
    <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item">
      <div class="">
        {{`Возраст: ${user_profile.Age} лет`}}
      </div>
    </v-skeleton-loader>

    <v-skeleton-loader v-if="user_profile.Weight" :loading="onLoad" transition="fade-transition" type="list-item">
      <div class="">
        {{`Вес: ${user_profile.Weight.toFixed(2)} кг`}}
      </div>
    </v-skeleton-loader>

    <v-skeleton-loader v-if="user_profile.Height" :loading="onLoad" transition="fade-transition" type="list-item">
      <div class="">
        {{`Рост: ${user_profile.Height.toFixed(2)} м`}}
      </div>
    </v-skeleton-loader>

    <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="list-item">
        <div>Виды спорта:</div>
    </v-skeleton-loader>
    <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="chip">
        <div>
          <v-chip v-for="sport in user_profile.Sports" :key="sport.ID" class="ma-2" color="primary">
            {{sport.Name}}
          </v-chip>
        </div>
    </v-skeleton-loader>

    <v-skeleton-loader v-if="showAsTrainee" :loading="onLoad" transition="fade-transition" type="list-item">
        <div>Тренируется в группах:</div>
    </v-skeleton-loader>
    <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="chip">
        <div>
          <v-chip v-for="group in user_profile.TraineeIn" :key="group.ID" class="ma-2" color="primary">
            {{group.Name}}
          </v-chip>
        </div>
    </v-skeleton-loader>

    <v-skeleton-loader v-if="showSections" :loading="onLoad" transition="fade-transition" type="list-item">
        <div>Созданные секции:</div>
    </v-skeleton-loader>
    <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="chip">
        <div>
          <v-chip v-for="section in user_profile.Sections" :key="section.ID" class="ma-2" color="primary">
            {{section.Name}}
          </v-chip>
        </div>
    </v-skeleton-loader>

    <v-skeleton-loader v-if="showAsTrainer" :loading="onLoad" transition="fade-transition" type="list-item">
        <div>Тренирует группы:</div>
    </v-skeleton-loader>
    <v-skeleton-loader :loading="onLoad" transition="fade-transition" type="chip">
        <div>
          <v-chip v-for="group in user_profile.TrainerIn" :key="group.ID" class="ma-2" color="primary">
            {{group.Name}}
          </v-chip>
        </div>
    </v-skeleton-loader>
    
    
  </div>
</template>

<script>
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex'
export default Vue.extend({
  name: 'Profile',
  data(){
    return{
    }
  },
  computed:{
    ...mapGetters(['user_profile']),
    showAsTrainee(){
      if(!this.user_profile.TraineeIn) return true
      else{
        if(this.user_profile.TraineeIn.length == 0) return false
        else return true
      }
    },
    showAsTrainer(){
      if(!this.user_profile.TrainerIn) return true
      else{
        if(this.user_profile.TrainerIn.length == 0) return false
        else return true
      }
    },
    showSections(){
      if(!this.user_profile.Sections) return true
      else{
        if(this.user_profile.Sections.length == 0) return false
        else return true
      }
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
})
</script>
