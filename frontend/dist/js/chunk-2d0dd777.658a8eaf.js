(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0dd777"],{8207:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[t._v("种子管理")]),a("el-breadcrumb-item",{staticClass:"actived"},[t._v("查看详情")])],1)],1),a("div",{staticClass:"box"},[a("div",{staticClass:"iptBox",staticStyle:{"align-items":"center"}},[a("div",{staticClass:"header-left inline-block-IE"},[a("el-button",{staticClass:"margin-left-20",attrs:{size:"small",type:"primary",plain:"",disabled:!0}},[a("div",{staticStyle:{display:"flex"}},[t.villageId>0?a("span",[t._v(t._s(t.filterVillage(t.villageId)))]):t._e(),t.townId>0?a("span",[t._v(t._s(t.filterTown(t.townId)))]):t._e(),t.cityId>0?a("span",[t._v(t._s(t.filterCity(t.cityId)))]):t._e()])]),a("el-button",{staticClass:"margin-left-20",attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返回")])],1),a("div",{staticClass:"inline-block-IE float-right-IE",staticStyle:{"margin-left":"auto",width:"70%"}},[a("el-row",{staticClass:"margin-bottom-10"},[a("el-col",{attrs:{span:1}},[t._v("合计：")]),a("el-col",{attrs:{span:5}},[t._v("补贴面积(亩)："+t._s(t.sum1))]),a("el-col",{attrs:{span:5}},[t._v("种子应收金额(元)："+t._s(t.sum2))]),a("el-col",{attrs:{span:5}},[t._v("农户自负金额(元)："+t._s(t.sum3))])],1),a("el-row",[a("el-col",{attrs:{span:1}},[t._v(" ")]),a("el-col",{attrs:{span:5}},[t._v("供种数量(公斤)："+t._s(t.sum4))]),a("el-col",{attrs:{span:5}},[t._v("种子补贴金额(元)："+t._s(t.sum5))])],1)],1)]),a("el-container",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,"row-class-name":t.rowIndex,"highlight-current-row":""}},[a("el-table-column",{attrs:{formatter:t.order,label:"序号"}}),a("el-table-column",{attrs:{prop:"field1",label:"户名"}}),a("el-table-column",{attrs:{prop:"field2",label:"品种名称"}}),a("el-table-column",{attrs:{prop:"field3",label:"补贴面积 (亩)"}}),a("el-table-column",{attrs:{prop:"field4",label:"供种面积 （亩）"}}),a("el-table-column",{attrs:{prop:"field5",label:"中标价格 （元/公斤）"}}),a("el-table-column",{attrs:{prop:"field6",label:"种子应收金额 （元）"}}),a("el-table-column",{attrs:{prop:"field7",label:"种子补贴金额 （元）"}}),a("el-table-column",{attrs:{prop:"field8",label:"农户自负金额 （元）"}})],1)],1),a("div",{staticClass:"pageBox"},[a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total > 0"}],attrs:{total:t.total,page:t.page.pageIndex,limit:t.page.pageSize},on:{"update:page":function(e){return t.$set(t.page,"pageIndex",e)},"update:limit":function(e){return t.$set(t.page,"pageSize",e)},pagination:t.getData}})],1)],1)])},l=[],n=(a("7f7f"),a("7514"),a("062e")),s=a("55a1"),o={name:"detailSeed",components:{Pagination:n["default"]},data:function(){return{page:{pageIndex:1,pageSize:20},cityList:[],villageList:[],townList:[{id:-1,name:"全部"}],total:0,tableData:[],listLoading:!1,companyProduction:null,id:-1,townId:-1,cityId:null,villageId:null,sum1:0,sum2:0,sum3:0,sum4:0,sum5:0}},created:function(){this.id=this.$route.params.id,this.villageId=this.$route.query.villageId,this.cityId=this.$route.query.cityId,this.townId=this.$route.query.townId,this.getData(),this.getCity(),this.getVillage(),this.getTown()},methods:{getData:function(){var t=this;this.listLoading=!0,Object(s["a"])().get("/api/seed/profile/"+this.id).then((function(e){for(var a in t.tableData=e.data,t.total=e.total,e.data)t.sum1=t.sum1+parseFloat(e.data[a].field3),t.sum2=t.sum2+parseInt(e.data[a].field6),t.sum3=t.sum3+parseInt(e.data[a].field8),t.sum4=t.sum4+parseInt(e.data[a].field4),t.sum5=t.sum5+parseInt(e.data[a].field7);setTimeout((function(){t.listLoading=!1}),500)})).catch((function(t){console.log(t)}))},getCity:function(){var t=this;Object(s["a"])().get("/api/city/all").then((function(e){t.cityList=e})).catch((function(t){console.log(t)}))},getVillage:function(){var t=this;Object(s["a"])().get("/api/village/all").then((function(e){t.villageList=e})).catch((function(t){console.log(t)}))},getTown:function(){var t=this;Object(s["a"])().get("/api/town/all").then((function(e){t.townList=e})).catch((function(t){console.log(t)}))},rowIndex:function(t){var e=t.row,a=t.rowIndex;e.rowIndex=a},order:function(t){return this.page.pageSize*(this.page.pageIndex-1)+t.rowIndex+1},filterVillage:function(t){var e=this.villageList.find((function(e){return e.id===t}));return e?e.name:""},filterTown:function(t){var e=this.townList.find((function(e){return e.id===t}));return e?e.name:""},filterCity:function(t){var e=this.cityList.find((function(e){return e.id===t}));return e?e.name:""}}},r=o,c=a("2877"),d=Object(c["a"])(r,i,l,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d0dd777.658a8eaf.js.map