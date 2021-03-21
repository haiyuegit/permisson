import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)


const state = {
	systemList:[],//系统菜单
	permissionMenuList:[],//许可菜单
	menuTree:null,//菜单
    operateBtns:{},//操作按钮
    includes:[]
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
