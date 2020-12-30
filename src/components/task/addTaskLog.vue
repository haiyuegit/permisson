<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="medium">
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

        <el-form-item label="是否不允许并发"><!--验证：必填prop="concurrentExectionDisallowed"-->
            <el-radio-group v-model="form.concurrentExectionDisallowed">
                <el-radio :label=0>否</el-radio>
                <el-radio :label=1>是</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="描述" ><!--验证：必填prop="description"-->
            <el-input v-model="form.description"></el-input>
        </el-form-item>

        <el-form-item label="是否启用">
            <el-select v-model="form.isEnabled" placeholder="请选择">
                <el-option
                        v-for="item in isbing"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="作业组名" ><!--验证：必填prop="jobGroup"-->
            <el-input v-model="form.jobGroup"></el-input>
        </el-form-item>

        <el-form-item label="作业实例名" prop="jobInstanceName">
            <el-input v-model="form.jobInstanceName"></el-input>
        </el-form-item>

        <el-form-item label="作业实例类型"><!--验证：必填prop="jobInstanceType"-->
            <el-radio-group v-model="form.jobInstanceType">
                <el-radio label="TARGET">直接或间接实现 Job 接口</el-radio>
                <el-radio label="PROXY">直接或间接实现 Job 接口的类被托管到 Spring</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="作业名" ><!--验证：必填prop="jobName"-->
            <el-input v-model="form.jobName"></el-input>
        </el-form-item>

        <el-form-item label="是否在作业完成后持久化 JobData"><!--验证：必填prop="persistJobDataAfterExecution"-->
            <el-radio-group v-model="form.persistJobDataAfterExecution">
                <el-radio :label=0>否</el-radio>
                <el-radio :label=1>是</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="触发器表达式" prop="triggerCronExpression">
            <el-input v-model="form.triggerCronExpression"></el-input>
        </el-form-item>

        <el-form-item label="触发器组名" ><!--验证：必填prop="triggerGroup"-->
            <el-input v-model="form.triggerGroup"></el-input>
        </el-form-item>

        <el-form-item label="错过触发时间后的指令"><!--验证：必填 prop="triggerMisfireInstruction"-->
            <el-radio-group v-model="form.triggerMisfireInstruction">
                <el-radio :label=1>立即再触发一次</el-radio>
                <el-radio :label=2>什么也不做</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="触发器名"><!--验证：必填 prop="triggerName"-->
            <el-input v-model="form.triggerName"></el-input>
        </el-form-item>

        <!--<el-form-item label="状态" prop="isEnable">
            <el-radio-group v-model="form.isEnable">
                <el-radio :label=0>否</el-radio>
                <el-radio :label=1>是</el-radio>
            </el-radio-group>
        </el-form-item>-->

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
        props:{
            appIds:{
                type:Array,
                default:function(){
                    return []
                }
            },
            form:{
                appId:[],
                description:'',
                jobInstanceName:'',
                jobInstanceType: '',
                jobName:'',
                triggerCronExpression:'',
                triggerGroup:'',
                triggerName:'',
                isEnabled:''
            }
        },

        mounted() {

        },
        data() {
            return {
                description: '',
                isbing:[
                    {name:"是",code:1},
                    {name:"否",code:0}
                ],
                jobInstanceType:[
                    {value:"TARGET",label:"直接或间接实现Job接口"},
                    {value:"TARGET",label:"直接或间接实现Job接口"}
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                rules:{
                    /*jobGroup: [
                        { required: true, message: '请输入作业组名', trigger: 'blur' },
                        { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
                    ],
                    jobName: [
                        { required: true, message: '请输入作业名', trigger: 'blur' },
                        { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
                    ],*/
                    triggerCronExpression: [
                        { required: true, message: '请输入触发器表达式', trigger: 'blur' },
                        { max: 20, message: '长度在20 个以内字符', trigger: 'blur' }
                    ],
                    /*triggerGroup: [
                        { required: true, message: '请输入触发器组名', trigger: 'blur' },
                        { max: 20, message: '长度在20 个以内字符', trigger: 'blur' }
                    ],
                    triggerName: [
                         { required: true, message: '请输入触发器名', trigger: 'blur' },
                         { max: 20, message: '长度在20 个以内字符', trigger: 'blur' }
                     ],
                   /*triggerMisfireInstruction: [
                         { required: true, message: '请选择错过触发时间后的指令', trigger: 'blur' }
                     ],*/
                    appId: [
                        { required: true, message: '请选择应用标识', trigger: 'blur' }
                    ],
                    /*isEnable: [
                        { required: true, message: '请选择状态', trigger: 'blur' }
                    ],
                    jobInstanceType: [
                        { required: true, message: '请选择作业实例类型', trigger: 'blur' }
                    ],
                    persistJobDataAfterExecution: [
                        { required: true, message: '请选择作业实例类型', trigger: 'blur' }
                    ],
                    description: [
                        { max: 50, message: '长度在50 个以内字符', trigger: 'blur' }
                    ],*/
                    jobInstanceName: [
                        { required: true, message: '请输入触作业实例名', trigger: 'blur' }
                    ],
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
                        console.log('form',11,this.form)
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