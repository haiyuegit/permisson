<template>
<div class="content">
    <el-form ref="form" :model="form" :rules="rules" class="editActWrap" label-width="180px" size="medium">

    <el-form-item label="发放平台" prop="platformType">
        {{form.platformType === 'DJR' ? '大金融平台' : '资产家平台'}}
        <!-- <el-radio-group v-model="form.platformType" :disabled="status === 'IN_PROGRESS' || status === 'EXPIRED'">
            <el-radio label="DJR">大金融平台</el-radio>
            <el-radio label="ZCJ">资产家平台</el-radio>
        </el-radio-group> -->
    </el-form-item>

    <el-form-item label="活动主题" prop="activityTheme">
        <el-input v-model="form.activityTheme" :disabled="status !== 'READY_ENABLE' || jumpType === 'view'" class="editActInput"></el-input>
    </el-form-item>
    <el-form-item label="活动时间" prop="selDate">
        <el-row class="row"> 
            <el-col :span="11">
                <el-date-picker
                    v-model="form.startTime"
                    :clearable=false
                    :disabled="status !== 'READY_ENABLE' || jumpType === 'view'"
                    :editable=false
                    placeholder="选择开始日期时间"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-col>
            <el-col :span="2" class="line">-</el-col>
            <el-col :span="11">
                <el-date-picker
                    v-model="form.endTime"
                    :clearable=false
                    :disabled="jumpType === 'view'"
                    :editable=false
                    placeholder="选择结束日期时间"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-col>
        </el-row>
    </el-form-item>
   
    <el-form-item label="参与人群" prop="partake">
        <!-- <el-checkbox-group v-model="form.partake" :disabled="status !== 'READY_ENABLE'">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox v-for="(val,key) in selectData.TergetPerson" :key="key" :label="key" >{{val}}</el-checkbox>
        </el-checkbox-group> -->
        <actCheckAll v-model="form.partake" :dis="jumpType === 'view'"></actCheckAll>
    </el-form-item>

    <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancle">取消</el-button>
    </el-form-item> -->
    </el-form>

    <p style="padding:10px 0">
        <el-button
            v-if="status === 'READY_ENABLE'"
            size="medium"
            @click="handleEdit('','add')">
                添加条件
            </el-button>
    </p>

    <el-table
        ref="permTable"
        v-loading="loading"
        :data="tbList.list"
        border
        style="width: 100%">
        <el-table-column
        label="参与终端"
        prop="participationTerminal"
        >
        </el-table-column>
        <el-table-column
        :show-overflow-tooltip=true
        label="邀请条件"
        prop="conditionType"
        >
            <template slot-scope="scope">
                {{getConditionType(scope.row)}}
            </template>
        </el-table-column>
        <el-table-column
        :show-overflow-tooltip=true
        label="每条件份数"
        prop="conditionAllNumber"
        width="100"
        >
            <template slot-scope="scope">
                {{scope.row.conditionAllNumber >-1 ? scope.row.conditionAllNumber : '不限'}}
            </template>
        </el-table-column>
        <el-table-column
        :show-overflow-tooltip=true
        label="每条件每人份数"
        prop="conditionPersonNumber"
        width="100"
        >
            <template slot-scope="scope">
                {{scope.row.conditionPersonNumber >-1 ? scope.row.conditionPersonNumber : '不限'}}
            </template>
        </el-table-column>
        <el-table-column
        :show-overflow-tooltip=true
        label="每日份数"
        prop="dayAllNumber"
        width="100"
        >
            <template slot-scope="scope">
                {{scope.row.dayAllNumber >-1 ? scope.row.dayAllNumber : '不限'}}
            </template>
        </el-table-column>
        <el-table-column
        :show-overflow-tooltip=true
        label="每日每人份数"
        prop="dayPersonNumber"
        width="100"
        >
            <template slot-scope="scope">
                {{scope.row.dayPersonNumber >-1 ? scope.row.dayPersonNumber : '不限'}}
            </template>
        </el-table-column>
        

        <el-table-column label="操作"
        width="370">
            <template slot-scope="scope">
                <el-button
                v-if="status === 'READY_ENABLE'"
                size="mini"
                @click="handleEdit(scope.row,'edit')">
                    编辑
                </el-button>
                <el-button
                v-if="operateBtns.EDIT"
                size="mini"
                @click="channelCodeView(scope.row)">
                    渠道码查看
                </el-button>
                <el-button
                    size="mini"
                    @click="handleView(scope.row)"
                >
                    奖品查看
                </el-button>
                <el-button
                    v-if="status === 'READY_ENABLE'"
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)"
                >
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <p class="editactBot">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancle">取消</el-button>
    </p>
    
    <el-dialog
        :visible.sync="channelVisiable"
        center
        custom-class="limit_dialog"
        title="渠道码查看"
        width="60%">
        <channelList 
            :channelCodeList="channelCodeList"
            @searchChannel="searchChannel"
        ></channelList>
    </el-dialog>
    <el-dialog
        :visible.sync="prizeDialogVisible"
        center
        title="奖品查看"
        width="50%">
        <xdetail :detailData="detailData"></xdetail>
    </el-dialog>
