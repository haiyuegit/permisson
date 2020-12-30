<template>
    <div class="content">
        <caseSearch numName="案件编号" showDate="show" v-on:search="fddSearch"></caseSearch>
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
            label="案件编号"
            prop="caseNumber">
            </el-table-column>

            <el-table-column
            label="案件名称"
            prop="caseName">
            </el-table-column>

            <el-table-column
            label="借款人"
            prop="debtorName">
            </el-table-column>

            <el-table-column
            label="请求总金额(元)"
            prop="disputeFee"
            >
            </el-table-column>

            <el-table-column
            label="逾期期数"
            prop="overdueNumber"
            width="80">
            </el-table-column>

            <el-table-column
            label="申请时间"
            prop="upplyTime"
            width="160"
            >
            </el-table-column>

            <el-table-column
            label="案件状态"
            prop="statusDepict"
            >
            </el-table-column>

            <el-table-column label="操作" width="80">
                <!-- <template slot-scope="scope">
                    <el-button
                    size="mini"
                    
                    @click="edit(scope.row)">编辑</el-button>
                </template> -->
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
    name: 'APPLICANT_CASECREATED',
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
            loading:false,
            cradio:'1',
            test:"test"
        }
    },
    computed:{
        menuList:function(){ 
            return this.menuManageList.list || []
            if(!pdata.length){
                return this.menuManageList.list
            }else{
                return this.dataTolist(this.menuManageList.list)
            }
            
        },
        
    },
    
    mounted() {
    },
    methods: {
        
        async getList(params){
            this.loading = true;
            let res = await this.$service.queryCreateCase(params)
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

        fddSearch(data){
            this.pageNum = 1;
            let params = {debtorName:data.name,contractNumber:data.code,overdueNumber:data.num,pageNum:1,pageSize:this.pageSize,startTime:data.startTime,endTime:data.endTime}
            this.getList(params)
        },

        dataTolist(data){
            return data.map((item)=>{
                item.menuStatus = item.enable?"已启用":"已停用";
                return item
            })
        },
        edit(data){
            this.$router.push({name:"APPLICANT_CREATECASE",params:{id:data.caseNumber,overdueNumber:data.overdueNumber}})
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