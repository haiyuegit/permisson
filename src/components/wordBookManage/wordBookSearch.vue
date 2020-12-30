<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
        <el-form-item>
          <el-input v-model="formInline.name" :placeholder="inputPlace" class="normalInput"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="fix_btn" type="primary" @click="wordListFormQuery()">查询</el-button>
        </el-form-item>
    </el-form>
</template>
<script>

export default {
    props:{
        inputPlace:{
            default:"请输入值"
        }
    },
    data () {
        return {
            formInline:{
                name:""
            }
        }
    },
    methods: {
        wordListFormQuery(){
          this.$emit("wordListFormQueryTopar",this.formInline.name);
        }
    }
}
</script>
<style lang='less' scoped>

</style>