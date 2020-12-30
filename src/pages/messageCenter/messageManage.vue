<template>
    <div class="content">
        <topWrap>
        <systemSearch :itemList="itemList" v-on:search="search"></systemSearch>
        <!-- <obtn v-on:add="add" v-on:changeStatus="changeStatus" v-on:patchdelete="patchdelete('角色')" :disPatchDel="true"></obtn> -->
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
            label="消息分类"
            prop="categoryName"
            >
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="消息内容"
            prop="content"
            >
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="接收人"
            prop="revName"
            >
            </el-table-column>
            
            <el-table-column
            label="是否查看"
            prop="isView"
            >
                <template slot-scope="scope">
                    {{scope.row.isView?"是":"否"}}
                </template>
            </el-table-column>
            
            <el-table-column
            label="处理人"
            prop="realHandlerName"
            >
            </el-table-column>
            <el-table-column
            label="处理时间"
            prop="updateDate"
            width="160"
            >
                <template slot-scope="scope">
                    {{scope.row.updateDate | formartDate("yyyy-MM-dd hh:mm:ss")}}
                </template>
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
            prop="handleStatus"
            width="80"
            >
                <template slot-scope="scope">
                    {{scope.row.handleStatus?"已处理":"未处理"}}
                </template>
            </el-table-column>

            <el-table-column label="操作"
            width="155">
                <template slot-scope="scope">
                    <el-button
                    v-if="operateBtns.VIEW"
                    size="mini"
                    @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button
                        v-if="operateBtns.HANDLE"
                        size="mini"
                        type="danger"
                        @click="handleUp(scope.$index, scope.row)"
                    >处理</el-button>
                    

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
        :visible.sync="bindStaffVisible"
        center
        custom-class="limit_dialog"
        title="绑定处理人"
        width="50%">
        <bindStaff v-if="bindStaffVisible" ref="setperForm" :categoryCode="curRowCode" :form="bindData" :msgId="curRowid" v-on:close="closeSet" v-on:submitAddTask="setStaff"></bindStaff>
        </el-dialog>

    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import topWrap from '../../components/common/topWrap'
import systemSearch from '../../components/common/perSearch'
import xdetail from '../../components/common/viewDialog'
import xadd from '../../components/messageCenter/classAdd'
import bindStaff from '../../components/messageCenter/handle'

import {queryMenuManageList} from '../../service'
import filter from '../../lib/filter.js'
export default {
    name: 'MESSAGE_MANAGE',
    components:{
        topWrap,
        systemSearch,
        xdetail,
        xadd,
        bindStaff
    },
    data () {
        return {
            pageNum: 1,
            pageSize:10,
            curRowid:"",
            curRowCode:"",
            centerDialogVisible:false,
            addDialogVisible:false,
            bindStaffVisible:false,
            manageList:{
                totalPage:0,
                list:[]
            },
            searchData:{
                receiveName:"",
                handlerName:"",
                categoryName:"",
                handlerStatus:"",
                startDate:"",
                endDate:""
            },
            menuManageDetail:{},
            oprateType:'add',
            rowData:{},
            bindData:{},
            viewList:{
                categoryName:'分类名称',
                content:'消息内容',
                isView:'是否查看',
                // :'查看时间',
                revName:'消息接收人',
                handleStatus:"处理状态",
                // updateDate:'处理时间',
                realHandlerName:'处理人',
                // :"MQ消息ID",
                // :"本地logID",
                // :"业务标识"
            },
            itemList:[
                {
                    label:"接收人",
                    type:"input",
                    placeholder:"请输入接收人",
                    model:'receiveName'
                },{
                    label:"处理人",
                    type:"input",
                    placeholder:"请输入处理人",
                    model:'handlerName'
                },{
                    label:"分类名称",
                    type:"input",
                    placeholder:"请输入分类名称",
                    model:'categoryName'
                },{
                    label:"处理状态",
                    type:"select",
                    placeholder:"请选择处理状态",
                    model:'handlerStatus',
                    options:[
                        {
                            name:"未处理",
                            code:0
                        },{
                            name:"已处理",
                            code:1
                        }
                    ]
                },{
                    label:"起始时间",
                    type:"rangeTime",
                    placeholder:"请选择起始时间",
                    model:'categoryTime'
                }
            ],
            loading:false,
            requireGetList:false
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
                if(key === "isView"){
                    bak[this.viewList[key]] = this.menuManageDetail[key]?"是":"否"
                }else if(key === 'createDate' || key === 'updateDate'){
                    bak[this.viewList[key]] = filter.formartDate(this.menuManageDetail[key],'yyyy-MM-dd hh:mm:ss')
                }else if(key === 'handleStatus'){
                    bak[this.viewList[key]] = this.menuManageDetail[key]?"已处理":"未处理"
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
            let res = await this.$service.msgManageList(params)
            this.manageList = res ? res.result : {totalPage:0,list:[]};
            this.loading = false
        },
        async queryDetail(params){
            let res = await this.$service.msgManageDetail(params)
            this.menuManageDetail = res ? res.result : {}
        },
        
        async assignResource(params){
            let req = {param:params}
            let res = await this.$service.msgManageUpdate(req);
            this.bindStaffVisible = false;
            if(res){
                this.$message.success('处理成功');
                this.getList({param:{pageNum:this.pageNum,pageSize:this.pageSize,...this.searchData}})
            }
        },
        search(data){
            this.pageNum = 1;
            if(data.categoryTime){
                data.startDate = data.categoryTime[0];
                data.endDate = data.categoryTime[1];
            }
            Object.assign(this.searchData,data);
            // console.log(this.searchData)
            let params = {param:{pageNum:1,pageSize:this.pageSize,...data}}
            this.getList(params)
        },
        handleView(ids,row){
            this.queryDetail({param:row.id})
            this.centerDialogVisible = true;
        },
        
        async handleUp(idx,row){
            this.bindStaffVisible = true
            let detail = [];
            this.curRowCode = row.categoryCode
            this.curRowid = row.id
            // this.bindData = JSON.parse(JSON.stringify(row))
            // res['handlerId'] = res.realHandlerId
            // this.bindData = JSON.parse(JSON.stringify(row));
            // this.bindData['handlerId'] = JSON.parse(JSON.stringify(row.realHandlerId));
            // this.bindData["handleDate"] = filter.formartDate(this.bindData.handleDate,'yyyy-MM-dd hh:mm:ss')

            this.bindData = this.exEditData(row);
        },

        exEditData(data){
            let resData = JSON.parse(JSON.stringify(data))
            resData['handlerId'] = data.realHandlerId;
            resData['handleDate'] = filter.formartDate(data.handleDate,'yyyy-MM-dd hh:mm:ss')
            // console.log('res',resData)
            return resData
        },
        
        setStaff(data){
            let params = Object.assign({msgId:this.curRowid,...data})
            this.assignResource(params)
        },
        closeSet(){
            this.bindStaffVisible = false
        },
        handleSizeChange(size){
            this.pageSize = size;
            this.getList({param:{pageNum:this.pageNum,pageSize:this.pageSize,...this.searchData}})
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            
            this.getList({param:{pageNum:this.pageNum,pageSize:this.pageSize,...this.searchData}})
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