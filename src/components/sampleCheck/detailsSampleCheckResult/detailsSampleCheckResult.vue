<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }"
          >监管对象</el-breadcrumb-item
        >
        <el-breadcrumb-item class="actived">仓库详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <template v-if="data">
        <div class="item-row">
          <div class="item">
            <div class="item-label">检测名称:</div>
            <div class="item-value">{{ data.sampleName }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">检测时间:</div>
            <div class="item-value">{{ getDateString(data.sampleTime) }}</div>
          </div>
          <div class="item">
            <div class="item-label">检测人员:</div>
            <div class="item-value">{{ data.checkPerson }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">检测结果:</div>
            <div class="item-value">
              {{ data.checkResult == 1 ? "合格" : "不合格" }}
            </div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label"></div>
            <div class="item-value">
              <el-button @click="$router.go(-1)" plain type="success"
                >下载附件</el-button
              >
            </div>
            <span class="item-value">
              {{ data.checkFiles.replace("/uploads/", "") }}
            </span>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label"></div>
            <div class="item-value">
              <el-button @click="$router.go(-1)" plain type="primary"
                >返回</el-button
              >
            </div>
          </div>
        </div>
      </template>
      <template v-if="!data"
        >No matching data!</template
      >
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request";
export default {
  name: "detailsSampleCheckResult",
  data() {
    return {
      id: -1,
      data: null
    };
  },
  created() {
    this.id = this.$route.params.id;
    Request()
      .get(`/api/sample_check_result/get/${this.id}`)
      .then(response => {
        this.data = response;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    getDateString(dt) {
      const date = new Date(dt);
      return date.toLocaleDateString();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./detailsSampleCheckResult.scss";
</style>
