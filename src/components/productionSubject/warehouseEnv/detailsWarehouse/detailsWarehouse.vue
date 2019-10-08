<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>仓储环境</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">仓库详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <template v-if="data">
        <div class="item-row">
          <div class="item">
            <div class="item-label">仓库名称:</div>
            <div class="item-value">{{ data.warehouseName }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">仓库地址:</div>
            <div class="item-value">{{ data.warehouseAddress }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">仓库面积:</div>
            <div class="item-value">{{ data.warehouseArea }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">仓库规模:</div>
            <div class="item-value">{{ data.warehouseScope }}</div>
          </div>
        </div>
        <div class="item-row">
          <el-button @click="$router.go(-1)" plain type="primary"
            >返回</el-button
          >
        </div>
      </template>
      <template v-if="!data"
        >No matching data!</template
      >
    </div>
  </div>
</template>

<script>
import sampleData from "../_data";
export default {
  name: "detailsWarehouse",
  data() {
    return {
      id: -1,
      pageName: this.$route.name,
      datas: sampleData,
      data: null
    };
  },
  created() {
    this.data = this.$route.query.company;
    this.id = this.$route.params.id;
    const pos = this.datas.findIndex(i => i.id == this.id);
    if (pos >= 0) {
      this.data = this.datas[pos];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./detailsWarehouse.scss";
</style>
