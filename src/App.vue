<template>
  <div id="app">
    <loading v-if="show"></loading>
    <router-view v-if="!show"></router-view>
  </div>
</template>

<script>
import loading from "./pages/loading";
import { allPath } from "./config/allPath.js";
import utils from "./lib/utils.js";
import home from "./pages/home";

export default {
  name: "app",
  data() {
    return {
      show: false
    };
  },
  components: {
    loading
  },
  
  created() {
      //登陆权限：打开注释--运行项目时首先打开登录页面
      /*if(!this.checkLogin()){
          this.$logout()
      }*/
    //菜单权限设置
      if(this.checkLogin() && window.isPermission){
          this.$registMenu();
      }
      // console.log("allPath",allPath)
      // let list = []
      // allPath[0].children.forEach(item=>{
      //   list.push({
      //     code:item.name,
      //     name:item.meta.rname
      //   })
      // })
      // console.log(list)


    //  菜单权限开关main.js()
    if(!window.isPermission){
      //通过 router.addRoutes 动态挂载这些路由
      $router.addRoutes(allPath)
    }
    // $router.addRoutes(allPath)
  },
  methods: {}
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
