<template>
    <div class="content">
        <topWrap>
        <systemSearch :itemList="itemList" isSystem="show" v-on:search="search"></systemSearch>
        <obtn v-on:add="add" v-on:changeStatus="changeStatus" v-on:patchdelete="patchdelete('用户组')"></obtn>
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
            label="编号"
            prop="roleCode"
            type="index"
            width="50"
            >
            </el-table-column>
            <el-table-column
            label="组名称"
            prop="groupName"
            >
            </el-table-column>
            <el-table-column
            label="创建时间"
            prop="ctime"
            width="160"
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

            <el-table-column label="操作"
            width="250">
                <template slot-scope="scope">
                    <el-button
                    v-if="operateBtns.VIEW"
                    size="mini"
                    @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button
                    size="mini"
                    @click="edit(scope.$index, scope.row)">修改</el-button>
                    <el-button
                        v-if="operateBtns.CONFIG_ROLE"
                        size="mini"
                        type="danger"
                        @click="handleUp(scope.$index, scope.row)"
                    >关联角色</el-button>
                    

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
        title="添加用户组"
        width="60%">
        <xadd 
            
            ref="addForm"
            :form="rowData"
            :oprateType="oprateType"
            :permissionTree="permissionTree"
            :treeData="roleTree"
            v-on:close="closeAdd"
            v-on:submitAddPerm="submitAddPerm"
        ></xadd>
        </el-dialog>

        <el-dialog
        :visible.sync="setMenuVisible"
        center
        custom-class="limit_dialog"
        title="配置用户组"
        width="50%">
            <xmenu ref="menuDialog" :treeData="roleTree" v-on:closeR="roleClose" v-on:selData="setMenu"></xmenu>
        </el-dialog>

    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import topWrap from '../../components/common/topWrap'
import systemSearch from '../../components/common/perSearch'
import obtn from '../../components/common/operateBtn'
import xdetail from '../../components/common/viewDialog'
import xadd from '../../components/userManage/add'
import xmenu from '../../components/userManage/menu'
import xresource from '../../components/roleManage/resource'

import {queryMenuManageList} from '../../service'
export default {
    name: 'USERGROUP_MANAGER',
    components:{
        topWrap,
        systemSearch,
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
                groupName:'组名称',
                systemCode:'业务系统',
                isEnable:'状态',
                roleId:'角色'
            },
            itemList:[
                {
                    type:"input",
                    placeholder:"请输入组名称",
                    model:'name'
                },{
                    type:"systemSelect",
                }
            ],
            loading:false
        }
    },
    watch:{
        "setMenuVisible"(val,oldval){
          if(!val){
              this.$refs.menuDialog.clear()
          }
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
                }else if(key === 'systemCode'){
                    bak[this.viewList[key]] = this.$systemList[this.menuManageDetail[key]]
                }else if(key === 'roleId'){
                    bak[this.viewList[key]] = this.menuManageDetail[key] && this.menuManageDetail[key].join(",")
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
        // this.queryRoleTree()
    },
    methods: {
       
        async getList(params){
            this.loading = true;
            let res = await this.$service.queryUserManageList(params)
            this.manageList = res || {totalPage:0,list:[]};
            this.loading = false
        },
        async queryDetail(params){
            let res = await this.$service.queryUserManageDetail(params)
            this.menuManageDetail = res
        },
        async addRoleManage(params){
            let res = await this.$service.addUserManage(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("添加角色成功！")
                this.$refs.addForm.$refs['form'].resetFields();
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async updateRoleManage(params){
            let res = await this.$service.updateUser(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("更新角色成功！")
                this.$refs.addForm.$refs['form'].resetFields();
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async queryRoleTree(){
            let res = await this.$service.queryRoleTree({})
            res && (this.roleTree.push(res.detail))
        },
        async togglePerm(params){
            let res = await this.$service.toggleUser(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('改变状态成功');
            }
        },
        async deletePerm(params){
            let res = await this.$service.deleteUser(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('删除成功');
            }
        },
        async getResourceTree(params){
            let res = await this.$service.resourceTree(params);
            res && (this.resourceTree.push(res.detail))
        },
        async assignMenu(params){
            let res = await this.$service.userassignRole(params);
            this.setMenuVisible = false;
            if(res){
                this.$message.success('关联角色成功')
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
            // console.log('-add-',this.$refs.addForm)
            this.oprateType = "add"
            this.rowData = {}
            this.addDialogVisible = true;
            this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
        },
        edit(idx,row){
            this.opetateType = "update"
            this.rowData = this.exEditData(row)
            this.addDialogVisible = true;
            this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
        },
        exEditData(data){
            let resData = JSON.parse(JSON.stringify(data))
            resData['isEnable'] = (resData.status === "已启用")
            console.log("resData",resData)
            return resData
        },
        async handleUp(idx,row){
            this.setMenuVisible = true
            let res = await this.$service.queryRoleTree({system:row.systemCode});// await this.getMenuTree({systemCode:row.system})
            let detail = [];
            detail.push(res.detail)
            this.roleTree = JSON.parse(JSON.stringify(detail))
            // this.getMenuTree()
            
            this.$refs.menuDialog.$refs.tree.setCheckedKeys(row.roleIds);
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
                item.system = this.$systemList[item.systemCode];//item.systemCode==="zcj"?"资产家":"大金融";
                return item
            })
        },
        submitAddPerm(data){
            if(this.opetateType === "update"){
                this.updateRoleManage(data)
            }else{
                this.addRoleManage(data)
            }
        },
        setMenu(data){
            // let menuOperates = data;
            let params = Object.assign({groupId:this.curRowid},{roleIds:data})
            this.assignMenu(params)
        },
        setResource(data){
            let params = Object.assign({permissionId:this.curRowid},{resourceIds:data})
            this.assignResource(params)
        },
        roleClose(){
            console.log('close')
            this.setMenuVisible = false;
            this.$refs.menuDialog.clear()
        },
        search(data){
            this.pageNum = 1;
            let params = {pageNum:1,pageSize:this.pageSize,...data}
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
.perm_drop{
    margin-left:10px;
}
</style>