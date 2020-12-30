<template>
<div>
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" size="medium">
    <el-form-item label="Terracotta服务地址" prop="tcConfigUrl">
        <el-input v-model="form.tcConfigUrl"></el-input>
    </el-form-item>

    <el-form-item label="客户端标识" prop="appId">
        <el-select v-model="form.appId" placeholder="请选择">
            <el-option
            v-for="item in appIds"
            :key="item.code"
            :label="item.name"
            :value="item.code">
            </el-option>
        </el-select>
    </el-form-item>

    <el-form-item label="管理员" prop="appUserIdList">
        <div class="applistTag">
        <el-tag
            v-for="tag in clientstaffData"
            :key="tag.bizId"
            >
            {{tag.staffName?tag.staffName:"无名氏"}}
        </el-tag>
        <el-button size="mini" @click="addStaff">添加</el-button>
        </div>
        
    </el-form-item>

    <!-- <el-form-item label="消息协议" prop="messageProtocol">
        <el-select v-model="form.messageProtocol" placeholder="请选择">
            <el-option
            v-for="item in messageProtocolList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
            </el-option>
        </el-select>
    </el-form-item> -->

     <el-form-item label="消息队列服务地址" prop="messageServerAddress">
        <el-input v-model="form.messageServerAddress"></el-input>
    </el-form-item>

    <el-form-item label="描述" prop="description">
        <el-input v-model="form.description"></el-input>
    </el-form-item>

    
    
    <el-form-item label="是否启用" prop="isEnabled">
        <el-radio-group v-model="form.isEnabled">
        <el-radio :label=0>否</el-radio>
        <el-radio :label=1>是</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancle">取消</el-button>
    </el-form-item>
    </el-form>
    <el-dialog
        :visible.sync="addStaffVisible"
        append-to-body
        center
        custom-class="limit_dialog"
        title="添加应用用户"
        width="50%"
        @closed="closeDialog">
        <selStaff
            v-if="addStaffVisible"
            ref="addAppid"
            :appIds="appIds"
            tagId="bizId"
            v-on:close="closeAdd"
            v-on:selStaffTag="selStaffList"
        ></selStaff>
    </el-dialog>
</div>
</template>
<script>
import selStaff from './addStaff'
export default {
  name: "",
  components: {
      selStaff,
  },
  props:{
        appIds:{
            type:Array,
            default:function(){
                return []
            }
        },
        form:{
            appId:[],
            appUserIdList:[]
        },
        oprateType:""
  },
  
  mounted() {
      let bizList = this.form.appUserIdList || [];
      if(bizList.length>0){
          this.getBatchStaff({bizIds:bizList})
      }
      
  },
  data() {
      var validateAppUser = (rule, value, callback) => {
        if (!this.clientstaffData.length) {
          callback(new Error('请添加管理员'));
        } else {
          callback();
        }
      };
    return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        messageProtocolList:[
            {
                name:"HTTP",
                code:"HTTP"
            },{
                name:"消息队列服务",
                code:"MESSAGE_QUEUE"
            },
        ],
        rules:{
            tcConfigUrl: [
                { required: true, message: '请输入Terracotta 服务地址', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            // messageProtocol: [
            //     { required: true, message: '请输请输入消息协议', trigger: 'blur' },
            //     { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            // ],
            messageServerAddress:[
                { required: true, message: '请选择消息队列服务地址', trigger: 'blur' }
            ],
            appId: [
                { required: true, message: '请选择客户端标识', trigger: 'blur' }
            ],
            isEnabled: [
                { required: true, message: '请选择状态', trigger: 'blur' }
            ],
            appUserIdList: [
                { validator: validateAppUser, trigger: 'blur' }
            ],
            
            description: [
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
        },
        selectOrg:{
            orgsid:[]
        },
        i:0,
        addStaffVisible:false,
        client:[],
        selStaffTag:[],
        clientstaffData:[]
    };
  },
  
  methods: {
      async getBatchStaff(params){
        let res = await this.$service.batchQueryStaff(params)
        this.clientstaffData = res.list;
      },
      
      onSubmit(){
          this.$refs['form'].validate((valid) => {
            if (valid) {
                this.form.appUserList = this.clientstaffData.map(item=>{
                    return {id:item.bizId,name:item.staffName}
                })

                let params = JSON.parse(JSON.stringify(this.form))
                this.$emit("submitAddTask",params)
            } else {
                return false;
            }
            });
      },
      cancle(){
          this.$emit("close")
      },
      test(){
          this.addStaffVisible = true
      },
      closeAdd(){
          this.addStaffVisible = false
      },
      addStaff(){
          this.addStaffVisible = true
          setTimeout(()=>{
              this.$refs.addAppid.getData({});
              let cdata = JSON.parse(JSON.stringify(this.clientstaffData))
              this.$refs.addAppid.setStaffData(cdata);
              
          })
      },
      closeDialog(){
        
      },
      selStaffList(data){
          this.clientstaffData = JSON.parse(JSON.stringify(data))
      }
  }
};
</script>
<style lang='less' scoped>
.applistTag .el-tag{
    margin-right:8px;
}
</style>