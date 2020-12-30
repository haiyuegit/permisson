<template>
    <el-select v-model="systemName" placeholder="请选择运营支撑系统" v-bind:value="value" v-on:change="$emit('input', systemName)">
        <el-option v-for="(value,key) in systemList" :key="key" :label="value.name" :value="value.code"></el-option>
    </el-select>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
export default {
    name: '',
    
    data () {
        return {
            systemName:''
        }
    },
    computed:{
         ...mapState({
            systemList:'systemList'
        }),
     },
     watch:{
         value:function(val){
             this.systemName = val
         }
     },
    props:['value'],
    mounted() {
        this.systemName = this.value;
    },
    methods: {
        
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