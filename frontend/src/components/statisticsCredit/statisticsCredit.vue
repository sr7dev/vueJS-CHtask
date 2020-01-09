<template>
  <div class="container customized" v-loading="listLoading">
    <div class="box padding-modified header statisticsCredit" v-if="!listLoading"></div>
    <div class="box padding-modified body">
      <el-row class="w-100">
        <el-col :span="14">
          <h1
            style="font-size:20px"
            class="gradient-colored chart-title margin-left-10"
            v-if="!is_ie"
          >诚信等级企业数量汇总</h1>
          <h1 style="font-size:20px" v-else class="gradient-colored chart-title margin-left-10">
            <span style="color:#255ee3;opacity:0.8">诚信等级</span>
            <span style="color:#20beff;opacity:0.7">企业数量汇总</span>
          </h1>
          <div class="disability-chart chart-container maring-right-10" ref="chartdiv1"></div>
          <div style="position: absolute;top: 45px;left: 38%;" class="white-colored">
            合计:
            <span style="margin-left:20px;" class="blue-colored">A级&nbsp;</span>
            <span
              class="blue-colored"
              style="font-weight:bold; font-style:italic; font-size:32px; line-height:0.9em; vertical-align:bottom"
            >{{totalA}}</span>
            <span class="blue-colored" style="margin-left:20px;">B级&nbsp;</span>
            <span
              class="blue-colored"
              style="font-weight:bold; font-style:italic; font-size:32px; line-height:0.9em; vertical-align:bottom"
            >{{totalB}}</span>
            <span class="blue-colored" style="margin-left:20px;">C级&nbsp;</span>
            <span
              class="blue-colored"
              style="font-weight:bold; font-style:italic; font-size:32px; line-height:0.9em; vertical-align:bottom"
            >{{totalC}}</span>
          </div>
        </el-col>
        <el-col :span="10" class="position-relative">
          <h1
            style="font-size:20px"
            class="gradient-colored chart-title margin-left-10"
            v-if="!is_ie"
          >各站点诚信等级上传数据的比例分布</h1>
          <h1 style="font-size:20px" v-else class="gradient-colored chart-title margin-left-10">
            <span style="color:#255ee3;opacity:0.8">农残监测统计</span>
            <span style="color:#20beff;opacity:0.7">级上传数据的比例分布</span>
          </h1>
          <div
            class="disability-chart chart-container margin-left-10"
            ref="chartdiv2"
            style="padding-left:15px"
          >
            <figure>
              <chart
                :options="pie"
                :init-options="initOptions"
                ref="pie"
                autoresize
              />
            </figure>
          </div>
        </el-col>
      </el-row>
      <el-row class="w-100">
        <el-col :span="14">
          <h1
            style="font-size:20px"
            class="gradient-colored chart-title margin-left-10"
            v-if="!is_ie"
          >各站点上传数据统计</h1>
          <h1 style="font-size:20px" v-else class="gradient-colored chart-title margin-left-10">
            <span style="color:#255ee3;opacity:0.8">各站点</span>
            <span style="color:#20beff;opacity:0.7">上传数据统计</span>
          </h1>
          <div class="disability-chart chart-container maring-right-10" ref="chartdiv3"></div>
        </el-col>
        <el-col :span="10">
          <div class="disability-chart chart-container margin-left-10" ref="chartdiv4">
            <el-row
              style="display:relative;font-size: 20px; font-weight: bold; color: #000000; margin-bottom:15px; "
            >
              <h1 style="font-size:20px" class="gradient-colored chart-title" v-if="!is_ie">红黑名单</h1>
              <h1 style="font-size:20px" v-else class="gradient-colored chart-title margin-left-10">
                <span style="color:#255ee3;opacity:0.8">红</span>
                <span style="color:#20beff;opacity:0.7">黑名单</span>
              </h1>
            </el-row>
            <el-row style="margin:50px 10px 30px 15px; border-bottom: solid 1px #3787ac; ">
              <div style="font-size:15px;font-weight: bold;" class="white-colored">红名单</div>
              <div style="margin:20px 0 20px 20px; line-height:3em">
                <span
                  class="blue-colored"
                  style="margin-right:40px;"
                  v-for="item in redData"
                  :key="item.id"
                  :value="item.id"
                >
                  <b>{{ item }}</b>
                </span>
              </div>
            </el-row>
            <el-row style="margin:30px 0 30px 15px">
              <div style="font-size:15px;font-weight: bold;" class="white-colored">黑名单</div>
              <div style="margin:20px 0 20px 20px; line-height:3em">
                <span
                  class="blue-colored"
                  style="margin-right:40px;"
                  v-for="item in blackData"
                  :key="item.id"
                  :value="item.id"
                >
                  <b>{{ item }}</b>
                </span>
              </div>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
