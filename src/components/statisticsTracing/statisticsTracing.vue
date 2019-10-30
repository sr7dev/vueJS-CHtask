<template>
  <div class="container customized">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">溯源记录看板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box padding-modified header statisticTracingRecord"></div>
    <div class="box padding-modified body">
      <el-row class="w-100">
        <el-col :span="13">
          <div class="disability-chart chart-container padding-10 large progress-customized">
            <el-row class="w-100 flex-center margin-bottom-10">
              <el-col :span="12" class="margin-left-10 text-left">
                <h1 style="font-size:20px" class="gradient-colored" v-if="!is_ie">乡镇溯源扫码统计</h1>
                <h1 style="font-size:20px;margin-top:5px" v-else>
                  <span style="color:#255ee3;opacity:0.8">乡镇</span>
                  <span style="color:#20beff;opacity:0.7">溯源扫码统计</span>
                </h1>
              </el-col>
              <el-col :span="4" class="margin-left-auto flex-center">
                <div class="white-colored inline-block-IE">按年</div>
                <el-input
                  v-model="toYear"
                  class="w-50 margin-left-10 chart-input"
                  size="small"
                  type="number"
                ></el-input>
              </el-col>
              <el-col :span="3" class="margin-left-20 flex-center">
                <div class="white-colored inline-block-IE">按月</div>
                <el-input
                  v-model="toMonth"
                  class="w-50 margin-left-10 chart-input"
                  size="small"
                  type="number"
                ></el-input>
              </el-col>
              <el-col :span="3" class="margin-left-20">
                <el-button type="primary" plain class="no-effect margin-top-reverse-5-IE">开始统计</el-button>
              </el-col>
            </el-row>
            <el-container>
              <el-table
                :data="tableData"
                style="width: 100%"
                class="fixed-height chart-table"
                v-loading="listLoading"
              >
                <el-table-column prop="name" width="150" label="乡镇名称" class-name="white-colored"></el-table-column>
                <el-table-column prop="cnt" label="溯源扫码数量/占比" width="400">
                  <template slot-scope="{ row }">
                    <el-progress
                      :percentage="getPercent(row.cnt, 5000,1)"
                      :stroke-width="10"
                      :show-text="false"
                    ></el-progress>
                  </template>
                </el-table-column>
                <el-table-column class-name="blue-colored">
                  <template slot-scope="{row}">{{row.cnt}}/10%</template>
                </el-table-column>
                <el-table-column
                  prop="cnt1"
                  label="打码评价数量"
                  class-name="padding-left-20 blue-colored"
                  width="150"
                ></el-table-column>
              </el-table>
            </el-container>
            <el-table
              :data="summaryData"
              :show-header="false"
              row-class-name="success-row"
              class="border-hide chart-table"
            >
              <el-table-column prop="name" label="站点" width="130" class-name="white-colored">
                <template>
                  <b>合计</b>
                </template>
              </el-table-column>
              <el-table-column
                prop="rowTotalSum"
                label="不合"
                width="400"
                class-name="hidden-progress-inner"
              >
                <template>
                  <el-progress
                    :percentage="0"
                    :stroke-width="10"
                    :status="progressColor"
                    :show-text="false"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="合格率" width="150">
                <template>
                  <div class="sub-title">
                    <h3 class="large-font blue-colored italic-font">22922</h3>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="检测数量"
                prop="rowTotalSum"
                width="150"
                class-name="blue-colored"
              >
                <template>
                  <h1 class="large-font italic-font">10045</h1>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="11" class="position-relative">
          <h1
            style="font-size:20px"
            class="gradient-colored chart-title margin-left-10"
            v-if="!is_ie"
          >企业溯源扫码排行TOP10</h1>
          <h1 style="font-size:20px" v-else class="margin-left-10 chart-title">
            <span style="color:#255ee3;opacity:0.8">企业溯</span>
            <span style="color:#20beff;opacity:0.7">源扫码排行TOP10</span>
          </h1>
          <div
            class="disability-chart chart-container margin-left-10 large progress-customized"
            ref="chartdiv1"
            v-loading="listLoading"
          >
            <el-row style="margin-top:60px" class="margin-left-10">
              <el-col :span="2" class="red-colored padding-left-10">1</el-col>
              <el-col :span="4" class="white-colored">
                <b>福鼎白茶</b>
              </el-col>
              <el-col :span="15" class="no-progress-outer red-colored">
                <el-progress :percentage="95" :stroke-width="13" :show-text="false"></el-progress>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>6000</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30">
              <el-col :span="2" class="yellow-colored padding-left-10">2</el-col>
              <el-col :span="4" class="white-colored">
                <b>阳山水蜜桃</b>
              </el-col>
              <el-col :span="15" class="no-progress-outer yellow-colored">
                <el-progress :percentage="90" :stroke-width="13" :show-text="false"></el-progress>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>5000</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30">
              <el-col :span="2" class="yellow-colored padding-left-10">3</el-col>
              <el-col :span="4" class="white-colored">
                <b>福鼎白茶</b>
              </el-col>
              <el-col :span="15" class="no-progress-outer yellow-colored">
                <el-progress :percentage="86" :stroke-width="13" :show-text="false"></el-progress>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>4000</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30">
              <el-col :span="2" class="blue-colored padding-left-10">4</el-col>
              <el-col :span="4" class="white-colored">
                <b>阳山水蜜桃</b>
              </el-col>
              <el-col :span="15" class="no-progress-outer">
                <el-progress :percentage="83" :stroke-width="13" :show-text="false"></el-progress>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>3500</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30">
              <el-col :span="2" class="blue-colored padding-left-10">5</el-col>
              <el-col :span="4" class="white-colored">
                <b>福鼎白茶</b>
              </el-col>
              <el-col :span="15" class="no-progress-outer">
                <el-progress :percentage="80" :stroke-width="13" :show-text="false"></el-progress>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>3200</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30">
              <el-col :span="2" class="blue-colored padding-left-10">6</el-col>
              <el-col :span="4" class="white-colored">
                <b>阳山水蜜桃</b>
              </el-col>
              <el-col :span="15" class="no-progress-outer">
                <el-progress :percentage="78" :stroke-width="13" :show-text="false"></el-progress>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>3000</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30">
              <el-col :span="2" class="blue-colored padding-left-10">7</el-col>
              <el-col :span="4" class="white-colored">
                <b>福鼎白茶</b>
              </el-col>
              <el-col :span="15" class="no-progress-outer">
                <el-progress :percentage="76" :stroke-width="13" :show-text="false"></el-progress>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>2800</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30">
              <el-col :span="2" class="blue-colored padding-left-10">8</el-col>
              <el-col :span="4" class="white-colored">
                <b>阳山水蜜桃</b>
              </el-col>
              <el-col :span="15" class="no-progress-outer">
                <el-progress :percentage="74" :stroke-width="13" :show-text="false"></el-progress>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>2600</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30">
              <el-col :span="2" class="blue-colored padding-left-10">9</el-col>
              <el-col :span="4" class="white-colored">
                <b>福鼎白茶</b>
              </el-col>
              <el-col :span="15" class="no-progress-outer">
                <el-progress :percentage="72" :stroke-width="13" :show-text="false"></el-progress>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>2000</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30">
              <el-col :span="2" class="blue-colored padding-left-10">10</el-col>
              <el-col :span="4" class="white-colored">
                <b>阳山水蜜桃</b>
              </el-col>
              <el-col :span="15" class="no-progress-outer">
                <el-progress :percentage="70" :stroke-width="13" :show-text="false"></el-progress>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>6000</b>
                </p>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row class="w-100">
        <el-col>
          <div class="w-100 flex-box disability-chart chart-container" v-loading="lineChartLoading">
            <h1
              style="font-size:20px"
              class="gradient-colored chart-title"
              v-if="!is_ie"
            >各乡镇溯源扫码数据统计</h1>
            <h1 style="font-size:20px" v-else class="margin-left-10 chart-title">
              <span style="color:#255ee3;opacity:0.8">各乡</span>
              <span style="color:#20beff;opacity:0.7">镇溯源扫码数据统计</span>
            </h1>
            <div class="w-100 inline-block-IE chart-div-IE" ref="chartdiv"></div>
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
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import data from "./data.js";

