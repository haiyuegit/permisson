<template>
    <el-form v-if="operateBtns.SEARCH" :inline="true"  :model="formInline" class="demo-form-inline" size="medium">
        <el-form-item label="活动主题">
            <el-input v-model="formInline.activityTheme" :placeholder="inputPlace" class="normalInput"></el-input>
        </el-form-item>
        <el-form-item label="活动状态">
            <el-select v-model="formInline.activityStatus" placeholder="请选择活动主题">
                <el-option v-for="item in dataConfig.platform" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="平台名称">
            <el-select v-model="formInline.platformType" placeholder="请选择平台名称">
                <el-option v-for="item in dataConfig.platform" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="活动时间">
          <el-date-picker
            v-model="formInline.selDate"
            end-placeholder="结束日期"
            range-separator="-"
            start-placeholder="开始日期"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
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
    },
    computed:{
        ...mapState({
            operateBtns:'operateBtns'
        }),
    },
    mounted() {
        console.log('-----=--',this.dataConfig)
    },
    data () {
        return {
            options: [{
                value: 'zcj',
                label: '资产家'
                }, {
                value: 'djr',
                label: '大金融'
                }],
            formInline:{
                menuname:"",
                selvalue:"XHSR-OPER",
            },
        }
    },
    methods: {
        onSubmit(){
            this.$emit('search',this.formInline)
        },
        resetForm() {
            this.formInline = {
                menuname:"",
                selvalue:"XHSR-OPER",
            }
        },
        getTime(){

        }
    }
}
</script>
<style lang='less' scoped>

</style>