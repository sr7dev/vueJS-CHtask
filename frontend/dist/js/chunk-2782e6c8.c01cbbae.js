(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2782e6c8"],{"2e12":function(t,e,a){"use strict";var n=a("7417"),o=a.n(n);o.a},"5b5d":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{staticClass:"actived"},[t._v("投入品管理")])],1)],1),a("div",{staticClass:"box"},[a("div",{staticClass:"iptBox"},[a("div",{staticClass:"tab-header inline-block-IE",class:{active:t.mode},attrs:{type:""},on:{click:t.clickTabLeft}},[t._v("使用信息")]),a("div",{staticClass:"tab-header inline-block-IE",class:{active:!t.mode},attrs:{type:""},on:{click:t.clickTabRight}},[t._v("采购信息")])]),a("div",{staticClass:"iptBox"},[t.mode?a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.$router.push({path:"/inputManagement/addUse"})}}},[t._v("添加")]):a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.$router.push({path:"/inputManagement/addPurchase"})}}},[t._v("添加")])],1),a("el-table",{directives:[{name:"show",rawName:"v-show",value:t.mode,expression:"mode"},{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.tableData,"row-class-name":t.rowIndex}},[a("el-table-column",{attrs:{formatter:t.order,label:"序号",width:"100px"}}),a("el-table-column",{attrs:{prop:"companyId",label:"企业名称"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(t.filterCompnay(a.companyId)))]}}])}),a("el-table-column",{attrs:{prop:"sampleName",label:"样品名称"}}),a("el-table-column",{attrs:{prop:"amount",label:"使用数量(公斤)"}}),a("el-table-column",{attrs:{prop:"operations",label:"操作","class-name":"text-center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(e){return t.$router.push({path:"/inputManagement/view/"+n.id,query:{mode:t.mode}})}}},[t._v("查看")])]}}])})],1),a("el-table",{directives:[{name:"show",rawName:"v-show",value:!t.mode,expression:"!mode"},{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,"row-class-name":t.rowIndex}},[a("el-table-column",{attrs:{formatter:t.order,label:"序号"}}),a("el-table-column",{attrs:{prop:"companyId",label:"企业名称"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[t._v(t._s(t.filterCompnay(a.companyId)))]}}])}),a("el-table-column",{attrs:{prop:"sampleName",label:"样品名称"}}),a("el-table-column",{attrs:{prop:"amount",label:"采购数量(公斤)"}}),a("el-table-column",{attrs:{label:"操作","class-name":"text-center"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(e){return t.$router.push({path:"/inputManagement/view/"+n.id,query:{mode:t.mode}})}}},[t._v("查看")])]}}])})],1),a("div",{staticClass:"pageBox"},[a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total > 0"}],attrs:{total:t.total,page:t.page.pageIndex,limit:t.page.pageSize},on:{"update:page":function(e){return t.$set(t.page,"pageIndex",e)},"update:limit":function(e){return t.$set(t.page,"pageSize",e)},pagination:t.getList}})],1)],1)])},o=[],i=(a("7514"),a("55a1")),s=a("062e"),l={name:"sampleCheck",components:{Pagination:s["default"]},data:function(){return{page:{pageIndex:1,pageSize:20},total:0,tableData:[],companyProduction:[{id:-1,name:"全部"}],mode:!0,listLoading:!0}},created:function(){this.getList(),this.getCompanyProduction()},methods:{clickTabLeft:function(){this.mode=!0,this.getList(),this.getCompanyProduction()},clickTabRight:function(){this.mode=!1,this.getList(),this.getCompanyProduction()},getList:function(){var t=this;this.mode?(this.listLoading=!0,Object(i["a"])().get("/api/inputsUse/all",{pageNo:this.page.pageIndex-1,pageSize:this.page.pageSize,sortBy:"id"}).then((function(e){t.tableData=e.data,t.total=e.total,setTimeout((function(){t.listLoading=!1}),500)})).catch((function(t){console.log(t)}))):(this.listLoading=!0,Object(i["a"])().get("/api/inputsPurchase/all",{pageNo:this.page.pageIndex-1,pageSize:this.page.pageSize,sortBy:"id"}).then((function(e){t.tableData=e.data,t.total=e.total,setTimeout((function(){t.listLoading=!1}),500)})).catch((function(t){console.log(t)})))},getCompanyProduction:function(){var t=this;Object(i["a"])().get("/api/company_production/name").then((function(e){t.companyProduction=e})).catch((function(t){console.log(t)}))},filterCompnay:function(t){var e=this.companyProduction.find((function(e){return e.companyId===t}));return e?e.companyName:""},rowIndex:function(t){var e=t.row,a=t.rowIndex;e.rowIndex=a},order:function(t){return this.page.pageSize*(this.page.pageIndex-1)+t.rowIndex+1}}},r=l,c=(a("2e12"),a("2877")),p=Object(c["a"])(r,n,o,!1,null,"32181162",null);e["default"]=p.exports},7417:function(t,e,a){}}]);
//# sourceMappingURL=chunk-2782e6c8.c01cbbae.js.map