<template>
    <div class="content" style="padding-top:50px">
        <obtn v-on:add="add" v-on:changeStatus="changeStatus" v-on:patchdelete="patchdelete('菜单')"></obtn>
        <el-table
        ref="permTable"
        :data="menuManageList.list"
        border
        size="medium"
        style="width: 100%">
            <el-table-column
            label="姓名"
            prop="name"
            width="100"
            >
            </el-table-column>
            <!-- <el-table-column
            prop="img"
            label="图标">
            </el-table-column> -->
            <el-table-column
            label="身份证号"
            prop="identityNo"
            width="170"
            >
            </el-table-column>
            <el-table-column
            label="手机号码"
            prop="mobile"
            width="140">
            </el-table-column>
            <el-table-column
            label="邮箱"
            prop="email"
            width="160">
            </el-table-column>
            <el-table-column
            label="联系地址"
            prop='addressDec'
            >
            </el-table-column>

            <el-table-column align="center" label="操作" width="155">
                <template slot-scope="scope" >
                    <el-button
                    v-if="operateBtns.VIEW"
                    size="mini"
                    @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <!-- <el-button
                    size="mini"
                    v-if="operateBtns.EDIT"
                    @click="edit(scope.$index, scope.row)">修改</el-button> -->
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

        <div v-if="menuManageList.total" class="page_bottom">
            <el-pagination
                :current-page="pageNum"
                :page-size="pageSize"
                :page-sizes="[10]"
                :total="menuManageList.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>

        <el-dialog
        v-if='centerDialogVisible'
        :before-close="isClose"
        :visible.sync="centerDialogVisible"
        center
        title="查看"
        width="50%"
        >
        <xdetail :detailData="menuManageDetail" :urlImg="urlImg"></xdetail>
        </el-dialog>

        <el-dialog
        v-if='addDialogVisible'
        :before-close="isClose"
        :visible.sync="addDialogVisible"
        center
        custom-class="limit_dialog"
        title="添加菜单"
        width="60%"
        >
        <xadd 
            ref="addForm"
            :allMenu="allMenu"
            :detailDataChange="menuManageDetail"
            :dfsToken="dfsToken"
            :permTree="permTree"
            v-on:close="closeAdd"
            v-on:submitAddPerm="submitAddPerm"
            v-on:submitChangePerm="submitChangePerm"
        ></xadd>
        </el-dialog>

    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import obtn from '../../components/agentManage/operateBtn'
import xdetail from '../../components/agentManage/viewDialog'
import xadd from '../../components/agentManage/add'

