<template>
    <div class="content">
        <topWrap>
        <systemSearch :itemList="itemList" isSystem="show" v-on:search="search"></systemSearch>
        <obtn v-on:add="add" v-on:changeStatus="changeStatus" v-on:patchdelete="patchdelete('资源')"></obtn>
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
            label="资源名称"
            prop="name"
            width="160"
            >
            </el-table-column>
            <el-table-column
            label="资源编码"
            prop="code">
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            
            label="资源地址"
            prop="url">
            </el-table-column>
            <el-table-column
            label="资源类型"
            prop="menuType"
            width="80">
            </el-table-column>
            <el-table-column
            label="状态"
            prop="menuStatus"
            width="80">
            </el-table-column>
            <!-- <el-table-column
            prop="menuSystem"
            label="所属系统">
            </el-table-column> -->
            <el-table-column
            label="创建时间"
            prop="ctime"
            width="160">
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
        title="添加资源"
        width="60%">
        <xadd 
            ref="addForm"
            :form="rowData"
            :permTree="resourceTree"
            :resourceType="resourceType"
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
import xadd from '../../components/resourceManage/add'
import xdetail from '../../components/common/viewDialog'

export default {
    name: 'RES_MANAGER',
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
            resourceTree:[],
            menuManageList:{
                totalPage:0,
                list:[]
            },
            resourceType:[],
            menuManageDetail:{},
            rowData:{},
            opetateType:'add',
            viewList:{
                name:'资源名称',
                code:'资源编码',
                url:'资源地址',
                pid:'父模块',
                type:'资源类型',
            },
            itemList:[
                {
                    type:"input",
                    placeholder:"请输入资源名称",
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
                }else if(key === 'type'){
                    bak[this.viewList[key]] = (this.menuManageDetail[key]===1?"资源":"模块")
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
        this.queryResourceTree()
        this.queryResourceType({type:"resourceType",pageNum:1,pageSize:100})
    },
    methods: {
        async getList(params){
            this.loading = true
            let res = await this.$service.queryResourceManageList(params)
            this.menuManageList = res || {totalPage:0,list:[]};
            this.loading = false;
        },
        async queryDetail(params){
            let res = await this.$service.queryResourceManageDetail(params)
            this.menuManageDetail = res
        },
        async queryResourceTree(params){
            let res = await this.$service.queryResourceTree(params)
            res && (this.resourceTree.push(res.detail))
        },
        async queryResourceType(params){
            let res = await this.$service.wordDetailList(params)
            // console.log("resourceType",res.details)
            res && (this.resourceType = res.details)
        },
        async addPermManage(params){
            let res = await this.$service.addResourceManage(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("添加资源成功！")
                this.$refs.addForm.$refs['form'].resetFields();

                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async updatePermManage(params){
            let res = await this.$service.updateResource(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("更新资源成功！")
                this.$refs.addForm.$refs['form'].resetFields();
                
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async togglePerm(params){
            let res = await this.$service.toggleResource(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('改变状态成功');
            }
        },
        async deletePerm(params){
            let res = await this.$service.deleteResource(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('删除成功');
            }
        },

        dataTolist(data){
            return data.map((item)=>{
                item.menuStatus = item.enable?"已启用":"已停用";
                item.menuSystem = this.$systemList[item.system];
                item.menuType = item.type===1?"资源":"模块";
                item.type = item.type?item.type+"":item.type;
                // item.cutUrl = this.$utils.cutStr(item.url,this.pageSize)
                return item
            })
        },
        add(){
            this.opetateType = "add";
            this.rowData = {operates:[]}
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
            resData['type'] = resData.type + "";
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