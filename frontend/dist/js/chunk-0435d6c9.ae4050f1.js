(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0435d6c9","chunk-2d0e2754"],{"7f7f":function(t,a,e){var i=e("86cc").f,s=Function.prototype,n=/^\s*function ([^ (]*)/,l="name";l in s||e("9e1e")&&i(s,l,{configurable:!0,get:function(){try{return(""+this).match(n)[1]}catch(t){return""}}})},8062:function(t,a,e){},9519:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("div",{staticClass:"title"},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",{staticClass:"actived"},[t._v("修改评级")])],1)],1),e("div",{staticClass:"box"},[t.data?e("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.updateLoading,expression:"updateLoading"}]},[e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-label"},[t._v("状态")]),e("div",{staticClass:"item-value"},[t._v(t._s(t.allStatus[t.data.approvalStatus]))])])]),e("div",{staticClass:"item-row"},[e("div",{staticClass:"item inline-block-IE"},[e("div",{staticClass:"item-label"},[t._v("评级时间")]),e("div",{staticClass:"item-value"},[t._v(t._s(t.data.gradeTime))])]),e("div",{staticClass:"item inline-block-IE"},[e("div",{staticClass:"item-label"},[t._v("名称")]),e("div",{staticClass:"item-value"},[t._v(t._s(t.companyName))])])]),e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-label"},[t._v("原信用评级")]),e("div",{staticClass:"item-value"},[t._v(t._s(t.options[t.grades.indexOf(t.data.originalGrade)]))])])]),e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-label"},[t._v("现信用评级")]),e("div",{staticClass:"item-value"},[e("el-select",{attrs:{placeholder:"请选择"},model:{value:t.data.nowGrade,callback:function(a){t.$set(t.data,"nowGrade",a)},expression:"data.nowGrade"}},t._l(t.options,(function(a,i){return e("el-option",{key:a,attrs:{label:a,value:t.grades[i]}})})),1)],1)])]),e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-label"},[t._v("评级单位")]),e("div",{staticClass:"item-value"},[t._v(t._s(t.data.gradeUnit))])])]),e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-label"},[e("input",{ref:"file",staticStyle:{display:"none"},attrs:{type:"file",id:"file"},on:{change:function(a){return t.handleFileUpload()}}}),e("el-button",{attrs:{size:"small",type:"warning",plain:""},on:{click:function(a){return t.chooseFile()}}},[t._v("添加附件")])],1),t.file?t._e():e("div",{staticClass:"item-value"},[e("el-link",{on:{click:function(a){return t.downloadFile()}}},[t._v("\n              "+t._s(t.data.uploadFileName.replace("/uploads/",""))+"\n            ")])],1),t.file?e("div",{staticClass:"item-value"},[t._v("("+t._s(t.file.name)+")")]):t._e()])]),e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-label"},[e("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(a){return t.saveChanges()}}},[t._v("保存修改")])],1),e("div",{staticClass:"item-value"},[e("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(a){return t.$router.go(-1)}}},[t._v("返回")])],1)])])]):t._e(),t.data?t._e():e("el-form",[t._v("装货...")])],1)])},s=[],n=(e("a481"),e("7f7f"),e("55a1")),l=e("d1a0"),d=e("bc3a"),c=e.n(d),o={name:"EditRating",data:function(){return{updateLoading:!1,id:-1,file:null,pageName:this.$route.name,data:null,grades:["A","B","C"],options:["A级（守信）","B级（基本守信）","C级（失信）"],allStatus:["待审批","已同意","已拒绝"],companyName:""}},created:function(){this.companyName=this.$route.query.company,this.id=this.$route.params.id,this.getData(this.$route.params.id)},methods:{getData:function(t){var a=this;Object(n["a"])().get("/api/company_credit_grade/get/"+t).then((function(t){a.data=t})).catch((function(t){console.log(t)}))},chooseFile:function(){this.$refs.file.click()},handleFileUpload:function(){this.file=this.$refs.file.files[0]},saveChanges:function(t){var a=this;this.updateLoading=!0;var e=new FormData;e.append("updatedNowGrade",this.data.nowGrade),e.append("id",this.data.creditGradeId),this.file&&e.append("file",this.file),e.append("data",this.data),Object(n["a"])().put("/api/company_credit_grade/update/"+this.data.creditGradeId,e).then((function(t){a.saveChangeUpdateGrade()})).catch((function(t){}))},saveChangeUpdateGrade:function(){var t=this,a=[];a.push({approvalStatus:2,creditCode:this.data.creditCode,grade:this.data.nowGrade}),Object(n["a"])().put("/api/company_production/updateGrade/"+this.data.creditCode+"?approvalStatus=2&grade"+this.data.nowGrade).then((function(a){t.updateLoading=!1,t.$router.push({path:"/creditRating"})})).catch((function(t){}))},downloadFile:function(){var t=this;c()({url:l["b"].DOWNLOAD_URL()+this.data.uploadFileName,method:"GET",responseType:"blob"}).then((function(a){var e=window.URL.createObjectURL(new Blob([a.data])),i=document.createElement("a");i.href=e,i.setAttribute("download",t.data.uploadFileName.replace("/uploads/","")),document.body.appendChild(i),i.click(),i.remove()}))}}},r=o,u=(e("9a32"),e("2877")),v=Object(u["a"])(r,i,s,!1,null,"5997b4da",null);a["default"]=v.exports},"9a32":function(t,a,e){"use strict";var i=e("8062"),s=e.n(i);s.a}}]);
//# sourceMappingURL=chunk-0435d6c9.ae4050f1.js.map