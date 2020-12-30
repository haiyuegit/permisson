import axios from 'axios'
import Vue from 'vue'

const fileinstance = axios.create({
    timeout: 10000
});


fileinstance.defaults.baseURL = process.env.VUE_APP_FILEURL;

fileinstance.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('authToken');

fileinstance.interceptors.request.use(function (config) {
    //添加统一接口信息
    // let data = config.data
    // let params = {
    //     head: {
    //         "logId": "f669729e-25d7-4b4e-b01b-66cf7bd02dc1",
    //         "platformNo": "zcj",
    //         "timestamp": "1538976365559"
    //     },
    //     data: data
    // }

    
    return config;
}, function (error) {
    return Promise.reject(error);
});


fileinstance.interceptors.response.use((res) => {
    //http接口状态判断
    if (res.status === 500) {
        Vue.prototype.$message.error('服务器异常！')
        return Promise.reject(res)
    }

    if (res.status !== 200) {
        Vue.prototype.$message.error('数据返回有误')
        return Promise.reject(res)
    }



    let resHead = res.data.head;
    // stateCode状态码200判断, 不为200则提示错误信息
    if (resHead.stateCode === "9986") {//如果状态码是9986则删除用户名和token信息并挑战登录页面
        localStorage.removeItem("uname");
        localStorage.removeItem("authToken");
        window.$router.push({
            path: "/login"
        })
        Vue.prototype.$message.error('用户验证失败')
        return null
    }

    if (resHead.stateCode === '9988') {
        Vue.prototype.$message.error('用户名不存在')
        return null
    }

    if (resHead.stateCode === '9985') {
        Vue.prototype.$message.error('密码不正确')
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
        Vue.prototype.$message.error('网络超时')
        return null
        // return Promise.reject(error);          // reject这个错误信息
    }
  
    console.log('promise error:' + error.message)
    Vue.prototype.$message.error(error.message)
    return null
})

export default fileinstance
