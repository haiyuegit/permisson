<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            
            <el-breadcrumb-item v-for="(item,index) in routeList" :key="index">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>

export default {
    name: '',
    components:{

    },
    mounted() {
        this.setBread(this.$route)
    },
    data () {
        return {
            title: '',
            routeList:[]
        }
    },
    methods: {
        setBread(toData){
            // console.log('watchRoute-------------',toData)
            this.$store.dispatch("setOperateBtns",toData.meta.operate)
            if(toData.meta.level === 1){
                this.routeList = [];
                if(toData.meta.pname){
                    this.routeList.push({name:toData.meta.pname})
                }
                
                toData.meta.rname && this.routeList.push({name:toData.meta.rname})
            }
        }
    },
    watch: {
    '$route' (to) {
        
        this.setBread(to)
    }
  }
}
</script>
<style lang='less' scoped>
.bread{
    position:absolute;
    z-index:999;
    background:#fff;
    top:0;
    left:0;
    height:40px;
    right:0;
    border-bottom:1px solid #e5e5e5;
    .el-breadcrumb{
        line-height:45px;
        padding:0 20px;
    }
}
</style>