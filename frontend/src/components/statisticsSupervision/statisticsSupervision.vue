<template>
  <div class="container customized" v-loading="listLoading">
    <div class="box padding-modified header statisticsSupervision" v-if="!listLoading"></div>
    <div class="box padding-modified body">
      <el-row class="W-100">
        <el-col :span="14">
          <div class="disability-chart chart-container padding-10 large">
            <el-row class="w-100 flex-center margin-top-10 margin-bottom-10">
              <el-col :span="5" class="margin-left-10">
                <h1 style="font-size:20px" v-if="!is_ie" class="gradient-colored">监管记录统计</h1>
                <h1 style="font-size:20px margin-top:5px" v-else>
                  <span style="color:#255ee3;opacity:0.8">监管</span>
                  <span style="color:#20beff;opacity:0.7">记录统计</span>
                </h1>
              </el-col>
              <el-col :span="7" class="margin-left-20 flex-center margin-top-reverse-5-IE">
                <div class="select_label no-margin-left white-colored">开始日期</div>
                <el-date-picker
                  type="date"
                  size="small"
                  placeholder="选择日期"
                  class="chart-input"
                  v-model="createTimeFrom"
                  style="width: 150px;"
                ></el-date-picker>
              </el-col>
              <el-col :span="7" class="margin-left-20 flex-center margin-top-reverse-5-IE">
                <div class="select_label no-margin-left white-colored">结束日期</div>
                <el-date-picker
                  type="date"
                  size="small"
                  class="chart-input"
                  placeholder="选择日期"
                  v-model="createTimeTo"
                  style="width: 150px;"
                ></el-date-picker>
              </el-col>
              <el-col :span="3" class="margin-left-20 margin-top-reverse-5-IE">
                <el-button type="primary" plain @click="getData()" class="no-effect">开始统计</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-container>
                <el-table :data="tableData" style="width: 100%" class="fixed-height chart-table">
                  <el-table-column
                    prop="townName"
                    label="乡镇名称"
                    width="120"
                    class-name="white-colored"
                  ></el-table-column>
                  <el-table-column prop="townCnt" label="监管记录数量" class-name="blue-colored"></el-table-column>
                  <el-table-column prop="townCnt2" label="整改记录数量" class-name="blue-colored"></el-table-column>
                  <el-table-column prop="rate" label="不合格数量" class-name="blue-colored"></el-table-column>
                  <el-table-column prop="progress" label="不合格占比">
                    <template slot-scope="{ row }">
                      <div class="sub-title">
                        <h3 class="blue-colored">{{row.progress}}%</h3>
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
                  class="border-hide chart-table"
                  row-class-name="success-row"
                >
                  <el-table-column prop="townName" width="120" class-name="white-colored">
                    <template slot-scope="{row}">
                      <b>{{row.townName}}</b>
                    </template>
                  </el-table-column>
                  <el-table-column prop="townCnt" class-name="blue-colored italic-font large-font">
                    <template slot-scope="{row}">
                      <b>{{row.townCnt}}</b>
                    </template>
                  </el-table-column>
                  <el-table-column prop="townCnt2" class-name="blue-colored italic-font large-font">
                    <template slot-scope="{row}">
                      <b>{{row.townCnt2}}</b>
                    </template>
                  </el-table-column>
                  <el-table-column prop="rate" class-name="blue-colored italic-font large-font">
                    <template slot-scope="{row}">
                      <b>{{row.rate}}</b>
                    </template>
                  </el-table-column>
                  <el-table-column prop="progress">
                    <template slot-scope="{ row }">
                      <el-progress
                        :percentage="row.progress"
                        :stroke-width="10"
                        :status="getColor(row.progress)"
                        :show-text="false"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="合格率" width="100">
                    <template slot-scope="{ row }">
                      <div class="sub-title">
                        <h3 class="large-font blue-colored italic-font">{{row.progress}}%</h3>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-container>
            </el-row>
          </div>
        </el-col>
        <el-col :span="10" class="position-relative">
          <h1
            style="font-size:20px"
            v-if="!is_ie"
            class="gradient-colored chart-title margin-left-10"
          >各乡镇监管记录上传数据的比例分布</h1>
          <h1 style="font-size:20px" v-else class="gradient-colored chart-title margin-left-10">
            <span style="color:#255ee3;opacity:0.8">各乡镇监管</span>
            <span style="color:#20beff;opacity:0.7">记录上传数据的比例分布</span>
          </h1>
          <div class="disability-chart chart-container margin-left-10 large" ref="chartpie">
            <figure>
              <chart :options="pie" :init-options="initOptions" ref="pie" autoresize />
            </figure>
          </div>
        </el-col>
      </el-row>
      <el-row class="W-100">
        <el-col>
          <div class="w-100 flex-box disability-chart chart-container">
            <h1
              style="font-size:20px"
              v-if="!is_ie"
              class="gradient-colored chart-title margin-left-10"
            >认证统计</h1>
            <h1 style="font-size:20px" v-else class="gradient-colored chart-title margin-left-10">
              <span style="color:#255ee3;opacity:0.8">认证</span>
              <span style="color:#20beff;opacity:0.7">统计</span>
            </h1>
            <div class="w-50 inline-block-IE chart-div-IE" ref="chartpie2"></div>
            <div class="divider no-margin-left inline-block-IE divider-IE"></div>
            <div class="w-50 inline-block-IE chart-div-IE">
              <el-row
                class="w-90 margin-left-60"
                v-if="specialData1 !== null && specialData1.length > 0"
              >
                <el-col class="margin-top-10 text-left" style="font-size: 20px;">
                  <h1 style="font-size:20px" v-if="!is_ie" class="gradient-colored">绿色优质数量/占比</h1>
                  <h1 style="font-size:20px" v-else>
                    <span style="color:#255ee3;opacity:0.8">绿色优质</span>
                    <span style="color:#20beff;opacity:0.7">数量/占比</span>
                  </h1>
                </el-col>
              </el-row>
              <el-row class="w-90 margin-left-60">
                <el-col :span="12">
                  <el-table
                    :data="specialData1"
                    style="width: 100%; height: 293px;"
                    :show-header="false"
                    v-if="specialData1 !== null && specialData1.length > 0"
                    class="fixed-height chart-table margin-top-10"
                  >
                    <el-table-column
                      prop="townName"
                      class-name="no-border-bottom white-colored text-right"
                    ></el-table-column>
                    <el-table-column
                      prop="progress"
                      width="200"
                      class-name="no-border-bottom blue-colored"
                    >
                      <template slot-scope="{ row }">
                        <div>
                          <h3>{{row.cntSpecial}}</h3>
                        </div>
                        <el-progress
                          :percentage="row.progress"
                          :stroke-width="10"
                          :status="getColor(row.progress)"
                          :show-text="false"
                        ></el-progress>
                      </template>
                    </el-table-column>
                    <el-table-column prop="label" class-name="no-border-bottom blue-colored"></el-table-column>
                  </el-table>
                </el-col>
                <el-col :span="12">
                  <el-table
                    :data="specialData2"
                    style="width: 100%; height: 293px;"
                    :show-header="false"
                    v-if="specialData2 !== null && specialData2.length > 0"
                    class="fixed-height margin-top-10 chart-table"
                  >
                    <el-table-column
                      prop="townName"
                      class-name="no-border-bottom text-right white-colored"
                    ></el-table-column>
                    <el-table-column
                      prop="progress"
                      width="200"
                      class-name="no-border-bottom blue-colored"
                    >
                      <template slot-scope="{ row }">
                        <div>
                          <h3>{{row.cntSpecial}}</h3>
                        </div>
                        <el-progress
                          :percentage="row.progress"
                          :stroke-width="10"
                          :status="getColor(row.progress)"
                          :show-text="false"
                        ></el-progress>
                      </template>
                    </el-table-column>
                    <el-table-column prop="label" class-name="no-border-bottom blue-colored"></el-table-column>
                  </el-table>
                </el-col>
              </el-row>
              <el-row class="w-90 margin-left-60">
                <el-col :span="24">
                  <el-table
                    :data="totalData"
                    style="width: 100%"
                    :show-header="false"
                    class="chart-table border-hide"
                    v-if="totalData !== null && totalData.length > 0"
                  >
                    <el-table-column
                      prop="townName"
                      align="center"
                      width="120"
                      class-name="white-colored"
                    ></el-table-column>
                    <el-table-column prop="specialProgress" class-name="blue-colored">
                      <template slot-scope="{ row }">
                        <div>
                          <h3>{{row.cntSpecial}}</h3>
                        </div>
                        <el-progress
                          :percentage="row.specialProgress"
                          :stroke-width="10"
                          :status="getColor(row.specialProgress)"
                          :show-text="false"
                        ></el-progress>
                      </template>
                    </el-table-column>
                    <el-table-column prop="specialLabel" width="120" class-name="blue-colored"></el-table-column>
                  </el-table>
                </el-col>
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
const ECharts = () => import("vue-echarts/components/ECharts.vue");
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
am4core.useTheme(am4themes_animated);