export default {
    name: 'AGENT_MANAGE',
    components:{
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
            dfsToken:"",
            // dialogShow:false,
           // modifyButton:false,
            menuManageList:{
                total:0,
                list:[]
            },
            menuManageDetail:{},
            urlImg:[],
            rowData:{},
            allMenu:[],
            opetateType:'add',
            viewList:{
                name:'菜单名称',
                code:'菜单编码',
                // code:'菜单编码',
                pid:'父菜单',
                url:'菜单地址',
                system:'系统',
                enable:'状态',
                operates:'关联操作',
                // resources:'资源'
            },
        }
    },
    computed:{
        // menuList:function(){ 
        //     let pdata = this.menuManageList.list
        //     if(!pdata.length){
        //         return this.menuManageList.list
        //     }else{
        //         return this.dataTolist(this.menuManageList.list)
        //     }      
        // },
        // detailData:function(){
        //     if(!this.menuManageDetail){
        //         return {}
        //     }
        //     // var bak = {};
        //     // for(let key in this.viewList){
        //     //     if(key === "enable"){
        //     //         bak[this.viewList[key]] = this.menuManageDetail[key]?"已启用":"已停用"
        //     //     }else if(key === 'system'){
        //     //         bak[this.viewList[key]] = this.$systemList[this.menuManageDetail[key]]
        //     //     }else if(key === 'operates'){
        //     //         bak[this.viewList[key]] = this.menuManageDetail[key]?this.menuManageDetail[key].join(','):''
        //     //     }else{
        //     //         bak[this.viewList[key]] = this.menuManageDetail[key]
        //     //     }
        //     // }
        //     // return bak
        // },
        ...mapState({
            systemList:'systemList',
            operateBtns:'operateBtns'
        }),
    },
    
    mounted() {
        // this.queryMenuTree({})
        // this.queryAllMenu()
        this.applicantList({name:"",pageNum:this.pageNum,pageSize:this.pageSize});
    },
    methods: {
         async applicantList(params){
            let res = await this.$service.agentList(params)
            this.dfsToken = res.dfsToken;
            res.list.forEach(item => {
                 item.addressDec = item.address + item.addressDetail;
            });
            this.menuManageList = res || {total:0,list:[]};
        },

        //新增数据请求接口
         async fddadd(params){
             let res = await this.$service.agentFddAdd(params);
             if(res){
                 this.$message.success("新增成功");
                 this.addDialogVisible = false;
                 this.applicantList();      
             }
         },
         //修改数据请求接口
         async fddaddChange(params){
             let res = await this.$service.agentFddaddChange(params);
             if(res){
                 this.$message.success("修改成功");
                 this.addDialogVisible = false;
                 this.applicantList();      
             }
         },         
        async getList(params){
           this.applicantList({name:"",pageNum:this.pageNum,pageSize:this.pageSize});
        },
        async queryDetail(params,num){
            let res = await this.$service.agentDetail({...params,"dfsToken" : this.dfsToken})
            console.log(res)
            this.menuManageDetail = res;
            if(num){
                this.addDialogVisible = true;
            }
            if(res.details.files.length>-1){
               this.urlImg = res.details.files;
            }else{
               this.urlImg[0] = "没有数据"; 
            } 
        },
        // async queryMenuTree(params){
        //     let res = await this.$service.queryMenuTree(params)
        //     if(res){
        //         this.permTree = [];
        //         this.permTree.push(res.detail);
        //     }
        //     // res && (this.permTree.push(res.detail))
        // },
        // async queryAllMenu(params){
        //     let res = await this.$service.allMenu(params)
        //     // res.operates.push({id:'123',name:'test'})
        //     res && (this.allMenu = res.operates)
        // },
        // async addPermManage(params){
        //     let res = await this.$service.addMenuManage(params);
        //     if(res){
        //         this.addDialogVisible = false;
        //         this.$refs.addForm.$refs['form'].resetFields();
        //         this.$refs.addForm.$refs.tree.setCheckedKeys([])
                
        //         this.$message.success("添加菜单成功！")
        //         this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
        //         this.queryMenuTree({})
        //     }
        // },
        // async updatePermManage(params){
        //     let res = await this.$service.updateMenu(params);
        //     if(res){
        //         this.addDialogVisible = false;
        //         this.$refs.addForm.$refs['form'].resetFields();
        //         this.$refs.addForm.$refs.tree.setCheckedKeys([])

        //         this.$message.success("更新菜单成功！")
        //         this.getList({name:"",pageNum:this.pageNum,pageSize:this.pageSize})
        //         this.queryMenuTree({})
        //     }
        // },
        // async togglePerm(params){
        //     let res = await this.$service.toggleMenu(params)
            
        //     if(res){
        //         this.getList({name:"",pageNum:1,pageSize:this.pageSize})
        //         this.$message.success('改变状态成功');
        //     }
        // },
        // async deletePerm(params){
        //     let res = await this.$service.deleteMenu(params)
            
        //     if(res){
        //         this.getList({name:"",pageNum:1,pageSize:this.pageSize})
        //         this.$message.success('删除成功');
        //     }
        // },

        // dataTolist(data){
        //     return data.map((item)=>{
        //         item.menuStatus = item.enable?"已启用":"已停用";
        //         item.menuSystem = this.$systemList[item.system];
        //         // item.cutUrl = item.url?item.url.substr(0,10)+"...":""
        //         item.cutUrl = this.$utils.cutStr(item.url,10)
        //         return item
        //     })
        // },
        //关闭弹出层清空组件
        isClose(){
            this.initDlog = true;
            this.addDialogVisible = false;
            this.centerDialogVisible = false;
            this.menuManageDetail = {};
            this.urlImg = [];
            //this.$refs.addForm.$refs['form'].resetFields();
            try{
             if(typeof(this.$refs.addForm.$refs.upload.clearFiles)=="function"){
                 this.$refs.addForm.$refs.upload.clearFiles();
             }
             }catch(e){
                 console.log(e)
           }
        },
        add(){   
           if( this.menuManageList.list.length > 0 ) {
               this.$message.warning("只能有一条数据存在"); 
           }else{
               this.addDialogVisible = true;  
           }  
        },
        edit(idx,row){
            // this.$refs.addForm && this.$refs.addForm.$refs['form'].resetFields()
            // this.opetateType = 'update'
            // this.rowData = this.exEditData(row);
            // if(!this.rowData.operates){
            //     this.rowData.operates = []
            // }
            this.queryDetail({id:row.id},1);
         },
        // exEditData(data){
        //     let resData = JSON.parse(JSON.stringify(data))
        //     resData['enable'] = resData.enable ? "1":"0"
        //     console.log('res',resData)
        //     return resData
        // },

        submitAddPerm(data){
            this.fddadd(data);//增加数据
           //  data.enable === "1"? (data['enable']=true) : (data['enable']=false)
           // if(this.opetateType === "update"){
           //     this.updatePermManage(data)
           // }else{
           //     this.addPermManage(data)
           // }
        },
        submitChangePerm(data){
            this.fddaddChange(data);    
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