<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>培训经费管理</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">经费详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form
        ref="formData"
        :model="formData"
        label-width="100px"
        class="form-width"
        v-loading="dataLoading"
      >
        <el-form-item
          prop="projectName"
          label="项目名称:"
          class="input-width label-align"
        >
          <el-input
            v-model="formData.projectName"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="申请金额:"
          prop="appliedAmount"
          class="input-width label-align"
        >
          <el-input
            v-model="formData.appliedAmount"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="申请人："
          prop="proposer"
          class="input-width label-align"
          style="margin-right:30px"
        >
          <el-input
            v-model="formData.proposer"
            auto-complete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="所在单位："
          prop="companyId"
          class="input-width label-align2"
        >
          <el-select v-model="formData.companyId" disabled>
            <el-option
              v-for="item in companyProduction"
              :key="item.companyId"
              :label="item.companyName"
              :value="item.companyId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label prop="file">
          <span class="item-label">
            <input
              type="file"
              id="file"
              style="display: none"
              ref="file"
              v-on:change="handleFileUpload()"
            />
            <el-button size="small" type="warning" plain @click="downloadFile()" :disabled="!file"
              >下载附件</el-button
            >
          </span>
          <span v-if="!file">
            <el-link @click="downloadFile()">
              {{ fileName }}
            </el-link>
          </span>
          <span v-if="file">
            <el-link class="margin-left-10" @click="downloadFile()">
              {{ fileName }}
            </el-link></span>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            plain
            v-on:click="$router.go(-1)"
            type="success"
            v-if="!isShowAddButton"
            >通过</el-button
          >
          <el-button
            size="small"
            plain
            v-on:click="$router.go(-1)"
            type="warning"
            v-if="!isShowAddButton"
            >拒绝</el-button
          >
          <el-button
            size="small"
            plain
            v-on:click="$router.go(-1)"
            type="primary"
            v-if="!isShowAddButton"
            >取消</el-button
          >
          <el-button
            size="small"
            plain
            v-on:click="$router.go(-1)"
            type="success"
            v-if="isShowAddButton"
            >返回</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import Storage from "store";
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        projectName: "",
        appliedAmount: "",
        proposer: "",
        companyId: "-1",
        status: ""
      },
      companyProduction: [{ id: -1, name: "全部" }],
      loggedinUserType: null,
      fileName: "",
      file: null,
      dataLoading: false,
      id: 0,
      isShowAddButton: null,
      appStatus: ["全部", "待审批", "已同意", "已拒绝"]
    };
  },
  mounted() {
    this.getCompanyProduct();
    this.id = this.$route.params.id;
    this.getData(this.$route.params.id);
  },
  created() {
    this.isShowAddButton = Storage.get("authList").find(
      x => x.privilegeCode == "addTrainingFunds"
    )
      ? true
      : false;
  },
  methods: {
    getCompanyProduct() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyProduction = this.companyProduction.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getData(id) {
      this.dataLoading = true;
      Request()
        .get("/api/training_funds/get/" + id)
        .then(response => {
          this.formData = response;
          this.file = response.trainingFundsProfiles;
          if (this.file) this.fileName = this.file.replace("/uploads/", "");
          setTimeout(() => {
            this.dataLoading = false;
          }, 0.01 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.file,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        if(!this.isIE()){
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", this.file.replace("/uploads/", "")); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        }else{
          const newBlob = new Blob([response.data], {type: 'application/octet-stream'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, this.file.replace("/uploads/", ""));
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

<style lang="scss"></style>
