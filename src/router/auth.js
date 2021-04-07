import utils from '../lib/utils'
import {allPath} from '../config/allPath'
import axios from '../config/afetch'

let auth = {
    init(vue){
        vue.prototype.$checkLogin = this.checkLogin //检查登陆
        vue.prototype.$registLogin = this.registLogin //注册登陆
        vue.prototype.$logout = this.logout //退出
        vue.prototype.$registMenu = this.$registMenu //注册菜单
        vue.prototype.checkLogin = this.checkLogin //登陆
    },
    
    registerAuth(vue,router){
        // 路由判断登陆：根据路由配置文件的参数
        // to：将要访问的路径
        // form：从哪个路径跳转过来的
        // next():是一个函数代表放行
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

    //获取动态路由
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
    //登陆
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