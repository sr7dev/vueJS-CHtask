<template>
  <div class="container customized">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">溯源企业看板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box padding-modified header statisticsTracingCompany"></div>
    <div class="box padding-modified body" v-loading="listLoading">
      <el-row class="W-100">
        <el-col :span="12" class="position-relative">
          <h1
            style="font-size:20px"
            v-if="!is_ie"
            class="gradient-colored chart-title margin-left-10"
          >乡镇溯源企业统计</h1>
          <h1 style="font-size:20px" v-else class="margin-left-10 chart-title">
            <span style="color:#255ee3;opacity:0.8">乡镇溯</span>
            <span style="color:#20beff;opacity:0.7">源企业统计</span>
          </h1>
          <div class="disability-chart chart-container" ref="chartpie1"></div>
        </el-col>
        <el-col :span="12" class="position-relative">
          <h1
            style="font-size:20px"
            v-if="!is_ie"
            class="gradient-colored chart-title margin-left-10"
          >各乡镇监管记录上传数据的比例分布</h1>
          <h1 style="font-size:20px" v-else class="margin-left-10 chart-title">
            <span style="color:#255ee3;opacity:0.8">各乡镇监管</span>
            <span style="color:#20beff;opacity:0.7">记录上传数据的比例分布</span>
          </h1>
          <div class="disability-chart chart-container margin-left-10" ref="chartpie2"></div>
        </el-col>
      </el-row>
      <el-row class="W-100 position-relative">
        <el-col>
          <h1
            style="font-size:20px"
            v-if="!is_ie"
            class="gradient-colored chart-title margin-left-10"
          >各乡镇溯源记录上传数据统计</h1>
          <h1 style="font-size:20px" v-else class="margin-left-10 chart-title">
            <span style="color:#255ee3;opacity:0.8">各乡镇溯源</span>
            <span style="color:#20beff;opacity:0.7">记录上传数据统计</span>
          </h1>
          <div class="w-100 flex-box disability-chart chart-container" ref="chartstick"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request.js";
import Auth from "@/services/authentication/auth.js";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

