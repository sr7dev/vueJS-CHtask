<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">绿色优质产品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-tabs
        v-model="activeTabName"
        type="border-card"
        @tab-click="getList"
        v-loading="listLoading"
      >
        <el-tab-pane label="绿色食品" name="greeFood">
          <greenFood :year="year" />
        </el-tab-pane>
        <el-tab-pane label="有机农产品" name="organicProduce">
          <organicProduce :year="year" />
        </el-tab-pane>
        <el-tab-pane label="种植业绿色优质基地" name="plantingGreenBase">
          <plantingGreenBase :year="year" />
        </el-tab-pane>
        <el-tab-pane label="种植业乡镇统计" name="plantingTownshipStatistics">
          <plantingTownshipStatistics :year="year" />
        </el-tab-pane>
        <el-tab-pane label="畜牧业绿色优质基地" name="animalHusbandryBase">
          <animalHusbandryBase :year="year" />
        </el-tab-pane>
        <el-tab-pane
          label="绿色优质农产品占比"
          name="greenAgriculturalProducts"
        >
          <greenAgriculturalProducts :year="year" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request.js";
import { Urls } from "@/services/constants";
import axios from "axios";
import Auth from "@/services/authentication/auth.js";
import { Script } from "vm";
import animalHusbandryBase from "./animalHusbandryBase/animalHusbandryBase";
import greenAgriculturalProducts from "./greenAgriculturalProducts/greenAgriculturalProducts";
import greenFood from "./greenFood/greenFood";
import organicProduce from "./organicProduce/organicProduce";
import plantingGreenBase from "./plantingGreenBase/plantingGreenBase";
import plantingTownshipStatistics from "./plantingTownshipStatistics/plantingTownshipStatistics";
export default {
  name: "greenProducts",
  components: {
    animalHusbandryBase,
    greenAgriculturalProducts,
    greenFood,
    organicProduce,
    plantingGreenBase,
    plantingTownshipStatistics
  },
  data() {
    return {
      activeTabName: "greeFood",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      listLoading: false,
      year: 2019,
      options: [
        { value: 2018 },
        { value: 2019 },
        { value: 2020 },
        { value: 2021 },
        { value: 2022 },
        { value: 2023 }
      ]
    };
  },
  created() {},
  methods: {
    getList() {
      this.listLoading = false;
    },
    getYear() {},
    handleClick() {},
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    }
  }
};
</script>

<style lang="scss">
.year-select-panel {
  width: 100%;
  margin-top: 2rem;
}
</style>
