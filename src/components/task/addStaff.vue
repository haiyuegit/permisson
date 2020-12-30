<template>
    <div>
        <listSelect 
            v-model="staffData"
            :loading="lsLoading"
            :staffList="staffList"
            :tagId="tagId"
            :type="type"
            @lsGetData="getData"
            @lssearchQuery="lssearchQuery"
        ></listSelect>
        <div class="sel_bottom">
            <el-button type="primary" @click="onSubmits">确定</el-button>
            <el-button @click="cancle">取消</el-button>
        </div>
        
    </div>
</template>
<script>
import listSelect from '../common/listSelect'
export default {
  name: "",
  components: {
      listSelect:listSelect
  },
  props:{
    appIds:{
        type:Array,
        default:function(){
            return []
        }
    },
    tagId:"",
    type:"",
    form:{
        appId:[]
    },
  },
  
  mounted() {

  },
  
  data() {
    return {
        staffData:[],
        staffList:[],
        pageNo:0,
        staffName:"",
        lsLoading:false,
        pageSize:20
    };
  },

  methods: {
      async getStaff(params){
        this.lsLoading = true
        let res = await this.$service.queryAccountList({pageSize:this.pageSize,...params})
        this.staffList = res.list;
        this.lsLoading = false
      },
      onSubmits(){
          this.$emit('selStaffTag',this.staffData)
          this.$emit("close")
      },
      cancle(){
          this.$emit("close")
      },
      lssearchQuery(data){
          this.pageNo = 1;
          this.staffName = data
          this.getStaff({
              pageNum:this.pageNo,
              name:data
          }) 
      },
      getData(){
          let params={
              pageNum:this.pageNo++,
              name:this.StaffName
          }
          this.getStaff(params) 
      },
      setStaffData(arr){
          this.staffData = arr
      }
  }
};
</script>
<style lang='less' scoped>
.sel_bottom{
    padding:20px 10px 10px;
    text-align: center;
}
</style>