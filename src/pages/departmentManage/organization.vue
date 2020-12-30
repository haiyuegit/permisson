<template>
    <div class="content" style="padding-top:115px">
        <topWrap>
        <obtn :disPatchDel="true" style="top:50px;" v-on:add="add" v-on:changeStatus="changeStatus" v-on:patchdelete="patchdelete('菜单')"></obtn>
        </topWrap>
        <el-table
        ref="permTable"
        v-loading="loading"
        :data="orgList"
        
        border
        style="width: 100%">
             <el-table-column
            type="selection"
            width="35">
            </el-table-column>
           
            <el-table-column
            :show-overflow-tooltip=true
            label="名称"
            
            prop="name"
            >
                <template slot-scope="scope">
                    <div :style="{marginLeft:scope.row.level*10+'px',paddingLeft:(scope.row.children?0:20+'px')}">
                    <i v-if="scope.row.children" :class="{'el-icon-arrow-right':!scope.row.expand,'el-icon-arrow-down':scope.row.expand}" @click="changeRow(scope.row)"></i>
                    <span>{{scope.row.name}}</span>
                    </div>
                </template>
            </el-table-column>
           
            <el-table-column
            label="创建时间"
            prop="createTime"
            width="180">
            </el-table-column>
            <el-table-column
            label="状态"
            prop="menuStatus"
            width="120">
            <template slot-scope="scope">
                <span>{{scope.row.enable?"已启用":'已禁用'}}</span>
            </template>
            
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

        <el-dialog
        :visible.sync="centerDialogVisible"
        center
        title="查看"
        width="60%">
        <xdetail 
            :detailData="detailData"
        ></xdetail>
        </el-dialog>

        <el-dialog
        :visible.sync="addDialogVisible"
        center
        custom-class="limit_dialog"
        title="添加部门"
        width="40%">
        <xadd 
            ref="addForm"
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
import xadd from '../../components/organization/add'
import xdetail from '../../components/common/viewDialog'
import obtn from '../../components/common/operateBtn'

export default {
    name: 'ORG_MANAGER',
    components:{
        topWrap,
        systemSearch,
        xadd,
        xdetail,
        obtn
    },
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
                name:'名称',
                // bizId:'编码',
                createTime:'创建时间',
                enable:'状态',
                // system:'系统',
            },
            orgList:[],
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
        // this.queryDepartTree()
    },
    methods: {
        async getList2(params){
            this.loading = true;
            let res = await this.$service.queryOrgManageList(params)
            this.menuManageList = res || {total:0,list:[]};
            this.loading = false
        },
        async queryDetail(params){
            let res = await this.$service.queryOrgManageDetail(params)
            this.menuManageDetail = res
        },
        async getList(params){
            let res = await this.$service.queryOrgTree(params)
            let arr = [];
            res && (arr.push(res.detail))
            this.permTree = arr
            this.orgList = JSON.parse(JSON.stringify(res.detail.children))
        },

        changeRow(data){
            if(!data.expand){
                let idx = +this.orgList.findIndex(x=> x.id === data.id)
                let child = JSON.parse(JSON.stringify(this.setChoseId(data.children,data)))
                this.orgList.splice(idx+1,0,...child)
            }else{
                let findTag = (data.choseId ? "_"+data.id+"_" : data.id+"_");
                this.orgList = this.orgList.filter(item=>{
                    if(!item.choseId){
                        return true
                    }
                    let fidx = item.choseId.indexOf(findTag)
                    return fidx<0
                })
            }
            data.expand = !data.expand;
        },

        setChoseId(arr,parent){
            return arr.map(item=>{
                if(!item.choseId){
                    item.choseId = parent.choseId ? parent.choseId+"_"+item.id : parent.id+'_'+item.id
                }
                return item
            })
        },
        
        async addPermManage(params){
            let res = await this.$service.addOrgManage(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("添加部门成功！")
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async updatePermManage(params){
            let res = await this.$service.updateOrg(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("更新部门成功！")
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async enableOrg(params){
            let res = await this.$service.enableOrg(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('改变状态成功');
            }
        },
        async disableOrg(params){
            let res = await this.$service.disableOrg(params)
            
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
            this.queryDetail({bizId:row.id})
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
                return item.id
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
.el-icon-arrow-right,.el-icon-arrow-down{
    cursor: pointer;
    margin-right:5px;
}
</style>