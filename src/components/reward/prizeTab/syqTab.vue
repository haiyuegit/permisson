<template>
<el-table
ref="permTable"
:data="tabData"
border
style="width: 100%">
   
    <el-table-column
    label="浮动利率（%）"
    prop="proportion"
    >
    </el-table-column>

    <el-table-column
    label="使用范围"
    prop="useScope"
    >
    </el-table-column>

    <el-table-column
    :show-overflow-tooltip=true
    label="使用期限"
    prop="serviceTime"
    >
        <template slot-scope="scope">
            {{scope.row.serviceTime | rewardServiceTime}}
        </template>
    </el-table-column>

    <el-table-column
    label="加息期限"
    prop="raiseInterestTime"
    >
        <template slot-scope="scope">
            {{scope.row | rewardQixian}}
        </template>
    </el-table-column>

    <el-table-column
    label="起止金额（元）"
    prop="minMoney"
    >
        <template slot-scope="scope">
            {{scope.row.minMoney+"-"+scope.row.maxMoney}}
        </template>
    </el-table-column>

    <el-table-column
    label="使用终端"
    prop="terminalType"
    >
        <template slot-scope="scope">
            {{scope.row.terminalType.join(',')}}
        </template>
    </el-table-column>

    <el-table-column
    label="有效期（天）"
    prop="validaty"
    >
    </el-table-column>

    <el-table-column
    label="数量"
    prop="number"
    >
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
    props:{
        tabData:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    mixins: [mixinMethods],
    components:{

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