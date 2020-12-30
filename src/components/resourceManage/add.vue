<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="medium">
    <el-form-item label="资源名称" prop="name">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="资源编码" prop="code">
        <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item label="资源地址" prop="url">
        <el-input v-model="form.url"></el-input>
    </el-form-item>

    <el-form-item label="父资源" prop="pid">
        <el-tree
        ref="tree"
        :data="permTree"
        :expand-on-click-node="false"
        :props="defaultProps"
        check-strictly
        default-expand-all
        node-key="id"
        show-checkbox
        @check="handleClick">
        </el-tree>
    </el-form-item>
   
    <!-- <el-form-item label="系统" prop="system">
        <el-select v-model="form.system" placeholder="请选择运营支撑系统">
        <el-option label="资产家" value="zcj"></el-option>
        <el-option label="大金融" value="djr"></el-option>
        </el-select>
    </el-form-item> -->
    
    <el-form-item label="状态" prop="enable">
        <el-radio-group v-model="form.enable">
        <el-radio label="1">启用</el-radio>
        <el-radio label="0">禁用</el-radio>
        </el-radio-group>
    </el-form-item>
    
    <el-form-item label="资源类型" prop="type">
        <el-select  v-model="form.type" placeholder="请选择资源类型">
            <el-option v-for="(value,key) in resourceType" :key="key" :label="value.name" :value="value.code"></el-option>
        </el-select>
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
        permTree:{
            type:Array,
            default:function(){
                return []
            }
        },
        form:{
            operates:[],
            // type:"0"
        },
        resourceType:{
            type:Array,
            default:function(){
                return []
            }
        }
  },
  mounted() {
      if(this.form){
            let arr = [];
            this.form.pid && arr.push(this.form.pid)
            this.$refs.tree.setCheckedKeys(arr)
        }
  },
  data() {
    var validatePid = (rule, value, callback)=>{
          if(!this.form.pid.length){
              callback(new Error('请选择父资源'));
          }else{
              callback()
          }
      };
    return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        // operatesModal:[],
        rules:{
            name: [
                { required: true, message: '请输入资源名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            code: [
                { required: true, message: '请输入资源编码', trigger: 'blur' },
                { max: 20, message: '长度在20 个以内字符', trigger: 'blur' }
            ],
            url: [
                { required: true, message: '请输入资源编码', trigger: 'blur' },
                { max: 200, message: '长度在200 个以内字符', trigger: 'blur' }
            ],
            pid: [
                { validator: validatePid, trigger: "blur"}
            ],
            
            system: [
                { required: true, message: '请选择系统', trigger: 'blur' }
            ],
            type: [
                { required: true, message: '请选择资源类型', trigger: 'blur' }
            ],
            enable: [
                { required: true, message: '请选择状态', trigger: 'blur' }
            ],
        },
    };
  },
  watch:{
      "form.pid"(val,oldval){
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
            //交叉点击节点
        }else{
            this.$refs.tree.setCheckedNodes([]);
            //点击已经选中的节点，置空
        }
    },
      onSubmit(){
          this.form["pid"] = this.$refs.tree.getCheckedKeys();
          
          this.$refs['form'].validate((valid) => {
            if (valid) {
                console.log('form',this.form)
                this.form["pid"] = this.form.pid.join();
                let params = JSON.parse(JSON.stringify(this.form))

                this.$emit("submitAddPerm",params)
                // this.$refs['form'].resetFields();
            } else {
                // console.log('error submit!!');
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