<template>
  <v-form ref="form" v-model="valid" @submit.prevent="crGroup()" class="pa-4">
    <div class="text-h6">
        Создание группы
    </div>
    <v-row cols="12" md="4">
      <v-text-field
        v-model="newGroup.Name"
        :rules="[rules.req, rules.maxl]"
        :counter="max"
        label="Название"
        required
        outlined
      ></v-text-field>
    </v-row>
    <v-row cols="12" md="4">
      <v-text-field
        v-model="newGroup.Description"
        :rules="[rules.req]"
        label="Описание"
        required
        outlined
      ></v-text-field>
    </v-row>
    <v-row cols="12" md="4">
        <v-select
            v-model="newGroup.AgeTypeID"
            :items="AgeTypes"
            :rules="[rules.req]"
            item-text="ItemName"
            item-value='ID'
            label="Укажите возрастную группу"
            outlined
            required
            :loading="disableAT"
            :disabled="disableAT"
            ></v-select>
    </v-row>

    <v-row cols="12" md="4" color=error>
        {{errMessage}}
    </v-row>
    <v-btn color=primary block type=submit :loading="create_req" :disabled="create_req">
        Прикрепить
    </v-btn>
    <v-row cols="12" class="mt-4">
      <CreateAT @created="fetchAT()" />
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import {AgeType} from "@/classes";
import CreateAT from '../age-type/Create'
export default {
  name: "CreateGroup",
  components: {
    CreateAT
  },
  data() {
    return {
      create_req: false,
      valid: false,
      max: 50,
      newGroup: {
        Name: "",
        Description: "",
        SectionID: this.$route.params.sectionID,
        AgeTypeID: "",
      },
      rules: {
        req: (v) => !!v || "Обязательно для заполнения",
        arrReq: (v) => v.length > 0 || "Выберите хотя бы один элемент",
        maxl: (v) =>
          (v && v.length <= this.max) ||
          `Слово должно быть короче ${this.max} символов`,
      },
      AgeTypes: [],
      disableAT:false,
      errMessage: ''
    };
  },
  computed: {
    ...mapGetters(["auth_id"]),
  },
  methods: {
        crGroup(){
            if(this.valid)
            {
                this.create_req = true
                this.$axios
                    .post(`${this.server}/groups/create`, this.newGroup)
                    .then(() => {
                        this.create_req = false
                        this.newGroup.Name = ''
                        this.newGroup.Description = ''
                        this.newGroup.AgeTypeID = ''
                        this.$emit('created')
                    })
                    .catch(err => {
                        console.error(err)
                        this.errMessage = "Ошибка при создании группы. Попробуйте повторить операцию позже."
                        })
            }
            else {this.$refs.form.validate()}
            
        },
        fetchAT() {
        this.disableAT = true
        this.$axios
            .get(`${this.server}/groups/age-types/get?UserID=${this.auth_id}`)
            .then((AgeTypes) => {
            this.AgeTypes = []
             AgeTypes.data.forEach(at => {
               this.AgeTypes.push(new AgeType(at))
             })
            this.disableAT = false
            })
            .catch(err => console.error(err))
        },
  },
  mounted() {
    this.fetchAT();
  },
};
</script>
