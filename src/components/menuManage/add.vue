<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="medium">
    <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="菜单编码" prop="code">
        <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item label="排序码" prop="sortOrder">
        <el-input v-model.number="form.sortOrder"></el-input>
    </el-form-item>
    <el-form-item label="系统" prop="system">
        <system-select v-model="form.system"></system-select>
    </el-form-item>
    <el-form-item label="父菜单" prop="pid">
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
    <el-form-item label="菜单地址" prop="url">
        <el-input v-model="form.url"></el-input>
    </el-form-item>
    <!-- <el-form-item label="菜单图标" prop="img">
        <el-input v-model="form.img"></el-input>
    </el-form-item> -->
    
    <el-form-item label="状态" prop="enable">
        <el-radio-group v-model="form.enable">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
        </el-radio-group>
    </el-form-item>
    
    <el-form-item label="关联操作" prop="operates">
        <el-checkbox-group v-model="form.operates">
            <el-checkbox v-for="checkitem in allMenu" :key="checkitem.id" :label="checkitem.id" >{{checkitem.name}}</el-checkbox>
        </el-checkbox-group>
    </el-form-item>
    
    <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancle">取消</el-button>
    </el-form-item>
    </el-form>
</template>
<script>
import systemSelect from '../common/systemSelect'
import { mapState,mapGetters } from 'vuex'
export default {
  name: "",
  components: {
      systemSelect
  },
  computed:{
      filterTree:function(){
            let t = this.form.system;
            let res = this.filterSystem(this.permTree,t)
            return res
      }
  },
  props:{
        permTree:{
            type:Array,
            default:function(){
                return []
            }
        },
        form:{
            type:Object,
            default:function(){
                return {}
            }
        },
        allMenu:{
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
        // console.log('systemList',this.$systemList['zcj'])
  },
  data() {
    var validatePid = (rule, value, callback)=>{
        // console.log('validate',value)
          if(!this.form.pid.length){
              callback(new Error('请选择父权限'));
          }else{
              callback()
          }
      };
      var t = this
    return {
        defaultProps: {
          children: 'children',
          label: 'label',
          disabled:function(data,node){
              if(data.id === t.form.id){
                  return true
              }
              return false
          }
        },
        // operatesModal:[],
        rules:{
            name: [
                { required: true, message: '请输入菜单名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            code: [
                { required: true, message: '请输入菜单编码', trigger: 'blur' },
                { max: 40, message: '长度在40 个以内字符', trigger: 'blur' }
            ],
            sortOrder: [
                { required: true, message: '请输入排序码', trigger: 'blur' },
                { type: 'number', message: '排序码必须为数字值', trigger: 'blur'},
            ],
            operates: [
                // { required: true, message: '请选择关联操作', trigger: 'blur' },
            ],
            pid: [
                { validator: validatePid, trigger: "blur"}
            ],
            // img: [
            //     { validator: validatePid, trigger: "blur"}
            // ],
            url: [
                { required: true, message: '请输入菜单地址', trigger: 'blur'}
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
      handleClick(data,checked, node) {console.log('click')
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
                // let treeIds = this.$refs.tree.getCheckedKeys();
                this.form["pid"] = this.form.pid.join();
                let params = JSON.parse(JSON.stringify(this.form))
                // console.log('---',params)
                this.$emit("submitAddPerm",params)
                
                // this.$refs['form'].resetFields();
                // this.$refs.tree.setCheckedKeys([])
            } else {
                return false;
            }
            });
      },
      cancle(){
          this.$emit("close")
      },
      groupChange(){
          console.log('change',this.form.operates)
      },
  }
};
</script>
<style lang='less' scoped>
</style>