
import home from '@/pages/home'

const menuManage = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/permissionManage/menuManage')
const roleManage = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/permissionManage/roleManage')
const permManage = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/permissionManage/permManage')

const noteManage = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/systemManage/noteManage')
const wordBookManage = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/systemManage/wordBookManage')
const wordBookDetail = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/systemManage/wordBookDetail')
const recordDetails = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/systemManage/recordDetails')
const syqrecordDetails = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/systemManage/syqrecordDetails')
const lpffrecordDetails = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/systemManage/lpffrecordDetails')
const txqrecordDetails = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/systemManage/txqrecordDetails')
const djqrecordDetails = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/systemManage/djqrecordDetails')

const operateManage = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/permissionManage/operateManage')
const resourceManage = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/permissionManage/resourceManage')
const userManage = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/permissionManage/userManage')

const organization = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/departmentManage/organization')
const staff = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/departmentManage/staff')
const account = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/departmentManage/account')
const client = ()=> import(/* webpackChunkName: "group-permission" */ '@/pages/systemManage/client')

// 法大大组件
const applicantManage = ()=> import(/* webpackChunkName: "group-fdd" */ '@/pages/fddMamage/applicantManage')
const agentManage = ()=> import(/* webpackChunkName: "group-fdd" */ '@/pages/fddMamage/agentManage')
const overdueInfo = ()=> import(/* webpackChunkName: "group-fdd" */ '@/pages/fddMamage/overdueInfo')
const caseCreated = ()=> import(/* webpackChunkName: "group-fdd" */ '@/pages/fddMamage/caseCreated')
const createCase = ()=> import(/* webpackChunkName: "group-fdd" */ '@/pages/fddMamage/createCase')

//奖励平台组件
const activityList = ()=> import(/* webpackChunkName: "group-reward" */ '@/pages/rewardPlatform/activityList')
const manualReward = ()=> import(/* webpackChunkName: "group-reward" */ '@/pages/rewardPlatform/manualReward')
const giftStock = ()=> import(/* webpackChunkName: "group-reward" */ '@/pages/rewardPlatform/giftStock')
const redPacketList = ()=> import(/* webpackChunkName: "group-reward" */ '@/pages/rewardPlatform/redPacketList')
const xjhbQuery = ()=> import(/* webpackChunkName: "group-reward" */ '@/pages/rewardPlatform/xjhbQuery')
const earingPaymentQuery = ()=> import(/* webpackChunkName: "group-reward" */ '@/pages/rewardPlatform/earingPaymentQuery')
const txqQuery = ()=> import(/* webpackChunkName: "group-reward" */ '@/pages/rewardPlatform/txqQuery')
const djqQuery = ()=> import(/* webpackChunkName: "group-reward" */ '@/pages/rewardPlatform/djqQuery')
const giftQuery = ()=> import(/* webpackChunkName: "group-reward" */ '@/pages/rewardPlatform/giftQuery')
const relationRewardQuery = ()=> import(/* webpackChunkName: "group-reward" */ '@/pages/rewardPlatform/relationRewardQuery')
const editActivity = ()=> import(/* webpackChunkName: "group-reward" */ '@/pages/rewardPlatform/editActivity')
const editCondition = ()=> import(/* webpackChunkName: "group-reward" */ '@/pages/rewardPlatform/editCondition')

// 作业调度组件
const taskList = ()=> import(/* webpackChunkName: "group-task" */ '@/pages/taskDispatch/taskList')
const taskLog = ()=> import(/* webpackChunkName: "group-task" */ '@/pages/taskDispatch/taskLog')
const clientList = ()=> import(/* webpackChunkName: "group-task" */ '@/pages/taskDispatch/clientList')
const clientLog = ()=> import(/* webpackChunkName: "group-task" */ '@/pages/taskDispatch/clientLog')

//消息中心
const messageClass = ()=> import(/* webpackChunkName: "group-message" */ '@/pages/messageCenter/messageClass')
const messageManage = ()=> import(/* webpackChunkName: "group-message" */ '@/pages/messageCenter/messageManage')