export default {
  name: "statisticsTracingCompany",
  data() {
    return {
      listLoading: true,
      tableData: null,
      tableDataByCnt: null,
      companyStatics: null,
      companyStatics1: null,
      townList: null,
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
      is_ie: null
    };
  },
  created() {
    this.isIE();
    this.getData();
  },
  methods: {
    getData() {
      this.tableData = [];
      this.tableDataByCnt = [];
      this.companyStatics = [];
      this.townList = [];

      Request()
        .get("/api/tracing/getCompanyStatis", {
          tracingTimeFrom: "",
          tracingTimeTo: "",
          sortBy: "town_id"
        })
        .then(res => {
          this.companyStatics = res.data;
          this.getTownlist();
        })
        .catch(err => {
          console.error(err);
        });
    },

    getTownlist() {
      Request()
        .get("/api/town/all", {})
        .then(response => {
          this.townList = response;
          this.getTableData();
        })
        .catch(err => {
          console.error(err);
        });
    },

    getTableData() {
      this.companyStatics.forEach(res => {
        let town_id = res[1],
          townname = "";
        for (let i = 0; i < this.townList.length; i++) {
          if (this.townList[i].id === town_id) {
            townname = this.townList[i].name;
            break;
          }
        }

        this.tableData.push({
          townName: townname,
          companyCnt: res[0],
          pie1Label: townname,
          pie2Label: townname
        });
      });

      this.makePieChat1();
      this.makePieChat2();
      this.makeStickChat();
    },
    getTableData1() {
      this.companyStatics1.forEach(res => {
        let town_id = res[1],
          townname = "";
        for (let i = 0; i < this.townList.length; i++) {
          if (this.townList[i].id === town_id) {
            townname = this.townList[i].name;
            break;
          }
        }

        this.tableDataByCnt.push({
          townName: townname,
          companyCnt: res[0],
          pie1Label: townname,
          pie2Label: townname
        });
      });
      this.listLoading = false;
    },

    makePieChat1() {
      let chart = am4core.create(this.$refs.chartpie1, am4charts.PieChart);
      Request()
        .get("/api/tracing/getCompanyStatis", {
          tracingTimeFrom: "",
          tracingTimeTo: "",
          sortBy: "cnt_company"
        })
        .then(res => {
          this.companyStatics1 = res.data;
          this.getTableData1();
          chart.data = this.tableDataByCnt;
        })
        .catch(err => {
          console.error(err);
        });

      chart.responsive.enabled = true;

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      let title = chart.titles.create();
      title.text = "乡镇溯源企业统计";
      title.fontSize = 5;
      title.marginBottom = 40;
      title.marginTop = 10;
      title.fill = am4core.color("#012f8a");

      pieSeries.dataFields.value = "companyCnt";
      pieSeries.dataFields.category = "pie1Label";
      pieSeries.labels.template.fill = "white";
      pieSeries.labels.template.truncate = true;
      pieSeries.labels.template.maxWidth = 150;
      pieSeries.labels.template.fontSize = 15;
      pieSeries.labels.template.text =
        "{value.value} / {value.percent.formatNumber('#.0')}% {category}";
      chart.innerRadius = am4core.percent(40);
      pieSeries.slices.template.fillOpacity = 1;
      pieSeries.ticks.template.fill = am4core.color("#FFF");
      pieSeries.ticks.template.strokeWidth = 1;
      pieSeries.ticks.template.strokeOpacity = 0.7;
      pieSeries.ticks.template.fillOpacity = 1;
      let colorSet = new am4core.ColorSet();
      colorSet.list = this.colorList.map(color => {
        return new am4core.color(color);
      });
      pieSeries.colors = colorSet;
      let hs = pieSeries.slices.template.states.getKey("hover");
      hs.properties.scale = 1;
      hs.properties.fillOpacity = 0.5;
    },

    makePieChat2() {
      let chart = am4core.create(this.$refs.chartpie2, am4charts.PieChart);
      chart.data = this.tableData;
      chart.responsive.enabled = true;
      let pieSeries = chart.series.push(new am4charts.PieSeries());

      let title = chart.titles.create();
      title.text = "各乡镇监管记录上传数据的比例分布";
      title.fontSize = 5;
      title.marginBottom = 40;
      title.marginTop = 10;
      title.fill = am4core.color("#012f8a");

      pieSeries.dataFields.value = "companyCnt";
      pieSeries.dataFields.category = "pie2Label";
      pieSeries.dataFields.radiusValue = "companyCnt";
      pieSeries.labels.template.fill = "white";
      pieSeries.labels.template.truncate = true;
      pieSeries.labels.template.fontSize = 15;
      pieSeries.labels.template.maxWidth = 180;
      pieSeries.labels.template.text =
        "{value.percent.formatNumber('#.0')}% {category}";
      pieSeries.slices.template.strokeOpacity = 1;
      pieSeries.ticks.template.fill = am4core.color("#FFF");
      pieSeries.ticks.template.strokeWidth = 1;
      pieSeries.ticks.template.strokeOpacity = 0.7;
      pieSeries.ticks.template.fillOpacity = 1;
      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
      let colorSet = new am4core.ColorSet();
      colorSet.list = this.colorList.map(color => {
        return new am4core.color(color);
      });
      pieSeries.colors = colorSet;
    },

    makeStickChat() {
      let chart = am4core.create(this.$refs.chartstick, am4charts.XYChart);
      chart.data = this.tableData;
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      let title = chart.titles.create();
      title.text = "各乡镇溯源记录上传数据统计";
      title.fontSize = 5;
      title.marginBottom = 40;
      title.fill = am4core.color("#012f8a");

      categoryAxis.dataFields.category = "townName";
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.labels.template.fill = "white";
      categoryAxis.renderer.labels.template.rotation = -45;
      categoryAxis.renderer.labels.template.truncate = true;
      categoryAxis.renderer.labels.template.maxWidth = 150;
      categoryAxis.renderer.labels.template.fontSize = 15;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.line.strokeOpacity = 1;
      categoryAxis.renderer.line.strokeWidth = 2;
      categoryAxis.renderer.line.stroke = am4core.color("#3787ac");
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis.title.text = "镇农产品质量安全董监管站(管站)";
      valueAxis.min = 0;
      // valueAxis.max = 15000;
      valueAxis.renderer.labels.template.fill = "white";
      valueAxis.renderer.grid.template.stroke = am4core.color("#fff");
      valueAxis.renderer.line.strokeOpacity = 1;
      valueAxis.renderer.line.strokeWidth = 2;
      valueAxis.renderer.line.stroke = am4core.color("#3787ac");
      // valueAxis.renderer.grid.template.disabled = true;
      // valueAxis.renderer.labels.template.disabled = true;
      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "companyCnt";
      series.dataFields.categoryX = "townName";
      series.name = "companyCnt";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = 1;
      var gradient = new am4core.LinearGradient();
      gradient.addColor(am4core.color("#08d3fc"));
      gradient.addColor(am4core.color("#4687eb"));
      gradient.rotation = 90;
      series.fill = gradient;
      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{companyCnt}";
      valueLabel.label.fill = am4core.color("#20beff");
      valueLabel.label.truncate = true;
      valueLabel.label.maxWidth = 150;
      valueLabel.label.fontSize = 15;
      valueLabel.label.rotation = -45;
      valueLabel.label.dy = -10;
      let columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
      // this.createGrid(0, valueAxis);
      // this.createGrid(5000, valueAxis);
      // this.createGrid(10000, valueAxis);
      // this.createGrid(15000, valueAxis);
    },

    createGrid(value, valueAxis) {
      var range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = this.formatNumber(value);
    },
    formatNumber(value) {
      return value / 1000 + "K";
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      this.is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    }
  }
};
</script>