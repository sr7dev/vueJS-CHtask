<template>
  <div class="container customized">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">农残检测看板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box padding-modified header statisticFarmerHeader"></div>
    <div class="box padding-modified body">
      <el-row class="w-100">
        <el-col :span="14">
          <div class="disability-chart chart-container padding-10 large">
            <el-row class="w-100 flex-center margin-bottom-10">
              <el-col :span="12" class="margin-left-10 text-left">
                <h1 style="font-size:20px" class="gradient-colored" v-if="!is_ie">农残监测统计</h1>
                <h1 style="font-size:20px;margin-top:5px" v-else>
                  <span style="color:#255ee3;opacity:0.8">农残</span>
                  <span style="color:#20beff;opacity:0.7">监测统计</span>
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
                <el-button
                  type="primary"
                  plain
                  @click="getData()"
                  class="no-effect margin-top-reverse-5-IE"
                >开始统计</el-button>
              </el-col>
            </el-row>
            <el-container>
              <el-table
                :data="tableData"
                style="width: 100%"
                class="fixed-height chart-table"
                v-loading="listLoading"
              >
                <el-table-column prop="detect_unit" label="站点" class-name="white-colored"></el-table-column>
                <el-table-column prop="cnt" label="检测数量">
                  <template slot-scope="{ row }">
                    <div class="sub-title">
                      <h3 class="blue-colored">{{row.cnt}}</h3>
                    </div>
                    <el-progress
                      :percentage="getPercent(row.cnt,maxCnt,1)"
                      :stroke-width="10"
                      :show-text="false"
                    ></el-progress>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="cnt_ok"
                  label="合格"
                  class-name="padding-left-20 blue-colored"
                  width="100"
                ></el-table-column>
                <el-table-column prop="cnt_ok" label="不合格" width="100" class-name="blue-colored">
                  <template slot-scope="{row}">{{row.cnt-row.cnt_ok}}</template>
                </el-table-column>
                <el-table-column prop="cnt" label="合格率" class-name="padding-right-20">
                  <template slot-scope="{ row }">
                    <div class="sub-title">
                      <h3 class="blue-colored">{{parseInt(row.cnt_ok/row.cnt*100)}}%</h3>
                    </div>
                    <el-progress
                      :percentage="parseInt(row.cnt_ok/row.cnt*100)"
                      :stroke-width="10"
                      :status="getColor(parseInt(row.cnt_ok/row.cnt*100))"
                      :show-text="false"
                    ></el-progress>
                  </template>
                </el-table-column>
              </el-table>
            </el-container>
            <el-table
              v-if="summaryData"
              :data="summaryData"
              :show-header="false"
              row-class-name="success-row"
              class="border-hide chart-table"
            >
              <el-table-column prop="name" label="站点" class-name="white-colored">
                <template slot-scope="{row}">
                  <b>{{row.name}}</b>
                </template>
              </el-table-column>
              <el-table-column
                label="检测数量"
                prop="rowTotalSum"
                class-name="blue-colored text-center"
              >
                <template slot-scope="{row}">
                  <h1 class="large-font italic-font">{{row.rowTotalSum}}</h1>
                </template>
              </el-table-column>
              <el-table-column
                prop="rowOkSum"
                label="合格"
                class-name="padding-left-20 blue-colored text-center"
              >
                <template slot-scope="{row}">
                  <h1 class="large-font italic-font">{{row.rowOkSum}}</h1>
                </template>
              </el-table-column>
              <el-table-column label="不合格" prop="rowOkSum" class-name="blue-colored text-center">
                <template slot-scope="{row}">
                  <h1 class="large-font italic-font">{{row.rowTotalSum-row.rowOkSum}}</h1>
                </template>
              </el-table-column>
              <el-table-column prop="rowTotalSum" label="不合">
                <template slot-scope="{ row }">
                  <el-progress
                    v-if="row.rowTotalSum"
                    :percentage="getPercent(row.rowOkSum, row.rowTotalSum,1)"
                    :stroke-width="10"
                    :status="getColor(parseInt(row.rowOkSum/row.rowTotalSum*100))"
                    :show-text="false"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="合格率" width="100">
                <template slot-scope="{ row }">
                  <div class="sub-title">
                    <h3
                      class="large-font blue-colored italic-font"
                    >{{getPercent(row.rowOkSum, row.rowTotalSum,2)}}%</h3>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="10" class="position-relative">
          <h1
            style="font-size:20px"
            class="gradient-colored chart-title margin-left-10"
            v-if="!is_ie"
          >各站点衣残捡测上传数据统计</h1>
          <h1 style="font-size:20px" v-else class="margin-left-10 chart-title">
            <span style="color:#255ee3;opacity:0.8">各站点衣残</span>
            <span style="color:#20beff;opacity:0.7">捡测上传数据统计</span>
          </h1>
          <div
            class="disability-chart chart-container margin-left-10 large"
            ref="chartdiv1"
            v-loading="listLoading"
          ></div>
        </el-col>
      </el-row>
      <el-row class="w-100">
        <el-col>
          <div class="w-100 flex-box disability-chart chart-container" v-loading="lineChartLoading">
            <h1
              style="font-size:20px"
              class="gradient-colored chart-title"
              v-if="!is_ie"
            >各站点衣残捡测上传数据的比例分布</h1>
            <h1 style="font-size:20px" v-else class="margin-left-10 chart-title">
              <span style="color:#255ee3;opacity:0.8">各站点衣残捡测</span>
              <span style="color:#20beff;opacity:0.7">上传数据的比例分布</span>
            </h1>
            <div class="w-50 inline-block-IE chart-div-IE" ref="chartdiv"></div>
            <div class="divider inline-block-IE divider-IE"></div>
            <div class="w-50 inline-block-IE chart-div-IE" ref="chartdiv2"></div>
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
      tableDataByCnt: [],
      summaryData: [],
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
      is_ie: null
    };
  },
  created() {
    this.isIE();
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
          this.makePieChart();
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
      chart.data = this.tableDataByCnt;
      chart.marginTop = 20;
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      let title = chart.titles.create();
      title.text = "tmp";
      title.fontSize = 5;
      title.marginBottom = 40;
      title.fill = am4core.color("#012f8a");

      categoryAxis.dataFields.category = "detect_unit";
      categoryAxis.renderer.grid.template.location = 0;

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
      // valueAxis.renderer.grid.template.disabled = true;
      // valueAxis.renderer.labels.template.disabled = true;
      valueAxis.renderer.labels.template.fill = "white";
      valueAxis.renderer.grid.template.stroke = am4core.color("#fff");
      valueAxis.renderer.line.strokeOpacity = 1;
      valueAxis.renderer.line.strokeWidth = 2;
      valueAxis.renderer.line.stroke = am4core.color("#3787ac");
      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "cnt";
      series.dataFields.categoryX = "detect_unit";
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
      valueLabel.label.dy = -10;
      let columnTemplate = series.columns.template;
      columnTemplate.strokeOpacity = 0;
      // this.createGrid(0, valueAxis);
      // this.createGrid(5000, valueAxis);
      // this.createGrid(10000, valueAxis);
      // this.createGrid(15000, valueAxis);
    },
    makePieChart() {
      let chart = am4core.create(this.$refs.chartdiv1, am4charts.PieChart);
      chart.data = this.tableData;
      chart.responsive.enabled = true;
      chart.width = am4core.percent(55);
      chart.height = am4core.percent(100);
      chart.align = "center";
      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());

      pieSeries.dataFields.value = "cnt";
      pieSeries.dataFields.category = "detect_unit";
      pieSeries.dataFields.radiusValue = "cnt";
      pieSeries.labels.template.truncate = true;
      pieSeries.labels.template.fontSize = 15;
      pieSeries.labels.template.maxWidth = 180;
      pieSeries.labels.template.fill = "white";
      pieSeries.labels.template.text =
        "[bold '#20beff']{value.percent.formatNumber('#.0')}%[/] {category}";

      pieSeries.ticks.template.strokeWidth = 1;
      pieSeries.ticks.template.strokeOpacity = 0.7;
      pieSeries.ticks.template.fill = am4core.color("#012f8a");
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
    async makeLineChart() {
      await this.getLineChartData();
      let chart = am4core.create(this.$refs.chartdiv2, am4charts.XYChart);
      chart.data = this.lineChartData;
      let title = chart.titles.create();
      title.text = "tmp";
      title.fontSize = 5;
      title.marginBottom = 40;
      title.fill = am4core.color("#012f8a");

      let label = chart.createChild(am4core.Label);
      label.text = "最近12个月每月上传数据统计";
      label.fontSize = 16;
      label.fill = "white";
      label.fontWeight = "bold";
      label.align = "center";
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.ticks.template.disabled = true;
      categoryAxis.renderer.line.strokeOpacity = 1;
      categoryAxis.renderer.line.strokeWidth = 2;
      categoryAxis.renderer.line.stroke = am4core.color("#3787ac");
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.labels.template.fill = "white";
      categoryAxis.renderer.minGridDistance = 40;
      categoryAxis.dataFields.category = "month";
      categoryAxis.startLocation = 0.4;
      categoryAxis.endLocation = 0.6;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      // valueAxis.title.text = "镇农产品质量安全董监管站(管站)";
      valueAxis.renderer.line.strokeOpacity = 1;
      valueAxis.renderer.line.strokeWidth = 2;
      valueAxis.renderer.line.stroke = am4core.color("#3787ac");
      valueAxis.renderer.labels.template.fill = "white";
      valueAxis.renderer.grid.template.stroke = am4core.color("#fff");
      valueAxis.renderer.ticks.template.disabled = true;
      valueAxis.min = 0;
      // valueAxis.max = 1700;

      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.categoryX = "month";
      lineSeries.dataFields.valueY = "totalCnt";
      lineSeries.tooltipText = "数量: {valueY.value}";
      lineSeries.fillOpacity = 0.2;
      lineSeries.stroke = am4core.color("#20beff");
      lineSeries.strokeWidth = 3;
      lineSeries.fill = am4core.color("#90bff2");

      let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
      bullet.circle.radius = 3;
      bullet.circle.stroke = am4core.color("#20beff");
      bullet.circle.fill = am4core.color("#20beff");
      bullet.circle.strokeWidth = 3;

      let labelBullet = lineSeries.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = "{totalCnt}";
      labelBullet.label.fill = am4core.color("#20beff");
      labelBullet.label.dy = -20;

      chart.cursor = new am4charts.XYCursor();
      // chart.cursor.behavior = "panX";
      // chart.cursor.lineX.opacity = 0;
      // chart.cursor.lineY.opacity = 0;

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
    },
    getColor(percent) {
      if (percent === 100) return "success";
      return "warning";
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      this.is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    }
  }
};
</script>