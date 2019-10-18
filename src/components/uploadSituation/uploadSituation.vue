<template>
  <div class="container customized">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">上传情况</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box padding-modified">
      <div class="iptBox">
        <el-row class="w-100 flex-center">
          <el-col :span="2">
            <el-checkbox class="margin-left-10">全部</el-checkbox>
          </el-col>
          <el-col :span="3" class="margin-left-20 flex-center">
            <div>按年</div>
            <el-input v-model="yearVal" class="w-80 margin-left-10" type="number"></el-input>
          </el-col>
          <el-col :span="3" class="margin-left-20 flex-center">
            <div>按月</div>
            <el-input v-model="monthVal" class="w-80 margin-left-10" type="number"></el-input>
          </el-col>
          <el-col :span="8" class="margin-left-20">
            <el-button type="primary" plain class="margin-left-20">开始统计</el-button>
            <el-button type="success" plain class="margin-left-20">排序 (升)</el-button>
            <el-button type="success" plain class="margin-left-20">排序 (降)</el-button>
          </el-col>
        </el-row>
      </div>

      <el-row class="w-100">
        <div class="w-100 chart-container" ref="chartdiv"></div>
      </el-row>
      <el-row class="w-100">
        <el-col :span="12">
          <div class="chart-container second-container" ref="chartdiv1"></div>
        </el-col>
        <el-col :span="12">
          <div class="chart-container margin-left-10 third-container" ref="chartdiv2"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request.js";
import Pagination from "@/components/common/pagination";
import Auth from "@/services/authentication/auth.js";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import chartData from "./chartData1";
import chartData1 from "./chartData2";
am4core.useTheme(am4themes_animated);

export default {
  name: "uploadSituation",
  // components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 50
      },
      yearVal: null,
      monthVal: null
    };
  },
  mounted() {
    this.makeXYChart();
    this.makePieChart();
    this.makeLineChart();
  },
  methods: {
    createGrid(value, valueAxis) {
      var range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = this.formatNumber(value);
    },
    formatNumber(value) {
      return value / 1000 + "K";
    },
    makeXYChart() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      chart.data = chartData;
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      let title = chart.titles.create();
      title.text = "农产品质量安全董监管站";
      title.fontSize = 20;
      title.marginBottom = 30;
      title.fontWeight = "bold";
      categoryAxis.dataFields.category = "town";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.rotation = -45;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "镇农产品质量安全董监管站(管站)";
      valueAxis.min = 0;
      valueAxis.max = 15000;
      valueAxis.renderer.minGridDistance = 5;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "amount";
      series.dataFields.categoryX = "town";
      series.name = "amount";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = 1;
      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{amount}";
      valueLabel.label.dy = -10;
      let columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
      this.createGrid(0, valueAxis);
      this.createGrid(5000, valueAxis);
      this.createGrid(10000, valueAxis);
      this.createGrid(15000, valueAxis);
    },
    makePieChart() {
      let chart = am4core.create(this.$refs.chartdiv1, am4charts.PieChart);
      chart.data = chartData;
      chart.responsive.enabled = true;
      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      let title = chart.titles.create();
      title.text = "农产品质量安全董监管站";
      title.fontSize = 20;
      title.marginBottom = -20;
      title.marginTop = 10;
      title.fontWeight = "bold";
      pieSeries.dataFields.radiusValue = 80;
      pieSeries.radius = 150;
      pieSeries.dataFields.value = "amount";
      pieSeries.dataFields.category = "town";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    },
    makeLineChart() {
      let chart = am4core.create(this.$refs.chartdiv2, am4charts.XYChart);
      chart.data = chartData1;
      let title = chart.titles.create();
      title.text = "最近12个月每月上传数据统计";
      title.fontSize = 20;
      title.marginBottom = 30;
      title.fontWeight = "bold";
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.ticks.template.disabled = true;
      categoryAxis.renderer.line.opacity = 0;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.minGridDistance = 40;
      categoryAxis.dataFields.category = "month";
      categoryAxis.startLocation = 0.3;
      categoryAxis.endLocation = 0.7;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.title.text = "镇农产品质量安全董监管站(管站)";
      valueAxis.renderer.line.opacity = 0;
      valueAxis.renderer.ticks.template.disabled = true;
      valueAxis.min = 0;
      valueAxis.max = 1700;

      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.categoryX = "month";
      lineSeries.dataFields.valueY = "income";
      lineSeries.tooltipText = "上传数量";
      lineSeries.fillOpacity = 0.6;
      lineSeries.stroke = am4core.color("#2381e4");
      lineSeries.strokeWidth = 3;
      lineSeries.fill = am4core.color("#90bff2");

      let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
      bullet.circle.radius = 6;
      bullet.circle.stroke = am4core.color("#2381e4");
      bullet.circle.fill = am4core.color("#2381e4");
      bullet.circle.strokeWidth = 3;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "panX";
      chart.cursor.lineX.opacity = 0;
      chart.cursor.lineY.opacity = 0;

      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
    }
  }
};
</script>