<template>
<div>
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" size="medium">
    <el-form-item label="分类名称" >
        {{form.categoryName}}
    </el-form-item>
    <el-form-item label="分类编码" >
        {{form.categoryCode}}
    </el-form-item>
    <el-form-item label="消息接收人" >
        {{form.revName}}
    </el-form-item>

    <el-form-item label="处理人" prop="handlerId">
        <el-select v-model="form.handlerId" placeholder="请选择">
            <el-option
            v-for="item in clientstaffData"
            :key="item.uid"
            :label="item.userName"
            :value="item.uid">
            {{item.userName}}
            </el-option>
        </el-select>
    </el-form-item>

    <el-form-item label="处理时间" prop="handleDate">
        <el-date-picker
            v-model="form.handleDate"
            placeholder="选择日期时间"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
    </el-form-item>

    <el-form-item label="处理过程" prop="handleProcess">
        <el-input v-model="form.handleProcess" placeholder="请输入内容" type="textarea"></el-input>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancle">取消</el-button>
    </el-form-item>
    </el-form>
    
</div>
</template>
<script>
export default {
  name: "",
  components: {
  },
  props:{
        form:{
            type:Object,
            default:function(){
                return {}
            }
        },
        categoryCode:"",
        msgId:""
  },
  
  mounted() {
      this.getHandler({param:this.categoryCode})
  },
  data() {
    
    return {
        rules:{
            handleDate: [
                { required: true, message: '请选择日期时间', trigger: 'blur' },
            ],
            handlerId: [
                { required: true, message: '请选择处理人', trigger: 'blur' },
            ],
            handleProcess: [
                { required: true, message: '请输入处理过程', trigger: 'blur' },
                { max: 200, message: '长度在200 个以内字符', trigger: 'blur' }
            ],
            // appUserIdList: [
            //     { validator: validateAppUser, trigger: 'blur' }
            // ],
        },
        
        clientstaffData:[]
    };
  },
  
  methods: {
      async getHandler(params){
        let res = await this.$service.messageSearchHandlerCode(params)
        this.clientstaffData = res ? res.result : [];
      },
      
      onSubmit(){
        //   console.log("form",this.form)
        //   return;
          this.$refs['form'].validate((valid) => {
            if (valid) {
                
                let res = {
                    handlerId:this.form.handlerId,
                    handleDate:this.form.handleDate,
                    handleProcess:this.form.handleProcess
                }

                let params = JSON.parse(JSON.stringify(res))
                this.$emit("submitAddTask",params)
            } else {
                return false;
            }
            });
      },
      cancle(){
          this.$emit("close")
      },
      
      
  }
};
</script>
<style lang='less' scoped>
.applistTag .el-tag{
    margin-right:8px;
}
</style>