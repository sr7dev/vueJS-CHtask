(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64d6fb54","chunk-2d0e2754"],{"7f7f":function(t,e,a){var i=a("86cc").f,n=Function.prototype,s=/^\s*function ([^ (]*)/,r="name";r in n||a("9e1e")&&i(n,r,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(t){return""}}})},a495:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"container customized"},[t.listLoading?t._e():a("div",{staticClass:"box padding-modified header statisticsTracingCompany"}),a("div",{staticClass:"box padding-modified body"},[a("el-row",{staticClass:"W-100"},[a("el-col",{staticClass:"position-relative",attrs:{span:12}},[t.is_ie?a("h1",{staticClass:"margin-left-10 chart-title",staticStyle:{"font-size":"20px"}},[a("span",{staticStyle:{color:"#255ee3",opacity:"0.8"}},[t._v("乡镇溯")]),a("span",{staticStyle:{color:"#20beff",opacity:"0.7"}},[t._v("源企业统计")])]):a("h1",{staticClass:"gradient-colored chart-title margin-left-10",staticStyle:{"font-size":"20px"}},[t._v("乡镇溯源企业统计")]),a("div",{ref:"chartpie1",staticClass:"disability-chart chart-container"})]),a("el-col",{staticClass:"position-relative",attrs:{span:12}},[t.is_ie?a("h1",{staticClass:"margin-left-10 chart-title",staticStyle:{"font-size":"20px"}},[a("span",{staticStyle:{color:"#255ee3",opacity:"0.8"}},[t._v("各乡镇监管")]),a("span",{staticStyle:{color:"#20beff",opacity:"0.7"}},[t._v("记录上传数据的比例分布")])]):a("h1",{staticClass:"gradient-colored chart-title margin-left-10",staticStyle:{"font-size":"20px"}},[t._v("各乡镇监管记录上传数据的比例分布")]),a("div",{ref:"chartpie2",staticClass:"disability-chart chart-container margin-left-10"},[a("figure",[a("chart",{ref:"pie",attrs:{options:t.pie,"init-options":t.initOptions,autoresize:""}})],1)])])],1),a("el-row",{staticClass:"W-100 position-relative"},[a("el-col",[t.is_ie?a("h1",{staticClass:"margin-left-10 chart-title",staticStyle:{"font-size":"20px"}},[a("span",{staticStyle:{color:"#255ee3",opacity:"0.8"}},[t._v("各乡镇溯源")]),a("span",{staticStyle:{color:"#20beff",opacity:"0.7"}},[t._v("记录上传数据统计")])]):a("h1",{staticClass:"gradient-colored chart-title margin-left-10",staticStyle:{"font-size":"20px"}},[t._v("各乡镇溯源记录上传数据统计")]),a("div",{ref:"chartstick",staticClass:"w-100 flex-box disability-chart chart-container"})])],1)],1)])},n=[],s=(a("55dd"),a("7f7f"),a("ac6a"),a("55a1")),r=(a("0010"),a("71c9")),l=a("c497"),o=a("5a54"),c=(a("c037"),a("007d"),function(){return a.e("chunk-2129e83e").then(a.bind(null,"9ca8"))});r["h"](o["a"]);var f={name:"statisticsTracingCompany",components:{chart:c},data:function(){return{listLoading:!0,tableData:null,tableDataByCnt:null,companyStatics:null,companyStatics1:null,townList:null,colorList:["#229efe","#20beff","#21e3ff","#21ffda","#1fffa6","#61f779","#96f65f","#c9fb64","#c9fb64","#fbd661","#f1be51","#f68a63","#f17263","#ed6082","#ee63ca","#7366f4"],is_ie:null,pie:{},initOptions:{renderer:"canvas"}}},created:function(){this.isIE(),this.getData()},methods:{getData:function(){var t=this;this.tableData=[],this.tableDataByCnt=[],this.companyStatics=[],this.townList=[],Object(s["a"])().get("/api/tracing/getCompanyStatis",{tracingTimeFrom:"",tracingTimeTo:"",sortBy:"cnt_company"}).then((function(e){t.companyStatics=e.data,t.getTownlist()})).catch((function(t){console.error(t)}))},getTownlist:function(){var t=this;Object(s["a"])().get("/api/town/all",{}).then((function(e){t.townList=e,t.getTableData()})).catch((function(t){console.error(t)}))},getTableData:function(){var t=this;this.companyStatics.forEach((function(e){for(var a=e[1],i="",n=0;n<t.townList.length;n++)if(t.townList[n].id===a){i=t.townList[n].name;break}t.tableData.push({townName:i,companyCnt:e[0],pie1Label:i,pie2Label:i})})),this.makePieChat1(),this.makePieChat2()},getTableData1:function(){var t=this;this.companyStatics1.forEach((function(e){for(var a=e[4],i="",n=0;n<t.townList.length;n++)if(t.townList[n].id===a){i=t.townList[n].name;break}t.tableDataByCnt.push({townName:i,companyCnt:e[0],pie1Label:i,pie2Label:i})})),this.listLoading=!1},makePieChat1:function(){var t=this,e=r["f"](this.$refs.chartpie1,l["g"]);Object(s["a"])().get("/api/company_production/getTownCreditStatis",{createTimeFrom:"",createTimeTo:"",sortBy:"town_id"}).then((function(a){t.companyStatics1=a.data,t.getTableData1(),e.data=t.tableDataByCnt,t.makeStickChat()})).catch((function(t){console.error(t)})),e.responsive.enabled=!0;var a=e.series.push(new l["h"]),i=e.titles.create();i.text="乡镇溯源企业统计",i.fontSize=5,i.marginBottom=40,i.marginTop=10,i.fill=r["e"]("#012f8a"),a.dataFields.value="companyCnt",a.dataFields.category="pie1Label",a.labels.template.fill="white",a.labels.template.truncate=!0,a.labels.template.maxWidth=150,a.labels.template.fontSize=15,a.labels.template.text="[bold '#20beff']{value.percent.formatNumber('#.0')}%[/] {category}",e.innerRadius=r["g"](40),a.slices.template.fillOpacity=1,a.ticks.template.fill=r["e"]("#FFF"),a.ticks.template.strokeWidth=1,a.ticks.template.strokeOpacity=.7,a.ticks.template.fillOpacity=1;var n=new r["a"];n.list=this.colorList.map((function(t){return new r["e"](t)})),a.colors=n;var o=a.slices.template.states.getKey("hover");o.properties.scale=1,o.properties.fillOpacity=.5},makePieChat2:function(){this.tableData.sort((function(t,e){return e.cnt-t.cnt}));var t=[];this.tableData.map((function(e){t.push({value:e.companyCnt,name:e.townName})})),this.pie={tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},series:[{name:"各站点衣残捡测上传数据统计",type:"pie",radius:"40%",center:["54%","50%"],data:t,itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:2,shadowColor:"rgba(0, 0, 0, 0.5)"}},label:{normal:{fontSize:16,color:"#FFF",formatter:"{d}%: {b}"}}}],color:this.colorList};var e=-1,a=this.$refs.pie,i=this.pie.series[0].data.length;setInterval((function(){a.dispatchAction({type:"downplay",seriesIndex:0,dataIndex:e}),e=(e+1)%i,a.dispatchAction({type:"highlight",seriesIndex:0,dataIndex:e}),a.dispatchAction({type:"showTip",seriesIndex:0,dataIndex:e})}),1e3)},makeStickChat:function(){var t=r["f"](this.$refs.chartstick,l["j"]);t.data=this.tableDataByCnt;var e=t.xAxes.push(new l["a"]),a=t.titles.create();a.text="各乡镇溯源记录上传数据统计",a.fontSize=5,a.marginBottom=40,a.fill=r["e"]("#012f8a"),e.dataFields.category="townName",e.renderer.minGridDistance=20,e.renderer.grid.template.disabled=!0,e.renderer.labels.template.fill="white",e.renderer.labels.template.rotation=-45,e.renderer.labels.template.truncate=!0,e.renderer.labels.template.maxWidth=150,e.renderer.labels.template.fontSize=15,e.renderer.labels.template.horizontalCenter="right",e.renderer.line.strokeOpacity=1,e.renderer.line.strokeWidth=2,e.renderer.line.stroke=r["e"]("#3787ac");var i=t.yAxes.push(new l["i"]);i.min=0,i.renderer.labels.template.fill="white",i.renderer.grid.template.stroke=r["e"]("#fff"),i.renderer.line.strokeOpacity=1,i.renderer.line.strokeWidth=2,i.renderer.line.stroke=r["e"]("#3787ac");var n=t.series.push(new l["c"]);n.dataFields.valueY="companyCnt",n.dataFields.categoryX="townName",n.name="companyCnt",n.columns.template.tooltipText="{categoryX}: [bold]{valueY}[/]",n.columns.template.fillOpacity=1;var s=new r["c"];s.addColor(r["e"]("#08d3fc")),s.addColor(r["e"]("#4687eb")),s.rotation=90,n.fill=s;var o=n.bullets.push(new l["d"]);o.label.text="{companyCnt}",o.label.fill=r["e"]("#20beff"),o.label.truncate=!0,o.label.maxWidth=150,o.label.fontSize=15,o.label.rotation=-45,o.label.dy=-10;var c=n.columns.template;c.strokeWidth=2,c.strokeOpacity=0},createGrid:function(t,e){var a=e.axisRanges.create();a.value=t,a.label.text=this.formatNumber(t)},formatNumber:function(t){return t/1e3+"K"},isIE:function(){var t=navigator.userAgent;this.is_ie=t.indexOf("MSIE ")>-1||t.indexOf("Trident/")>-1}}},p=f,d=a("2877"),h=Object(d["a"])(p,i,n,!1,null,null,null);e["default"]=h.exports},ac6a:function(t,e,a){for(var i=a("cadf"),n=a("0d58"),s=a("2aba"),r=a("7726"),l=a("32e9"),o=a("84f2"),c=a("2b4c"),f=c("iterator"),p=c("toStringTag"),d=o.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},m=n(h),u=0;u<m.length;u++){var b,y=m[u],g=h[y],v=r[y],S=v&&v.prototype;if(S&&(S[f]||l(S,f,d),S[p]||l(S,p,y),o[y]=d,g))for(b in i)S[b]||s(S,b,i[b],!0)}}}]);
//# sourceMappingURL=chunk-64d6fb54.b50dbc6c.js.map