<template>
<el-table
    ref="permTable"
    :data="tabData"
    border
    style="width: 100%">
   
    <el-table-column
    label="金额项"
    prop="proportional"
    >
        <template slot-scope="scope">
            {{selectData.Proportlist[scope.row.proportional]}}
        </template>
    </el-table-column>

    <el-table-column
    :show-overflow-tooltip=true
    label="值（元/%）"
    prop="jinli">
        
    </el-table-column>

    <el-table-column
    :show-overflow-tooltip=true
    label="使用终端"
    prop="terminalType">
        <template slot-scope="scope">
            {{scope.row.terminalType.join(',')}}
        </template>
    </el-table-column>

    <el-table-column
    :show-overflow-tooltip=true
    label="使用范围"
    prop="useScope">
       
    </el-table-column>

    <el-table-column
    label="起止金额"
    prop="money"
    width="80">
        <template slot-scope="scope">
            {{scope.row.minMoney +"-"+ scope.row.maxMoney}}
        </template>
    </el-table-column>

    <el-table-column
    :show-overflow-tooltip=true
    label="使用期限(月)"
    prop="serviceTime"
    width="70">
        <template slot-scope="scope">
            {{scope.row.serviceTime | rewardServiceTime}}
        </template>
    </el-table-column>

    <el-table-column
    :show-overflow-tooltip=true
    label="有效期(天)"
    prop="validaty"
    width="80">
    </el-table-column>

    <el-table-column
    :show-overflow-tooltip=true
    label="数量"
    prop="number"
    width="80">
    </el-table-column>

    <el-table-column label="操作" width="155">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="danger"
            
            @click="handleDel(scope.$index, scope.row)">删除</el-button>
            <el-button
            size="mini"
            
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        </template>
    </el-table-column>

</el-table>
</template>
<script>
import mixinMethods from './tabMixin'
export default {
    name: '',
    components:{

    },
    mixins: [mixinMethods],
    inject:{
        conditionData:{
            default:'conditionData'
        }
    },
    props:{
        tabData:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    mounted(){
        // console.log('---conditionData',this.conditionData)
    },
    data () {
        return {
            title: '',
        }
    },
    methods: {
        
    }
}
</script>
<style lang='less' scoped>

</style>