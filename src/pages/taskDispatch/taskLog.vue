<template>
    <div class="content">
        <topWrap>
        <taskLogSearch ref="searchForm" :appIds="appIds" :formInline="sData" v-on:search="search"></taskLogSearch>
        <!--<obtn v-on:add="add" v-on:changeStatus="changeStatus" :disPatchDel=true></obtn>-->
        </topWrap>
        <el-table
                ref="permTable"
                v-loading="loading"
                :data="roleList"
                border

                style="width: 100%">
            <!-- <el-table-column
                    type="selection">
            </el-table-column> -->
            
            <el-table-column
                    :show-overflow-tooltip=true
                    label="客户端主机标识"
                    prop="clientId"
            >
            </el-table-column>
            <el-table-column
                    label="客户端主机地址"
                    prop="clientAddress"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    label="客户端时间"
                    prop="clientTime"
                    width="160"
            >
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    label="日志类型"
                    prop="type"
            >
                <template slot-scope="scope">
                    {{tableContent(scope.row.type)}}
                </template>
            </el-table-column>
            <el-table-column
                    label="作业毫秒数"
                    prop="jobElapsedTime"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    label="预计下一次作业时间"
                    prop="triggerNextFireTime"
                    width="160"
            >
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    label="消息内容"
                    prop="content"
            >
            </el-table-column>
      

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    v-if="operateBtns.VIEW"
                    size="mini"
                    @click="handleView(scope.$index, scope.row)">查看</el-button>

                </template>
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



        <el-dialog
                :visible.sync="addDialogVisible"
                center
                custom-class="limit_dialog"
                title="添加任务"
                width="60%">
            <addTaskLog
                    ref="addForm"
                    :appIds="appIds"
                    :form="rowData"
                    :oprateType="oprateType"
                    :permissionTree="permissionTree"
                    v-on:close="closeAdd"
                    v-on:submitAddTask="submitAddTask"
            ></addTaskLog>
        </el-dialog>

        <el-dialog
        :visible.sync="centerDialogVisible"
        center
        title="查看"
        width="50%">
        <xdetail :detailData="detailData"></xdetail>
        </el-dialog>
        
    </div>
