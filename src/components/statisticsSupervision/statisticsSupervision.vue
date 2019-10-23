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
            <el-row class="w-100 flex-center margin-top-20 margin-bottom-10">
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
                <el-button type="primary" plain size="medium" @click="getData()">开始统计</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-container>
                <el-table :data="tableData" style="width: 100%" highlight-current-row height="330">
                  <el-table-column prop="townName" label="乡镇名称" width="120"></el-table-column>
                  <el-table-column prop="townCnt" label="监管记录数量"></el-table-column>
                  <el-table-column prop="townCnt2" label="整改记录数量"></el-table-column>
                  <el-table-column prop="rate" label="不合格数量"></el-table-column>
                  <el-table-column prop="progress" label="不合格占比"></el-table-column>
                </el-table>
              </el-container>
            </el-row>
            <el-row>
              <el-container>
                <el-table :data="totalData" style="width: 100%" :show-header="false" row-class-name="success-row">
                  <el-table-column prop="townName" width="120"></el-table-column>
                  <el-table-column prop="townCnt"></el-table-column>
                  <el-table-column prop="townCnt2"></el-table-column>
                  <el-table-column prop="rate"></el-table-column>
                  <el-table-column prop="progress"></el-table-column>
                </el-table>
              </el-container>
            </el-row>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="chart-container margin-left-10 third-container" ref="chartdiv2"></div>
        </el-col>
      </el-row>
      <el-row class="W-100">
        <el-col>
          <div class="w-100 flex-box disability-chart chart-container">
            <div class="w-50" ref="chartdiv"></div>
            <div class="divider"></div>
            <div class="w-50" ref="chartdiv2"></div>
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
      totalData: null
    };
  },
  mounted() {},
  created() {},
  methods: {
    getData() {
      this.tableData = [];
      this.rectificationData = [];
      this.visionData = [];
      this.townlist = [];
      this.totalData = [];

      Request()
        .get("/api/supervision_record/statis", {
          createTimeFrom:
            this.createTimeFrom == null ? "" : this.createTimeFrom,
          createTimeTo: this.createTimeTo == null ? "" : this.createTimeTo
        })
        .then(res => {
          this.visionData = res.data;
          this.getTown();
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
            tCnt2 = 0;
          this.visionData.forEach(item => {
            let cnt = item[0],
              cnt_ok = item[1],
              town_id = item[2],
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

            this.tableData.push({
              townName: townname,
              townCnt: cnt,
              townCnt2: cnt2,
              rate: cnt - cnt_ok,
              progress: (cnt - cnt_ok) / cnt
            });
          });

          if (this.tableData.length > 0) {
            this.totalData.push({
              townName: "合计",
              townCnt: tCnt,
              townCnt2: tCnt2,
              rate: tRate,
              progress: tRate / tCnt
            });
          }
        });
    }
  }
};
</script>