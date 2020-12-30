<template>
    <div class="content">
        <topWrap>
            <systemSearch :itemList="itemList" isSystem="show" v-on:search="search"></systemSearch>
        </topWrap>
        <div class="table_bottom">
            <el-table
                    ref="permTable"
                    v-loading="loading"
                    :data="roleList"
                    border
                    style="width: 100%">
                <el-table-column
                        :show-overflow-tooltip=true
                        align="center"
                        label="活动码"
                        prop="activeCode"
                >
                </el-table-column>
                <el-table-column
                        :show-overflow-tooltip=true
                        align="center"
                        label="活动id"
                        prop="activeId"
                >
                </el-table-column>
                <el-table-column
                        :show-overflow-tooltip=true
                        align="center"
                        label="活动主题"
                        prop="activeTopic"
                >
                </el-table-column>

                <el-table-column
                        :show-overflow-tooltip=true
                        align="center"
                        label="开始时间"
                        prop="startTime"
                >
                </el-table-column>

                <el-table-column
                        :show-overflow-tooltip=true
                        align="center"
                        label="结束时间"
                        prop="endTime"
                >
                </el-table-column>

                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleClick(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

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

        <el-dialog
                center
                title="查看"
                width="40%">
        </el-dialog>
    </div>
</template>
<script>
    import systemSearch from '../../components/common/perSearch'
    import topWrap from '../../components/common/topWrap'
    import {queryMenuManageList} from '../../service'
    export default {
        name: 'XJHB_QUERY',
        components:{
            systemSearch,
            topWrap
        },
        data () {
            return {
                pageNum: 1,
                pageSize:10,
                searchData: {},
                manageList:{
                    totalPage:0,
                    list:[]
                },
                loading:false,
                itemList:[
                    {
                        label:"活动编号",
                        type:"input",
                        placeholder:"请输入活动编号",
                        model:'activeCode'
                    },{
                        label:"活动主题",
                        type:"input",
                        placeholder:"请输入活动主题",
                        model:'activeTopic'
                    },{
                        label:"活动时间",
                        type:"rangeTime",
                        placeholder:"请选择活动时间",
                        model:'activeTime'
                    }
                ],
            }
        },
        computed:{
            roleList:function(){
                let pdata = this.manageList.list
                if(!pdata){
                    return []
                }
                if(!pdata.length){
                    return this.manageList.list
                }else{
                    return this.dataTolist(this.manageList.list)
                }

            }
        },
        methods: {
            async getList(params){
                this.loading = true;
                let req = {...params,...this.searchData}
                let res = await this.$service.SyqTotalList(req)
                this.manageList = res || {totalPage:0,list:[]};
                this.loading = false
            },
            exEditData(data){
                let resData = JSON.parse(JSON.stringify(data))
                resData['isEnable'] = (resData.status === "已启用")
                return resData
            },
            dataTolist(data){
                return data.map((item)=>{
                    item.status = item.isEnable?"已启用":"已停用";
                    //item.system = this.$systemList[item.systemCode];
                    return item
                })
            },
            handleClick(row) {//查看
                console.log(row)
                //this.$router.push({path: '/systemManage/syqrecordDetails',query:{activeId:row.activeId, activeTopic:row.activeTopic, pageNum: 1, pageSize: this.pageSize, timeType: "giveTime"}})
                this.$router.push({name: 'SYQRECORD_DETAILS',query:{activeId:row.activeId, activeTopic:row.activeTopic, startTime:row.startTime, endTime:row.endTime, pageNum: 1, pageSize: this.pageSize, timeType: "giveTime",}})
            },
            search(data){
                this.searchData=data
                if(data.activeTime){
                    this.searchData.startTime = data.activeTime[0]
                    this.searchData.endTime = data.activeTime[1]
                }else{
                    this.searchData.startTime = "";
                    this.searchData.endTime = "";
                }
                this.pageNum = 1;
                this.pageSize = 10;

                let params = { pageNum:1, pageSize: 10}
                this.getList(params)
            }
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
    .perm_drop{
        margin-left:10px;
    }
    .activity_add_btn{
        margin-bottom:10px
    }

</style>