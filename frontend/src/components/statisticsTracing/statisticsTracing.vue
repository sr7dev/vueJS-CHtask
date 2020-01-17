<template>
  <div class="container customized" v-loading="listLoading">
    <div class="box padding-modified header statisticTracingRecord" v-if="!listLoading"></div>
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
                <el-date-picker
                  class="w-60 margin-left-10 chart-input"
                  size="small"
                  :clearable="false"
                  v-model="toYear"
                  type="year">
                </el-date-picker>
              </el-col>
              <el-col :span="3" class="margin-left-20 flex-center">
                <div class="white-colored inline-block-IE">按月</div>
                <el-select v-model="toMonth"
              class="w-60 margin-left-10 chart-input"
              size="small"
              >
                <el-option v-for="n in 12" :key="n" :label="n" :value="n"></el-option>
              </el-select>
              </el-col>
              <el-col :span="3" class="margin-left-20">
                <el-button type="primary" plain class="no-effect margin-top-reverse-5-IE" @click="refresh">开始统计</el-button>
              </el-col>
            </el-row>
            <el-container>
              <el-table :data="tableData" style="width: 100%" class="fixed-height chart-table">
                <el-table-column prop="name" width="150" label="乡镇名称" class-name="white-colored"></el-table-column>
                <el-table-column prop="cnt" label="溯源扫码数量/占比" width="400">
                  <template slot-scope="{ row }">
                    <el-progress
                      :percentage="getPercent(row.cnt, maxCnt,1)"
                      :stroke-width="10"
                      :show-text="false"
                    ></el-progress>
                  </template>
                </el-table-column>
                <el-table-column class-name="blue-colored">
                  <template slot-scope="{row}">{{row.cnt}}/{{ getPercent(row.cnt, maxCnt,1)}}%</template>
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
              <el-table-column prop="maxCnt" label="不合" width="400">
                <template slot-scope="{ row }">
                  <el-progress
                    :percentage="getPercent(row.maxCnt, row.maxCnt,1)"
                    :stroke-width="10"
                    :show-text="false"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="maxCnt" label="合格率" width="150">
                <template slot-scope="{ row }">
                  <div class="sub-title">
                    <h3 class="large-font blue-colored italic-font">{{row.maxCnt}}</h3>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="检测数量" prop="avg_maxCnt" width="150" class-name="blue-colored">
                <template slot-scope="{ row }">
                  <h1 class="large-font italic-font">{{row.avg_maxCnt}}</h1>
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
          >
            <el-row style="margin-top:60px" class="margin-left-10" v-if="tableData1[0] && tableData1[0][1]">
              <el-col :span="1" class="red-colored padding-left-10">1</el-col>

              <el-col :span="15" class="no-progress-outer red-colored">
                <el-progress
                  :percentage="tableData1[0][1] ? getPercent(tableData1[0][1], tableData1[0][1],1)-3 : 0"
                  :stroke-width="13"
                  :show-text="false"
                  style="margin-bottom: 10px"
                ></el-progress>
                <div class="white-colored">
                  <b>{{getCompanyName(tableData1[0][1])}}</b>
                </div>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>{{tableData1[0][0]}}</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30" v-if="tableData1[1] && tableData1[1][1]">
              <el-col :span="1" class="yellow-colored padding-left-10">2</el-col>

              <el-col :span="15" class="no-progress-outer yellow-colored">
                <el-progress
                  :percentage="tableData1[1][1] ? getPercent(tableData1[1][1], tableData1[0][1],1)-3 : 0"
                  :stroke-width="13"
                  :show-text="false"
                  style="margin-bottom: 10px"
                ></el-progress>
                <div class="white-colored">
                  <b>{{getCompanyName(tableData1[1][1])}}</b>
                </div>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>{{tableData1[1][0]}}</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30" v-if="tableData1[2] && tableData1[2][1]">
              <el-col :span="1" class="yellow-colored padding-left-10">3</el-col>

              <el-col :span="15" class="no-progress-outer yellow-colored">
                <el-progress
                  :percentage="tableData1[2][1] ? getPercent(tableData1[2][1], tableData1[0][1],1)-3 : 0"
                  :stroke-width="13"
                  :show-text="false"
                  style="margin-bottom: 10px"
                ></el-progress>
                <div class="white-colored">
                  <b>{{getCompanyName(tableData1[2][1])}}</b>
                </div>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>{{tableData1[2][0]}}</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30" v-if="tableData1[3] && tableData1[3][1]">
              <el-col :span="1" class="blue-colored padding-left-10">4</el-col>

              <el-col :span="15" class="no-progress-outer">
                <el-progress
                  :percentage="tableData1[3][1] ? getPercent(tableData1[3][1], tableData1[0][1],1)-3 : 0"
                  :stroke-width="13"
                  :show-text="false"
                  style="margin-bottom: 10px"
                ></el-progress>
                <div class="white-colored">
                  <b>{{getCompanyName(tableData1[3][1])}}</b>
                </div>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>{{tableData1[3][0]}}</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30" v-if="tableData1[4] && tableData1[4][1]">
              <el-col :span="1" class="blue-colored padding-left-10">5</el-col>

              <el-col :span="tableData1[4][1] ? getPercent(tableData1[4][1], tableData1[0][1],1)-3 : 0" class="no-progress-outer">
                <el-progress :percentage="80" :stroke-width="13" :show-text="false"></el-progress>
                <div class="white-colored">
                  <b>{{getCompanyName(tableData1[4][1])}}</b>
                </div>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>{{tableData1[4][0]}}</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30" v-if="tableData1[5] && tableData1[5][1]">
              <el-col :span="1" class="blue-colored padding-left-10">6</el-col>

              <el-col :span="15" class="no-progress-outer">
                <el-progress :percentage="getPercent(tableData1[5][1], tableData1[0][1],1)" :stroke-width="13" :show-text="false"></el-progress>
                <div class="white-colored">
                  <b>{{getCompanyName(tableData1[5][1])}}</b>
                </div>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>{{tableData1[5][0]}}</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30" v-if="tableData1[6] && tableData1[6][1]">
              <el-col :span="1" class="blue-colored padding-left-10">7</el-col>

              <el-col :span="15" class="no-progress-outer">
                <el-progress :percentage="getPercent(tableData1[6][1], tableData1[0][1],1)" :stroke-width="13" :show-text="false"></el-progress>
                <div class="white-colored">
                  <b>{{getCompanyName(tableData1[6][1])}}</b>
                </div>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>{{tableData1[6][0]}}</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30" v-if="tableData1[7] && tableData1[7][1]">
              <el-col :span="1" class="blue-colored padding-left-10">8</el-col>

              <el-col :span="15" class="no-progress-outer">
                <el-progress :percentage="getPercent(tableData1[7][1], tableData1[0][1],1)" :stroke-width="13" :show-text="false"></el-progress>
                <div class="white-colored">
                  <b>{{getCompanyName(tableData1[7][1])}}</b>
                </div>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>{{tableData1[7][0]}}</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30" v-if="tableData1[8] && tableData1[8][1]">
              <el-col :span="1" class="blue-colored padding-left-10">9</el-col>

              <el-col :span="15" class="no-progress-outer">
                <el-progress :percentage="getPercent(tableData1[8][1], tableData1[0][1],1)" :stroke-width="13" :show-text="false"></el-progress>
                <div class="white-colored">
                  <b>{{getCompanyName(tableData1[8][1])}}</b>
                </div>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>{{tableData1[8][0]}}</b>
                </p>
              </el-col>
            </el-row>
            <el-row class="margin-left-10 margin-top-30" v-if="tableData1[9] && tableData1[9][1]">
              <el-col :span="1" class="blue-colored padding-left-10">10</el-col>

              <el-col :span="15" class="no-progress-outer">
                <el-progress :percentage="getPercent(tableData1[9][1], tableData1[0][1],1)" :stroke-width="13" :show-text="false"></el-progress>
                <div class="white-colored">
                  <b>{{getCompanyName(tableData1[9][1])}}</b>
                </div>
              </el-col>
              <el-col :span="3">
                <p class="blue-colored italic-font">
                  <b>{{tableData1[8][0]}}</b>
                </p>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row class="w-100">
        <el-col>
          <div class="w-100 flex-box disability-chart chart-container">
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
import { log } from 'util';

