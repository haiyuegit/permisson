<template>
    <div class="content">
        <topWrap>
        <systemSearch :itemList="itemList" v-on:search="search"></systemSearch>
        <obtn :disPatchDel="true" v-on:add="add" v-on:changeStatus="changeStatus" v-on:patchdelete="patchdelete('角色')"></obtn>
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
            label="分类名称"
            prop="categoryName"
            >
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="分类编码"
            prop="categoryCode"
            >
            </el-table-column>
            
            <el-table-column
            label="是否邮件发送"
            prop="isMailSend"
            >
                <template slot-scope="scope">
                    {{scope.row.isMailSend?"是":"否"}}
                </template>
            </el-table-column>
            <el-table-column
            label="是否短信发送"
            prop="isSmsSend"
            >
                <template slot-scope="scope">
                    {{scope.row.isSmsSend?"是":"否"}}
                </template>
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="处理人"
            prop="handler"
            >
            </el-table-column>
            
            <el-table-column
            label="创建时间"
            prop="createDate"
            width="160"
            >
                <template slot-scope="scope">
                    {{scope.row.createDate | formartDate("yyyy-MM-dd hh:mm:ss")}}
                </template>
            </el-table-column>

            <el-table-column
            label="状态"
            prop="isEnable"
            width="80"
            >
                <template slot-scope="scope">
                    {{scope.row.isEnable?"已启用":"已禁用"}}
                </template>
            </el-table-column>

            <el-table-column label="操作"
            width="230">
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
                        v-if="operateBtns.BIND"
                        size="mini"
                        type="danger"
                        @click="handleUp(scope.$index, scope.row)"
                    >绑定</el-button>
                    

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
        title="添加分类"
        width="60%">
        <xadd 
            ref="addForm"
            :form="rowData"
            :oprateType="oprateType"
            v-on:close="closeAdd"
            v-on:submitAddPerm="submitAddPerm"
        ></xadd>
        </el-dialog>

        <el-dialog
        :visible.sync="bindStaffVisible"
        center
        custom-class="limit_dialog"
        title="绑定处理人"
        width="50%">
        <bindStaff v-if="bindStaffVisible" ref="setperForm" :classId="curRowid" :form="bindData" v-on:close="closeSet" v-on:submitAddTask="setStaff"></bindStaff>
        </el-dialog>

    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import topWrap from '../../components/common/topWrap'
import systemSearch from '../../components/common/perSearch'
import obtn from '../../components/common/operateBtn'
import xdetail from '../../components/common/viewDialog'
import xadd from '../../components/messageCenter/classAdd'
import xmenu from '../../components/roleManage/menu'
import bindStaff from '../../components/messageCenter/bindStaff'

