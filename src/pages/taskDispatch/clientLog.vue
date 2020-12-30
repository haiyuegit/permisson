<template>
    <div class="content">
        <topWrap>
        <clientLogSearch ref="searchForm" :appIds="appIds" :formInline="sData" v-on:search="search"></clientLogSearch>
        </topWrap>
        <el-table
                ref="permTable"
                v-loading="loading"
                :data="manageList.list"
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
                    width="130"
            >
            </el-table-column>
            <el-table-column
                    label="客户端主机时间"
                    prop="clientTime"
                    width="170"
            >
            </el-table-column>
            <el-table-column
                    label="日志类型"
                    prop="type"
            >
                <template slot-scope="scope">
                    {{tableContent(scope.row.type)}}
                </template>
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    label="消息内容"
                    prop="content"
            >
            </el-table-column>

            <!--<el-table-column label="操作"
                             width="250">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            v-if="operateBtns.EDIT"
                            @click="edit(scope.$index, scope.row)">修改</el-button>

                </template>
            </el-table-column>-->
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
                :visible.sync="centerDialogVisible"
                center
                title="查看"
                width="40%">
            <xdetail
                    :detailData="detailData"
            ></xdetail>
        </el-dialog>

        <el-dialog
                :visible.sync="addDialogVisible"
                center
                custom-class="limit_dialog"
                title="添加任务"
                width="60%">
            <addUser
                    ref="addForm"
                    :appIds="appIds"
                    :form="rowData"
                    :oprateType="oprateType"
                    :permissionTree="permissionTree"
                    v-on:close="closeAdd"
                    v-on:submitAddTask="submitAddTask"
            ></addUser>
        </el-dialog>

        <el-dialog
                :visible.sync="setMenuVisible"
                center
                custom-class="limit_dialog"
                title="配置权限"
                width="50%">
            <xmenu ref="setperForm" :treeData="permissionTree" v-on:close="closeSet" v-on:selData="setMenu"></xmenu>
        </el-dialog>

    </div>
