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
                <el-date-picker  type="date"  placeholder="选择日期" v-model="startDate"  style="width: 300px;"></el-date-picker>                
              </el-col>
              <el-col :span="7" class="margin-left-20 flex-center">
                <div class="select_label no-margin-left">结束日期</div>
                <el-date-picker type="date" placeholder="选择日期"  v-model="endDate"  style="width: 300px;"></el-date-picker>
              </el-col>
              <el-col :span="5" class="margin-left-20">
                <el-button type="primary" plain size="medium" @click="getData()">开始统计</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-container>
                <el-table :data="tableData" style="width: 100%" highlight-current-row>
                  <el-table-column prop="townName" label="乡镇名称" width="120"></el-table-column>
                  <el-table-column prop="townCnt" label="监管记录数量"></el-table-column>
                  <el-table-column prop="townCnt2" label="整改记录数量"></el-table-column>
                  <el-table-column prop="rate" label="不合格数量"></el-table-column>
                  <el-table-column prop="progress" label="不合格占比"></el-table-column>
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
      startDate: "",
      endDate: "",
    };
  },
  mounted() {
    this.makeXYChart();
    this.makePieChart();
    this.makeLineChart();
  },
  created() {
      
  },
  methods: {
      getData(){
          console.log(this.startDate);
          console.log(this.endDate);
      },
  }
};
</script>