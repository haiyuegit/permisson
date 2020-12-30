<template>
    <div class="content">
        <topWrap>
        <systemSearch :itemList="itemList" v-on:search="search"></systemSearch>
        <obtn :showRefresh="true" v-on:add="add" v-on:changeStatus="changeStatus" v-on:patchdelete="patchdelete('权限')"></obtn>
        </topWrap>
        <el-table
        ref="permTable"
        v-loading="loading"
        :data="permList"
        border
        
        style="width: 100%">
             <el-table-column
            type="selection"
            width="35">
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="编号"
            prop="code"
            >
            </el-table-column>
            <el-table-column
            label="权限名称"
            prop="name"
            width="140"
            >
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="权限编码"
            prop="code"
            >
            </el-table-column>
            <el-table-column
            label="状态"
            prop="perStatus"
            width="80"
            >
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="所属系统"
            prop="perSystem"
            width="110"
            >
            </el-table-column>
            <el-table-column
            label="创建时间"
            prop="ctime"
            width="160"
            >
            </el-table-column>

            <el-table-column :width="operateWidth"
            label="操作">
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
                    v-if="operateBtns.CONFIG_MENU"
                    size="mini"
                    type="danger"
                    @click="handleUp(scope.$index, scope.row)">菜单</el-button>
                    <el-button
                    v-if="operateBtns.CONFIG_RESOURCE"
                    size="mini"
                    type="danger"
                    @click="handleDown(scope.$index, scope.row)">资源</el-button>

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
        title="添加权限"
        width="60%">
        <xadd 
            ref="addForm"
            :form="rowData"
            :oprateType="oprateType"
            :permTree="permTree"
            v-on:close="closeAdd"
            v-on:submitAddPerm="submitAddPerm"
        ></xadd>
        </el-dialog>

        <el-dialog
        :visible.sync="setMenuVisible"
        center
        custom-class="limit_dialog"
        title="配置菜单"
        width="50%">
        <xmenu v-if="setMenuVisible" ref="setMenuForm" :treeData="menuTree" v-on:close="menuClose" v-on:selData="setMenu"></xmenu>
        </el-dialog>

        <el-dialog
        :visible.sync="setResourceVisible"
        center
        custom-class="limit_dialog"
        title="配置资源"
        width="50%">
        <xresource ref="setResourceForm" :treeData="resourceTree" v-on:close="resourceClose" v-on:selData="setResource"></xresource>
        </el-dialog>
    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import topWrap from '../../components/common/topWrap'
import systemSearch from '../../components/common/perSearch'
import obtn from '../../components/common/operateBtn'
import xdetail from '../../components/common/viewDialog'
import xadd from '../../components/permManage/add'
import xmenu from '../../components/permManage/menu'
import xresource from '../../components/permManage/resource'

