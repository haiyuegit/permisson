<template>
<div>
    <el-table
        ref="permTable"
        v-loading="loading"
        :data="conditionList"
        border
        
        style="width: 100%">
             <el-table-column
            type="selection"
            width="35">
            </el-table-column>
            <el-table-column
            label="参与终端"
            prop="participationTerminal"
            >
            </el-table-column>

            <el-table-column
            :show-overflow-tooltip=true
            label="行为条件"
            prop="conditionType"
            width="70">
                <template slot-scope="scope">
                    {{selectData.conditionType[scope.row.conditionType]}}
                </template>
            </el-table-column>

            <el-table-column
            :show-overflow-tooltip=true
            label="奖励人群"
            prop="tergetPerson">
                <template slot-scope="scope">
                    {{scope.row.tergetPerson | rewardTargePerson}}
                </template>
            </el-table-column>

            <el-table-column
            :show-overflow-tooltip=true
            label="参与人群"
            prop="marketingPerson">
                <template slot-scope="scope">
                    {{scope.row.marketingPerson | rewardTargePerson}}
                </template>
            </el-table-column>

            <el-table-column
            label="每条件份数"
            prop="conditionAllNumber"
            width="80">
            </el-table-column>

            <el-table-column
            label="每条件每人份"
            prop="conditionPersonNumber"
            width="70">
            </el-table-column>

            <el-table-column
            :show-overflow-tooltip=true
            label="每日份数"
            prop="dayAllNumber"
            width="80">
            </el-table-column>

            <el-table-column
            :show-overflow-tooltip=true
            label="每日每人"
            prop="dayPersonNumber"
            width="80">
            </el-table-column>

        </el-table>
        <div class="mutually_btn">
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
</div>
</template>
<script>
import _selectData from '../../config/rewardSelectData.js'
export default {
    name: '',
    components:{

    },
    props:{
        activityId:""
    },
    data () {
        return {
            selectData:_selectData,
            title: '',
            loading:false,
            conditionList:[]
        }
    },
    mounted() {
        this.queryCondition({
            activityId:this.activityId
        })
    },
    methods: {
        async queryCondition(params){
            this.loading = true
            let res = await this.$service.actQueryConByHc(params)
            if(res){
                this.conditionList = res.details || [];
                // this.hcActivityIds = res.hcActivityIds
            }
            this.loading = false
        },
        onSubmit(){
            let rows = this.$refs.permTable.selection
            // if(!rows.length){
            //     this.$message.warning('请选择需要操作的列表')
            //     return
            // }
            let ids = rows.map((item)=>{
                return item.activityConditionId
            })
            this.$emit("selectConditionType",ids)
        }
    }
}
</script>
<style lang='less' scoped>
.mutually_btn{
    padding-top:20px;
    text-align: center;
}
</style>