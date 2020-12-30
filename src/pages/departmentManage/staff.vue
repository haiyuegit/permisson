<template>
    <div class="content">
        <topWrap>
            <systemSearch v-if="operateBtns.SEARCH" :itemList="itemList" v-on:search="search"></systemSearch>
        <!-- <systemSearch inputPlace="请输入员工姓名" v-on:search="search" isOrg="show" isSelStatus2="hide" v-if="operateBtns.SEARCH"></systemSearch> -->
        <div class="oprate_btn">
            <el-button v-if="operateBtns.ADD" class="fix_btn" type="primary" @click="add()">新增</el-button>
            <!-- <el-button type="primary" class="fix_btn" @click="edit()">修改</el-button> -->
            <el-button v-if="operateBtns.ON_JOB" class="fix_btn" type="primary" @click="changeStatus(1)">在职</el-button>
            <el-button v-if="operateBtns.LEAVE_JOB" class="fix_btn" type="primary" @click="changeStatus(0)">离职</el-button>
            <!-- <el-button type="primary" size="medium" class="fix_btn" @click="patchdelete()">批量删除</el-button> -->
        </div>
        </topWrap>
        <el-table
        ref="permTable"
        v-loading = "loading"
        :data="menuList"
        border
        
        style="width: 100%">
             <el-table-column
            type="selection"
            width="35">
            </el-table-column>
           
            <el-table-column
            label="姓名"
            prop="name"
            >
            </el-table-column>
            <el-table-column
            label="工号"
            prop="no">
            </el-table-column>
            <el-table-column
            label="邮箱"
            prop="email">
            </el-table-column>
            <el-table-column
            label="创建时间"
            prop="createTime"
            width="160">
            </el-table-column>
            <el-table-column
            label="状态"
            prop="menuStatus">
            </el-table-column>
            <el-table-column
            label="所属部门"
            prop="orgName">
            </el-table-column>
            
            <el-table-column label="操作" width="160">
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
        width="40%">
        <xdetail 
            :detailData="detailData"
        ></xdetail>
        </el-dialog>

        <el-dialog
        :visible.sync="addDialogVisible"
        center
        custom-class="limit_dialog"
        title="添加员工"
        width="60%">
        <xadd 
            ref="addForm"
            :form="rowData"
            :opetateType="opetateType"
            :permTree="permTree"
            v-on:close="closeAdd"
            v-on:submitAddPerm="submitAddPerm"
        ></xadd>
        </el-dialog>

    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import topWrap from '../../components/common/topWrap'
import systemSearch from '../../components/common/perSearch'
import xadd from '../../components/staff/add'
import xdetail from '../../components/common/viewDialog'
import mixMethods from '../../components/common/mixMethods'

export default {
    name: 'STAFF_MANAGER',
    components:{
        topWrap,
        systemSearch,
        xadd,
        xdetail
    },
    // mixins:[mixMethods],
    data () {
        return {
            pageNum: 1,
            pageSize:10,
            centerDialogVisible:false,
            addDialogVisible:false,
            permTree:[],
            menuManageList:{
                total:0,
                list:[]
            },
            menuManageDetail:{},
            rowData:{},
            allMenu:[],
            opetateType:'add',
            viewList:{
                name:'姓名',
                no:'工号',
                email:'邮箱',
                enable:'状态',
                phone:'手机号',
                sex:"性别",
                createTime:"创建时间"
            },
            itemList:[
                {
                    type:"input",
                    placeholder:"请输员工姓名",
                    model:'name'
                },{
                    type:"input",
                    placeholder:"请输入部门名称",
                    model:'orgName'
                }
            ],
            sexVal:{
                0:"女",
                1:"男",
                2:"未知"
            },
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
                    bak[this.viewList[key]] = this.menuManageDetail[key]?"在职":"离职"
                }else if(key === 'system'){
                    bak[this.viewList[key]] = (this.menuManageDetail[key]==='zcj'?"资产家":"大金融")
                }else if(key === 'sex'){
                    bak[this.viewList[key]] = this.sexVal[this.menuManageDetail[key]]
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
        this.queryDepartTree()
    },
    methods: {
        async getList(params){
            this.loading = true;
            let res = await this.$service.queryStaffList(params)
            this.menuManageList = res || {total:0,list:[]};
            this.loading = false;
        },
        async queryDetail(params){
            let res = await this.$service.queryStaffDetail(params)
            this.menuManageDetail = res
        },
        async queryDepartTree(params){
            let res = await this.$service.queryOrgTree(params)
            res && (this.permTree.push(res.detail))
        },
        
        async addPermManage(params){
            let res = await this.$service.addStaffManage(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("添加员工信息成功！")
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async updatePermManage(params){
            let res = await this.$service.updateStaff(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("更新员工信息成功！")
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async enableOrg(params){
            let res = await this.$service.enableStaff(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('改变状态成功');
            }
        },
        async disableOrg(params){
            let res = await this.$service.disableStaff(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('改变状态成功');
            }
        },

        dataTolist(data){
            return data.map((item)=>{
                item.menuStatus = item.enable?"在职":"离职";
                item.menuSystem = item.system==="ZCJ"?"资产家":"大金融";
                return item
            })
        },
        handleView(ids,row){
            this.queryDetail({bizId:row.bizId})
            this.centerDialogVisible = true;
        },
        add(){
            this.opetateType = "add";
            this.rowData = {}
            this.addDialogVisible = true;
            this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
        },
        edit(idx,row){
            this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
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
        submitAddPerm(data){
            // data.enable === "1"? (data['enable']=true) : (data['enable']=false)
            if(this.opetateType === "update"){
                this.updatePermManage(data)
            }else{
                this.addPermManage(data)
            }
            
        },
        search(data){
            this.pageNum = 1;
            let params = {pageNum:1,pageSize:this.pageSize,...data}
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
    z-index: 999;
    margin-bottom:10px;
}
</style>