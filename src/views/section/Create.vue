<template>
    <div class="px-6">
        <v-row class="text-h4 mb-3" color="text">Создать секцию</v-row>
        <v-form ref="form" v-model="valid">
            <v-row cols="12" md="4">
                <v-text-field
                v-model="sectionData.Name"
                :rules="[rules.req, rules.maxl]"
                :counter="max"
                label="Название"
                required
                outlined
                ></v-text-field>
            </v-row>
            <v-row cols="12" md="4">
                <v-text-field
                v-model="sectionData.Description"
                :rules="[]"
                label="Описание"
                outlined
                ></v-text-field>
            </v-row>
            <v-row cols="12" md="4">
                <v-select
                v-model="sectionData.SportTypeID"
                :items="sports"
                :rules="[rules.req]"
                item-text='Name'
                item-value='ID'
                label="Укажите вид спорта"
                outlined
                required
                :loading="disableS"
                :disabled="disableS"
                ></v-select>
            </v-row>
            <v-btn color="primary" :loading="crRequest && this.sectionData.CreatorID != ''" 
                :disabled="crRequest && this.sectionData.CreatorID != ''" block @click="Create()">
                Создать секцию
            </v-btn>
        </v-form>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
    name: "CreateSection",
    data(){
        return {
            valid: false,
            disableS: true,
            crRequest: false,
            crSuccess: false,
            max: 50,
            sports: [],
            sectionData:{
                Name: '',
                Description: '',
                CreatorID: '',
                SportTypeID: ''
            },
            rules: {
                req: (v) => !!v || "Обязательно для заполнения",
                arrReq: (v) => v.length > 0 || 'Выберите хотя бы один элемент',
                maxl: (v) =>
                (v && v.length <= this.max) ||
                `Слово должно быть короче ${this.max} символов`
            }
        }
    },
    computed:{
        ...mapGetters(['get_auth_user']),
    },
    methods:{
        Create(){
            if(this.valid)
            {
                this.crRequest = true
                this.$axios.post(`${this.$store.state.server}/createSection`, this.sectionData)
                    .then(res=>{
                        console.log(res)
                        this.crSuccess = true
                        this.login()
                        })
            }
            else
            {
                this.$refs.form.validate()
            }
            }
    },
    watch:{
        get_auth_user(val){
            if(val) this.sectionData.CreatorID = val.ID
        }
    },
    mounted(){
        this.$axios
          .get(`${this.$store.state.server}/sportsDict`)
          .then(sports =>{
            this.sports = sports.data
            this.disableS = false
          })
    }
}
</script>