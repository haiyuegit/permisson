<template>
<el-table
    ref="permTable"
    :data="tabData"
    border
    style="width: 100%">
   
    <el-table-column
    label="礼品名称"
    prop="giftClassName"
    >
    </el-table-column>

    <el-table-column
    :show-overflow-tooltip=true
    label="品类编号"
    prop="giftClassCode">
    </el-table-column>

    <el-table-column
    label="礼品数量"
    prop="number">
    </el-table-column>

    
    <el-table-column label="操作" width="155">
        <template slot-scope="scope">
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
        },
        xnPrizeLists:{
            default:'xnPrizeLists'
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
        console.log('---conditionData',this.conditionData)
        console.log('xnPrizeLists',this.xnPrizeLists)
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