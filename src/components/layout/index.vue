<template>
    <el-container>
        <el-header height="45px">
            <x-header></x-header>
        </el-header>
        <el-main style="height:100%">
            <el-container>
                <x-menu></x-menu>
                <el-main>
                    <page-tab></page-tab>
                    <!-- <bread></bread> -->
                    <!-- <transition :name="transitionName" mode="out-in"> -->
                        <keep-alive :include="includes">
                            <router-view></router-view>
                        </keep-alive>
                    <!-- </transition> -->
                </el-main>
            </el-container>
        </el-main>
        <el-footer style="height:40px;">金融</el-footer>
    </el-container>

</template>
<script>
import { mapState,mapGetters } from 'vuex'
import XHeader from './XHeader'
import XMenu from './XMenu'
import bread from './bread'
import pageTab from './pageTab'

export default {
    name: '',
    components:{
        XHeader,
        XMenu,
        bread,
        pageTab
    },
    computed: {
        ...mapState({
            includes:'includes',
        }),
    },
    data () {
        return {
            title: '',
            transitionName: 'fade-transform',
        }
    },
    
    methods: {
        
    }
}
</script>
<style lang='less' scoped>
.el-header {
    background-color: #1f9bde;
    color: #333;
  }
  
  .el-main {
    // background-color: #E9EEF3;
    color: #333;
    padding:0;
    position:relative;
  }
  
.el-container {
    height:100%;
  }
.el-footer{
    background:#1f9bde;
    color:#fff;
    height:40px;
    line-height:40px;
    font-size:12px;
}  

</style>