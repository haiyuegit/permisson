<template>
    <el-form :inline="true" :model="formInline" size="medium">
            <el-form-item>
                <el-input v-model="formInline.menuname" :placeholder="inputPlace" class="normalInput"></el-input>
            </el-form-item>
            <el-form-item>
            <el-select v-model="formInline.selvalue" placeholder="是否启用" >
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
                <el-button class="fix_btn" type="primary" @click="onSubmit()">查询</el-button>
            </el-form-item>
        </el-form>
</template>
<script>
export default {
    name: '',
    components:{
        
    },
    props:{
        inputPlace:{
            default:"请输入值"
        }
    },
    data () {
        return {
            options: [{
                value: '1',
                label: '启用'
                }, {
                value: '0',
                label: '禁用'
            }],
            // selvalue:""
            formInline:{
                menuname:"",
                selvalue:""
            },
        }
    },
    methods: {
        onSubmit(){
            this.$emit('search',this.formInline)
        },
    }
}
</script>
<style lang='less' scoped>

</style>