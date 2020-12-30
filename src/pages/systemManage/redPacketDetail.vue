<template>
    <div class="content" style="padding-top:60px">
        <div class="showInfo">
            <el-row>
              <el-col :span="4"><div class="grid-content bg-purple">1类型编码:</div></el-col>
              <el-col :span="20"><div class="grid-content bg-purple-light">{{params.type}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><div class="grid-content bg-purple">名称:</div></el-col>
              <el-col :span="20"><div class="grid-content bg-purple-light">{{typename}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><div class="grid-content bg-purple">备注:</div></el-col>
              <el-col :span="20"><div class="grid-content bg-purple-light">{{typedepict}}</div></el-col>
            </el-row>  
        </div>
        <div class="oprate_btn">
            <el-button class="fix_btn" type="primary" @click="adddia()">新增</el-button>
            <el-button class="fix_btn" type="primary" @click="moredel()">批量删除</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="wordDetailQueryList.details"
          border
          style="width: 100%"
          
          @selection-change="handleSelectionChange">
             <el-table-column
            type="selection"
            width="35">
            </el-table-column>
            <el-table-column
            label="值"
            prop="code">
            </el-table-column>
            <el-table-column
            label="名称"
            prop="name">
            </el-table-column>
            <el-table-column
            label="序号"
            prop="sortNum">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button size="small" type="text"  @click="updatedia(scope.row)">编辑</el-button>
              </template>
            </el-table-column>

        </el-table>
        <page 
            :pageNum="params.pageNum" :total="wordDetailQueryList.total"
            @handleCurrentChangeToPar="listenToHandleCurrentChange"
            @handleSizeChangeToPar="listenToHandleSizeChange"
        ></page>
        
        <el-dialog :visible.sync="dialogFormVisible" center title="新增" width="30%">
            <wordBookDetailAddDia @addTopar="listenToadd" @cancelTopar="listenTocancel"></wordBookDetailAddDia>
        </el-dialog>
        <el-dialog :visible.sync="dialogFormUpdVisible" center title="编辑" width="30%">
            <wordBookDetailUpdateDia  :updform="updform" @cancelUpdTopar="listenToUpdcancel" @updateTopar="listenToUpdate"></wordBookDetailUpdateDia>
        </el-dialog>
    </div>
</template>
<script>
import wordBookDetailAddDia from '../../components/wordBookManage/wordBookDetailAddDia'
import wordBookDetailUpdateDia from '../../components/wordBookManage/wordBookDetailUpdateDia'
import page from '../../components/common/page'
export default {
    name: 'REDPACKET_DETAIL',
    components:{
        wordBookDetailAddDia,
        wordBookDetailUpdateDia,
        page
    },
    data () {
        return {
            typename:'',
            typedepict:'',
            parentId:'',
            params:{//初始化传参
              type:"",
              pageNum: 1,
              pageSize:10
            },
            updform:{
              code:'',
              sortNum: '',
              name:''
            },
            wordDetailQueryList:{
                total:0,
                details:[]
            },
            //弹窗字段变量
            dialogFormVisible: false,//新增弹窗控制
            dialogFormUpdVisible: false,//修改弹窗控制
            multipleSelection: [],
            ids:[],
            editData:{},
            dictionaryDetailList:[]
        }
    },
    mounted() {
        this.typename=this.$route.query.name;
        this.typedepict=this.$route.query.depict;
        this.params.type=this.$route.query.code;
        this.parentId=this.$route.query.id;
        this.wordDetailList(this.params);
    },
    methods: {
        listenToHandleSizeChange(data) {//切换每页显示条数
            this.params.pageSize = data;
            this.params.type=this.$route.query.code
            this.wordDetailList(this.params);
        },
        listenToHandleCurrentChange(data) {//切换当前页
            this.params.pageNum = data;
            this.params.type=this.$route.query.code
            this.wordDetailList(this.params);
        },
        async wordDetailList(params){//字典详情查询列表接口
            let res = await this.$service.wordDetailList(params)
            this.wordDetailQueryList = res;
        },
        async wordDetailDel(params){//字典详情批量删除接口
            let res = await this.$service.wordDetailDel(params)
            return res;
        },
        async wordDetailUpdate(params){//字典详情修改接口
            let res = await this.$service.wordDetailUpdate(params)
            return res;
        },
        async wordDetailAdd(params){//字典详情新增接口
            let res = await this.$service.wordDetailAdd(params)
            return res;
        },
        listenTocancel(data) {//新增弹窗取消事件
            this.dialogFormVisible = false;
        },
        adddia(){//新增弹窗
            this.dialogFormVisible = true
        },
        listenToadd(data){//新增接口调用
            this.dictionaryDetailList=[
              {
                code:data.code,
                sortNum:parseInt(data.sortNum),
                name:data.name,
                parentId:this.parentId,
                type:this.params.type
              }
            ]
            this.dialogFormVisible = false;
            let that=this;
            this.wordDetailAdd({dictionaryDetailList:this.dictionaryDetailList}).then(function(resObj){
              if(resObj.result==true){
                that.$message({
                  message: '添加成功',
                  type: 'success'
                });
                location.reload();
              }
            })
        },
        listenToUpdcancel(data) {//修改弹窗取消事件
            this.dialogFormUpdVisible = false;
        },
        updatedia(row){
            this.dialogFormUpdVisible = true
            this.editData = row;
            this.updform = {
              code:row.code,
              sortNum: row.sortNum,
              name:row.name
            }
        },
        listenToUpdate(data){//修改接口调用
            this.dialogFormUpdVisible = false;
            let that=this;
            this.wordDetailUpdate({code:data.code,sortNum:parseInt(data.sortNum),id:this.editData.id,name:data.name}).then(function(resObj){
              if(resObj.result==true){
                that.$message({
                  message: '修改成功',
                  type: 'success'
                });
                location.reload();
              }
            })
        },
        handleSelectionChange(resArr) {//批量选中
            this.multipleSelection=resArr; 
        },
        moredel(){//批量删除
          if(this.multipleSelection.length==0){
              this.$message({
                message: '请选择批量操作用户'
              });
          }else{
              for(let i=0;i<this.multipleSelection.length;i++){
                  this.ids.push(this.multipleSelection[i].id);
              }
              let that=this;
              this.wordDetailDel({ids:this.ids}).then(function(resObj){
                if(resObj.result==true){
                  that.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  location.reload();
                }
              })
          }
        }
    },
    filters: {
      formatStata(status) {
          const statusMap = {
            0: '停用',
            1: '启用'
          }
          return statusMap[status]
      }
    }
}
</script>
<style lang='less' scoped>
.oprate_btn{
    padding:10px;
    background:#f0f0f0;
    margin-bottom:10px;
}
.showInfo{
    line-height: 30px;
    margin-bottom:20px;
    .bg-purple{
        text-align: right;
        margin-right:10px;
    }
}
</style>