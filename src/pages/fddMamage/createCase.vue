<template>
    <div class="content" style="padding-top:60px">
        <el-card class="box-card case_card" size="medium">
            <div slot="header" class="clearfix">
                <span>申请人</span>
            </div>
            <el-table
            ref="permTable"
            :data="applicantList"
            border
            size="medium"
            style="width: 100%">
            
                <el-table-column
                label="企业名称"
                prop="name"
                width="120"
                >
                </el-table-column>
            
                <el-table-column
                label="企业营业执照"
                prop="idCard"
                width="160">
                </el-table-column>

                <el-table-column
                label="法人姓名"
                prop="legalName"
                width="90">
                </el-table-column>

                <el-table-column
                label="联系人手机号"
                prop="mobile"
                width="160">
                </el-table-column>

                <el-table-column
                :show-overflow-tooltip=true
                label="邮箱"
                prop="email"
                width="160">
                </el-table-column>
                
                <el-table-column
                label="联系地址"
                prop="menuSystem"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.address + scope.row.addressDetail}}</span>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>

        <el-card class="box-card case_card" size="medium">
            <div slot="header" class="clearfix">
                <span>代理人</span>
            </div>
            <el-table
            ref="permTable"
            :data="agentList"
            border
            size="medium"
            style="width: 100%">
            
                <el-table-column
                label="姓名"
                prop="name"
                width="80"
                >
                </el-table-column>
            
                <el-table-column
                label="身份证号"
                prop="identityNo"
                width="160">
                </el-table-column>

                <el-table-column
                label="手机号码"
                prop="mobile"
                width="120">
                </el-table-column>

                <el-table-column
                :show-overflow-tooltip=true
                label="邮箱"
                prop="email"
                width="160">
                </el-table-column>

                <el-table-column
                label="联系地址"
                prop="coverApplicantAddress"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.address + scope.row.addressDetail}}</span>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>

        <el-card class="box-card case_card" size="medium">
            <div slot="header" class="clearfix">
                <span>被申请人</span>
            </div>
            <el-table
            ref="permTable"
            :data="coverApplicant"
            border
            size="medium"
            style="width: 100%">
            
                <el-table-column
                label="姓名"
                prop="coverApplicantName"
                width="80"
                >
                </el-table-column>
            
                <el-table-column
                label="身份证号"
                prop="coverApplicantIDNumber"
                width="160">
                </el-table-column>

                <el-table-column
                label="手机号码"
                prop="coverApplicantMobile"
                width="120">
                </el-table-column>

                <el-table-column
                :show-overflow-tooltip=true
                label="邮箱"
                prop="coverApplicantMail"
                width="160">
                </el-table-column>

                <el-table-column
                label="联系地址"
                prop="coverApplicantAddress"
                >
                </el-table-column>
                
                <el-table-column
                label="操作"
                prop="menuSystem"
                width="120">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="createCoverApp('1')">生成证据</el-button>
                </template>
                </el-table-column>

            </el-table>
        </el-card>

        <el-card class="box-card case_card" size="medium">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <el-table
            ref="permTable"
            :data="coverApplicant"
            border
            size="medium"
            style="width: 100%">
            
                <el-table-column
                :class-name="caseNameStatus?'':'caseError'"
                label="案件名称"
                prop="caseName"
                width="200"
                >
                    <template slot-scope="scope">
                        <el-input 
                            v-model="scope.row.caseName" 
                            maxlength="20"
                            @blur="checkCase('caseName','caseNameStatus')"
                        ></el-input>
                        <!-- <el-button
                        size="mini"
                        v-if="operateBtns.VIEW"
                        @click="handleView(scope.$index, scope.row)">查看</el-button> -->
                    </template>
                </el-table-column>
            
                <el-table-column
                :class-name="disputeFeeStatus?'':'caseError'"
                label="请求总金额"
                prop="disputeFee"
                width="200">
                    <template slot-scope="scope">
                        <el-input 
                            v-model="scope.row.disputeFee"
                            @blur="checkCase('disputeFee','disputeFeeStatus')"
                        ></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                :class-name="reasonStatus?'':'caseError'"
                label="事实与理由"
                prop="reason">
                    <template slot-scope="scope">
                        <el-input 
                            v-model="scope.row.reason"
                            maxlength="20"
                            @blur="checkCase('reason','reasonStatus')"
                        ></el-input>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>

        <el-card class="box-card case_card cailiao" size="medium">
            <div slot="header" class="clearfix">
                <span>证据材料</span>
            </div>
            <div>
                <el-row class="cl_row">
                    <el-col :span="14">新网银行付款凭证</el-col>
                    <createEvidence :status="resource3" v-on:createCoverApp="createCoverApp('3')"></createEvidence>
                </el-row>
                <el-row class="cl_row">
                    <el-col :span="14">债权转让协议</el-col>
                    <createEvidence :status="resource4" v-on:createCoverApp="createCoverApp('4')"></createEvidence>
                </el-row>
                <el-row class="cl_row">
                    <el-col :span="14">债权转让邮件通知</el-col>
                    <createEvidence :status="resource5" v-on:createCoverApp="createCoverApp('5')"></createEvidence>
                </el-row>
                <el-row class="cl_row">
                    <el-col :span="14">还款计划</el-col>
                    <createEvidence :status="resource6" v-on:createCoverApp="createCoverApp('6')"></createEvidence>
                </el-row>
                <el-row class="cl_row">
                    <el-col :span="14">债权转让提前到期的送达证明</el-col>
                    <el-col :span="10">
                        <el-upload
                        ref="upload"
                        :file-list="fileList"
                        
                        :http-request="submitUpload"
                        :on-change="handleChange"
                        accept=".jpg"
                        action="http://10.167.201.40:85/dfs/http/api/upload/normal/single"
                        class="upload-demo"
                        >
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button size="small" style="margin-left: 10px;" type="success" @click="uploadImg">上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg文件</div>
                        </el-upload>
                    </el-col>
                </el-row>
            </div>
        </el-card>

        <div class="cc_bottom">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="cancle">取消</el-button>
        </div>
    </div>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
