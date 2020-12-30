<template>
    <el-form ref="form" :model="formDate" :rules="rules"  label-width="80px" size="medium">
    <el-form-item label="姓名" prop="name">
        <el-input v-model="formDate.name" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="code">
        <el-input v-model="formDate.code" placeholder="请输入身份证号"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
        <el-input v-model.number="formDate.phone" placeholder="请输入手机号码"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="eMail">
        <el-input v-model="formDate.eMail" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item label="联系地址" prop="selectedOptions">
        <el-cascader v-model="formDate.selectedOptions" :options="options" size="large"   @change="handleChange" ></el-cascader>
    </el-form-item>
    <el-form-item label="" prop="desc">
        <el-input v-model="formDate.desc" placeholder="请输入详细地址" type="textarea"></el-input>
    </el-form-item>
     <el-form-item label="">
       <el-upload
         ref="upload"
         :auto-upload="false"
         :disabled="disabled"
         :file-list="fileList2"
         :limit="1"
         :on-change="handlePreview1"
         :on-preview="handlePreview1"
         :on-remove="removeFile1"
         accept="image/jpeg,image/jpg,image/png"
         action="https://jsonplaceholder.typicode.com/posts/"
         class="upload-demo"
         list-type="picture">
        <el-button id="udload_btn" size="small" type="primary" @click="validation">选择图片</el-button>
        <span slot="tip" class="g_server" style="margin-left: 10px;" type="primary"  @click="submitUpload(fileList2,2)">上传图片</span>
        <div slot="tip" class="el-upload__tip">请上传身份证正面照，只能上传jpg文件</div>
    </el-upload>
    </el-form-item>
     <el-form-item label="">
       <el-upload
         ref="upload"
         :auto-upload="false"
         :disabled="disabled2"
         :file-list="fileList3"
         :limit="1"
         :on-change="handlePreview2"
         :on-preview="handlePreview2"
         :on-remove="removeFile2"
         accept=".jpg"
         action="https://jsonplaceholder.typicode.com/posts/"
         class="upload-demo"
         list-type="picture">
        <el-button id="udload_btn" size="small" type="primary" @click="validation">选择图片</el-button>
        <span slot="tip" class="g_server" style="margin-left: 10px;" type="primary"  @click="submitUpload(fileList3,3)">上传图片</span>
        <div slot="tip" class="el-upload__tip">请上传身份证国徽照，只能上传jpg文件</div>
    </el-upload>
    </el-form-item>    
     <el-form-item>
        <el-button type="primary" @click="onSubmit(1)">提交</el-button>
        <el-button @click="cancle">取消</el-button>
    </el-form-item>
    </el-form>
</template>
<script>