</template>
<script>
    import { mapState,mapGetters } from 'vuex'
    import topWrap from '../../components/common/topWrap'
    import clientLogSearch from './clientLogSearch.vue'
    import xdetail from '../../components/common/viewDialog'
    import addUser from '../../components/task/addUser'
    import xmenu from '../../components/roleManage/menu'
    import xresource from '../../components/roleManage/resource'

    import {queryMenuManageList} from '../../service'
    export default {
        name: 'CLIENT_LOG',
        components:{
            topWrap,
            clientLogSearch,
            xdetail,
            addUser,
            xmenu,
            xresource
        },
        data () {
            return {
                pageNum: 1,
                pageSize:10,
                curRowid:"",
                centerDialogVisible:false,
                addDialogVisible:false,
                setMenuVisible:false,
                setResourceVisible:false,
                manageList:{
                    total:0,
                    list:[]
                },
                requireGetList:false,
                searchData:{},
                menuManageDetail:{},
                oprateType:'add',
                rowData:{},
                sData:{
                    appId:'',
                    clientId:'',
                    clientTimeBegin: "",
                    clientTimeEnd: "",
//                  isEnabled:'',
                    type: ''
                },
                permissionTree:[],
                resourceTree:[],
                viewList:{
                    roleName:'角色名称',
                    roleCode:'角色编码',
                    parentId:'父角色',
                    systemCode:'所属系统',
                    isEnable:'状态',
                    permissionId:'关联权限',
                },
                loading:false,
                appIds:[]
            }
        },
        computed:{
            roleList:function(){
                let pdata = this.manageList.list
                if(!pdata.length){
                    return this.manageList.list
                }else{
                    return this.dataTolist(this.manageList.list)
                }

            },
            detailData:function(){
                if(!this.menuManageDetail){
                    return {}
                }
                var bak = {};
                for(let key in this.viewList){
                    if(key === "isEnable"){
                        bak[this.viewList[key]] = this.menuManageDetail[key]?"已启用":"已停用"
                    }else if(key === 'permissionId'){
                        bak[this.viewList[key]] = this.menuManageDetail[key] && this.menuManageDetail[key].join(",")
                    }else if(key === 'systemCode'){
                        bak[this.viewList[key]] = this.$systemList[this.menuManageDetail[key]]
                    }else{
                        bak[this.viewList[key]] = this.menuManageDetail[key]
                    }
                }
                return bak
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
                console.log(params, 3);
                // console.log('getlist',this.searchData)
                this.loading = true
                let req = {...params,...this.searchData}
                let res = await this.$service.listPage(req)
                this.manageList = res || {total:0,list:[]};
                this.loading = false
            },
            async getAppIds(){
                console.log(2);
                let res = await this.$service.taskQueryAppId({})
                if(res){
                    this.appIds = res.list;
                    if(this.appIds.length > 0){
                        // this.sData.appId = this.appIds[0].appId
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
                let res = await this.$service.logAdd(params);
                if(res){
                    this.addDialogVisible = false;
                    this.$message.success("添加任务成功！")
                    this.$refs.addForm.$refs['form'].resetFields();
                    this.$refs.addForm.$refs.tree.setCheckedKeys([])

                    this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                }
            },
            async updateTaskManage(params){
                let res = await this.$service.modifyTask(params);
                if(res){
                    this.addDialogVisible = false;
                    this.$message.success("更新任务成功！")
                    this.$refs.addForm.$refs['form'].resetFields();
                    this.$refs.addForm.$refs.tree.setCheckedKeys([])

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
            async getResourceTree(params){
                let res = await this.$service.resourceTree(params);
                res && (this.resourceTree.push(res.detail))
            },
            async assignMenu(params){
                let res = await this.$service.assignPermRole(params);
                this.setMenuVisible = false;
                if(res){
                    this.$message.success('配置权限成功')
                    this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                }
            },
            async assignResource(params){
                let res = await this.$service.assignResource(params);
                this.setResourceVisible = false;
                if(res){
                    this.$message.success('配置资源成功')
                }
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
                console.log(data, 1);
                this.searchData = data;
                this.pageNum = 1;
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

            async handleUp(idx,row){
                this.setMenuVisible = true
                let res = await this.$service.queryPermissionTree({system:row.systemCode});// await this.getMenuTree({systemCode:row.system})
                let detail = [];
                detail.push(res.detail)
                this.permissionTree = JSON.parse(JSON.stringify(detail))
                // this.getMenuTree()

                this.$refs.setperForm.$refs.tree.setCheckedKeys(row.permissionIds);
                this.curRowid = row.id
            },
            handleDown(idx,row){
                this.getResourceTree()
                this.setResourceVisible = true;
                this.curRowid = row.id
            },
            dataTolist(data){
                return data.map((item)=>{
                    item.status = item.isEnable?"已启用":"已停用";
                    // item.systemCode = this.$systemList[item.systemCode];
                    item.system = this.$systemList[item.systemCode];
                    return item
                })
            },
            submitAddTask(data){
                // data.enable === "1"? (data['enable']=true) : (data['enable']=false)
                if(this.opetateType === "update"){
                    this.updateTaskManage(data)
                }else{
                    this.addTaskManage(data)
                }
            },
            setMenu(data){
                let params = Object.assign({roleId:this.curRowid},{permissionIds:data})
                this.assignMenu(params)
            },
            setResource(data){
                let params = Object.assign({permissionId:this.curRowid},{resourceIds:data})
                this.assignResource(params)
            },
            closeSet(){
                this.setMenuVisible = false
            },
            tableContent(val){
                switch(val){
                    case "MESSAGE_MANAGER_STARTED":
                        return "消息管理器已启动"
                        break;
                    case "SCHEDULER_CLIENT_STARTING":
                        return "客户端启动中"
                        break;
                    case "SCHEDULER_STARTING":
                        return "调度器启动中"
                        break;
                    case "TASK_MANAGER_STARTING":
                        return "任务管理器启动中"
                        break;
                    case "SCHEDULER_STARTED":
                        return "调度器已启动"
                        break;
                    case "SCHEDULER_TO_STANDBY":
                        return "调度器进入待机模式"
                        break;
                    case "TASK_MANAGER_SHUTDOWN":
                        return "任务管理器已关闭"
                        break;
                    case "SCHEDULER_SHUTTING_DOWN":
                        return "调度器关闭中"
                        break;
                    case "SCHEDULER_SHUTDOWN":
                        return "调度器已关闭"
                        break;
                    case "SCHEDULER_CLIENT_SHUTTING_DOWN":
                        return "客户端关闭中"
                        break;
                    case "MESSAGE_MANAGER_SHUTTING_DOWN":
                        return "消息管理器关闭中"
                        break;
                    case "ERROR":
                        return "异常"
                        break;

                }
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
        z-index: 999;
    }
    .perm_drop{
        margin-left:10px;
    }

</style>