import createEvidence from '../../components/fddManage/createEvidence'

export default {
    name: 'APPLICANT_CREATECASE',
    components:{
        createEvidence: createEvidence
    },
    data () {
        return {
            debtNo:"",
            pageNum: 1,
            pageSize:10,
            menuManageList:{
                totalPage:0,
                list:[]
            },
            agentList:[],
            coverApplicant:[],
            applicantList:[],
            fileList:[],
            resource3:"",
            resource4:"",
            resource5:"",
            resource6:"",
            headSet:{
                // Accept: 'application/json, text/plain, */*',
                // 'Content-Type': false,
                // dataType: "JSON",
            },
            dfsUrl:"",
            caseNameStatus:true,
            disputeFeeStatus:true,
            reasonStatus:true
        }
    },
    computed:{
        menuList:function(){ 
            let pdata = this.menuManageList.list
            if(!pdata.length){
                return this.menuManageList.list
            }else{
                return this.dataTolist(this.menuManageList.list)
            }
            
        },
        
    },
    created(){
        // this.debtNo = "03110102399";
        this.overdueNumber = this.$route.params.overdueNumber
        this.debtNo = this.$route.params.id
        
    },
    mounted() {
        if(!this.debtNo){
            return
        }
        let params = {debtNo:this.debtNo}
        this.caseQuery(params)
        this.agentListQuery({pageSize:1})
        this.applicantListQuery({pageSize:1})
    },
    methods: {
        
        async caseQuery(params){
            let res = await this.$service.caseQuery(params)
            if(res){
                let arr = [];
                arr.push(res.caseCreatorDetails)
                this.coverApplicant = arr;
                this.dfsToken = res.caseCreatorDetails.dfsToken
                this.initUpStatus(res.caseCreatorDetails)
            }
        },

        initUpStatus(data){
            let arr = ["resource3",'resource4','resource5','resource6'];
            arr.forEach(item=>{
                if(data[item] && data[item].resourceID === "1"){
                    this[item] = "1007"
                }
                if(data[item] && data[item].resourceID !== "1" && data[item].resourceID !== "0"){
                    this[item] = "1000"
                }
            })
            
            
        },
        
        async agentListQuery(params){
            let res = await this.$service.agentList(params)
            if(res){
                this.agentList = res.list || []
            }
        },

        async applicantListQuery(params){
            let res = await this.$service.applicantList(params)
            if(res){
                this.applicantList = res.list || []
            }
        },

        
        async caseResourcesCreate(params,type){
            let res = await this.$service.caseResourcesCreate(params)

            if(!res){
                this.$message.error("生成失败")
                return
            }
            
            this['resource'+type] = res.code
            if(res.code === "1000" || res.code === "1009" || res.code === "1011" || res.code === "1012" || res.code === "1014"){
                this.$message.success('生成成功');
            }else if(res.code === "1007"){
                res.depict ? this.$message.warning(res.depict) : "生成中";
            }else{
                res.depict ? this.$message.error(res.depict) : "";
            }
        },
        
        async caseinforcreate(params){
            let res = await this.$service.caseinforcreate(params)
            
            if(res){
                if(res.code==="1100"){
                    this.$message.success('创建成功');
                    this.$router.push({name:"APPLICANT_CASECREATED"})
                }else if(res.code==="1102"){
                    this.$message.error("有未生成的信息")
                }else if(res.code==="1103"){
                    this.$message.error("代理人或申请人信息为空")
                }else{
                    this.$message.error("创建失败")
                }
                
            }
        },

        
        dataTolist(data){
            return data.map((item)=>{
                item.menuStatus = item.enable?"已启用":"已停用";
               
                return item
            })
        },
        
        createCoverApp(type){
            let params = {
                debtNo:this.debtNo,
                resourcesType:type
            }
            this.caseResourcesCreate(params,type)
        },

        submitAddPerm(data){
            data.enable === "1"? (data['enable']=true) : (data['enable']=false)
            if(this.opetateType === "update"){
                this.updatePermManage(data)
            }else{
                this.addPermManage(data)
            }
        },

        async upFile(params){
            let res = await this.$service.singleUpFile(params);
            if(res){
                this.fileList.splice(0,this.fileList.length-1)
                this.dfsUrl = res.groupName + '/' + res.displayFilename
            }else{
                this.fileList = []
            }
        },

        submitUpload(params){
            let req = {
                data:{
                    file:params.file
                },
                head:{
                    "platformNo":"zcj",
                    "timestamp":"1538976365559",
                    "token":this.token
                },
            }

            var formData = new FormData(); 
            formData.append("head.token", this.token); 
            formData.append("head.platformNo", "zcj");// 自己的平台编号 
            formData.append('data.file',params.file); 

            this.upFile(formData)
            
        },
        async uploadImg(){
            if(!this.dfsUrl){
                this.$message.error("请先选取文件");
                return 
            }
            let params = {
                dfsToken:this.dfsToken,
                debtNo:this.debtNo,
                dfsUrl:this.dfsUrl,
                resourcesType:'5'
            }
            let res = await this.$service.caseResourcesCreate(params)
            
            if(res){
                this.$message.success("上传成功")
            }
            
        },
        handleChange(file,filelist){
            let arr = [file]
            this.fileList = arr
        },
        onSubmit(){
            if(!this.checkCase("caseName",'caseNameStatus')){
                this.$message.warning("请填写案件名称")
                return
            }
            if(!this.checkCase("disputeFee",'disputeFeeStatus')){
                this.$message.warning("请填写请求总金额")
                return
            }
            if(!this.checkCase("reason",'reasonStatus')){
                this.$message.warning("请填写事实与理由")
                return
            }
            if(!this.isRealNumber(this.coverApplicant[0].disputeFee)){
                this.$message.warning("请填写大于0的数字")
                this.disputeFeeStatus = false
                return
            }
            if(this.coverApplicant[0].disputeFee<0 || this.coverApplicant[0].disputeFee >1000000){
                this.$message.warning("请求总金额必须大于等于0，小于等于1000000")
                this.disputeFeeStatus = false
                return
            }
            let params = {
                caseName:this.coverApplicant[0].caseName,
                debtNo:this.debtNo,
                disputeFee:this.coverApplicant[0].disputeFee,
                overdueNumber:this.overdueNumber,
                reason:this.coverApplicant[0].reason
            }
            this.caseinforcreate(params)
        },
        cancle(){
            this.$router.back()
        },
        checkCase(name,status){
            if(!this.coverApplicant[0][name]){
                this[status] = false
                return false
            }
            this[status] = true
            return true
        },  
        isRealNumber(val){
            var regPos = /^\d+(\.\d+)?$/
            return regPos.test(val)
        }
    }
}
</script>
<style lang='less' scoped>
.search_top{
    text-align:left
}
.oprate_btn{
    padding:10px;
    background:#f0f0f0;
    margin-bottom:10px;
}
.el-card__header{
    padding:10px
}
.cailiao{
    width:600px;
}
.bg-purple{
    background:#333;
    line-height:36px;
}
.bg-purple-light{
    background:#999;
    line-height:36px;
}
.cl_row{
    border-bottom:1px solid #efefef;
    line-height:42px;
}
.cc_bottom{
    text-align:center;
    padding:20px 0;
}

</style>