import {queryMenuManageList} from '../../service'
export default {
    name: 'MESSAGE_CLASS',
    components:{
        topWrap,
        systemSearch,
        obtn,
        xdetail,
        xadd,
        xmenu,
        bindStaff
    },
    data () {
        return {
            pageNum: 1,
            pageSize:10,
            curRowid:"",
            centerDialogVisible:false,
            addDialogVisible:false,
            bindStaffVisible:false,
            manageList:{
                totalPage:0,
                list:[]
            },
            categoryName:"",
            menuManageDetail:{},
            oprateType:'add',
            rowData:{},
            bindData:{},
            resourceTree:[],
            viewList:{
                categoryName:'分类名称',
                categoryCode:'分类编码',
                content:'消息内容',
                isSmsSend:'是否短信发送',
                smsContent:'短信内容',
                isMailSend:'是否邮件发送',
                mailTitle:'邮件标题',
                mailContent:'邮件内容',
                handler:"处理人"
                // isEnable:'状态',
                // permissionId:'关联权限',
            },
            loading:false,
            requireGetList:false,
            itemList:[
                {
                    type:"input",
                    placeholder:"请输入分类名称",
                    model:'categoryName'
                },
            ]
        }
    },
    computed:{
        roleList:function(){
            return this.manageList.list || []
        },
        detailData:function(){
            if(!this.menuManageDetail){
                return {}
            }
            var bak = {};
            for(let key in this.viewList){
                if(key === "isSmsSend" || key === "isMailSend"){
                    bak[this.viewList[key]] = this.menuManageDetail[key]?"是":"否"
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
        this.getList({param:{pageNum:1,pageSize:10,categoryName:""}})
    },
    methods: {
        
        async getList(params){
            this.loading = true
            let res = await this.$service.messageClassList(params)
            this.manageList = res.result || {totalPage:0,list:[]};
            this.loading = false
        },
        async queryDetail(params){
            let res = await this.$service.messageClassDetail(params)
            this.menuManageDetail = res ? res.result : {}
        },
        async addRoleManage(params){
            let req = {param:params}
            let res = await this.$service.messageClassAdd(req);
            if(res){    
                this.addDialogVisible = false;
                this.$message.success("添加分类成功！")
                this.$refs.addForm.$refs['form'].resetFields();

                this.getList({param:{pageNum:this.pageNum,pageSize:this.pageSize,categoryName:""}})
            }
        },
        async updateRoleManage(params){
            let req = {
                param:{
                    msgCategoryId:params.id,
                    msgCategoryDto:params
                }
            }
            let res = await this.$service.messageEditClass(req);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("更新分类成功！")
                this.$refs.addForm.$refs['form'].resetFields();
                
                this.getList({param:{pageNum:this.pageNum,pageSize:this.pageSize,categoryName:""}})
            }
        },
        
        async togglePerm(params){
            // console.log('change',params)
            let res;
            if(params.onoff === 1){
                res = await this.$service.messageEnable({param:params.ids.join(',')})
            }else{
                res = await this.$service.messageDisable({param:params.ids.join(',')})
            }
            // let res = await this.$service.toggleRole(params)
            
            if(res){
                this.getList({param:{categoryName:"",pageNum:this.pageNum,pageSize:this.pageSize}})
                this.$message.success('改变状态成功');
            }
        },
        
        async assignResource(params){
            let req = {param:params}
            let res = await this.$service.messageUpdateHandler(req);
            this.bindStaffVisible = false;
            if(res){
                this.$message.success('绑定成功')
                this.getList({param:{pageNum:this.pageNum,pageSize:this.pageSize,categoryName:""}})
            }
        },
        search(data){
            this.pageNum = 1;
            this.categoryName = data.categoryName;
            let params = {param:{categoryName:data.categoryName,system:data.selvalue,pageNum:1,pageSize:this.pageSize}}
            this.getList(params)
        },
        handleView(ids,row){
            this.queryDetail({param:row.id})
            this.centerDialogVisible = true;
        },
        add(){
            this.oprateType = "add"
            this.rowData = {
                followUp:false,
                isMailSend:false,
                isSmsSend:false,
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
            // resData['isEnable'] = (resData.status === "已启用")
            return resData
        },
        
        async handleUp(idx,row){
            this.bindStaffVisible = true
            let detail = [];
            this.curRowid = row.id
            this.bindData = row;
        },
        
        submitAddPerm(data){
            // data.enable === "1"? (data['enable']=true) : (data['enable']=false)
            if(this.opetateType === "update"){
                this.updateRoleManage(data)
            }else{
                this.addRoleManage(data)
            }
        },
        setStaff(data){
            let params = Object.assign({msgCategoryId:this.curRowid},{handlerList:data})
            this.assignResource(params)
        },
        closeSet(){
            this.bindStaffVisible = false
        },
        handleSizeChange(size){
            console.log('pageSize',size)
            this.pageSize = size;
            this.getList({param:{pageNum:this.pageNum,pageSize:this.pageSize,categoryName:this.categoryName}})
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            
            this.getList({param:{pageNum:this.pageNum,pageSize:this.pageSize,categoryName:this.categoryName}})
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