<template>
    <el-form ref="formInline" :inline="true" :model="formInline" size="medium">
        <el-form-item label="客户端标识">
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
            <el-input v-model="formInline.clientId" :placeholder="inputPlace" class="normalInput"></el-input>
        </el-form-item>

        <!--<el-form-item label="是否不允许并发" prop="concurrentExectionDisallowed">
             <el-select v-model="formInline.isEnabled" placeholder="请选择">
                 <el-option
                         v-for="item in isbing"
                         :key="item.code"
                         :label="item.name"
                         :value="item.code">
                 </el-option>
             </el-select>
         </el-form-item>
       <el-form-item label="服务地址" prop="tcConfigUrl">
             <el-input v-model="formInline.tcConfigUrl"></el-input>
         </el-form-item>-->
         <el-form-item label="日志类型">
            <el-select  v-model="formInline.type" placeholder="请选择" prop="type">
                <el-option
                        v-for="item in LogType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                >
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="客户端主机时间">
            <el-date-picker
                    v-model="startEndTime"
                    end-placeholder="结束日期"
                    range-separator="-"
                    start-placeholder="开始日期"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="getTime">
            </el-date-picker>
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
            inputPlace:{
                default:"请输入内容"
            },
//             formInline:{
//                 appId:'',
//                 clientId:'',
//                 clientTimeBegin: "",
//                 clientTimeEnd: "",
// //                  isEnabled:'',
//                 type: ''
//             }
        },
        mounted(){
            // console.log('---',this.appIds)
        },
        data () {
            return {
                options: [],
                formInline:{
                    appId:'',
                    clientId:'',
                    clientTimeBegin: "",
                    clientTimeEnd: "",
//                  isEnabled:'',
                    type: ''
                },
                startEndTime: [],
                LogType: [
                    {value: 'MESSAGE_MANAGER_STARTED', label: '消息管理器已启动'},
                    {value: 'SCHEDULER_CLIENT_STARTING',label: '客户端启动中'},
                    {value: 'SCHEDULER_STARTING',label: '调度器启动中'},
                    {value: 'TASK_MANAGER_STARTING',label: '任务管理器启动中'},
                    {value: 'SCHEDULER_STARTED',label: '调度器已启动'},
                    {value: 'SCHEDULER_TO_STANDBY',label: '调度器进入待机模式'},
                    {value: 'TASK_MANAGER_SHUTDOWN',label: '任务管理器已关闭'},
                    {value: 'SCHEDULER_SHUTTING_DOWN',label: '调度器关闭中'},
                    {value: 'SCHEDULER_SHUTDOWN',label: '调度器已关闭'},
                    {value: 'SCHEDULER_CLIENT_SHUTTING_DOWN',label: '客户端关闭中'},
                    {value: 'MESSAGE_MANAGER_SHUTTING_DOWN',label: '消息管理器关闭中'},
                    {value: 'ERROR',label: '异常'}
                ],

                /*isbing:[
                    {name:"是",code:1},
                    {name:"否",code:0}
                ]*/
            }
        },

        methods: {
            getTime(date){
                this.formInline.clientTimeBegin=date[0];
                this.formInline.clientTimeEnd=date[1];
            },

            onSubmit(){
                console.log('------',this.formInline)
                this.$emit("search",this.formInline);
            },
            resetForm(){
                this.startEndTime = []
                this.formInline = {
                    appId:"XHSR-REPAYMENT",
                    clientId:'',
                    clientTimeBegin: "",
                    clientTimeEnd: "",
//                  isEnabled:'',
                    type: ''
                }
            }
        }
    }
</script>
<style lang='less' scoped>

</style>