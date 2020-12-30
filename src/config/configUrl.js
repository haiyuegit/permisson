const api = {
    login : {
        "auth" : "/user/auth/proxy/token",
        "userPermissionMenu" : "/rbac/permission/configurator/userPermissionMenu",
        "systemList" : "dict/details/option",
        "pwd" : "/user/account/modify/pwd",
        "refreshToken" : "/user/auth/proxy/token-refresh"
    },

    tree:{
        "menu": "/rbac/menu/configurator/tree",
        "permission": "/rbac/permission/configurator/tree",
        "userGroup": "/rbac/userGroup/configurator/tree",
        "role": "/rbac/role/configurator/tree",
        "resource": "/rbac/resource/configurator/tree",
        "org" : "/user/org/tree",

        "menuOperate": "/rbac/permission/configurator/userPermissionMenu",
        "refresh": "/rbac/permission/refresh/"
    },
    
    menuManage: {
        // "queryPage": "/permission/configurator/page",
        // "queryRoleManageList": "/role/configurator/page",
        // "queryPermManageList": "/permission/configurator/page",
        "queryPage": "/rbac/menu/configurator/page",
        "queryRoleManageList": "/rbac/role/configurator/page",
        "detail": "/rbac/menu/configurator/detail",
        "add": "/rbac/menu/configurator/add",
        "toggle": "/rbac/menu/configurator/toggle",
        "delete": "/rbac/menu/configurator/delete",
        "all": "/rbac/operate/configurator/all",
        "update": "/rbac/menu/configurator/update",
        "updateOrder": "/rbac/menu/configurator/updateOrder",
    },
    wordManage: {//字典管理
        "queryWordManageList": "/dict/type/list",//查询列表
        "addWord": "/dict/type/add",//新增
        "wordEnableDis": "/dict/type/status/update",//启用禁用
        "wordDelete": "/dict/type/delete",//批量删除
        "wordUpdate": "/dict/type/update",//更新
        "wordUpdateQuery": "/dict/type/query",//更新回显
        "wordOptionQuery": "/dict/details/option",//更新回显
        ////////////////字典详情管理
        "wordDetailUpdate": "/dict/details/update",//详情修改
        "wordDetailDel": "/dict/details/delete",//详情删除
        "wordDetailAdd": "/dict/details/add",//详情添加
        "wordDetailList": "/dict/details/list",//详情列表
    },
    noteManage: {//日志管理
        "queryNoteManageList": "/log/xhsr/behavior/find/page"
    },
    
    permManage: {
        "queryPermManageList": "/rbac/permission/configurator/page",
        "update": "/rbac/permission/configurator/update",
        "assignMenu": "/rbac/permission/configurator/assignMenu",
        "assignResource": "/rbac/permission/configurator/assignResource",
        "detail": "/rbac/permission/configurator/detail",
        "add": "/rbac/permission/configurator/add",
        "tree": "/rbac/permission/configurator/tree",
        "toggle": "/rbac/permission/configurator/toggle",
        "delete": "/rbac/permission/configurator/delete",
        "menuTree": "/rbac/menu/configurator/tree",
        "resourceTree": "/rbac/resource/configurator/tree",
    },

    roleManage: {
        "queryList": "/rbac/role/configurator/page",
        // "assignMenu": "/role/configurator/assignMenu",
        // "assignResource": "/role/configurator/assignResource",
        "detail": "/rbac/role/configurator/detail",
        "add": "/rbac/role/configurator/add",
        "tree": "/rbac/role/configurator/tree",
        "toggle": "/rbac/role/configurator/toggle",
        "delete": "/rbac/role/configurator/delete",
        "update": "/rbac/role/configurator/update",
        "assignPermRole" : "/rbac/role/configurator/assignPermission",
        // "resourceTree": "/resource/configurator/tree",
    },

    operateManage: {
        "queryPage": "/rbac/operate/configurator/page",
        "queryRoleManageList": "/rbac/role/configurator/page",
        "detail": "/rbac/operate/configurator/detail",
        "add": "/rbac/operate/configurator/add",
        "toggle": "/rbac/operate/configurator/toggle",
        "delete": "/rbac/operate/configurator/delete",
        "all": "/rbac/operate/configurator/all",
        "update": "/rbac/operate/configurator/update",

        "getOperatesByMenu": "/rbac/operate/configurator/getoperatesbymenu",
    },

    resourceManage: {
        "queryPage": "/rbac/resource/configurator/page",
        "detail": "/rbac/resource/configurator/detail",
        "add": "/rbac/resource/configurator/add",
        "toggle": "/rbac/resource/configurator/toggle",
        "delete": "/rbac/resource/configurator/delete",
        "all": "/rbac/operate/configurator/all",
        "update": "/rbac/resource/configurator/update",
    },

    userManage: {
        "assignRole": "/rbac/usergroup/configurator/assignRole",
        "queryPage": "/rbac/usergroup/configurator/page",
        "detail": "/rbac/usergroup/configurator/detail",
        "add": "/rbac/usergroup/configurator/add",
        "toggle": "/rbac/usergroup/configurator/toggle",
        "delete": "/rbac/usergroup/configurator/delete",
        "update": "/rbac/usergroup/configurator/update",
    },

    organization: {
        "queryPage": "/user/org/list",
        "enable" : "/user/org/enable",
        "disable" : "/user/org/disable",
        "detail": "/operate/configurator/detail",
        "add": "/user/org/add",
        "update": "/user/org/modify",
        "view": "/user/org/view",
    },

    staff: {
        "queryPage": "/user/staff/list/page",
        "enable" : "/user/staff/enable",
        "disable" : "/user/staff/disable",
        "detail": "/operate/configurator/detail",
        "add": "/user/staff/add",
        "update": "/user/staff/modify",
        "view": "/user/staff/view",
    },

    account: {
        "queryPage": "/user/account/list",
        "enable" : "/user/account/enable",
        "disable" : "/user/account/disable",
        "add": "/user/account/add",
        "update": "/user/account/modify",
        "view": "/user/account/view",
        "batchQuery" : "/user/account/ids-list",

        "auto" : "/rbac/role/configurator/auto",
        "queryAuto" : "/rbac/role/configurator/query-auth",
        "reset" : "/user/account/pwd/reset"
    },

    client: {
        "queryPage" : "/user/auth-client/list/page",
        "enable" : "/user/auth-client/enable",
        "disable" : "/user/auth-client/disable",
        "add": "/user/auth-client/add",
        "update": "/user/auth-client/modify",
        "view": "/user/auth-client/view",
        "remove" : "/user/auth-client/remove"
    },
    applicantManage: {
        "gettoken" : "/token/generate",
        "upload" : "/dfs/http/api/upload/normal/batch",
        "applicantList" : "/zcj/litigant/applicant/list",
        "Add" : "/zcj/litigant/applicant/add",
        "detail" : "/zcj/litigant/applicant/details",
        "fddaddChange" :  "/zcj/litigant/applicant/modify"
    },
    agentManage: {
        "gettoken" : "/token/generate",
        "upload" : "/dfs/http/api/upload/normal/batch",
        "applicantList" : "/zcj/litigant/agent/list",
        "Add" : "/zcj/litigant/agent/add",
        "detail" : "/zcj/litigant/agent/details",
        "fddaddChange" : "/zcj/litigant/applicant/modify" 
    },
    litigant: {
        "queryOverdue" : "/zcj/litigant/overdue/list/page",
        "queryCreateCase" : "/zcj/litigant/case/list/page",
        "caseQuery" : "/zcj/litigant/case/caseQuery",
        "agentList" : "/zcj/litigant/agent/list",
        "applicantList" : "/zcj/litigant/applicant/list",
        "caseResourcesCreate" : "/zcj/litigant/case/caseResourcesCreate",

        "caseinforcreate" : "/zcj/litigant/case/caseinforcreate"
    },

    reward: {
        "queryAciveityList" : "/reward/configurator/topic/query-page",
        "activityUpdate" : "/reward/configurator/topic/update",
        "addActivity" : "/reward/configurator/topic/add",
        "managerList" : "/reward/giver/cash-bonus/list/manager",
        "audit" : "/reward/giver/cash-bonus/audit",
        "queryCondition" : "/reward/configurator/condition/query-condition-list-by-activity-id",
        "queryChannelCode" : "/reward/configurator/condition/query-channelcode-list-by-condition-id",
        "queryPrizeById" : "/reward/configurator/condition/query-prize-by-condition-id",
        "deleteActivityCon" : "/reward/configurator/condition/del-condition-by-id",
        "toAddCondition" : "/reward/configurator/condition/to-add-activity-condition",
        "queryConByHc" : "/reward/configurator/condition/query-condition-list-by-activity-id-for-hc",
        "addActivityCondition" : "/reward/configurator/condition/add-activity-condition",
        "queryPrizeList" : "/reward/configurator/condition/query-prize-select",
        "givePrizeSave" : "/reward/configurator/condition/give-prize-save",
        "queryTopicAct" : "/reward/configurator/topic/query",
        "queryMutuaPrize" : "/reward/configurator/condition/query-activity-prize",
        "inviteExport" : "/reward/giver/invite-prize/export",
    },

    upFile: {
        "singleUpFile" : "/dfs/http/api/upload/normal/single",
        "batchUpFile" : "/dfs/http/api/upload/normal/batch"
    },

    taskManage: {
        "customerManagement" : "/scheduler/task/log/list/page",
        "clientList" : "/scheduler/client/list/page",
        "taskAddClient" : "/scheduler/client/add",
        "addTask" : "/scheduler/task/add",
        "modifyTask" : "/scheduler/task/modify",
        "modifyClient" : "/scheduler/client/modify",
        "enable" : "/scheduler/task/enable",
        "disable" : "/scheduler/task/disable",
        "listPage" : "/scheduler/client/log/list/page",
        "logAdd" : "/scheduler/client/log/add",
        "clientLogSearch" : "/scheduler/task/list/page",
        "queryAppId" : "/scheduler/client/app-id/query",

        "taskClientEnable" : "/scheduler/client/enable",
        "taskClientDisable" : "/scheduler/client/disable",
    },

    messageCenter: {
        "classList" : "/message/category/configurator/search",
        "editClass" : "/message/category/configurator/edit",
        "classDetail" : "/message/category/configurator/detail",
        "classAdd" : "/message/category/configurator/add",
        "searchHandler" : "/message/category/configurator/searchHandler/id",
        "searchHandlerCode" : "/message/category/configurator/searchHandler/code",
        "updateHandler" : "/message/category/configurator/updateHandler",
        "enable" : "/message/category/configurator/enable",
        "disable" : "/message/category/configurator/disable",

        "manageList" : "/message/info/configurator/search",
        "manageUpdate" : "/message/info/configurator/updateHandlerStatus",
        "manageDetail" : "/message/info/configurator/detail"
    },
    activityRecord: {//活动记录查询
        "totalList" : "/reward/configurator/cash-bonus/record/total-list",
        "cashBonusList" : "/reward/giver/cash-bonus/list",
        "cashBonusEnable" : "/reward/giver/cash-bonus/enable",
        "withdrawVoucherDisable" : "/reward/giver/withdraw-voucher/disable",
        "withdrawVoucherEnable" : "/reward/giver/withdraw-voucher/enable",
        "cashBonusCancel" : "/reward/giver/cash-bonus/cancel",
        "recordTotalList" : "/reward/configurator/withdraw-voucher/record/total-list",
        "SyqTotalList" : "/reward/configurator/raise-interest-voucher/record/total-list",
        "raiseInterestVoucherList" : "/reward/giver/raise-interest-voucher/list",
        "syqDisable" : "/reward/giver/raise-interest-voucher/disable",
        "syqenable" : "/reward/giver/raise-interest-voucher/enable",
        "recordList" : "/reward/giver/withdraw-voucher/record/list",
        "syqCancel" : "/reward/giver/raise-interest-voucher/cancel",
        "txqCancel" : "/reward/giver/withdraw-voucher/cancel",
        "djqTotalList" : "/reward/configurator/voucher/record/total-list",
        "voucherList" : "/reward/giver/voucher/list",
        "voucherDisable" : "/reward/giver/voucher/disable",
        "voucherable" : "/reward/giver/voucher/enable",
        "djqVoucherCancel" : "/reward/giver/voucher/cancel",
        "lpffrecordTotalList" : "/reward/configurator/voucher-gift/record/total-list",
        "voucherGiftList" : "/reward/giver/voucher-gift/list",
        "invitePrizeList" : "/reward/giver/invite-prize/list",
    }
};

export {api};
