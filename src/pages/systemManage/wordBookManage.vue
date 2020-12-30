<template>
    <div class="content">
        <wordBookSearch v-if="operateBtns.SEARCH" inputPlace="请输入字典名称" @wordListFormQueryTopar="listenToWordListFormQuery"></wordBookSearch>
        <div class="oprate_btn">
            <el-button v-if="operateBtns.ADD" class="fix_btn" type="primary" @click="adddia()">新增</el-button>
            <el-button v-if="operateBtns.ENABLED" class="fix_btn" type="primary" @click="enable()">启用</el-button>
            <el-button v-if="operateBtns.STOP" class="fix_btn" type="primary" @click="disable()">停用</el-button>
            <!-- <el-button type="primary" size="medium" class="fix_btn" @click="moredel()">批量删除</el-button> -->
        </div>
        <el-table
          ref="multipleTable"
          :data="wordBookManageList.details"
          border
          style="width: 100%"
          
          @selection-change="handleSelectionChange">
             <el-table-column
            type="selection"
            width="35">
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="编号"
            prop="code">
            </el-table-column>
            <el-table-column
            label="名称"
            prop="name">
            </el-table-column>
            <el-table-column
            label="状态"
            prop="status">
              <template slot-scope="scope">
                <span>{{scope.row.status | formatStata}}</span>
              </template>
            </el-table-column>
            <el-table-column
            label="创建时间"
            prop="createTime"
            width="160">
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip=true
            label="备注"
            prop="depict">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="155">
              <template slot-scope="scope">
                <el-button v-if="operateBtns.VIEW" size="mini" @click="handleClick(scope.row)">查看</el-button>
                <el-button v-if="operateBtns.EDIT" size="mini" @click="updatedia(scope.row)">修改</el-button>
              </template>
            </el-table-column>

        </el-table>
        <page 
            :pageNum="params.pageNum" :total="wordBookManageList.total"
            @handleCurrentChangeToPar="listenToHandleCurrentChange"
            @handleSizeChangeToPar="listenToHandleSizeChange"
        ></page>
        
        <el-dialog :visible.sync="dialogFormVisible" center title="新增" width="30%">
            <wordBookAddDia @addTopar="listenToadd" @cancelTopar="listenTocancel"></wordBookAddDia>
        </el-dialog>
        <el-dialog :visible.sync="dialogFormUpdVisible" center title="编辑" width="30%">
            <wordBookUpdateDia  :updform="updform" @cancelUpdTopar="listenToUpdcancel" @updateTopar="listenToUpdate"></wordBookUpdateDia>
        </el-dialog>
    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import wordBookSearch from '../../components/wordBookManage/wordBookSearch'
import wordBookAddDia from '../../components/wordBookManage/wordBookAddDia'
import wordBookUpdateDia from '../../components/wordBookManage/wordBookUpdateDia'
import page from '../../components/common/page'
export default {
    name: 'DICT_MANAGER',
    components:{
        wordBookSearch,
        wordBookAddDia,
        wordBookUpdateDia,
        page
    },
    data () {
        return {
            params:{//初始化传参
              name:"",
              pageNum: 1,
              pageSize:10
            },
            updform:{
              code:'',
              depict: '',
              name:''
            },
            wordBookManageList:{
                total:0,
                details:[]
            },
            //弹窗字段变量
            dialogFormVisible: false,//新增弹窗控制
            dialogFormUpdVisible: false,//修改弹窗控制
            multipleSelection: [],
            ids:[],
            editData:{}
        }
    },
    computed:{
        ...mapState({
            operateBtns:'operateBtns'
        }),
    },
    mounted() {
        this.getwordBookManageList(this.params);
    },
    methods: {
        listenToHandleSizeChange(data) {//切换每页显示条数
            this.params.pageSize = data;
            this.getwordBookManageList(this.params);
        },
        listenToHandleCurrentChange(data) {//切换当前页
            this.params.pageNum = data;
            this.getwordBookManageList(this.params);
        },
        async getwordBookManageList(params){//查询列表接口
            let res = await this.$service.queryWordManageList(params)
            this.wordBookManageList = res;
        },
        async wordEnableDis(params){//启用禁用接口
            let res = await this.$service.wordEnableDis(params)
            return res;
        },
        async wordDelete(params){//批量删除接口
            let res = await this.$service.wordDelete(params)
            return res;
        },
        async wordUpdate(params){//修改接口
            let res = await this.$service.wordUpdate(params)
            return res;
        },
        async wordUpdateQuery(params){//修改接口
            let res = await this.$service.wordUpdateQuery(params)
            return res;
        },
        async addWord(params){//新增字典接口
            let res = await this.$service.addWord(params)
            return res;
        },
        listenToWordListFormQuery(data) {//表单查询
            this.params.name = data;
            this.getwordBookManageList(this.params);
        },
        listenTocancel(data) {//新增弹窗取消事件
            this.dialogFormVisible = false;
        },
        adddia(){//新增弹窗
            this.dialogFormVisible = true
        },
        listenToadd(data){//新增接口调用
            this.dialogFormVisible = false;
            let that=this;
            this.addWord({code:data.code,depict:data.depict,name:data.name}).then(function(resObj){
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
            // this.updform = {
            //   code:row.code,
            //   depict: row.depict,
            //   name:row.name
            // }
            let that=this;
            this.wordUpdateQuery({code:row.code}).then(function(resObj){//通过接口返回的设置data里的数据或者内置组件，需let that=this;
                that.updform = {
                  code:resObj.code,
                  depict: resObj.depict,
                  name:resObj.name
                }
            })
        },
        listenToUpdate(data){//修改接口调用
            this.dialogFormUpdVisible = false;
            let that=this;
            this.wordUpdate({code:data.code,depict:data.depict,id:this.editData.id,name:data.name}).then(function(resObj){
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
        enable(){//启用
          if(this.multipleSelection.length==0){
              this.$message({
                message: '请选择批量操作用户'
              });
          }else{
              for(let i=0;i<this.multipleSelection.length;i++){
                  this.ids.push(this.multipleSelection[i].id);
              }
              let that=this;
              this.wordEnableDis({ids:this.ids,status:1}).then(function(resObj){
                if(resObj.result==true){
                  that.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  location.reload();
                }
              })
          }
        },
        disable(){//禁用
          if(this.multipleSelection.length==0){
              this.$message({
                message: '请选择批量操作用户'
              });
          }else{
              for(let i=0;i<this.multipleSelection.length;i++){
                  this.ids.push(this.multipleSelection[i].id);
              }
              let that=this;
              this.wordEnableDis({ids:this.ids,status:0}).then(function(resObj){
                if(resObj.result==true){
                  that.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  location.reload();
                }
              })
          }
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
              this.wordDelete({ids:this.ids}).then(function(resObj){
                if(resObj.result==true){
                  that.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  location.reload();
                }
              })
          }
        },
        handleClick(row) {//查看
          this.$router.push({path: '/systemManage/wordBookDetail',query:{id:row.id,code:row.code,name:row.name,depict:row.depict}})
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
    // margin-bottom:10px;
    position:absolute;
    top:96px;
    left:20px;
    right:0;
    z-index: 999;
}
</style>