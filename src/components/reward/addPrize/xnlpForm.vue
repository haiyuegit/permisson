<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="medium">
    <el-form-item label="礼品名称" prop="giftClassId">
        <el-select v-model="form.giftClassId" placeholder="请选择">
            <el-option
            v-for="item in giftClasses"
            :key="item.giftClassId"
            :label="item.giftClassName"
            :value="item.giftClassId">
            </el-option>
        </el-select>
        <span class="kucun">提示：库存量为{{kucun}}件</span>
    </el-form-item>
    <el-form-item label="品类编号">
        <el-input v-model="form.giftClassCode" disabled></el-input>
    </el-form-item>
   
    <el-form-item label="礼品数量" prop="number">
        <el-input v-model.number="form.number"></el-input>
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
  inject:{
    conditionData:{
        default:'conditionData'
    },
    xnPrizeLists:{
        default:'xnPrizeLists'
    }
  },
  watch:{
      "form.giftClassId" : function(val,old){
          let res = this.giftClasses.filter(item=>{
              return item.giftClassId === val
          })
          this.kucun = res[0].giftNumber;
          this.form.giftClassCode = res[0].giftClassCode;
          this.form.giftClassName = res[0].giftClassName;
      }
  },
    
  props:{
        form:{
            giftClassId:''
            // operates:[]
        },
        giftClasses:{
            type:Array,
            default:function(){
                return []
            }
        }
  },
  mounted(){
        // this.form["useScope"] = "SB"
    },
  data() {
   
    return {
        rules:{
            // giftClassCode: [
            //     { required: true, message: '请输入部门名称', trigger: 'blur' },
            //     { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            // ],
            giftClassId: [
                { required: true, message: '请选择礼品', trigger: 'blur' },
            ],
            number: [
                { required: true, message: '请输入数量', trigger: 'blur' },
                // { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
                { type: 'number', message: '数量必须为数字值', trigger: 'blur'}
            ],
            
        },
        kucun:0
    };
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
.kucun{
    margin-left:5px;
    color:red;
    font-size:12px;
}
</style>