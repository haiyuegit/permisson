<template>
<div>
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" size="medium">
    <el-form-item label="分类名称" >
        {{form.categoryName}}
    </el-form-item>
    <el-form-item label="分类编码" >
        {{form.categoryCode}}
    </el-form-item>

    <!-- <el-form-item label="客户端标识" prop="appId">
        <el-select v-model="form.appId" placeholder="请选择">
            <el-option
            v-for="item in appIds"
            :key="item.code"
            :label="item.code"
            :value="item.code">
            </el-option>
        </el-select>
    </el-form-item> -->

    <el-form-item label="管理员" prop="appUserIdList">
        <div class="applistTag">
        <el-tag
            v-for="tag in clientstaffData"
            :key="tag.bizId"
            >
            {{tag.userName || tag.staffName || "无名氏"}}
        </el-tag>
        <el-button size="mini" @click="addStaff">添加</el-button>
        </div>
        
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
            tagId="uid"
            v-on:close="closeAdd"
            v-on:selStaffTag="selStaffList"
        ></selStaff>
    </el-dialog>
</div>
</template>
<script>
import selStaff from '../task/addStaff'
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
            // appId:[],
            appUserIdList:[]
        },
        oprateType:"",
        classId:""
  },
  
  mounted() {
      this.getBatchStaff({param:this.classId})
    //   let bizList = this.form.appUserIdList || [];
    //   if(bizList.length>0){
    //       this.getBatchStaff({bizIds:bizList})
    //   }
      
  },
  data() {
      var validateAppUser = (rule, value, callback) => {
        //   console.log('vvv')
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
        
        rules:{
            // tcConfigUrl: [
            //     { required: true, message: '请输入Terracotta 服务地址', trigger: 'blur' },
            //     { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            // ],
            appUserIdList: [
                { validator: validateAppUser, trigger: 'blur' }
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
        let res = await this.$service.messageSearchHandler(params)
        this.clientstaffData = res.result;
      },
      
      onSubmit(){
          this.$refs['form'].validate((valid) => {
            if (valid) {
                let appUserList = this.clientstaffData.map(item=>{
                    console.log('===',item)
                    return {
                        uid:item.uid,
                        userName:item.staffName || item.userName,
                        tel:item.staffPhone || item.tel,
                        jobNumber:item.staffNo || item.jobNumber,
                        email:item.staffEmail || item.email
                    }
                })

                let params = JSON.parse(JSON.stringify(appUserList))
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
          console.log('---',data)
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