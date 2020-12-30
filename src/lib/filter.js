import selectData from '../config/rewardSelectData'
let filters = {
    rewardPlatformName:(value)=>{
        switch(value){
            case "ZCJ":
                return "资产家";
            case "DJR":
                return "大金融";
            default:
                return ""
        }
    },
    rewardActivityStatus:(value)=>{
        if(value){
            return selectData.activityStatus[value]
        }
        return "关闭"
    },
    rewardTargePerson:(value)=>{
        if(!value) return
        let arr = value.split(',')
        let res = arr.map(item=>{
            return selectData.marketPerson[item]
        })
        return res.join(',')
    },
    //使用期限
    rewardServiceTime:(value)=>{
        if(!value || !value.length) return '';
        let res = value.map(item=>{
            return selectData.scopeList[item]
        })
        return res.join(',')
    },

    rewardQixian:(value)=>{
        if(value.raiseInterestTime === 'CUSTOM'){
            return value.raiseInterestTimeDay + "天"
        }
        return selectData.Dqlist[value.raiseInterestTime]
    },
    
    formartDate:(value,fmt)=>{
        let targetTime = new Date(value)
        let o = {
            "M+": targetTime.getMonth() + 1, //Month
            "d+": targetTime.getDate(), //Day
            "h+": targetTime.getHours(), //Hour
            "m+": targetTime.getMinutes(), //Minute
            "s+": targetTime.getSeconds(), //Second
            "q+": Math.floor((targetTime.getMonth() + 3) / 3), //Season
            "S": targetTime.getMilliseconds() //millesecond
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (targetTime.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}

export default filters 