(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9df5"],{3596:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{staticClass:"title"},[a("el-breadcrumb",{attrs:{separator:"/"}},[e.isEnterprise>-1?a("el-breadcrumb-item",[e._v("内部资料")]):a("el-breadcrumb-item",[e._v("共享文件")]),a("el-breadcrumb-item",{staticClass:"actived"},[e._v("会议文件")])],1)],1),a("div",{staticClass:"box"},[a("div",{staticClass:"iptBox"},[a("el-row",{staticClass:"w-100"},[a("el-col",{attrs:{span:3}},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){e.openDialog=!0}}},[e._v("上传文件")]),a("el-button",{attrs:{size:"small",type:"warning",plain:""},on:{click:function(t){return e.$router.go(-1)}}},[e._v("返回")])],1),a("el-col",{staticClass:"margin-left-20 flex-center",attrs:{span:5}},[a("div",{staticClass:"inline-block-IE"},[e._v("搜索")]),a("el-input",{staticClass:"w-80 margin-left-10",model:{value:e.uploadCompany,callback:function(t){e.uploadCompany=t},expression:"uploadCompany"}})],1),a("el-col",{attrs:{span:2}},[a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.getList()}}},[e._v("搜索")])],1)],1)],1),a("el-dialog",{attrs:{visible:e.dialogVisible,width:"30%",modal:""},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("span",[a("i",{staticClass:"el-icon-warning"},[e._v(" 你确定你要删除?")])]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")]),a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:e.handleDelete}},[e._v("确认")])],1)]),a("el-dialog",{attrs:{visible:e.openDialog,width:"60%"},on:{"update:visible":function(t){e.openDialog=t}}},[a("el-row",[a("el-col",{staticClass:"margin-bottom-30 margin-left-30",attrs:{span:3}},[e._v("文件上传")])],1),a("el-form",{ref:"ruleForm",attrs:{model:e.ruleFormValue,"label-width":"100px"}},[a("el-row",[a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"上传单位",prop:"uploadCompany"}},[a("el-input",{model:{value:e.ruleFormValue.uploadCompany,callback:function(t){e.$set(e.ruleFormValue,"uploadCompany",t)},expression:"ruleFormValue.uploadCompany"}})],1)],1),a("el-col",{attrs:{span:7}},[a("el-form-item",{attrs:{label:"上传者",prop:"uploadPerson"}},[a("el-input",{model:{value:e.ruleFormValue.uploadPerson,callback:function(t){e.$set(e.ruleFormValue,"uploadPerson",t)},expression:"ruleFormValue.uploadPerson"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:15}},[a("div",{staticClass:"item margin-left-30",staticStyle:{display:"flex"}},[a("div",{staticClass:"item-label",staticStyle:{"margin-bottom":"20px"}},[a("input",{ref:"file",staticStyle:{display:"none"},attrs:{type:"file",id:"file"},on:{change:function(t){return e.handleFileUpload()}}}),a("el-button",{attrs:{size:"small",type:"warning",plain:""},on:{click:function(t){return e.chooseFile()}}},[e._v("添加附件")])],1),a("div",{staticClass:"item-value",staticStyle:{"margin-left":"10px",display:"flex","align-items":"center","padding-bottom":"20px"}},[e.file?a("span",[e._v(e._s(e.file.name))]):a("span",[e._v("请选择需要上传的文件...")])])])])],1),a("el-form-item",{staticClass:"left-margin"},[a("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(t){return e.onSubmit("ruleForm")}}},[e._v("添加")]),a("el-button",{attrs:{size:"small",type:"warning",plain:""},on:{click:function(t){e.openDialog=!1}}},[e._v("取消")])],1)],1)],1),a("el-container",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,"row-class-name":e.rowIndex,"highlight-current-row":""}},[a("el-table-column",{attrs:{formatter:e.order,label:"序号",width:"100"}}),a("el-table-column",{attrs:{prop:"uploadProfile",label:"文件名","class-name":"text-center"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(e.getFileName(a.uploadProfile)))]}}])}),a("el-table-column",{attrs:{prop:"createTime",label:"修改时间"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[e._v(e._s(e._f("formatDate")(a.createTime)))]}}])}),a("el-table-column",{attrs:{prop:"uploadCompany",label:"上传单位"}}),a("el-table-column",{attrs:{label:"操作","class-name":"text-center"},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.row;return[a("el-button",{attrs:{size:"small",type:"success",plain:""},on:{click:function(t){return e.downloadFile(l.uploadProfile)}}},[e._v("下载")]),a("el-button",{attrs:{size:"small",type:"danger",plain:""},on:{click:function(t){return e.confirmDelete(l.id)}}},[e._v("删除")])]}}])})],1)],1),a("div",{staticClass:"pageBox"},[a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,page:e.page.pageIndex,limit:e.page.pageSize},on:{"update:page":function(t){return e.$set(e.page,"pageIndex",t)},"update:limit":function(t){return e.$set(e.page,"pageSize",t)},pagination:e.getList}})],1)],1)])},i=[],n=(a("a481"),a("bc3a")),o=a.n(n),s=a("8ded"),r=a.n(s),p=a("062e"),u=a("55a1"),d=a("0010"),c=a("d1a0"),m={name:"workTask",components:{Pagination:p["default"]},data:function(){return{isEnterprise:"",openDialog:!1,dialogVisible:!1,uploadCompany:"",shareFilesId:null,selectedId:null,userId:null,page:{pageIndex:1,pageSize:20},listLoading:!0,total:0,tableData:[],file:null,options:[{id:0,name:"不可见"},{id:2,name:"可见"}],ruleFormValue:{uploadCompany:null,uploadPerson:null},rules:{uploadCompany:[{required:!0,message:"请插入",trigger:"change"}],uploadPerson:[{required:!0,message:"请插入"}]}}},created:function(){this.isEnterprise=r.a.get("authData").indexOf("ent"),this.shareFilesId=this.$route.params.id,this.getList(),this.userId=Object(d["a"])().user().id},methods:{getList:function(){var e=this;this.listLoading=!0,Object(u["a"])().get("/api/shareFilesRecord/all",{uploadCompany:this.uploadCompany,shareFilesId:this.shareFilesId,pageNo:this.page.pageIndex-1,pageSize:this.page.pageSize,sortBy:"id"}).then((function(t){e.tableData=t.data,e.total=t.total,setTimeout((function(){e.listLoading=!1}),500)})).catch((function(e){console.log(e)}))},onSubmit:function(e){var t=this;this.$refs[e].validate((function(e){if(e){t.openDialog=!1,t.listLoading=!0;var a=new FormData,l=new Date;a.append("createTime",l),a.append("createUserId",t.userId),a.append("file",t.file),a.append("id",0),a.append("shareFilesId",t.shareFilesId),a.append("updateTime",l),a.append("updateUserId",t.userId),a.append("uploadCompany",t.ruleFormValue.uploadCompany),a.append("uploadPerson",t.ruleFormValue.uploadPerson),a.append("uploadProfile",""),Object(u["a"])().post("/api/shareFilesRecord/create",a).then((function(e){t.getList(),t.ruleFormValue.uploadCompany="",t.ruleFormValue.uploadPerson=""})).catch((function(e){console.log(e)}))}}))},getFileName:function(e){return e?e.replace("/uploads/",""):""},handleDelete:function(){var e=this;this.dialogVisible=!1,this.listLoading=!0,Object(u["a"])().delete("/api/shareFilesRecord/delete/"+this.selectedId).then((function(t){setTimeout((function(){e.listLoading=!1}),500),e.getList()})).catch((function(e){console.log(e)}))},downloadFile:function(e){var t=this;console.log(e),o()({url:c["b"].DOWNLOAD_URL()+e,method:"GET",responseType:"blob"}).then((function(a){if(t.isIE()){var l=new Blob([a.data],{type:"application/octet-stream"});if(window.navigator&&window.navigator.msSaveOrOpenBlob)return void window.navigator.msSaveOrOpenBlob(l,e.replace("/uploads/",""))}else{var i=window.URL.createObjectURL(new Blob([a.data])),n=document.createElement("a");n.href=i,n.setAttribute("download",e.replace("/uploads/","")),document.body.appendChild(n),n.click(),n.remove()}}))},isIE:function(){var e=navigator.userAgent;return e.indexOf("MSIE ")>-1||e.indexOf("Trident/")>-1},confirmDelete:function(e){this.dialogVisible=!0,this.selectedId=e},rowIndex:function(e){var t=e.row,a=e.rowIndex;t.rowIndex=a},order:function(e){return this.page.pageSize*(this.page.pageIndex-1)+e.rowIndex+1},chooseFile:function(){this.$refs.file.click()},handleFileUpload:function(){this.file=this.$refs.file.files[0]}}},f=m,g=a("2877"),b=Object(g["a"])(f,l,i,!1,null,"dff61dfc",null);t["default"]=b.exports}}]);
//# sourceMappingURL=chunk-2d0b9df5.58e0e78f.js.map