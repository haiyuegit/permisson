<template>
    <div class="content">
        <topWrap>
            <clientSearch ref="searchForm" :appIds="appIds" v-on:search="search"></clientSearch>
            <obtn :disPatchDel=true v-on:add="add" v-on:changeStatus="changeStatus"></obtn>
        </topWrap>
<!--列表-->
        <el-table
                ref="permTable"
                v-loading="loading"
                :data="manageList.list"
                border

                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="35">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    label="客户端标识"
                    prop="appId"
            >
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    label="描述"
                    prop="description"
            >
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    label="管理员"
                    prop="manageList"
            >
                <template slot-scope="scope">
                    {{getManageList(scope.row.appUserList)}}
                </template>
            </el-table-column>
            <el-table-column
                    label="状态"
                    prop="status"
                    width="80"
            >
                <template slot-scope="scope">
                    {{scope.row.isEnabled === 0?"已停用":"已启用"}}
                </template>
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    label="创建时间"
                    prop="createTime"
            >
            </el-table-column>

            <el-table-column
                    label="修改时间"
                    prop="updateTime"
                    width="160"
            >
            </el-table-column>
            <!-- <el-table-column
                    prop="tcConfigId"
                    label="Terracotta服务标识"
                    :show-overflow-tooltip=true
                    width="150"
            >
            </el-table-column> -->
            <el-table-column
                    :show-overflow-tooltip=true
                    label="Terracotta服务地址"
                    prop="tcConfigUrl"
            >
            </el-table-column>
            <!-- <el-table-column
                    prop="messageProtocol"
                    label="消息协议"
                    :show-overflow-tooltip=true
            >
            </el-table-column> -->
            <el-table-column
                    :show-overflow-tooltip=true
                    label="消息队列服务地址"
                    prop="messageServerAddress"
            >
            </el-table-column>


            <el-table-column label="操作"
                             width="80">
                <template slot-scope="scope">
                    <el-button
                            v-if="operateBtns.EDIT"
                            size="mini"
                            @click="edit(scope.$index, scope.row)">修改</el-button>

                </template>
            </el-table-column>
        </el-table>
<!--分页组件-->
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
<!--新增弹窗框-->
        <el-dialog
                :title="addFormName"
                :visible.sync="addDialogVisible"
                center
                custom-class="limit_dialog"
                width="60%">
            <xadd
                    v-if="addDialogVisible"
                    ref="addForm"
                    :appIds="appIds"
                    :form="rowData"
                    :oprateType="oprateType"
                    v-on:close="closeAdd"
                    v-on:submitAddTask="submitAddTask"
            ></xadd>
        </el-dialog>
    </div>
