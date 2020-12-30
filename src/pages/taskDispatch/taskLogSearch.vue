<template>
    <el-form ref="formInline" :inline="true" :model="formInline" size="medium">

        <el-form-item label="客户端标识" prop="appIds">
            <el-select v-model="formInline.appId" placeholder="请选择">
                <el-option
                        v-for="item in appIds"
                        :key="item.appId"
                        :label="item.appId"
                        :value="item.appId">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="客户端主机标识">
            <el-input v-model="formInline.clientId"></el-input>
        </el-form-item>

        <el-form-item label="日志类型">
            <el-select v-model="formInline.type" placeholder="请选择">
                <el-option
                        v-for="item in taskLogType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="作业组名">
            <el-input v-model="formInline.jobGroup"></el-input>
        </el-form-item>

        <el-form-item label="作业名">
            <el-input v-model="formInline.jobName"></el-input>
        </el-form-item>

        <el-form-item label="触发器组名">
            <el-input v-model="formInline.triggerGroup"></el-input>
        </el-form-item>

        <el-form-item label="触发器名">
            <el-input v-model="formInline.triggerName"></el-input>
        </el-form-item>

        <el-form-item label="客户端主机时间">
            <!-- <el-input v-model="formInline.jobElapsedTimeBegin"></el-input> -->
            <el-date-picker
                v-model="clientTime"
                end-placeholder="结束日期"
                range-separator="-"
                start-placeholder="开始日期"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="getTime">
            </el-date-picker>
        </el-form-item>

        <el-form-item label="作业毫秒数">
            <div>
            <el-input-number v-model="formInline.jobElapsedTimeBegin" :controls=false class="zuoyeInput"></el-input-number>
            -
            <!-- <el-input v-model="formInline.clientId"></el-input> -->
            <el-input-number v-model="formInline.jobElapsedTimeEnd" :controls=false class="zuoyeInput"></el-input-number>
            </div>
        </el-form-item>

        <!-- <el-form-item label="作业毫秒数，截止">
            <el-input v-model="formInline.jobElapsedTimeEnd"></el-input>
        </el-form-item> -->

        <!-- <el-form-item>
            <el-date-picker
                    v-model="startEndTime"
                    type="datetimerange"
                    range-separator="-"
                    @change="getTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item> -->

        <el-form-item>
            <el-button class="fix_btn" type="primary" @click="onSubmit()">查询</el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        props:{
            appIds:{
                type:Array,
                default:function(){
                    return []
                }
            },
            // formInline:{}
        },
        data () {
            return {
                clientTime:[],
                formInline:{
                    appId:"XHSR-REPAYMENT",
                    clientId: '',
                    clientTimeBegin: "",
                    clientTimeEnd: "",
                    // jobElapsedTimeBegin: "",
                    // jobElapsedTimeEnd: '',
                    jobGroup:'',
                    jobName: '',
                    triggerGroup: '',
                    triggerName: '',
                    type: ''
                },
                startEndTime: [],
                taskLogType: [
                    {value:"JOB_ADDED",label:"添加作业"},
                    {value:"JOB_SCHEDULED",label:"预定作业"},
                    {value:"JOB_UNSCHEDULED",label:"撤销预定作业"},
                    {value:"TRIGGER_FIRED",label:"触发器已点火"},
                    {value:"TRIGGER_MISFIRED",label:"触发器错过本次点火"},
                    {value:"JOB_TO_BE_EXECUTED",label:"即将执行作业"},
                    {value:"JOB_WAS_EXECUTED",label:"作业完成"},
                    {value:"TRIGGER_COMPLETE",label:"触发器完成本次点火"},
                    {value:"TRIGGER_FINALIZED",label:"触发器已失效"},
                    {value:"JOB_DELETED",label:"删除作业"},
                    {value:"ERROR",label:"异常"},
                ]
            }
        },

        methods: {
            getTime(date){
                this.formInline.clientTimeBegin=date[0];
                this.formInline.clientTimeEnd=date[1];
            },

            onSubmit(){
                // this.formInline.jobElapsedTimeBegin = parseFloat(this.formInline.jobElapsedTimeBegin);
                // this.formInline.jobElapsedTimeEnd = parseFloat(this.formInline.jobElapsedTimeEnd);
                this.formInline.clientTimeBegin = this.clientTime[0] || '';
                this.formInline.clientTimeEnd = this.clientTime[1] || '';
                // console.log('search',this.formInline)
                this.$emit("search",this.formInline);
            },
            resetForm(){
                this.formInline = {
                    appId:"XHSR-REPAYMENT",
                    // clientId: '',
                    // clientTimeBegin: "",
                    // clientTimeEnd: "",
                    // // jobElapsedTimeBegin: "",
                    // // jobElapsedTimeEnd: '',
                    // jobGroup:'',
                    // jobName: '',
                    // triggerGroup: '',
                    // triggerName: '',
                    // type: ''
                }
            }
        }
    }
</script>
<style lang='less' scoped>
.zuoyeInput{
    width:120px;
}
</style>