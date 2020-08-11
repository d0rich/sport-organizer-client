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
            <v-btn color="primary" :loading="crRequest && this.sectionData.CreatorID !== ''"
                   :disabled="crRequest && this.sectionData.CreatorID !== ''" block @click="create()">
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
        create(){
            if(this.valid)
            {
                this.crRequest = true
                this.$axios.post(`${this.$store.state.server}/sections/create`, this.sectionData)
                    .then(res =>{
                        this.crSuccess = true
                        this.login()
                        this.$router.push({name: 'Section', params: { sectionID: res.data.ID }})
                        })
            }
            else
            {
                this.$refs.form.validate()
            }
            }
    },
    watch:{
        get_auth_user(){
            this.sectionData.CreatorID = this.get_auth_user.ID
        }
    },
    mounted(){
        this.$axios
          .get(`${this.$store.state.server}/dictionaries/sports`)
          .then(sports =>{
            this.sports = sports.data
            this.sectionData.CreatorID = this.get_auth_user.ID
            this.disableS = false
          })
    }
}
</script>