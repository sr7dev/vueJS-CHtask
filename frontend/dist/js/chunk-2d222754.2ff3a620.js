(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d222754"],{cf61:function(e,r,a){"use strict";a.r(r);var t=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[e._v("生产主体")]),a("el-breadcrumb-item",[e._v("主营产品")]),a("el-breadcrumb-item",{staticClass:"actived"},[e._v("添加产品")])],1)],1),a("div",{staticClass:"box"},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"ruleFormValue",attrs:{model:e.ruleFormValue,rules:e.rules,"label-width":"100px"}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"产品名称",prop:"productName"}},[a("el-input",{model:{value:e.ruleFormValue.productName,callback:function(r){e.$set(e.ruleFormValue,"productName",r)},expression:"ruleFormValue.productName"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"单价",prop:"atunitprice"}},[a("el-input",{model:{value:e.ruleFormValue.atunitprice,callback:function(r){e.$set(e.ruleFormValue,"atunitprice",e._n(r))},expression:"ruleFormValue.atunitprice"}})],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"评级",prop:"grade"}},[a("el-input",{model:{value:e.ruleFormValue.grade,callback:function(r){e.$set(e.ruleFormValue,"grade",r)},expression:"ruleFormValue.grade"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"产地",prop:"productArea"}},[a("el-input",{model:{value:e.ruleFormValue.productArea,callback:function(r){e.$set(e.ruleFormValue,"productArea",r)},expression:"ruleFormValue.productArea"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"品种",prop:"variety"}},[a("el-input",{model:{value:e.ruleFormValue.variety,callback:function(r){e.$set(e.ruleFormValue,"variety",r)},expression:"ruleFormValue.variety"}})],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"规格",prop:"specification"}},[a("el-input",{model:{value:e.ruleFormValue.specification,callback:function(r){e.$set(e.ruleFormValue,"specification",r)},expression:"ruleFormValue.specification"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"产品介绍",prop:"productProfile"}},[a("el-input",{staticClass:"no-margin-bottom",attrs:{"auto-complete":"off",type:"textarea",rows:10},model:{value:e.ruleFormValue.productProfile,callback:function(r){e.$set(e.ruleFormValue,"productProfile",r)},expression:"ruleFormValue.productProfile"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"",prop:"doOrganic"}},[a("el-checkbox",{attrs:{"true-label":"1","false-label":"0"},model:{value:e.ruleFormValue.doOrganic,callback:function(r){e.$set(e.ruleFormValue,"doOrganic",r)},expression:"ruleFormValue.doOrganic"}},[e._v("有机")])],1)],1)],1),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(r){return e.onSubmit("ruleFormValue")}}},[e._v("保存")]),a("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(r){return e.$router.go(-1)}}},[e._v("取消")])],1)],1)],1)])},l=[],o=a("55a1"),u=a("0010"),i={name:"addMainProduct",data:function(){return{listLoading:!0,companyId:-1,ruleFormValue:{productName:"",atunitprice:0,grade:"",productArea:"",variety:"",specification:"",productProfile:"",doOrganic:"0"},rules:{productName:[{required:!0,message:"请插入",trigger:"change"}],atunitprice:[{required:!0,message:"请插入"},{type:"number",message:"插入号码"}],grade:[{required:!0,message:"请插入",trigger:"change"}],productArea:[{required:!0,message:"请插入",trigger:"change"}],variety:[{required:!0,message:"请插入",trigger:"change"}],specification:[{required:!0,message:"请插入",trigger:"change"}],productProfile:[{required:!0,message:"请插入",trigger:"change"}]}}},created:function(){this.companyId=this.$route.params.id,this.listLoading=!1},methods:{onSubmit:function(e){var r=this;this.$refs[e].validate((function(e){if(!e)return console.log("错误 !!"),!1;r.listLoading=!0,Object(o["a"])().post("/api/product_production/create",{atunitprice:r.ruleFormValue.atunitprice,companyId:r.companyId,createTime:new Date,createUserId:Object(u["a"])().user().id,doOrganic:r.ruleFormValue.doOrganic,grade:r.ruleFormValue.grade,productArea:r.ruleFormValue.productArea,productId:0,productName:r.ruleFormValue.productName,productProfile:r.ruleFormValue.productProfile,specification:r.ruleFormValue.specification,updateTime:new Date,updateUserId:Object(u["a"])().user().id,variety:r.ruleFormValue.variety}).then((function(e){setTimeout((function(){r.listLoading=!1}),500),r.$router.go(-1)})).catch((function(e){}))}))}}},c=i,n=a("2877"),s=Object(n["a"])(c,t,l,!1,null,null,null);r["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d222754.2ff3a620.js.map