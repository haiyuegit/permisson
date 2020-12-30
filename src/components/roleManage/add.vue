<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="medium">
    <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName"></el-input>
    </el-form-item>
    <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="form.roleCode"></el-input>
    </el-form-item>
    <el-form-item label="系统" prop="systemCode">
        <system-select v-model="form.systemCode"></system-select>
    </el-form-item>
    <el-form-item label="父角色" prop="parentId">
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
    
    <el-form-item label="状态" prop="isEnable">
        <el-radio-group v-model="form.isEnable">
        <el-radio :label="true">启用</el-radio>
        <el-radio :label="false">禁用</el-radio>
        </el-radio-group>
    </el-form-item>

    <!-- <el-form-item label="关联权限" prop="permissionId">
            <el-tree
            :data="permissionTree"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="permTree"
            check-strictly
            :props="defaultProps">
            </el-tree>
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
        roleTree:{
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
  computed:{
      filterTree:function(){
            let t = this.form.systemCode;
            let res = this.filterSystem(this.roleTree,t)
            return res
      }
  },
  mounted() {
      if(this.form){
            let arr = [];
            this.form.parentId && arr.push(this.form.parentId)
            this.$refs.tree.setCheckedKeys(arr)
        }
  },
  data() {
    var validatePid = (rule, value, callback)=>{
          if(!this.form.parentId.length){
              callback(new Error('请选择父角色'));
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
            roleName: [
                { required: true, message: '请输入权限名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            roleCode: [
                { required: true, message: '请输入权限编码', trigger: 'blur' },
                { max: 20, message: '长度在20 个以内字符', trigger: 'blur' }
            ],
            parentId: [
                { validator: validatePid, trigger: "blur"}
            ],
            systemCode: [
                { required: true, message: '请选择系统', trigger: 'blur' }
            ],
            isEnable: [
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
          this.form["parentId"] = this.$refs.tree.getCheckedKeys();
          console.log('form',this.form);
          
          this.$refs['form'].validate((valid) => {
            if (valid) {
                // let treeIds = this.$refs.tree.getCheckedKeys();
                this.form["parentId"] = this.form.parentId.join();
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