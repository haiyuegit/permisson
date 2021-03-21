import utils from '../lib/utils'
import {allPath} from '../config/allPath'
import axios from '../config/afetch'

let auth = {
    init(vue){
        vue.prototype.$checkLogin = this.checkLogin
        vue.prototype.$registLogin = this.registLogin
        vue.prototype.$logout = this.logout
        vue.prototype.$registMenu = this.$registMenu
        vue.prototype.checkLogin = this.checkLogin
    },
    
    registerAuth(vue,router){
        router.beforeEach((to, from, next) => {
            // if(!localStorage.getItem("authToken") && (to.name!=="login")){
            //     next({
            //         path: '/login',
            //     })
            // }else if(to.name === 'login' && this.checkLogin()){
            //     next({
            //         path: '/',
            //     })
            // }else{
                next()
            // }
            
        })
    },

    async $registMenu(){
        let res = await this.$service.userPermissionMenu()
        
        let menuList = res.menuDetail.children || []
        this.$store.dispatch("getPermissionMenu",menuList)
        let arr = []
        let qwe = utils.extendPath(menuList,arr)
        
        let newPath = utils.deepcopy(allPath);
        let parr = [{
            path: '/',
            name: 'home', 
            component: (resolve) => require(['../pages/home.vue'], resolve),
            level:1,
            meta:{
                pname: '首页',
                rname: '',
                level:1
            },
        },{
            path: '/systemManage/wordBookDetail',
            name: 'DICT_MANAGER_DETAIL', 
            component: (resolve) => require(['../pages/systemManage/wordBookDetail.vue'], resolve),
            level:1,
            meta:{
                pcode: 'DICT_MANAGER',
                pname: '系统管理',
                rname: '字典管理详情',
                level:2
            }
        },{
            path: '/fddMamage/createCase',
            name: 'APPLICANT_CREATECASE', 
            // component: createCase,
            component: (resolve) => require(['../pages/fddMamage/createCase.vue'], resolve),
            level:2,
            meta:{
                pname: '案件管理',
                rname: '创建案件',
                level:2
            }
        }].concat(arr)
        newPath[0].children = parr

        $router.addRoutes(newPath)
    },

    checkLogin(){
        if(localStorage.getItem("authToken")){
            window.AUTH_TOKEN = localStorage.getItem("authToken");
            return true
        }
    },
    //注册登陆
    registLogin(uname,data,callback){
        localStorage.setItem("authToken",data.accessToken)
        localStorage.setItem("uname",uname)
        localStorage.setItem("refreshToken",data.refreshToken)
        localStorage.setItem("expiresIn",data.expiresIn)
        utils.setExpiredAt(data.expiresIn)
        axios.defaults.headers.common['Authorization'] = "Bearer " + data.accessToken;
        callback && callback()
    },
    //退出
    logout(v){
        localStorage.removeItem("uname");
        localStorage.removeItem("authToken");
        this.$router.push({path:"/login"})
    }
}

auth.install = function(Vue,router){
    this.init(Vue)
    this.registerAuth(Vue,router)
}

export default auth