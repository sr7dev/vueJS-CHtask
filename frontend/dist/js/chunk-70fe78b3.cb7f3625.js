(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70fe78b3"],{bbc7:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("div",{staticClass:"title"},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",[t._v("监管对象")]),e("el-breadcrumb-item",{staticClass:"actived"},[t._v("添加监管对象")])],1)],1),e("div",{staticClass:"box"},[e("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.createLoading,expression:"createLoading"}],ref:"form",staticClass:"data-form",attrs:{model:t.form,"label-width":"150px",rules:t.rules}},[e("el-row",[e("el-col",{attrs:{span:12}},[e("el-form-item",[e("el-radio",{attrs:{label:"1",checked:""},on:{change:t.changeCompany},model:{value:t.form.companyType,callback:function(a){t.$set(t.form,"companyType",a)},expression:"form.companyType"}},[t._v("企业")]),e("el-radio",{attrs:{label:"2"},on:{change:t.changeCompany},model:{value:t.form.companyType,callback:function(a){t.$set(t.form,"companyType",a)},expression:"form.companyType"}},[t._v("农户")])],1)],1)],1),e("el-row",[e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"对象类型"}},[e("el-input",{staticStyle:{width:"100%"},attrs:{disabled:"",value:1==t.form.companyType?"企业":"农户"}})],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"乡镇"}},[e("el-select",{model:{value:t.form.townId,callback:function(a){t.$set(t.form,"townId",a)},expression:"form.townId"}},t._l(t.townList,(function(t,a){return e("el-option",{key:a,attrs:{label:t.name,value:t.id}})})),1)],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"行业"}},[e("el-select",{model:{value:t.form.agriculturalClassification,callback:function(a){t.$set(t.form,"agriculturalClassification",a)},expression:"form.agriculturalClassification"}},t._l([{value:"1",label:"养殖业"},{value:"2",label:"畜牧业"},{value:"3",label:"种植业"}],(function(t,a){return e("el-option",{key:a,attrs:{label:t.label,value:t.value}})})),1)],1)],1)],1),e("div",{directives:[{name:"show",rawName:"v-show",value:"1"==t.form.companyType,expression:"form.companyType == '1'"}]},[e("el-row",[e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"单位名称",prop:"companyName"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.companyName,callback:function(a){t.$set(t.form,"companyName",a)},expression:"form.companyName"}})],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"负责人",prop:"chargePerson"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.chargePerson,callback:function(a){t.$set(t.form,"chargePerson",a)},expression:"form.chargePerson"}})],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"地址",prop:"companyAddress"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.companyAddress,callback:function(a){t.$set(t.form,"companyAddress",a)},expression:"form.companyAddress"}})],1)],1)],1),e("div",{staticClass:"data-group-border"},[e("el-row",[e("el-col",{attrs:{span:2}},[e("el-form-item",{attrs:{label:"种植"}})],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"品种"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_0_0,callback:function(a){t.$set(t.form.productInfo,"data_0_0",a)},expression:"form.productInfo.data_0_0"}})],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"种植面积"}},[e("el-input-number",{staticStyle:{width:"100%"},attrs:{controls:!1},model:{value:t.form.productInfo.data_0_1,callback:function(a){t.$set(t.form.productInfo,"data_0_1",a)},expression:"form.productInfo.data_0_1"}})],1)],1),e("el-col",{attrs:{span:2}},[e("el-form-item",{attrs:{label:"（亩）"}})],1)],1),e("el-row",[e("el-col",{attrs:{span:2}},[e("el-form-item",{attrs:{label:"水产品"}})],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"品种"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_1_0,callback:function(a){t.$set(t.form.productInfo,"data_1_0",a)},expression:"form.productInfo.data_1_0"}})],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"种植面积"}},[e("el-input-number",{staticStyle:{width:"100%"},attrs:{controls:!1},model:{value:t.form.productInfo.data_1_1,callback:function(a){t.$set(t.form.productInfo,"data_1_1",a)},expression:"form.productInfo.data_1_1"}})],1)],1),e("el-col",{attrs:{span:2}},[e("el-form-item",{attrs:{label:"（亩）"}})],1)],1),e("el-row",[e("el-col",{attrs:{span:2}},[e("el-form-item",{attrs:{label:"畜产品"}})],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"品种"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_2_0,callback:function(a){t.$set(t.form.productInfo,"data_2_0",a)},expression:"form.productInfo.data_2_0"}})],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"种植面积"}},[e("el-input-number",{staticStyle:{width:"100%"},attrs:{controls:!1},model:{value:t.form.productInfo.data_2_1,callback:function(a){t.$set(t.form.productInfo,"data_2_1",a)},expression:"form.productInfo.data_2_1"}})],1)],1),e("el-col",{attrs:{span:2}},[e("el-form-item",{attrs:{label:"（头）"}})],1)],1),e("el-row",[e("el-col",{attrs:{span:2}},[e("el-form-item",{attrs:{label:"禽产品"}})],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"品种"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_3_0,callback:function(a){t.$set(t.form.productInfo,"data_3_0",a)},expression:"form.productInfo.data_3_0"}})],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"种植面积"}},[e("el-input-number",{staticStyle:{width:"100%"},attrs:{controls:!1},model:{value:t.form.productInfo.data_3_1,callback:function(a){t.$set(t.form.productInfo,"data_3_1",a)},expression:"form.productInfo.data_3_1"}})],1)],1),e("el-col",{attrs:{span:2}},[e("el-form-item",{attrs:{label:"（羽）"}})],1)],1)],1),e("el-row",[e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"三品认证",prop:"qualityStandardId"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.qualityStandardId,callback:function(a){t.$set(t.form,"qualityStandardId",t._n(a))},expression:"form.qualityStandardId"}})],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"联系人",prop:"contactPerson"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.contactPerson,callback:function(a){t.$set(t.form,"contactPerson",a)},expression:"form.contactPerson"}})],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"联系人手机",prop:"contactMobile"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.contactMobile,callback:function(a){t.$set(t.form,"contactMobile",a)},expression:"form.contactMobile"}})],1)],1)],1)],1),e("div",{directives:[{name:"show",rawName:"v-show",value:"2"==t.form.companyType,expression:"form.companyType == '2'"}]},[e("el-row",[e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"姓名",prop:"contactPerson"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.contactPerson,callback:function(a){t.$set(t.form,"contactPerson",a)},expression:"form.contactPerson"}})],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"联系方式",prop:"contactWay"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.contactWay,callback:function(a){t.$set(t.form,"contactWay",a)},expression:"form.contactWay"}})],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"地址",prop:"companyAddress"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.companyAddress,callback:function(a){t.$set(t.form,"companyAddress",a)},expression:"form.companyAddress"}})],1)],1)],1),e("el-row",[e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"种养殖面积",prop:"plantArea"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.plantArea,callback:function(a){t.$set(t.form,"plantArea",t._n(a))},expression:"form.plantArea"}})],1)],1),e("el-col",{attrs:{span:8}},[e("el-form-item",{attrs:{label:"土地来源",prop:"landSource"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.landSource,callback:function(a){t.$set(t.form,"landSource",a)},expression:"form.landSource"}})],1)],1)],1),e("div",{staticClass:"data-group-border"},[e("el-row",[e("el-col",{attrs:{span:3}},[e("el-form-item",{attrs:{label:"种植面积（亩）"}})],1),e("el-col",{attrs:{span:5}},[e("el-form-item",{attrs:{label:"稻麦"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_0_0,callback:function(a){t.$set(t.form.productInfo,"data_0_0",a)},expression:"form.productInfo.data_0_0"}})],1)],1),e("el-col",{attrs:{span:5}},[e("el-form-item",{attrs:{label:"蔬菜"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_0_1,callback:function(a){t.$set(t.form.productInfo,"data_0_1",a)},expression:"form.productInfo.data_0_1"}})],1)],1),e("el-col",{attrs:{span:5}},[e("el-form-item",{attrs:{label:"水果"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_0_2,callback:function(a){t.$set(t.form.productInfo,"data_0_2",a)},expression:"form.productInfo.data_0_2"}})],1)],1),e("el-col",{attrs:{span:5}},[e("el-form-item",{attrs:{label:"食用菌"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_0_3,callback:function(a){t.$set(t.form.productInfo,"data_0_3",a)},expression:"form.productInfo.data_0_3"}})],1)],1)],1),e("el-row",[e("el-col",{attrs:{span:3}},[e("el-form-item",{attrs:{label:"水产品养殖面积（亩）"}})],1),e("el-col",{attrs:{span:5}},[e("el-form-item",{attrs:{label:"鱼"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_1_0,callback:function(a){t.$set(t.form.productInfo,"data_1_0",a)},expression:"form.productInfo.data_1_0"}})],1)],1),e("el-col",{attrs:{span:5}},[e("el-form-item",{attrs:{label:"虾蟹"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_1_1,callback:function(a){t.$set(t.form.productInfo,"data_1_1",a)},expression:"form.productInfo.data_1_1"}})],1)],1),e("el-col",{attrs:{span:5}},[e("el-form-item",{attrs:{label:"其他"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_1_2,callback:function(a){t.$set(t.form.productInfo,"data_1_2",a)},expression:"form.productInfo.data_1_2"}})],1)],1)],1),e("el-row",[e("el-col",{attrs:{span:3}},[e("el-form-item",{attrs:{label:"畜养殖规模（头）"}})],1),e("el-col",{attrs:{span:5}},[e("el-form-item",{attrs:{label:"猪"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_2_0,callback:function(a){t.$set(t.form.productInfo,"data_2_0",a)},expression:"form.productInfo.data_2_0"}})],1)],1),e("el-col",{attrs:{span:5}},[e("el-form-item",{attrs:{label:"奶牛"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_2_1,callback:function(a){t.$set(t.form.productInfo,"data_2_1",a)},expression:"form.productInfo.data_2_1"}})],1)],1)],1),e("el-row",[e("el-col",{attrs:{span:3}},[e("el-form-item",{attrs:{label:"禽养殖规模（羽）"}})],1),e("el-col",{attrs:{span:5}},[e("el-form-item",{attrs:{label:"肉禽"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_3_0,callback:function(a){t.$set(t.form.productInfo,"data_3_0",a)},expression:"form.productInfo.data_3_0"}})],1)],1),e("el-col",{attrs:{span:5}},[e("el-form-item",{attrs:{label:"蛋禽"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_3_1,callback:function(a){t.$set(t.form.productInfo,"data_3_1",a)},expression:"form.productInfo.data_3_1"}})],1)],1)],1)],1)],1),e("el-row",[e("el-col",{attrs:{span:12}},[e("el-form-item",{attrs:{label:"社会信用统一代码",prop:"creditCode"}},[e("el-input",{staticStyle:{width:"100%"},model:{value:t.form.creditCode,callback:function(a){t.$set(t.form,"creditCode",a)},expression:"form.creditCode"}})],1)],1)],1),e("el-row",[e("el-col",{attrs:{span:10}},[e("el-form-item",{attrs:{label:"企业荣誉"}},[e("el-input",{staticStyle:{width:"80%"},attrs:{type:"textarea",rows:5},model:{value:t.form.companyHonor,callback:function(a){t.$set(t.form,"companyHonor",a)},expression:"form.companyHonor"}})],1)],1),e("el-col",{attrs:{span:10}},[e("el-form-item",{attrs:{label:"备注"}},[e("el-input",{staticStyle:{width:"80%"},attrs:{type:"textarea",rows:5},model:{value:t.form.remarks,callback:function(a){t.$set(t.form,"remarks",a)},expression:"form.remarks"}})],1)],1)],1),e("el-row",[e("el-col",{attrs:{span:6}},[e("el-form-item",{attrs:{label:"是否监管"}},[e("el-select",{attrs:{placeholder:""},model:{value:t.form.doSupervision,callback:function(a){t.$set(t.form,"doSupervision",a)},expression:"form.doSupervision"}},t._l([{value:"1",label:"是"},{value:"0",label:"否"}],(function(t,a){return e("el-option",{key:a,attrs:{label:t.label,value:t.value}})})),1)],1)],1)],1),e("el-form-item",[e("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:t.onSubmit}},[t._v("保存")]),e("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(a){return t.$router.go(-1)}}},[t._v("取消")])],1)],1)],1)])},r=[],l=e("55a1"),n=e("0010"),s={name:"addRegulatoryObject",data:function(){var t=[{required:!0,message:"必填",trigger:"blur"}];return{createLoading:!1,townList:[],form:{agriculturalClassification:"1",chargePerson:"",companyAddress:"",companyHonor:"",companyId:"-1",companyName:"",companyType:"1",contactMobile:"",contactPerson:"",contactWay:"",createUserId:0,creditCode:"",doSupervision:"1",landSource:"",plantArea:0,public_license:0,public_punish:0,qualityStandardId:0,quality_standard:0,remarks:"",townId:0,updateUserId:0,productInfo:{data_0_0:"",data_0_1:"",data_0_2:"",data_0_3:"",data_1_0:"",data_1_1:"",data_1_2:"",data_2_0:"",data_2_1:"",data_3_0:"",data_3_1:""}},rules:{chargePerson:JSON.parse(JSON.stringify(t)),companyAddress:JSON.parse(JSON.stringify(t)),companyHonor:JSON.parse(JSON.stringify(t)),companyName:JSON.parse(JSON.stringify(t)),companyType:JSON.parse(JSON.stringify(t)),contactMobile:JSON.parse(JSON.stringify(t)),contactPerson:JSON.parse(JSON.stringify(t)),creditCode:JSON.parse(JSON.stringify(t)),doSupervision:JSON.parse(JSON.stringify(t)),landSource:JSON.parse(JSON.stringify(t)),plantArea:[{required:!0,message:"请插入",trigger:"blur"},{type:"number",message:"插入号码",trigger:"blur"}],qualityStandardId:[{required:!0,message:"请插入"},{type:"number",message:"插入号码"}],remarks:JSON.parse(JSON.stringify(t))}}},created:function(){this.getTownList()},methods:{getTownList:function(){var t=this;Object(l["a"])().get("/api/town/all",{}).then((function(a){t.townList=a,t.changeCompany()})).catch((function(t){console.error(t)}))},changeCompany:function(){"1"==this.form.companyType?(this.rules.landSource[0].required=!1,this.rules.plantArea[0].required=!1):"2"==this.form.companyType&&(this.rules.landSource[0].required=!0,this.rules.plantArea[0].required=!0)},onSubmit:function(){var t=this,a=Object(n["a"])().user();a?("2"==this.form.companyType&&(this.form.companyName=this.form.contactPerson,this.form.chargePerson=this.form.contactPerson,this.form.contactMobile=this.form.contactWay),this.$refs["form"].validate((function(a){a&&(t.createLoading=!0,Object(l["a"])().post("/api/company_production/create",{agriculturalClassification:t.form.agriculturalClassification,chargePerson:t.form.chargePerson,companyAddress:t.form.companyAddress,companyHonor:t.form.companyHonor,companyId:t.form.companyId,companyName:t.form.companyName,companyType:t.form.companyType,contactMobile:t.form.contactMobile,contactPerson:t.form.contactPerson,contactWay:t.form.contactWay,createUserId:Object(n["a"])().user().id,creditCode:t.form.creditCode,doSupervision:t.form.doSupervision,landSource:t.form.landSource,plantArea:t.form.plantArea,productInfo:JSON.stringify(t.form.productInfo),public_license:t.form.public_license,public_punish:t.form.public_punish,qualityStandardId:t.form.qualityStandardId,quality_standard:t.form.quality_standard,remarks:t.form.remarks,townId:t.form.townId,updateUserId:Object(n["a"])().user().id}).then((function(a){t.onSendCreditGrade()})))}))):Object(n["a"])().logout()},onSendCreditGrade:function(){var t=this,a=(new Date).toJSON();Object(l["a"])().post("/api/company_credit_grade/create",{approvalGrade:"B",approvalStatus:"1",createTime:a,createUserId:Object(n["a"])().user().id,creditAvailableEnd:a,creditAvailableStart:a,creditCode:this.form.creditCode,creditGradeId:0,gradeTime:a,gradeUnit:"",gradeUnitId:"0",nowGrade:"B",originalGrade:"B",townId:this.form.townId,updateTime:a,updateUserId:Object(n["a"])().user().id,uploadFileName:""}).then((function(a){t.createLoading=!1,t.$router.push({path:"/productionSubject"})}))}}},c=s,i=(e("ed65"),e("2877")),m=Object(i["a"])(c,o,r,!1,null,"66a902fe",null);a["default"]=m.exports},ed65:function(t,a,e){"use strict";var o=e("f24d"),r=e.n(o);r.a},f24d:function(t,a,e){}}]);
//# sourceMappingURL=chunk-70fe78b3.cb7f3625.js.map