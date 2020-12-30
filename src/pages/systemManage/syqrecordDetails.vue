<template>
    <div class="content" style="padding-top:60px">
        <div class="showInfo">
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">活动编号:</div></el-col>
                <el-col :span="20"><div class="grid-content bg-purple-light">{{params.activeId}}</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">活动主题:</div></el-col>
                <el-col :span="20"><div class="grid-content bg-purple-light">{{params.activeTopic}}</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">获取人数:</div></el-col>
                <el-col :span="20"><div class="grid-content bg-purple-light">{{manageList.prizeUserNum}}</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">发放总额:</div></el-col>
                <el-col :span="20"><div class="grid-content bg-purple-light">{{manageList.prizeTotolAmount}}</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">发放时间:</div></el-col>
                <el-col :span="20"><div class="grid-content bg-purple-light">{{params.startTime}} ~ {{params.endTime}}</div></el-col>
            </el-row>
        </div>
        <systemSearch :itemList="itemList" isSystem="show" v-on:search="search"></systemSearch>
        <obtn :disAdd=true :disPatchDel=true :enabled=true :freeze=true :retract=true :stop=true :unfreeze=true v-on:changefreeze="changefreeze" v-on:retract="retract"></obtn>
        <el-table
                ref="multipleTable"
                :data="manageList.list"
                border

                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="35">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="用户名"
                    prop="userName">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="姓名"
                    prop="realName">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="id"
                    prop="id">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="发放原因"
                    prop="giveCause">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="发放类型"
                    prop="givePrizeWay">
                <template slot-scope="scope">
                    {{tableContent(scope.row.givePrizeWay)}}
                </template>
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="浮动利率(%)"
                    prop="">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="计息天数"
                    prop="interestDays">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="有效期(天)"
                    prop="validityPeriod">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="使用时间"
                    prop="useTime">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="状态"
                    prop="prizeStatus">
                <template slot-scope="scope">
                    {{state(scope.row.prizeStatus)}}
                </template>
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="发放时间"
                    prop="giveTime">
            </el-table-column>
            <el-table-column
                    :show-overflow-tooltip=true
                    align="center"
                    label="到期时间"
                    prop="endTime">
            </el-table-column>
            <!--<el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small"  @click="updatedia(scope.row)">编辑</el-button>
              </template>
            </el-table-column>-->

        </el-table>
        <div v-if="manageList.total" class="page_bottom">
            <el-pagination
                    :current-page="pageNum"
                    :page-size="10"
                    :page-sizes="[10, 20, 30, 40]"
                    :total="manageList.total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>

        <el-dialog
                :visible.sync="centerDialogVisible"
                center
                title="提示"
                width="30%">
            <span></span>
            <span></span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { mapState,mapGetters } from 'vuex'
    import systemSearch from '../../components/common/perSearch'
    import obtn from '../../components/common/operateBtn'
    export default {
        name: 'RECORD_DETAILS',
        components:{
            systemSearch,
            obtn
        },
        data () {
            return {
                pageNum: 1,
                pageSize:10,
                searchData: {},
                params:{//初始化传参
                    activeId:'',
                    prizeStatus:'',
                    givePrizeWay:'',
                    timeType:''
                },
                itemList:[
                    {
                        label:"用户名",
                        type:"input",
                        placeholder:"请输入用户名",
                        model:'userName'
                    },{
                        label:"状态",
                        type:"select",
                        placeholder:"请选择状态",
                        model:'prizeStatus',
                        options:[
                            {code:"GRANT",name:'已发放'},
                            {code:"FORBIDDEN",name:'已禁用'},
                            {code:"USE",name:'已使用'},
                            {code:"EXPIRE",name:'已过期'},
                            {code:"RECALL",name:'已撤回'},
                            {code:"IN_USE",name:'使用中'},
                            {code:"INVALID",name:'失效'},
                            {code:"UN_LOAN",name:'已发放(未放款)'}
                        ]
                    },{
                        label:"发放类型",
                        type:"select",
                        placeholder:"请选择发放类型",
                        model:'givePrizeWay',
                        options:[
                            {code:"SDFJ",name:'手动发奖'},
                            {code:"ZDFJ",name:'自动发奖'}
                        ],
                    },{
                        label:"发放时间",
                        type:"select",
                        placeholder:"请选择发放时间",
                        model:'timeType',
                        options:[
                            {code:"giveTime",name:'发放时间'},
                            {code:"useTime",name:'使用时间'},
                            {code:"endTime",name:'到期时间'}
                        ],
                    },{
                        label:"",
                        type:"rangeTime",
                        placeholder:"请选择邀请时间",
                        model:'activeTime'
                    }
                ],
                manageList:{
                    total:0,
                    list:[]
                },
                //弹窗字段变量
                centerDialogVisible: false,//冻结+撤回+解冻
                dialogFormUpdVisible: false,//修改弹窗控制
                multipleSelection: [],
                ids:[],
                editData:{},
                dictionaryDetailList:[]
            }
        },
        computed: {
            ...mapState({
                operateBtns: 'operateBtns'
            })
        },
        mounted() {
            this.params.activeId=this.$route.query.activeId;
            this.params.activeTopic=this.$route.query.activeTopic;
            this.params.startTime=(this.$route.query.startTime).substring(0,9);
            this.params.endTime=(this.$route.query.endTime).substring(0,9);
            this.getList(this.params);
        },
        methods: {
            //解冻+冻结
            changefreeze(status){
                let rows = this.$refs.multipleTable.selection
                if(!rows.length){
                    this.$message.warning('请选择需要操作的列表')
                    return
                }
                let ids = rows.map((item)=>{
                    return item.id
                })
                let params = {
                    prizeIdList:ids
                }
                let resMonery = 0;
                rows.forEach(element => {
                    resMonery += parseInt(element.redValue)
                })

                // this.$confirm('是否批量冻结用户数'+ids.length+'人的收益券?'+resMonery+'元?', '提示', {
                this.$confirm('是否批量冻结用户数'+ids.length+'人的收益券?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.enable(params,status)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            async enable(params,status){
                console.log(params,status)
                //params：prizeIdList(必传Id), status：状态0/1)
                let res;
                if(status){
                    res = await this.$service.syqenable(params)
                }else{
                    res = await this.$service.syqDisable(params)
                }

                if(res){
                    this.getList(this.params);
                    this.$message.success('改变状态成功');
                }
            },
            //撤回
            retract(prizeIdList){
                let rows = this.$refs.multipleTable.selection
                if(!rows.length){
                    this.$message.warning('请选择需要操作的列表')
                    return
                }
                let prizeId=rows.map((item)=>{
                    console.log(item)
                    return item.id
                })
                let params={
                    prizeIdList: prizeId
                }
                let resMonery = 0;
                rows.forEach(element => {
                    resMonery += parseInt(element.redValue)
                })

                // this.$confirm('是否批量撤回用户'+prizeId.length+'人现金红包'+resMonery+'元?', '提示', {
                this.$confirm('是否批量冻结用户数'+prizeId.length+'人的收益券?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.revoke(params,prizeIdList)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                })
            },
            async revoke(prizeIdList){
                let res;
                if(prizeIdList){
                    res = await this.$service.syqCancel(prizeIdList)
                }
                if(res){
                    this.getList(this.params);
                    this.$message.success('改变状态成功');
                }
            },
            //字典详情查询列表接口（获取人数+发放总额两个字段）
            async getList(params){
                this.loading = true;
                let req = {activeId:this.$route.query.activeId,...params,...this.searchData}
                let res = await this.$service.raiseInterestVoucherList(req)
                this.manageList = res || {totalPage:0,list:[]};
                this.loading = false
            },
            //查询
            search(data){
                console.log(data)
                this.searchData=data
                if(data.activeTime){
                    this.searchData.startTime = data.activeTime[0]
                    this.searchData.endTime = data.activeTime[1]
                }else{
                    this.searchData.startTime = "";
                    this.searchData.endTime = "";
                }
                this.pageNum = 1;
                this.pageSize = 10;

                let params = {pageNum:1, pageSize: 10}
                this.getList(params)
            },
            //table内数据处理
            tableContent(val){
                switch(val){
                    case "SDFJ":
                        return "手动发奖"
                        break;
                    case "ZDFJ":
                        return "自动发奖"
                        break;
                }
            },
            state(val){
                switch(val){
                    case "GRANT":
                        return "已发放"
                    break;
                    case "FORBIDDEN":
                        return "已使用"
                    break;
                    case "EXPIRE":
                        return "已过期"
                    break;
                    case "RECALL":
                        return "已撤回"
                    break;
                    case "IN_USE":
                        return "使用中"
                    break;

                }
            }

        }
    }
</script>
<style lang='less' scoped>
    .oprate_btn{
        padding:10px;
        background:#f0f0f0;
        margin-bottom:10px;
    }
    .showInfo{
        line-height: 30px;
        margin-bottom:20px;
        .bg-purple{
            text-align: right;
            margin-right:10px;
        }
    }
</style>