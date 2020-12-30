<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="medium">
    <el-form-item label="操作名称" prop="name">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="操作编码" prop="code">
        <el-input v-model="form.code"></el-input>
    </el-form-item>
   
    <!-- <el-form-item label="系统" prop="system">
        <el-select v-model="form.system" placeholder="请选择运营支撑系统">
            <system-select v-model="form.system"></system-select>
        </el-select>
    </el-form-item> -->
    
    <el-form-item label="状态" prop="enable">
        <el-radio-group v-model="form.enable">
        <el-radio label="1">启用</el-radio>
        <el-radio label="0">禁用</el-radio>
        </el-radio-group>
    </el-form-item>
    
    <!-- <el-form-item label="关联操作" prop="operates">
        <el-checkbox-group v-model="form.operates">
            <el-checkbox v-for="checkitem in allMenu" :key="checkitem.id" :label="checkitem.id" :name="checkitem.id">{{checkitem.name}}</el-checkbox>
        </el-checkbox-group>
    </el-form-item> -->
    
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
        permTree:{
            type:Array,
            default:function(){
                return []
            }
        },
        form:{
            operates:[]
        },
        allMenu:{
            type:Array,
            default:function(){
                return []
            }
        }
  },
  mounted() {
      
  },
  data() {
    // var validatePid = (rule, value, callback)=>{
    //     console.log('validate',value)
    //       if(!this.form.pid.length){
    //           callback(new Error('请选择父权限'));
    //       }else{
    //           callback()
    //       }
    //   };
    return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        rules:{
            name: [
                { required: true, message: '请输入权限名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            code: [
                { required: true, message: '请输入权限编码', trigger: 'blur' },
                { max: 20, message: '长度在20 个以内字符', trigger: 'blur' }
            ],
            
            // system: [
            //     { required: true, message: '请选择系统', trigger: 'blur' }
            // ],
            enable: [
                { required: true, message: '请选择状态', trigger: 'blur' }
            ],
        },
    };
  },
  
  methods: {
      
      onSubmit(){
          console.log('form',this.form);
          
          this.$refs['form'].validate((valid) => {
            if (valid) {
                let params = JSON.parse(JSON.stringify(this.form))
                console.log('---',params)
                this.$emit("submitAddPerm",params)
                // this.$refs['form'].resetFields();
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