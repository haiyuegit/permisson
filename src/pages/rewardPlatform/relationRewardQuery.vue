<template>
    <div class="content" style="padding-top:60px">
        <div class="showInfo">
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">邀请奖励现金红包总额：</div></el-col>
                <el-col :span="20"><div class="grid-content bg-purple-light">{{manageList.cashTotal}}</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">邀请奖励代金券总额：</div></el-col>
                <el-col :span="20"><div class="grid-content bg-purple-light">{{manageList.voucherTotal}}</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">邀请奖励提现券总额：</div></el-col>
                <el-col :span="20"><div class="grid-content bg-purple-light">{{manageList.withdrawTotal}}</div></el-col>
            </el-row>
        </div>
        <systemSearch :itemList="itemList" isExport="show" isSystem="show" v-on:exportForm="exportForm" v-on:search="search"></systemSearch>
        <el-table
                ref="multipleTable"
                v-loading="loading"
                :data="manageList.list"
                border
                style="width: 100%">
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="用户ID"
                    prop="userId">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="邀请人"
                    prop="inviterName">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="被邀请人"
                    prop="inviteeName">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="邀请时间"
                    prop="inviteTime">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="邀请奖励现金红包(元)"
                    prop="inviteAwardValue">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="邀请奖励代金券(元)"
                    prop="inviteAwardType">
            </el-table-column>

            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="邀请奖励收益券(%)"
                    prop="inviteAwardValue">
            </el-table-column>

            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="邀请奖励提现券(元)"
                    prop="inviteAwardValue">
            </el-table-column>
        </el-table>
        <div v-if="manageList.total" class="page_bottom">
            <el-pagination
                    :current-page="pageNum"
                    :page-size="10"
                    :page-sizes="[10, 20, 30, 40]"
                    :total="manageList.total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {queryMenuManageList} from '../../service'
    // import recordDetailsSearch from '../../components/wordBookManage/recordDetailsSearch'
    import systemSearch from '../../components/common/perSearch'
    export default {
        name: 'REALTION_REWARDQUERY',
        components:{
            systemSearch,
        },
        data () {
            return {
                pageNum: 1,
                pageSize:10,
                searchData: {},
                manageList:{
                    total:0,
                    list:[]
                },
                loading:false,
                itemList:[
                    {
                        label:"邀请人",
                        type:"input",
                        placeholder:"请输入邀请人",
                        model:'inviterName'
                    },{
                        label:"被邀请人",
                        type:"input",
                        placeholder:"请输入被邀请人",
                        model:'inviteeName'
                    },{
                        label:"邀请时间",
                        type:"rangeTime",
                        placeholder:"请选择邀请时间",
                        model:'activeTime'
                    }
                ],
            }
        },
        mounted() {
           
        },
        methods: {
            async getList(params){
                this.loading = true;
                this.pageNum = 1;
                let req = {...params,...this.searchData}
                let res = await this.$service.invitePrizeList(req)
                this.manageList = res || {totalPage:0,list:[]};
                this.loading = false
            },
            search(data){
                var startTime = "";
                var endTime = "";
                if(data.activeTime){
                    startTime = data.activeTime[0]
                    endTime = data.activeTime[1]
                }
                console.log(data)
                this.pageNum = 1;
                this.searchData=data
                let params = {inviterName:data.inviterName, inviteeName: data.inviteeName, pageNum: 1, pageSize:this.pageSize, startTime:startTime, endTime:endTime}
                console.log(params)
                this.getList(params)
            },
            exportForm(data){
                var startTime = "";
                var endTime = "";
                if(data.activeTime){
                    startTime = data.activeTime[0]
                    endTime = data.activeTime[1]
                }

                window.location.href = this.baseURL+"/reward/giver/invite-prize/export?inviterName="+data.inviterName+
                    "&inviteeName="+data.inviteeName+
                    "&startTime="+startTime+
                    "&endTime="+endTime;

                return false
            }
        }
    }
</script>
<style lang='less' scoped>
    .oprate_btn{
        padding:10px;
        background:#f0f0f0;
        margin-bottom:10px;
    }
    .showInfo{
        line-height: 30px;
        margin-bottom:20px;
        .bg-purple{
            text-align: right;
            margin-right:10px;
        }
    }
</style>