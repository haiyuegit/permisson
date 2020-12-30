<template>
    <div class="content" style="padding-top:100px">
        <noteSearch v-if="operateBtns.SEARCH" @noteListFormQueryTopar="noteListFormQuery"></noteSearch>
        <el-table
          :data="menuList"
          border
          
          style="width: 100%">
             <el-table-column
            type="selection"
            width="35">
            </el-table-column>
            <el-table-column
            label="ip地址"
            prop="ip">
            </el-table-column>
            <el-table-column
            label="业务类型"
            prop="bizType">
            </el-table-column>
            <el-table-column
            label="模块名称"
            prop="modelName">
            </el-table-column>
            <el-table-column
            label="行为"
            prop="behvior">
            </el-table-column>
            <!-- <el-table-column
            prop="logType"
            label="日志类型">
            </el-table-column> -->
            <!-- <el-table-column
            prop="logContent"
            label="日志内容"> 
            </el-table-column>-->
            <el-table-column
            :show-overflow-tooltip=true
            label="日志内容"
            prop="logContent">
            </el-table-column>
            <el-table-column
            label="所属系统"
            prop="system">
            </el-table-column>
            <el-table-column
            label="操作人账号"
            prop="userName">
            </el-table-column>
            <!-- <el-table-column
            prop="realName"
            label="操作人姓名">
            </el-table-column> -->
            <el-table-column
            label="创建时间"
            prop="createTime"
            width="180">
            </el-table-column>
        </el-table>
        <page 
            :pageNum="params.pageNum" :total="noteManageList.total"
            @handleCurrentChangeToPar="listenToHandleCurrentChange"
            @handleSizeChangeToPar="listenToHandleSizeChange"
        ></page>
    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import noteSearch from '@/components/noteManage/noteSearch'
import page from '../../components/common/page'
import {queryMenuManageList} from '../../service'
export default {
    name: 'LOG_MANAGER',
    components:{
        noteSearch,
        page
    },
    computed:{
        menuList:function(){ 
            let pdata = this.noteManageList.rows
            if(!pdata.length){
                return this.noteManageList.rows
            }else{
                return this.dataTolist(this.noteManageList.rows)
            }
            
        },
        ...mapState({
            operateBtns:'operateBtns'
        }),
    },
    data () {
        return {
            params:{//初始化传参
              platform:"XHSR-OPER",
              pageNum: 1,
              pageSize:10,
              createTimeFrom: "",
              createTimeTo: "" 
            },
            noteManageList:{
                total:0,
                rows:[]
            }
        }
    },
    
    mounted() {
        this.getNoteManageList(this.params);
    },
    methods: {
        dataTolist(data){
            return data.map((item)=>{
                item.system = this.$systemList[item.platform]
                return item
            })
        },
        listenToHandleSizeChange(data) {//切换每页显示条数
            this.params.pageSize = data;
            this.getNoteManageList(this.params);
        },
        listenToHandleCurrentChange(data) {//切换当前页
            this.params.pageNum = data;
            this.getNoteManageList(this.params);
        },
        async getNoteManageList(params){
            let res = await this.$service.queryNoteManageList(params)
            if(res){
                this.noteManageList = res
            }
            
        },
        noteListFormQuery(data) {//表单查询
            this.params.pageNum = 1;//将页面从第一页开始
            this.params.createTimeFrom = data.createTimeFrom; //存一个开始时间
            this.params.createTimeTo = data.createTimeTo;//存一个结束时间
            let reqobj={
               ...this.params,
               ...data
            }
            if(!reqobj.platform) {
                this.$message.warning("请选择要查询的平台");
                return false;
            }
            this.getNoteManageList(reqobj)
        },
    }
}
</script>
<style lang='less' scoped>
.oprate_btn{
    padding:10px;
    background:#f0f0f0;
    margin-bottom:10px;
}
</style>