import Vue from 'vue'
import Router from 'vue-router'
// import {config} from '../config/routeConfig'
// import registMenu from './registMenu'

import {config} from '../config/routeConfig'
import service from '../service'


let registMenu = {
    init(vue){
        this.getMenu()
        Vue.prototype.$systemList = []
    },
    async getMenu(){
        // let res = await service.systemList({type:"platform"})
        // let systemList = res?res.details:[];
        // Vue.prototype.$systemList = this.exSysList(systemList)
    },
    exSysList(list){
        let obj = {};
        list.forEach(item => {
            obj[item.code] = item.name
        });
        return obj
    }
    
}

registMenu.install = function(Vue,router){
    this.init(Vue)
    // this.registerAuth(Vue,router)
}

export default registMenu