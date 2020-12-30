<template>
<div class="content">
<el-form ref="form" :model="form" :rules="rules" class="editConWrap" label-position="right" label-width="110px" size="medium">
    <div class="condition_title">
        <h2>添加条件</h2>
    </div>
    <div class="condition_show">
        <el-row>
            <el-col :span="8">平台名称：{{this.preData.platformType === 'ZCJ' ? '资产家' : '大金融'}}</el-col>
            <el-col :span="8">活动编码：{{this.preData.activityCode}}</el-col>
            <el-col :span="8">活动主题：{{this.preData.activityTheme}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">参与用户：{{this.preData.tergetPerson | rewardTargePerson}}</el-col>
            <el-col :span="16">活动时间：{{this.preData.activityStartTime}} - {{this.preData.activityEndTime}}</el-col>
        </el-row>
    </div>
    <div class="condition_title">
        <h2>选择条件</h2>
    </div>

    <el-form-item label="参与终端" prop="participationTerminal">
        <el-checkbox-group v-model="form.participationTerminal">
            <el-checkbox v-for="ter in terminal" :key="ter" :label="ter" :value="ter">{{ter}}</el-checkbox>
        </el-checkbox-group>
    </el-form-item>

    <el-form-item label="邀请活动" prop="inviteActivity">
        <el-radio-group v-model="form.inviteActivity">
            <el-radio label="YES">是</el-radio>
            <el-radio label="NO">否</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item v-if="form.inviteActivity === 'NO'" label="行为条件" prop="conditionType">
        <el-radio-group v-model="form.conditionType">
            <el-radio v-for="(key,val) in selectData.conditionType" :key="key" :label="val" :value="val">{{key}}</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item v-if="form.inviteActivity === 'YES'" label="行为条件" prop="conditionType_invit">
        <el-radio-group v-model="form.conditionType_invit">
            <el-radio v-for="(key,val) in selectData.conditionType_invit" :key="key" :label="val" :value="val">{{key}}</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-card v-if="isShowProduct" class="product_card">
        <el-row>
            <el-col :span="12">
                <el-form-item label="产品名称" prop="productType">
                    <el-select v-model="form.productType" placeholder="请选择产品">
                        <el-option v-for="(val,key) in productList" :key="key" :label="val" :value="key"></el-option>
                        <!-- <el-option label="大金融" value="djr"></el-option> -->
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资金额" prop="totalOrSingle">
                    <el-select v-model="form.totalOrSingle" placeholder="请选择产品">
                        <el-option label="单笔投资金额" value="SINGLE"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="金额区间(元)" prop="productType">
                    <el-input v-model="form.minMoney" class="money_input"></el-input>
                    至
                    <el-input v-model="form.maxMoney" class="money_input"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="投资期限(月)" prop="totalOrSingle">
                    <el-input v-model="form.startTime" class="money_input"></el-input>
                    至
                    <el-input v-model="form.endTime" class="money_input"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col>
                <el-form-item label="是否折标" prop="productType">
                    <el-radio-group v-model="form.backStep" placeholder="请选择产品">
                        <el-radio label="YES">是</el-radio>
                        <el-radio label="NO">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
        </el-row>
         
    </el-card>

    <el-form-item label="扣除红包" prop="excludeRedPacket">
        <el-radio-group v-model="form.excludeRedPacket">
            <el-radio label="">无</el-radio>
            <el-radio label="INVESTDEDUCT">按投资金额扣除使用红包</el-radio>
            <el-radio label="INCOMEDEDUCT">按收益金额百分比扣除使用红包</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item label="奖励渠道码">
        <el-upload
            ref="upload"
            :disabled="form.channelType === 'ALL'"
            :file-list="fileList"
            :http-request="submitUpload"
            :on-change="handleChange"
            accept=".jpg"
            action="http://10.167.201.40:85/dfs/http/api/upload/normal/single"
            class="upload-demo"
            >
                <el-button slot="trigger" :disabled="form.channelType === 'ALL'" size="mini" type="primary">选取文件</el-button>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadImg">上传</el-button> -->
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg文件</div> -->
            </el-upload>
    </el-form-item>

    <el-form-item label="" prop="channelType">
        <el-radio-group v-model="form.channelType">
            <el-radio label="ALL">全渠道</el-radio>
            <el-radio label="BELONG">所属渠道</el-radio>
            <el-radio label="NOT_BELONG">过滤渠道</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item label="互斥活动ID" prop="channelType">
        <el-select v-model="form.mutuallyCondition_bak" placeholder="请选择产品" @change="channelChange">
            <el-option label="请选择互斥活动ID" value=""></el-option>
            <el-option v-for="item in hcActivityIds" :key="item.activityId" :label="item.activityCode" :value="item.activityId"></el-option>
        </el-select>
        <span class="huchiRemark">备注：活动奖励冲突时，优先发选中的互斥活动所配置的奖励。</span>
    </el-form-item>

    <div class="condition_title">
        <h2>奖品限制</h2>
    </div>

    <el-row :gutter="30" class="prizeLimit">
        <el-col :span="10">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>每个条件</span>
                </div>
                <el-form-item label="奖品份数" label-width="80px" prop="conditionAllNumber">
                    <prizeCondition v-model="form.conditionAllNumber"></prizeCondition>
                </el-form-item>
                <el-form-item label="每人份数"  label-width="80px" prop="conditionPersonNumber">
                    <prizeCondition v-model="form.conditionPersonNumber"></prizeCondition>
                </el-form-item>
            </el-card>
        </el-col>
        <el-col :span="10">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>每日条件</span>
                </div>
                <el-form-item label="奖品份数"  label-width="80px" prop="dayAllNumber">
                    <prizeCondition v-model="form.dayAllNumber"></prizeCondition>
                </el-form-item>
                <el-form-item label="每人份数"  label-width="80px" prop="dayPersonNumber">
                    <prizeCondition v-model="form.dayPersonNumber"></prizeCondition>
                </el-form-item>
            </el-card>
        </el-col>
    </el-row>

    <div class="condition_title">
        <h2>奖品配置</h2>
    </div>
    
    <el-form-item label="选择奖品类型" prop="prize">
        <el-radio-group v-model="form.prize">
            <el-radio v-for="(key,val) in selectData.redPacketType" :key="key" :label="val" :value="val">{{key}}</el-radio>
        </el-radio-group>
    </el-form-item>
    
    <prizeSelTab :giftClasses="xnPrizeList" :type="form.prize" v-on:getPrizeList="getPrizeList"></prizeSelTab>

    <el-form-item style="margin-top:20px;">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="back">返回</el-button>
    </el-form-item>
    
</el-form>

    <el-dialog
    :visible.sync="selectCondtionVisible"
    center
    custom-class="limit_dialog"
    title="行为条件"
    width="60%">
    <xmutuallyPop 
        ref="addForm"
        
        :activityId="mutuallyId"
        v-on:selectConditionType="selectConditionType"
    ></xmutuallyPop>
    </el-dialog>
</div>
</template>
<script>
import xmutuallyPop from '../../components/reward/mutuallyActivity'
import prizeCondition from '../../components/reward/prizeCondition'
import prizeSelTab from '../../components/reward/prizeSelTab'
import utils from '../../lib/utils.js'
export default {
    name: '',
    components:{
        xmutuallyPop,
        prizeCondition,
        prizeSelTab
    },
    data () {
        return {
            activityId:"",
            type:"add",
            // selectData:_selectData,
            preData:{},
            xnPrizeList:[],
            productList:[],
            hcActivityIds:[],
            terminal:["pc",'APP'],
            fileList:[],
            mutuallyId:"",//行为条件activityId
            selectCondtionVisible:false,//行为条件弹框
            form:{
                inviteActivity:"YES",
                conditionType:"REGISTER",
                conditionType_invit:"REGISTER",
                excludeRedPacket:"",
                channelType:"ALL",
                mutuallyCondition:"",
                conditionAllNumber:'',
                conditionPersonNumber:'',
                dayAllNumber:'',
                dayPersonNumber:'',
                prize:'DJQ',
                participationTerminal:[],
                prizeList:[]
            },
            rules:{
                participationTerminal: [
                    { required: true, message: '请选择参与终端', trigger: 'blur' }
                ],
                inviteActivity: [
                    { required: true, message: '请选择邀请活动', trigger: 'blur' }
                ],
                conditionType: [
                    { required: true, message: '请选择行为条件', trigger: 'blur' }
                ],
                conditionType_invit: [
                    { required: true, message: '请选择行为条件', trigger: 'blur' }
                ],
                productType: [
                    { required: true, message: '请选择产品', trigger: 'blur' }
                ],
                totalOrSingle: [
                    { required: true, message: '请选择投资金额', trigger: 'blur' }
                ],
                conditionAllNumber:[
                    { required: true, message: ' ', trigger: 'change' },
                ],
                conditionPersonNumber:[
                    { required: true, message: ' ', trigger: 'change' },
                ],
                dayAllNumber:[
                    { required: true, message: ' ', trigger: 'change' },
                ],
                dayPersonNumber:[
                    { required: true, message: ' ', trigger: 'change' },
                ],

                activityTheme: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
                ],
                // selDate: [{ required: true,validator: dateValidate, trigger: 'blur' }],
                partake: [{ type: 'array', required: true, message: '请选择参与人群', trigger: 'change' }],
            },
        }
    },
    provide(){
        return {
            conditionData:this.form,
            xnPrizeList:this.xnPrizeList
        }
    },
    created() {
        let params = this.$route.params;
        this.activityId = "reward-configurator-webid2018111310571930800000000003d3";//params.id;
        this.type = 'add'; //params.type;
        this.platformType = 'ZCJ' //params.platformType
        this.productList = this.selectData.productUseScopelist[this.platformType];
    },
    mounted() {
        this.actToAddCondition({
            activityId:this.activityId
        });
    },
    computed: {
        isShowProduct:function(){
            let conditionType = (this.form.inviteActivity === "NO" && this.form.conditionType) || (this.form.inviteActivity === "YES" && this.form.conditionType_invit);
            
            if (conditionType === "FIRST_INVESTMENT" || conditionType === "TWO_INVESTMENT" || conditionType === "INVESTMENT" || conditionType === "SINGLE_INVESTMENT" || conditionType === "SINGLE_INVESTMENT_RESIDUE" || conditionType === "FRIEND_FIRST_INVESTMENT" || conditionType === "FRIEND_TWO_INVESTMENT" || conditionType === "FRIEND_INVESTMENT"){
                return true
            }
            return false
        }
    },
    methods: {
        async actToAddCondition(params){
            this.loading = true
            let res = await this.$service.actToAddCondition(params)
            if(res){
                this.preData = res;
                this.xnPrizeList = JSON.parse(JSON.stringify(res.giftClasses));
                this.hcActivityIds = res.hcActivityIds
            }
            this.loading = false
        },

        async addCondition(params){
            this.loading = true
            let res = await this.$service.addActivityCondition(params)
            if(res){
                this.preData = res;
                this.hcActivityIds = res.hcActivityIds
            }
            this.loading = false
        },
        async uploadImg(){
            // if(!this.dfsUrl){
            //     this.$message.error("请先选取文件");
            //     return 
            // }
            // let params = {
            //     dfsToken:this.dfsToken,
            //     debtNo:this.debtNo,
            //     dfsUrl:this.dfsUrl,
            //     resourcesType:'5'
            // }
            // let res = await this.$service.caseResourcesCreate(params)
            
            // if(res){
            //     this.$message.success("上传成功")
            // }
            
        },
        submitUpload(){

        },
        handleChange(){

        },
        channelChange(val){
            val && (this.selectCondtionVisible = true);
            this.mutuallyId = val
        },
        selectConditionType(data){
            // console.log('commit',data);
            this.form.mutuallyCondition = data;
            this.selectCondtionVisible = false;
        },
        onSubmit(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    // this.form['prizeList'] = 
                    let params = JSON.parse(JSON.stringify(this.form))
                    // let res = utils.objectToFormData(params)
                    console.log('---',params)
                    this.addCondition(params)
                    // this.$emit("submit",params)
                    // this.$refs['form'].resetFields();
                } else {
                    return false;
                }
            });
        },
        back(){

        },
        getPrizeList(data){
            console.log('getprizelist',data)
            this.form.prizeList = data
        }
    }
}
</script>
<style lang='less' scoped>
.condition_title{
    padding:10px 0;
    border-bottom:1px solid #eceff8;
    h2{
        border-left:2px solid #42aafa;
        text-indent:6px;
        font-size:16px;
    }
}
.condition_show{
    padding:5px;
    color:#666;
    .el-row{
        padding:10px 0;
    };
    
}
.el-form-item{
    margin-bottom:5px;
}
.editConWrap{
    .el-radio{
        line-height:36px;
    }
}
.money_input{
    width:40%
}
.product_card{
    .el-row{
        padding:5px 0;
    }
}
.el-upload__tip{
    display:inline-block;
    margin:0 0 0 10px;
}
.huchiRemark{
    font-size:12px;
    color:#0089f0;
    vertical-align: bottom;
    margin-left:10px;
}
.prizeLimit{
    padding:10px
}
</style>