</div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import utils from '../../lib/utils.js'
import _selectData from '../../config/rewardSelectData.js'
import actCheckAll from '../../components/reward/actCheckAll'
import channelList from '../../components/reward/channelList'
import xdetail from '../../components/common/viewDialog'
export default {
  name: "",
  components: {
      actCheckAll,
      channelList,
      xdetail
  },
  computed:{
      detailData:function(){
        //   console.log('-=-=-=----===-=-',utils)
            if(!this.prizeDetail){
                return {}
            }
            var bak = {};
            let vl = this.getVl(this.prizeDetail.redPacketType)
            // console.log('vl',vl);
            for(let key in vl){
                if(key === "proportional"){
                    bak[vl[key]] = _selectData.Proportlist[this.prizeDetail[key]];
                }else if(key === "redPacketType"){
                    bak[vl[key]] = _selectData.redPacketType[this.prizeDetail[key]];
                }else if(key === 'redPacketValue'){
                    bak[vl[key]] = this.prizeDetail[key] / 100
                }else if(key === 'raiseInterestTime'){
                    bak[vl[key]] = utils.getUseScope(this.prizeDetail[key],"Dqlist")
                }else{
                    bak[vl[key]] = this.prizeDetail[key]
                }
            }
            return bak
        },
      ...mapState({
            operateBtns:'operateBtns'
        }),
  },
  props:{
  },
  created() {
    //   console.log('actData',this.$route.params.actData)
      let actData = this.$route.params.actData;
        this.form.platformType = actData.platformType || "DJR"
        this.activityId = actData.id
        this.form.id = this.activityId;
        this.form.activityTheme = actData.activityTheme;
        this.form.startTime = actData.startTime;
        this.form.endTime = actData.endTime;
        // this.form.selDate[1] = actData.endTime;
        this.form.partake = this.$route.params.tergetPerson;
        this.status = actData.activityStatus;
        this.getCondotionList({activityId:this.activityId,pageNum:1,pageSize:50})
        this.jumpType = this.$route.params.jumpType
        
  },
  data() {
    let dateValidate = (rule, value, callback) => {
        if(!this.form.startTime || !this.form.endTime){
            callback(new Error('请选择活动时间'));
        }
        let startTimeChuo = (new Date(this.form.startTime)).getTime();
        let endTimeChuo = (new Date(this.form.endTime)).getTime();
        if(startTimeChuo > endTimeChuo){
            callback(new Error('开始时间不能大于结束时间'));
        }
    }
    return {
        selectData:_selectData,
        tbList:{total:0,list:[]},
        loading:false,
        checkAll:false,
        channelVisiable:false,
        prizeDialogVisible:false,
        channelCodeList:[],
        prizeDetail:null,
        activityId:"",
        form:{
            selDate:[],
            partake:[],
            platformType:"DJR",
            startTime:"",
            endTime:""
        },
        rules:{
            platformType: [
                { required: true, message: '请选择系统', trigger: 'blur' }
            ],
            activityTheme: [
                { required: true, message: '请输入菜单名称', trigger: 'blur' },
                { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
            ],
            selDate: [{ required: true,validator: dateValidate, trigger: 'blur' }],
            partake: [{ type: 'array', required: true, message: '请选择参与人群', trigger: 'change' }],
        },
        status:"",
        jumpType:'view',
        
    };
  },
 
  methods: {
      async getCondotionList(params){
            this.loading = true
            let res = await this.$service.actQueryCondition(params)
            this.tbList = res || {total:0,list:[]};
            this.loading = false
      },
      async queryChannelCode(params){
            // this.loading = true
            let res = await this.$service.actQueryChannelCode(params)
            this.channelCodeList = (res?res.details : []);
            // this.loading = false
      },
      async queryPrize(params){
            // this.loading = true
            let res = await this.$service.actQueryPrize(params)
            this.prizeDetail = (res?res.details[0] : {});
            // this.loading = false
      },
      async deleteActivityCon(params){
            let res = await this.$service.actDeleteActivityCon(params)
            if(res){
                this.getCondotionList({activityId:this.from.id,pageNum:1,pageSize:50})
                this.$message.success('删除成功');
            }
      },
      getVl(pdetail){
          switch(pdetail){
            case "XJHB_LJ":
                return _selectData.xjhb_lj_viewList;
            case "XJHB_DQ":
                return _selectData.xjhb_dq_viewList;
            case "SYQ":
                return _selectData.syq_viewList;
            case "TXQ":
                return _selectData.txq_viewList;
            case "DJQ":
                return _selectData.djq_viewList;
            case "XNLP":
                return _selectData.xnlp_viewList;
            default :
                return []
          }
      },
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
                // this.$refs.tree.setCheckedKeys([])
            } else {
                return false;
            }
            });
      },
      cancle(){
          this.$router.push({name:"ACTIVITY_LIST"})
      },
      groupChange(){
          console.log('change',this.form.operates)
      },
      handleCheckAllChange(val) {
          console.log('val',val)
        this.checkedCities = val ? cityOptions : [];
      },
      channelCodeView(row){
          this.actConId = row.activityConditionId;
          this.channelVisiable = true;
          this.queryChannelCode({activityConditionId:row.activityConditionId})
      },
      searchChannel(name){
          this.queryChannelCode({
              activityConditionId:this.actConId,
              channelCode:name
          })
      },
      handleView(row){
        this.queryPrize({activityConditionId:row.activityConditionId})
        this.prizeDialogVisible = true;
      },
      handleDelete(row){
          console.log('delete')
          this.$confirm(`是否删除所选条件?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteActivityCon({activityConditionId:row.id})
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
      },
      handleEdit(row,type){
        let conId = this.activityId
        this.$router.push(
        {
            name:"EDIT_CONDITION",
            params:{
                id:conId,
                type:type,
                platformType:this.form.platformType
            }
        })
      },
      getConditionType(data){
        // var arr = 'backStep'],
        var _str = ""
        if(data.inviteActivity && data.inviteActivity === "YES"){
            _str = _selectData.conditionType_invit[data.conditionType];
        }else{
            _str = _selectData.conditionType[data.conditionType];
        }
		
		var _bak = ""
		if(data.productType){
			_str += "," + _selectData.useScopeAll[data.productType] + ","
		}
		if(data.totalOrSingle){
			_bak = data.totalOrSingle === "SINGLE"?"单笔投资金额":"累计投资金额"
			_str += _bak + "," ;
		}
		if(data.minMoney){
			_bak = data.minMoney/100 + "元 - " + (data.maxMoney?(data.maxMoney/100+"元"):"不限");
			_str += _bak + ","
		}
		if(data.totalMinMoney){
			_bak = data.totalMinMoney/100 + "元 - " + (data.totalMaxMoney?(data.totalMaxMoney/100+"元"):"不限");
			_str += _bak + ","
		}
		if(data.startTime){
			_bak = data.startTime +"月 - " + data.endTime + "月";
			_str += _bak + ","
		}
		
		if(data.backStep){
			_bak = data.backStep === "YES"?"折标":"不折标"
			_str += _bak;
		}

		// console.log('condition',_str)
		return _str
	}
  }
};
</script>
<style lang='less' scoped>
.editActWrap{
    width:80%
}
.editActInput{
    width:400px
}
.line{
    text-align:center;
    color:#999;
}
.row{
    width:480px;
}
.editactBot{
    text-align: center;
    padding:10px 0;
}
</style>