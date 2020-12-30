import utils from '../lib/utils'

export default {
    menuList(state){
        let arr = []
        let qwe = utils.extendPath(state.permissionMenuList,arr)
    
        return qwe
    }
}


