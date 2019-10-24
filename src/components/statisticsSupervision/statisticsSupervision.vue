<template>
  <div class="container customized">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管记录看板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box padding-modified" v-loading="listLoading">
      <el-row class="W-100">
        <el-col :span="14">
          <div class="disability-chart chart-container">
            <el-row class="w-100 flex-center margin-top-10 margin-bottom-10">
              <el-col :span="5" class="margin-left-10">
                <h1>监管记录统计</h1>
              </el-col>
              <el-col :span="7" class="margin-left-20 flex-center">
                <div class="select_label no-margin-left">开始日期</div>
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="createTimeFrom"
                  style="width: 300px;"
                ></el-date-picker>
              </el-col>
              <el-col :span="7" class="margin-left-20 flex-center">
                <div class="select_label no-margin-left">结束日期</div>
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="createTimeTo"
                  style="width: 300px;"
                ></el-date-picker>
              </el-col>
              <el-col :span="5" class="margin-left-20">
                <el-button size="small" type="primary" plain @click="getData()">开始统计</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-container>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  highlight-current-row
                  class="fixed-height"
                >
                  <el-table-column prop="townName" label="乡镇名称" width="120"></el-table-column>
                  <el-table-column prop="townCnt" label="监管记录数量"></el-table-column>
                  <el-table-column prop="townCnt2" label="整改记录数量"></el-table-column>
                  <el-table-column prop="rate" label="不合格数量"></el-table-column>
                  <el-table-column prop="progress" label="不合格占比">
                    <template slot-scope="{ row }">
                      <div class="sub-title">
                        <h3>{{row.progress}}%</h3>
                      </div>
                      <el-progress
                        :percentage="row.progress"
                        :stroke-width="10"
                        :status="getColor(row.progress)"
                        :show-text="false"
                      ></el-progress>
                    </template>
                  </el-table-column>
                </el-table>
              </el-container>
            </el-row>
            <el-row>
              <el-container>
                <el-table
                  :data="totalData"
                  style="width: 100%"
                  :show-header="false"
                  class="border-curved"
                  row-class-name="success-row"
                >
                  <el-table-column prop="townName" width="120"></el-table-column>
                  <el-table-column prop="townCnt"></el-table-column>
                  <el-table-column prop="townCnt2"></el-table-column>
                  <el-table-column prop="rate"></el-table-column>
                  <el-table-column prop="progress">
                    <template slot-scope="{ row }">
                      <div class="sub-title">
                        <h3>{{row.progress}}</h3>
                      </div>
                      <el-progress
                        :percentage="row.progress * 100"
                        :stroke-width="10"
                        :status="getColor(row.progress * 100)"
                        :show-text="false"
                      ></el-progress>
                    </template>
                  </el-table-column>
                </el-table>
              </el-container>
            </el-row>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="disability-chart chart-container margin-left-10" ref="chartpie"></div>
        </el-col>
      </el-row>
      <el-row class="W-100">
        <el-col>
          <div class="w-100 flex-box disability-chart chart-container">
            <div class="w-50" ref="chartpie2"></div>
            <div class="divider"></div>
            <div class="w-50">
              <el-row v-if="specialData1 !== null && specialData1.length > 0">
                <el-col align="center" class="margin-top-10" style="font-size: 20px;">
                  <h1>绿色优质数量/占比</h1>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-container>
                    <el-table
                      :data="specialData1"
                      style="width: 100%; height: 293px;"
                      :show-header="false"
                      v-if="specialData1 !== null && specialData1.length > 0"
                      class="fixed-height margin-top-10 padding-left-20 padding-right-20"
                    >
                      <el-table-column prop="townName" width="70" class-name="no-border-bottom"></el-table-column>
                      <el-table-column prop="progress" class-name="no-border-bottom">
                        <template slot-scope="{ row }">
                          <div>
                            <h3>{{row.townCnt}}</h3>
                          </div>
                          <el-progress
                            :percentage="row.progress"
                            :stroke-width="10"
                            :status="getColor(row.progress)"
                            :show-text="false"
                          ></el-progress>
                        </template>
                      </el-table-column>
                      <el-table-column prop="label" class-name="no-border-bottom"></el-table-column>
                    </el-table>
                  </el-container>
                </el-col>
                <el-col :span="12">
                  <el-container>
                    <el-table
                      :data="specialData2"
                      style="width: 100%; height: 293px;"
                      :show-header="false"
                      v-if="specialData2 !== null && specialData2.length > 0"
                      class="fixed-height margin-top-10 padding-left-20 padding-right-20"
                    >
                      <el-table-column prop="townName" width="70" class-name="no-border-bottom"></el-table-column>
                      <el-table-column prop="progress" class-name="no-border-bottom">
                        <template slot-scope="{ row }">
                          <div>
                            <h3>{{row.townCnt}}</h3>
                          </div>
                          <el-progress
                            :percentage="row.progress"
                            :stroke-width="10"
                            :status="getColor(row.progress)"
                            :show-text="false"
                          ></el-progress>
                        </template>
                      </el-table-column>
                      <el-table-column prop="label" class-name="no-border-bottom"></el-table-column>
                    </el-table>
                  </el-container>
                </el-col>
              </el-row>
              <el-row>
                <el-container>
                  <el-table
                    :data="totalData"
                    style="width: 100%"
                    :show-header="false"
                    class="border-curved"
                    v-if="totalData !== null && totalData.length > 0"
                  >
                    <el-table-column prop="townName" align="center" width="120"></el-table-column>
                    <el-table-column prop="specialProgress">
                      <template slot-scope="{ row }">
                        <div>
                          <h3>{{row.townCnt}}</h3>
                        </div>
                        <el-progress
                          :percentage="row.specialProgress"
                          :stroke-width="10"
                          :status="getColor(row.specialProgress)"
                          :show-text="false"
                        ></el-progress>
                      </template>
                    </el-table-column>
                    <el-table-column prop="specialLabel" width="120"></el-table-column>
                  </el-table>
                </el-container>
              </el-row>
            </div>
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
  name: "statisticsSupervision",
  data() {
    return {
      createTimeFrom: "",
      createTimeTo: "",
      listLoading: false,
      visionData: null,
      rectificationData: null,
      tableData: null,
      townlist: null,
      totalData: null,
      specialData1: null,
      specialData2: null
    };
  },
  mounted() {},
  created() {},
  methods: {
    getData() {
      this.listLoading = true;
      this.tableData = [];
      this.rectificationData = [];
      this.visionData = [];
      this.townlist = [];
      this.totalData = [];
      this.qualityData = [];
      this.specialData1 = [];
      this.specialData2 = [];

      Request()
        .get("/api/supervision_record/statis", {
          createTimeFrom:
            this.createTimeFrom == null ? "" : this.createTimeFrom,
          createTimeTo: this.createTimeTo == null ? "" : this.createTimeTo
        })
        .then(res => {
          this.visionData = res.data;
          this.getTown();
        })
        .catch(err => {
          console.error(err);
        });
    },

    getTown() {
      Request()
        .get("/api/town/all", {})
        .then(response => {
          this.townlist = response;
          this.getRectification();
        })
        .catch(err => {
          console.error(err);
        });
    },

    getRectification() {
      Request()
        .get("/api/rectification_record/getStatis", {
          createTimeFrom:
            this.createTimeFrom == null ? "" : this.createTimeFrom,
          createTimeTo: this.createTimeTo == null ? "" : this.createTimeTo
        })
        .then(res => {
          this.rectificationData = res.data;

          let tCnt = 0,
            tRate = 0,
            tCnt2 = 0,
            tSpecial = 0;
          this.visionData.forEach(item => {
            let cnt = item[0],
              cnt_ok = item[1],
              town_id = item[3],
              townname = "",
              cnt2 = 0;

            for (let i = 0; i < this.townlist.length; i++) {
              if (this.townlist[i].id === town_id) {
                townname = this.townlist[i].name;
                break;
              }
            }

            for (let i = 0; i < this.rectificationData.length; i++) {
              if (town_id === this.rectificationData[i][1]) {
                cnt2 = this.rectificationData[i][0];
                break;
              }
            }

            tCnt += cnt;
            tCnt2 += cnt2;
            tRate += cnt - cnt_ok;
            tSpecial += item[2];

            this.tableData.push({
              townName: townname,
              townCnt: cnt,
              townCnt2: cnt2,
              rate: cnt - cnt_ok,
              progress: parseInt(((cnt - cnt_ok) * 100) / cnt),
              chatName: townname + "监管...",
              specialLabel:
                item[2] + "/" + parseInt((item[2] * 100) / cnt) + "%",
              specialProgress: parseInt((item[2] * 100) / cnt)
            });
          });

          if (this.tableData.length > 0) {
            this.totalData.push({
              townName: "合计",
              townCnt: tCnt,
              townCnt2: tCnt2,
              rate: tRate,
              progress: tRate / tCnt,
              specialLabel:
                tSpecial + "/" + parseInt((tSpecial * 100) / tCnt) + "%",
              specialProgress: parseInt((tSpecial * 100) / tCnt)
            });

            this.makePieChat1();
            this.makePieChat2();
            this.makeQualityData();
          }
          this.listLoading = false;
        });
    },

    getColor(percent) {
      if (percent === 100) return "success";

      return "warning";
    },

    makePieChat1() {
      let chart = am4core.create(this.$refs.chartpie, am4charts.PieChart);
      chart.data = this.tableData;
      chart.responsive.enabled = true;
      let pieSeries = chart.series.push(new am4charts.PieSeries());

      let title = chart.titles.create();
      title.text = "各乡镇监管记录上传数据的比例分布";
      title.fontSize = 20;
      title.marginBottom = -20;
      title.marginTop = 10;
      title.fontWeight = "bold";

      pieSeries.dataFields.value = "townCnt";
      pieSeries.dataFields.category = "chatName";
      pieSeries.dataFields.radiusValue = "townCnt";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    },

    makePieChat2() {
      Request()
        .get("/api/quality_standard/statis", {
          createTimeFrom:
            this.createTimeFrom == null ? "" : this.createTimeFrom,
          createTimeTo: this.createTimeTo == null ? "" : this.createTimeTo
        })
        .then(res => {
          res.data.forEach(item => {
            let townname = "";

            for (let i = 0; i < this.townlist.length; i++) {
              if (this.townlist[i].id === item[1]) {
                townname = this.townlist[i].name;
                break;
              }
            }
            this.qualityData.push({
              townName: townname,
              townCnt: item[0],
              qualityLabel: townname + " " + item[0] + " "
            });
          });

          let chart = am4core.create(this.$refs.chartpie2, am4charts.PieChart);
          chart.data = this.qualityData;
          chart.responsive.enabled = true;

          let pieSeries = chart.series.push(new am4charts.PieSeries());
          let title = chart.titles.create();
          title.text = "认证统计";
          title.fontSize = 20;
          title.marginBottom = -20;
          title.marginTop = 10;
          title.fontWeight = "bold";

          pieSeries.dataFields.value = "townCnt";
          pieSeries.dataFields.category = "qualityLabel";

          chart.innerRadius = am4core.percent(40);
          pieSeries.slices.template.fillOpacity = 1;

          let hs = pieSeries.slices.template.states.getKey("hover");
          hs.properties.scale = 1;
          hs.properties.fillOpacity = 0.5;
        });
    },

    makeQualityData() {
      for (let i = 0; i < this.tableData.length; i += 2) {
        this.specialData1.push({
          townName: this.tableData[i].townName,
          progress: this.tableData[i].specialProgress,
          label: this.tableData[i].specialLabel,
          townCnt: this.tableData[i].townCnt
        });
        i++;
        this.specialData2.push({
          townName: this.tableData[i].townName,
          progress: this.tableData[i].specialProgress,
          label: this.tableData[i].specialLabel,
          townCnt: this.tableData[i].townCnt
        });
      }
    }
  }
};
</script>

<style>
</style>