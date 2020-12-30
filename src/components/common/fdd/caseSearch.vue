<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
            <el-form-item label="姓名">
                <el-input v-model="formInline.name" class="normalInput" placeholder="请输入借款人姓名"></el-input>
            </el-form-item>
            <el-form-item :label="numName">
                <el-input v-model="formInline.code" :placeholder="numNamePlace" class="normalInput"></el-input>
            </el-form-item>
            <el-form-item label="逾期期数">
                <el-input v-model="formInline.num" class="normalInput" placeholder="请输入逾期期数"></el-input>
            </el-form-item>
            <el-form-item v-if="showDate === 'show'" label="申请时间">
                <el-date-picker
                    v-model="formInline.date"
                    end-placeholder="结束日期"
                    range-separator="-"
                    start-placeholder="开始日期"
                    type="daterange"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button class="fix_btn" type="primary" @click="onSubmit()">查询</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
</template>
<script>
export default {
    name: '',
    components:{
    },
    props:{
        isSystem:{
            type:String,
            default:'',
        },
        showDate:"",
        numName:""
    },
    computed:{
        numNamePlace:function(){
            return '请输入'+this.numName
        }
    },
    // v-if="isSystem==='show'"
    data () {
        return {
            formInline:{
                name:"",
                code:"",
                num:"",
                date:""
            },
        }
    },
    methods: {
        onSubmit(){
            let sdate = this.formInline.date || [];
            this.formInline.num = parseInt(this.formInline.num) || ""
            if(Array.isArray(sdate)){
                this.formInline.startTime = sdate[0] || "";
                this.formInline.endTime = sdate[1] || "";
            }
            this.$emit('search',this.formInline)
        },
        resetForm() {
            this.formInline = {
                name:"",
                code:"",
                num:"",
                date:""
            }
        }
    }
}
</script>
<style lang='less' scoped>
.demo-form-inline .el-form-item{
    margin-bottom:5px;
}
</style>