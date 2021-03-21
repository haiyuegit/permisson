import {
    
    GET_SYSTEM_LIST,
    GET_PERMISSIONMENU_LIST,
    GET_MENU_TREE,
    SET_OPERATE_BTNS,
    SET_INCLUDES
    
} from '../mutation-type'

import service from '../../service'


export default {
    async getSystemListAction({commit,state},params){
        let res = await service.systemList(params)
        let details = res?res.details : []
        commit(GET_SYSTEM_LIST,{res:details})
    },

    getPermissionMenu({commit,state},params){
        // let res = await service.userPermissionMenu(params)
        // let details = res?res.menuDetail : []
        commit(GET_PERMISSIONMENU_LIST,{res:params})
    },
    //获取动态菜单
    async getMenuTreeAction({commit,state},params){
        let res = await service.queryMenuTree(params)
        let details = res?res.detail : null
        commit(GET_MENU_TREE,{res:details})
    },
    //设置操作按钮
    setOperateBtns({commit,state},params){
        commit(SET_OPERATE_BTNS,{res:params})
    },

    setIncludes({commit,state},params){
        commit(SET_INCLUDES,{res:params})
    },
}