</template>
<script>
    import { mapState,mapGetters } from 'vuex'
    import topWrap from '../../components/common/topWrap'
    import taskLogSearch from './taskLogSearch'
    // import obtn from '../../components/common/operateBtn'
    import addTaskLog from '../../components/task/addTaskLog'
    import xmenu from '../../components/roleManage/menu'
    import xdetail from '../../components/common/viewDialog'

    import {queryMenuManageList} from '../../service'
    export default {
        name: 'TASK_LOG',
        components:{
            topWrap,
            taskLogSearch,
//            obtn,
            addTaskLog,
            xmenu,
            xdetail
        },
        data () {
            return {
                pageNum: 1,
                pageSize:10,
                curRowid:"",
                addDialogVisible:false,
                setResourceVisible:false,
                centerDialogVisible:false,
                searchData:{},
                manageList:{
                    total:0,
                    list:[]
                },
                sData:{
                    appId:'',
                    clientId: '',
                    clientTimeBegin: "",
                    clientTimeEnd: "",
                    // jobElapsedTimeBegin: "",
                    // jobElapsedTimeEnd: '',
                    jobGroup:'',
                    jobName: '',
                    triggerGroup: '',
                    triggerName: '',
                    type: ''
                },
                requireGetList:false,
                menuManageDetail:{},
                oprateType:'add',
                rowData:{},
                permissionTree:[],
                resourceTree:[],
                viewList:{
                    clientAddress:'客户端主机地址',
                    clientTime:'客户端主机时间',
                    jobGroup:'作业组名',
                    jobName:'作业名',
                    jobElapsedTime:'作业毫秒数',
                    triggerGroup:'触发器组名',
                    triggerName:'触发器名',
                    triggerStartTime:'触发器启动时间',
                    triggerEndTime:'触发器停止时间',
                    triggerPreviousFireTime:'触发器上一次点火时间',
                    triggerNextFireTime:'触发器下一次点火时间',
                    triggerFinalFireTime:'触发器最后一次点火时间',
                    type:'日志类型',
                    content:'日志内容',
                },
                loading:false,
                appIds:[]
            }
        },
        computed:{
            detailData:function(){
                if(!this.menuManageDetail){
                    return {}
                }
                var bak = {};
                for(let key in this.viewList){
                    if(key === "type"){
                        bak[this.viewList[key]] = this.tableContent(this.menuManageDetail[key])
                    }else if(key === 'persistJobDataAfterExecution'){
                        bak[this.viewList[key]] = this.menuManageDetail[key]?"是":"否"
                    }else if(key === 'triggerMisfireInstruction'){
                        bak[this.viewList[key]] = this.menuManageDetail[key] === 1?'立即再触发一次':'延迟到下一个计划再触发'
                    }else{
                        bak[this.viewList[key]] = this.menuManageDetail[key]
                    }
                }
                return bak
            },
            roleList:function(){
                let pdata = this.manageList.list || [];
                if(!pdata.length){
                    return this.manageList.list
                }else{
                    return this.dataTolist(this.manageList.list)
                }
            },
            ...mapState({
                operateBtns:'operateBtns'
            }),
        },
        mounted() {
            this.getAppIds();
        },
        methods: {
            async getList(params){
                this.loading = true;
                let req = {...params,...this.searchData}
                let res = await this.$service.customerManagement(req)
                this.manageList = res || {total:0,list:[]};
                this.loading = false
            },
            async getAppIds(){
                let res = await this.$service.taskQueryAppId({})
                if(res){
                    this.appIds = res.list;
                    if(this.appIds.length > 0){
                        // this.sData.appId = this.appIds[0].appId;
                        this.$refs.searchForm.$refs['formInline'].model.appId = this.appIds[0].appId;
                        this.searchData.appId = this.appIds[0].appId
                        this.getList({appId:this.appIds[0].appId,pageNum:1,pageSize:10})
                    }
                }
            },
            async queryDetail(params){
                let res = await this.$service.queryRoleManageDetail(params)
                this.menuManageDetail = res
            },
            async addTaskManage(params){
                let res = await this.$service.addTask(params);
                if(res){
                    this.addDialogVisible = false;
                    this.$message.success("添加任务成功！");
                    this.$refs.addForm.$refs['form'].resetFields();
                    this.$refs.addForm.$refs.tree.setCheckedKeys([])

                    this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                }
            },
            async updateTaskManage(params){
                let res = await this.$service.modifyTask(params);
                if(res){
                    this.addDialogVisible = false;
                    this.$message.success("更新任务成功！");
                    this.$refs.addForm.$refs['form'].resetFields();
                    this.$refs.addForm.$refs.tree.setCheckedKeys([]);
                    this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                }
            },
           
            // 启用按钮
            async enable(params){
                let res = await this.$service.enable(params)

                if(res){
                    this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                    this.$message.success('改变状态成功');
                }
            },
            // 禁用按钮
            async disable(params){
                let res = await this.$service.disable(params)

                if(res){
                    this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                    this.$message.success('改变状态成功');
                }
            },

            /* async deletePerm(params){
                 let res = await this.$service.deleteRole(params)

                 if(res){
                     this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                     this.$message.success('删除成功');
                 }
             },*/
            async queryPermissionTree(params){
                let res = await this.$service.queryPermissionTree(params);
                res && (this.permissionTree.push(res.detail))
            },
            async getResourceTree(params){
                let res = await this.$service.resourceTree(params);
                res && (this.resourceTree.push(res.detail))
            },
            add(){
                this.oprateType = "add"
                this.rowData = {
                    isEnable:""
                }
                this.addDialogVisible = true;
                this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
            },
            search(data){
                this.pageNum = 1;
                this.searchData = data;
                let params = {pageNum:1,pageSize:this.pageSize}
                this.getList(params)
            },
            edit(idx,row){
                this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
                this.opetateType = "update"
                this.rowData = this.exEditData(row)
                this.addDialogVisible = true;
            },

            exEditData(data){
                let resData = JSON.parse(JSON.stringify(data))
                resData['isEnable'] = (resData.status === "已启用")
                return resData
            },
            dataTolist(data){
                return data.map((item)=>{
                    item.jobInstanceType = item.isEnabled?"直接或间接实现 Job 接口":"直接或间接实现 Job 接口的类被托管到 Spring";
                    item.concurrentExectionDisallowed = item.concurrentExectionDisallowed?"是":"否";
                    item.persistJobDataAfterExecution = item.persistJobDataAfterExecution?"是":"否";
                    if(item.jobState=='NONE'){
                        item.jobState='无态'
                    }else if(item.jobState=='NORMAL'){
                        item.jobState='正常'
                    }else if(item.jobState=='RUNNING'){
                        item.jobState='运行中'
                    }
                    item.system = this.$systemList[item.systemCode];
                    return item
                })
            },
            submitAddTask(data){
                if(this.opetateType === "update"){
                    this.updateTaskManage(data)
                }else{
                    this.addTaskManage(data)
                }
            },
            setResource(data){
                let params = Object.assign({permissionId:this.curRowid},{resourceIds:data})
            },
            tableContent(val){
                switch(val){
                    case "JOB_ADDED":
                        return "添加作业"
                        break;
                    case "JOB_SCHEDULED":
                        return "预定作业"
                        break;
                    case "JOB_UNSCHEDULED":
                        return "撤销预定作业"
                        break;
                    case "TRIGGER_FIRED":
                        return "触发器已点火"
                        break;
                    case "TRIGGER_MISFIRED":
                        return "触发器错过本次点火"
                        break;
                    case "JOB_TO_BE_EXECUTED":
                        return "即将执行作业"
                        break;
                    case "JOB_WAS_EXECUTED":
                        return "作业完成"
                        break;
                    case "TRIGGER_COMPLETE":
                        return "触发器完成本次点火"
                        break;
                    case "TRIGGER_FINALIZED":
                        return "触发器已失效"
                        break;
                    case "JOB_DELETED":
                        return "删除作业"
                        break;
                    case "MESSAGE_MANAGER_SHUTTING_DOWN":
                        return "消息管理器关闭中"
                        break;
                    case "ERROR":
                        return "异常"
                        break;
                    default:
                        return ""
                }
            },
            handleView(ids,row){
                this.menuManageDetail = row;
                this.centerDialogVisible = true;
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
        z-index: 999;
    }
    .perm_drop{
        margin-left:10px;
    }

</style>