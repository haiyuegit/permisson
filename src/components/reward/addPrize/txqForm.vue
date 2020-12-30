<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="medium">
    
    <el-form-item label="提现券面值(元)" prop="forwardredPacketValue">
        <el-input v-model="form.forwardredPacketValue"></el-input>
    </el-form-item>

    <el-form-item label="有效期(天)" prop="validaty">
        <el-input v-model="form.validaty"></el-input>
    </el-form-item>

    <el-form-item label="数量" prop="number">
        <el-input v-model.number="form.number"></el-input>
    </el-form-item>

    <el-form-item label="使用终端" prop="terminalType">
        <el-select v-model="form.terminalType" multiple placeholder="请选择">
            <el-option
            v-for="item in zhongduan"
            :key="item"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
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
    }
  },
    
  computed:{
       
    jineList:function(){
        let conditionType = (this.conditionData.inviteActivity === "YES" ? this.conditionData.conditionType_invit : this.conditionData.conditionType);
        let excludeRedPacket = this.conditionData.excludeRedPacket;
        let productVal = this.conditionData.productType;
        let optionList = [];
        if(conditionType === "REGISTER" || conditionType === "OPEN_BANK" || conditionType === "LOGIN" || conditionType === "RECHARGE" || conditionType === "WITHDRAW"){
            optionList = this.selectData.ProportXWlist
        }else if(!excludeRedPacket){
            if(productVal === "SB"){
                optionList = this.selectData.ProportTZlist
            }else{
                optionList = this.selectData.Proportlist
            }
        }else if(excludeRedPacket === "INVESTDEDUCT"){
            // if(productVal === "SB"){
                optionList = this.selectData.ProportTZlist
            // }else{
            //     optionList = this.selectData.Proportlist
            // }
        }else if(excludeRedPacket === "INCOMEDEDUCT"){
            if(productVal === "SB"){
                optionList = []
            }else{
                optionList = this.selectData.ProportSYlist
            }
            
        }else{
            optionList = this.selectData.Proportlist
        }
        return optionList
      }
  },
  
  props:{
        form:{
            // operates:[]
        },
  },
  mounted(){
    //   console.log('---conditionData',this.conditionData)
        // this.form["useScope"] = "SB"
        // console.log('mounted',this.$parent)
    },
  data() {
    return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        zhongduan:['pc','app'],
        rules:{
            forwardredPacketValue: [
                { required: true, message: '请输入提现券面值', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            validaty: [
                { required: true, message: '请输入有效期', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            number: [
                { required: true, message: '请输入数量', trigger: 'blur' },
                // { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
                { type: 'number', message: '数量必须为数字值', trigger: 'blur'}
            ],
            terminalType: [
                { required: true, message: '请选择使用终端', trigger: 'blur' }
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