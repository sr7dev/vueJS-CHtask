(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-77e0448e"],{1281:function(t,a,e){"use strict";var n=e("d942"),o=e.n(n);o.a},b039:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("div",{staticClass:"title"},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",[t._v("投入品管理")]),e("el-breadcrumb-item",{staticClass:"actived"},[t._v("查看详情")])],1)],1),e("div",{staticClass:"box"},[e("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.dataloading,expression:"dataloading"}],ref:"formData",staticClass:"form-width",attrs:{model:t.formData,"label-width":"100px"}},[e("el-form-item",{staticClass:"input-width label-align",attrs:{label:"企业名称",prop:"companyId"}},[e("el-select",{attrs:{disabled:""},model:{value:t.formData.companyId,callback:function(a){t.$set(t.formData,"companyId",a)},expression:"formData.companyId"}},t._l(t.companyProduction,(function(t){return e("el-option",{key:t.companyId,attrs:{label:t.companyName,value:t.companyId}})})),1)],1),e("el-form-item",{staticClass:"input-width label-align",attrs:{label:"样品名称",prop:"sampleName"}},[e("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:t.formData.sampleName,callback:function(a){t.$set(t.formData,"sampleName",a)},expression:"formData.sampleName"}})],1),t.bLeft?e("el-form-item",{staticClass:"input-width label-align",attrs:{label:"使用数量",prop:"amount"}},[e("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:t.formData.amount,callback:function(a){t.$set(t.formData,"amount",a)},expression:"formData.amount"}})],1):e("el-form-item",{staticClass:"input-width label-align",attrs:{label:"采购数量",prop:"amount"}},[e("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:t.formData.amount,callback:function(a){t.$set(t.formData,"amount",a)},expression:"formData.amount"}})],1),e("el-form-item",{attrs:{label:""}},[e("el-button",{attrs:{size:"small",plain:"",disabled:!t.file,type:"primary"},on:{click:function(a){return t.downloadFile()}}},[t._v("附件下载")]),t.file?t._e():e("span",{staticClass:"item-value"},[e("el-link",{on:{click:function(a){return t.downloadFile()}}},[t._v("\n                  "+t._s(t.fileName)+"\n              ")])],1),t.file?e("span",{staticClass:"item-value margin-left-10"},[e("el-link",{on:{click:function(a){return t.downloadFile()}}},[t._v("\n                  "+t._s(t.fileName)+"\n              ")])],1):t._e()],1),e("el-form-item",[e("el-button",{attrs:{size:"small",plain:"",type:"success"},on:{click:function(a){return t.$router.go(-1)}}},[t._v("\n              返回\n          ")])],1)],1)],1)])},o=[],i=(e("a481"),e("55a1")),l=e("d1a0"),s=e("bc3a"),r=e.n(s),c={data:function(){return{formData:{companyId:0,amount:"",sampleName:""},companyProduction:[],fileName:"",file:null,dataloading:!1,bLeft:!0,is_ie:null}},created:function(){this.isIE()},mounted:function(){this.getCompanyProduct(),this.bLeft=this.$route.query.mode,this.id=this.$route.params.id,this.getData(this.$route.params.id,this.bLeft)},methods:{getCompanyProduct:function(){var t=this;Object(i["a"])().get("/api/company_production/name").then((function(a){t.companyProduction=t.companyProduction.concat(a)})).catch((function(t){console.log(t)}))},getData:function(t,a){var e=this;this.dataloading=!0,a?Object(i["a"])().get("/api/inputsUse/get/"+t).then((function(t){e.formData=t,e.file=t.inputProfiles,e.fileName=e.file.replace("/uploads/",""),setTimeout((function(){e.dataloading=!1}),500)})).catch((function(t){console.log(t)})):Object(i["a"])().get("/api/inputsPurchase/get/"+t).then((function(t){e.formData=t,e.file=t.inputProfiles,e.fileName=e.file.replace("/uploads/",""),setTimeout((function(){e.dataloading=!1}),10)})).catch((function(t){console.log(t)}))},downloadFile:function(){var t=this;r()({url:l["b"].DOWNLOAD_URL()+this.file,method:"GET",responseType:"blob"}).then((function(a){if(t.is_ie){var e=new Blob([a.data],{type:"application/octet-stream"});if(window.navigator&&window.navigator.msSaveOrOpenBlob)return void window.navigator.msSaveOrOpenBlob(e,t.file.replace("/uploads/",""))}else{var n=window.URL.createObjectURL(new Blob([a.data])),o=document.createElement("a");o.href=n,o.setAttribute("download",t.file.replace("/uploads/","")),document.body.appendChild(o),o.click(),o.remove()}}))},isIE:function(){var t=navigator.userAgent;this.is_ie=t.indexOf("MSIE ")>-1||t.indexOf("Trident/")>-1}}},m=c,u=(e("1281"),e("2877")),d=Object(u["a"])(m,n,o,!1,null,null,null);a["default"]=d.exports},d942:function(t,a,e){}}]);
//# sourceMappingURL=chunk-77e0448e.a580066a.js.map