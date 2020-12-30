<template>
  <div>
      <el-form ref="form" :label-position="labelPosition" :label-width="formLabelWidth" :model="updform" :rules="rules">
        <el-form-item label="编码" prop="code">
          <el-input v-model="updform.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="depict">
          <el-input v-model="updform.depict" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="updform.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
  </div>
</template>
<script>

export default {
    props:['updform'],
    data () {
        return {
            formLabelWidth: '80px',
            labelPosition:'center',
            rules:{
                code: [
                    { required: true, message: '请输入编码', trigger: 'blur' },
                    { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
                ],
                depict: [
                    { max: 200, message: '长度在200 个以内字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
      cancel(){
        this.$emit("cancelUpdTopar");
      },
      update(){
          this.$refs['form'].validate((valid) => {
            if (valid) {
                this.$emit("updateTopar",this.updform);
                this.form={//新增表单参数
                    code:'',
                    depict: '',
                    name:''
                }
            } else {
                return false;
            }
          })
      }
    }
}
</script>
<style lang='less' scoped>
.dialog-footer {
  text-align: center;
}
</style>