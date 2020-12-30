import axios from "../config/afetch"
import fileAxios from '../config/fileAfetch'
import {api} from '../config/configUrl'

// export const queryMenuManageList = (params) => axios.post(api.menuManage.queryPage,getParams(params))
export default {
    login : (params) => axios.post(api.login.auth,params),
    userPermissionMenu : (params) => axios.post(api.login.userPermissionMenu,params),
    systemList : (params) => axios.post(api.login.systemList,params),
    pwd : (params) => axios.post(api.login.pwd,params),
    refreshToken : (params) => axios.post(api.login.refreshToken,params),

    //树形结构
    queryMenuTree : (params) => axios.post(api.tree.menu,params),
    queryPermissionTree : (params) => axios.post(api.tree.permission,params),
    queryUserGroupTree : (params) => axios.post(api.tree.userGroup,params),
    queryRoleTree : (params) => axios.post(api.tree.role,params),
    queryResourceTree : (params) => axios.post(api.tree.resource,params),
    queryOrgTree : (params) => axios.post(api.tree.org,params),

    permRefresh : (params) => axios.post(api.tree.refresh,params),

    //菜单
    queryMenuManageList : (params) => axios.post(api.menuManage.queryPage,params),
    queryRoleManageList : (params) => axios.post(api.menuManage.queryRoleManageList,params),
    queryPermManageList : (params) => axios.post(api.menuManage.queryPermManageList,params),
    //字典管理列表
    queryWordManageList : (params) => axios.post(api.wordManage.queryWordManageList,params),
    addWord : (params) => axios.post(api.wordManage.addWord,params),
    wordEnableDis : (params) => axios.post(api.wordManage.wordEnableDis,params),
    wordDelete : (params) => axios.post(api.wordManage.wordDelete,params),
    wordUpdate : (params) => axios.post(api.wordManage.wordUpdate,params),
    wordUpdateQuery : (params) => axios.post(api.wordManage.wordUpdateQuery,params),
    wordOptionQuery : (params) => axios.post(api.wordManage.wordOptionQuery,params),
    //字典详情
    wordDetailList : (params) => axios.post(api.wordManage.wordDetailList,params),
    wordDetailAdd : (params) => axios.post(api.wordManage.wordDetailAdd,params),
    wordDetailDel : (params) => axios.post(api.wordManage.wordDetailDel,params),
    wordDetailUpdate : (params) => axios.post(api.wordManage.wordDetailUpdate,params),
    //日志管理列表
    queryNoteManageList : (params) => axios.post(api.noteManage.queryNoteManageList,params),
    queryMenuManageDetail : (params) => axios.post(api.menuManage.detail,params),
    addMenuManage : (params) => axios.post(api.menuManage.add,params),
    toggleMenu : (params) => axios.post(api.menuManage.toggle,params),
    deleteMenu : (params) => axios.post(api.menuManage.delete,params),
    allMenu : (params) => axios.post(api.menuManage.all,params),
    updateMenu : (params) => axios.post(api.menuManage.update,params),
    updateOrder: (params) => axios.post(api.menuManage.updateOrder,params),

    //权限
    queryPermManageList : (params) => axios.post(api.permManage.queryPermManageList,params),
    queryPermManageDetail : (params) => axios.post(api.permManage.detail,params),
    addPermManage : (params) => axios.post(api.permManage.add,params),
    updatePermManage : (params) => axios.post(api.permManage.update,params),
    getPermManageTree : (params) => axios.post(api.permManage.tree,params),
    togglePerm : (params) => axios.post(api.permManage.toggle,params),
    deletePerm : (params) => axios.post(api.permManage.delete,params),
    menuTree : (params) => axios.post(api.permManage.menuTree,params),
    resourceTree : (params) => axios.post(api.permManage.resourceTree,params),
    assignMenu : (params) => axios.post(api.permManage.assignMenu,params),
    assignResource : (params) => axios.post(api.permManage.assignResource,params),

    //角色
    queryRoleManageList : (params) => axios.post(api.roleManage.queryList,params),
    queryRoleManageDetail : (params) => axios.post(api.roleManage.detail,params),
    addRoleManage : (params) => axios.post(api.roleManage.add,params),
    getRoleManageTree : (params) => axios.post(api.roleManage.tree,params),
    toggleRole : (params) => axios.post(api.roleManage.toggle,params),
    deleteRole : (params) => axios.post(api.roleManage.delete,params),
    updateRole : (params) => axios.post(api.roleManage.update,params),
    assignPermRole : (params) => axios.post(api.roleManage.assignPermRole,params),

    //操作
    queryOperateManageList : (params) => axios.post(api.operateManage.queryPage,params),
    queryOperateManageDetail : (params) => axios.post(api.operateManage.detail,params),
    addOperateManage : (params) => axios.post(api.operateManage.add,params),
    toggleOperate : (params) => axios.post(api.operateManage.toggle,params),
    deleteOperate : (params) => axios.post(api.operateManage.delete,params),
    allOperate : (params) => axios.post(api.operateManage.all,params),
    updateOperate : (params) => axios.post(api.operateManage.update,params),

    getOperatesByMenu : (params) => axios.post(api.operateManage.getOperatesByMenu,params),

    //资源
    queryResourceManageList : (params) => axios.post(api.resourceManage.queryPage,params),
    queryResourceManageDetail : (params) => axios.post(api.resourceManage.detail,params),
    addResourceManage : (params) => axios.post(api.resourceManage.add,params),
    toggleResource : (params) => axios.post(api.resourceManage.toggle,params),
    deleteResource : (params) => axios.post(api.resourceManage.delete,params),
    allResource : (params) => axios.post(api.resourceManage.all,params),
    updateResource : (params) => axios.post(api.resourceManage.update,params),

    //用户组
    queryUserManageList : (params) => axios.post(api.userManage.queryPage,params),
    queryUserManageDetail : (params) => axios.post(api.userManage.detail,params),
    addUserManage : (params) => axios.post(api.userManage.add,params),
    toggleUser : (params) => axios.post(api.userManage.toggle,params),
    deleteUser : (params) => axios.post(api.userManage.delete,params),
    userassignRole : (params) => axios.post(api.userManage.assignRole,params),
    updateUser : (params) => axios.post(api.userManage.update,params),

    //组织机构管理
    queryOrgManageList : (params) => axios.post(api.organization.queryPage,params),
    queryOrgManageDetail : (params) => axios.post(api.organization.view,params),
    addOrgManage : (params) => axios.post(api.organization.add,params),
    toggleOrg : (params) => axios.post(api.organization.toggle,params),
    enableOrg : (params) => axios.post(api.organization.enable,params),
    disableOrg : (params) => axios.post(api.organization.disable,params),
    orgassignRole : (params) => axios.post(api.organization.assignRole,params),
    updateOrg : (params) => axios.post(api.organization.update,params),

    //员工管理
    queryStaffList : (params) => axios.post(api.staff.queryPage,params),
    queryStaffDetail : (params) => axios.post(api.staff.view,params),
    addStaffManage : (params) => axios.post(api.staff.add,params),
    // toggleOrg : (params) => axios.post(api.staff.toggle,params),
    enableStaff : (params) => axios.post(api.staff.enable,params),
    disableStaff : (params) => axios.post(api.staff.disable,params),
    // orgassignRole : (params) => axios.post(api.staff.assignRole,params),
    updateStaff : (params) => axios.post(api.staff.update,params),

    //账号管理
    queryAccountList : (params) => axios.post(api.account.queryPage,params),
    queryAccountDetail : (params) => axios.post(api.account.view,params),
    addAccountManage : (params) => axios.post(api.account.add,params),
    enableAccount : (params) => axios.post(api.account.enable,params),
    disableAccount : (params) => axios.post(api.account.disable,params),
    updateAccount : (params) => axios.post(api.account.update,params),
    batchQueryStaff : (params) => axios.post(api.account.batchQuery,params),

    accountGrant : (params) => axios.post(api.account.auto,params),
    accountQueryAuto : (params) => axios.post(api.account.queryAuto,params),
    resetPwd : (params) => axios.post(api.account.reset,params),

    //客户端管理
    queryClientList : (params) => axios.post(api.client.queryPage,params),
    queryClientDetail : (params) => axios.post(api.client.view,params),
    addClient : (params) => axios.post(api.client.add,params),
    enableClient : (params) => axios.post(api.client.enable,params),
    disableClient : (params) => axios.post(api.client.disable,params),
    updateClient : (params) => axios.post(api.client.update,params),
    removeClient : (params) => axios.post(api.client.remove,params),

    //法大大模块
    // gettoken : (params) => axios.post('http://10.167.202.143:8080/token/generate',params),
    // upload : (params) => axios.post(api.applicantManage.upload,params)
    applicantList : (params) => axios.post(api.applicantManage.applicantList,params),//页面加载请求数据
    fddAdd : (params) => axios.post(api.applicantManage.Add,params), //增加数据
    detail : (params) => axios.post(api.applicantManage.detail,params), //查看数据
    fddaddChange : (params) => axios.post(api.applicantManage.fddaddChange,params), //修改数据
   
    agentList : (params) => axios.post(api.agentManage.applicantList,params),//页面加载请求数据
    agentFddAdd : (params) => axios.post(api.agentManage.Add,params), //增加数据
    agentDetail : (params) => axios.post(api.agentManage.detail,params), //查看数据
    agentFddaddChange : (params) => axios.post(api.agentManage.fddaddChange,params), //修改数据 

    //案件管理
    queryOverdue : (params) => axios.post(api.litigant.queryOverdue,params),
    queryCreateCase : (params) => axios.post(api.litigant.queryCreateCase,params),
    caseQuery : (params) => axios.post(api.litigant.caseQuery,params),
    agentList : (params) => axios.post(api.litigant.agentList,params),
    applicantList : (params) => axios.post(api.litigant.applicantList,params),
    caseResourcesCreate : (params) => axios.post(api.litigant.caseResourcesCreate,params),
    caseinforcreate : (params) => axios.post(api.litigant.caseinforcreate,params),
    singleUpFile : (params) => fileAxios.post(api.upFile.singleUpFile,params),
    batchUpFile : (params) => fileAxios.post(api.upFile.batchUpFile,params),

    //奖励平台
    queryAciveityList : (params) => axios.post(api.reward.queryAciveityList,params),
    activityUpdate : (params) => axios.post(api.reward.activityUpdate,params),
    addActivity : (params) => axios.post(api.reward.addActivity,params),
    auditCon : (params) => axios.post(api.reward.audit,params),
    actQueryCondition : (params) => axios.post(api.reward.queryCondition,params),
    actQueryChannelCode : (params) => axios.post(api.reward.queryChannelCode,params),
    actQueryPrize : (params) => axios.post(api.reward.queryPrizeById,params),
    actDeleteActivityCon : (params) => axios.post(api.reward.deleteActivityCon,params),
    actToAddCondition : (params) => axios.post(api.reward.toAddCondition,params),
    actQueryConByHc : (params) => axios.post(api.reward.queryConByHc,params),
    managerList : (params) => axios.post(api.reward.managerList,params),
    addActivityCondition : (params) => axios.post(api.reward.addActivityCondition,params,{
        useformData:true
    }),
    queryPrizeList : (params) => axios.post(api.reward.queryPrizeList,params),
    givePrizeSave : (params) => axios.post(api.reward.givePrizeSave,params),
    queryTopicAct : (params) => axios.post(api.reward.queryTopicAct,params),
    queryMutuaPrize : (params) => axios.post(api.reward.queryMutuaPrize,params),

    // 作业管理
    customerManagement : (params) => axios.post(api.taskManage.customerManagement,params),
    clientList : (params) => axios.post(api.taskManage.clientList,params),
    taskAddClient : (params) => axios.post(api.taskManage.taskAddClient,params),
    addTask : (params) => axios.post(api.taskManage.addTask,params),
    modifyTask : (params) => axios.post(api.taskManage.modifyTask,params),
    modifyClient : (params) => axios.post(api.taskManage.modifyClient,params),
    taskEnable : (params) => axios.post(api.taskManage.enable,params),
    taskDisable : (params) => axios.post(api.taskManage.disable,params),
    taskQueryAppId : (params) => axios.post(api.taskManage.queryAppId,params),

    //hy
    listPage : (params) => axios.post(api.taskManage.listPage,params),
    logAdd : (params) => axios.post(api.taskManage.logAdd,params),
    clientLogSearch : (params) => axios.post(api.taskManage.clientLogSearch,params),

    taskAddClient : (params) => axios.post(api.taskManage.taskAddClient,params),
    taskClientEnable : (params) => axios.post(api.taskManage.taskClientEnable,params),
    taskClientDisable : (params) => axios.post(api.taskManage.taskClientDisable,params),

    //消息中心
    messageClassList : (params) => axios.post(api.messageCenter.classList,params),
    messageEditClass : (params) => axios.post(api.messageCenter.editClass,params),
    messageClassDetail : (params) => axios.post(api.messageCenter.classDetail,params),
    messageClassAdd : (params) => axios.post(api.messageCenter.classAdd,params),
    messageSearchHandler : (params) => axios.post(api.messageCenter.searchHandler,params),
    messageSearchHandlerCode : (params) => axios.post(api.messageCenter.searchHandlerCode,params),
    messageUpdateHandler : (params) => axios.post(api.messageCenter.updateHandler,params),
    messageEnable : (params) => axios.post(api.messageCenter.enable,params),
    messageDisable : (params) => axios.post(api.messageCenter.disable,params),
    
    msgManageList : (params) => axios.post(api.messageCenter.manageList,params),
    msgManageUpdate : (params) => axios.post(api.messageCenter.manageUpdate,params),
    msgManageDetail : (params) => axios.post(api.messageCenter.manageDetail,params),

    //活动记录
    totalList : (params) => axios.post(api.activityRecord.totalList,params),
    cashBonusList : (params) => axios.post(api.activityRecord.cashBonusList,params),
    cashBonusEnable : (params) => axios.post(api.activityRecord.cashBonusEnable,params),
    withdrawVoucherDisable : (params) => axios.post(api.activityRecord.withdrawVoucherDisable,params),
    withdrawVoucherEnable : (params) => axios.post(api.activityRecord.withdrawVoucherEnable,params),
    cashBonusCancel : (params) => axios.post(api.activityRecord.cashBonusCancel,params),
    recordTotalList : (params) => axios.post(api.activityRecord.recordTotalList,params),
    SyqTotalList : (params) => axios.post(api.activityRecord.SyqTotalList,params),
    raiseInterestVoucherList : (params) => axios.post(api.activityRecord.raiseInterestVoucherList,params),
    syqDisable : (params) => axios.post(api.activityRecord.syqDisable,params),
    syqenable : (params) => axios.post(api.activityRecord.syqenable,params),
    recordList : (params) => axios.post(api.activityRecord.recordList,params),
    syqCancel : (params) => axios.post(api.activityRecord.syqCancel,params),
    txqCancel : (params) => axios.post(api.activityRecord.txqCancel,params),
    djqTotalList : (params) => axios.post(api.activityRecord.djqTotalList,params),
    voucherList : (params) => axios.post(api.activityRecord.voucherList ,params),
    voucherDisable : (params) => axios.post(api.activityRecord.voucherDisable ,params),
    voucherable : (params) => axios.post(api.activityRecord.voucherable ,params),
    djqVoucherCancel : (params) => axios.post(api.activityRecord.djqVoucherCancel ,params),
    lpffrecordTotalList : (params) => axios.post(api.activityRecord.lpffrecordTotalList ,params),
    voucherGiftList : (params) => axios.post(api.activityRecord.voucherGiftList ,params),
    invitePrizeList : (params) => axios.post(api.activityRecord.invitePrizeList ,params),

    inviteExport : (params) => axios.get(api.reward.inviteExport ,params),
}
