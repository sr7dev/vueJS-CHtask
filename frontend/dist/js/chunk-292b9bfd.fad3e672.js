(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-292b9bfd"],{"8cb6":function(a,t,e){},b7a8:function(a,t,e){"use strict";var i=e("8cb6"),s=e.n(i);s.a},d3d4:function(a,t,e){"use strict";e.r(t);var i=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"container"},[e("div",{staticClass:"title"},[e("el-breadcrumb",{attrs:{separator:"/"}},[e("el-breadcrumb-item",{staticClass:"actived"},[a._v("修改评级")])],1)],1),e("div",{staticClass:"box"},[a.data?e("el-form",{directives:[{name:"loading",rawName:"v-loading",value:a.updateLoading,expression:"updateLoading"}]},[e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-label"},[a._v("状态")]),e("div",{staticClass:"item-value"},[a._v(a._s(a.allStatus[a.data.approvalStatus]))])])]),e("div",{staticClass:"item-row"},[e("div",{staticClass:"item inline-block-IE"},[e("div",{staticClass:"item-label"},[a._v("评级时间")]),e("div",{staticClass:"item-value"},[a._v(a._s(a._f("formatDate")(a.data.gradeTime)))])]),e("div",{staticClass:"item inline-block-IE"},[e("div",{staticClass:"item-label"},[a._v("名称")]),e("div",{staticClass:"item-value"},[a._v(a._s(a.companyName))])])]),e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-label"},[a._v("原信用评级")]),e("div",{staticClass:"item-value"},[a._v(a._s(a.options[a.grades.indexOf(a.data.originalGrade)]))])])]),e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-label"},[a._v("现信用评级")]),e("div",{staticClass:"item-value"},[e("el-select",{attrs:{placeholder:"请选择",disabled:""},model:{value:a.data.nowGrade,callback:function(t){a.$set(a.data,"nowGrade",t)},expression:"data.nowGrade"}},a._l(a.options,(function(t,i){return e("el-option",{key:t,attrs:{label:t,value:a.grades[i]}})})),1)],1)])]),e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-label"},[a._v("评级单位")]),e("div",{staticClass:"item-value"},[a._v(a._s(a.data.gradeUnit))])])]),e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-label"},[e("input",{ref:"file",staticStyle:{display:"none"},attrs:{type:"file",id:"file"},on:{change:function(t){return a.handleFileUpload()}}}),e("el-button",{attrs:{size:"small",type:"warning",plain:""},on:{click:function(t){return a.downloadFile()}}},[a._v("下载附件")])],1),a.file?a._e():e("div",{staticClass:"item-value"},[e("el-link",{on:{click:function(t){return a.downloadFile()}}},[a._v("\n              "+a._s(a.data.uploadFileName.replace("/uploads/",""))+"\n            ")])],1),a.file?e("div",{staticClass:"item-value"},[a._v("("+a._s(a.file.name)+")")]):a._e()])]),e("div",{staticClass:"item-row"},[e("div",{staticClass:"item"},[e("div",{staticClass:"item-value"},[e("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(t){return a.$router.go(-1)}}},[a._v("返回")])],1)])])]):a._e(),a.data?a._e():e("el-form",[a._v("装货...")])],1)])},s=[],d=(e("a481"),e("7f7f"),e("55a1")),l=e("d1a0"),n=e("bc3a"),o=e.n(n),c={name:"EditRating",data:function(){return{updateLoading:!1,id:-1,file:null,pageName:this.$route.name,data:null,grades:["A","B","C"],options:["A级（守信）","B级（基本守信）","C级（失信）"],allStatus:["待审批","已同意","已拒绝"],companyName:""}},created:function(){this.companyName=this.$route.query.company,this.id=this.$route.params.id,this.getData(this.$route.params.id)},methods:{getData:function(a){var t=this;Object(d["a"])().get("/api/company_credit_grade/get/"+a).then((function(a){t.data=a})).catch((function(a){console.log(a)}))},chooseFile:function(){this.$refs.file.click()},handleFileUpload:function(){this.file=this.$refs.file.files[0]},saveChanges:function(a){var t=this;this.updateLoading=!0;var e=new FormData;e.append("updatedNowGrade",this.data.nowGrade),e.append("id",this.data.creditGradeId),this.file&&e.append("file",this.file),e.append("data",this.data),Object(d["a"])().put("/api/company_credit_grade/update/"+this.data.creditGradeId,e).then((function(a){t.saveChangeUpdateGrade()})).catch((function(a){}))},saveChangeUpdateGrade:function(){var a=this,t=[];t.push({approvalStatus:2,creditCode:this.data.creditCode,grade:this.data.nowGrade}),Object(d["a"])().put("/api/company_production/updateGrade/"+this.data.creditCode+"?approvalStatus=2&grade"+this.data.nowGrade).then((function(t){a.updateLoading=!1,a.$router.push({path:"/creditRating"})})).catch((function(a){}))},downloadFile:function(){var a=this;o()({url:l["b"].DOWNLOAD_URL()+this.data.uploadFileName,method:"GET",responseType:"blob"}).then((function(t){var e=window.URL.createObjectURL(new Blob([t.data])),i=document.createElement("a");i.href=e,i.setAttribute("download",a.data.uploadFileName.replace("/uploads/","")),document.body.appendChild(i),i.click(),i.remove()}))}}},r=c,u=(e("b7a8"),e("2877")),v=Object(u["a"])(r,i,s,!1,null,"8d877320",null);t["default"]=v.exports}}]);
//# sourceMappingURL=chunk-292b9bfd.fad3e672.js.map