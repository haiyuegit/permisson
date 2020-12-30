<template>
    <div class="content">
        <redPacketSearch :propValue="propVle" inputPlace="请输入角色名称" isSystem="show" v-on:searchList="searchList"></redPacketSearch>
        <div class="activity_add_btn">
            <el-button class="fix_btn" type="primary" @click="auditBtn('success')">审核</el-button>
            <el-button size="medium"  @click="auditBtn('fail')">审核失败</el-button>
        </div>
        <el-table
        ref="permTable"
        v-loading="loading"
        :data="manageList.list"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
             <el-table-column
            type="selection"
            width="35">
            </el-table-column>
            <el-table-column
            label="用户名"
            prop="userName"
            >
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="活动主题"
            prop="activeTopic"
            >
            </el-table-column>
            <el-table-column
            label="发放原因"
            prop="giveCause"
            width="80"
            >
            </el-table-column>
            <el-table-column
            label="发放时间"
            prop="giveTime"
            >
            </el-table-column>
            <el-table-column
            label="红包金额(元)"
            prop="redValue"
            width="160"
            >
            </el-table-column>
            <el-table-column
            label="领取类型"
            prop="receiveType"
            width="160"
            >
            </el-table-column>
            <el-table-column
            label="审核状态"
            prop="auditStatus"
            width="160"
            >
            </el-table-column>
            <el-table-column
            label="审核时间"
            prop="auditTime"
            width="160"
            >
            </el-table-column>
            <el-table-column
            label="领取时间"
            prop="useTime"
            width="160"
            >
            </el-table-column>    
        </el-table>
        <div v-if="manageList.total" class="page_bottom">
            <el-pagination
                :current-page="pageNum"
                :page-size="10"
                :page-sizes="[10, 20, 30, 40]"
                :total="manageList.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="pageSizeChange"
                @current-change="pageCurrentChange">
            </el-pagination>
        </div>

        <el-dialog
        :visible.sync="centerDialogVisible"
        center
        title="信息确认"
        width="20%">
            <div class="enterMessage">
                <p>是否审核现金红包？</p>
                <p>面值：{{listChecked.allMoney}}元</p>
                <p>数量：{{listChecked.allLength}}</p>
            </div>    
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="enterAudit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import redPacketSearch from '../../components/reward/redPacketSearch'
import xmenu from '../../components/roleManage/menu'
import {queryMenuManageList} from '../../service'
import  dataMessage from '../../config/rewardSelectData'
export default {
    name: 'ROLE_MANAGER',
    components:{
        redPacketSearch,
        xmenu
    },
    data () {
        return {
            pageNum: 1,
            pageSize:10,
            curRowid:"",
            centerDialogVisible:false,
            auditType:'',
            comeValue:'',
            manageList:{
                total:0,
                list:[]
            },
            propVle:{
                type:dataMessage.redPacketList.serachType,
                timeType:dataMessage.redPacketList.serachTime,
                setlectState:dataMessage.redPacketList.serachState,
                typeValue: '',
                setlectStateValue: '',
                timeTypeValue: '',
                prizeUserNum: 0,
                receiveUserNum: 0,
                prizeTotolAmount: 0
            },
            listChecked:{
                multipleSelection:[],
                allMoney:0,
                allLength:'',
            },
            loading:false
        }
    },
    created () {
        this.propVle.timeTypeValue = this.propVle.timeType[0].value
    },
    methods: {
       async searchList(params,flag){
           if(flag == 0){
               this.pageNum = 1;
           }
           this.loading = true;
           this.comeValue = params;
           let res = await this.$service.managerList({pageNum:this.pageNum,pageSize:this.pageSize,...params});
           if(res.list){
               if(res.list.length > 0){
                   res.list.forEach((item,index) => {
                       res.list[index].redValue = item.redValue/100;
                       res.list[index].auditStatus = dataMessage.redPacketList[res.list[index].auditStatus];
                       res.list[index].receiveType = dataMessage.redPacketList[res.list[index].receiveType];
                   });
               };
               this.manageList = res;
               this.propVle.prizeUserNum = res.prizeUserNum || 0; 
               this.propVle.receiveUserNum = res.receiveUserNum || 0;
               this.propVle.prizeTotolAmount = res.prizeTotolAmount/100 || 0;    
           }else{
               this.manageList = {totalPage:0,list:[]};
           };
           this.loading = false
        },
        //全部选中
        handleSelectionChange(val){
            this.listChecked.multipleSelection = [];//当选择发生改变时先将数据清空
            this.listChecked.allMoney = 0;//将金额初始到0;
            val.forEach(item => {
                this.listChecked.allMoney = this.listChecked.allMoney + item.redValue;
                this.listChecked.multipleSelection.push(item.id); 
            });
            this.listChecked.allLength = val.length;
        },
        //点击审核按钮
        auditBtn(sign){
            if(this.listChecked.allLength > 0){
                this.auditType = dataMessage.redPacketList.SubmitAudit[sign];
                this.centerDialogVisible = true;
            }else{
                this.$message.warning("请选择要操作的数据");
            }
            console.log(this.auditType)
        },
        //确定审核
        async enterAudit(){
            let data = {auditStatus:this.auditType,prizeIdList:this.listChecked.multipleSelection}
            let res = await this.$service.auditCon(data);
            this.centerDialogVisible = false;
            this.$message.warning(res.optMsg);
            this.searchList(this.comeValue,1);//审核完成后重新渲染list
       },
       pageCallBack(){ //翻页统一回调方法
          this.searchList(this.comeValue,1);//审核完成后重新渲染list
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
.perm_drop{
    margin-left:10px;
}
.activity_add_btn{
    margin:60px 0 10px;
}
.enterMessage p{
    margin-bottom:15px;
}
.enterMessage p:last-child{
    margin-bottom:0px;
}

</style>