<template>
    <el-form ref="formInline" :inline="true" :model="formInline" size="medium">
        <el-form-item label="用户名">
            <el-input v-model="formInline.userName" placeholder="请选输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="状态">
            <el-select v-model="formInline.prizeStatus" placeholder="请选择">
                <el-option
                        v-for="item in prizeStatusData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="类型">
            <el-select v-model="formInline.receiveType" placeholder="请选择">
                <el-option
                        v-for="item in receiveTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="礼品类型">
            <el-select v-model="formInline.giftType" placeholder="请选择">
                <el-option
                        v-for="item in giftTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="发放类型">
            <el-select v-model="formInline.givePrizeWay" placeholder="请选择">
                <el-option
                        v-for="item in givePrizeWays"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="日期条件类型">
            <el-select v-model="formInline.timeType" placeholder="请选择">
                <el-option
                        v-for="item in timeTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-date-picker
                    v-model="formInline.date"
                    end-placeholder="结束日期"
                    range-separator="-"
                    start-placeholder="开始日期"
                    type="daterange"
                    value-format="yyyy-MM-dd">
            </el-date-picker>
        </el-form-item>

        <el-form-item label="发放时间">
            <el-date-picker
                    v-model="formInline.date"
                    end-placeholder="结束日期"
                    range-separator="-"
                    start-placeholder="开始日期"
                    type="daterange"
                    value-format="yyyy-MM-dd">
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
            isSystem:{
                type:String,
                default:''
            }
        },
        data () {
            return {
                 formInline:{
                     activeId: '',
                     userName: '',
                     prizeStatus: '',
                     receiveType: '',
                     timeType: '',
                     givePrizeWay: ''
                },
                date: [],
                prizeStatusData:[
                    {value:"GRANT",label:'已发放'},
                    {value:"FORBIDDEN",label:'已禁用'},
                    {value:"USE",label:'已使用'},
                    {value:"EXPIRE",label:'已过期'},
                    {value:"RECALL",label:'已撤回'},
                    {value:"IN_USE",label:'使用中'},
                    {value:"INVALID",label:'失效'},
                    {value:"UN_LOAN",label:'已发放(未放款)'}
                ],
                receiveTypes:[
                    {value:"XJHB_LJ",label:'立即领取型现金红包'},
                    {value:"XJHB_DQ",label:'到期领取行现金红'}
                ],
                giftTypes:[
                    {value:"SWLP",label:'实物礼品'},
                    {value:"XNLP",label:'虚拟礼品'}
                ],
                timeTypes:[
                    {value:"giveTime",label:'发放时间'},
                    {value:"useTime",label:'使用时间'},
                    {value:"endTime",label:'到期时间'}
                ],
                givePrizeWays:[
                    {value:"SDFJ",label:'手动发奖'},
                    {value:"ZDFJ",label:'自动发奖'}
                ]
            }
        },

        methods: {
            onSubmit(){
                let sdate = this.formInline.date || [];
                if(Array.isArray(sdate)){
                    this.formInline.startTime = sdate[0] || "";
                    this.formInline.endTime = sdate[1] || "";
                }
                this.$emit('search',this.formInline)
            },
            resetForm(){
                this.date=[]
                this.formInline = {
                    formInline:{
                        userName: '',
                        prizeStatus: '',
                        receiveType: '',
                        givePrizeWay: '',
                    },
                }
            }
        }
    }
</script>
<style lang='less' scoped>

</style>