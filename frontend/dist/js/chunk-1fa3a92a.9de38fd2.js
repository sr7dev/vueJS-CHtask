(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1fa3a92a"],{6502:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("div",{staticClass:"title"},[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",[e._v("生产主体")]),r("el-breadcrumb-item",[e._v("主营产品")]),r("el-breadcrumb-item",[e._v("修改品种")])],1)],1),r("el-dialog",{attrs:{visible:e.dialogVisible,width:"30%",modal:""},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("span",[r("i",{staticClass:"el-icon-warning"},[e._v(" 选择文件 !!!")])]),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")])],1)]),r("div",{staticClass:"box"},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.dataloading,expression:"dataloading"}],ref:"ruleForm",attrs:{model:e.ruleFormValue,rules:e.rules,"label-width":"100px"}},[r("el-row",[r("el-col",{attrs:{span:6}},[r("el-form-item",{attrs:{label:"是否共享"}},[r("el-select",{attrs:{placeholder:"请选择是否共享"},model:{value:e.filter_Share,callback:function(t){e.filter_Share=t},expression:"filter_Share"}},e._l(e.options,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value,selected:"item.value"==e.filter_Share}})})),1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:6}},[r("el-form-item",{attrs:{label:"品种名称",prop:"varietyName"}},[r("el-input",{model:{value:e.ruleFormValue.varietyName,callback:function(t){e.$set(e.ruleFormValue,"varietyName",t)},expression:"ruleFormValue.varietyName"}})],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:6}},[r("el-form-item",{attrs:{label:"品种排序",prop:"varietySort"}},[r("el-input",{model:{value:e.ruleFormValue.varietySort,callback:function(t){e.$set(e.ruleFormValue,"varietySort",e._n(t))},expression:"ruleFormValue.varietySort"}})],1)],1)],1),r("el-form-item",[r("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.onSubmit("ruleForm")}}},[e._v("保存")]),r("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(t){return e.$router.go(-1)}}},[e._v("取消")])],1)],1)],1)],1)},i=[],l=(r("c5f6"),r("55a1")),o=r("0010"),n={name:"editVarietyDefinition",data:function(){return{filter_Share:0,dialogVisible:!1,dataloading:!0,varietyId:-1,ruleFormValue:{varietyName:"",varietySort:""},options:[{value:"0",label:"否"},{value:"1",label:"是"}],rules:{varietyName:[{required:!0,message:"请选择",trigger:"change"}],varietySort:[{required:!0,message:"请选择"},{type:"number",message:"插入号码"}]}}},created:function(){this.varietyId=this.$route.params.id,this.getVariety(this.varietyId)},methods:{getVariety:function(e){var t=this;this.dataloading=!0,Object(l["a"])().get("/api/product_variety/get/"+e).then((function(e){t.ruleFormValue=e,t.ruleFormValue.varietySort=Number(t.ruleFormValue.varietySort),t.filter_Share=t.ruleFormValue.doShare,setTimeout((function(){t.dataloading=!1}),10)})).catch((function(e){console.log(e)}))},onSubmit:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("错误 !!"),!1;t.dataloading=!0,Object(l["a"])().put("/api/product_variety/update/"+t.varietyId,{createTime:t.ruleFormValue.createTime,createUserId:t.ruleFormValue.createUserId,doShare:t.filter_Share,id:0,productId:t.ruleFormValue.productId,updateTime:(new Date).toJSON(),updateUserId:Object(o["a"])().user().id,varietyName:t.ruleFormValue.varietyName,varietySort:t.ruleFormValue.varietySort}).then((function(e){setTimeout((function(){t.dataloading=!1}),10),t.$router.go(-1)})).catch((function(e){}))}))}}},u=n,s=r("2877"),c=Object(s["a"])(u,a,i,!1,null,null,null);t["default"]=c.exports},aa77:function(e,t,r){var a=r("5ca1"),i=r("be13"),l=r("79e5"),o=r("fdef"),n="["+o+"]",u="​",s=RegExp("^"+n+n+"*"),c=RegExp(n+n+"*$"),d=function(e,t,r){var i={},n=l((function(){return!!o[e]()||u[e]()!=u})),s=i[e]=n?t(f):o[e];r&&(i[r]=s),a(a.P+a.F*n,"String",i)},f=d.trim=function(e,t){return e=String(i(e)),1&t&&(e=e.replace(s,"")),2&t&&(e=e.replace(c,"")),e};e.exports=d},c5f6:function(e,t,r){"use strict";var a=r("7726"),i=r("69a8"),l=r("2d95"),o=r("5dbc"),n=r("6a99"),u=r("79e5"),s=r("9093").f,c=r("11e9").f,d=r("86cc").f,f=r("aa77").trim,m="Number",p=a[m],v=p,b=p.prototype,g=l(r("2aeb")(b))==m,h="trim"in String.prototype,y=function(e){var t=n(e,!1);if("string"==typeof t&&t.length>2){t=h?t.trim():f(t,3);var r,a,i,l=t.charCodeAt(0);if(43===l||45===l){if(r=t.charCodeAt(2),88===r||120===r)return NaN}else if(48===l){switch(t.charCodeAt(1)){case 66:case 98:a=2,i=49;break;case 79:case 111:a=8,i=55;break;default:return+t}for(var o,u=t.slice(2),s=0,c=u.length;s<c;s++)if(o=u.charCodeAt(s),o<48||o>i)return NaN;return parseInt(u,a)}}return+t};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof p&&(g?u((function(){b.valueOf.call(r)})):l(r)!=m)?o(new v(y(t)),r,p):y(t)};for(var N,S=r("9e1e")?s(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),I=0;S.length>I;I++)i(v,N=S[I])&&!i(p,N)&&d(p,N,c(v,N));p.prototype=b,b.constructor=p,r("2aba")(a,m,p)}},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-1fa3a92a.9de38fd2.js.map