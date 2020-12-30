<template>
    <div class="content">
        <topWrap>
            <systemSearch v-if="operateBtns.SEARCH" :itemList="itemList" v-on:search="search"></systemSearch>
        <!-- <systemSearch inputPlace="请输入员工姓名" v-on:search="accountSearch" :isSystem="isSystem" v-if="operateBtns.SEARCH"></systemSearch> -->
            <obtn :disAdd="true" :disPatchDel="true" :showReset="true" v-on:add="add" v-on:changeStatus="changeStatus" v-on:patchdelete="patchdelete('菜单')" v-on:resetPwd="resetPwd"></obtn>
        </topWrap>
        <el-table
        ref="permTable"
        v-loading="loading"
        :data="menuList"
        border
        
        style="width: 100%">
             <el-table-column
            type="selection"
            width="35">
            </el-table-column>
           
            <el-table-column
            label="用户名"
            prop="username"
            >
            </el-table-column>
            <el-table-column
            label="工号"
            prop="staffNo">
            </el-table-column>
            <el-table-column
            label="手机号"
            prop="staffPhone"
            width="110">
            </el-table-column>
            <el-table-column
            label="员工姓名"
            prop="staffName">
            </el-table-column>
            <el-table-column
            label="状态"
            prop="menuStatus"
            width="80">
            </el-table-column>
             <el-table-column
            label="所属系统"
            prop="registerAppName">
            </el-table-column>
            
            <el-table-column label="操作" width="155">
                <template slot-scope="scope">
                    <el-button
                    v-if="operateBtns.VIEW"
                    size="mini"
                    @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button
                    v-if="operateBtns.CONFIG_GRANT"
                    size="mini"
                    type="danger"
                    @click="grant(scope.$index, scope.row)">授权</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div v-if="menuManageList.total" class="page_bottom">
            <el-pagination
                :current-page="pageNum"
                :page-size="10"
                :page-sizes="[10, 20, 30, 40]"
                :total="menuManageList.total"
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
        <xdetail 
            :detailData="detailData"
        ></xdetail>
        </el-dialog>

        <el-dialog
        :visible.sync="addDialogVisible"
        center
        custom-class="limit_dialog"
        title="添加菜单"
        width="60%">
        <xadd 
            :allMenu="allMenu"
            :form="rowData"
            v-on:close="closeAdd"
            v-on:submitAddPerm="submitAddPerm"
        ></xadd>
        </el-dialog>

        <el-dialog
        :visible.sync="grantVisible"
        center
        custom-class="limit_dialog"
        show-close
        title="授权"
        width="60%">
        <xgrant 
            ref="grantForm"
            :form="gform"
            :groupList="groupList"
            :permTree="roleTree"
            :system="selSystem"
            v-on:close="closeGrant"
            v-on:selData="submitGrant"
        ></xgrant>
        </el-dialog>

    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import topWrap from '../../components/common/topWrap'
import systemSearch from '../../components/common/perSearch'
import xadd from '../../components/account/add'
import obtn from '../../components/common/operateBtn'
import xgrant from '../../components/account/grantpop'
import xdetail from '../../components/common/viewDialog'
import mixMethods from '../../components/common/mixMethods'

