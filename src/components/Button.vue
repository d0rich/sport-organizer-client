<template>
    <div :class="{ color1: colorI==0,  color2: colorI==1}" >
        <div v-if="to">
            <router-link :to="to">
                <div :class="{button:true, wide: w}">
                    <div class="outline">
                    </div>
                    <div class=text :style="{'font-size': size}">{{text}}</div>
                </div>
            </router-link>
        </div>
        <div v-if="href">

        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
    name: "Button",
    props: ['text', 'to', 'href', 'colorIndex', 'fontsize', 'wide'],
    computed:{
        size(){
            if(this.fontsize) return this.fontsize
            else return document.getElementsByTagName('html')[0].style.fontsize
        },
        colorI(){
            if( this.colorIndex ) return this.colorIndex
            else return 0
        },
        w(){
            if(this.wide) return this.wide
            else return false
        }
    }
})
</script>
<style scoped>
.button{
    position: relative;
    padding: 0.3em;
    width: fit-content;
    height: fit-content;
    margin: 0.4em;
    transition: 0.1s ease;
}
.button.wide{
    text-align:center;
    width: 85%;
    margin: 0.4em auto;
}
.outline{
    position:absolute;
    left: 0px;
    top: 0px;
    z-index: -1;
    height: 100%;
    width: 100%;
    transition: 0.1s ease;
    opacity: 0.5;
}
.button:hover .text{
    transform: scale(0.95);
    transition: 0.1s ease;
}
.button:hover .outline{
    left: -5px;
    top: -5px;
    height: calc(100% + 10px);
    width: calc(100% + 10px);
    transition: 0.1s ease;
}
.color1 .button{
    background-color: var(--color21);
}
.color1 .outline{
    background-color: var(--color22);
}
.color2 .button{
    background-color: var(--color31);
}
.color2 .outline{
    background-color: var(--color32);
}
</style>