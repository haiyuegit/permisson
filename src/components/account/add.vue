<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="medium">
    <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
    </el-form-item>
   
    <!-- <el-form-item label="状态" prop="enable">
        <el-radio-group v-model="form.enable">
        <el-radio label="1">启用</el-radio>
        <el-radio label="0">禁用</el-radio>
        </el-radio-group>
    </el-form-item> -->

    <el-form-item label="所属系统" prop="registerApp">
        <el-input v-model="form.registerApp"></el-input>
    </el-form-item>
    
    <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancle">取消</el-button>
    </el-form-item>
    </el-form>
</template>
<script>
export default {
  name: "",
  components: {},
  props:{
        permTree:{
            type:Array,
            // default:[]
        },
        form:{
            // operates:[]
        },
        allMenu:{
            type:Array,
            // default:[]
        }
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
            username: [
                { required: true, message: '请输入部门名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            password: [
                { max: 200, message: '长度在200 个以内字符', trigger: 'blur' }
            ],
            
            // system: [
            //     { required: true, message: '请选择机构', trigger: 'blur' }
            // ],
            registerApp: [
                { required: true, message: '请选择状态', trigger: 'blur' }
            ],
        },
    };
  },

  watch:{
      
  },
  
  methods: {
     
      onSubmit(){
          console.log('form',this.form);
          
          this.$refs['form'].validate((valid) => {
            if (valid) {
                // this.form["parentId"] = this.form.parentId.join();
                let params = JSON.parse(JSON.stringify(this.form))
                console.log('---',params)
                this.$emit("submitAddPerm",params)
                this.$refs['form'].resetFields();
                 this.$refs.form.setCheckedNodes([]);
            } else {
                return false;
            }
            });
        },
        cancle(){
            this.$emit('close')
        }
  }
};
</script>
<style lang='less' scoped>
</style>