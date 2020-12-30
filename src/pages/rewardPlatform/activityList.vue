<template>
    <div class="content"  style="padding-top:160px">
        <activityListSearch inputPlace="请输入角色名称" isSystem="show" v-on:search="search"></activityListSearch>
        <div class="activity_add_btn">
            <el-button
                v-if="operateBtns.VIEW"
                size="medium"
                @click="add()">添加活动</el-button>
        </div>
        
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
            label="平台名称"
            prop="platformType"
            >
                <template slot-scope="scope">
                    {{scope.row.platformType | rewardPlatformName}}
                </template>
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="活动编号"
            prop="activityCode"
            >
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="活动主题"
            prop="activityTheme"
            width="100"
            >
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="活动时间"
            prop="startTime"
            width="180"
            >
                <template slot-scope="scope">
                    {{scope.row.startTime+"-"+scope.row.endTime}}
                </template>
            </el-table-column>
            <el-table-column
            label="参与人群"
            prop="tergetPerson"
            >
                <template slot-scope="scope">
                    {{scope.row.tergetPerson | rewardTargePerson}}
                </template>
            </el-table-column>
            <el-table-column
            label="状态"
            prop="activityStatus"
            width="80"
            >
                <template slot-scope="scope">
                    {{scope.row.activityStatus | rewardActivityStatus}}
                </template>
            </el-table-column>
            <el-table-column
            label="手动发放"
            prop="ctime"
            width="80"
            >
                <template slot-scope="scope">
                    <a class="enable_href" href="javascript:;" @click="locationHandle(scope.row)">编辑发放</a>
                </template>
            </el-table-column>
            <el-table-column
            label="自动发放"
            prop="ctime"
            width="80"
            >
                <template slot-scope="scope">
                    <a :class="scope.row.prizeWay==='ZDFJ'?'enable_href':'disable_href'" href="javascript:;" @click="locationEdit(scope.row)">编辑活动</a>
                </template>
            </el-table-column>

            <el-table-column label="操作"
            width="230">
                <template slot-scope="scope">
                    <el-button
                    v-if="operateBtns.VIEW"
                    :disabled="scope.row.prizeWay === 'SDFJ' || scope.row.activityStatus === 'EXPIRED'"
                    :type="scope.row.activityStatus === 'IN_PROGRESS' ? 'danger':''"
                    size="mini"
                    @click="handleStart(scope.row)">{{getAstatus(scope.row)?"关闭":"开启"}}</el-button>
                    <el-button
                    v-if="operateBtns.EDIT"
                    :disabled="scope.row.prizeWay === 'SDFJ'"
                    size="mini"
                    @click="rewardHandleView(scope.row)">查看</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)"
                    >删除</el-button>
                    

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

        <!-- <el-dialog
        title="查看"
        :visible.sync="centerDialogVisible"
        width="40%"
        center>
        <xdetail 
            :detailData="detailData"
        ></xdetail>
        </el-dialog> -->

        <el-dialog
        :visible.sync="addDialogVisible"
        center
        custom-class="limit_dialog"
        title="添加活动"
        width="60%">
        <xadd 
           
            ref="addForm"
            :form="rowData"
            v-on:close="closeAdd"
            v-on:submitAddPerm="submitAddPerm"
        ></xadd>
        </el-dialog>

    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import activityListSearch from '../../components/reward/activityListSearch'
import obtn from '../../components/common/operateBtn'
import xdetail from '../../components/common/viewDialog'
import xadd from '../../components/reward/addActivity'
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
            manageList:{
                totalPage:0,
                list:[]
            },
            roleTree:[],
            oprateType:'add',
            rowData:{platformType:""},
            loading:false
        }
    },
    computed:{
        ...mapState({
            operateBtns:'operateBtns'
        }),
    },
    mounted() {
        // this.queryRoleTree({enable:true})
    },
    methods: {
        
        async getList(params){
            this.loading = true
            let res = await this.$service.queryAciveityList(params)
            this.manageList = res || {totalPage:0,list:[]};
            this.loading = false
        },
        
        async updateActivity(params){
            let res = await this.$service.activityUpdate(params);
            if(res){
                // this.addDialogVisible = false;
                // this.$message.success("更新角色成功！")
                // this.$refs.addForm.$refs['form'].resetFields();
                // this.$refs.addForm.$refs.tree.setCheckedKeys([])
                
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async addActivity(params){
            let res = await this.$service.addActivity(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("更新角色成功！")
                this.$refs.addForm.$refs['form'].resetFields();
                // this.$refs.addForm.$refs.tree.setCheckedKeys([])
                
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },

        add(){
            this.oprateType = "add"
            this.rowData = {
                partake:[],
                selDate:[],
                // platformType:""
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

            resData['isEnable'] = (resData.status === "已启用");
            resData['platformType'] = "";
            return resData
        },

        submitAddPerm(data){
            // data.enable === "1"? (data['enable']=true) : (data['enable']=false)
            if(this.opetateType === "update"){
                this.updateRoleManage(data)
            }else{
                this.addActivity(data)
            }
        },
        handleStart(row){
            let activetyStaus = row.activityStatus === "READY_ENABLE" ? "ENABLED" : "READY_ENABLE"
            let params = {
                activityId:row.id,
                activityStatus:activetyStaus
            }
            this.updateActivity(params)
        },
        locationEdit(row){
            // console.log('click',row)
            if(row.prizeWay!=='ZDFJ') return;
            let tergetPerson = this.getAllPerson(row.tergetPerson)
            this.$router.push(
                {
                    name:"EDIT_ACTIVITY",
                    params:{
                        id:row.id,
                        tergetPerson:tergetPerson,
                        actData:row,
                        jumpType:"edit"
                    }}
                )
        },
        locationHandle(row){
            this.$router.push(
                {
                    name:"MANUAL_REWARD",
                    params:{
                        activityId:row.id,
                        actData:row}}
                )
        },
        getAstatus(row){
            if(row.activityStatus === "ENABLED" || row.activityStatus === "IN_PROGRESS"){
                return true
            }
        },
        handleDelete(row){
            let params = {
                activityId:row.id,
                activityStatus:"IS_DELETE"
            }
            
            this.$confirm(`是否删除所选活动?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.updateActivity(params)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        rewardHandleView(row){
            if(row.prizeWay!=='ZDFJ') return;
            let tergetPerson = this.getAllPerson(row.tergetPerson)
            this.$router.push(
                {
                    name:"EDIT_ACTIVITY",
                    params:{
                        id:row.id,
                        tergetPerson:tergetPerson,
                        actData:row,
                        jumpType:"view"
                    }}
                )
        },
        getAllPerson(person){
            if(person === "ALL"){
                return ['NEW','OLD','ONLINE','OFFLINE']
            }
            return [].push(person)
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