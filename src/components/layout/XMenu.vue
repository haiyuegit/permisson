<template>
    <el-aside width="210px">
        <el-menu :router="isrouter" class="el-menu-vertical-demo" default-active="1" @close="handleClose" @open="handleOpen" @select="menuSelect">
            <el-submenu v-if="!isPermission" index="1">
                <template slot="title">
                    <i class="el-icon-question"></i>
                    <span slot="title">权限管理</span>
                </template>
                    <el-menu-item :class="{ 'is-active':$route.name == 'MENU_MANAGER'}" index="MENU_MANAGER" route="/permissionManage/menuManage">菜单管理</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name == 'ROLE_MANAGER'}" index="ROLE_MANAGER" route="/permissionManage/roleManage">角色管理</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name == 'PERM_MANAGER'}" index="PERM_MANAGER" route="/permissionManage/permManage">权限管理</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name == 'OPERATE_MANAGER'}" index="OPERATE_MANAGER" route="/permissionManage/operateManage">操作管理</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name == 'RES_MANAGER'}" index="RES_MANAGER" route="/permissionManage/resourceManage">API资源管理</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name == 'USERGROUP_MANAGER'}" index="USERGROUP_MANAGER" route="/permissionManage/userManage">用户组管理</el-menu-item>
            </el-submenu>
            <el-submenu v-if="!isPermission" index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">系统管理</span>
                </template>
                    <el-menu-item :class="{ 'is-active':$route.name == 'LOG_MANAGER'}" index="LOG_MANAGER" route="/systemManage/noteManage">日志管理</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name == 'DICT_MANAGER'}" index="DICT_MANAGER" route="/systemManage/wordBookManage">字典管理</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name == 'CLIENT_MANAGE'}" index="CLIENT_MANAGE" route="/systemManage/client">客户端管理</el-menu-item>
            </el-submenu>
            <el-submenu v-if="!isPermission" index="3">
                <template slot="title">
                    <i class="el-icon-printer"></i>
                    <span slot="title">部门人员管理</span>
                </template>
                    <el-menu-item :class="{ 'is-active':$route.name == 'ORG_MANAGER'}" index="ORG_MANAGER" route="/departmentManage/organization">部门管理</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name == 'STAFF_MANAGER'}" index="STAFF_MANAGER" route="/departmentManage/staff">员工管理</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name == 'ACCOUNT_MANAGER'}" index="ACCOUNT_MANAGER" route="/departmentManage/account">账号管理</el-menu-item>
                     
            </el-submenu>
            <el-submenu v-if="!isPermission" index="4">
                <template slot="title">
                    <i class="el-icon-printer"></i>
                    <span slot="title">人员管理</span>
                </template>
                    <el-menu-item :class="{ 'is-active':$route.name === 'APPLICANT_MANAGE'}" index="APPLICANT_MANAGE" route="/fddMamage/applicantManage">申请人</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name === 'AGENT_MANAGE'}" index="AGENT_MANAGE" route="/fddMamage/agent">代理人</el-menu-item>
            </el-submenu>
            <el-submenu v-if="!isPermission" index="5">
                <template slot="title">
                    <i class="el-icon-printer"></i>
                    <span slot="title">案件管理</span>
                </template>
                    <el-menu-item :class="{ 'is-active':$route.name === 'APPLICANT_OVERDUEINFO'}" index="APPLICANT_OVERDUEINFO" route="/fddMamage/overdueInfo">逾期信息列表</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name == 'APPLICANT_CASECREATED'}" index="APPLICANT_CASECREATED" route="/fddMamage/caseCreated">已创建案件</el-menu-item>
            </el-submenu>
            <el-submenu v-if="!isPermission" index="6">
                <template slot="title">
                    <i class="el-icon-printer"></i>
                    <span slot="title">活动管理</span>
                </template>
                    <el-menu-item :class="{ 'is-active':$route.name === 'ACTIVITY_LIST'}" index="ACTIVITY_LIST" route="/rewardPlatform/activityList">活动列表</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name === 'MANUAL_REWARD'}" index="MANUAL_REWARD" route="/rewardPlatform/manualReward">手动发放奖励</el-menu-item>
            </el-submenu>

            <el-submenu v-if="!isPermission" index="7">
                <template slot="title">
                    <i class="el-icon-printer"></i>
                    <span slot="title">奖励管理</span>
                </template>
                    <el-menu-item :class="{ 'is-active':$route.name === 'GIFT_STOCK'}" index="GIFT_STOCK" route="/rewardPlatform/giftStock">礼品库存管理</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name === 'REDPACKET_LIST'}" index="REDPACKET_LIST" route="/rewardPlatform/redPacketList">现金红包管理</el-menu-item>
            </el-submenu>

            <el-submenu v-if="!isPermission" index="8">
                <template slot="title">
                    <i class="el-icon-printer"></i>
                    <span slot="title">活动记录查询</span>
                </template>
                    <el-menu-item :class="{ 'is-active':$route.name === 'XJHB_QUERY'}" index="XJHB_QUERY" route="/rewardPlatform/xjhbQuery">现金红包发放记录</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name === 'EARING_PAYMENT_QUERY'}" index="EARING_PAYMENT_QUERY" route="/rewardPlatform/earingPaymentQuery">收益券发放记录</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name === 'TXQ_QUERY'}" index="TXQ_QUERY" route="/rewardPlatform/txqQuery">提现券发放记录</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name === 'DJQ_QUERY'}" index="DJQ_QUERY" route="/rewardPlatform/djqQuery">代金券发放记录</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name === 'GIFT_QUERY'}" index="GIFT_QUERY" route="/rewardPlatform/giftQuery">礼品发放记录</el-menu-item>
                    <el-menu-item :class="{ 'is-active':$route.name === 'REALTION_REWARDQUERY'}" index="REALTION_REWARDQUERY" route="/rewardPlatform/relationRewardQuery">邀请关系与奖励</el-menu-item>
            </el-submenu>



            <el-submenu v-for="(item) in menuTree" v-if="isPermission" :key="item.id" :index="item.id">
                <template slot="title">
                    <i class="el-icon-printer"></i>
                    <span slot="title">{{item.name}}</span>
                </template>
                    <el-menu-item v-for="xmenu in item.children" :key="xmenu.id" :class="{ 'is-active':$route.name === xmenu.code}" :index="xmenu.code" :route="xmenu.url">{{xmenu.name}}</el-menu-item>
                    
            </el-submenu>

            <el-submenu v-if="!isPermission" index="9">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">作业调度管理</span>
                </template>
                <el-menu-item :class="{ 'is-active':$route.name == 'CLIENT_LIST'}" index="CLIENT_LIST" route="/taskDispatch/clientList">客户端管理</el-menu-item>
                <el-menu-item :class="{ 'is-active':$route.name == 'CLIENT_LOG'}" index="CLIENT_LOG" route="/taskDispatch/clientLog">客户端日志</el-menu-item>

                <el-menu-item :class="{ 'is-active':$route.name == 'TASK_LIST'}" index="TASK_LIST" route="/taskDispatch/taskList">任务管理</el-menu-item>
                <el-menu-item :class="{ 'is-active':$route.name == 'TASK_LOG'}" index="TASK_LOG" route="/taskDispatch/taskLog">任务日志</el-menu-item>
            </el-submenu>

            <el-submenu v-if="!isPermission" index="10">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">消息中心</span>
                </template>
                <el-menu-item :class="{ 'is-active':$route.name == 'MESSAGE_CLASS'}" index="MESSAGE_CLASS" route="/messageCenter/messageClass">分类管理</el-menu-item>
                <el-menu-item :class="{ 'is-active':$route.name == 'MESSAGE_MANAGE'}" index="MESSAGE_MANAGE" route="/messageCenter/messageManage">消息管理</el-menu-item>
            </el-submenu>

        </el-menu>
    </el-aside>
</template>
<script>
import { mapState,mapGetters } from 'vuex'
export default {
    name: '',
    components:{

    },
    data () {
        return {
            isrouter: false,
            isPermission:false,
        }
    },
    computed:{
        
         ...mapGetters({
            menuTree:'menuList'
        }),
     },
    mounted(){
        this.isPermission = window.isPermission;
    },
    methods: {
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
        },
        menuSelect(index){
            $router.push({name:index,params:{'clickable':true}})
        }
    }
}
</script>
<style lang='less' scoped>
.el-aside {
    background-color: #f0f0f0;
    color: #333;
    text-align: left;
    line-height: 20px;
}
.el-menu{
    border-right: none
}
.el-submenu .el-menu-item{
    height:40px;
    line-height:40px;
}
.el-menu-item{
    color:#666;
}
.is-active{
    color:#409EFF
}

</style>