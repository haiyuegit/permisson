<template>
    <div class="content">
        <topWrap>
        <taskListSearch ref="searchForm" :appIds="appIds" :formInline="sData" v-on:search="search"></taskListSearch>
        <obtn :disPatchDel=true v-on:add="add" v-on:changeStatus="changeStatus"></obtn>
        </topWrap>
        <el-table
                ref="permTable"
                v-loading="loading"
                :data="roleList"
                border
                style="width: 100%">
            <el-table-column
                type="selection"
                width="35">
            </el-table-column>

            <el-table-column
                    label="客户端标识"
                    prop="appId"
            >
            </el-table-column>
            <el-table-column
                    label="描述"
                    prop="description"
            >
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
                    label="作业状态"
                    prop="jobState"
            >
                <template slot-scope="scope">
                    {{exState(scope.row.jobState)}}
                </template>
            </el-table-column>
            <el-table-column
                    label="触发器状态"
                    prop="triggerState"
            >
                <template slot-scope="scope">
                    {{exTriggerState(scope.row.triggerState)}}
                </template>
            </el-table-column>
            <el-table-column
                    label="上一次作业发起时间"
                    prop="triggerPreviousFireTime"
                    width="160"
            >
            </el-table-column>
            <el-table-column
                    label="预计下一次作业时间"
                    prop="triggerNextFireTime"
                    width="160"
            >
            </el-table-column>

            <!-- <el-table-column
                    prop="bizId"
                    label="业务标识"
                    width="100%"
                    :show-overflow-tooltip=true
            >
            </el-table-column>

            <el-table-column
                    width="120%"
                    prop="concurrentExectionDisallowed"
                    label="是否不允许并发"
            >
                <template slot-scope="scope">
                    {{scope.row.concurrentExectionDisallowed?"是":"否"}}
                </template>
            </el-table-column>

            <el-table-column
                    prop="createTime"
                    width="160%"
                    label="创建时间"
            >
            </el-table-column>
            <el-table-column
                    prop="jobGroup"
                    label="作业组名"
                    :show-overflow-tooltip=true
            >
            </el-table-column>

            <el-table-column
                    prop="jobInstanceName"
                    
                    label="作业实例名"
                    :show-overflow-tooltip=true
            >
            </el-table-column>

            <el-table-column
                    prop="jobInstanceType"
                    label="作业实例类型"
                    :show-overflow-tooltip=true
            >
            </el-table-column>

            <el-table-column
                    prop="jobName"
                    label="作业名"
                    :show-overflow-tooltip=true
            >
            </el-table-column>

            <el-table-column
                    width="100%"
                    prop="persistJobDataAfterExecution"
                    label="是否在作业完成后持久化 JobData"
            >
                <template slot-scope="scope">
                    {{scope.row.persistJobDataAfterExecution?"是":"否"}}
                </template>
            </el-table-column>

            <el-table-column
                    width="100%"
                    prop="triggerCronExpression"
                    label="触发器表达式"
                    :show-overflow-tooltip=true
            >
            </el-table-column>

            <el-table-column
                    prop="triggerGroup"
                    label="触发器组名"
            >
            </el-table-column>

            <el-table-column
                    prop="triggerMisfireInstruction"
                    label="错过触发后的指令"
                    :show-overflow-tooltip=true
            >
                <template slot-scope="scope">
                    {{scope.row.triggerMisfireInstruction === 1 ?"立即再触发一次":"什么也不做"}}
                </template>
            </el-table-column>

            <el-table-column
                    prop="triggerName"
                    label="触发器名"
                    :show-overflow-tooltip=true
            >
            </el-table-column>

            <el-table-column
                    width="170%"
                    prop="updateTime"
                    label="更新时间"
            >
            </el-table-column>

            <el-table-column
                    prop="version"
                    label="版本号"
            >
            </el-table-column> -->

            <el-table-column label="操作" width="155">
                <template slot-scope="scope">
                    <el-button
                    v-if="operateBtns.VIEW"
                    size="mini"
                    @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button
                            v-if="operateBtns.EDIT"
                            size="mini"
                            @click="edit(scope.$index, scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div v-if="manageList.totalRow" class="page_bottom">
            <el-pagination
                    :current-page="pageNum"
                    :page-size="10"
                    :page-sizes="[10, 20, 30, 40]"
                    :total="manageList.totalRow"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>

        <el-dialog
        :visible.sync="centerDialogVisible"
        center
        title="查看"
        width="50%">
        <xdetail :detailData="detailData"></xdetail>
        </el-dialog>
        <el-dialog
                :title="addFormName"
                :visible.sync="addDialogVisible"
                center
                custom-class="limit_dialog"
                width="60%">
            <addTaskList
                    ref="addForm"
                    :appIds="appIds"
                    :form="rowData"
                    :oprateType="oprateType"
                    v-on:close="closeAdd"
                    v-on:submitAddTask="submitAddTask"
            ></addTaskList>
        </el-dialog>
    </div>
