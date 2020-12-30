<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="medium">
    <el-form-item label="权限名称" prop="name">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="权限编码" prop="code">
        <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item label="系统" prop="system">
        <system-select v-model="form.system"></system-select>
    </el-form-item>
    <el-form-item label="父权限" prop="pid">
        <el-tree
        ref="tree"
        :data="filterTree"
        :expand-on-click-node="false"
        :props="defaultProps"
        check-strictly
        default-expand-all
        node-key="id"
        show-checkbox
        
        
        @check="handleClick">
        </el-tree>
    </el-form-item>
    
    <el-form-item label="状态" prop="enable">
        <el-radio-group v-model="form.enable">
        <el-radio label="1">启用</el-radio>
        <el-radio label="0">禁用</el-radio>
        </el-radio-group>
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
        oprateType:{
            type:String,
            default:"add"
        },
        form:{

        }
  },
  computed:{
      filterTree:function(){
            let t = this.form.system;
            let res = this.filterSystem(this.permTree,t)
            return res
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
        console.log('validate',rule,value,callback)
          if(!this.form.pid.length){
              callback(new Error('请选择父权限'));
          }else{
              callback()
          }
      };
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
            pid: [
                { validator: validatePid, trigger: "blur"}
            ],
            system: [
                { required: true, message: '请选择系统', trigger: 'blur' }
            ],
            enable: [
                { required: true, message: '请选择状态', trigger: 'blur' }
            ],
        },
        selectOrg:{
            orgsid:[]
        },
        i:0
    };
  },
  watch:{
      "form.pid"(val,oldval){
          console.log('watch',val)
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
        //   console.log('click',data,checked,node,this.i)
            // this.i++;
            // if(this.i%2==0){
        if(checked){
            this.$refs.tree.setCheckedNodes([]);
            this.$refs.tree.setCheckedNodes([data]);
            //交叉点击节点
        }else{
            this.$refs.tree.setCheckedNodes([]);
            //点击已经选中的节点，置空
        }
            // }
    },
      
      onSubmit(){
          this.form["pid"] = this.$refs.tree.getCheckedKeys();
          
          this.$refs['form'].validate((valid) => {
            if (valid) {
                // let treeIds = this.$refs.tree.getCheckedKeys();
                this.form["pid"] = this.form.pid.join();
                let params = JSON.parse(JSON.stringify(this.form))
                this.$emit("submitAddPerm",params)
                // this.$refs['form'].resetFields();
                // this.$refs.tree.setCheckedKeys([])
            } else {
                // console.log('error submit!!');
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
</style>