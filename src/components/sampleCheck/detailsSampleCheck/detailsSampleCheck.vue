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
            <div class="item-value">{{ data.sampleTime | formatDate }}</div>
          </div>
          <div class="item">
            <div class="item-label">检测人员:</div>
            <div class="item-value">{{ data.checkPerson }}</div>
          </div>
        </div>
        <div class="item-row" v-show="data.checkFiles">
          <div class="item">
            <div class="item-label"></div>
            <div class="item-label">
              <el-button @click="downloadFile()" plain type="success"
                >下载附件</el-button
              >
            </div>
            <span class="item-value">{{ data.checkFiles }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label"></div>
            <div class="item-value">
              <el-button plain @click="$router.go(-1)" type="primary"
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
import { Urls } from "../../../services/constants";
import axios from "axios";
export default {
  name: "detailsSampleCheck",
  data() {
    return {
      id: -1,
      data: null
    };
  },
  created() {
    this.id = this.$route.params.id;
    Request()
      .get(`/api/sample_check/get/${this.id}`)
      .then(response => {
        this.data = response;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.data.checkFiles,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", this.data.checkFiles); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./detailsSampleCheck.scss";
</style>
