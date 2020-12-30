// define( function(require, exports, module) {

 let _selectData = {
        Proportlist : {
            "GDJE":"固定金额",
            "TZJE":"投资金额",
            "ZBJE":"折标金额",
            "SYJE":"收益金额"
        },
        ProportTZlist : {
            "GDJE":"固定金额",
            "TZJE":"投资金额",
            "ZBJE":"折标金额",
        },
        ProportSYlist : {
            "SYJE":"收益金额"
        },
        ProportXWlist : {
            "GDJE":"固定金额",
        },
        // [
        //     {
        //        name:"GDJE",
        //        value:"固定金额"
        //     },{
        //        name:"TZJE",
        //        value:"投资金额"
        //     },{
        //        name:"ZBJE",
        //        value:"折标金额"
        //     },{
        //        name:"SYJE",
        //        value:"收益金额"
        //     }
        // ],
        conditionType : {
            "REGISTER":"注册",
            "OPEN_BANK":"开户",
            "LOGIN":"登录",
            "RECHARGE":"充值",
            "WITHDRAW":"提现",
            "FIRST_INVESTMENT":"首投",
            "INVESTMENT":"复投（除首投外）",
            "SINGLE_INVESTMENT":"单笔投资",
            "TWO_INVESTMENT":"第二笔投资",
            "SINGLE_INVESTMENT_RESIDUE":"单笔投资(除首投和第二笔投资外)"
        },
        conditionType_invit : {
            "REGISTER":"好友注册",
            "OPEN_BANK":"好友开户(绑卡成功)",
            // "LOGIN":"登录",
            // "RECHARGE":"充值",
            // "WITHDRAW":"提现",
            "FIRST_INVESTMENT":"好友首投(按首投时间计)",
            "INVESTMENT":"好友复投(从第二笔投资计)",
            "SINGLE_INVESTMENT":"好友投资",
            // "TWO_INVESTMENT":"第二笔投资",
            // "SINGLE_INVESTMENT_RESIDUE":"单笔投资(除首投和第二笔投资外)"
        },
        useScopelist : {
            "DJR":{
                "YCJH":"月乘计划",
                "YQJH":"月取计划",
                "YTJH":"月投计划",
                "YYS":"月月升",
                "XSB":"新手标",
            },
            "ZCJ":{
                "SB":"散标",
                "JYJH":"嘉盈计划",
                // "XSB":"新手标"
            }
        },
        productUseScopelist : {
            "DJR":{
                "0":"全部",
                "YCJH":"月乘计划",
                "YQJH":"月取计划",
                "YTJH":"月投计划",
                "YYS":"月月升",
                "XSB":"新手标",
            },
            "ZCJ":{
                "0":"全部",
                "SB":"散标",
                "JYJH":"嘉盈计划",
                // "XSB":"新手标"
            }
        },
        activityStatus : {
            "READY_ENABLE": "待开启",
            "ENABLED": "已开启",
            "IN_PROGRESS": "进行中",
            "EXPIRED": "已过期"
        },
        TergetPerson : {
            // "ALL": '所有用户',
            "NEW": "新用户",
            "OLD": "老用户",
            "ONLINE": "线上用户",
            "OFFLINE": "线下用户"
        },
        marketPerson : {
            "ALL": '所有用户',
            "NEW": "新用户",
            "OLD": "老用户",
            "ONLINE": "线上用户",
            "OFFLINE": "线下用户"
        },
        useScopeAll : {
            "0":"全部",
            "YCJH":"月乘计划",
            "YQJH":"月取计划",
            "YTJH":"月投计划",
            "YYS":"月月升",
            "XSB":"新手标",
            "SB":"散标",
            "JYJH":"嘉盈计划",
            "XSB":"新手标"
        },
        Dqlist : {
            "FOLLOW":"随投资产品期限定",
            "CUSTOM":"自定义",
            "JAN":"1期",
            "FEB":"2期",
            "MAR":"3期",
            "APR":"4期",
            "MAY":"5期",
            "JUNE":"6期",
            "JULY":"7期",
            "AUG":"8期",
            "SEPT":"9期",
            "OCT":"10期",
            "NOV":"11期",
            "DEC":"12期",
            "TRN":"13期", 
            "FRN":"14期", 
            "FFN":"15期", 
            "SXN":"16期", 
            "SNN":"17期", 
            "EHN":"18期", 
            "NEN":"19期", 
            "TWY":"20期", 
            "TYO":"21期", 
            "TYT":"22期", 
            "TYR":"23期", 
            "TYF":"24期", 
            "TYE":"25期", 
            "TYX":"26期", 
            "TYN":"27期", 
            "TYI":"28期", 
            "TNE":"29期", 
            "TIY":"30期", 
            "TIO":"31期", 
            "TIT":"32期", 
            "TII":"33期", 
            "TIF":"34期", 
            "TFI":"35期", 
            "TIX":"36期"
        },
        scopeList : {
            "JAN":"1期",
            "FEB":"2期",
            "MAR":"3期",
            "APR":"4期",
            "MAY":"5期",
            "JUNE":"6期",
            "JULY":"7期",
            "AUG":"8期",
            "SEPT":"9期",
            "OCT":"10期",
            "NOV":"11期",
            "DEC":"12期",
            "TRN":"13期", 
            "FRN":"14期", 
            "FFN":"15期", 
            "SXN":"16期", 
            "SNN":"17期", 
            "EHN":"18期", 
            "NEN":"19期", 
            "TWY":"20期", 
            "TYO":"21期", 
            "TYT":"22期", 
            "TYR":"23期", 
            "TYF":"24期", 
            "TYE":"25期", 
            "TYX":"26期", 
            "TYN":"27期", 
            "TYI":"28期", 
            "TNE":"29期", 
            "TIY":"30期", 
            "TIO":"31期", 
            "TIT":"32期", 
            "TII":"33期", 
            "TIF":"34期", 
            "TFI":"35期", 
            "TIX":"36期"
        },
        redPacketList : { //现金红包管理默认数据
            "serachType":[{
                "value":"",
                "label": "全部"
            },
            {
                "value":"XJHB_LJ",
                "label":"立即领取"
            }, 
            {
                "value":"XJHB_DQ",
                "label":"到期领取"
            }],
            "serachTime":[{
                "value":"giveTime",
                "label":"发放时间"
            },
            {
                "value":"auditTime",
                "label":"审核时间"
            },
            {
                "value":"useTime",
                "label":"领取时间"
            }], 
            "serachState":[{
                "value":"",
                "label":"全部"
            },
            {
                "value":"NO_AUDIT",
                "label":"未审核"
            },
            {
                "value":"AUDIT_SUCCESS",
                "label":"已审核"
            },  
            {
                "value":"AUDIT_FAIL",
                "label":"审核失败"
            }],
            //请求接口返回的状态码
            "NO_AUDIT":"未审核",
            "AUDIT_FAIL":"审核失败",
            "AUDIT_SUCCESS":"审核成功",
            "XJHB_LJ":"立即领取",
            "XJHB_DQ":"到期领取",
            //提交审核状态码
            "SubmitAudit":{
                "success":"AUDIT_SUCCESS",
                "fail":"AUDIT_FAIL"
            }
        }, 
        xjhb_lj_viewList:{
            redPacketType:"奖品类型",
            proportional:'金额项',
            proportion:'值(元/%)',
            number:'数量',
        },
        xjhb_dq_viewList:{
            redPacketType:"奖品类型",
            proportional:'金额项',
            redPacketValue:'值(元/%)',
            number:'数量',
            raiseInterestTime:'到期期限',
        },
        syq_viewList:{
            redPacketType:"奖品类型",
            proportion:'浮动利率（%）',
            useScope:'使用范围',
            raiseInterestTime:'使用期限',
            startPrice:'加息期限',
            useTerminal:'起止金额（元）',
            validaty:'使用终端',
            termDay:'有效期（天）',
            number:'数量',
        },
        txq_viewList:{
            redPacketType:"奖品类型",
            redPacketValue:'面值',
            validaty:'有效期',
            number:'数量',
            terminalType:'终端',
        },
        djq_viewList:{
            redPacketType:"奖品类型",
            proportional:'金额项',
            redPacketValue:'值(元/%)',
            terminalType:'使用终端',
            useScope:'使用范围',
            startPrice:'起止金额（元）',
            useTerm:'使用期限',
            termDay:'有效期（天）',
            number:'数量'
        },
        xnlp_viewList:{
            redPacketType:"奖品类型",
            giftClassName:'奖品名称',
            code:'奖品编码',
            type:'奖品类型',
        },
        redPacketType:{
            DJQ:"代金券",
            XJHB_LJ:"现金红包-立即领取型",
            XJHB_DQ:"现金红包-到期领取型",
            SYQ:"收益劵",
            TXQ:"提现券",
            XNLP:"虚拟礼品"
        }
    }

    export default _selectData
// })