</template>
<script>
    import { mapState,mapGetters } from 'vuex'
    import topWrap from '../../components/common/topWrap'
    import clientSearch from '../../components/task/clientSearch'
    import obtn from '../../components/common/operateBtn'
    import xadd from '../../components/task/addClient'

    import {queryMenuManageList} from '../../service'
    export default {
        name: 'CLIENT_LIST',
        components:{
            topWrap,
            clientSearch,
            obtn,
            xadd,
        },
        data () {
            return {
                pageNum: 1,
                pageSize:10,
                curRowid:"",
                addDialogVisible:false,
                searchData:{},
                manageList:{
                    totalPage:0,
                    list:[]
                },
                oprateType:'add',
                rowData:{},

                loading:false,
                appIds:[],
            }
        },
        computed:{
            ...mapState({
                operateBtns:'operateBtns'
            }),
            addFormName:function(){
                return this.oprateType === "add" ? "添加客户端" : "修改客户端"
            }
        },
        mounted() {
            this.getAppIds();
        },
        watch: {
            appIds() {
                this.appIds = this.appIds;
            }
        },
        methods: {
            async getList(params){
                this.loading = true;
                // let req = {...params,...this.searchData};
                // let res = await this.$service.clientList(req);
                // this.manageList = res || {totalPage:0,list:[]};
                this.manageList = {
                    'retCode': 'AAAAAAA',
                    'retsultCode': 'AAAAAAA',
                    'total': 1,
                    list:[{
                        'appId':'客户端标识',
                        'description':'描述',
                        'manageList':'管理员',
                        'status':'状态',
                        'createTime':'创建时间',
                        'updateTime':'修改时间',
                        'tcConfigUrl':'tcConfigUrl服务地址',
                        'messageServerAddress':'消息队列服务地址',
                    }]
                };
                this.loading = false
            },
            //获取活动id
            async getAppIds(){
                let params = {
                    pageNum:1,
                    pageSize:50,
                    type:"JOB_SCHEDULER_APP_ID"
                }
                let res = await this.$service.wordDetailList(params)
                if(res){
                    console.log(res)
                    this.appIds = res.details
                }
            },
            //添加客户端
            async addTaskManage(params){
                console.log(params)
                let res = await this.$service.taskAddClient(params);
                if(res){
                    this.addDialogVisible = false;
                    this.$message.success("添加客户端成功！")
                    // this.$refs.addForm.$refs['addForm'].resetFields();
                    // this.$refs.addForm.$refs.tree.setCheckedKeys([])

                    this.getList({pageNum:this.pageNum,pageSize:this.pageSize})
                }
            },
            //更新客户端
            async updateTaskManage(params){
                let res = await this.$service.modifyClient(params);
                if(res){
                    this.addDialogVisible = false;
                    this.$message.success("更新客户端成功！")
                    // this.$refs.addForm.$refs['addForm'].resetFields();
                    // this.$refs.addForm.$refs.tree.setCheckedKeys([])

                    this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                }
            },
            async enable(params,status){
                let res;
                if(status){
                    res = await this.$service.taskClientEnable(params)
                }else{
                    res = await this.$service.taskClientDisable(params)
                }

                if(res){
                    this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                    this.$message.success('改变状态成功');
                }
            },
            //删除客户端
            async deletePerm(params){
                let res = await this.$service.deleteRole(params)

                if(res){
                    this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                    this.$message.success('删除成功');
                }
            },
            async queryPermissionTree(params){
                let res = await this.$service.queryPermissionTree(params);
                res && (this.permissionTree.push(res.detail))
            },

            add(){
                this.oprateType = "add"
                this.rowData = {
                    // messageProtocol:"MESSAGE_QUEUE",
                    isEnabled:1
                }
                this.addDialogVisible = true;
                this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
            },
            edit(idx,row){
                this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
                this.oprateType = "update"
                this.rowData = this.exEditData(row)
                this.addDialogVisible = true;
            },
            exEditData(data){
                let resData = JSON.parse(JSON.stringify(data))
                resData['isEnable'] = (resData.status === "已启用")
                resData['appUserIdList'] = resData['appUserList'].map(item=>{
                    return item.id
                })
                return resData
            },
            changeStatus(status){
                let rows = this.$refs.permTable.selection;
                if(!rows.length){
                    this.$message.warning('请选择需要操作的列表')
                    return
                }
                let ids = rows.map((item)=>{
                    return item.bizId
                })
                let params = {
                    bizIdList:ids
                }
                this.enable(params,status)
            },

            submitAddTask(data){
                if(this.oprateType === "update"){
                    this.updateTaskManage(data)
                }else{
                    this.addTaskManage(data)
                }
            },
            getManageList(list){
                let arr = [];
                let manageList = list || []
                arr = manageList.map(item=>{
                    return item.name
                })
                return arr.join(',')
            },

            search(data){
                console.log(data);
                this.pageNum = 1;
                this.searchData = data;
                let params = {pageNum:1,pageSize:this.pageSize}
                this.getList(params)
            },
        }
    }
</script>
<style lang='less' scoped>
    .search_top{
        text-align:left;
    }
    .oprate_btn{
        padding:10px;
        background:#f0f0f0;
        margin-bottom:10px;
    }
    .perm_drop{
        margin-left:10px;
    }


</style>