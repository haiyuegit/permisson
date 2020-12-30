<template>
    <div class="content">
        <activityListSearch inputPlace="请输入角色名称" isSystem="show" v-on:search="search"></activityListSearch>

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
            label="角色名称"
            prop="roleName"
            >
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="角色编码"
            prop="roleCode"
            >
            </el-table-column>
            <el-table-column
            label="状态"
            prop="status"
            width="80"
            >
            </el-table-column>
            <el-table-column
            label="所属系统"
            prop="system"
            >
            </el-table-column>
            <el-table-column
            label="创建时间"
            prop="ctime"
            width="160"
            >
            </el-table-column>

            <el-table-column label="操作"
            width="250">
                <template slot-scope="scope">
                    <el-button
                    v-if="operateBtns.VIEW"
                    size="mini"
                    @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button
                    v-if="operateBtns.EDIT"
                    size="mini"
                    @click="edit(scope.$index, scope.row)">修改</el-button>
                    <el-button
                        v-if="operateBtns.CONFIG_PERMISSION"
                        size="mini"
                        type="danger"
                        @click="handleUp(scope.$index, scope.row)"
                    >配置权限</el-button>
                    

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
        width="40%">
        <xdetail 
            :detailData="detailData"
        ></xdetail>
        </el-dialog>

        <el-dialog
        :visible.sync="addDialogVisible"
        center
        custom-class="limit_dialog"
        title="添加角色"
        width="60%">
        <xadd 
            ref="addForm"
            :form="rowData"
            :oprateType="oprateType"
            :permissionTree="permissionTree"
            :roleTree="roleTree"
            v-on:close="closeAdd"
            v-on:submitAddPerm="submitAddPerm"
        ></xadd>
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
import activityListSearch from '../../components/reward/activityListSearch'
import obtn from '../../components/common/operateBtn'
import xdetail from '../../components/common/viewDialog'
import xadd from '../../components/roleManage/add'
import xmenu from '../../components/roleManage/menu'
import xresource from '../../components/roleManage/resource'

import {queryMenuManageList} from '../../service'
export default {
    name: 'ROLE_MANAGER',
    components:{
        activityListSearch,
        obtn,
        xdetail,
        xadd,
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
                totalPage:0,
                list:[]
            },
            menuManageDetail:{},
            roleTree:[],
            oprateType:'add',
            rowData:{},
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
            loading:false
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
        this.queryRoleTree({enable:true})
    },
    methods: {
        
        async getList(params){
            this.loading = true
            let res = await this.$service.queryAciveityList(params)
            this.manageList = res || {totalPage:0,list:[]};
            this.loading = false
        },
        async queryDetail(params){
            let res = await this.$service.queryRoleManageDetail(params)
            this.menuManageDetail = res
        },
        async addRoleManage(params){
            let res = await this.$service.addRoleManage(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("添加角色成功！")
                this.$refs.addForm.$refs['form'].resetFields();
                this.$refs.addForm.$refs.tree.setCheckedKeys([])

                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async updateRoleManage(params){
            let res = await this.$service.updateRole(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("更新角色成功！")
                this.$refs.addForm.$refs['form'].resetFields();
                this.$refs.addForm.$refs.tree.setCheckedKeys([])
                
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async queryRoleTree(){
            let res = await this.$service.queryRoleTree({})
            res && (this.roleTree.push(res.detail))
        },
        async togglePerm(params){
            let res = await this.$service.toggleRole(params)
            
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
                roleName:"",
                roleCode:"",
                isEnable:""
            }
            this.addDialogVisible = true;
            this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
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
        submitAddPerm(data){
            data.enable === "1"? (data['enable']=true) : (data['enable']=false)
            if(this.opetateType === "update"){
                this.updateRoleManage(data)
            }else{
                this.addRoleManage(data)
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