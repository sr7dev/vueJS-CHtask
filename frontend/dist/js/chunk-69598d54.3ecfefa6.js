(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69598d54"],{3307:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[t._v("专项：绿色优质农产品生产基地")])],1)],1),a("div",{staticClass:"box"},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}]},[a("div",{staticClass:"row year-select-panel"},[a("el-form-item",{attrs:{label:"年度"}},[a("el-select",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{disabled:!(t.options.length>0)},on:{change:function(e){return t.getYear()}},model:{value:t.year,callback:function(e){t.year=e},expression:"year"}},t._l(t.options,(function(t){return a("el-option",{key:t.value,attrs:{label:t.value,value:t.value}})})),1)],1)],1),a("div",{staticClass:"cate-content-panel"},[a("div",{staticClass:"cate-item-panel inline-block-IE"},[a("el-form-item",{attrs:{label:"巡查"}},[t._v("("+t._s(t.tableData.length)+")")]),a("el-container",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,"row-class-name":t.rowIndex,"highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"createTime",label:"日期"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(t._f("formatDate")(a.createTime)))]}}])}),a("el-table-column",{attrs:{prop:"township",label:"乡镇"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v("\n                  "+t._s(t.filterTownship(a.townId))+"\n                ")]}}])}),a("el-table-column",{attrs:{prop:"inspector",label:"检查人"}}),a("el-table-column",{attrs:{prop:"unitinspec",label:"检查单位"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v("\n                  "+t._s(t.getCompanyName(a.companyId))+"\n                ")]}}])})],1)],1)],1),a("div",{staticClass:"cate-item-panel inline-block-IE"},[a("el-form-item",{attrs:{label:"检测"}},[t._v("("+t._s(t.detectTableData.length)+")")]),a("el-container",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.detectTableData,"row-class-name":t.rowIndex,"highlight-current-row":""}},[a("el-table-column",{attrs:{label:"日期"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(t._f("formatDate")(a.detectTime)))]}}])}),a("el-table-column",{attrs:{label:"项目"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.item))]}}])}),a("el-table-column",{attrs:{label:"样品"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.sample))]}}])}),a("el-table-column",{attrs:{label:"结果"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(a.resultDxDesc))]}}])})],1)],1)],1),a("div",{staticClass:"cate-item-panel inline-block-IE"},[a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("el-form-item",{staticClass:"margin-bottom-reverse-40",attrs:{label:"培训记录"}}),a("div",{staticClass:"inline-block-IE align-right-IE"},[t.isShowAddButton?t._e():a("el-button",{staticClass:"margin-bottom-22",attrs:{size:"small",type:"danger",plain:"",disabled:!(t.trainTableData.length>0)},on:{click:function(e){return t.updateSelectedRows()}}},[t._v("删除")]),t.trainTableData.length>0&&!t.isShowAddButton?a("el-checkbox",{staticStyle:{"margin-top":"10px","margin-left":"20px"},attrs:{"true-label":"1","false-label":"0"},on:{change:t.showCheckbox},model:{value:t.isShowCheckbox,callback:function(e){t.isShowCheckbox=e},expression:"isShowCheckbox"}}):t._e()],1),t.isShowAddButton?a("el-button",{staticClass:"inline-block-IE float-right-IE",staticStyle:{height:"40px"},attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.$router.push({path:"/trainingFunds"})}}},[t._v("添加附件")]):t._e()],1),a("el-container",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.trainTableData,"row-class-name":t.rowIndex,"highlight-current-row":""}},[0!=t.isShowCheckbox?a("el-table-column",{attrs:{label:"",width:"35"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("el-checkbox",{staticStyle:{"margin-left":"auto"},attrs:{"true-label":"1","false-label":"0"},on:{change:function(e){return t.changeCheckStatus(i.id)}},model:{value:t.checked[i.id],callback:function(e){t.$set(t.checked,i.id,e)},expression:"checked[row.id]"}})]}}],null,!1,574067976)}):t._e(),a("el-table-column",{attrs:{label:"日期"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(t._f("formatDate")(a.createTime)))]}}])}),a("el-table-column",{attrs:{label:"乡镇"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v("\n                  "+t._s(t.getTownName(a.companyId))+"\n                ")]}}])}),a("el-table-column",{attrs:{label:"文件"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[a("el-button",{attrs:{size:"small",type:"success",plain:"",disabled:!i.trainingFundsProfiles},on:{click:function(e){return t.downloadFile(i.trainingFundsProfiles)}}},[t._v("下载附件")])]}}])})],1)],1)],1)])])],1)])},n=[],o=(a("a481"),a("7f7f"),a("7514"),a("55a1")),l=a("d1a0"),s=a("bc3a"),c=a.n(s),r=a("8ded"),d=a.n(r),u=(a("0010"),{name:"specialCategory",data:function(){return{loggedinUserType:null,total:0,trainTotal:0,detectTotal:0,tableData:[],trainTableData:[],detectTableData:[],listLoading:!0,companyList:[],companyId:-1,companyName:"",township:[{id:-1,name:"全部"}],townName:"",year:"全部",supervisionRecordTimeFrom:"",supervisionRecordTimeTo:"",detectTimeFrom:"",detectTimeTo:"",createTimeFrom:"",createTimeTo:"",specialFlag:-1,options:[{value:"全部"},{value:"2018"},{value:"2019"},{value:"2020"},{value:"2021"},{value:"2022"},{value:"2023"}],isShowCheckbox:0,selectedRows:[],checked:[],isShowAddButton:null}},created:function(){this.companyId=-1,this.specialFlag=1,this.supervisionRecordTimeFrom="",this.supervisionRecordTimeTo="",this.detectTimeFrom="",this.detectTimeTo="",this.getList(),this.getDetectList(),this.getTrainList(),this.getTown(),this.isShowAddButton=!!d.a.get("authList").find((function(t){return"addTrainingFunds"==t.privilegeCode}))},methods:{getList:function(){var t=this;this.listLoading=!0,Object(o["a"])().get("/api/supervision_record/all",{companyId:this.companyId,specialFlag:this.specialFlag,supervisionRecordTimeFrom:this.supervisionRecordTimeFrom,supervisionRecordTimeTo:this.supervisionRecordTimeTo,sortBy:"id"}).then((function(e){t.tableData=e.data,t.total=e.total,setTimeout((function(){t.listLoading=!1}),500)})).catch((function(t){console.log(t)}))},getDetectList:function(){var t=this;this.listLoading=!0,Object(o["a"])().get("/api/disability_check/all",{detectUnit:-1,item:-1,sample:-1,specialFlag:this.specialFlag,detectTimeFrom:this.detectTimeFrom,detectTimeTo:this.detectTimeTo,sortBy:"id"}).then((function(e){t.detectTableData=e.data,t.detectTotal=e.total,setTimeout((function(){t.listLoading=!1}),500)})).catch((function(t){console.log(t)}))},getTrainList:function(){var t=this;Object(o["a"])().get("/api/training_funds/all",{specialFlag:this.specialFlag,createTimeFrom:this.createTimeFrom,createTimeTo:this.createTimeTo,sortBy:"id"}).then((function(e){t.trainTableData=e.data,t.trainTotal=e.total})).catch((function(t){console.log(t)}))},getYear:function(){"全部"!==this.year&&(this.supervisionRecordTimeFrom=this.year+"-01-01 00:00:00",this.supervisionRecordTimeTo=this.year+"-12-31 00:00:00",this.detectTimeFrom=this.year+"-01-01 00:00:00",this.detectTimeTo=this.year+"-12-31 00:00:00",this.createTimeFrom=this.year+"-01-01 00:00:00",this.createTimeTo=this.year+"-12-31 00:00:00"),this.tableData=[],this.detectTableData=[],this.total=[],this.detectTotal=[],this.getList(),this.getDetectList()},getTown:function(){var t=this;Object(o["a"])().get("/api/town/all").then((function(e){t.township=t.township.concat(e)})).catch((function(t){console.log(t)}))},getCompanyName:function(t){var e=this;return Object(o["a"])().get("/api/company_production/name",{companyId:t}).then((function(t){e.companyName=t[0].companyName})).catch((function(t){console.log(t)})),this.companyName},getTownName:function(t){var e=this;return Object(o["a"])().get("/api/company_production/name",{companyId:t}).then((function(t){e.townName=e.filterTownship(t[0].townId)})).catch((function(t){console.log(t)})),this.townName},filterTownship:function(t){var e=this.township.find((function(e){return e.id===t}));return e?e.name:""},filterCompanyName:function(t){var e=this.township.find((function(e){return e.id===t}));return e?e.companyName:""},rowIndex:function(t){var e=t.row,a=t.rowIndex;e.rowIndex=a},downloadFile:function(t){var e=this;c()({url:l["b"].DOWNLOAD_URL()+t,method:"GET",responseType:"blob"}).then((function(a){if(e.isIE()){var i=new Blob([a.data],{type:"application/octet-stream"});if(window.navigator&&window.navigator.msSaveOrOpenBlob)return void window.navigator.msSaveOrOpenBlob(i,t.replace("/uploads/",""))}else{var n=window.URL.createObjectURL(new Blob([a.data])),o=document.createElement("a");o.href=n,o.setAttribute("download",t.replace("/uploads/","")),document.body.appendChild(o),o.click(),o.remove()}}))},isIE:function(){var t=navigator.userAgent;return t.indexOf("MSIE ")>-1||t.indexOf("Trident/")>-1},changeCheckStatus:function(t){var e=this.selectedRows.indexOf(t);e>-1&&this.selectedRows.splice(e,1),this.checked[t]&&this.selectedRows.push(t)},updateSelectedRows:function(){var t=this;this.$confirm("确认删除该记录吗?","提示",{type:"warning"}).then((function(){for(var e in t.listLoading=!0,t.selectedRows){var a=0;Object(o["a"])().put("/api/training_funds/update_special_flag/"+t.selectedRows[e]+"/"+a).then((function(e){t.selectedRows=[],t.checked=[],t.isShowCheckbox=0,t.getTrainList(),setTimeout((function(){t.listLoading=!1}),500)})).catch((function(t){console.log(t)}))}}))},showCheckbox:function(){1==this.isShowCheckbox&&(this.selectedRows=[],this.checked=[])}}}),h=u,m=(a("cd02"),a("2877")),p=Object(m["a"])(h,i,n,!1,null,null,null);e["default"]=p.exports},cd02:function(t,e,a){"use strict";var i=a("f05b"),n=a.n(i);n.a},f05b:function(t,e,a){}}]);
//# sourceMappingURL=chunk-69598d54.3ecfefa6.js.map