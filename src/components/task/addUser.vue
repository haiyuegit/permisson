<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="150px" size="medium">
        <el-form-item label="应用标识" prop="appId">
            <el-select v-model="form.appId" placeholder="请选择">
                <el-option
                        v-for="item in appIds"
                        :key="item.code"
                        :label="item.code"
                        :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="客户端地址" prop="clientAddress">
            <el-input v-model="form.clientAddress"></el-input>
        </el-form-item>

        <el-form-item label="日志内容" prop="	type">
            <el-input v-model="form.content"></el-input>
        </el-form-item>

        <el-form-item label="日志类型" prop="LogType" >
            <el-select  v-model="form.type" placeholder="请选择">
                <el-option
                        v-for="item in LogType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="cancle">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import systemSelect from '../common/systemSelect'
    export default {
        name: "",
        components: {
            systemSelect
        },
        props: {
            appIds: {
                type: Array,
                default: function () {
                    return []
                }
            },
            staffList: {
                type: Array,
                default: function () {
                    return []
                }
            },

            form: {
                appId: [],
                type: '',
                content: ''
            }
        },
        mounted() {

        },
        data() {
            return {
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
                    {value: 'ERROR',label: '错'}
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                rules:{
                    appId: [
                        { required: true, message: '请选择应用标识', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请选择日志类型', trigger: 'blur' }
                    ],

                    clientAddress: [
                        /*{ required: true, message: '请输入客户端地址', trigger: 'blur' },*/
                        { max: 36, message: '长度在36 个以内字符', trigger: 'blur' }
                    ]
                },
                selectOrg:{
                    orgsid:[]
                },
                i:0
            };
        },

        methods: {


            onSubmit(){
                //   this.form["parentId"] = this.$refs.tree.getCheckedKeys();
                //   console.log('form',this.form);

                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        console.log('form',this.form,valid)
                        // let treeIds = this.$refs.tree.getCheckedKeys();
                        // this.form["parentId"] = this.form.parentId.join();
                        let params = JSON.parse(JSON.stringify(this.form))
                        this.$emit("submitAddTask",params)
                    } else {
                        return false;
                    }
                });
            },
            cancle(){
                this.$emit("close")
            }
        }
    };
</script>
<style lang='less' scoped>
</style>