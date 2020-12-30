import {allPath} from '../config/allPath'
import _selectData from '../config/rewardSelectData.js'


let utils = {
    cutStr(str,len){
        let cut = str?str.substr(0,len):"";
        if(str.length>len){
            return cut + "..."
        }
        return cut
    },
    extendPath(tree,arr){
        let pathList = utils.deepcopy(allPath[0].children)
        return tree.map(item=>{
            let res = pathList.filter(menu=>{
                return item.code === menu.name
            })

            if(res[0]){
                let url = item.url
                // item.url = res[0].path
                res[0].path = url
                res[0].meta['operate'] = this.exOperate(item.operates)
                arr.push(res[0])
            }

            if(item.children){
                item.children = this.extendPath(item.children,arr)
            }
            
            return item
        })
    },
    exOperate(arr){
        let obj = {};
        arr.forEach(element => {
            obj[element] = "show"
        });
        return obj
    },
    deepcopy(source){
        if (!source) {
          return source;
        }
        let sourceCopy = source instanceof Array ? [] : {};
        for (let item in source) {
          sourceCopy[item] = typeof source[item] === 'object' ? this.deepcopy(source[item]) : source[item];
        }
        return sourceCopy;
    },
    isTokenExpired(){
        let expriedAtTime = localStorage.getItem('expriredAt')
        let nowTime = new Date().getTime();
        // console.log('time',expriedAtTime - nowTime)
        return (expriedAtTime - nowTime < 1000*60*5)
    },
    setExpiredAt(d){
        let t = new Date().getTime();
        let ex = t + d*1000;
        localStorage.setItem("expriredAt",ex)
    },
    getUseScope:function(scopes,type){
        var str = ""
        if(!scopes) return str;
        var arr = scopes.split(",");
        for(var i=0;i<arr.length;i++){
            str += this.getScopeStr(arr[i],type);
            if(i !== (arr.length-1)){
                str += ","
            }
        }
        return str
    },
    getScopeStr:function(scope,type){
        return _selectData[type][scope] || ""
    },

    objectToFormData : function(obj, form, namespace){
        var fd = form || new FormData();
        var formKey;
        if (obj instanceof Array) {
            for (var i = 0; i < obj.length; i++) {
                //   for(var item of obj ){
                if (typeof obj[i] === 'object' && !(obj[i] instanceof File)) {
                    utils.objectToFormData(obj[i], fd, namespace + '[' + i + ']');
                } else {
                    // 若是数组则在关键字后面加上[]
                    fd.append(namespace + '[]', obj[i])
                }
            }
        } else {
            for (var property in obj) {
                if (obj.hasOwnProperty(property) && obj[property]) {
                    if (namespace) {
                        // 若是对象，则这样
                        formKey = namespace + '.' + property;
                    } else {
                        formKey = property;
                    }
                    if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
                        // 数据结构嵌套的情况
                        utils.objectToFormData(obj[property], fd, formKey);
                    } else {
                        fd.append(formKey, obj[property]);
                    }
                }
            }
        }
        return fd;
    }

}

export default utils