export default {
  name: "",
  components: {
    
  },
  props:{
        dfsToken:{
            type:String,
            default:''
        },
        detailDataChange:{
            type:Object,
            default:function(){
                return {}
            }
        }
        // modifyButton:{
        //     type:boolean,
        //     default:false
        // }
        // permTree:{
        //     type:Array,
        //     default:[]
        // },
        // form:{
        //     type:Object,
        //     default:{}
        // },
        // allMenu:{
        //     type:Array,
        //     default:[]
        // }
  },
  mounted () {
     if(this.detailDataChange.details){
         this.formDate.name = this.detailDataChange.details.name;
         this.formDate.code = this.detailDataChange.details.idCard;
         this.formDate.legalName = this.detailDataChange.details.legalName;
         this.formDate.phone = this.detailDataChange.details.mobile;
         this.formDate.eMail = this.detailDataChange.details.email;
         this.formDate.selectedOptions = this.detailDataChange.details.addressCode.split(",");
         this.formDate.desc = this.detailDataChange.details.addressDetail;
         this.address = this.detailDataChange.details.address;
         this.addressNo = this.detailDataChange.details.addressCode;
         this.id = this.detailDataChange.details.id;
     }          
  },
  data() {

    //自定义验证
     var validateName = (rule, value, callback) => {
        console.log(rule,value,callback)
        if (value === '') {
          this.removeItem('name');       
          callback(new Error('请输入名字'));
        } else {
          if(this.vLength.indexOf('name')<=-1){
            this.vLength.push('name');
            console.log( this.vLength)    
          }
          callback();
        }
      };
     var validateCode = (rule, value, callback) => {
         var idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (value === '') {
          this.removeItem('code');  
          callback(new Error('请输入身份证号'));
        } else if(!idCard.test(value)){
           this.removeItem('phone');
           callback(new Error('身份证号码不合法'));
        }else { 
          if(this.vLength.indexOf('code')<=-1){
             this.vLength.push('code');
               console.log( this.vLength)        
          }
          callback();
        }
      };
      var validatePhone = (rule, value, callback) => {
         var phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (value === '') {
           this.removeItem('phone');       
           callback(new Error('请输入电话号码'));
        } else if(!phoneReg.test(value)){
           this.removeItem('phone');
           callback(new Error('电话号码不正确'));
        }else {
         if(this.vLength.indexOf('phone')<=-1){
             this.vLength.push('phone');    
          }
          callback();
        }
      }; 
       var validateEmail = (rule, value, callback) => {
         var mailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        if (value === '') {
            this.removeItem('eMail');     
            callback(new Error('请输入邮箱'));
        } else if(!mailReg.test(value)){
            this.removeItem('eMail');   
            callback(new Error('邮箱不正确'));
        }else { 
          if(this.vLength.indexOf('eMail')<=-1){
             this.vLength.push('eMail');    
          }
          callback();
        }
      }; 
      var validateSelectedOptions = (rule, value, callback) => {
        if (value.length <= 0) {
           this.removeItem('selectedOptions');       
           callback(new Error('请选择地区'));
        } else {
           if(this.vLength.indexOf('selectedOptions')<=-1){
              this.vLength.push('selectedOptions'); 
              console.log(this.vLength)   
           } 
           callback();
        }
      };
     var validateDesc = (rule, value, callback) => {
        if (value === '') {
           this.removeItem('desc');    
           callback(new Error('请输入详细地址'));
        } else {
          if(this.vLength.indexOf('desc')<=-1){
             this.vLength.push('desc');    
          }
          callback();
        }
      };                                   
    return {
        formDate: {
          name: '',
          code: '',
          phone: '',
          eMail: '',
          selectedOptions:[],
          desc:''
        },
         rules: {
            name: [
                    { validator: validateName, trigger: 'change', type:'string'}
                  ],
            code: [
                    { validator: validateCode, trigger: 'change',type:'string'}
                  ],
           phone: [
                   { validator: validatePhone, trigger: 'change',type:'string' }
                  ],
           eMail: [
                   { validator: validateEmail, trigger: 'change',type:'string' }
                  ],
 selectedOptions: [
                   {validator: validateSelectedOptions, trigger: 'change',type:'array' }
                  ],
            desc: [
                   { validator: validateDesc, trigger: 'change' ,type:'string'}
                  ]
        },
        token:this.dfsToken,//请求的token
        options: this.$regionDataPlus, //三级联动在mian.js 文件中Vue.prototype.$regionDataPlus的公共组件中。
        CodeToText:this.$CodeToText,//获取中文名字
        address:'',//三级联动地址信息
        addressNo:'',//三级联动地址编号
        fileList2: [],//显示图片缩略图。
        fileList3: [],//显示图片缩略图。
        params: "", //最终要上传的所有数据，图片上传组件规定额外参数要在data里面声明，这里统一存储。
        disabled:true,//控制上传按钮是否可以点击
        disabled2:true,//控制上传按钮是否可以点击
        vLength:[],//存一个需要验证的值
        objectLength:[],//一进来标识多少个数据
        files:[],//图片上传成功后返回的files数组
        id:"",//x修改按钮id
        isSubmit:false,//判断点击的是哪个按钮
       // sfile:[],//修改需要带的图片参数
        // defaultProps: {
        //   children: 'children',
        //   label: 'label',
        //   disabled:function(data,node){
        //       if(data.id === t.form.id){
        //           return true
        //       }
        //       return false
        //   }
        // },
        // operatesModal:[],
        selectOrg:{
            orgsid:[]
        },
        i:0
    };
  },
  created (){
    console.log(this)
      for (const fkey in this.formDate) {
         this.objectLength.push(fkey);
      }
      console.log(this.objectLength)
  },
  watch: {
     formDate: {
        handler(curVal,oldVal){
          setTimeout(() => {
             if(this.vLength.length == this.objectLength.length){
                 this.disabled = false;
                 this.disabled2 = false;
             }else{
                this.disabled = true;
                this.disabled2 = true;
             } 
          }, 100);
        },
        deep:true
     }
  },
  methods: {
    //删除验证数组中的项
    removeItem(itemindex){
       this.vLength.forEach((item,index) => {
         console.log(item)
         console.log(itemindex)
           if(item == itemindex){
              this.vLength.splice(index,1)
           }
       }); 
    },
    //点击上传按钮验证
    validation(){
        console.log(this.disabled)
        this.onSubmit(0);
    }, 
     handleChange (value) {
          console.log(value)
          this.addressNo = value[0] +','+ value[1] +','+ value[2];
          let cityNo = this.CodeToText[value[1]]=="市辖区" ? "" : this.CodeToText[value[1]];
          this.address = this.CodeToText[value[0]] + cityNo +this.CodeToText[value[2]];
      },  
      //文件发生改变的时候
      handlePreview1(file,fileList) {
        if(fileList){
            this.fileList2 = fileList;
            console.log(file,fileList)
        }else{
            this.fileList2 = [];  
        }
      },
       handlePreview2(file,fileList) {
        if(fileList){
            this.fileList3 = fileList;
            console.log(file,fileList)
        }else{
            this.fileList3 = [];  
        }
      },
       //删除列表文件的时候 
      removeFile1(file,fileList) {
        if(fileList){
            this.fileList2 = fileList;
            console.log(file,fileList)
        }else{
           this.fileList2 = []; 
        }
      }, 
       //删除列表文件的时候 
      removeFile2(file,fileList) {
        if(fileList){
            this.fileList3 = fileList;
            console.log(file,fileList)
        }else{
           this.fileList3 = []; 
        }
      }, 
      //上传文件之前
    //   uploadFile(file) {
    //       console.log(123)
    //       var formData = new FormData();
    //       formData.append("head.token", "xh991KBZ1ME55E1NTNC0");
    //       formData.append("head.platformNo", "dfs-test");// 自己的平台编号
    //       formData.append("data.devolve", "该值会随请求返回");
    //       formData.append("data.file",this.fileList2);
    //   }, 
    //  //请求token之前
    //  beforeGettoken() {
    //       let numId = {"idNo":this.formDate.phone,"sc":'CHANNEL'}; 
    //       this.gettoken(numId);
    //   },  
    //  //请求token 
    // async gettoken(params){
    //      //let res = await this.$service.gettoken(params);//获取公共token接口地址
    //      //this.menuManageList = res || {totalPage:0,list:[]};
    //      this.token = 'xh991MAI85NVZNFOP4JN';
    //      this.submitUpload();
         
    //  },
    async submitUpload(disList,fileNum){
        var fileBtnNum = fileNum;
        if(disList.length > 0){
            var formData = new FormData();
            formData.append("head.token", this.token);
            formData.append("head.platformNo", "zcj");// 自己的平台编号
            //formData.append("data.file",this.fileList2);//图片列表
            disList.forEach(function(item,index){
                formData.append('data.details['+index+'].devolve',item.uid);
                formData.append('data.details['+index+'].file',item.raw);//图片列表
            })
            let res = await this.$service.batchUpFile(formData);//上传图片
            var resdata = res.details;
            if(resdata[0].stateCode == 0){
                this.$message.success('上传成功');
                if(this.files.length <= 0){
                    this.files.push({type:fileBtnNum,path:resdata[0].groupName +'/'+ resdata[0].displayFilename});    
                }else{

                    var backtrue = this.files.some((item,index) => {
                        console.log(item.type,fileBtnNum)
                        if(item.type == fileBtnNum){
                            item.type = fileBtnNum;
                            item.path = resdata[0].groupName +'/'+ resdata[0].displayFilename;
                            return true;
                        }
                    })
                }
            //判断是否为true,如果为true的话就创建
            if(backtrue == false){
                this.files.push({type:fileBtnNum,path:resdata[0].groupName +'/'+ resdata[0].displayFilename});   
            } 
            }else{
                this.$message.error('上传失败');
            }
        }else{
            console.log(this.fileList2,this.fileList3,this.fileList4)
            this.$message.error("请先选择图片后才能上传");
        }
          //this.$refs.upload.submit();
     },
      handleClick(data,checked, node) {console.log('click')
           if(checked){
                this.$refs.tree.setCheckedNodes([]);
                this.$refs.tree.setCheckedNodes([data]);
                //交叉点击节点
            }else{
                this.$refs.tree.setCheckedNodes([]);
                //点击已经选中的节点，置空
            }
      },
     
      onSubmit(validNum){
          if(validNum == 1){
              this.isSubmit = true;
          }else{
              this.isSubmit = false;
          }
          this.$refs['form'].validate((valid) => {
            if (valid) {
                 console.log(this.formDate)
                //console.log(this.form)
                // let treeIds = this.$refs.tree.getCheckedKeys();
                //this.form["pid"] = this.form.pid.join();
                //this.disabled = false;         
                //this.params = JSON.parse(JSON.stringify(this.form))
               
                // console.log('---',params)
               // this.$emit("submitAddPerm",params)
                // this.$refs['form'].resetFields();
                // this.$refs.tree.setCheckedKeys([])
                 
               
                if(this.isSubmit == true){
                    console.log(this.files)
                    if(this.files.length <= 1 && this.id == ''){
                        this.$message.error("请上传图片")    
                    }else{
                        if(this.id){
                             let paramsChange = {name:this.formDate.name,mobile:this.formDate.phone,legalName:this.formDate.legalName,identityNo:this.formDate.code,email:this.formDate.eMail,addressDetail:this.formDate.desc,address:this.address,addressCode:this.addressNo,files:this.files,dfsToken:this.token,id:this.id} 
                             this.$emit("submitChangePerm",paramsChange)
                        }else{
                            let params = {name:this.formDate.name,mobile:this.formDate.phone,legalName:this.formDate.legalName,identityNo:this.formDate.code,email:this.formDate.eMail,addressDetail:this.formDate.desc,address:this.address,addressCode:this.addressNo,files:this.files,dfsToken:this.token} 
                             //console.log(params)
                             this.$emit("submitAddPerm",params)
                            console.log(this.files) 
                        }
                    }
                }
            } else {
                return false;
            }
            });
      },
      cancle(){
          this.$emit("close")
      },
      groupChange(){
          console.log('change',this.form.operates)
      },
  }
};
</script>
<style lang='less' scoped>
.g_server{
    width: 100px;
    height: 34px;
    display: inline-block;
    border-radius: 3px;
    background: #3a8ee6;
    font-size:14px;
    color:#fff;
    text-align:center;
    cursor: pointer;
}
.g_server:hover{
    background:#409EFF;
    color:#fff;
    
}
</style>