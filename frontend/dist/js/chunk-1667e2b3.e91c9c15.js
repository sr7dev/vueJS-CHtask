(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1667e2b3"],{"0a49":function(t,e,a){var o=a("9b43"),r=a("626a"),l=a("4bf8"),n=a("9def"),s=a("cd1c");t.exports=function(t,e){var a=1==t,c=2==t,i=3==t,m=4==t,f=6==t,d=5==t||f,p=e||s;return function(e,s,u){for(var _,y,b=l(e),h=r(b),v=o(s,u,3),S=n(h.length),I=0,w=a?p(e,S):c?p(e,0):void 0;S>I;I++)if((d||I in h)&&(_=h[I],y=v(_,I,b),t))if(a)w[I]=y;else if(y)switch(t){case 3:return!0;case 5:return _;case 6:return I;case 2:w.push(_)}else if(m)return!1;return f?-1:i||m?m:w}}},1169:function(t,e,a){var o=a("2d95");t.exports=Array.isArray||function(t){return"Array"==o(t)}},"2f4d":function(t,e,a){},"2ffe":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[t._v("监管对象")]),a("el-breadcrumb-item",{staticClass:"actived"},[t._v("修改监管对象")])],1)],1),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.processing,expression:"processing"}],staticClass:"box"},[a("el-form",{ref:"form",staticClass:"data-form",attrs:{model:t.form,"label-width":"150px",rules:t.rules}},[t.isShowDeleteButton?a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",[a("el-radio",{attrs:{label:"1",checked:""},on:{change:t.changeCompany},model:{value:t.form.companyType,callback:function(e){t.$set(t.form,"companyType",e)},expression:"form.companyType"}},[t._v("企业")]),a("el-radio",{attrs:{label:"2"},on:{change:t.changeCompany},model:{value:t.form.companyType,callback:function(e){t.$set(t.form,"companyType",e)},expression:"form.companyType"}},[t._v("农户")])],1)],1)],1):t._e(),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"对象类型"}},[a("el-input",{staticStyle:{width:"100%"},attrs:{disabled:"",value:1==t.form.companyType?"企业":"农户"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"乡镇"}},[a("el-select",{model:{value:t.form.townId,callback:function(e){t.$set(t.form,"townId",e)},expression:"form.townId"}},t._l(t.townList,(function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.id}})})),1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"行业"}},[a("el-select",{model:{value:t.form.agriculturalClassification,callback:function(e){t.$set(t.form,"agriculturalClassification",e)},expression:"form.agriculturalClassification"}},t._l([{value:"1",label:"养殖业"},{value:"2",label:"畜牧业"},{value:"3",label:"种植业"}],(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1)],1)],1),a("div",{directives:[{name:"show",rawName:"v-show",value:"1"==t.form.companyType,expression:"form.companyType == '1'"}]},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"单位名称",prop:"companyName"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.companyName,callback:function(e){t.$set(t.form,"companyName",e)},expression:"form.companyName"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"负责人",prop:"chargePerson"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.chargePerson,callback:function(e){t.$set(t.form,"chargePerson",e)},expression:"form.chargePerson"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"地址",prop:"companyAddress"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.companyAddress,callback:function(e){t.$set(t.form,"companyAddress",e)},expression:"form.companyAddress"}})],1)],1)],1),a("div",{staticClass:"data-group-border"},[a("el-row",[a("el-col",{attrs:{span:2}},[a("el-form-item",{attrs:{label:"种植"}})],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"品种"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_0_0,callback:function(e){t.$set(t.form.productInfo,"data_0_0",e)},expression:"form.productInfo.data_0_0"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"种植面积"}},[a("el-input-number",{staticStyle:{width:"100%"},attrs:{controls:!1},model:{value:t.form.productInfo.data_0_1,callback:function(e){t.$set(t.form.productInfo,"data_0_1",e)},expression:"form.productInfo.data_0_1"}})],1)],1),a("el-col",{attrs:{span:2}},[a("el-form-item",{attrs:{label:"（亩）"}})],1)],1),a("el-row",[a("el-col",{attrs:{span:2}},[a("el-form-item",{attrs:{label:"水产品"}})],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"品种"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_1_0,callback:function(e){t.$set(t.form.productInfo,"data_1_0",e)},expression:"form.productInfo.data_1_0"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"种植面积"}},[a("el-input-number",{staticStyle:{width:"100%"},attrs:{controls:!1},model:{value:t.form.productInfo.data_1_1,callback:function(e){t.$set(t.form.productInfo,"data_1_1",e)},expression:"form.productInfo.data_1_1"}})],1)],1),a("el-col",{attrs:{span:2}},[a("el-form-item",{attrs:{label:"（亩）"}})],1)],1),a("el-row",[a("el-col",{attrs:{span:2}},[a("el-form-item",{attrs:{label:"畜产品"}})],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"品种"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_2_0,callback:function(e){t.$set(t.form.productInfo,"data_2_0",e)},expression:"form.productInfo.data_2_0"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"种植面积"}},[a("el-input-number",{staticStyle:{width:"100%"},attrs:{controls:!1},model:{value:t.form.productInfo.data_2_1,callback:function(e){t.$set(t.form.productInfo,"data_2_1",e)},expression:"form.productInfo.data_2_1"}})],1)],1),a("el-col",{attrs:{span:2}},[a("el-form-item",{attrs:{label:"（头）"}})],1)],1),a("el-row",[a("el-col",{attrs:{span:2}},[a("el-form-item",{attrs:{label:"禽产品"}})],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"品种"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_3_0,callback:function(e){t.$set(t.form.productInfo,"data_3_0",e)},expression:"form.productInfo.data_3_0"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"种植面积"}},[a("el-input-number",{staticStyle:{width:"100%"},attrs:{controls:!1},model:{value:t.form.productInfo.data_3_1,callback:function(e){t.$set(t.form.productInfo,"data_3_1",e)},expression:"form.productInfo.data_3_1"}})],1)],1),a("el-col",{attrs:{span:2}},[a("el-form-item",{attrs:{label:"（羽）"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"三品认证",prop:"qualityStandardId"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.qualityStandardId,callback:function(e){t.$set(t.form,"qualityStandardId",t._n(e))},expression:"form.qualityStandardId"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系人",prop:"contactPerson"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.contactPerson,callback:function(e){t.$set(t.form,"contactPerson",e)},expression:"form.contactPerson"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系人手机",prop:"contactMobile"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.contactMobile,callback:function(e){t.$set(t.form,"contactMobile",e)},expression:"form.contactMobile"}})],1)],1)],1)],1),a("div",{directives:[{name:"show",rawName:"v-show",value:"2"==t.form.companyType,expression:"form.companyType == '2'"}]},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"姓名",prop:"contactPerson"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.contactPerson,callback:function(e){t.$set(t.form,"contactPerson",e)},expression:"form.contactPerson"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"联系方式",prop:"contactWay"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.contactWay,callback:function(e){t.$set(t.form,"contactWay",e)},expression:"form.contactWay"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"地址",prop:"companyAddress"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.companyAddress,callback:function(e){t.$set(t.form,"companyAddress",e)},expression:"form.companyAddress"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"种养殖面积",prop:"plantArea"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.plantArea,callback:function(e){t.$set(t.form,"plantArea",t._n(e))},expression:"form.plantArea"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"土地来源",prop:"landSource"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.landSource,callback:function(e){t.$set(t.form,"landSource",e)},expression:"form.landSource"}})],1)],1)],1),a("div",{staticClass:"data-group-border"},[a("el-row",[a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{label:"种植面积（亩）"}})],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"稻麦"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_0_0,callback:function(e){t.$set(t.form.productInfo,"data_0_0",e)},expression:"form.productInfo.data_0_0"}})],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"蔬菜"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_0_1,callback:function(e){t.$set(t.form.productInfo,"data_0_1",e)},expression:"form.productInfo.data_0_1"}})],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"水果"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_0_2,callback:function(e){t.$set(t.form.productInfo,"data_0_2",e)},expression:"form.productInfo.data_0_2"}})],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"食用菌"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_0_3,callback:function(e){t.$set(t.form.productInfo,"data_0_3",e)},expression:"form.productInfo.data_0_3"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{label:"水产品养殖面积（亩）"}})],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"鱼"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_1_0,callback:function(e){t.$set(t.form.productInfo,"data_1_0",e)},expression:"form.productInfo.data_1_0"}})],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"虾蟹"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_1_1,callback:function(e){t.$set(t.form.productInfo,"data_1_1",e)},expression:"form.productInfo.data_1_1"}})],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"其他"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_1_2,callback:function(e){t.$set(t.form.productInfo,"data_1_2",e)},expression:"form.productInfo.data_1_2"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{label:"畜养殖规模（头）"}})],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"猪"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_2_0,callback:function(e){t.$set(t.form.productInfo,"data_2_0",e)},expression:"form.productInfo.data_2_0"}})],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"奶牛"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_2_1,callback:function(e){t.$set(t.form.productInfo,"data_2_1",e)},expression:"form.productInfo.data_2_1"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:3}},[a("el-form-item",{attrs:{label:"禽养殖规模（羽）"}})],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"肉禽"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_3_0,callback:function(e){t.$set(t.form.productInfo,"data_3_0",e)},expression:"form.productInfo.data_3_0"}})],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"蛋禽"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.productInfo.data_3_1,callback:function(e){t.$set(t.form.productInfo,"data_3_1",e)},expression:"form.productInfo.data_3_1"}})],1)],1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"社会信用统一代码",prop:"creditCode"}},[a("el-input",{staticStyle:{width:"100%"},model:{value:t.form.creditCode,callback:function(e){t.$set(t.form,"creditCode",e)},expression:"form.creditCode"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"企业荣誉"}},[a("el-input",{staticStyle:{width:"80%"},attrs:{type:"textarea",rows:5,"class-name":"el-textarea-font"},model:{value:t.form.companyHonor,callback:function(e){t.$set(t.form,"companyHonor",e)},expression:"form.companyHonor"}})],1)],1),a("el-col",{attrs:{span:10}},[a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{staticStyle:{width:"80%"},attrs:{type:"textarea",rows:5,"class-name":"el-textarea-font"},model:{value:t.form.remarks,callback:function(e){t.$set(t.form,"remarks",e)},expression:"form.remarks"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"是否监管"}},[a("el-select",{attrs:{placeholder:""},model:{value:t.form.doSupervision,callback:function(e){t.$set(t.form,"doSupervision",e)},expression:"form.doSupervision"}},t._l([{value:"1",label:"是"},{value:"0",label:"否"}],(function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),1)],1)],1)],1),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:t.onSubmit}},[t._v("保存")]),a("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(e){return t.$router.go(-1)}}},[t._v("取消")])],1)],1)],1)])},r=[],l=(a("7514"),a("8ded")),n=a.n(l),s=a("55a1"),c=a("0010"),i={name:"editRegulatoryObject",data:function(){var t=[{required:!0,message:"必填",trigger:"blur"}];return{townList:[{id:-1,name:"全部"}],processing:!1,form:{agriculturalClassification:1,chargePerson:"",companyAddress:"",companyHonor:"",companyId:-1,companyName:"",companyType:"1",contactMobile:"",contactPerson:"",contactWay:"",createUserId:0,creditCode:"",doSupervision:"",landSource:"",plantArea:0,public_license:0,public_punish:0,qualityStandardId:0,quality_standard:0,remarks:"",townId:-1,updateUserId:0,productInfo:{data_0_0:"",data_0_1:"",data_0_2:"",data_0_3:"",data_1_0:"",data_1_1:"",data_1_2:"",data_2_0:"",data_2_1:"",data_3_0:"",data_3_1:""}},rules:{chargePerson:JSON.parse(JSON.stringify(t)),companyAddress:JSON.parse(JSON.stringify(t)),companyHonor:JSON.parse(JSON.stringify(t)),companyName:JSON.parse(JSON.stringify(t)),companyType:JSON.parse(JSON.stringify(t)),contactMobile:JSON.parse(JSON.stringify(t)),contactPerson:JSON.parse(JSON.stringify(t)),creditCode:JSON.parse(JSON.stringify(t)),doSupervision:JSON.parse(JSON.stringify(t)),landSource:JSON.parse(JSON.stringify(t)),plantArea:[{required:!0,message:"请插入"},{type:"number",message:"插入号码"}],qualityStandardId:[{required:!0,message:"请插入"},{type:"number",message:"插入号码"}],remarks:JSON.parse(JSON.stringify(t))},id:0,isShowDeleteButton:null}},created:function(){this.id=this.$route.params.id,this.isShowDeleteButton=!!n.a.get("authList").find((function(t){return"searchproductionSubject"==t.privilegeCode})),this.processing=!0,this.getCompanyInfo(this.id),this.getTownList()},methods:{getCompanyInfo:function(t){var e=this;Object(s["a"])().get("/api/company_production/get/"+t).then((function(t){e.form=t,e.form.productInfo=JSON.parse(t.productInfo),e.changeCompany()})).catch((function(t){console.log(t)}))},getTownList:function(){var t=this;Object(s["a"])().get("/api/town/all",{}).then((function(e){t.townList=e,t.processing=!1})).catch((function(t){console.error(t)}))},changeCompany:function(){1==this.form.companyType?(this.rules.landSource[0].required=!1,this.rules.plantArea[0].required=!1):2==this.form.companyType&&(this.rules.landSource[0].required=!0,this.rules.plantArea[0].required=!0)},onSubmit:function(){var t=this,e=Object(c["a"])().user();e?("2"==this.form.companyType&&(this.form.companyName=this.form.contactPerson,this.form.chargePerson=this.form.contactPerson,this.form.contactMobile=this.form.contactWay),this.$refs["form"].validate((function(e){e&&(t.processing=!0,Object(s["a"])().put("/api/company_production/update/"+t.id,{agriculturalClassification:t.form.agriculturalClassification,chargePerson:t.form.chargePerson,companyAddress:t.form.companyAddress,companyHonor:t.form.companyHonor,companyId:t.form.companyId,companyName:t.form.companyName,companyType:t.form.companyType,contactMobile:t.form.contactMobile,contactPerson:t.form.contactPerson,contactWay:t.form.contactWay,createUserId:Object(c["a"])().user().id,creditCode:t.form.creditCode,doSupervision:t.form.doSupervision,landSource:t.form.landSource,plantArea:t.form.plantArea,productInfo:JSON.stringify(t.form.productInfo),public_license:t.form.public_license,public_punish:t.form.public_punish,qualityStandardId:t.form.qualityStandardId,quality_standard:t.form.quality_standard,remarks:t.form.remarks,townId:t.form.townId,updateUserId:Object(c["a"])().user().id}).then((function(e){t.processing=!1,t.$router.push({path:"/productionSubject"})})))}))):Object(c["a"])().logout()}}},m=i,f=(a("4486"),a("2877")),d=Object(f["a"])(m,o,r,!1,null,"4a8ff84e",null);e["default"]=d.exports},4486:function(t,e,a){"use strict";var o=a("2f4d"),r=a.n(o);r.a},7514:function(t,e,a){"use strict";var o=a("5ca1"),r=a("0a49")(5),l="find",n=!0;l in[]&&Array(1)[l]((function(){n=!1})),o(o.P+o.F*n,"Array",{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")(l)},cd1c:function(t,e,a){var o=a("e853");t.exports=function(t,e){return new(o(t))(e)}},e853:function(t,e,a){var o=a("d3f4"),r=a("1169"),l=a("2b4c")("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),o(e)&&(e=e[l],null===e&&(e=void 0))),void 0===e?Array:e}}}]);
//# sourceMappingURL=chunk-1667e2b3.e91c9c15.js.map