am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);

export default {
  name: "statisticsTracing",
  // components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 50
      },
      tableData: data,
      tableDataByCnt: [],
      summaryData: [
        {
          region: "South",
          state: "福鼎白茶",
          sales: 6000
        }
      ],
      listLoading: false,
      lineChartLoading: false,
      lineChartData: [],
      toYear: null,
      toMonth: null,
      maxCnt: null,
      progressColor: "warning",
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
      chartData: [
        {
          region: "South",
          state: "福鼎白茶",
          sales: 6000
        },
        {
          region: "South",
          state: "福鼎白茶1",
          sales: 5000
        },
        {
          region: "South",
          state: "福鼎白茶2",
          sales: 4000
        },
        {
          region: "South",
          state: "福鼎白茶3",
          sales: 3500
        },
        {
          region: "South",
          state: "福鼎白茶4",
          sales: 3200
        },
        {
          region: "South",
          state: "福鼎白茶5",
          sales: 3000
        },
        {
          region: "South",
          state: "福鼎白茶6",
          sales: 2800
        },
        {
          region: "South",
          state: "福鼎白茶7",
          sales: 2600
        },
        {
          region: "South",
          state: "福鼎白茶8",
          sales: 2000
        },
        {
          region: "South",
          state: "福鼎白茶9",
          sales: 1500
        }
      ],
      is_ie: null
    };
  },
  mounted() {
    this.isIE();
    this.makeXYChart();
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
          detectTimeTo: detectTimeTo,
          sortBy: "detect_unit"
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
              cnt: parseInt(tmpData[index][1]),
              cnt_ok: parseInt(tmpData[index][2])
            });
            rowTotalSum = rowTotalSum + parseInt(tmpData[index][1]);
            rowOkSum = rowOkSum + parseInt(tmpData[index][2]);
          }
          if (
            this.summaryData.rowTotalSum !== rowTotalSum &&
            this.summaryData.rowOkSum !== rowOkSum
          ) {
            this.summaryData.push({
              name: "合计",
              rowTotalSum: rowTotalSum,
              rowOkSum: rowOkSum
            });
          }
          this.makeBarChart();
        })
        .catch(error => {
          console.log(error);
        });
      Request()
        .get("/api/disability_check/statis", {
          detectTimeTo: detectTimeTo,
          sortBy: "cnt"
        })
        .then(response => {
          this.listLoading = false;
          this.tableDataByCnt = [];
          this.maxCnt = null;
          let tmpData = response.data;
          for (let index in tmpData) {
            this.tableDataByCnt.push({
              detect_unit: tmpData[index][0],
              cnt: tmpData[index][1],
              cnt_ok: tmpData[index][2]
            });
          }
          this.makeXYChart();
        })
        .catch(error => {
          console.log(error);
        });
    },
    makeXYChart() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      chart.data = this.tableData;
      chart.marginTop = 20;
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      let title = chart.titles.create();
      title.text = "tmp";
      title.fontSize = 5;
      title.marginBottom = 40;
      title.fill = am4core.color("#012f8a");

      categoryAxis.dataFields.category = "name";
      categoryAxis.renderer.grid.template.location = 0;

      categoryAxis.renderer.minGridDistance = 10;
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
      valueAxis.renderer.labels.template.fill = "white";
      valueAxis.renderer.grid.template.stroke = am4core.color("#fff");
      valueAxis.renderer.line.strokeOpacity = 1;
      valueAxis.renderer.line.strokeWidth = 2;
      valueAxis.renderer.line.stroke = am4core.color("#3787ac");
      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "cnt";
      series.dataFields.categoryX = "name";
      series.name = "cnt";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = 1;
      var gradient = new am4core.LinearGradient();
      gradient.addColor(am4core.color("#08d3fc"));
      gradient.addColor(am4core.color("#4687eb"));
      gradient.rotation = 90;
      series.fill = gradient;
      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{cnt}";
      valueLabel.label.fill = am4core.color("#20beff");
      valueLabel.label.rotation = -45;
      valueLabel.label.dy = -20;
      let columnTemplate = series.columns.template;
      columnTemplate.strokeOpacity = 0;
    },
    makeBarChart() {
      let chart = am4core.create(this.$refs.chartdiv1, am4charts.XYChart);

      // Add data
      chart.data = this.chartData;
      // Create axes
      let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      let title = chart.titles.create();
      title.text = "各站点上传数据统计";
      title.fontSize = 5;
      title.marginBottom = 30;
      title.fill = am4core.color("#012f8a");
      yAxis.dataFields.category = "state";
      yAxis.renderer.grid.template.location = 0;
      yAxis.renderer.labels.template.fontSize = 16;
      yAxis.renderer.minGridDistance = 3;
      yAxis.renderer.labels.template.fill = "white";
      let xAxis = chart.xAxes.push(new am4charts.ValueAxis());

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = "sales";
      series.dataFields.categoryY = "state";
      series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
      series.columns.template.strokeWidth = 0;
      series.columns.template.adapter.add("fill", function(fill, target) {
        if (target.dataItem) {
          if (target.dataItem.dataContext.region == "Central") {
            return chart.colors.getIndex(0);
          } else {
            return chart.colors.getIndex(2);
          }
        }
        return fill;
      });
      series.height = 10;
      chart.cursor = new am4charts.XYCursor();
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
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      this.is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    }
  }
};
</script>