<template>
    <el-form v-if="operateBtns.SEARCH" :inline="true"  :model="formInline" size="medium">
        <el-form-item label="活动编号">
            <el-input v-model="formInline.activeCode" class="normalInput" placeholder="请选输入活动编号"></el-input>
        </el-form-item>

        <el-form-item label="活动主题">
            <el-input v-model="formInline.activeTopic" class="normalInput" placeholder="请选输入活动主题"></el-input>
        </el-form-item>

        <el-form-item label="活动时间">
          <el-date-picker
            v-model="formInline.date"
            end-placeholder="结束日期"
            range-separator="-"
            start-placeholder="开始日期"
            type="datetimerange"
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
import { mapState,mapGetters } from 'vuex'
import Vue from 'vue';
export default {
    name: '',
    props:{
        isSystem:{
            type:String,
            default:''
        }
    },
    data () {
        return {
            formInline:{
                activeCode:"",
                activeTopic:"",

            },
            date:[]
        }
    },
    components:{
    },
    computed:{
        ...mapState({
            operateBtns:'operateBtns'
        })
    },
    methods: {
        onSubmit(){
            let sdate = this.formInline.date || [];
            if(Array.isArray(sdate)){
                this.formInline.startTime = sdate[0] || "";
                this.formInline.endTime = sdate[1] || "";
            }
            this.$emit('search',this.formInline)
        },
        resetForm(){
            this.date = []
            this.formInline={
                activeCode:"",
                activeTopic:""
            }
        }
    }
}
</script>
<style lang='less' scoped>

</style>