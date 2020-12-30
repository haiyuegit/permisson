<template>
    <div class="bread">
        <el-tabs v-model="curRoute" closable type="border-card" @tab-click="clickTab" @tab-remove="removeTab">
            <el-tab-pane
                v-for="item in routeList"
                :key="item.name"
                :label="item.title"
                :name="item.name"
            >
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>

export default {
    name: '',
    components:{

    },
    mounted() {
        this.setBread(this.$route);
        let that = this
        $router.beforeEach((to, from, next) => {
            // console.log(to,from)
            // console.log('---',that.routeList)
            //点击菜单和tab不会加载数据
            // if(!to.params.clickable && (to.meta.level !== 1)){
            //     let arr = that.routeList.filter(item=>{
            //         return item.name !== from.name
            //     })
            //     that.routeList = arr;
            //     console.log('arr',arr)
            //     that.$store.dispatch("setIncludes",arr)
            // }
            // if(to.params.clickable && (from.meta.level !== 1) && (from.meta.pcode === to.name)){
            //     return
            // }
            // 点击返回按钮，二级页 => 一级页
            if(from.meta.pcode === to.name){
                let arr = that.routeList.filter(item=>{
                    return item.name !== from.name
                })
                that.routeList = arr;
            }
            // 一级页 => 二级页
            if(to.meta.pcode === from.name){
                let arr = that.routeList.filter(item=>{
                    return item.name !== from.name
                })
                that.routeList = arr;
            }
            // if(!to.params.clickable && (to.meta.level !== 1)){
            //     that.$store.dispatch("setIncludes",that.routeList)
            // }
            setTimeout(()=>{
                next()
            })
            
            
        })
    },
    data () {
        return {
            title: '',
            routeList:[],
            curRoute: '',
        }
    },
    methods: {
        //设置tab        
        setBread(toData){
            this.$store.dispatch("setOperateBtns",toData.meta.operate)

            if(!this.ishasRoute(toData)){
                toData.meta.rname && this.routeList.push({title:toData.meta.rname,path:toData.path,name:toData.name})
            }
            this.curRoute = toData.name
          
            this.$store.dispatch("setIncludes",this.routeList)

        },
        removeTab(data){
            if(this.routeList.length === 1) return;
            
            this.routeList = this.routeList.filter(item=>{
                return data !== item.name
            })
            if(data === this.curRoute){
                this.curRoute = this.routeList[this.routeList.length-1].name;
                let res = this.getFilRoute();
                $router.push({path:res[0].path})
            }else{
                this.$store.dispatch("setIncludes",this.routeList)
            }
            
        },
        ishasRoute(path){
            let res = this.routeList.filter(item=>{
                return path.name === item.name
            })
            return res.length
        },
        clickTab(data,x){
            let res = this.getFilRoute()
            let clickable = false
            $router.push({name:res[0].name,params:{'clickable':true}})
            
        },
        getFilRoute(){
            let res = []
            res = this.routeList.filter(item=>{
                return this.curRoute === item.name
            })
            return res
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
    // border-bottom:1px solid #e5e5e5;
    .el-breadcrumb{
        line-height:45px;
        padding:0 20px;
    }
}
</style>