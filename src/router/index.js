
import Vue from 'vue'
import Router from 'vue-router'
import {config} from '../config/routeConfig'
// import registMenu from './registMenu'


Vue.use(Router)

// Vue.use(registMenu)

let router = new Router({
  routes: config,
  mode:"history"
})

window.$router = router

export default router