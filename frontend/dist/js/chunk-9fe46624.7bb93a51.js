(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9fe46624"],{"1af6":function(e,t,a){var r=a("63b6");r(r.S,"Array",{isArray:a("9003")})},"20fd":function(e,t,a){"use strict";var r=a("d9f6"),i=a("aebd");e.exports=function(e,t,a){t in e?r.f(e,t,i(0,a)):e[t]=a}},"4f7f":function(e,t,a){"use strict";var r=a("c26b"),i=a("b39a"),o="Set";e.exports=a("e0b8")(o,(function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}}),{add:function(e){return r.def(i(this,o),e=0===e?0:e,e)}},r)},"549b":function(e,t,a){"use strict";var r=a("d864"),i=a("63b6"),o=a("241e"),l=a("b0dc"),n=a("3702"),s=a("b447"),c=a("20fd"),u=a("7cd6");i(i.S+i.F*!a("4ee1")((function(e){Array.from(e)})),"Array",{from:function(e){var t,a,i,p,d=o(e),f="function"==typeof this?this:Array,m=arguments.length,h=m>1?arguments[1]:void 0,g=void 0!==h,v=0,_=u(d);if(g&&(h=r(h,m>2?arguments[2]:void 0,2)),void 0==_||f==Array&&n(_))for(t=s(d.length),a=new f(t);t>v;v++)c(a,v,g?h(d[v],v):d[v]);else for(p=_.call(d),a=new f;!(i=p.next()).done;v++)c(a,v,g?l(p,h,[i.value,v],!0):i.value);return a.length=v,a}})},"54a1":function(e,t,a){a("6c1c"),a("1654"),e.exports=a("95d5")},"67ab":function(e,t,a){var r=a("ca5a")("meta"),i=a("d3f4"),o=a("69a8"),l=a("86cc").f,n=0,s=Object.isExtensible||function(){return!0},c=!a("79e5")((function(){return s(Object.preventExtensions({}))})),u=function(e){l(e,r,{value:{i:"O"+ ++n,w:{}}})},p=function(e,t){if(!i(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,r)){if(!s(e))return"F";if(!t)return"E";u(e)}return e[r].i},d=function(e,t){if(!o(e,r)){if(!s(e))return!0;if(!t)return!1;u(e)}return e[r].w},f=function(e){return c&&m.NEED&&s(e)&&!o(e,r)&&u(e),e},m=e.exports={KEY:r,NEED:!1,fastKey:p,getWeak:d,onFreeze:f}},"6bcd":function(e,t,a){},"75fc":function(e,t,a){"use strict";var r=a("a745"),i=a.n(r);function o(e){if(i()(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}var l=a("774e"),n=a.n(l),s=a("c8bb"),c=a.n(s);function u(e){if(c()(Object(e))||"[object Arguments]"===Object.prototype.toString.call(e))return n()(e)}function p(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function d(e){return o(e)||u(e)||p()}a.d(t,"a",(function(){return d}))},"774e":function(e,t,a){e.exports=a("d2d5")},"95d5":function(e,t,a){var r=a("40c3"),i=a("5168")("iterator"),o=a("481b");e.exports=a("584a").isIterable=function(e){var t=Object(e);return void 0!==t[i]||"@@iterator"in t||o.hasOwnProperty(r(t))}},"9db0":function(e,t,a){"use strict";var r=a("6bcd"),i=a.n(r);i.a},a745:function(e,t,a){e.exports=a("f410")},b39a:function(e,t,a){var r=a("d3f4");e.exports=function(e,t){if(!r(e)||e._t!==t)throw TypeError("Incompatible receiver, "+t+" required!");return e}},c26b:function(e,t,a){"use strict";var r=a("86cc").f,i=a("2aeb"),o=a("dcbc"),l=a("9b43"),n=a("f605"),s=a("4a59"),c=a("01f9"),u=a("d53b"),p=a("7a56"),d=a("9e1e"),f=a("67ab").fastKey,m=a("b39a"),h=d?"_s":"size",g=function(e,t){var a,r=f(t);if("F"!==r)return e._i[r];for(a=e._f;a;a=a.n)if(a.k==t)return a};e.exports={getConstructor:function(e,t,a,c){var u=e((function(e,r){n(e,u,t,"_i"),e._t=t,e._i=i(null),e._f=void 0,e._l=void 0,e[h]=0,void 0!=r&&s(r,a,e[c],e)}));return o(u.prototype,{clear:function(){for(var e=m(this,t),a=e._i,r=e._f;r;r=r.n)r.r=!0,r.p&&(r.p=r.p.n=void 0),delete a[r.i];e._f=e._l=void 0,e[h]=0},delete:function(e){var a=m(this,t),r=g(a,e);if(r){var i=r.n,o=r.p;delete a._i[r.i],r.r=!0,o&&(o.n=i),i&&(i.p=o),a._f==r&&(a._f=i),a._l==r&&(a._l=o),a[h]--}return!!r},forEach:function(e){m(this,t);var a,r=l(e,arguments.length>1?arguments[1]:void 0,3);while(a=a?a.n:this._f){r(a.v,a.k,this);while(a&&a.r)a=a.p}},has:function(e){return!!g(m(this,t),e)}}),d&&r(u.prototype,"size",{get:function(){return m(this,t)[h]}}),u},def:function(e,t,a){var r,i,o=g(e,t);return o?o.v=a:(e._l=o={i:i=f(t,!0),k:t,v:a,p:r=e._l,n:void 0,r:!1},e._f||(e._f=o),r&&(r.n=o),e[h]++,"F"!==i&&(e._i[i]=o)),e},getEntry:g,setStrong:function(e,t,a){c(e,t,(function(e,a){this._t=m(e,t),this._k=a,this._l=void 0}),(function(){var e=this,t=e._k,a=e._l;while(a&&a.r)a=a.p;return e._t&&(e._l=a=a?a.n:e._t._f)?u(0,"keys"==t?a.k:"values"==t?a.v:[a.k,a.v]):(e._t=void 0,u(1))}),a?"entries":"values",!a,!0),p(t)}}},c8bb:function(e,t,a){e.exports=a("54a1")},d2d5:function(e,t,a){a("1654"),a("549b"),e.exports=a("584a").Array.from},dd47:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[e._v("监管对象")]),a("el-breadcrumb-item",[e._v("主营产品")]),a("el-breadcrumb-item",{staticClass:"actived"},[e._v("产品批次")])],1)],1),a("div",{staticClass:"box"},[a("div",{staticClass:"iptBox"},[a("div",{staticClass:"filter-item"},[e.isShowAddButton?a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){return e.$router.push({path:"/productionSubject/mainProduct/productBatch/"+e.productId+"/create"})}}},[e._v("添加")]):e._e(),a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){return e.$router.go(-1)}}},[e._v("返回")])],1)]),a("el-dialog",{attrs:{visible:e.confirm_dialogVisible,width:"30%",modal:""},on:{"update:visible":function(t){e.confirm_dialogVisible=t}}},[a("span",[a("i",{staticClass:"el-icon-warning"},[e._v(" 继续？请再次检查")])]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){e.confirm_dialogVisible=!1}}},[e._v("取消")]),a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.deleteSelectedRow()}}},[e._v("确认")])],1)]),a("el-dialog",{attrs:{visible:e.show_TaskDialog,width:"30%",modal:""},on:{"update:visible":function(t){e.show_TaskDialog=t}}},[a("el-row",[a("el-col",{staticClass:"margin-bottom-30 text-center",attrs:{span:24}},[a("h1",[e._v("作业")])])],1),a("el-form",{ref:"ruleForm1",attrs:{"label-width":"100px",model:e.ruleFormValue1}},[a("el-row",[a("el-col",{attrs:{span:20}},[a("el-form-item",{attrs:{label:"作业名称",prop:"productTask",rules:{required:!0,message:"请选择",trigger:"change"}}},[a("el-select",{staticClass:"w-100",model:{value:e.ruleFormValue1.productTask,callback:function(t){e.$set(e.ruleFormValue1,"productTask",t)},expression:"ruleFormValue1.productTask"}},e._l(e.taskList,(function(e){return a("el-option",{key:e.id,attrs:{value:e.id,label:e.taskName}})})),1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:20}},[a("el-form-item",{attrs:{label:"日期",prop:"taskDate",rules:{required:!0,message:"请选择",trigger:"change"}}},[a("el-date-picker",{staticClass:"w-100",attrs:{type:"datetime"},model:{value:e.ruleFormValue1.taskDate,callback:function(t){e.$set(e.ruleFormValue1,"taskDate",t)},expression:"ruleFormValue1.taskDate"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:5}},[e._v(" ")]),a("el-col",{attrs:{span:10}},[a("el-button",{staticClass:"margin-bottom-10",attrs:{size:"small",type:"warning",plain:""},on:{click:function(t){return e.chooseFile_Live()}}},[e._v("选择文件")]),!e.file_live_1&&e.fileName1?a("el-link",{staticStyle:{display:"table"},on:{click:function(t){return e.downloadFile(e.fileName1)}}},[e._v("\n              "+e._s(e.fileName1.replace("/uploads/",""))+"\n            ")]):e._e(),e.file_live_1?a("p",[e._v(e._s(e.file_live_1.name))]):e._e(),e.file_live_1||e.fileName1?e._e():a("p",[e._v("请选择需要上传的文件...")])],1),a("el-col",{attrs:{span:5}},[a("div",{staticClass:"img-container no-margin-top margin-bottom-30 margin-left-10"},[!e.file_live_1&&e.fileName1?a("img",{staticClass:"preview",attrs:{src:e.downloadUrl+e.fileName1}}):e._e(),e.file_live_1&&e.fileName1?a("img",{staticClass:"preview",attrs:{src:e.image}}):e._e()]),a("div",{staticClass:"image-box"},[a("input",{ref:"file_live_1",staticClass:"image-upload",staticStyle:{display:"none"},attrs:{type:"file",id:"file1",accept:"image/*",name:"images"},on:{change:function(t){return e.handleFileUpload_Live()}}})])])],1),a("el-row",[a("el-col",{staticClass:"text-right",attrs:{span:20}},[a("el-form-item",{staticClass:"flex-box w-100 no-margin-IE"},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){e.show_TaskDialog=!1}}},[e._v("关闭")]),e.isHideDeleteButton?e._e():a("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(t){return e.showConfirmDialog(1)}}},[e._v("删除")]),a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.onSubmitTask("ruleForm1")}}},[e._v("保存")])],1)],1)],1)],1)],1),a("el-dialog",{attrs:{visible:e.show_ReportDialog,width:"30%",modal:""},on:{"update:visible":function(t){e.show_ReportDialog=t}}},[a("el-row",[a("el-col",{staticClass:"margin-bottom-30 text-center",attrs:{span:24}},[a("h1",[e._v("上传检测报告")])])],1),a("el-form",{ref:"ruleForm2",attrs:{"label-width":"100px",model:e.ruleFormValue2}},[a("el-row",[a("el-col",{attrs:{span:20}},[a("el-form-item",{attrs:{label:"日期",prop:"reportDate",rules:{required:!0,message:"请选择",trigger:"change"}}},[a("el-date-picker",{staticClass:"w-100",attrs:{type:"datetime"},model:{value:e.ruleFormValue2.reportDate,callback:function(t){e.$set(e.ruleFormValue2,"reportDate",t)},expression:"ruleFormValue2.reportDate"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:20}},[a("el-form-item",{attrs:{label:"结果",prop:"reportResult",rules:{required:!0,message:"请选择",trigger:"change"}}},[a("el-select",{staticClass:"w-100",attrs:{type:"datetime"},model:{value:e.ruleFormValue2.reportResult,callback:function(t){e.$set(e.ruleFormValue2,"reportResult",t)},expression:"ruleFormValue2.reportResult"}},e._l(e.resultOption,(function(e){return a("el-option",{key:e.value,attrs:{value:e.value,label:e.label}})})),1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:5}},[e._v(" ")]),a("el-col",{staticClass:"margin-bottom-30",attrs:{span:18}},[a("el-button",{staticClass:"margin-bottom-10",attrs:{size:"small",type:"warning",plain:""},on:{click:function(t){return e.chooseFile_Report()}}},[e._v("选择文件")]),!e.file_live_2&&e.fileName2?a("el-link",{staticClass:"margin-left-10",on:{click:function(t){return e.downloadFile(e.fileName2)}}},[e._v("\n              "+e._s(e.fileName2.replace("/uploads/",""))+"\n            ")]):e._e(),e.file_live_2?a("p",[e._v(e._s(e.file_live_2.name))]):e._e(),e.file_live_2||e.fileName2?e._e():a("p",[e._v("请选择需要上传的文件...")])],1),a("el-col",{attrs:{span:5}},[a("div",{staticClass:"image-box"},[a("input",{ref:"file_live_2",staticClass:"image-upload",staticStyle:{display:"none"},attrs:{type:"file",id:"file2",name:"images"},on:{change:function(t){return e.handleFileUpload_Report()}}})])])],1),a("el-row",[a("el-col",{staticClass:"text-right",attrs:{span:20}},[a("el-form-item",{staticClass:"flex-box w-100 no-margin-IE"},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){e.show_ReportDialog=!1}}},[e._v("关闭")]),a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.onSubmitReport("ruleForm2")}}},[e._v("保存")])],1)],1)],1)],1)],1),a("el-dialog",{attrs:{visible:e.show_PropertyDialog,width:"30%",modal:""},on:{"update:visible":function(t){e.show_PropertyDialog=t}}},[a("el-row",[a("el-col",{staticClass:"margin-bottom-30 text-center",attrs:{span:24}},[a("h1",[e._v("属性")])])],1),a("el-form",{ref:"ruleForm3",attrs:{"label-width":"100px",model:e.ruleFormValue3}},[a("el-row",[a("el-col",{attrs:{span:20}},[a("el-form-item",{attrs:{label:"属性名称",prop:"propertyName",rules:{required:!0,message:"请选择",trigger:"change"}}},[a("el-select",{staticClass:"w-100",on:{change:function(t){return e.makePropertyValueList()}},model:{value:e.ruleFormValue3.propertyName,callback:function(t){e.$set(e.ruleFormValue3,"propertyName",t)},expression:"ruleFormValue3.propertyName"}},e._l(e.propertyList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.propertyName,value:e.id}})})),1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:20}},[a("el-form-item",{attrs:{label:"属性值",prop:"propertyValue",rules:{required:!0,message:"请选择",trigger:"change"}}},[a("el-select",{staticClass:"w-100",model:{value:e.ruleFormValue3.propertyValue,callback:function(t){e.$set(e.ruleFormValue3,"propertyValue",t)},expression:"ruleFormValue3.propertyValue"}},e._l(e.propertyValueList,(function(e){return a("el-option",{key:e.index,attrs:{label:e,value:e}})})),1)],1)],1)],1),a("el-row",[a("el-col",{staticClass:"text-right",attrs:{span:20}},[a("el-form-item",{staticClass:"flex-box w-100 no-margin-IE"},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){e.show_PropertyDialog=!1}}},[e._v("关闭")]),e.isHideDeleteButton?e._e():a("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(t){return e.showConfirmDialog(3)}}},[e._v("删除")]),a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.onSubmitProperty("ruleForm3")}}},[e._v("保存")])],1)],1)],1)],1)],1),a("el-dialog",{attrs:{visible:e.show_SaleDialog,width:"30%",modal:""},on:{"update:visible":function(t){e.show_SaleDialog=t}}},[a("el-row",[a("el-col",{staticClass:"margin-bottom-30 text-center",attrs:{span:24}},[a("h1",[e._v("销售")])])],1),a("el-form",{ref:"ruleForm4",attrs:{"label-width":"100px",model:e.ruleFormValue4}},[a("el-row",[a("el-col",{attrs:{span:15}},[a("el-form-item",{attrs:{label:"销售去向",prop:"productSaleDestination",rules:{required:!0,message:"请插入",trigger:"change"}}},[a("el-input",{staticClass:"w-80",model:{value:e.ruleFormValue4.productSaleDestination,callback:function(t){e.$set(e.ruleFormValue4,"productSaleDestination",t)},expression:"ruleFormValue4.productSaleDestination"}})],1)],1),a("el-col",{attrs:{span:5}},[a("el-select",{staticClass:"w-100",on:{change:function(t){return e.onChangeSaleList()}},model:{value:e.ruleFormValue4.selProductSaleDestination,callback:function(t){e.$set(e.ruleFormValue4,"selProductSaleDestination",t)},expression:"ruleFormValue4.selProductSaleDestination"}},e._l(e.saleList,(function(e){return a("el-option",{key:e,attrs:{value:e,label:e}})})),1)],1)],1),a("el-row",[a("el-col",{attrs:{span:20}},[a("el-form-item",{attrs:{label:"日期",prop:"saleDate",rules:{required:!0,message:"请选择",trigger:"change"}}},[a("el-date-picker",{staticClass:"w-100",attrs:{type:"datetime"},model:{value:e.ruleFormValue4.saleDate,callback:function(t){e.$set(e.ruleFormValue4,"saleDate",t)},expression:"ruleFormValue4.saleDate"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:5}},[e._v(" ")]),a("el-col",{staticClass:"margin-bottom-30",attrs:{span:18}},[a("el-button",{staticClass:"margin-bottom-10",attrs:{size:"small",type:"warning",plain:""},on:{click:function(t){return e.chooseFile_Sale()}}},[e._v("选择文件")]),!e.file_live_3&&e.fileName3?a("el-link",{staticClass:"margin-left-10",on:{click:function(t){return e.downloadFile(e.fileName3)}}},[e._v("\n              "+e._s(e.fileName3.replace("/uploads/",""))+"\n            ")]):e._e(),e.file_live_3?a("p",[e._v(e._s(e.file_live_3.name))]):e._e(),e.file_live_3||e.fileName3?e._e():a("p",[e._v("请选择需要上传的文件...")])],1),a("el-col",{attrs:{span:5}},[a("div",{staticClass:"image-box"},[a("input",{ref:"file_live_3",staticClass:"image-upload",staticStyle:{display:"none"},attrs:{type:"file",id:"file3",name:"images"},on:{change:function(t){return e.handleFileUpload_Sale()}}})])])],1),a("el-row",[a("el-col",{staticClass:"text-right",attrs:{span:20}},[a("el-form-item",{staticClass:"flex-box w-100 no-margin-IE"},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){e.show_SaleDialog=!1}}},[e._v("关闭")]),e.isHideDeleteButton?e._e():a("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(t){return e.showConfirmDialog(2)}}},[e._v("删除")]),a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.onSubmitSale("ruleForm4")}}},[e._v("保存")])],1)],1)],1)],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,"row-class-name":e.rowIndex}},[a("el-table-column",{attrs:{formatter:e.order,label:"序号",width:"70"}}),a("el-table-column",{attrs:{prop:"grade",label:"批次名称"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v("\n          "+e._s(e._f("formatDateTime")(a.createTime))+" , \n          "+e._s(e.getVarietyName(a.varietyId))+" , \n          "+e._s(e.getGradeName(a.varietyGrade))+"\n        ")]}}])}),a("el-table-column",{attrs:{prop:"batchNumber",label:"批次号"}}),a("el-table-column",{attrs:{prop:"taskData",label:"作业"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("div",{staticClass:"w-100"},e._l(r.taskData,(function(t){return a("el-link",{key:t.id,staticStyle:{display:"table"},on:{click:function(a){return e.onClickTaskRow(t)}}},[e._v(e._s(e._f("formatDate")(t.taskDate))+" "+e._s(e.getTaskName(t.productTask)))])})),1)]}}])}),a("el-table-column",{attrs:{prop:"saleData",label:"销售"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("div",{staticClass:"w-100"},e._l(r.saleData,(function(t){return a("el-link",{key:t.id,staticStyle:{display:"table"},on:{click:function(a){return e.onClickSaleRow(t)}}},[e._v(e._s(e._f("formatDate")(t.saleDate))+" "+e._s(t.productSaleDestination))])})),1)]}}])}),a("el-table-column",{attrs:{prop:"property",label:"属性名称"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("div",{staticClass:"w-100"},e._l(r.property,(function(t){return a("el-link",{key:t.index,staticStyle:{display:"table"},on:{click:function(a){return e.onClickPropertyRow(t,r)}}},[e._v(e._s(e.getPropertyName(t.propertyName)))])})),1)]}}])}),a("el-table-column",{attrs:{prop:"reportResult",label:"检测报告"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(a.reportResult>-1?e.resultOption[a.reportResult].label:"没有报告"))]}}])}),e.isShowAddButton?a("el-table-column",{attrs:{label:"操作","class-name":"text-center",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[a("el-button",{staticClass:"margin-bottom-10",attrs:{size:"small",plain:"",type:"warning"},on:{click:function(t){return e.$router.push({path:"/productionSubject/mainProduct/productBatch/"+e.productId+"/edit/"+r.id})}}},[e._v("修改")]),a("el-button",{staticClass:"margin-bottom-10",attrs:{size:"small",plain:"",type:"success"},on:{click:function(t){return e.showDialog(r,"show_TaskDialog",!0)}}},[e._v("作业")]),a("el-button",{staticClass:"margin-bottom-10",attrs:{size:"small",plain:"",type:"success",disabled:0==r.taskData.length},on:{click:function(t){return e.showDialog(r,"show_ReportDialog",!0)}}},[e._v("上传检测报告")]),a("el-button",{attrs:{size:"small",plain:"",type:"success"},on:{click:function(t){return e.showDialog(r,"show_PropertyDialog",!0)}}},[e._v("属性")]),a("el-button",{attrs:{size:"small",plain:"",type:"success"},on:{click:function(t){return e.showDialog(r,"show_SaleDialog",!0)}}},[e._v("销售")])]}}],null,!1,3804949057)}):e._e()],1),a("div",{staticClass:"pageBox"},[a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,page:e.page.pageIndex,limit:e.page.pageSize},on:{"update:page":function(t){return e.$set(e.page,"pageIndex",t)},"update:limit":function(t){return e.$set(e.page,"pageSize",t)},pagination:e.getList}})],1)],1)])},i=[],o=(a("28a5"),a("a481"),a("7f7f"),a("ac6a"),a("5df3"),a("4f7f"),a("75fc")),l=(a("7514"),a("96cf"),a("3b8d")),n=a("8ded"),s=a.n(n),c=a("062e"),u=a("0010"),p=a("55a1"),d=a("d1a0"),f=a("bc3a"),m=a.n(f),h={name:"productBatch",components:{Pagination:c["default"]},data:function(){return{fileName1:"",file_live_1:null,image:null,fileName2:"",file_live_2:null,fileName3:"",file_live_3:null,productId:-1,itemId:null,page:{pageIndex:1,pageSize:20},total:0,radio:"1",isShowAddButton:null,tableData:null,confirm_dialogVisible:!1,listLoading:!1,show_TaskDialog:!1,show_ReportDialog:!1,show_PropertyDialog:!1,show_SaleDialog:!1,varietyList:[],selectedBatchId:null,isHideDeleteButton:!1,taskList:[],saleList:[],originPropertyName:null,originPropertyValue:null,downloadUrl:null,batchTaskList:[],batchSaleList:[],propertyList:[],selectedBatchRow:[],propertyValueList:[],companyId:-1,ruleFormValue1:{productTask:null,taskDate:""},ruleFormValue2:{reportDate:"",reportResult:null},ruleFormValue4:{productSaleDestination:"",selProductSaleDestination:"",saleDate:""},ruleFormValue3:{propertyName:"",propertyValue:""},gradeOption:[{gradeId:1,gradeName:"特级"},{gradeId:2,gradeName:"高级"},{gradeId:3,gradeName:"中级"},{gradeId:4,gradeName:"低级"}],resultOption:[{value:0,label:"不合格"},{value:1,label:"合格"}]}},created:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.productId=this.$route.params.id,this.isShowAddButton=!!s.a.get("authList").find((function(e){return"addProductBatch"==e.privilegeCode})),this.downloadUrl=d["b"].DOWNLOAD_URL(),this.companyId=this.$route.query.companyId,this.companyId&&s.a.set("selectedCompanyId",this.companyId),this.getVarietyData(),this.getTaskList(),this.getProductProperty(),this.getList();case 9:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),methods:{getList:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getBatchTaskList();case 2:return e.next=4,this.getBatchSaleList();case 4:this.listLoading=!0,Object(p["a"])().get("/api/product_batch/all",{productId:this.productId,pageNo:this.page.pageIndex-1,pageSize:this.page.pageSize,sortBy:"id"}).then((function(e){var a=e.data;t.total=e.total;var r=function(e){a[e].property&&(a[e].property=JSON.parse(a[e].property));var r=t.batchTaskList.filter((function(t){return t.productBatchId===a[e].id})),i=t.batchSaleList.filter((function(t){return t.productBatchId===a[e].id}));if(r&&(a[e].taskData=r),i){for(var l in a[e].saleData=i,i)t.saleList.push(i[l].productSaleDestination);t.saleList=Object(o["a"])(new Set(t.saleList))}};for(var i in a)r(i);t.tableData=a,setTimeout((function(){t.listLoading=!1}),500)})).catch((function(e){console.error(e)}));case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),getTaskList:function(){var e=this;this.listLoading=!0,Object(p["a"])().get("/api/product_task/all",{productId:this.productId,sortBy:"id"}).then((function(t){e.taskList=t.data})).catch((function(e){console.error(e)}))},getVarietyData:function(){var e=this;Object(p["a"])().get("/api/product_variety/all",{productId:this.productId,sortBy:"id"}).then((function(t){e.varietyList=t.data})).catch((function(e){console.error(e)}))},getBatchTaskList:function(){var e=this;return this.listLoading=!0,Object(p["a"])().get("/api/product_batch_task/all",{productId:this.productId,sortBy:"id"}).then((function(t){e.batchTaskList=t.data})).catch((function(e){console.error(e)}))},getBatchSaleList:function(){var e=this;return this.listLoading=!0,Object(p["a"])().get("/api/product_sale/all",{productId:this.productId,sortBy:"id"}).then((function(t){e.batchSaleList=t.data})).catch((function(e){console.error(e)}))},getProductProperty:function(){var e=this;Object(p["a"])().get("/api/product_property/all",{productId:this.productId,sortBy:"id"}).then((function(t){e.propertyList=t.data})).catch((function(e){console.error(e)}))},rowIndex:function(e){var t=e.row,a=e.rowIndex;t.rowIndex=a},order:function(e){return this.page.pageSize*(this.page.pageIndex-1)+e.rowIndex+1},chooseFile_Live:function(){document.getElementById("file1").click()},chooseFile_Report:function(){document.getElementById("file2").click()},chooseFile_Sale:function(){document.getElementById("file3").click()},handleFileUpload_Live:function(e){this.file_live_1=this.$refs.file_live_1.files[0],this.image=null;var t=new FileReader,a=this;t.onload=function(e){a.image=e.target.result},this.file_live_1?(t.readAsDataURL(this.file_live_1),this.fileName1=this.file_live_1.name):this.fileName1=""},handleFileUpload_Report:function(){this.file_live_2=this.$refs.file_live_2.files[0]},handleFileUpload_Sale:function(){this.file_live_3=this.$refs.file_live_3.files[0]},getVarietyName:function(e){var t=this.varietyList.find((function(t){return t.id===e}));return t?t.varietyName:""},getGradeName:function(e){var t=this.gradeOption.find((function(t){return t.gradeId===e}));return t?t.gradeName:""},showDialog:function(e,t,a){switch(this.ruleFormValue2.reportDate=e.reportTime,this.ruleFormValue2.reportResult=e.reportResult,this.fileName2=e.reportFile,this.formatData(),t){case"show_TaskDialog":this.show_TaskDialog=!0;break;case"show_ReportDialog":this.show_ReportDialog=!0;break;case"show_PropertyDialog":this.show_PropertyDialog=!0;break;case"show_SaleDialog":this.show_SaleDialog=!0;break}this.selectedBatchId=e.id,this.selectedBatchRow=e,this.isHideDeleteButton=a},onSubmitTask:function(e){var t=this;this.$refs[e].validate((function(e){if(e)if(t.isHideDeleteButton){Object(p["a"])().get("/api/tracing/getByBatchNumber/"+t.selectedBatchRow.batchNumber).then((function(e){if(!e){var a=new FormData,r=t.getVarietyName(t.selectedBatchRow.varietyId),i=t.getGradeName(t.selectedBatchRow.varietyGrade);a.append("id",0),a.append("productId",t.productId),a.append("companyId",s.a.get("selectedCompanyId")),a.append("productionTime",t.ruleFormValue1.taskDate),a.append("locationId",0),a.append("charge",""),t.selectedBatchRow.reportTime&&(t.selectedBatchRow.reportTime=new Date(t.selectedBatchRow.reportTime),a.append("reportTime",t.selectedBatchRow.reportTime)),a.append("batchNumber",t.selectedBatchRow.batchNumber),a.append("batchName",r+","+i),a.append("tracingNumber",""),a.append("tracingTimeType",0),a.append("webTimeType",0),a.append("tracingAmount",0),a.append("printStatus",0),a.append("createTime",new Date),a.append("createUserId",Object(u["a"])().user().id),a.append("updateTime",new Date),a.append("updateUserId",0),Object(p["a"])().post("/api/tracing/create",a).then((function(e){console.log(e)})).catch((function(e){console.error(e)}))}})).catch((function(e){console.error(e)})),t.show_TaskDialog=!1;var a=new FormData,r=new Date;t.listLoading=!0,a.append("createTime",r),a.append("companyId",s.a.get("selectedCompanyId")),a.append("file",t.file_live_1),a.append("id",0),a.append("createUserId",Object(u["a"])().user().id),a.append("productId",t.productId),a.append("productBatchId",t.selectedBatchId),a.append("productTask",t.ruleFormValue1.productTask),a.append("taskDate",t.ruleFormValue1.taskDate),a.append("updateTime",r),Object(p["a"])().post("/api/product_batch_task/create",a).then((function(e){t.formatData(),setTimeout((function(){t.listLoading=!1,t.getList()}),500)})).catch((function(e){console.error(e)}))}else{t.show_TaskDialog=!1;var i=new FormData,o=new Date;t.listLoading=!0,i.append("companyId",s.a.get("selectedCompanyId")),t.file_live_1&&i.append("file",t.file_live_1),i.append("id",t.itemId),i.append("productId",t.productId),i.append("productBatchId",t.selectedBatchId),i.append("productTask",t.ruleFormValue1.productTask);var l=t.ruleFormValue1.taskDate;l=new Date(l).toDateString(),i.append("taskDate",l),i.append("updateTime",o),Object(p["a"])().put("/api/product_batch_task/update/"+t.itemId,i).then((function(e){t.formatData(),setTimeout((function(){t.listLoading=!1,t.getList()}),500)})).catch((function(e){console.error(e)}))}}))},onSubmitSale:function(e){var t=this;this.$refs[e].validate((function(e){if(e)if(t.isHideDeleteButton){t.show_SaleDialog=!1;var a=new FormData,r=new Date;t.listLoading=!0,a.append("createTime",r),a.append("companyId",s.a.get("selectedCompanyId")),a.append("file",t.file_live_3),a.append("id",0),a.append("createUserId",Object(u["a"])().user().id),a.append("productId",t.productId),a.append("productBatchId",t.selectedBatchId),a.append("productSaleDestination",t.ruleFormValue4.productSaleDestination),a.append("saleDate",t.ruleFormValue4.saleDate),a.append("updateTime",r),Object(p["a"])().post("/api/product_sale/create",a).then((function(e){t.formatData(),setTimeout((function(){t.listLoading=!1,t.getList()}),500)})).catch((function(e){console.error(e)}))}else{t.show_SaleDialog=!1;var i=new FormData,o=new Date;t.listLoading=!0,i.append("companyId",s.a.get("selectedCompanyId")),t.file_live_3&&i.append("file",t.file_live_3),i.append("id",t.itemId),i.append("productId",t.productId),i.append("productBatchId",t.selectedBatchId),i.append("productSaleDestination",t.ruleFormValue4.productSaleDestination);var l=t.ruleFormValue4.saleDate;l=new Date(l).toDateString(),i.append("saleDate",l),i.append("updateTime",o),Object(p["a"])().put("/api/product_sale/update/"+t.itemId,i).then((function(e){t.formatData(),setTimeout((function(){t.listLoading=!1,t.getList()}),500)})).catch((function(e){console.error(e)}))}}))},onSubmitReport:function(e){var t=this;this.$refs[e].validate((function(e){if(e){t.show_ReportDialog=!1,t.listLoading=!0;var a=new Date(t.ruleFormValue2.reportDate),r=new FormData,i=new Date;r.append("batchNumber",t.selectedBatchRow.batchNumber),r.append("createTime",t.selectedBatchRow.createTime),r.append("companyId",s.a.get("selectedCompanyId")),r.append("id",t.selectedBatchId),r.append("createUserId",t.selectedBatchRow.createUserId),r.append("productId",t.productId),r.append("property",JSON.stringify(t.selectedBatchRow.property)),r.append("varietyGrade",t.selectedBatchRow.varietyGrade),r.append("varietyId",t.selectedBatchRow.varietyId),r.append("updateTime",i),r.append("updateUserId",Object(u["a"])().user().id),t.file_live_2&&r.append("file",t.file_live_2),r.append("reportResult",t.ruleFormValue2.reportResult),r.append("reportTime",a),Object(p["a"])().put("/api/product_batch/update/"+t.selectedBatchId,r).then((function(e){t.getList()})).catch((function(e){console.error(e)}))}}))},onSubmitProperty:function(e){var t=this;this.$refs[e].validate((function(e){if(e){if(t.show_PropertyDialog=!1,t.listLoading=!0,t.selectedBatchRow.property){var a=t.selectedBatchRow.property.find((function(e){return e.propertyName===t.ruleFormValue3.propertyName&&e.propertyValue===t.ruleFormValue3.propertyValue})),r=t.selectedBatchRow.property.indexOf(a);r>-1&&t.selectedBatchRow.property.splice(r,1)}var i=new FormData,o=new Date;if(t.isHideDeleteButton){var l=[];t.selectedBatchRow.property&&(l=t.selectedBatchRow.property),l.push({propertyName:t.ruleFormValue3.propertyName,propertyValue:t.ruleFormValue3.propertyValue}),i.append("property",JSON.stringify(l))}else{var n=t.selectedBatchRow.property.find((function(e){return e.propertyName===t.originPropertyName&&e.propertyValue===t.originPropertyValue})),c=t.selectedBatchRow.property.indexOf(n);t.selectedBatchRow.property[c].propertyName=t.ruleFormValue3.propertyName,t.selectedBatchRow.property[c].propertyValue=t.ruleFormValue3.propertyValue,n=t.selectedBatchRow.property,i.append("property",JSON.stringify(n))}if(i.append("batchNumber",t.selectedBatchRow.batchNumber),i.append("createTime",t.selectedBatchRow.createTime),i.append("companyId",s.a.get("selectedCompanyId")),i.append("id",t.selectedBatchId),i.append("createUserId",t.selectedBatchRow.createUserId),i.append("productId",t.productId),i.append("varietyGrade",t.selectedBatchRow.varietyGrade),i.append("varietyId",t.selectedBatchRow.varietyId),i.append("updateTime",o),i.append("updateUserId",Object(u["a"])().user().id),t.selectedBatchRow.reportResult>-1&&i.append("reportResult",t.selectedBatchRow.reportResult),t.selectedBatchRow.reportTime){var d=new Date(t.selectedBatchRow.reportTime);i.append("reportTime",d)}Object(p["a"])().put("/api/product_batch/update/"+t.selectedBatchId,i).then((function(e){t.getList()})).catch((function(e){console.error(e)}))}}))},getTaskName:function(e){var t=this.taskList.find((function(t){return t.id===e}));return t?t.taskName:""},getPropertyName:function(e){var t=this.propertyList.find((function(t){return t.id===e}));return t?t.propertyName:""},downloadFile:function(e){var t=this;m()({url:d["b"].DOWNLOAD_URL()+e,method:"GET",responseType:"blob"}).then((function(a){if(t.isIE()){var r=new Blob([a.data],{type:"application/octet-stream"});if(window.navigator&&window.navigator.msSaveOrOpenBlob)return void window.navigator.msSaveOrOpenBlob(r,e.replace("/uploads/",""))}else{var i=window.URL.createObjectURL(new Blob([a.data])),o=document.createElement("a");o.href=i,o.setAttribute("download",e.replace("/uploads/","")),document.body.appendChild(o),o.click(),o.remove()}}))},isIE:function(){var e=navigator.userAgent;return e.indexOf("MSIE ")>-1||e.indexOf("Trident/")>-1},formatData:function(){this.ruleFormValue1.taskDate="",this.ruleFormValue1.productTask=null,this.file_live_1=null,this.fileName1="",this.ruleFormValue4.saleDate="",this.ruleFormValue4.productSaleDestination="",this.file_live_3=null,this.fileName3="",this.file_live_2=null,this.ruleFormValue3.propertyName=null,this.ruleFormValue3.propertyValue=null},onClickTaskRow:function(e){this.isHideDeleteButton=!1,this.itemId=e.id,this.selectedBatchId=e.productBatchId,this.ruleFormValue1.productTask=e.productTask,this.ruleFormValue1.taskDate=e.taskDate,this.fileName1=e.productTaskFile,this.show_TaskDialog=!0},onClickSaleRow:function(e){this.isHideDeleteButton=!1,this.itemId=e.id,this.selectedBatchId=e.productBatchId,this.ruleFormValue4.productSaleDestination=e.productSaleDestination,this.ruleFormValue4.saleDate=e.saleDate,this.fileName3=e.productSaleFile,this.show_SaleDialog=!0},onClickPropertyRow:function(e,t){this.isHideDeleteButton=!1,this.itemId=e.productName,this.selectedBatchRow=t,this.selectedBatchId=t.id,this.ruleFormValue3.propertyName=e.propertyName,this.ruleFormValue3.propertyValue=e.propertyValue,this.makePropertyValueList(),this.originPropertyName=e.propertyName,this.originPropertyValue=e.propertyValue,this.show_PropertyDialog=!0},deleteSelectedTask:function(){var e=this;this.show_TaskDialog=!1,this.listLoading=!0,Object(p["a"])().delete("/api/product_batch_task/delete/"+this.itemId).then((function(t){e.formatData(),setTimeout((function(){e.listLoading=!1,e.getList()}),500)})).catch((function(e){console.error(e)}))},deleteSelectedSale:function(){var e=this;this.show_SaleDialog=!1,this.listLoading=!0,Object(p["a"])().delete("/api/product_sale/delete/"+this.itemId).then((function(t){e.formatData(),setTimeout((function(){e.listLoading=!1,e.getList()}),500)})).catch((function(e){console.error(e)}))},deleteSelectedProperty:function(){var e=this;this.show_PropertyDialog=!1,this.listLoading=!0;var t=this.selectedBatchRow.property.find((function(t){return t.propertyName===e.originPropertyName&&t.propertyValue===e.originPropertyValue})),a=this.selectedBatchRow.property.indexOf(t);a>-1&&this.selectedBatchRow.property.splice(a,1);var r=new FormData,i=new Date;if(t=this.selectedBatchRow.property,r.append("property",JSON.stringify(t)),r.append("batchNumber",this.selectedBatchRow.batchNumber),r.append("createTime",this.selectedBatchRow.createTime),r.append("companyId",s.a.get("selectedCompanyId")),r.append("id",this.selectedBatchId),r.append("createUserId",this.selectedBatchRow.createUserId),r.append("productId",this.productId),r.append("varietyGrade",this.selectedBatchRow.varietyGrade),r.append("varietyId",this.selectedBatchRow.varietyId),r.append("updateTime",i),r.append("updateUserId",Object(u["a"])().user().id),this.selectedBatchRow.reportTime){var o=new Date(this.selectedBatchRow.reportTime);r.append("reportTime",o)}this.selectedBatchRow.reportResult>-1&&r.append("reportResult",this.selectedBatchRow.reportResult),Object(p["a"])().put("/api/product_batch/update/"+this.selectedBatchId,r).then((function(t){e.getList()})).catch((function(e){console.error(e)}))},onChangeSaleList:function(){this.ruleFormValue4.productSaleDestination=this.ruleFormValue4.selProductSaleDestination},makePropertyValueList:function(){var e=this,t=this.propertyList.find((function(t){return t.id===e.ruleFormValue3.propertyName})),a=t.propertyOptions;this.propertyValueList=a.split(","),this.propertyValueList=Object(o["a"])(new Set(this.propertyValueList))},showConfirmDialog:function(e){this.confirm_dialogVisible=!0,this.category=e},deleteSelectedRow:function(){switch(this.confirm_dialogVisible=!1,this.category){case 1:this.deleteSelectedTask();break;case 2:this.deleteSelectedSale();break;case 3:this.deleteSelectedProperty();break}}}},g=h,v=(a("9db0"),a("2877")),_=Object(v["a"])(g,r,i,!1,null,"3d04ec7b",null);t["default"]=_.exports},e0b8:function(e,t,a){"use strict";var r=a("7726"),i=a("5ca1"),o=a("2aba"),l=a("dcbc"),n=a("67ab"),s=a("4a59"),c=a("f605"),u=a("d3f4"),p=a("79e5"),d=a("5cc5"),f=a("7f20"),m=a("5dbc");e.exports=function(e,t,a,h,g,v){var _=r[e],y=_,b=g?"set":"add",w=y&&y.prototype,D={},k=function(e){var t=w[e];o(w,e,"delete"==e?function(e){return!(v&&!u(e))&&t.call(this,0===e?0:e)}:"has"==e?function(e){return!(v&&!u(e))&&t.call(this,0===e?0:e)}:"get"==e?function(e){return v&&!u(e)?void 0:t.call(this,0===e?0:e)}:"add"==e?function(e){return t.call(this,0===e?0:e),this}:function(e,a){return t.call(this,0===e?0:e,a),this})};if("function"==typeof y&&(v||w.forEach&&!p((function(){(new y).entries().next()})))){var I=new y,B=I[b](v?{}:-0,1)!=I,F=p((function(){I.has(1)})),S=d((function(e){new y(e)})),V=!v&&p((function(){var e=new y,t=5;while(t--)e[b](t,t);return!e.has(-0)}));S||(y=t((function(t,a){c(t,y,e);var r=m(new _,t,y);return void 0!=a&&s(a,g,r[b],r),r})),y.prototype=w,w.constructor=y),(F||V)&&(k("delete"),k("has"),g&&k("get")),(V||B)&&k(b),v&&w.clear&&delete w.clear}else y=h.getConstructor(t,e,g,b),l(y.prototype,a),n.NEED=!0;return f(y,e),D[e]=y,i(i.G+i.W+i.F*(y!=_),D),v||h.setStrong(y,e,g),y}},f410:function(e,t,a){a("1af6"),e.exports=a("584a").Array.isArray}}]);
//# sourceMappingURL=chunk-9fe46624.7bb93a51.js.map