import axios from 'axios'
import Vue from 'vue'
import utils from '../lib/utils'
import api from '../service'

const instance = axios.create({
    timeout: 10000
});

//根据不同环境配置axios的baseUrl:开发环境、测试环境以及生产环境
instance.defaults.baseURL = process.env.VUE_APP_URL;//请求接口API地址：路径在permisson文件夹下的env.env

window.isRefreshing = false;//axios token过期刷新 重新续约
let refreshSubscribers = [];/// 存储请求的数组

//axios 请求拦截
instance.interceptors.request.use(function (config) {
    console.log(config);
    let timestamp = (new Date()).getTime();
    let url = config.url;
    //添加统一接口信息
    let data = config.data;
    let params = {
        head: {
            "logId": "f669729e-25d7-4b4e-b01b-66cf7bd02dc1",
            "platformNo": "XHSR-OPER-WEB",
            "timestamp": timestamp
        },
        data: data
    };
    // console.log('--config',config)
    if(config.useformData){
        config.data = utils.objectToFormData(params);
        config.headers["Content-Type"] = "application/x-www-form-urlencoded"
    }else{
        config.data = params
    }
    
    //axios token过期刷新 重新续约
    let authToken = localStorage.getItem('authToken');
    if (authToken) {
        config.headers.Authorization = "Bearer " + authToken;
        //判断是否过期 && 判断请求地址中是否含有token
        if (utils.isTokenExpired() && url.indexOf("token") === -1) {
            // $message.warning("token过期")如果过期则通过refreshToken接口重新设置token
            if (!window.isRefreshing) {
                window.isRefreshing = true;
                //发起刷新token的请求接口
                api.refreshToken({
                    refreshToken: localStorage.getItem('refreshToken')
                }).then(res => {
                    if(res){
                        window.isRefreshing = false;
                        config.headers.Authorization = "Bearer " + res.authToken;
                        //设置请求头localstorage中存储token
                        localStorage.setItem("authToken", res.accessToken);
                        localStorage.setItem("refreshToken", res.refreshToken);
                        localStorage.setItem("expiresIn", res.expiresIn);
                        utils.setExpiredAt(res.expiresIn);//设置过期时间
                        onRrefreshed(res.accessToken)//得到新的token后，用新token请求数据
                    }else{
                        localStorage.removeItem("authToken");
                        $router.push({path:"/login"})
                    }
                }).catch(err => {
                    Vue.prototype.$message.error(err);
                    /*清除本地保存的auth*/
                    localStorage.removeItem("authToken");
                    $router.push({path:"/login"})
                  })
            }

            /*把请求(token)=>{....}都push到一个数组中*/
            let retry = new Promise((resolve, reject) => {
                /*(token) => {...}这个函数就是回调函数*/
                subscribeTokenRefresh((token) => {
                    config.headers.Authorization = 'Bearer ' + token;
                    /*将请求挂起*/
                    resolve(config)
                })
            });
            return retry
        }
    }

    //如果请求登录接口则去掉之前token
    if (url.indexOf("token") > -1) {
        config.headers.Authorization = "";
    } else {
        // config.url = url.indexOf("/rbac")>-1?'/rbactest'+url:url
    }

    // config.data = params
    return config;

}, function (error) {
    return Promise.reject(error);
});

//http接口状态判断
instance.interceptors.response.use((res) => {
    if (res.status === 500) {
        Vue.prototype.$message.error('服务器异常！');
        return Promise.reject(res)
    }

    if (res.status !== 200) {
        Vue.prototype.$message.error('数据返回有误');
        return Promise.reject(res)
    }

    let resHead = res.data.head;
    // stateCode状态码200判断, 不为200则提示错误信息
    if (resHead.stateCode === "9986") {
        localStorage.removeItem("uname");
        localStorage.removeItem("authToken");
        window.$router.push({
            path: "/login"
        });
        Vue.prototype.$message.error('用户验证失败');
        return null
    }

    if (resHead.stateCode === "9997") {
        localStorage.removeItem("uname");
        localStorage.removeItem("authToken");
        window.$router.push({
            path: "/login"
        });
        Vue.prototype.$message.error('没有权限');
        return null
    }

    if (resHead.stateCode === '9988') {
        Vue.prototype.$message.error('用户名不存在');
        return null
    }

    if (resHead.stateCode === '9989' || resHead.stateCode === '9986') {
        Vue.prototype.$message.error('用户验证失败');
        return null
    }

    if (resHead.stateCode === '9985') {
        Vue.prototype.$message.error('密码不正确');
        return null
    }

    if (resHead.stateCode !== '0') {
        let errorMessage = resHead.depictDetailed ? resHead.depictDetailed : resHead.stateDepict
        Vue.prototype.$message.error(errorMessage);
    }
    return res.data.data || null
}, (error) => {
    //http异常
    if(error.message.indexOf('timeout') > -1){   // 判断请求异常信息中是否含有超时timeout字符串
        Vue.prototype.$message.error('网络超时');
        return null
        // return Promise.reject(error);          // reject这个错误信息
    }
  
    console.log('promise error:' + error.message);
    Vue.prototype.$message.error(error.message);
    return null
});

/*刷新请求（refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据）*/
function onRrefreshed (token) {
    refreshSubscribers.map(cb => cb(token))
}

/*push所有请求到数组中*/
function subscribeTokenRefresh (cb) {
    refreshSubscribers.push(cb)
}

export default instance