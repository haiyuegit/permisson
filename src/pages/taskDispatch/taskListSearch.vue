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

        <el-form-item label="是否启用">
             <el-select v-model="formInline.isEnabled" placeholder="请选择">
                 <el-option
                         v-for="item in isbing"
                         :key="item.code"
                         :label="item.name"
                         :value="item.code">
                 </el-option>
             </el-select>
         </el-form-item>

        <el-form-item label="作业组名">
             <el-input v-model="formInline.jobGroup"></el-input>
        </el-form-item>

        <el-form-item label="作业名">
            <el-input v-model="formInline.jobName"></el-input>
        </el-form-item>

        <el-form-item label="作业状态">
            <el-select v-model="formInline.jobState" placeholder="请选择">
                <el-option
                        v-for="item in jobStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <!--<el-form-item>
            <el-date-picker
                    v-model="startEndTime"
                    type="datetimerange"
                    range-separator="-"
                    @change="getTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>-->

        <el-form-item label="触发器组名">
            <el-input v-model="formInline.triggerGroup"></el-input>
        </el-form-item>

        <el-form-item label="触发器名">
            <el-input v-model="formInline.triggerName"></el-input>
        </el-form-item>

        <el-form-item label="触发器状态">
            <el-select v-model="formInline.triggerState" placeholder="请选择">
                <el-option
                        v-for="item in triggerStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

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
            appId:""
            // formInline:{}
        },
        data () {
            return {
                formInline:{
                    appId:'',
//                    clientTimeBegin: "",
//                    clientTimeEnd: "",
                    isEnabled:'',
                    jobGroup:'',
                    jobState: '',
                    jobName: '',
                    triggerName: '',
                    triggerGroup: '',
                    triggerState: ''
                },
//                startEndTime: [],
                isbing:[
                    {name:"是",code:1},
                    {name:"否",code:0}
                ],
                jobStates:[
                    {value:"NONE",label:'无态'},
                    {value:"NORMAL",label:'正常'},
                    {value:"RUNNING",label:'运行中'}
                ],
                triggerStates:[
                    {value:"NONE",label:'无态'},
                    {value:"NORMAL",label:'正常'},
                    {value:"PAUSED",label:'暂停'},
                    {value:"COMPLETE",label:'完成'},
                    {value:"ERROR",label:'错误'},
                    {value:"BLOCKED",label:'阻塞'},
                ]
            }
        },
        methods: {
            getTime(date){
                this.formInline.clientTimeBegin=date[0];
                this.formInline.clientTimeEnd=date[1];
            },

            onSubmit(){
                this.$emit("search",this.formInline);
            },
            resetForm(){
                // this.$refs['formInline'].resetFields();
                this.formInline = {
                    // formInline:{
                        appId:"XHSR-REPAYMENT",
//                    clientTimeBegin: "",
//                    clientTimeEnd: "",
                    // isEnabled:'',
                    // jobGroup:'',
                    // jobState: '',
                    // jobName: '',
                    // triggerName: '',
                    // triggerGroup: '',
                    // triggerState: ''
                    // },
                }
            }
        }
    }
</script>
<style lang='less' scoped>

</style>