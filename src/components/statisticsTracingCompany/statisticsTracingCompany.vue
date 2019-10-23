<template>
  <div class="container customized">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>溯源企业看板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box padding-modified" v-loading="listLoading">
      <el-row class="W-100">
        <el-col :span="12">
          <div class="disability-chart chart-container" ref="chartpie1"></div>
        </el-col>
        <el-col :span="12">
          <div class="disability-chart chart-container" ref="chartpie2"></div>
        </el-col>
      </el-row>
      <el-row class="W-100">
        <el-col>
          <div class="w-100 flex-box disability-chart chart-container" ref="chartstick">              
          </div>
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
      companyStatics: null,
      townList: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.tableData = [];
      this.companyStatics = [];
      this.townList = [];

      Request()
        .get("/api/tracing/getCompanyStatis", {
          tracingTimeFrom: "",
          tracingTimeTo: ""
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
          pie1Label: townname + " " + res[0] + " ",
          pie2Label: townname+"监管..."

        });
      });

      this.makePieChat1();
      this.makePieChat2();
      this.makeStickChat();
      this.listLoading = false;
    },

    makePieChat1() {
      let chart = am4core.create(this.$refs.chartpie1, am4charts.PieChart);
      chart.data = this.tableData;
      chart.responsive.enabled = true;

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      let title = chart.titles.create();
      title.text = "乡镇溯源企业统计";
      title.fontSize = 20;
      title.marginBottom = -20;
      title.marginTop = 10;
      title.fontWeight = "bold";

      pieSeries.dataFields.value = "companyCnt";
      pieSeries.dataFields.category = "pie1Label";

      chart.innerRadius = am4core.percent(40);
      pieSeries.slices.template.fillOpacity = 1;

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
      title.fontSize = 20;
      title.marginBottom = -20;
      title.marginTop = 10;
      title.fontWeight = "bold";

      pieSeries.dataFields.value = "companyCnt";
      pieSeries.dataFields.category = "pie2Label";
      pieSeries.dataFields.radiusValue = "companyCnt";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    },

    makeStickChat(){
        let chart = am4core.create(this.$refs.chartstick, am4charts.XYChart);
      chart.data = this.tableData;
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      let title = chart.titles.create();
      title.text = "各乡镇溯源记录上传数据的比例分布";
      title.fontSize = 20;
      title.marginBottom = 30;

      title.fontWeight = "bold";
      title.align = "left";
      categoryAxis.dataFields.category = "townName";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.rotation = -45;
      categoryAxis.renderer.labels.template.truncate = true;
//      categoryAxis.renderer.labels.template.maxWidth = 120;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis.title.text = "镇农产品质量安全董监管站(管站)";
      valueAxis.min = 0;
      valueAxis.max = 15000;
      valueAxis.renderer.minGridDistance = 5;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "companyCnt";
      series.dataFields.categoryX = "townName";
      series.name = "companyCnt";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = 1;
      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{companyCnt}";
      valueLabel.label.rotation = -45;
      valueLabel.label.dy = -10;
      let columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
      this.createGrid(0, valueAxis);
      this.createGrid(5000, valueAxis);
      this.createGrid(10000, valueAxis);
      this.createGrid(15000, valueAxis);
    },

    createGrid(value, valueAxis) {
      var range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = this.formatNumber(value);
    },

    formatNumber(value) {
      return value / 1000 + "K";
    },

  }
};
</script>