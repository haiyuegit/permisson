<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="medium">
    <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="工号" prop="no">
        <el-input v-model="form.no" :disabled="opetateType === 'update'"></el-input>
    </el-form-item>

    <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
    </el-form-item>

    <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
    </el-form-item>
   
    <!-- <el-form-item label="系统" prop="system">
        <el-select v-model="form.system" placeholder="请选择运营支撑系统">
        <el-option label="资产家" value="zcj"></el-option>
        <el-option label="大金融" value="djr"></el-option>
        </el-select>
    </el-form-item> -->

    <el-form-item label="所属部门" prop="orgId">
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
    
    <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
        <el-radio :label="0">女</el-radio>
        <el-radio :label="1">男</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item label="状态" prop="enable">
        <el-radio-group v-model="form.enable">
        <el-radio label="1">在职</el-radio>
        <el-radio label="0">离职</el-radio>
        </el-radio-group>
    </el-form-item>

    <!-- <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea"></el-input>
    </el-form-item> -->
    
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
        },
        opetateType:{
            type:String
        }
  },
  mounted() {
      if(this.form){
            let arr = [];
            this.form.orgId && arr.push(this.form.orgId)
            this.$refs.tree.setCheckedKeys(arr)
        }
  },
  data() {
    var validatePid = (rule, value, callback)=>{
        console.log('validate',value)
          if(!this.form.orgId.length){
              callback(new Error('请选择所属部门'));
          }else{
              callback()
          }
      };
    return {
        defaultProps: {
          children: 'children',
          label: 'label',
          disabled:function(data,node){
              if(data.children){
                  return true
              }
              return false
          }
        },
        // operatesModal:[],
        rules:{
            name: [
                { required: true, message: '请输入部门名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            no: [
                { required: true, message: '请输入工号', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            phone: [
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            email: [
                {  message: '请输入邮箱', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            orgId: [
                { validator: validatePid, trigger: "blur"}
            ],
            sex: [
                { required: true, message: '请选择性别', trigger: 'blur' }
            ],
            enable: [
                { required: true, message: '请选择状态', trigger: 'blur' }
            ],
        },
    };
  },

  watch:{
      "form.orgId"(val,oldval){
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
          this.form["orgId"] = this.$refs.tree.getCheckedKeys();
          console.log('form',this.form);
          
          this.$refs['form'].validate((valid) => {
            if (valid) {
                this.form["orgId"] = this.form.orgId.join();
                this.form['system'] = "XHSR-OPER";
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