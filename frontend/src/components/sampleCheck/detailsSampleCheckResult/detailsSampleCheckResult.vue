<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>例行抽样</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">抽样结果</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box" v-loading="listLoading">
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
          <div class="item-value">{{ data.checkResult == 1 ? "合格" : "不合格" }}</div>
        </div>
      </div>
      <div class="item-row">
        <div class="item">
          <div class="item-label">
            <input
              type="file"
              id="file"
              style="display: none"
              ref="file"
              v-on:change="handleFileUpload()"
            />
            <el-button size="small" type="warning" plain>下载附件</el-button>
          </div>
          <div class="item-value" v-if="!file">
            <el-link @click="downloadFile()">
              {{
              fileName
              }}
            </el-link>
          </div>
          <div class="item-value" v-if="file">({{ file.name }})</div>
        </div>
      </div>
      <div class="item-row">
        <div class="item">
          <div class="item-value">
            <el-button
              size="small"
              plain
              @click="$router.push({path:`/sampleCheckMain`, query:{mode:1}})"
              type="primary"
            >返回</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request";
import { Urls } from "../../../services/constants";
import axios from "axios";
export default {
  name: "detailsSampleCheckResult",
  data() {
    return {
      id: -1,
      data: [],
      file: null,
      fileName: "",
      listLoading: false
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      Request()
        .get(`/api/sample_check_result/get/${this.id}`)
        .then(response => {
          this.data = response;
          this.fileName = this.data.checkFiles.replace("/uploads/", "");
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDateString(dt) {
      const date = new Date(dt);
      return date.toLocaleDateString();
    },
    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.data.checkFiles,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        if(!this.isIE()){
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            this.data.checkFiles.replace("/uploads/", "")
          ); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        }else{
          const newBlob = new Blob([response.data], {type: 'application/octet-stream'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, this.data.checkFiles.replace("/uploads/", ""));
            return;
          }
        }
      });
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./detailsSampleCheckResult.scss";
</style>