import {queryMenuManageList} from '../../service'
export default {
    name: 'PERM_MANAGER',
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
            menuManageList:{
                totalPage:0,
                list:[]
            },
            menuManageDetail:{},
            permTree:[],
            oprateType:'add',
            rowData:{},
            menuTree:[],
            resourceTree:[],
            viewList:{
                name:'权限名称',
                code:'权限编码',
                pid:'父权限',
                system:'系统',
                enable:'状态',
                menuOperates:'菜单',
                resources:'资源'
            },
            itemList:[
                {
                    type:"input",
                    placeholder:"请输入权限名称",
                    model:'name'
                },{
                    type:"systemSelect",
                }
            ],
            loading:false,
            showPopper:true
        }
    },
    computed:{
        permList:function(){
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
                }else if(key === 'menuOperates'){
                    bak[this.viewList[key]] = this.getobjMenu(this.menuManageDetail[key])
                }else if(key === 'resources'){
                    bak[this.viewList[key]] = this.menuManageDetail[key]?this.menuManageDetail[key].join(","):""
                }else{
                    bak[this.viewList[key]] = this.menuManageDetail[key]
                }
            }
            return bak
        },
        ...mapState({
            operateBtns:'operateBtns'
        }),
        operateWidth:function(){
            let arr = ['VIEW','EDIT','CONFIG_MENU','CONFIG_RESOURCE'];
            let res = [];
            for(var i=0;i<arr.length;i++){
                if(this.operateBtns[arr[i]]){
                    res.push(this.operateBtns[arr[i]]);
                }
            }
            return this.getLen(res.length)
        }
    },
    mounted() {
        this.queryPermManageDetal({enable:true})
        
        //获取资源树
        // this.getResourceTree()
    },
    methods: {
        getobjMenu(arr){
            if(!arr) return ""
            let newArr = arr.map(item=>{
                return item.menuId
            })
            return newArr.join(',')
        },
        getLen(num){
            let arr = ['0','80',"155","225","295"];
            return arr[num]
        },
        async getList(params){
            this.loading = true;
            let res = await this.$service.queryPermManageList(params)
            this.menuManageList = res || {totalPage:0,list:[]};
            this.loading = false;
        },
        async queryDetail(params){
            let res = await this.$service.queryPermManageDetail(params)
            this.menuManageDetail = res
        },
        async addPermManage(params){
            let res = await this.$service.addPermManage(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("添加权限成功！")
                this.$refs.addForm.$refs['form'].resetFields();
                this.$refs.addForm.$refs.tree.setCheckedKeys([])

                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.queryPermManageDetal({enable:true})
            }
        },
        async updatePermManage(params){
            let res = await this.$service.updatePermManage(params);
            if(res){
                this.addDialogVisible = false;
                this.$message.success("更新权限成功！")
                this.$refs.addForm.$refs['form'].resetFields();
                this.$refs.addForm.$refs.tree.setCheckedKeys([])
                
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.queryPermManageDetal({enable:true})
            }
        },
        async queryPermManageDetal(){
            let res = await this.$service.getPermManageTree({})
            res && (this.permTree.push(res.detail))
            if(res){
                this.permTree = [];
                this.permTree.push(res.detail)
            }
        },
        async togglePerm(params){
            let res = await this.$service.togglePerm(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('改变状态成功');
                this.queryPermManageDetal({enable:true})
            }
        },
        async deletePerm(params){
            let res = await this.$service.deletePerm(params)
            
            if(res){
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.$message.success('删除成功');
                this.queryPermManageDetal({enable:true})
            }
        },
        
        async getResourceTree(params){
            let res = await this.$service.resourceTree(params);
            res && (this.resourceTree.push(res.detail))
        },
        async assignMenu(params){
            let res = await this.$service.assignMenu(params);
            this.setMenuVisible = false;
            if(res){
                this.$message.success('配置菜单成功')
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        async assignResource(params){
            let res = await this.$service.assignResource(params);
            this.setResourceVisible = false;
            if(res){
                this.$message.success('配置资源成功')
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
            }
        },
        add(){
            this.oprateType = "add"
            this.rowData = {
                name:"",
                code:"",
                enable:""
            }
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
            return resData
        },
        
        async handleUp(idx,row){
            let res = await this.$service.menuTree({enable:true,system:row.system});// await this.getMenuTree({systemCode:row.system})
            let detail = [];
            detail.push(res.detail)
            this.menuTree = JSON.parse(JSON.stringify(detail))
            this.setMenuVisible = true
            let checkarr = await this.$service.queryPermManageDetail({id:row.id});
            let arr = this.getMenuIdArr(checkarr.menuOperateIds)
            this.$refs.setMenuForm.$refs.tree.setCheckedKeys(arr);
            //回显下拉列表
            setTimeout(()=>{
                this.setPopmenuShow(checkarr.menuOperateIds)
            },200)
            
            this.curRowid = row.id
        },
        getMenuIdArr(obj){
            return obj.map(item=>{
                return item.menuId
            })
        },
        setPopmenuShow(ids){
            let arr = [];
            console.log('ids',ids)
            this.$refs.setMenuForm.menuOperates[0] && this.$refs.setMenuForm.menuOperates.forEach(menu=>{
                ids.forEach(item=>{
                    if(item.menuId === menu.menuId){
                        menu.operateId = item.operateId
                    }
                })
            })
        },
        async handleDown(idx,row){
            let res = await this.$service.resourceTree({enable:true,system:row.system});
            let detail = [];
            detail.push(res.detail)
            this.resourceTree = JSON.parse(JSON.stringify(detail))
            this.setResourceVisible = true
            let checkarr = await this.$service.queryPermManageDetail({id:row.id});
            this.$refs.setResourceForm.$refs.tree.setCheckedKeys(checkarr.resourceIds);
            
            // this.setResourceVisible = true;
            this.curRowid = row.id
        },
        dataTolist(data){
            return data.map((item)=>{
                item.perStatus = item.enable?"已启用":"已停用";
                item.perSystem = this.$systemList[item.system];//item.system==="zcj"?"资产家":"大金融";
                return item
            })
        },
        submitAddPerm(data){
            data.enable === "1"? (data['enable']=true) : (data['enable']=false)
            if(this.opetateType === "update"){
                this.updatePermManage(data)
            }else{
                this.addPermManage(data)
            }
            // this.addPermManage(data)
        },
        setMenu(data){
            // let menuOperates = data;
            let params = Object.assign({permissionId:this.curRowid},{menuOperates:data})
            this.assignMenu(params)
        },
        setResource(data){
            let params = Object.assign({permissionId:this.curRowid},{resourceIds:data})
            this.assignResource(params)
        },
        menuClose(){
            this.setMenuVisible = false
        },
        resourceClose(){
            this.setResourceVisible = false
        },
        doDestroy(){

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