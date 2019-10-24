<template>
  <div class="container customized">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">农残检测看板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box padding-modified">
      <el-row class="w-100">
        <el-col :span="14">
          <div class="disability-chart chart-container">
            <el-row class="w-100 flex-center margin-top-10 margin-bottom-10">
              <el-col :span="4" class="margin-left-10">
                <h1 style="font-size:20px">农残监测统计</h1>
              </el-col>
              <el-col :span="4" class="margin-left-auto flex-center">
                <div>按年</div>
                <el-input v-model="toYear" class="w-50 margin-left-10" size="small" type="number"></el-input>
              </el-col>
              <el-col :span="3" class="margin-left-20 flex-center">
                <div>按月</div>
                <el-input v-model="toMonth" class="w-50 margin-left-10" size="small" type="number"></el-input>
              </el-col>
              <el-col :span="3" class="margin-left-20">
                <el-button size="small" type="primary" plain @click="getData()">开始统计</el-button>
              </el-col>
            </el-row>
            <el-container>
              <el-table
                :data="tableData"
                style="width: 100%"
                class="fixed-height"
                v-loading="listLoading"
              >
                <el-table-column prop="detect_unit" label="站点"></el-table-column>
                <el-table-column prop="cnt" label="检测数量">
                  <template slot-scope="{ row }">
                    <div class="sub-title">
                      <h3>{{row.cnt}}</h3>
                    </div>
                    <el-progress
                      :percentage="getPercent(row.cnt, maxCnt,1)"
                      :stroke-width="10"
                      :width="50"
                      :show-text="false"
                    ></el-progress>
                  </template>
                </el-table-column>
                <el-table-column prop="cnt_ok" label="合格" class-name="padding-left-20"></el-table-column>
                <el-table-column prop="cnt_ok" label="不合格">
                  <template slot-scope="{row}">{{row.cnt-row.cnt_ok}}</template>
                </el-table-column>
                <el-table-column prop="cnt" label="合格率" class-name="padding-right-20">
                  <template slot-scope="{ row }">
                    <div class="sub-title">
                      <h3>{{getPercent(row.cnt_ok, row.cnt,2)}}%</h3>
                    </div>
                    <el-progress
                      :percentage="getPercent(row.cnt_ok, row.cnt,2)"
                      :stroke-width="10"
                      :status="progressColor"
                      :show-text="false"
                    ></el-progress>
                  </template>
                </el-table-column>
              </el-table>
            </el-container>
            <el-table
              :data="summaryData"
              :show-header="false"
              row-class-name="success-row"
              class="border-curved"
              v-if="summaryData"
            >
              <el-table-column prop="name" label="站点"></el-table-column>
              <el-table-column label="检测数量"></el-table-column>
              <el-table-column prop="rowTotalSum" label="合格" class-name="padding-left-20"></el-table-column>
              <el-table-column prop="rowOkSum" label="不合格"></el-table-column>
              <el-table-column prop="name" label="合格率" class-name="padding-right-20">
                <template slot-scope="{ row }">
                  <div class="sub-title">
                    <h3>{{getPercent(row.rowOkSum, row.rowTotalSum,2)}}%</h3>
                  </div>
                  <el-progress
                    :percentage="getPercent(row.rowOkSum, row.rowTotalSum,2)"
                    :stroke-width="10"
                    :status="progressColor"
                    :show-text="false"
                  ></el-progress>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="10">
          <div
            class="disability-chart chart-container margin-left-10"
            ref="chartdiv1"
            v-loading="listLoading"
          ></div>
        </el-col>
      </el-row>
      <el-row class="w-100">
        <el-col>
          <div class="w-100 flex-box disability-chart chart-container">
            <div class="w-50" ref="chartdiv" v-loading="listLoading"></div>
            <div class="divider"></div>
            <div class="w-50" ref="chartdiv2" v-loading="lineChartLoading"></div>
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
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import chartData from "./chartData1";
// import chartData1 from "./chartData2";
am4core.useTheme(am4themes_animated);

