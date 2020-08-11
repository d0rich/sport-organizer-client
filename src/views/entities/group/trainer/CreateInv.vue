<template>
  <div>
    <v-divider />
    <v-form ref="form" v-model="valid"  @submit.prevent="createInv" >
      <div>Добавить нового тренера</div>
      <v-text-field
          v-model="newTrainer"
          :rules="[rules.req, rules.maxl]"
          required
          label="Логин нового тренера"
          class="px-3"
          outlined
      ></v-text-field>
      <v-alert type="success" :value="success" transition="scale-transition">
        Приглашение было успешно отпралено.
      </v-alert>
      <v-alert type="error" :value="error" transition="scale-transition">
        Ошибка: неверный логин или пользователь уже является тренером данной группы
      </v-alert>
      <v-btn color=primary block type=submit :loading="cr_req" :disabled="cr_req">
        Пригласить
      </v-btn>
    </v-form>
    <v-divider class="mt-2" />
  </div>
</template>

<script>
export default {
name: "TrainerCreateInv",
  data(){
    return{
      valid: false,
      success: false,
      error: false,
      cr_req: false,
      newTrainer: '',
      max: 50,
      rules: {
        req: (v) => !!v || "Обязательно для заполнения",
        maxl: (v) =>
            (v && v.length <= this.max) ||
            `Слово должно быть короче ${this.max} символов`
      },
    }
  },
  methods: {
    createInv(){
      this.cr_req = true
      this.success = false
      this.error = false
      this.$axios
        .post(`${this.server}/inviteTrainer`, { Login: this.newTrainer, GroupID: this.$route.params.groupID})
        .then(() => {
          this.success = true
          this.error = false
          this.cr_req = false
        })
        .catch(err => {
          console.error(err)
          this.error = true
          this.success = false
          this.cr_req = false
        })
    }
  }
}
</script>

<style scoped>

</style>
