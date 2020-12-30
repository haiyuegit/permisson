<template>
    <div class="content">
        <topWrap>
        <systemSearch :itemList="itemList" v-on:search="search"></systemSearch>
        <obtn v-on:add="add" v-on:changeStatus="changeStatus" v-on:patchdelete="patchdelete('操作')"></obtn>
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
            label="名称"
            prop="name"
            >
            </el-table-column>
            <el-table-column
            label="操作编码"
            prop="code">
            </el-table-column>
            <el-table-column
            label="创建时间"
            prop="ctime"
            >
            </el-table-column>
            <el-table-column
            label="状态"
            prop="menuStatus"
            width="120">
            </el-table-column>
            <!-- <el-table-column
            prop="menuSystem"
            label="所属系统"
            width="80">
            </el-table-column> -->
            
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

        <div v-if="menuManageList.totalRow" class="page_bottom">
            <el-pagination
                :current-page="pageNum"
                :page-size="10"
                :page-sizes="[10, 20, 30, 40]"
                :total="menuManageList.totalRow"
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
        title="添加菜单"
        width="60%">
        <xadd 
            ref="addForm"
            :allMenu="allMenu"
            :form="rowData"
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
import obtn from '../../components/common/operateBtn'
import xadd from '../../components/operateManage/add'
import xdetail from '../../components/common/viewDialog'

export default {
    name: 'OPERATE_MANAGER',
    components:{
        topWrap,
        systemSearch,
        obtn,
        xadd,
        xdetail
    },
    data () {
        return {
            pageNum: 1,
            pageSize:10,
            centerDialogVisible:false,
            addDialogVisible:false,
            permTree:[],
            menuManageList:{
                totalPage:0,
                list:[]
            },
            menuManageDetail:{},
            rowData:{},
            allMenu:[],
            opetateType:'add',
            viewList:{
                name:'名称',
                code:'编码',
                ctime:'创建时间',
                enable:'状态',
            },
            itemList:[
                {
                    type:"input",
                    placeholder:"请输入操作名称",
                    model:'name'
                }
            ],
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
                    bak[this.viewList[key]] = this.menuManageDetail[key]?"已启用":"已停用"
                }else if(key === 'system'){
                    bak[this.viewList[key]] = this.$systemList[this.menuManageDetail[key]]
                }else{
                    bak[this.viewList[key]] = this.menuManageDetail[key]
                }
            }
            return bak
        },
        ...mapState({
            systemList:'systemList',
            operateBtns:'operateBtns'
        }),
    },
    
    mounted() {
        // this.getList({name:"",pageNum:1,pageSize:10})
        // this.queryMenuTree()
        this.queryAllMenu()
    },
    methods: {
        async getList(params){
            this.loading = true;
            let res = await this.$service.queryOperateManageList(params)
            this.menuManageList = res || {totalPage:0,list:[]};
            this.loading = false
        },
        async queryDetail(params){
            let res = await this.$service.queryOperateManageDetail(params)
            this.menuManageDetail = res
        },
        async queryMenuTree(params){
            let res = await this.$service.queryMenuTree(params)
            res && (this.permTree.push(res.detail))
        },
        async queryAllMenu(params){
            let res = await this.$service.allMenu(params)
            res.operates.push({id:'123',name:'test'})
            res && (this.allMenu = res.operates)
        },
        async addPermManage(params){
            let res = await this.$service.addOperateManage(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("添加操作成功！")
                this.$refs.addForm.$refs['form'].resetFields();
                
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async updatePermManage(params){
            let res = await this.$service.updateOperate(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("更新操作成功！")
                this.$refs.addForm.$refs['form'].resetFields();
                
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async togglePerm(params){
            let res = await this.$service.toggleOperate(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('改变状态成功');
            }
        },
        async deletePerm(params){
            let res = await this.$service.deleteOperate(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('删除成功');
            }
        },

        dataTolist(data){
            return data.map((item)=>{
                item.menuStatus = item.enable?"已启用":"已停用";
                item.menuSystem = item.system==="ZCJ"?"资产家":"大金融";
                return item
            })
        },
        add(){
            this.opetateType = "add";
            this.rowData = {
                operates:[]
            }
            this.addDialogVisible = true
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
        
        submitAddPerm(data){
            data.enable === "1"? (data['enable']=true) : (data['enable']=false)
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