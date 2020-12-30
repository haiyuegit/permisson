<template>
    <div class="content">
        <topWrap>
        <systemSearch :itemList="itemList" isSystem="show" v-on:search="search"></systemSearch>
        <obtn v-on:add="add" v-on:changeStatus="changeStatus" v-on:patchdelete="patchdelete('菜单')"></obtn>
        </topWrap>
        <el-table
        ref="permTable"
        v-loading="loading"
        :data="orgList"
        border
        row-key="id"
        
        style="width: 100%">
             <el-table-column
            type="selection"
            width="35">
            </el-table-column>
            <el-table-column
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
            <!-- <el-table-column
            prop="img"
            label="图标">
            </el-table-column> -->
            <el-table-column
            label="排序码"
            prop="sortOrder"
            width="70">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.sortOrder" :disabled="!scope.row.disabled" @blur="changeSort(scope.row)"  @dblclick.native="changeInput(scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="请求地址"
            prop="url">
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="菜单编码"
            prop="code">
            </el-table-column>
            <el-table-column
            label="创建时间"
            prop="ctime"
            width="160">
            </el-table-column>
            <el-table-column
            label="状态"
            prop="menuStatus"
            width="70">
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="所属系统"
            prop="menuSystem"
            width="80">
            </el-table-column>

            <el-table-column label="操作" width="155">
                <template slot-scope="scope">
                    <el-button
                    v-if="operateBtns.VIEW"
                    size="mini"
                    @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button
                    v-if="operateBtns.EDIT"
                    size="mini"
                    @click="edit(scope.$index, scope.row)">修改</el-button>
                    <!-- <el-button
                    size="mini"
                    type="danger"
                    @click="handleUp(scope.$index, scope.row)">上移</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDown(scope.$index, scope.row)">下移</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <div v-if="menuManageList.totalPage" class="page_bottom">
            <el-pagination
                :current-page="pageNum"
                :page-size="pageSize"
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
import xdetail from '../../components/common/viewDialog'
import xadd from '../../components/menuManage/add'

export default {
    name: 'MENU_MANAGER',
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
            pageSize:50,
            centerDialogVisible:false,
            addDialogVisible:false,
            permTree:[],
            orgList:[],
            menuManageList:{
                totalPage:0,
                list:[]
            },
            menuManageDetail:{},
            rowData:{},
            allMenu:[],
            opetateType:'add',
            viewList:{
                name:'菜单名称',
                code:'菜单编码',
                pid:'父菜单',
                url:'菜单地址',
                system:'系统',
                enable:'状态',
                operates:'关联操作',
            },
            itemList:[
                {
                    // label:"接收人",
                    type:"input",
                    placeholder:"请输入菜单名称",
                    model:'name'
                },{
                    // label:"处理人",
                    type:"systemSelect",
                    placeholder:"请选择",
                    // model:'system'
                }
            ],
            loading:false
        }
    },
    computed:{
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
                }else if(key === 'operates'){
                    bak[this.viewList[key]] = this.menuManageDetail[key]?this.menuManageDetail[key].join(','):''
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
        this.queryMenuTree({enable:true})
        this.queryAllMenu()
    },
    methods: {
        
        async getList(params){
            this.loading = true;
            let res = await this.$service.queryMenuManageList(params)
            let arr = [];
            this.loading = false
            res && (arr.push(res.detail))
            // this.permTree = arr
            let orgList = res.detail.children ? JSON.parse(JSON.stringify(res.detail.children)) : [];
            this.orgList = this.dataTolist(orgList)
        },
        async queryDetail(params){
            let res = await this.$service.queryMenuManageDetail(params)
            this.menuManageDetail = res
        },
        async queryMenuTree(params){
            let res = await this.$service.queryMenuTree(params)
            if(res){
                this.permTree = [];
                this.permTree.push(res.detail);
            }
            // res && (this.permTree.push(res.detail))
        },
        async queryAllMenu(params){
            let res = await this.$service.allMenu(params)
            // res.operates.push({id:'123',name:'test'})
            res && (this.allMenu = res.operates)
        },
        async addPermManage(params){
            let res = await this.$service.addMenuManage(params);
            if(res){
                this.addDialogVisible = false;
                this.$refs.addForm.$refs['form'].resetFields();
                this.$refs.addForm.$refs.tree.setCheckedKeys([])
                
                this.$message.success("添加菜单成功！")
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.queryMenuTree({})
            }
        },
        async updatePermManage(params){
            let res = await this.$service.updateMenu(params);
            if(res){
                this.addDialogVisible = false;
                this.$refs.addForm.$refs['form'].resetFields();
                this.$refs.addForm.$refs.tree.setCheckedKeys([])

                this.$message.success("更新菜单成功！")
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.queryMenuTree({})
            }
        },
        async updateSort(params){
            let res = await this.$service.updateOrder(params);
            if(res){
                this.$message.success("更改排序码成功！")
                this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
                this.queryMenuTree({})
            }
        },
        async togglePerm(params){
            let res = await this.$service.toggleMenu(params)
            
            if(res){
                this.getList({name:"",pageNum:1,pageSize:this.pageSize})
                this.$message.success('改变状态成功');
                this.queryMenuTree({})
            }
        },
        async deletePerm(params){
            let res = await this.$service.deleteMenu(params)
            
            if(res){
                this.getList({name:"",pageNum:1,pageSize:this.pageSize})
                this.$message.success('删除成功');
                this.queryMenuTree({})
            }
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

        changeSort(data){
            if(data.sortOrder === data.orgSort){
                this.disableInput(data)
                return
            }
            let params = {
                id:data.id,
                sortOrder:data.sortOrder
            }
            this.updateSort(params)
            this.disableInput(data)
        },

        disableInput(data){
            this.orgList = this.orgList.map(item=>{
                if(item.id === data.id){
                    item.disabled = false
                }
                return item
            })
        },

        changeInput(data){
            this.orgList = this.orgList.map(item=>{
                if(item.id === data.id){
                    item.disabled = true
                }
                return item
            })

        },

        dataTolist(data){
            return data.map((item)=>{
                item.menuStatus = item.enable?"已启用":"已停用";
                item.orgSort = item.sortOrder
                item.menuSystem = this.$systemList[item.system];
                if(item.children){
                     this.dataTolist(item.children)
                }

                return item
            })
        },
        add(){
            this.opetateType = "add";
            this.rowData = {
                operates:[],
                name:"",
                code:"",
                sortOrder:"",
                url:"",
                system:"",
                enable:""
            }
            this.addDialogVisible = true;
            this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
        },
        async edit(idx,row){

            this.$refs.addForm && this.$refs.addForm.$refs.tree.setCheckedKeys([row.pid])
            this.opetateType = 'update'

            let rdata = this.exEditData(row);

            let res = await this.$service.queryMenuManageDetail({id:row.id})
            if(res){
                rdata["operates"] = res.operateIds
            }else{
                rdata["operates"] = []
            }

            this.rowData = JSON.parse(JSON.stringify(rdata))
            
            this.addDialogVisible = true;
            
        },
        exEditData(data){
            let resData = JSON.parse(JSON.stringify(data))
            resData['enable'] = resData.enable ? "1":"0"
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