export default {
  name: "statisticsTracing",
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 50
      },
      tableData: [],
      tableData1: [],
      summaryData: [],
      listLoading: false,
      maxCnt: 0,
      avg_maxCnt: 0,
      toMonth: null,
      toYear: null,
      companyList: null,
      townList: null,
      progressColor: "warning",
      is_ie: null
    };
  },
  async created() {
    this.toMonth = new Date().getMonth()+1;
    this.toYear = new Date;
    this.listLoading = true;
    await this.getCompanyList();
    await this.getTownList();
    this.getData();
  },
  mounted() {
    this.isIE();
  },
  methods: {
    refresh() {
      this.tableData= [];
      this.tableData1 = [];
      this.summaryData = [];
      this.maxCnt = 0;
      this.avg_maxCnt = 0;
      this.listLoading = true;
      this.getData();
    },
    createGrid(value, valueAxis) {
      var range = valueAxis.axisRanges.create();
      range.value = value;
      range.label.text = this.formatNumber(value);
    },
    formatNumber(value) {
      return value / 1000 + "K";
    },
    getCompanyList() {
      return Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyList = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTownList() {
      return Request()
        .get("/api/town/all")
        .then(response => {
          this.townList = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCompanyName(companyid) {
      let company = this.companyList.find(x => x.companyId === companyid);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
    async getData() {
      let tracingTimeTo;
      tracingTimeTo =
        this.toMonth && this.toYear
          ? new Date(this.toYear.getFullYear(), this.toMonth, 0)
          : new Date();
      await Request()
        .get("/api/tracing/getTracingTownStatis", {
          tracingTimeTo: tracingTimeTo
        })
        .then(response => {
          let tmpData = response.data;
          let tmpMaxCnt = 0;
          let tmpMaxCnt1 = 0;
          for (let i in tmpData) {
            let tmpTown = this.townList.find(x => x.id == tmpData[i][2]);
            tmpMaxCnt += tmpData[i][0];
            tmpMaxCnt1 += tmpData[i][1]*10000;
            this.tableData.push({
              name: tmpTown.name,
              cnt: tmpData[i][0],
              cnt1: tmpData[i][1]
            });
          }
          this.maxCnt = tmpMaxCnt;
          this.summaryData.push({
            maxCnt: tmpMaxCnt,
            avg_maxCnt: tmpMaxCnt1/10000
          });

          this.makeXYChart();
        })
        .catch(error => {
          console.log(error);
        });
      Request()
        .get("/api/tracing/getTracingCompanyStatis", {
          tracingTimeTo: tracingTimeTo
        })
        .then(response => {
          this.tableData1 = response.data;
          if (this.tableData1.length > 0)
            this.tableData1 = this.tableData1.slice(0, 10);
          setTimeout(() => {
            this.listLoading = false;
          }, 500);
        })
        .catch(error => {
          console.log(error);
        });
    },
    makeXYChart() {
      Promise.all([
        import("@amcharts/amcharts4/core"),
        import("@amcharts/amcharts4/charts"),
        import ("@amcharts/amcharts4/themes/kelly"),
        import ("@amcharts/amcharts4/themes/animated")
      ]).then((modules) => {
        const am4core = modules[0];
        const am4charts = modules[1];
        const am4themes_kelly = modules[2].default;
        const am4themes_animated = modules[3].default;
        am4core.useTheme(am4themes_kelly);
        am4core.useTheme(am4themes_animated);
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
        valueAxis.min = 0;
        valueAxis.renderer.labels.template.fill = "white";
        valueAxis.renderer.grid.template.stroke = am4core.color("#fff");
        valueAxis.renderer.line.strokeOpacity = 1;
        valueAxis.renderer.line.strokeWidth = 2;
        valueAxis.renderer.line.stroke = am4core.color("#3787ac");
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
        valueLabel.label.rotation = 0;
        valueLabel.label.truncate = false;
        valueLabel.label.dy = -7;
        valueLabel.label.fontSize = 15;
        let columnTemplate = series.columns.template;
        columnTemplate.strokeOpacity = 0;
      }).catch((e) => {
        console.error("Error when creating chart", e);
      }) 
      
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    },
    getPercent(cnt1, cnt2, type) {
      if (!cnt1 || !cnt2 || cnt2 == null || cnt1 == null) return 5;
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