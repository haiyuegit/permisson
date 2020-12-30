<template>
    <div class="oprate_btn">
        <el-button class="fix_btn" size="medium" type="primary" @click="add()">新增</el-button>
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
   
    mounted() {
        // console.log('mounted')
    },
    
    methods: {
        add(){
            this.$emit("add")
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
.oprate_btn{
    padding:0 10px!important;
    button{
        margin-top:10px;
        margin-bottom:10px;
    }
}
</style>