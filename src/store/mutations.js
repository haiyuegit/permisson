import {

    GET_SYSTEM_LIST,
    GET_PERMISSIONMENU_LIST,
    GET_MENU_TREE,
    SET_OPERATE_BTNS,
    SET_INCLUDES

} from './mutation-type'
import Vue from 'vue';
import buttonMap from '../config/buttonConfig'

export default {

    [GET_SYSTEM_LIST](state, {
        res
    }) {
        state.systemList = JSON.parse(JSON.stringify(res))
        Vue.prototype.$systemList = exSysList(state.systemList)
    },
    [GET_PERMISSIONMENU_LIST](state, {
        res
    }) {
        state.permissionMenuList = JSON.parse(JSON.stringify(res))
    },
    [GET_MENU_TREE](state, {
        res
    }) {
        if (res) {
            let tree = [];
            tree.push(JSON.parse(JSON.stringify(res)))
            state.menuTree = tree
        } else {
            state.menuTree = null
        }
    },
    [SET_OPERATE_BTNS](state, {
        res
    }) {
        if (window.isPermission) {
            state.operateBtns = res || {}
        } else {
            state.operateBtns = buttonMap
        }

    },

    [SET_INCLUDES](state, {
        res
    }) {
        
        let arr = res.map(item=>{
            return item.name
        })
        state.includes = arr || []
    },
}

function exSysList(list) {
    let obj = {};
    list.forEach(item => {
        obj[item.code] = item.name
    });
    return obj
}