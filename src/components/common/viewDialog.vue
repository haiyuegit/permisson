<template>
    <div>
        <el-row v-for="(key,val,index) in detailData" :key="index" :gutter="12">
            <el-col :span="8">{{val}}</el-col>
            <el-col :span="16">{{key}}</el-col>
        </el-row>
    </div>
</template>
<script>

export default {
    name: '',
    components:{

    },
    data () {
        return {
            title: '',
        }
    },
    props:{
        detailData:{
            type:Object,
            default:function(){
                return {}
            }
        }
    },
    
    methods: {
        getMenuList(list){
            let _str = []
            if(list){
                _str = list.map((item)=>{
                    return item.operateId
                })
                return _str.join(",")
            }
            
            return _str
        }
    }
}
</script>
<style lang='less' scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.el-col:first-child{
    text-align:right
}
</style>