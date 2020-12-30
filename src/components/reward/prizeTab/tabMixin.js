let mixin = {
    methods: {
        handleEdit(idx,row){
            let editData = JSON.parse(JSON.stringify(row))
            this.$emit('edit',editData,idx)
        },
        handleDel(idx,row){
            let editData = JSON.parse(JSON.stringify(row))
            this.$emit('delete',editData,idx)
        }
    },
}

export default mixin