export default {
    name: 'ACCOUNT_MANAGER',
    components:{
        topWrap,
        systemSearch,
        xadd,
        xdetail,
        xgrant,
        obtn
    },
    data () {
        return {
            pageNum: 1,
            pageSize:10,
            centerDialogVisible:false,
            addDialogVisible:false,
            grantVisible:false,
            roleTree:[],
            groupList:{},
            menuManageList:{
                total:0,
                list:[]
            },
            menuManageDetail:{},
            rowData:{},
            gform:{},
            allMenu:[],
            opetateType:'add',
            curUserId:'',
            curOrgName:'',
            selSystem:'',
            viewList:{
                username:'用户名',
                staffId:'员工ID',
                staffName:"员工姓名",
                staffNo:"员工工号",
                // ctime:'创建时间',
                enable:'状态',
                staffPhone:'员工手机号',
                registerAppName:'所属系统'
            },
            itemList:[
                {
                    type:"input",
                    placeholder:"请输入组名称",
                    model:'staffName'
                },{
                    // label:"处理状态",
                    type:"select",
                    placeholder:"请选择状态",
                    model:'enable',
                    options:[
                        {
                            name:"禁用",
                            code:'0'
                        },{
                            name:"启用",
                            code:'1'
                        }
                    ]
                },{
                    type:"systemSelect",
                }
            ],
            isSystem:true,
            loading:false
        }
    },
    computed:{
        menuList:function(){
            let pdata = this.menuManageList.list
            if(!pdata.length){
                return this.menuManageList.list
            }else{
                return this.dataTolist(this.menuManageList.list)
            }
            
        },
        detailData:function(){
            if(!this.menuManageDetail){
                return {}
            }
            var bak = {};
            for(let key in this.viewList){
                if(key === "enable"){
                    bak[this.viewList[key]] = this.menuManageDetail[key]?"已启用":"已禁用"
                }else if(key === 'system'){
                    bak[this.viewList[key]] = (this.menuManageDetail[key]==='zcj'?"资产家":"大金融")
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
        this.queryRoleTree();
        this.queryGroupList({pageNum:1,pageSize:50})
    },
    methods: {
        async getList(params){
            this.loading = true
            let res = await this.$service.queryAccountList(params)
            this.menuManageList = res || {total:0,list:[]};
            this.loading = false
        },
        async accountGrount(params){
             let res = await this.$service.accountGrant(params)
             if(res){
                this.closeGrant()
                this.$message.success("账号授权成功！")
            
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async queryDetail(params){
            let res = await this.$service.queryAccountDetail(params)
            this.menuManageDetail = res
        },
        
        async queryGroupList(params){
            let res = await this.$service.queryUserManageList(params)
            this.groupList = res.list || []
        },
        async queryRoleTree(){
            let res = await this.$service.queryRoleTree({})
            res && (this.roleTree.push(res.detail))
        },
        
        async addPermManage(params){
            let res = await this.$service.addAccountManage(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("添加菜单成功！")
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async updatePermManage(params){
            let res = await this.$service.updateAccount(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("更新菜单成功！")
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async enableOrg(params){
            let res = await this.$service.enableAccount(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('改变状态成功');
            }
        },
        async disableOrg(params){
            let res = await this.$service.disableAccount(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('改变状态成功');
            }
        },

        dataTolist(data){
            return data.map((item)=>{
                item.menuStatus = item.enable?"已启用":"已停用";
                item.menuSystem = item.system==="ZCJ"?"资产家":"大金融";
                return item
            })
        },
        handleView(ids,row){
            this.menuManageDetail = row
            // this.queryDetail({bizId:row.bizId})
            this.centerDialogVisible = true;
        },
        add(){
            this.opetateType = "add";
            this.rowData = {operates:[]}
            this.addDialogVisible = true
        },
        edit(idx,row){
            this.opetateType = 'update'
            this.rowData = this.exEditData(row)
            this.addDialogVisible = true;
        },
        exEditData(data){
            let resData = JSON.parse(JSON.stringify(data))
            resData['enable'] = resData.enable ? "1":"0"
            console.log('res',resData)
            return resData
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
                bizIds:ids
            }
            if(status === 1){
                this.enableOrg(params)
            }else{
                this.disableOrg(params)
            }
        },
        async resetPwd(){
            let rows = this.$refs.permTable.selection
            if(!rows.length){
                this.$message.warning('请选择需要操作的列表')
                return
            }
            let ids = rows.map((item)=>{
                return item.bizId
            })
            let params = {
                bizIds:ids
            }
            let res = await this.$service.resetPwd(params)
            if(res){
                this.$message.success('重置密码成功，已发送短信至账号绑定手机号')
            }
        },
        async grant(idx,row){
            this.grantVisible = true;
            this.curUserId = row.bizId;
             this.selSystem = JSON.parse(JSON.stringify(row.registerApp))
            let res = await this.$service.accountQueryAuto({userId:row.bizId});
            if(res){
                this.grantVisible = true;
                // this.gform["roleIds"] = ["permission-configurator-webid2018111609485912903ot"]//res.roleUsers
                // this.gform["userGroupIds"] = ["permission-configurator-webid20181121095837951027j"] //res.groupUsers
                this.$refs.grantForm.$refs.tree.setCheckedKeys(res.roleIds);
                this.$refs.grantForm.form.userGroupIds =  res.groupIds || [] 
            }
            // let detail = [];
            // detail.push(res.detail)
            // this.roleTree = JSON.parse(JSON.stringify(detail))
           
            // this.grantVisible = true;
            this.curUserId = row.bizId;
            this.curOrgName = row.username;
            console.log('this.curUserId',this.curUserId)
        },
        submitAddPerm(data){
            data.enable === "1"? (data['enable']=true) : (data['enable']=false)
            if(this.opetateType === "update"){
                this.updatePermManage(data)
            }else{
                this.addPermManage(data)
            }
            
        },
        submitGrant(data){
            let params = Object.assign(data,{userId:this.curUserId,userName:this.curOrgName,systemCode:this.selSystem})
            console.log('params',params)
            this.accountGrount(data)
        },
        closeGrant(){
            this.grantVisible = false
            this.$refs.grantForm.$refs['form'].resetFields();
            this.$refs.grantForm.form.userGroupIds = [];
            this.$refs.grantForm.$refs.tree.setCheckedKeys([])
        },
        
        search(data){
            this.pageNum = 1;
            if(data.system){
                data['registerApp'] = data.system
            }
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
</style>