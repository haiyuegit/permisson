<template>
    <el-row>
        <el-col :span="4">
    <el-checkbox v-model="checkAll" :disabled="dis" label="ALL" @change="handleCheckAllChange">所有用户</el-checkbox>
        </el-col>
        <el-col :span="20">
    <el-checkbox-group v-model="boxvalue" @change="handleCheckedChange">
        
        <el-checkbox v-for="(val,key) in selectData.TergetPerson" :key="key" :disabled="dis" :label="key" >{{val}}</el-checkbox>
    </el-checkbox-group>
        </el-col>
    </el-row>
</template>
<script>
import selectData from '../../config/rewardSelectData.js'
export default {
    name: '',
    components:{

    },
    props:{
        dis:true
    },
    mounted() {
        // this.boxvalue = []
    },
    watch:{
        boxvalue:function(newval,old){
            if(newval.indexOf('ALL')<0 && old.indexOf('ALL')>-1){
                newval = []
            }
            return newval
        }
    },
    data () {
        return {
            checkAll:false,
            selectData:selectData,
            boxvalue: [],
            allCheckOptions:['NEW','OLD','ONLINE','OFFLINE']
        }
    },
    methods: {
        handleCheckedChange(val){
            // return
            console.log('val',val)
            if(val.length===4){
                // this.boxvalue = this.allCheckOptions
                this.checkAll = true
            }else{
                this.checkAll = false
            }
            
            this.$emit('input',this.boxvalue)
        },
        exVal(val){
            if(val.indexOf('ALL')>-1){
                return this.allCheckOptions
            }
            return val
        },
        handleCheckAllChange(val){
            
            if(val){
                this.boxvalue = this.allCheckOptions
            }else{
                this.boxvalue = []
            }
        }
    }
}
</script>
<style lang='less' scoped>

</style>