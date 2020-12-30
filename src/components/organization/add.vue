<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="medium">
    <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
   
    <!-- <el-form-item label="系统" prop="system">
        <el-select v-model="form.system" placeholder="请选择运营支撑系统">
        <el-option label="资产家" value="zcj"></el-option>
        <el-option label="大金融" value="djr"></el-option>
        </el-select>
    </el-form-item> -->

    <el-form-item label="父机构" prop="parentId">
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
    
    <el-form-item label="状态" prop="enable">
        <el-radio-group v-model="form.enable">
        <el-radio label="1">启用</el-radio>
        <el-radio label="0">禁用</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea"></el-input>
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
      if(this.form){
            let arr = [];
            this.form.parentId && arr.push(this.form.parentId)
            this.$refs.tree.setCheckedKeys(arr)
        }
  },
  data() {
    var validatePid = (rule, value, callback)=>{
        console.log('validate',value)
          if(!this.form.parentId.length){
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
        // operatesModal:[],
        rules:{
            name: [
                { required: true, message: '请输入部门名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            remark: [
                { max: 200, message: '长度在200 个以内字符', trigger: 'blur' }
            ],
            
            // system: [
            //     { required: true, message: '请选择机构', trigger: 'blur' }
            // ],
            enable: [
                { required: true, message: '请选择状态', trigger: 'blur' }
            ],
        },
    };
  },

  watch:{
      "form.parentId"(val,oldval){
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
          this.form["parentId"] = this.$refs.tree.getCheckedKeys();
          console.log('form',this.form);
          
          this.$refs['form'].validate((valid) => {
            if (valid) {
                this.form["parentId"] = this.form.parentId.join();
                this.form["bizId"] = this.form["id"]
                let params = JSON.parse(JSON.stringify(this.form))
                console.log('---',params)
                this.$emit("submitAddPerm",params)
                this.$refs['form'].resetFields();
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