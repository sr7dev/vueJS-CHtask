(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e17ef41","chunk-2d0e2754"],{"7f7f":function(e,a,t){var n=t("86cc").f,i=Function.prototype,o=/^\s*function ([^ (]*)/,l="name";l in i||t("9e1e")&&n(i,l,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(e){return""}}})},b4e4:function(e,a,t){},f9a4:function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"container"},[t("div",{staticClass:"title"},[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",[e._v("投入品管理")]),t("el-breadcrumb-item",{staticClass:"actived"},[e._v("添加记录")])],1)],1),t("div",{staticClass:"box"},[t("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.dataloading,expression:"dataloading"}],ref:"addForm",staticClass:"form-width",attrs:{model:e.addForm,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{staticClass:"input-width label-align",attrs:{label:"企业名称",prop:"companyId"}},[t("el-select",{model:{value:e.addForm.companyId,callback:function(a){e.$set(e.addForm,"companyId",a)},expression:"addForm.companyId"}},e._l(e.companyProduction,(function(e){return t("el-option",{key:e.companyId,attrs:{label:e.companyName,value:e.companyId}})})),1)],1),t("el-form-item",{staticClass:"input-width label-align",attrs:{label:"样品名称",prop:"sampleName"}},[t("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addForm.sampleName,callback:function(a){e.$set(e.addForm,"sampleName",a)},expression:"addForm.sampleName"}})],1),t("el-form-item",{staticClass:"input-width label-align",attrs:{label:"采购数量",prop:"amount"}},[t("el-input",{attrs:{"auto-complete":"off",type:"number"},model:{value:e.addForm.amount,callback:function(a){e.$set(e.addForm,"amount",a)},expression:"addForm.amount"}})],1),t("el-form-item",{attrs:{label:"",prop:"file_live_1"}},[t("input",{ref:"file_live_1",staticStyle:{display:"none"},attrs:{type:"file",id:"file"},on:{change:function(a){return e.handleFileUpload()}}}),t("el-button",{attrs:{size:"small",type:"warning",plain:""},on:{click:function(a){return e.chooseFile()}}},[e._v("添加附件")]),e.file_live_1?t("span",[e._v("("+e._s(e.fileName)+")")]):t("span",[e._v("请选择需要上传的文件...")])],1),t("el-form-item",{staticClass:"left-margin"},[t("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(a){return e.onSubmit("addForm")}}},[e._v("\n              保存\n          ")]),t("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(a){return e.$router.go(-1)}}},[e._v("\n              取消\n          ")])],1)],1)],1)])},i=[],o=(t("7f7f"),t("55a1")),l=(t("d1a0"),{data:function(){return{addForm:{companyId:"-1",amount:"",sampleName:""},companyProduction:[{id:-1,name:"全部"}],rules:{amount:[{required:!0,message:"请插入",trigger:"change"}],sampleName:[{required:!0,message:"请插入",trigger:"change"}],companyId:[{required:!0,message:"请选择",trigger:"change"}]},fileName:"",file_live_1:null,dataloading:!1}},mounted:function(){this.getCompanyProduct()},methods:{getCompanyProduct:function(){var e=this;Object(o["a"])().get("/api/company_production/name").then((function(a){e.companyProduction=e.companyProduction.concat(a)})).catch((function(e){console.log(e)}))},onSubmit:function(e){var a=this;this.$refs[e].validate((function(e){if(e){a.dataloading=!0;var t=new FormData;t=a.makeFormData(),Object(o["a"])().post("/api/inputsPurchase/create",t).then((function(e){a.$router.go(-1),setTimeout((function(){a.dataloading=!1}),10)})).catch((function(e){}))}}))},chooseFile:function(){document.getElementById("file").click()},handleFileUpload:function(){this.file_live_1=this.$refs.file_live_1.files[0],this.fileName=this.file_live_1.name},makeFormData:function(){var e=new FormData;return e.append("companyId",this.addForm.companyId),e.append("amount",this.addForm.amount),e.append("sampleName",this.addForm.sampleName),e.append("file",this.file_live_1),e.append("id",0),e}}}),r=l,c=(t("faad"),t("2877")),s=Object(c["a"])(r,n,i,!1,null,null,null);a["default"]=s.exports},faad:function(e,a,t){"use strict";var n=t("b4e4"),i=t.n(n);i.a}}]);
//# sourceMappingURL=chunk-1e17ef41.bb0fae9f.js.map