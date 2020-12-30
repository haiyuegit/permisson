<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="medium">
    <el-form-item label="金额项" prop="proportional">
        <el-select v-model="form.proportional" placeholder="请选择">
            <el-option
            v-for="(val,key) in selectData.Proportlist"
            :key="key"
            :label="val"
            :value="key">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="值（元/%）" prop="jinli">
        <el-input v-model="form.jinli"></el-input>
    </el-form-item>
   
    <el-form-item label="数量" prop="number">
        <el-input v-model="form.number"></el-input>
    </el-form-item>
    
    <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="cancle">取消</el-button>
    </el-form-item>
    </el-form>
</template>
<script>
import selectAll from '../../common/selectAll'
export default {
  name: "",
  components: {
      selectAll
  },
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
//   mounted(){
//         this.form["useScope"] = "SB"
//     },
  data() {
   
    return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        rules:{
            jinli: [
                { required: true, message: '请输入部门名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            
            number: [
                { required: true, message: '请输入数量', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            
            proportional: [
                { required: true, message: '请选择金额项', trigger: 'blur' }
            ],
            
        },
    };
  },

  watch:{
      
  },
  
  methods: {
     
      onSubmit(){
          this.$refs['form'].validate((valid) => {
            if (valid) {
                let params = JSON.parse(JSON.stringify(this.form))
                this.$emit("submit",params)
                this.$refs['form'].resetFields();
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