export let allPath = [
    {
        path: '/',
        name: 'layout', 
        component: (resolve) => require(['../components/layout/index.vue'], resolve),
        meta:{
            rname: '首页',
            pname:'',
            level:1
        },
        children:[
            {
                path: '/',
                name: 'home', 
                component:  home,
                meta:{
                    pname: '首页',
                    rname: '首页',
                    level:1
                }
            },
            {
                path: '/permissionManage/menuManage',
                name: 'MENU_MANAGER', 
                component: menuManage,
                meta:{
                    pname: '权限管理',
                    rname: '菜单管理',
                    level:1
                }
            },
            {
                path: '/permissionManage/roleManage',
                name: 'ROLE_MANAGER', 
                component: roleManage,
                meta:{
                    pname: '权限管理',
                    rname: '角色管理',
                    level:1
                }
            },
            {
                path: '/permissionManage/permManage',
                name: 'PERM_MANAGER', 
                component: permManage,
                meta:{
                    pname: '权限管理',
                    rname: '权限管理',
                    level:1
                }
            },
            {
                path: '/systemManage/noteManage',
                name: 'LOG_MANAGER',
                component: noteManage,
                meta:{
                    pname: '系统管理',
                    rname: '日志管理',
                    level:1
                }
            },
            {
                path: '/permissionManage/operateManage',
                name: 'OPERATE_MANAGER', 
                component: operateManage,
                meta:{
                    pname: '权限管理',
                    rname: '操作管理',
                    level:1
                }
            },
            {
                path: '/systemManage/wordBookManage',
                name: 'DICT_MANAGER', 
                component: wordBookManage,
                meta:{
                    pname: '系统管理',
                    rname: '字典管理',
                    level: 1
                }
            },
            {
                path: '/permissionManage/resourceManage',
                name: 'RES_MANAGER', 
                component: resourceManage,
                meta:{
                    pname: '权限管理',
                    rname: 'API资源管理',
                    level:1
                }
            },
            {
                path: '/systemManage/wordBookDetail',
                name: 'DICT_MANAGER_DETAIL', 
                component: wordBookDetail,
                level:2,
                meta:{
                    pname: '系统管理',
                    rname: '字典管理详情',
                    level:2
                }
            },
            {
                path: '/permissionManage/userManage',
                name: 'USERGROUP_MANAGER', 
                component: userManage,
                meta:{
                    pname: '权限管理',
                    rname: '用户组管理',
                    level:1
                }
            },
            {
                path: '/departmentManage/organization',
                name: 'ORG_MANAGER', 
                component: organization,
                meta:{
                    pname: '部门人员管理',
                    rname: '部门管理',
                    level:1
                }
            },   
            {
                path: '/departmentManage/staff',
                name: 'STAFF_MANAGER', 
                component: staff,
                meta:{
                    pname: '部门人员管理',
                    rname: '员工管理',
                    level:1
                }
            },
            {
                path: '/departmentManage/account',
                name: 'ACCOUNT_MANAGER', 
                component: account,
                meta:{
                    pname: '部门人员管理',
                    rname: '账号管理',
                    level:1
                }
            },
            {
                path: '/systemManage/client',
                name: 'CLIENT_MANAGE', 
                component: client,
                meta:{
                    pname: '部门人员管理',
                    rname: '客户端管理',
                    level:1
                }
            },
            {
                path: '/fddMamage/applicantManage',
                name: 'APPLICANT_MANAGE', 
                component: applicantManage,
                meta:{
                    pname: '案件人员管理',
                    rname: '添加申请人信息',
                    level:1
                }
            },
            {
                path: '/fddMamage/agent',
                name: 'AGENT_MANAGE', 
                component: agentManage,
                meta:{
                    pname: '案件人员管理',
                    rname: '添加代理人信息',
                    level:1
                }
            },
            {
                path: '/fddMamage/overdueInfo',
                name: 'APPLICANT_OVERDUEINFO', 
                component: overdueInfo,
                meta:{
                    pname: '案件管理',
                    rname: '逾期信息列表',
                    level:1
                }
            },
            {
                path: '/fddMamage/caseCreated',
                name: 'APPLICANT_CASECREATED', 
                component: caseCreated,
                meta:{
                    pname: '案件管理',
                    rname: '已创建案件',
                    level:1
                }
            },
            {
                path: '/fddMamage/createCase',
                name: 'APPLICANT_CREATECASE', 
                component: createCase,
                level:2,
                meta:{
                    pname: '案件管理',
                    rname: '创建案件',
                    level:2
                }
            },

            {
                path: '/rewardPlatform/activityList',
                name: 'ACTIVITY_LIST', 
                component: activityList,
                meta:{
                    pname: '活动管理',
                    rname: '活动列表',
                    level:1
                }
            },
            {
                path: '/rewardPlatform/manualReward',
                name: 'MANUAL_REWARD', 
                component: manualReward,
                meta:{
                    pname: '活动管理',
                    rname: '手动发放奖励',
                    level:1
                }
            },
            {
                path: '/rewardPlatform/giftStock',
                name: 'GIFT_STOCK', 
                component: giftStock,
                meta:{
                    pname: '奖励管理',
                    rname: '礼品库存管理',
                    level:1
                }
            },
            {
                path: '/rewardPlatform/redPacketList',
                name: 'REDPACKET_LIST', 
                component: redPacketList,
                meta:{
                    pname: '奖励管理',
                    rname: '现金红包管理',
                    level:1
                }
            },
            {
                path: '/rewardPlatform/xjhbQuery',
                name: 'XJHB_QUERY',
                component: xjhbQuery,
                meta:{
                    pname: '活动记录查询',
                    rname: '现金红包发放记录',
                    level:1
                }
            },
            {
                path: '/systemManage/recordDetails',
                name: 'RECORD_DETAILS',
                component: recordDetails,
                meta:{
                    pname: '活动记录查询',
                    rname: '现金红包发放记录详情',
                    level:2
                }
            },
            {
                path: '/systemManage/syqrecordDetails',
                name: 'SYQRECORD_DETAILS',
                component: syqrecordDetails,
                meta:{
                    pname: '活动记录查询',
                    rname: '收益券发放记录详情',
                    level:2
                }
            },
            {
                path: '/systemManage/lpffrecordDetails',
                name: 'LPFFRECORD_DETAILS',
                component: lpffrecordDetails,
                meta:{
                    pname: '活动记录查询',
                    rname: '礼品发放记录详情',
                    level:2
                }
            },
            {
                path: '/systemManage/txqrecordDetails',
                name: 'TXQRECORD_DETAILS',
                component: txqrecordDetails,
                meta:{
                    pname: '活动记录查询',
                    rname: '提现券发放记录详情',
                    level:2
                }
            },
            {
                path: '/systemManage/djqrecordDetails',
                name: 'DJQRECORD_DETAILS',
                component: djqrecordDetails,
                meta:{
                    pname: '活动记录查询',
                    rname: '代金券发放记录详情',
                    level:2
                }
            },
            {
                path: '/rewardPlatform/earingPaymentQuery',
                name: 'EARING_PAYMENT_QUERY',
                component: earingPaymentQuery,
                meta:{
                    pname: '活动记录查询',
                    rname: '收益券发放记录',
                    level:1
                }
            },
            {
                path: '/rewardPlatform/txqQuery',
                name: 'TXQ_QUERY', 
                component: txqQuery,
                meta:{
                    pname: '活动记录查询',
                    rname: '提现券发放记录',
                    level:1
                }
            },
            {
                path: '/rewardPlatform/djqQuery',
                name: 'DJQ_QUERY', 
                component: djqQuery,
                meta:{
                    pname: '活动记录查询',
                    rname: '代金券发放记录',
                    level:1
                }
            },
            {
                path: '/rewardPlatform/giftQuery',
                name: 'GIFT_QUERY',
                component: giftQuery,
                meta:{
                    pname: '活动记录查询',
                    rname: '礼品发放记录',
                    level:1
                }
            },
            {
                path: '/rewardPlatform/relationRewardQuery',
                name: 'REALTION_REWARDQUERY',
                component: relationRewardQuery,
                meta:{
                    pname: '活动记录查询',
                    rname: '邀请关系与奖励',
                    level:1
                }
            },
            {
                path: '/rewardPlatform/editActivity',
                name: 'EDIT_ACTIVITY', 
                component: editActivity,
                level:2,
                meta:{
                    pname: '活动管理',
                    rname: '修改活动',
                    level:2
                }
            },
            {
                path: '/rewardPlatform/editCondition',
                name: 'EDIT_CONDITION', 
                component: editCondition,
                level:2,
                meta:{
                    pname: '活动管理',
                    rname: '修改条件',
                    level:2
                }
            },{
                path: '/taskDispatch/clientLog',
                name: 'CLIENT_LOG',
                component: clientLog,
                meta:{
                    pname: '作业调度管理',
                    rname: '客户端日志',
                    level:1
                }
            },
            {
                path: '/taskDispatch/taskLog',
                name: 'TASK_LOG',
                component: taskLog,
                meta:{
                    pname: '作业调度管理',
                    rname: '任务日志',
                },
            },
            {
                path: '/taskDispatch/taskList',
                name: 'TASK_LIST',
                component: taskList,
                meta:{
                    pname: '作业调度管理',
                    rname: '任务管理',
                }
            },
            {
                path: '/taskDispatch/clientList',
                name: 'CLIENT_LIST',
                component: clientList,
                meta:{
                    pname: '作业调度管理',
                    rname: '客户端管理',
                }
            },

            {
                path: '/messageCenter/messageClass',
                name: 'MESSAGE_CLASS',
                component: messageClass,
                meta:{
                    pname: '消息中心',
                    rname: '分类管理',
                }
            },
            {
                path: '/messageCenter/messageManage',
                name: 'MESSAGE_MANAGE',
                component: messageManage,
                meta:{
                    pname: '消息中心',
                    rname: '消息管理',
                }
            }
        ]
    }
]