export default {
  name: "statisticsFarmers",
  // components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 50
      },
      tableData: [],
      summaryData: [],
      listLoading: false,
      lineChartLoading: false,
      lineChartData: [],
      toYear: null,
      toMonth: null,
      maxCnt: null,
      progressColor: ""
    };
  },
  created() {
    this.getData();
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
    getData() {
      this.listLoading = true;
      let detectTimeTo;
      if (this.toYear && this.toMonth) {
        detectTimeTo = new Date(this.toYear, this.toMonth, 0);
      } else {
        detectTimeTo = new Date();
      }
      Request()
        .get("/api/disability_check/statis", {
          detectTimeTo: detectTimeTo
        })
        .then(response => {
          this.listLoading = false;
          this.tableData = [];
          this.maxCnt = null;
          let tmpData = response.data;
          let rowTotalSum = 0;
          let rowOkSum = 0;
          for (let index in tmpData) {
            if (tmpData[index][1] > this.maxCnt) {
              this.maxCnt = tmpData[index][1];
            }
            this.tableData.push({
              detect_unit: tmpData[index][0],
              cnt: tmpData[index][1],
              cnt_ok: tmpData[index][2]
            });
            rowTotalSum = rowTotalSum + parseInt(tmpData[index][1]);
            rowOkSum = rowOkSum + parseInt(tmpData[index][2]);
          }
          this.summaryData = [];

          this.summaryData.push({
            name: "合计",
            rowTotalSum: rowTotalSum,
            rowOkSum: rowOkSum
          });
          this.makeXYChart();
          this.makePieChart();
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getLineChartData() {
      this.lineChartData = [];
      this.lineChartLoading = true;
      for (let i = 11; i >= 0; i--) {
        let tmpDate = new Date();
        tmpDate.setMonth(tmpDate.getMonth() - i);
        let yearNo = tmpDate.getFullYear();
        let monthNo = tmpDate.getMonth();
        let fromDate = new Date(yearNo, monthNo, 1);
        let toDate = new Date(yearNo, monthNo + 1, 0);
        await Request()
          .get("/api/disability_check/statis", {
            detectTimeFrom: fromDate,
            detectTimeTo: toDate
          })
          .then(response => {
            let tmpData = response.data;
            let rowTotalSum = 0;
            for (let index in tmpData) {
              rowTotalSum = rowTotalSum + parseInt(tmpData[index][1]);
            }
            monthNo = monthNo + 1;
            this.lineChartData.push({
              month: yearNo + "-" + monthNo,
              totalCnt: rowTotalSum
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    makeXYChart() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      chart.data = this.tableData;
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      let title = chart.titles.create();
      title.text = "各站点衣残捡测上传数据的比例分布";
      title.fontSize = 20;
      title.marginBottom = 30;

      title.fontWeight = "bold";
      title.align = "left";
      categoryAxis.dataFields.category = "detect_unit";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.rotation = -45;
      categoryAxis.renderer.labels.template.truncate = true;
      categoryAxis.renderer.labels.template.maxWidth = 120;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis.title.text = "镇农产品质量安全董监管站(管站)";
      valueAxis.min = 0;
      // valueAxis.max = 15000;
      // valueAxis.renderer.minGridDistance = 5;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "cnt";
      series.dataFields.categoryX = "detect_unit";
      series.name = "cnt";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = 1;
      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{cnt}";
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
    makePieChart() {
      let chart = am4core.create(this.$refs.chartdiv1, am4charts.PieChart);
      chart.data = this.tableData;
      chart.responsive.enabled = true;
      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      let title = chart.titles.create();
      title.text = "各站点衣残捡测上传数据统计";
      title.align = "left";
      title.fontSize = 20;
      title.marginLeft = 20;
      title.marginBottom = -20;
      title.marginTop = 10;
      title.fontWeight = "bold";
      // pieSeries.radius = 100;
      pieSeries.dataFields.value = "cnt";
      pieSeries.dataFields.category = "detect_unit";
      pieSeries.dataFields.radiusValue = "cnt";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    },
    async makeLineChart() {
      await this.getLineChartData();
      let chart = am4core.create(this.$refs.chartdiv2, am4charts.XYChart);
      chart.data = this.lineChartData;
      let label = chart.createChild(am4core.Label);
      label.text = "最近12个月每月上传数据统计";
      label.fontSize = 16;
      label.fontWeight = "bold";
      label.align = "center";
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.ticks.template.disabled = true;
      categoryAxis.renderer.line.opacity = 0;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.minGridDistance = 40;
      categoryAxis.dataFields.category = "month";
      categoryAxis.startLocation = 0.4;
      categoryAxis.endLocation = 0.6;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      // valueAxis.title.text = "镇农产品质量安全董监管站(管站)";
      valueAxis.renderer.line.opacity = 0;
      valueAxis.renderer.ticks.template.disabled = true;
      valueAxis.min = 0;
      // valueAxis.max = 1700;

      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.categoryX = "month";
      lineSeries.dataFields.valueY = "totalCnt";
      lineSeries.tooltipText = "数量: {valueY.value}";
      lineSeries.fillOpacity = 0.6;
      lineSeries.stroke = am4core.color("#2381e4");
      lineSeries.strokeWidth = 3;
      lineSeries.fill = am4core.color("#90bff2");

      let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
      bullet.circle.radius = 3;
      bullet.circle.stroke = am4core.color("#2381e4");
      bullet.circle.fill = am4core.color("#2381e4");
      bullet.circle.strokeWidth = 3;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "panX";
      chart.cursor.lineX.opacity = 0;
      chart.cursor.lineY.opacity = 0;

      chart.scrollbarX = new am4core.Scrollbar();
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      this.chart = chart;
      this.lineChartLoading = false;
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    },
    getPercent(cnt1, cnt2, type) {
      if (!cnt1 || !cnt2) return 0;
      if (type === 2) {
        this.progressColor =
          parseInt((cnt1 / cnt2) * 100) < 100 ? "warning" : "success";
      }
      return parseInt((cnt1 / cnt2) * 100);
    }
  }
};
</script>