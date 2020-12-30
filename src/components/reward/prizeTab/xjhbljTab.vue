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
    label="值(元/%)"
    prop="jinli"
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