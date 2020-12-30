<template>
<div class="content">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="medium">
    
    <el-form-item label="发放平台" prop="activityPlatform">
        <el-radio-group v-model="form.activityPlatform">
            <el-radio label="DJR">大金融平台</el-radio>
            <el-radio label="ZCJ">资产家平台</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item label="发放形式" prop="givePrizeWayput">
        <el-radio-group v-model="form.givePrizeWayput">
            <el-radio label="SDFF">手动发放</el-radio>
            <el-radio label="JYHD">基于活动发放</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item label="活动主题" prop="activityTheme">
        <el-input v-model="form.activityTheme"></el-input>
    </el-form-item>

    <el-form-item label="选择奖品类型" prop="prize">
        <el-radio-group v-model="form.prize">
            <el-radio v-for="(key,val) in selectData.redPacketType" :key="key" :label="val" :value="val">{{key}}</el-radio>
        </el-radio-group>
    </el-form-item>

    <prizeSelTab :giftClasses="xnPrizeList" :listdata="listdata" :type="form.prize" v-on:getPrizeList="getPrizeList"></prizeSelTab>
    

    <el-form-item style="margin-top:20px;">
        <el-button type="primary" @click="onSubmit">发放</el-button>
    </el-form-item>
    </el-form>
    </div>
</template>

<script>
// import selectAll from '../../common/selectAll'
import prizeSelTab from '../../components/reward/prizeSelTab'
export default {
  name: "",
  components: {
    //   selectAll
    prizeSelTab
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
        
        giftClasses:{
            type:Array,
            default:function(){
                return []
            }
        }
  },
  mounted(){
        // this.actToAddCondition({})
        let param = this.$route.params;
        if(param.activityId){
            this.form.givePrizeWayput = "JYHD";
            this.queryTopicAct({activityId:param.activityId})
            this.actToAddCondition({activityId:param.activityId})
        }else{
            this.form.givePrizeWayput = "SDFF"
        }
    },
  data() {
   
    return {
        rules:{
            activityPlatform: [
                { required: true, message: '请选择发放平台', trigger: 'blur' },
            ],
            givePrizeWayput: [
                { required: true, message: '请选择发放形式', trigger: 'blur' },
            ],
            activityTheme: [
                { required: true, message: '请输入活动主题', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            
        },
        form:{
            // operates:[]
            activityPlatform:"DJR",
            prize:'DJQ',
        },
        xnPrizeList:[],
        listdata:[]
    };
  },

  methods: {
      async actToAddCondition(params){
            let res = await this.$service.queryMutuaPrize(params)
            if(res && res.details){
                this.form.prize = res.details[0].redPacketType;
                this.listdata = res.details
            }
        },
        async givePrizeSave(params){
            let res = await this.$service.givePrizeSave(params);
            if(res){
                this.$message.success("发放成功")
            }else{
                this.$message.error("发放失败")
            }
        },
        async queryTopicAct(params){
            let res = await this.$service.queryTopicAct(params)
            if(res){
                this.form.activityPlatform = res.result.platformType
                this.form.activityTheme = res.result.activityTheme
            }
        },
      onSubmit(){
          this.$refs['form'].validate((valid) => {
            if (valid) {
                let params = JSON.parse(JSON.stringify(this.form))
                this.givePrizeSave(params);
                // this.$emit("submit",params)
                // this.$refs['form'].resetFields();
            } else {
                return false;
            }
            });
        },
        getPrizeList(data){
            console.log('getprizelist',data)
            this.form.prizeList = data
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