import Request from "@/services/api/request.js";
import Pagination from "@/components/common/pagination";
import Auth from "@/services/authentication/auth.js";
import Storage from "store";
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import axios from "axios";
const ECharts =()=>import('vue-echarts/components/ECharts.vue');
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';

export default {
  name: "statisticsCredit",
  components: {
    chart: ECharts
  },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 50
      },
      listLoading: false,
      totalLoading: true,
      toYear: null,
      toMonth: null,
      // maxCnt: null,
      maxCnt: 45,
      progressColor: "",
      isShowAddButton: null,
      leftTopData: [],
      leftDownData: [],
      rightTopData: [],
      redData: [],
      blackData: [],
      township: [{ id: -1, name: "全部" }],
      companyProduction: [],
      totalA: 0,
      totalB: 0,
      totalC: 0,
      colorList: [
        "#229efe",
        "#20beff",
        "#21e3ff",
        "#21ffda",
        "#1fffa6",
        "#61f779",
        "#96f65f",
        "#c9fb64",
        "#c9fb64",
        "#fbd661",
        "#f1be51",
        "#f68a63",
        "#f17263",
        "#ed6082",
        "#ee63ca",
        "#7366f4"
      ],
      is_ie: null,
      pie:{},
      initOptions: {
        renderer: 'canvas'
      }
    };
  },
  async mounted() {
    this.isIE();
    await this.getTown();
    this.getCompanyProduction();
    // this.makeXYChart();
    // this.makePieChart();
    // this.makeLineChart();
  },
  created() {
    this.isShowAddButton = Storage.get("authList").find(
      x => x.privilegeCode == "addTrainingFunds"
    )
      ? true
      : false;
  },
  methods: {
    async getTown() {
      this.listLoading = true;
      await Request()
        .get("/api/town/all")
        .then(response => {
          this.township = this.township.concat(response);
          this.getLeftTopData();
          this.getRightTopData();
          this.getLeftDownData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    createGrid(value, valueAxis) {
      var range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = this.formatNumber(value);
    },
    createGrid1(value, valueAxis) {
      var range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = value; //this.formatNumber(value);
    },
    formatNumber(value) {
      return value / 1000 + "K";
    },
    getLeftTopData() {
      Request()
        .get("/api/company_production/getTownCreditStatis", {
          sortBy: "town_id"
        })
        .then(response => {
          this.leftTopData = response.data;
          setTimeout(() => {}, 0.5 * 1000);
          this.makeChartLeftTop();
          setTimeout(() => {
            this.totalLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRightTopData() {
      Request()
        .get("/api/company_credit_grade/getCreditStatis", {
          sortBy: "cnt"
        })
        .then(response => {
          this.leftTopData = response.data;
          setTimeout(() => {}, 0.5 * 1000);
          this.makeChartRightTop();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getLeftDownData() {
      Request()
        .get("/api/company_credit_grade/getCreditStatis", { sortBy: "townId" })
        .then(response => {
          this.leftDownData = response.data;
          setTimeout(() => {}, 0.5 * 1000);
          this.makeChartLeftDown();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRedData() {
      Request()
        .get("/api/company_credit_grade/all", {
          nowGrade: "A",  //approvalStatus: 2,
          sortBy: "creditGradeId",
          publishStatus : this.isShowAddButton? 1 : -1
        })
        .then(response => {
          // this.redData = response.data;
          // this.total = response.total;
          setTimeout(() => {}, 0.5 * 1000);
          let index = 0;
          this.redData = response.data.map(item => {
            return this.filterCompnay(item.creditCode);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    getBlackData() {
      Request()
        .get("/api/company_credit_grade/all", {
          nowGrade: "C",  //approvalStatus: 2,
          sortBy: "creditGradeId",
          publishStatus : this.isShowAddButton? 1 : -1
        })
        .then(response => {
          // this.blackData = response.data;
          // this.total = response.total;
          setTimeout(() => {}, 0.5 * 1000);
          let index = 0;
          this.blackData = response.data.map(item => {
            return this.filterCompnay(item.creditCode);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getCompanyProduction() {
      await Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyProduction = response;
          this.getRedData();
          this.getBlackData();
        })
        .catch(error => {
          console.log(error);
        });
      setTimeout(() => {
        this.listLoading = false;
      }, 0.5 * 1000);
    },
    filterCompnay(credit) {
      let company = this.companyProduction.find(x => x.creditCode === credit);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
    filterTownName(id) {
      let town = this.township.find(x => x.id === id);
      if (town) {
        return town.name;
      } else {
        return "";
      }
    },
    makeChartLeftTop() {
      Promise.all([
        import("@amcharts/amcharts4/core"),
        import("@amcharts/amcharts4/charts"),
        import("@amcharts/amcharts4/themes/animated")
      ]).then((modules) => {
        const am4core = modules[0];
        const am4charts = modules[1];
        const am4themes_animated = modules[2].default;
        am4core.useTheme(am4themes_animated);
         let chart = am4core.create(this.$refs.chartdiv1, am4charts.XYChart);
      let data = [];
      this.leftTopData.map(item => {
        data.push({
          townId: this.filterTownName(item[4]),
          A级: item[1],
          B级: item[2],
          C级: item[3]
        });
        this.totalA += item[1];
        this.totalB += item[2];
        this.totalC += item[3];
      });
      chart.data = data;
      chart.responsive.enabled = true;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      let title = chart.titles.create();
      title.text = "诚信等级企业数量汇总";
      title.fontSize = 5;
      title.marginBottom = 40;
      title.fill = am4core.color("#012f8a");
      categoryAxis.dataFields.category = "townId";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.fill = "white";
      categoryAxis.renderer.line.strokeOpacity = 1;
      categoryAxis.renderer.line.strokeWidth = 2;
      categoryAxis.renderer.labels.template.truncate = true;
      categoryAxis.renderer.labels.template.maxWidth = 150;
      categoryAxis.renderer.labels.template.fontSize = 15;
      categoryAxis.renderer.line.stroke = am4core.color("#3787ac");
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      // valueAxis.max = 600;
      // valueAxis.renderer.minGridDistance = 2;
      valueAxis.renderer.labels.template.fill = "white";
      valueAxis.renderer.grid.template.stroke = am4core.color("#fff");
      valueAxis.renderer.line.strokeOpacity = 1;
      valueAxis.renderer.line.strokeWidth = 2;
      valueAxis.renderer.line.stroke = am4core.color("#3787ac");
      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "A级";
      series.dataFields.categoryX = "townId";
      series.name = "A级";
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      series.stroke = am4core.color("red").lighten(-0.5);
      var gradient = new am4core.LinearGradient();
      gradient.addColor(am4core.color("#db4f5a"));
      gradient.addColor(am4core.color("#e0c2f8"));
      gradient.rotation = 90;
      series.fill = gradient;
      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{A级}";
      valueLabel.label.rotation = -45;
      valueLabel.label.fill = am4core.color("#20beff");
      valueLabel.label.dy = -10;

      let series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = "B级";
      series2.dataFields.categoryX = "townId";
      series2.name = "B级";
      series2.tooltipText = "{name}: [bold]{valueY}[/]";
      series2.stroke = am4core.color("yellow").lighten(-0.5);
      var gradient2 = new am4core.LinearGradient();
      gradient2.addColor(am4core.color("#f7b918"));
      gradient2.addColor(am4core.color("#f7ffb2"));
      gradient2.rotation = 90;
      series2.fill = gradient2;
      let valueLabel2 = series2.bullets.push(new am4charts.LabelBullet());
      valueLabel2.label.text = "{B级}";
      valueLabel2.label.rotation = -45;
      valueLabel2.label.fill = am4core.color("#20beff");
      valueLabel2.label.dy = -10;

      let series3 = chart.series.push(new am4charts.ColumnSeries());
      series3.dataFields.valueY = "C级";
      series3.dataFields.categoryX = "townId";
      series3.name = "C级";
      series3.tooltipText = "{name}: [bold]{valueY}[/]";
      series3.stroke = am4core.color("green").lighten(-0.5);
      var gradient3 = new am4core.LinearGradient();
      gradient3.addColor(am4core.color("#55ea38"));
      gradient3.addColor(am4core.color("#c1feb9"));
      gradient3.rotation = 90;
      series3.fill = gradient3;
      let valueLabel3 = series3.bullets.push(new am4charts.LabelBullet());
      valueLabel3.label.text = "{C级}";
      valueLabel3.label.fill = am4core.color("#20beff");
      valueLabel3.label.rotation = -45;
      valueLabel3.label.dy = -10;

      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
      chart.legend.labels.template.fill = "white";
      chart.legend.contentAlign = "left";
      chart.legend.marginTop = -20;
      var legendTitle = chart.legend.createChild(am4core.Label);
      legendTitle.text = "诚信等级:";
      legendTitle.fontSize = 15;
      legendTitle.marginRight = 10;
      legendTitle.marginLeft = 40;
      if (this.is_ie) legendTitle.paddingTop = 10;
      else legendTitle.paddingTop = 15;
      legendTitle.fill = "white";

      let columnTemplate = series.columns.template;
      columnTemplate.strokeOpacity = 0;
        // Chart code goes here
      }).catch((e) => {
        console.error("Error when creating chart", e);
      }) 
     
      // this.createGrid1(0, valueAxis);
      // this.createGrid1(200, valueAxis);
      // this.createGrid1(400, valueAxis);
      // this.createGrid1(600, valueAxis);
    },
    makeChartRightTop() {
      // let chart = am4core.create(this.$refs.chartdiv2, am4charts.PieChart);

      // let data = [];
      // this.leftTopData.map(item => {
      //   data.push({
      //     cnt: item[0],
      //     townId: this.filterTownName(item[1])
      //   });
      // });
     
      this.leftTopData.sort(function(a, b) {
        return b.cnt - a.cnt;
      });
      let chartData=[];
      this.leftTopData.map(item=>{
        chartData.push({
          value:item[0],
          name: this.filterTownName(item[1])
        });
      });
      this.pie={
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
          name:'各站点农残检测上传数据统计',
          type: 'pie',
          radius: '40%',
          center: ['54%', '50%'],
          data: chartData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            normal:{
              fontSize:16,
              color:"#FFF",
              formatter:'{d}%: {b}'
            }
          }
        }],
        color : this.colorList
      };
      let dataIndex = -1;
      let pie = this.$refs.pie;
      let dataLen = this.pie.series[0].data.length;

      setInterval(() => {
        pie.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex
        })
        dataIndex = (dataIndex + 1) % dataLen
        pie.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex
        })
        // 显示 tooltip
        pie.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex
        })
      }, 1000)  
      // chart.data = data;
      // chart.responsive.enabled = true;
      // chart.addClassName = true;
      // chart.width = am4core.percent(55);
      // chart.height = am4core.percent(100);
      // chart.align = "center";

      // // Add and configure Series
      // let pieSeries = chart.series.push(new am4charts.PieSeries());
      // let title = chart.titles.create();
      // title.text = "各站点诚信等级上传数据的比例分布";
      // title.fontSize = 5;
      // title.marginBottom = 20;
      // title.marginTop = 10;
      // title.fill = am4core.color("#012f8a");
      // // pieSeries.radius = 100;
      // pieSeries.dataFields.value = "cnt";

      // pieSeries.dataFields.category = "townId";
      // pieSeries.dataFields.radiusValue = "cnt";

      // pieSeries.labels.template.truncate = true;
      // pieSeries.labels.template.fontSize = 15;
      // pieSeries.labels.template.maxWidth = 180;
      // pieSeries.labels.template.fill = "white";
      // pieSeries.labels.template.text =
      //   "[bold '#20beff']{value.percent.formatNumber('#.0')}%[/] {category}";
      // pieSeries.ticks.template.strokeWidth = 1;
      // pieSeries.ticks.template.strokeOpacity = 0.7;
      // pieSeries.ticks.template.fill = am4core.color("#012f8a");
      // pieSeries.ticks.template.fillOpacity = 1;
      // // Add cursor
      // chart.cursor = new am4charts.XYCursor();
      // // chart.legend = new am4charts.Legend()

      // // This creates initial animation
      // pieSeries.hiddenState.properties.opacity = 1;
      // pieSeries.hiddenState.properties.endAngle = -90;
      // pieSeries.hiddenState.properties.startAngle = -90;
      // let colorSet = new am4core.ColorSet();
      // colorSet.list = this.colorList.map(color => {
      //   return new am4core.color(color);
      // });
      // pieSeries.colors = colorSet;
    },
    makeChartLeftDown() {
       Promise.all([
        import("@amcharts/amcharts4/core"),
        import("@amcharts/amcharts4/charts"),
        import("@amcharts/amcharts4/themes/animated")
      ]).then((modules) => {
        const am4core = modules[0];
        const am4charts = modules[1];
        const am4themes_animated = modules[2].default;
        am4core.useTheme(am4themes_animated);
         let chart = am4core.create(this.$refs.chartdiv3, am4charts.XYChart);
      let data = [];
      this.leftDownData.map(item => {
        data.push({
          townId: this.filterTownName(item[1]),
          cnt: item[0]
        });
      });
      chart.data = data;
      chart.responsive.enabled = true;

      // Add legend
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      let title = chart.titles.create();
      title.text = "各站点上传数据统计";
      title.fontSize = 5;
      title.marginBottom = 30;
      title.fill = am4core.color("#012f8a");
      categoryAxis.dataFields.category = "townId";
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.labels.template.fill = "white";
      categoryAxis.renderer.labels.template.truncate = true;
      categoryAxis.renderer.labels.template.maxWidth = 150;
      categoryAxis.renderer.labels.template.fontSize = 15;
      categoryAxis.renderer.labels.template.rotation = -45;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.line.strokeOpacity = 1;
      categoryAxis.renderer.line.strokeWidth = 2;
      categoryAxis.renderer.line.stroke = am4core.color("#3787ac");
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      // valueAxis.max = 15000;
      valueAxis.renderer.minGridDistance = 40;
      valueAxis.renderer.labels.template.fill = "white";
      valueAxis.renderer.grid.template.stroke = am4core.color("#fff");
      valueAxis.renderer.line.strokeOpacity = 1;
      valueAxis.renderer.line.strokeWidth = 2;
      valueAxis.renderer.line.stroke = am4core.color("#3787ac");

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "cnt";
      series.dataFields.categoryX = "townId";
      series.name = "cnt";
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      var gradient = new am4core.LinearGradient();
      gradient.addColor(am4core.color("#00d5f7"));
      gradient.addColor(am4core.color("#4784ee"));
      gradient.rotation = 90;
      series.fill = gradient;

      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{cnt}";
      valueLabel.label.fill = am4core.color("#20beff");
      valueLabel.label.rotation = 0;
        valueLabel.label.truncate = false;
        valueLabel.label.dy = -7;
        valueLabel.label.fontSize = 10;
      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      let columnTemplate = series.columns.template;
      columnTemplate.strokeOpacity = 0;
        // Chart code goes here
      }).catch((e) => {
        console.error("Error when creating chart", e);
      }) 
      
     
      // this.createGrid(0, valueAxis);
      // this.createGrid(5000, valueAxis);
      // this.createGrid(10000, valueAxis);
      // this.createGrid(15000, valueAxis);
    },
    getPercent(cnt1, cnt2, type) {
      if (!cnt1 || !cnt2) return 0;
      if (type === 2) {
        this.progressColor =
          parseInt((cnt1 / cnt2) * 100) < 100 ? "warning" : "success";
      }
      return parseInt((cnt1 / cnt2) * 100);
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      this.is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    }
  }
};
</script>