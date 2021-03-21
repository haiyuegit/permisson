<template>
    <el-form :inline="true" :model="formInline"  class="demo-form-inline" size="medium">
         <div class="cash_box">
            <span><em>发放笔数：</em>{{propValue.prizeUserNum}}</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  
            <span><em>领取人数：</em>{{propValue.receiveUserNum}}</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            <span><em>发放总额：</em>{{propValue.prizeTotolAmount}}</span>       
        </div>   
        <el-form-item label="活动主题">
            <el-input v-model="formInline.activeTopic" :placeholder="inputPlace" class="normalInput"></el-input>
        </el-form-item>
        <el-form-item label="类型">
            <el-select v-model="formInline.receiveType">
                <el-option v-for="item in propValue.type" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="审核类型">
            <el-select v-model="formInline.auditStatus">
                <el-option v-for="item in propValue.setlectState" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="formInline.timeType">
              <el-option v-for="item in propValue.timeType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>&nbsp;&nbsp;  
          <el-date-picker
            v-model="showDate"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            type="daterange"
            value-format="yyyy-MM-dd"
            @change="getTime">
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
    components:{
    },
    props:{
        inputPlace:{
            default:"请输入值"
        },
        isSystem:{
            type:String,
            default:''
        },
        propValue:{
            type:Object,
            default:{}
        }
    },
    computed:{
        ...mapState({
            operateBtns:'operateBtns'
        })
    },
    mounted() {
        console.log('-----=--',this.dataConfig)
    },
    data () {
        return {
            formInline:{
                activeTopic:'',
                auditStatus:this.propValue.setlectStateValue,
                startTime:'',
                endTime:'',
                timeType:this.propValue.timeTypeValue,
                receiveType:this.propValue.typeValue
            },
            showDate:''
        }
    },
    created () {
      this.$emit('searchList',this.formInline,0)  
    },
    methods: {
        onSubmit(){
            this.$emit('searchList',this.formInline,0)
        },
        resetForm() {
            this.formInline = {
                activeTopic:'',
                auditStatus:this.propValue.setlectStateValue,
                startTime:'',
                endTime:'',
                timeType:this.propValue.timeTypeValue,
                receiveType:this.propValue.typeValue
            }
            this.showDate = '';
        },
        getTime(t){
            if(t){
                this.formInline.startTime = t[0] || '';
                this.formInline.endTime = t[1] || '';
            }else{
                this.formInline.startTime = '';
                this.formInline.endTime = '';
            }
        }
    }
}
</script>
<style lang='less' scoped>
.cash_box{
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
    margin-bottom: 20px;
}
.cash_box em{
    font-style: normal;
}
</style>