</template>
<script>
    import { mapState,mapGetters } from 'vuex'
    import topWrap from '../../components/common/topWrap'
    import taskListSearch from './taskListSearch'
    import obtn from '../../components/common/operateBtn'
    import addTaskList from '../../components/task/addTaskList'
    import xdetail from '../../components/common/viewDialog'

    import {queryMenuManageList} from '../../service'
    export default {
        name: 'TASK_LIST',
        components:{
            topWrap,
            taskListSearch,
            obtn,
            addTaskList,
            xdetail
        },
        data () {
            return {
                pageNum: 1,
                pageSize:10,
                curRowid:"",
                addDialogVisible:false,
                manageList:{
                    totalPage:0,
                    list:[]
                },
                appId:"",
                sData:{
                    appId:'',
//                    clientTimeBegin: "",
//                    clientTimeEnd: "",
                    isEnabled:'',
                    jobGroup:'',
                    jobState: '',
                    jobName: '',
                    triggerName: '',
                    triggerGroup: '',
                    triggerState: ''
                },
                requireGetList:false,
                searchData:{},
                menuManageDetail:{},
                centerDialogVisible:false,
                oprateType:'add',
                rowData:{},
                loading:false,
                appIds:[],
                viewList:{
                    appId:'客户端标识',
                    description:'描述',
                    createTime:'创建时间',
                    updateTime:'修改时间',
                    updateTaskTime:'更新任务时间',
                    jobGroup:'作业组名',
                    jobName:'作业名',
                    jobInstanceType:'作业实例类型',
                    jobInstanceName:'作业实例名',
                    concurrentExectionDisallowed:'不允许并发作业',
                    persistJobDataAfterExecution:'在作业完成后持久化 JobData',
                    triggerGroup:'触发器组名',
                    triggerName:'触发器名',
                    triggerCronExpression:'触发器表达式',
                    triggerMisfireInstruction:' 触发失败后的策略',
                },
            }
        },
        computed:{
            detailData:function(){
                if(!this.menuManageDetail){
                    return {}
                }
                var bak = {};
                for(let key in this.viewList){
                    if(key === "concurrentExectionDisallowed"){
                        bak[this.viewList[key]] = this.menuManageDetail[key]?"是":"否"
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
                return this.manageList.list || [];
                // if(!pdata.length){
                //     return this.manageList.list
                // }else{
                //     return this.dataTolist(this.manageList.list)
                // }

            },
            ...mapState({
                operateBtns:'operateBtns'
            }),
            addFormName:function(){
                return this.oprateType === "add" ? "添加任务" : "修改任务"
            }
        },
        mounted() {
            this.getAppIds();
        },
        methods: {
            async getList(params){
                this.loading = true;
                let req = {...params,...this.searchData}
                let res = await this.$service.clientLogSearch(req)
                this.manageList = res || {totalPage:0,list:[]};
                this.loading = false
            },
            async getAppIds(){
                let res = await this.$service.taskQueryAppId({})
                if(res){
                    this.appIds = res.list;
                    if(this.appIds.length > 0){
                        this.$refs.searchForm.$refs['formInline'].model.appId = this.appIds[0].appId;
                        this.getList({appId:this.appIds[0].appId,pageNum:1,pageSize:10})
                    }
                }
            },
            async queryDetail(params){
                // let res = await this.$service.queryRoleManageDetail(params)
                // this.menuManageDetail = res
            },
            async addTaskManage(params){
                let res = await this.$service.addTask(params);
                if(res){
                    this.addDialogVisible = false;
                    this.$message.success("添加任务成功！");
                    this.$refs.addForm.$refs['form'].resetFields();

                    this.getList({appId:this.appIds[0].appId,pageNum:this.pageNum,pageSize:this.pageSize})
                }
            },
            async updateTaskManage(params){
                let res = await this.$service.modifyTask(params);
                if(res){
                    this.addDialogVisible = false;
                    this.$message.success("更新任务成功！");
                    this.$refs.addForm.$refs['form'].resetFields();
                    this.getList({appId:this.appIds[0].appId,pageNum:this.pageNum,pageSize:this.pageSize})
                }
            },
            // 启用按钮
            async enable(params,status){
                let res;
                if(status){
                    res = await this.$service.taskEnable(params)
                }else{
                    res = await this.$service.taskDisable(params)
                }

                if(res){
                    this.getList({appId:this.appIds[0].appId,pageNum:this.pageNum,pageSize:this.pageSize})
                    this.$message.success('改变状态成功');
                }
            },
            
            add(){
                this.oprateType = "add"
                this.rowData = {
                    isEnable:"",
                    concurrentExectionDisallowed: 1,
                    isEnabled: 1,
                    jobInstanceType: 'TARGET',
                    persistJobDataAfterExecution: 1,
                    triggerMisfireInstruction: 2
                }
                this.addDialogVisible = true;
                this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
            },
            search(data){
                this.searchData = data;
                this.pageNum = 1;
                let params = {pageNum:1,pageSize:this.pageSize}
                this.getList(params)
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
                return resData
            },
            dataTolist(data){
                return data.map((item)=>{
                    item.system = this.$systemList[item.systemCode];
                    return item
                })
            },
            exState(item){
                if(item ==='NONE'){
                    return '无态'
                }else if(item ==='NORMAL'){
                    return '正常'
                }else if(item ==='RUNNING'){
                    return '运行中'
                }
            },
            exTriggerState(item){
                if(item === "NONE"){
                    return "无态"
                }else if(item === 'NORMAL'){
                    return '正常'
                }else if(item === 'PAUSED'){
                    return '暂停'
                }else if(item === 'COMPLETE'){
                    return '完成'
                }else if(item === 'ERROR'){
                    return '错误'
                }else if(item === 'BLOCKED'){
                    return '阻塞'
                }
            },
            changeStatus(status){
                let rows = this.$refs.permTable.selection
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
                // data.enable === "1"? (data['enable']=true) : (data['enable']=false)
                if(this.oprateType === "update"){
                    this.updateTaskManage(data)
                }else{
                    this.addTaskManage(data)
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