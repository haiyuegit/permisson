<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="medium">
    <el-form-item label="用户组名称" prop="groupName">
        <el-input v-model="form.groupName"></el-input>
    </el-form-item>
    
    <el-form-item label="系统" prop="systemCode">
        <system-select v-model="form.systemCode"></system-select>
    </el-form-item>

    <!-- <el-form-item label="请选择角色:" prop="pid">
        <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        check-strictly
        :props="defaultProps">
        </el-tree>
    </el-form-item> -->
    
    <el-form-item label="状态" prop="isEnable">
        <el-radio-group v-model="form.isEnable">
        <el-radio :label="true">启用</el-radio>
        <el-radio :label="false">禁用</el-radio>
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
        treeData:{
            type:Array,
            default:function(){
                return []
            }
        },
        permissionTree:{
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
  mounted() {
      
  },
  data() {
    return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        rules:{
            groupName: [
                { required: true, message: '请输入权限名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            systemCode: [
                { required: true, message: '请选择系统', trigger: 'blur' }
            ],
            isEnable: [
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
                // let ids = this.$refs.tree.getCheckedKeys();
                // if(!ids.length){
                //     this.$message.warn("请选择节点");
                //     return
                // }
                // this.form['roleId'] = ids
                let params = JSON.parse(JSON.stringify(this.form))
                this.$emit("submitAddPerm",params)
                this.$refs['form'].resetFields();
                // this.$refs.tree.setCheckedKeys([])
            } else {
                // console.log('error submit!!');
                return false;
            }
            });
      },
      cancle(){
        //   this.$refs['form'].resetFields()
          this.$emit("close")
      }
  }
};
</script>
<style lang='less' scoped>
</style>