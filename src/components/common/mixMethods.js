let mixMethods = {
    data:function(){
        return{
            requireGetList:true
        }
    },
    mounted() {
        this.requireGetList && this.getList && this.getList({system:"XHSR-OPER",name:"",pageNum:1,pageSize:10})
    },
    methods:{
        //查看
        handleView(ids,row){
            this.queryDetail({id:row.id})
            this.centerDialogVisible = true;
        },
        
        handleSizeChange(size){
            console.log('pageSize',size)
            this.pageSize = size;
            this.getList({name:"",pageNum:this.pageNum,pageSize:size})
            // this.$refs.permTable.bodyWrapper.scrollTop =0;
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            let params = {
                name:"",
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }
            this.getList(params)
        },
        search(data){
            //  console.log(data)
            this.pageNum = 1;
            let params = {name:data.menuname,system:data.selvalue,pageNum:1,pageSize:this.pageSize}
            this.getList(params)
        },
        pageSizeChange(size){ //现金红包页面每页条数取值方法
            this.pageSize = size;
            this.pageCallBack();
        },
        pageCurrentChange(val){ //现金红包当前页面取值方法
            this.pageNum = val;
            this.pageCallBack();
        },
        patchdelete(text){
            let rows = this.$refs.permTable.selection
            if(!rows.length){
                this.$message.warning('请选择需要操作的列表')
                return
            }
            let ids = rows.map((item)=>{
                return item.id
            })
            this.$confirm(`是否删除所选${text}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deletePerm({ids:ids})
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        changeStatus(status){
            console.log(status)
            let rows = this.$refs.permTable.selection
            console.log(status, rows)
            if(!rows.length){
                this.$message.warning('请选择需要操作的列表')
                return
            }
            let ids = rows.map((item)=>{
                return item.id
            })
            let params = {
                ids:ids,
                onoff:status
            }
            this.togglePerm(params);
        },
        closeAdd(){
            this.addDialogVisible = false
        },
        filterSystem(tree,type){
            if(!tree){
                return []
            }
            let nowTree = JSON.parse(JSON.stringify(tree))
            if(!type){
                return []
            }
            return nowTree.filter(item=>{
                if(item.system && item.system !== type){
                    return false
                }
                if(item.system===type && item.children){
                    let res = this.filterSystem(item.children,type)
                    item.children = res
                    return item
                }
                if(!item.system){
                    let res = this.filterSystem(item.children,type)
                    item.children = res
                    return item
                }
                if(item.system === type){
                    return item
                }
                return false
            })
        }
    }
}

let methodPlu = {}
methodPlu.install = function(Vue,optionss){
    Vue.mixin(mixMethods)
}

export default methodPlu