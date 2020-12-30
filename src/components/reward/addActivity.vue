<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="medium">
        <el-form-item label="发放平台" prop="platformType">
            <el-radio-group v-model="form.platformType">
                <el-radio label="DJR">大金融平台</el-radio>
                <el-radio label="ZCJ">资产家平台</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="活动主题" prop="activityTheme">
            <el-input v-model="form.activityTheme"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="selDate">
            <el-date-picker
            v-model="form.selDate"
            end-placeholder="结束日期"
            range-separator="-"
            
            start-placeholder="开始日期"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
        </el-form-item>
    
        <el-form-item label="参与人群" prop="partake">
            <actCheckAll v-model="form.partake"></actCheckAll>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="cancle">取消</el-button>
        </el-form-item>
        </el-form>

</template>
<script>
import { mapState,mapGetters } from 'vuex'
// import selectData from '../../config/rewardSelectData.js'
import actCheckAll from '../../components/reward/actCheckAll'
import channelList from './channelList'
export default {
  name: "",
  components: {
      actCheckAll,
      channelList
  },
  computed:{
      
  },
  props:{
       
        form:{
            partake:[],
        },
        
  },
  mounted() {
    //  this.checkOptions = Object.keys(selectData.TergetPerson)
  },
  data() {
    let dateValidate = (rule, value, callback) => {
        if(!value.length){
            callback(new Error('请选择活动时间'));
        }
    }
    let partakeValidate = (rule, value, callback) => {
        setTimeout(()=>{
            // console.log('-------',this.form.partake)
            if(!this.form.partake.length){
                callback(new Error('请选择参与人群'));
            }
        })
        
        
    }
    return {
        // selectData:selectData,
        checkAll:true,
        isIndeterminate:true,
        rules:{
            platformType: [
                { required: true, message: '请选择系统', trigger: 'blur' }
            ],
            activityTheme: [
                { required: true, message: '请输入菜单名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            selDate: [{ required: true,validator: dateValidate, trigger: 'blur' }],
            // partake: [{ type: 'array', required: true, message: '请选择参与人群', trigger: 'change' }],
            partake: [{ required: true,validator: partakeValidate, trigger: 'change' }],
        },
        
    };
  },
 
  methods: {
      
      onSubmit(){
          console.log('form',this.form)
          
          let params = {
              startTime:this.form.selDate[0],
              endTime:this.form.selDate[1],
              tergetPerson:this.form.partake.join(','),
              ...this.form
          }
          this.$refs['form'].validate((valid) => {
            if (valid) {
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
      handleCheckAllChange(val){
          this.form.partake = val ? this.checkOptions : [];
          this.isIndeterminate = true;
      }
  }
};
</script>
<style lang='less' scoped>
</style>