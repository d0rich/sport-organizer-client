<template>
    <div>
				<div id="Header">
					<div id="SidePanelButton" @click="MovePanel()" >
					</div>
				</div>
        <div id="SidePanel" :class="{notShow: !ShowPanel, show: ShowPanel}">
            <ul style="padding:0">
                <li v-for="(nav, i) in SideNavs" :key="i">
                  <Button :text="nav.text" :fontsize="'25px'" :to="{ name: nav.name }" :colorIndex="1" :wide="true" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Button from './Button'
import {mapGetters} from 'vuex'

export default Vue.extend({
  name:"CoverElements",
  components:{
    Button
  },
	data(){
		return{
			ShowPanel: false
		}
	},
	methods:{
		MovePanel(){
			this.ShowPanel = !this.ShowPanel
		}
	},
	computed:{ 
			...mapGetters(["SideNavs"])
			}
})
</script>

<style>
#Header{
position: fixed;
	left:0px;
  background-color: var(--color21);
  height: 55px;
  width: 100%;
  display: flex;
  flex-direction: row;
  z-index: 1001;
}
#SidePanelButton{
	width: 40px;
	height: 40px;
	background-color: var(--color32);
	margin-top: calc(55px /2 - 20px);
	margin-left: 10px;
}
#SidePanelButton:hover{
	cursor: pointer;
	transform: scale(1.15);
}
#SidePanel{
    background-color: var(--color12);
    position: fixed;
    z-index: 1000;
    width: 300px;
    height: 100%;
		padding-top: 55px;
    border-style: solid;
    border-color: var(--color32);
    border-width: 0 5px 0 0 ;
}
#SidePanel.show{
 left: 0;
 transition: .2s ease;
}
#SidePanel.notShow{
 left: -300px;
 transition: .2s ease
}
#SidePanel li {
    list-style-type: none; /* Убираем маркеры */
   }
</style>