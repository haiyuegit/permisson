<template>
    <div>
        <el-row v-for="(value,index) in urlImg" :key="index">
            <el-col><img :src="value.url" alt="" class="imgList"/></el-col>
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
        },
        urlImg:{
            type:Array,
            default:function(){
                return []
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
    text-align:center;
    &:last-child {
      margin-bottom: 0;
    }
  }
.el-col:first-child{
    text-align:center;
}
.imgList{
    max-width:438px;
}
</style>