(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33fbfd55"],{"6a45":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[t._v("例行抽样")]),a("el-breadcrumb-item",{staticClass:"actived"},[t._v("抽样结果")])],1)],1),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"box"},[a("div",{staticClass:"item-row"},[a("div",{staticClass:"item"},[a("div",{staticClass:"item-label"},[t._v("检测名称:")]),a("div",{staticClass:"item-value"},[t._v(t._s(t.data.sampleName))])])]),a("div",{staticClass:"item-row"},[a("div",{staticClass:"item"},[a("div",{staticClass:"item-label"},[t._v("检测时间:")]),a("div",{staticClass:"item-value"},[t._v(t._s(t.getDateString(t.data.sampleTime)))])]),a("div",{staticClass:"item"},[a("div",{staticClass:"item-label"},[t._v("检测人员:")]),a("div",{staticClass:"item-value"},[t._v(t._s(t.data.checkPerson))])])]),a("div",{staticClass:"item-row"},[a("div",{staticClass:"item"},[a("div",{staticClass:"item-label"},[t._v("检测结果:")]),a("div",{staticClass:"item-value"},[t._v(t._s(1==t.data.checkResult?"合格":"不合格"))])])]),a("div",{staticClass:"item-row"},[a("div",{staticClass:"item"},[a("div",{staticClass:"item-label"},[a("input",{ref:"file",staticStyle:{display:"none"},attrs:{type:"file",id:"file"},on:{change:function(e){return t.handleFileUpload()}}}),a("el-button",{attrs:{size:"small",type:"warning",plain:"",disabled:!t.fileName}},[t._v("下载附件")])],1),t.file?t._e():a("div",{staticClass:"item-value"},[a("el-link",{on:{click:function(e){return t.downloadFile()}}},[t._v("\n            "+t._s(t.fileName)+"\n          ")])],1),t.file?a("div",{staticClass:"item-value"},[t._v(t._s(t.file.name))]):t._e()])]),a("div",{staticClass:"item-row"},[a("div",{staticClass:"item"},[a("div",{staticClass:"item-value"},[a("el-button",{attrs:{size:"small",plain:"",type:"primary"},on:{click:function(e){return t.$router.push({path:"/sampleCheckMain",query:{mode:1}})}}},[t._v("返回")])],1)])])])])},s=[],l=(a("a481"),a("55a1")),n=a("d1a0"),c=a("bc3a"),d=a.n(c),o={name:"detailsSampleCheckResult",data:function(){return{id:-1,data:[],file:null,fileName:"",listLoading:!1}},mounted:function(){this.id=this.$route.params.id,this.getData()},methods:{getData:function(){var t=this;this.listLoading=!0,Object(l["a"])().get("/api/sample_check_result/get/".concat(this.id)).then((function(e){t.data=e,t.fileName=t.data.checkFiles.replace("/uploads/",""),setTimeout((function(){t.listLoading=!1}),500)})).catch((function(t){console.log(t)}))},getDateString:function(t){var e=new Date(t);return e.toLocaleDateString()},downloadFile:function(){var t=this;d()({url:n["b"].DOWNLOAD_URL()+this.data.checkFiles,method:"GET",responseType:"blob"}).then((function(e){if(t.isIE()){var a=new Blob([e.data],{type:"application/octet-stream"});if(window.navigator&&window.navigator.msSaveOrOpenBlob)return void window.navigator.msSaveOrOpenBlob(a,t.data.checkFiles.replace("/uploads/",""))}else{var i=window.URL.createObjectURL(new Blob([e.data])),s=document.createElement("a");s.href=i,s.setAttribute("download",t.data.checkFiles.replace("/uploads/","")),document.body.appendChild(s),s.click(),s.remove()}}))},isIE:function(){var t=navigator.userAgent;return t.indexOf("MSIE ")>-1||t.indexOf("Trident/")>-1}}},r=o,v=(a("e293"),a("2877")),u=Object(v["a"])(r,i,s,!1,null,"7d321bcf",null);e["default"]=u.exports},e293:function(t,e,a){"use strict";var i=a("ec67"),s=a.n(i);s.a},ec67:function(t,e,a){}}]);
//# sourceMappingURL=chunk-33fbfd55.41de34bd.js.map