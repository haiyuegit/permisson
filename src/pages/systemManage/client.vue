<template>
    <div class="content">
        <topWrap>
        <systemSearch inputPlace="请输入客户端标识" v-on:search="search"></systemSearch>
        <obtn :disPatchDel="true" v-on:add="add" v-on:changeStatus="changeStatus" v-on:patchdelete="patchdelete('菜单')"></obtn>
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
            label="客户端标识"
            prop="clientId"
            >
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="授权类型"
            prop="grantListShow">
            </el-table-column>
            <el-table-column
            label="访问令牌有效期(秒)"
            prop="accessTokenValidity">
            </el-table-column>
            <el-table-column
            label="刷新令牌有效期(秒)"
            prop="refreshTokenValidity"
           >
            </el-table-column>
            <el-table-column
            label="状态"
            prop="menuStatus"
            width="80">
            </el-table-column>
            <!-- <el-table-column
            prop="secret"
            label="客户端密钥	"
            >
            </el-table-column> -->

            <el-table-column label="操作" width="225">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button
                    size="mini"
                    @click="edit(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="removeClient(scope.$index, scope.row)">删除</el-button>
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
        width="50%">
        <xdetail :detailData="detailData"></xdetail>
        </el-dialog>

        <el-dialog
        :visible.sync="addDialogVisible"
        center
        custom-class="limit_dialog"
        title="添加客户端"
        width="60%">
        <xadd 
            ref="addForm"
            :allMenu="allMenu"
            :form="rowData"
            :grantType="grantType"
            v-on:close="closeAdd"
            v-on:submitAddPerm="submitAddPerm"
        ></xadd>
        </el-dialog>

    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import topWrap from '../../components/common/topWrap'
import systemSearch from '../../components/common/client'
import obtn from '../../components/common/operateBtn'
import xdetail from '../../components/common/viewDialog'
import xadd from '../../components/client/add'

export default {
    name: 'CLIENT_MANAGE',
    components:{
        topWrap,
        systemSearch,
        obtn,
        xdetail,
        xadd
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
            loading:false,
            menuManageDetail:{},
            rowData:{},
            allMenu:[],
            opetateType:'add',
            viewList:{
                clientId:'客户端标识',
                enable:'状态',
                // code:'菜单编码',
                grantTypeSet:'授权类型',
                secret:'客户端密钥',
                accessTokenValidity:'访问令牌有效期(秒)',
                refreshTokenValidity:'刷新令牌有效期(秒)',
                explain:'说明',
                // resources:'资源'
            },
            grantType:[
                {
                    id:"authorization_code",
                    name:"authorization_code"
                },
                {
                    id:"client_credentials",
                    name:"client_credentials"
                },
                {
                    id:"implicit",
                    name:"implicit"
                },
                {
                    id:"refresh_token",
                    name:"refresh_token"
                },
                {
                    id:"password",
                    name:"password"
                }
            ]
        }
    },
    computed:{
        menuList:function(){ 
            let pdata = this.menuManageList.list || []
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
                }else if(key === 'grantTypeSet'){
                    bak[this.viewList[key]] = this.menuManageDetail[key]?this.getGrantShow(this.menuManageDetail[key]):""
                }else{
                    bak[this.viewList[key]] = this.menuManageDetail[key]
                }
            }
            return bak
        },
        ...mapState({
            systemList:'systemList'
        }),
    },
    
    mounted() {
        // console.log('---',this)
        // this.queryMenuTree()
        this.queryAllMenu()
    },
    methods: {
        async getList(params){
            this.loading = true;
            let res = await this.$service.queryClientList(params)
            this.menuManageList = res || {totalPage:0,list:[]};
            this.loading = false;
        },
        async queryDetail(params){
            let res = await this.$service.queryClientDetail(params)
            this.menuManageDetail = res
        },
        async queryMenuTree(params){
            let res = await this.$service.queryMenuTree(params)
            res && (this.permTree.push(res.detail))
        },
        async queryAllMenu(params){
            let res = await this.$service.allMenu(params)
            // res.operates.push({id:'123',name:'test'})
            res && (this.allMenu = res.operates)
        },
        async addPermManage(params){
            let res = await this.$service.addClient(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("添加客户端成功！")
                this.getList({name:"",pageNum:this.pageNum,pageSize:10})
            }
        },
        async updatePermManage(params){
            let res = await this.$service.updateClient(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("更新客户端成功！")
                this.getList({name:"",pageNum:this.pageNum,pageSize:10})
            }
        },
        async enableClient(params){
            let res = await this.$service.enableClient(params)
            
            if(res){
                this.getList({name:"",pageNum:1,pageSize:10})
                this.$message.success('改变状态成功');
            }
        },
        async disableClient(params){
            let res = await this.$service.disableClient(params)
            
            if(res){
                this.getList({name:"",pageNum:1,pageSize:10})
                this.$message.success('改变状态成功');
            }
        },
        async removeReq(params){
            let res = await this.$service.removeClient(params)
            
            if(res){
                this.getList({name:"",pageNum:1,pageSize:10})
                this.$message.success('删除成功');
            }
        },

        dataTolist(data){
            return data.map((item)=>{
                item.menuStatus = item.enable?"已启用":"已停用";
                item.grantListShow = this.getGrantShow(item.grantTypeSet);
                // item.cutUrl = item.url?item.url.substr(0,10)+"...":""
                // item.cutUrl = this.$utils.cutStr(item.url,10)
                return item
            })
        },
        getGrantShow(data){
            var arr = [];
            data.forEach(grant=>{
                this.grantType.forEach(item=>{
                    if(item.id === grant){
                        arr.push(item.name)
                    }
                })
            })
            return arr.join(',')
        },
        //查看
        handleView(ids,row){
            this.queryDetail({bizId:row.bizId})
            this.centerDialogVisible = true;
        },
        add(){
            this.opetateType = "add";
            this.rowData = {grantTypeSet:[]}
            this.addDialogVisible = true;
            this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
        },
        edit(idx,row){
            this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
            this.opetateType = 'update'
            this.rowData = this.exEditData(row);
            if(!this.rowData.operates){
                this.rowData.operates = []
            }
            this.addDialogVisible = true;
            
        },
        removeClient(idx,row){
            let params = {
                bizId: row.bizId
            }
            this.$confirm(`是否删除${row.clientId}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.removeReq(params)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
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
                this.enableClient(params)
            }else{
                this.disableClient(params)
            }
        },

        search(data){
            // console.log(data)
            this.pageNum = 1;
            let params = {clientId:data.menuname,enable:data.selvalue,pageNum:1,pageSize:10}
            this.getList(params)
        },
       
        
        submitAddPerm(data){
            // data.enable === "1"
            if(this.opetateType === "update"){
                this.updatePermManage(data)
            }else{
                console.log('add',data)
                // return
                this.addPermManage(data)
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
}
</style>