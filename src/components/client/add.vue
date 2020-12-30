<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" size="medium">
    <el-form-item label="客户端名称" prop="clientId">
        <el-input v-model="form.clientId"></el-input>
    </el-form-item>
    <el-form-item label="访问令牌有效期(秒)" prop="accessTokenValidity">
        <el-input v-model.number="form.accessTokenValidity"></el-input>
    </el-form-item>
    <el-form-item label="刷新令牌有效期(秒)" prop="refreshTokenValidity">
        <el-input v-model.number="form.refreshTokenValidity"></el-input>
    </el-form-item>
    
    <el-form-item label="客户端密钥" prop="secret">
        <el-input v-model="form.secret"></el-input>
    </el-form-item>
    
    <el-form-item label="状态" prop="enable">
        <el-radio-group v-model="form.enable">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
        </el-radio-group>
    </el-form-item>
    
    <el-form-item label="授权类型" prop="grantTypeSet">
        <el-checkbox-group v-model="form.grantTypeSet" @change="groupChange">
            <el-checkbox v-for="checkitem in grantType" :key="checkitem.id" :label="checkitem.id" >{{checkitem.name}}</el-checkbox>
        </el-checkbox-group>
    </el-form-item>
    <el-form-item label="说明" prop="explain">
        <el-input v-model="form.explain"></el-input>
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
        grantType:{
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
  },
  data() {
   
    return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        // operatesModal:[],
        rules:{
            clientId: [
                { required: true, message: '请输入客户端名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            accessTokenValidity: [
                { required: true, message: '请输入访问令牌有效期', trigger: 'blur' },
                { type: 'number', message: '访问令牌有效期必须为数字值', trigger: 'blur'}
            ],
            refreshTokenValidity: [
                { required: true, message: '请输入刷新令牌有效期', trigger: 'blur' },
                { type: 'number', message: '刷新令牌有效期必须为数字值', trigger: 'blur'},
            ],
            explain: [
                // { required: true, message: '请选择说明', trigger: 'blur' },
                { max: 100, message: '长度在100个以内字符', trigger: 'blur' }
            ],
            
            secret: [
                { required: true, message: '请输入客户端密钥', trigger: 'blur'}
            ],
            grantTypeSet: [
                { required: true, message: '请选择授权类型', trigger: 'blur' }
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
  
  methods: {
      onSubmit(){
          
          this.$refs['form'].validate((valid) => {
            if (valid) {
                let params = JSON.parse(JSON.stringify(this.form))
                // console.log('---',params)
                this.$emit("submitAddPerm",params)
                
                // this.$refs['form'].resetFields();
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