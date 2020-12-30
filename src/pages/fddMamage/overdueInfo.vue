<template>
    <div class="content" style="padding-top:100px">
        <caseSearch isSystem="show" numName="合同编号" v-on:search="fddSearch"></caseSearch>
        <el-table
        ref="permTable"
        v-loading="loading"
        :data="menuList"
        border
        size="medium"
        style="width: 100%">
             <!-- <el-table-column
            type="selection"
            width="35">
            </el-table-column> -->
           
            <el-table-column
            :show-overflow-tooltip="true"
            label="合同编号"
            prop="number">
            </el-table-column>

            <el-table-column
            label="标的金额"
            prop="debtEquity">
            </el-table-column>

            <el-table-column
            label="未还金额"
            prop="noPay"
            >
            </el-table-column>

            <el-table-column
            label="逾期期数"
            prop="overCount"
            width="80"
            >
            </el-table-column>

            <el-table-column
            label="借款人"
            prop="debtorsName"
            >
            </el-table-column>

            <el-table-column
            label="逾期金额"
            prop="overPay"
            >
            </el-table-column>

            <el-table-column label="操作" width="125">
                <template slot-scope="scope">
                    <el-button
                    v-if="scope.row.overCount>2 && operateBtns.CREATEAPPCLICATION"
                    size="mini"
                    @click="createc(scope.$index, scope.row)">创建案件</el-button>
                </template>
            </el-table-column>
           
        </el-table>

        <div v-if="menuManageList.total" class="page_bottom">
            <el-pagination
                :current-page="pageNum"
                :page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]"
                :total="menuManageList.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>

    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import caseSearch from '../../components/common/fdd/caseSearch'

export default {
    name: 'APPLICANT_OVERDUEINFO',
    components:{
        caseSearch,
    },
    data () {
        return {
            pageNum: 1,
            pageSize:10,
            menuManageList:{
                totalPage:0,
                list:[]
            },
            loading:false
        }
    },
    computed:{
        menuList:function(){ 
            return this.menuManageList.list || []
        },
        ...mapState({
            systemList:'systemList',
            operateBtns:'operateBtns'
        }),
    },
    
    mounted() {
        
    },
    methods: {
        
        async getList(params){
            this.loading = true;
            let res = await this.$service.queryOverdue(params)
            this.loading = false;
            this.menuManageList = res || {totalPage:0,list:[]};
        },
       
        async deletePerm(params){
            let res = await this.$service.deleteMenu(params)
            
            if(res){
                this.getList({name:"",pageNum:1,pageSize:this.pageSize})
                this.$message.success('删除成功');
            }
        },

        createc(idx,data){
            this.$router.push({name:"APPLICANT_CREATECASE",params:{id:data.number,overdueNumber:data.overCount}})
        },
        
        fddSearch(data){
            this.pageNum = 1;
            let overCount = data.num;
            let params = {debtorsName:data.name,number:data.code,overCount:overCount,pageNum:1,pageSize:this.pageSize}
            this.getList(params)
        },
        
    }
}
</script>
<style lang='less' scoped>
.search_top{
    text-align:left
}
.oprate_btn{
    padding:10px;
    background:#f0f0f0;
    margin-bottom:10px;
}
</style>