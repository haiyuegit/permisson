<template>
    <el-form ref="searchform" :inline="true" :model="formInline"  size="medium">
        <el-form-item label="客户端标识" prop="appIds">
            <el-select v-model="formInline.appId" placeholder="请选择">
                <el-option
                        v-for="item in appIds"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="是否启用" prop="isEnabled">
            <el-select v-model="formInline.isEnabled" placeholder="请选择">
                <el-option
                        v-for="item in isbing"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>

        <!-- <el-form-item label="Terracotta服务标识" prop="tcConfigId">
            <el-input v-model="formInline.tcConfigId"></el-input>
        </el-form-item> -->

        <el-form-item>
            <el-button class="fix_btn" type="primary" @click="onSubmit()">查询</el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        props:{
            appIds:{
                type:Array,
                default:function(){
                    return []
                }
            },
        },
        data () {
            return {
                options: [],
                formInline:{
                    // tcConfigId:"",
                    appId:'',
                    isEnabled:''
                },
                startEndTime: [],
                isbing:[
                    {name:"是",code:1},
                    {name:"否",code:0}
                ]
            }
        },
        
        methods: {
            //查询
            onSubmit(){
                console.log(this.$emit);
                this.$emit("search",this.formInline);
            },
            //重置
            resetForm(){
                this.formInline = {
                    // tcConfigId:"",
                    appId:"",
                    isEnabled:''
                }
            }
        }
    }
</script>
<style lang='less' scoped>

</style>