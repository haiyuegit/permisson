<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="medium">
    <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="form.categoryName"></el-input>
    </el-form-item>
    <el-form-item label="分类编码" prop="categoryCode">
        <el-input v-model="form.categoryCode"></el-input>
    </el-form-item>
    <el-form-item label="是否员工跟进" prop="followUp">
        <el-radio-group v-model="form.followUp">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item label="消息内容" prop="content">
        <el-input v-model="form.content" placeholder="请输入消息内容" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="是否短信发送" prop="isSmsSend">
        <el-radio-group v-model="form.isSmsSend">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item v-if="form.isSmsSend" label="短信内容" prop="smsContent">
        <el-input v-model="form.smsContent" placeholder="请输入短信内容" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="是否邮件发送" prop="isMailSend">
        <el-radio-group v-model="form.isMailSend">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item v-if="form.isMailSend" label="邮件标题" prop="mailTitle">
        <el-input v-model="form.mailTitle" placeholder="请输入邮件标题"></el-input>
    </el-form-item>
    <el-form-item v-if="form.isMailSend" label="邮件内容" prop="mailContent">
        <el-input v-model="form.mailContent" placeholder="请输入邮件内容" type="textarea"></el-input>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancle">取消</el-button>
    </el-form-item>
    </el-form>
</template>
<script>
import systemSelect from '../common/systemSelect'
export default {
  name: "",
  components: {
      systemSelect
  },
  props:{
        
        oprateType:{
            type:String,
            default:"add"
        },
        form:{
            followUp:false,
            isMailSend:false,
            isSmsSend:false,
        }
  },
  computed:{
     
  },
  mounted() {
      
  },
  data() {
    
    return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        rules:{
            categoryName: [
                { required: true, message: '请输入权限名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            categoryCode: [
                { required: true, message: '请输入权限编码', trigger: 'blur' },
                { max: 20, message: '长度在20 个以内字符', trigger: 'blur' }
            ],
            
            followUp: [
                { required: true, message: '请选择是否员工跟进', trigger: 'blur' }
            ],
            isMailSend: [
                { required: true, message: '请选择是否邮件发送', trigger: 'blur' }
            ],
            isSmsSend: [
                { required: true, message: '请选择是否短信发送', trigger: 'blur' }
            ],
            
            content: [
                { required: true, message: '请输入消息内容', trigger: 'blur' },
                { max: 200, message: '长度在200 个以内字符', trigger: 'blur' }
            ],
            smsContent: [
                { required: true, message: '请输入短信内容', trigger: 'blur' },
                { max: 200, message: '长度在200 个以内字符', trigger: 'blur' }
            ],
            mailContent: [
                { required: true, message: '请输入邮件内容', trigger: 'blur' },
                { max: 200, message: '长度在200 个以内字符', trigger: 'blur' }
            ],
            mailTitle: [
                { required: true, message: '请输入邮件标题', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
        },
        selectOrg:{
            orgsid:[]
        },
        i:0
    };
  },
  watch:{
      "form.parentId"(val,oldval){
        //   console.log('watch',val)
          if(val){
            let arr = [];
            arr.push(val)
            this.$refs.tree.setCheckedKeys(arr)
          }else{
            this.$refs.tree.setCheckedKeys([])
          }
      }
  },
  methods: {
      handleClick(data,checked, node) {
        if(checked){
            this.$refs.tree.setCheckedNodes([]);
            this.$refs.tree.setCheckedNodes([data]);
        }else{
            this.$refs.tree.setCheckedNodes([]);
        }
    },
      
      onSubmit(){
        //   this.form["parentId"] = this.$refs.tree.getCheckedKeys();
          console.log('form',this.form);
          
          this.$refs['form'].validate((valid) => {
            if (valid) {
                // let treeIds = this.$refs.tree.getCheckedKeys();
                // this.form["parentId"] = this.form.parentId.join();
                let params = JSON.parse(JSON.stringify(this.form))
                this.$emit("submitAddPerm",params)
            } else {
                return false;
            }
            });
      },
      cancle(){
          this.$emit("close")
      }
  }
};
</script>
<style lang='less' scoped>
</style>