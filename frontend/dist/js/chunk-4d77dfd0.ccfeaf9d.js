(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d77dfd0"],{3846:function(e,r,t){t("9e1e")&&"g"!=/./g.flags&&t("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:t("0bfb")})},4917:function(e,r,t){"use strict";var a=t("cb7c"),o=t("9def"),l=t("0390"),u=t("5f1b");t("214f")("match",1,(function(e,r,t,i){return[function(t){var a=e(this),o=void 0==t?void 0:t[r];return void 0!==o?o.call(t,a):new RegExp(t)[r](String(a))},function(e){var r=i(t,e,this);if(r.done)return r.value;var n=a(e),s=String(this);if(!n.global)return u(n,s);var c=n.unicode;n.lastIndex=0;var d,m=[],p=0;while(null!==(d=u(n,s))){var g=String(d[0]);m[p]=g,""===g&&(n.lastIndex=l(s,o(n.lastIndex),c)),p++}return 0===p?null:m}]}))},"6b54":function(e,r,t){"use strict";t("3846");var a=t("cb7c"),o=t("0bfb"),l=t("9e1e"),u="toString",i=/./[u],n=function(e){t("2aba")(RegExp.prototype,u,e,!0)};t("79e5")((function(){return"/a/b"!=i.call({source:"a",flags:"b"})}))?n((function(){var e=a(this);return"/".concat(e.source,"/","flags"in e?e.flags:!l&&e instanceof RegExp?o.call(e):void 0)})):i.name!=u&&n((function(){return i.call(this)}))},d8bf:function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"container"},[t("div",{staticClass:"title"},[t("el-breadcrumb",{attrs:{separator:"/"}},[t("el-breadcrumb-item",[e._v("监管对象")]),t("el-breadcrumb-item",[e._v("主营产品")]),t("el-breadcrumb-item",{staticClass:"actived"},[e._v("修改动态")])],1)],1),t("div",{staticClass:"box"},[t("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"ruleForm",attrs:{model:e.ruleFormValue,rules:e.rules,"label-width":"100px"}},[t("el-row",[t("el-col",{attrs:{span:6}},[t("el-form-item",{attrs:{label:"产品名称",prop:"productName"}},[t("el-input",{attrs:{disabled:!0},model:{value:e.ruleFormValue.productName,callback:function(r){e.$set(e.ruleFormValue,"productName",r)},expression:"ruleFormValue.productName"}})],1)],1)],1),t("el-row",[t("el-col",{attrs:{span:6}},[t("el-form-item",{attrs:{label:"仓库地址",prop:"warehouseId"}},[t("el-select",{attrs:{disabled:!(this.warehouseOptions.length>0)},model:{value:e.ruleFormValue.warehouseId,callback:function(r){e.$set(e.ruleFormValue,"warehouseId",r)},expression:"ruleFormValue.warehouseId"}},e._l(e.warehouseOptions,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1)],1),t("el-row",[t("el-col",{attrs:{span:6}},[t("el-form-item",{attrs:{label:"储存数量",prop:"repertoryAmount"}},[t("el-input",{attrs:{type:"number"},model:{value:e.ruleFormValue.repertoryAmount,callback:function(r){e.$set(e.ruleFormValue,"repertoryAmount",r)},expression:"ruleFormValue.repertoryAmount"}})],1)],1)],1),t("el-row",[t("el-col",{attrs:{span:6}},[t("el-form-item",{attrs:{label:"品种",prop:"variety"}},[t("el-input",{model:{value:e.ruleFormValue.variety,callback:function(r){e.$set(e.ruleFormValue,"variety",r)},expression:"ruleFormValue.variety"}})],1)],1)],1),t("el-row",[t("el-col",{attrs:{span:6}},[t("el-form-item",{attrs:{label:"评级",prop:"grade"}},[t("el-select",{attrs:{disabled:!(e.options.length>0)},model:{value:e.ruleFormValue.grade,callback:function(r){e.$set(e.ruleFormValue,"grade",r)},expression:"ruleFormValue.grade"}},e._l(e.options,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1)],1),t("el-form-item",[t("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(r){return e.onSubmit("ruleForm")}}},[e._v("保存")]),t("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:e.goBack}},[e._v("取消")])],1)],1)],1)])},o=[],l=(t("6b54"),t("4917"),t("55a1")),u={name:"editInventoryDynamics",data:function(){return{listLoading:!1,warehouseData:[],warehouseOptions:[],ruleFormValue:{createTime:"",updateTime:"",grade:"",productId:0,repertoryAmount:"",variety:"",warehouseId:null,productName:"",id:0,companyId:0},rules:{variety:[{required:!0,message:"请插入",trigger:"change"}],repertoryAmount:[{required:!0,message:"请插入",trigger:"change"}],grade:[{required:!0,message:"请选择",trigger:"change"}],warehouseId:[{required:!0,message:"请选择",trigger:"change"}]},options:[{value:"1",label:"低级"},{value:"2",label:"中级"},{value:"3",label:"高级"},{value:"4",label:"特级"}]}},created:function(){this.ruleFormValue.productId=this.$route.query.productId,this.ruleFormValue.repertoryAmount=this.$route.query.repertoryAmount.toString().match(/(\d+)/)[0],this.ruleFormValue.warehouseId=this.$route.query.warehouseId,this.ruleFormValue.grade=this.$route.query.grade,this.ruleFormValue.variety=this.$route.query.variety,this.ruleFormValue.id=this.$route.params.id,this.ruleFormValue.companyId=this.$route.query.companyId,this.getProductionDetail(),this.getWarehouseList(),this.getCurrentTime()},methods:{getProductionDetail:function(){var e=this;this.listLoading=!0,Object(l["a"])().get("/api/product_production/name",{productid:this.ruleFormValue.productId}).then((function(r){e.ruleFormValue.productName=r[0].productName,setTimeout((function(){e.listLoading=!1}),500)})).catch((function(e){console.log(e)}))},getCurrentTime:function(){var e=new Date;this.ruleFormValue.createTime=e.toISOString(),this.ruleFormValue.updateTime=e.toISOString()},getWarehouseList:function(){var e=this;this.listLoading=!0,Object(l["a"])().get("/api/warehose/all",{company_id:this.ruleFormValue.companyId,sortBy:"id"}).then((function(r){for(var t in r.data)e.warehouseOptions.push({value:r.data[t].id,label:r.data[t].warehouseName});setTimeout((function(){e.listLoading=!1}),500)})).catch((function(e){}))},onSubmit:function(e){var r=this;this.$refs[e].validate((function(e){if(!e)return console.log("错误 !!"),!1;var t={createTime:r.ruleFormValue.createTime,updateTime:r.ruleFormValue.updateTime,grade:r.ruleFormValue.grade,id:r.ruleFormValue.id,productId:r.ruleFormValue.productId,repertoryAmount:r.ruleFormValue.repertoryAmount,variety:r.ruleFormValue.variety,warehouseId:r.ruleFormValue.warehouseId};r.listLoading=!0,Object(l["a"])().put("/api/product_repetory/update/"+r.ruleFormValue.id,t).then((function(e){setTimeout((function(){r.listLoading=!1}),500),r.goBack()})).catch((function(e){}))}))},goBack:function(){this.$router.go(-1)}}},i=u,n=t("2877"),s=Object(n["a"])(i,a,o,!1,null,"02273676",null);r["default"]=s.exports}}]);
//# sourceMappingURL=chunk-4d77dfd0.ccfeaf9d.js.map