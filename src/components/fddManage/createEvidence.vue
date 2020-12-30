<template>
    <el-col :span="10">
        <el-row>
            <el-col :span="12">
                <div v-if="!this.btnWord">&nbsp;</div>
                <el-button v-if="this.btnWord" size="mini" @click="createCoverApp">{{btnWord}}</el-button>
            </el-col>
            <el-col :span="12">
                <span class="curstatus">{{curstatus}}</span>
            </el-col>
        </el-row>
    </el-col>
</template>
<script>
export default {
  name: "",
  components: {},
  props:{
        status:{
            type:String
        }
  },
  mounted() {
      
  },
  data() {
   
    return {
       
        
    };
  },

  computed:{
      btnWord:function(){
          if(!this.status){
              return "生成"
          }else if(this.status === "1007" || this.status === "1010" || this.status === "1002" || this.status === "1003" || this.status === "1004" || this.status === "1005" || this.status === "1008" || this.status === "1013" || this.status === "1015"){
              return "重新生成"
          }else{
              return ""
          }
      },
      curstatus:function(){
          if(!this.status){
              return ""
          }else if(this.status === "1007"){
              return "生成中"
          }else if(this.status === "1010" || this.status === "1002" || this.status === "1003" || this.status === "1004" || this.status === "1005" || this.status === "1008" || this.status === "1013" || this.status === "1015"){
              return "失败"
          }else if(this.status === "1012" || this.status === "1011" || this.status === "1000" || this.status === "1014"){
              return "成功"
          }
      }
  },
  methods: {
     
      onSubmit(){
          console.log('form',this.form);
          
          this.$refs['form'].validate((valid) => {
            if (valid) {
                // this.form["parentId"] = this.form.parentId.join();
                let params = JSON.parse(JSON.stringify(this.form))
                console.log('---',params)
                this.$emit("submitAddPerm",params)
                this.$refs['form'].resetFields();
                 this.$refs.form.setCheckedNodes([]);
            } else {
                return false;
            }
            });
        },
        createCoverApp(){
            this.$emit('createCoverApp')
        }
  }
};
</script>
<style lang='less' scoped>
.curstatus{
    color:#666;
    margin-left:20px;
}
</style>