export default {
  name: "statisticsSupervision",
  components: {
    chart: ECharts
  },
  data() {
    return {
      pie: {},
      initOptions: {
        renderer: "canvas"
      },
      createTimeFrom: "",
      createTimeTo: "",
      listLoading: false,
      visionData: null,
      visionData1: null,
      rectificationData: null,
      rectificationData1: null,
      tableData: null,
      tableData1: null,
      townlist: null,
      totalData: null,
      specialData1: [],
      specialData2: [],
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
  mounted() {
    this.isIE();
    this.getData();
  },
  methods: {
    async getData() {
      this.listLoading = true;
      this.tableData = [];
      this.tableData1 = [];
      this.rectificationData = [];
      this.rectificationData1 = [];
      this.visionData = [];
      this.visionData1 = [];
      this.townlist = [];
      this.townlist1 = [];
      this.totalData = [];
      this.qualityData = [];
      this.specialData1 = [];
      this.specialData2 = [];

      await Request()
        .get("/api/supervision_record/statis", {
          createTimeFrom:
            this.createTimeFrom == null ? "" : this.createTimeFrom,
          createTimeTo: this.createTimeTo == null ? "" : this.createTimeTo,
          sortBy: "cnt"
        })
        .then(res => {
          this.visionData = res.data;
          this.getTown();
        })
        .catch(err => {
          console.error(err);
        });
      Request()
        .get("/api/supervision_record/statis", {
          createTimeFrom:
            this.createTimeFrom == null ? "" : this.createTimeFrom,
          createTimeTo: this.createTimeTo == null ? "" : this.createTimeTo,
          sortBy: "cnt"
        })
        .then(res => {
          this.visionData1 = res.data;
          this.getTown1();
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
    getTown1() {
      Request()
        .get("/api/town/all", {})
        .then(response => {
          this.townlist1 = response;
          this.getRectification1();
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
              cntSpecial: item[2],
              rate: cnt - cnt_ok,
              progress: parseInt(((cnt - cnt_ok) * 100) / cnt),
              chatName: townname             
            });
          });

          if (this.tableData.length > 0) {
            this.totalData.push({
              townName: "合计",
              townCnt: tCnt,
              townCnt2: tCnt2,
              rate: tRate,
              progress: parseInt((tRate / tCnt) * 100),
              specialLabel:"",
              specialProgress: 0,
              cntSpecial: 0              
            });

            this.makeQualityData();
          }
        });
    },
    getRectification1() {
      Request()
        .get("/api/rectification_record/getStatis", {
          createTimeFrom:
            this.createTimeFrom == null ? "" : this.createTimeFrom,
          createTimeTo: this.createTimeTo == null ? "" : this.createTimeTo
        })
        .then(res => {
          this.rectificationData1 = res.data;

          let tCnt = 0,
            tRate = 0,
            tCnt2 = 0,
            tSpecial = 0;
          this.visionData1.forEach(item => {
            let cnt = item[0],
              cnt_ok = item[1],
              town_id = item[3],
              townname = "",
              cnt2 = 0;

            for (let i = 0; i < this.townlist1.length; i++) {
              if (this.townlist1[i].id === town_id) {
                townname = this.townlist1[i].name;
                break;
              }
            }

            for (let i = 0; i < this.rectificationData1.length; i++) {
              if (town_id === this.rectificationData1[i][1]) {
                cnt2 = this.rectificationData1[i][0];
                break;
              }
            }

            tCnt += cnt;
            tCnt2 += cnt2;
            tRate += cnt - cnt_ok;
            tSpecial += item[2];

            this.tableData1.push({
              townName: townname,
              townCnt: cnt,
              townCnt2: cnt2,
              rate: cnt - cnt_ok,
              progress: parseInt(((cnt - cnt_ok) * 100) / cnt),
              chatName: townname,
              specialLabel:
                item[2] + "/" + parseInt((item[2] * 100) / cnt) + "%",
              specialProgress: parseInt((item[2] * 100) / cnt)
            });
          });

          if (this.tableData1.length > 0) {
            this.makePieChat1();
            this.makePieChat2();
          }
          this.listLoading = false;
        });
    },
    getColor(percent) {
      if (percent === 100) return "success";

      return "warning";
    },

    makePieChat1() {
      this.tableData1.sort(function(a, b) {
        return b.townCnt - a.townCnt;
      });

      let chartData = [];
      this.tableData1.map(item => {
        chartData.push({
          value: item.townCnt,
          name:
            item.chatName.length > 10
              ? item.chatName.substring(0, 7) + "..."
              : item.chatName
        });
      });
      this.pie = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "各乡镇监管记录上传数据的",
            type: "pie",
            radius: "50%",
            center: ["54%", "50%"],
            data: chartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 2,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              fontSize: 14,
              color: "#FFF",
              formatter: "{d}%:{b}"
            }
          }
        ],
        color: this.colorList
      };
      let dataIndex = -1;
      let pie = this.$refs.pie;
      let dataLen = this.pie.series[0].data.length;
      setInterval(() => {
        pie.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex
        });
        dataIndex = (dataIndex + 1) % dataLen;
        pie.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex
        });
        // 显示 tooltip
        pie.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex
        });
      }, 1000);
    },

    makePieChat2() {
      Request()
        .get("/api/quality_standard/statisType", {
          createTimeFrom:
            this.createTimeFrom == null ? "" : this.createTimeFrom,
          createTimeTo: this.createTimeTo == null ? "" : this.createTimeTo,
          certification_type: 0,
          sortBy: "cnt"
        })
        .then(res => {
          
          res.data.forEach(item => {
            let townname = "";

            switch(item[1]){
              case "1": 
              townname = "无公害产品"; break;
              case "2": 
              townname = "绿色食品"; break;
              case "3": 
              townname = "有机食品"; break;
              case "4": 
              townname = "绿色优质基地"; break;
            }
                        
            this.qualityData.push({
              townName: townname,
              townCnt: item[0],
              qualityLabel: townname
            });
          });

          let chart = am4core.create(this.$refs.chartpie2, am4charts.PieChart);
          chart.data = this.qualityData;
          chart.responsive.enabled = true;

          let pieSeries = chart.series.push(new am4charts.PieSeries());
          let title = chart.titles.create();
          title.text = "认证统计";
          title.fontSize = 5;
          title.marginBottom = 10;
          title.fill = am4core.color("#012f8a");

          pieSeries.dataFields.value = "townCnt";
          pieSeries.dataFields.category = "qualityLabel";
          pieSeries.ticks.template.strokeWidth = 1;
          pieSeries.ticks.template.strokeOpacity = 0.7;
          pieSeries.ticks.template.fill = am4core.color("#012f8a");
          pieSeries.ticks.template.fillOpacity = 1;
          pieSeries.labels.template.truncate = true;
          pieSeries.labels.template.fontSize = 15;
          pieSeries.labels.template.maxWidth = 180;
          pieSeries.labels.template.fill = "white";
          pieSeries.labels.template.text =
            "[bold '#20beff']{value.percent.formatNumber('#.0')}%[/] {category}";
          chart.innerRadius = am4core.percent(40);
          pieSeries.slices.template.fillOpacity = 1;
          let colorSet = new am4core.ColorSet();
          colorSet.list = this.colorList.map(color => {
            return new am4core.color(color);
          });
          pieSeries.colors = colorSet;

          let hs = pieSeries.slices.template.states.getKey("hover");
          hs.properties.scale = 1;
          hs.properties.fillOpacity = 0.5;
        });
    },

    makeQualityData() {

      Request()
        .get("/api/quality_standard/statis", {
          certificationType: "0",
          createTimeFrom: this.createTimeFrom == null ? "" : this.createTimeFrom,
          createTimeTo: this.createTimeTo == null ? "" : this.createTimeTo
        })
        .then(res => {         
          Request()
          .get("/api/quality_standard/statis", {
            certificationType: "4",
            createTimeFrom: this.createTimeFrom == null ? "" : this.createTimeFrom,
            createTimeTo: this.createTimeTo == null ? "" : this.createTimeTo
          })
          .then(res1 => {
            let totalCnt = 0, t4Cnt = 0;
              for (let i = 0; i < res.data.length; i += 2){
                let tname = "", tname1 = "";
                for (let j = 0; j < this.townlist.length; j++) {
                  if (this.townlist[j].id === res.data[i][1]) {
                    tname = this.townlist[j].name;
                  }
                  if (this.townlist[j].id === res.data[i+1][1]) {
                    tname1 = this.townlist[j].name;
                  }
                }
              
              let tspec=0, tspec1 =0;
              for (let k = 0; k < res1.data.length; k++){
                if (res1.data[k][1] == res.data[i][1]){
                  tspec = res1.data[k][0];                  
                }

                if (res1.data[k][1] == res.data[i+1][1]){
                  tspec1 = res1.data[k][0];
                }
              }

                this.specialData1.push({
                  townName: tname,
                  progress: parseInt((tspec * 100) / res.data[i][0]),
                    label: res.data[i][0] + "/" + parseInt((tspec * 100) / res.data[i][0]) + "%",
                  townCnt: res.data[i][0],
                  cntSpecial: tspec
                });
                if (i !== this.tableData.length - 1)
                  this.specialData2.push({
                    townName: tname1,
                    progress: parseInt((tspec1 * 100) / res.data[i+1][0]),
                    label: res.data[i+1][0] + "/" + parseInt((tspec1 * 100) / res.data[i+1][0]) + "%",
                    townCnt: res.data[i+1][0],
                    cntSpecial: tspec1
                  });

                  t4Cnt += (tspec + tspec1);
                  totalCnt += (res.data[i][0] + res.data[i+1][0]); 
              }


              this.totalData[0].specialLabel = totalCnt + "/" + parseInt((t4Cnt * 100) / totalCnt) + "%";
              this.totalData[0].specialProgress = parseInt((t4Cnt * 100) / totalCnt);
              this.totalData[0].cntSpecial = t4Cnt;
          });
        })
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      this.is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    }
  }
};
</script>

<style scoped>
.echarts {
  width: 650px !important;
  height: 680px !important;
}
</style>