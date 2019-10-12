<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>三品认证</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">认证详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form label-width="100px" v-if="!dataloading">
        <el-row>
          <el-col :span="7">
            <el-form-item label="企业名称">
              <el-input v-model="companyName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="产品名称">
              <el-input v-model="productName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="认证类别">
          <el-radio-group v-model="data.argriculturalClassification">
            <el-radio label="1">无公害产品</el-radio>
            <el-radio label="2">绿色食品</el-radio>
            <el-radio label="3">有机食品</el-radio>
            <el-radio label="4">地理标志</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="7">
            <el-form-item label="认证类别">
              <el-input v-model="data.cretficationCategory" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="农业分类">
              <el-select v-model="data.cretficationType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="证书编号">
              <el-input v-model="data.cretficationNo" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="认证有效期" style="text-align: center">
          <el-col :span="7">
            <el-date-picker
              type="date"
              v-model="data.certificationStartTime"
              placeholder
              style="width: 100%;"
              disabled
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="7">
            <el-date-picker
              type="date"
              v-model="data.certificationEndTime"
              placeholder
              style="width: 100%;"
              disabled
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="产量">
              <el-input v-model="data.output" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item>
              <div class="item">
                <div
                  class="item-label"
                  style="margin-bottom:20px;display:inline-block"
                >
                  <input
                    type="file"
                    id="file"
                    style="display: none"
                    ref="file"
                    v-on:change="handleFileUpload()"
                  />
                  <el-button type="warning" plain @click="chooseFile()"
                    >保存修改</el-button
                  >
                </div>
                <div
                  class="item-value"
                  v-if="!file"
                  style="display:inline-block;margin-left:10px;"
                >
                  <el-link @click="downloadFile()" v-if="data.files">{{
                    data.files.replace("/uploads/", "")
                  }}</el-link>
                </div>
                <div
                  class="item-value"
                  v-if="file"
                  style="display:inline-block;margin-left:10px;"
                >
                  ({{ file.name }})
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="danger" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
          <template v-if="dataLoading">装货...</template>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import axios from "axios";
export default {
  name: "detailsThreeProducts",
  data() {
    return {
      id: -1,
      pageName: this.$route.name,
      data: null,
      file: null,
      companyName: "",
      productName: "",
      dataloading: false,
      options: [
        { value: "2", label: "养殖业" },
        { value: "1", label: "畜牧业" },
        { value: "3", label: "种植业" }
      ]
    };
  },
  created() {
    this.companyName = this.$route.query.company;
    this.productName = this.$route.query.product;
    this.id = this.$route.params.id;
    this.getData(this.$route.params.id);
  },
  methods: {
    getData(id) {
      this.dataloading = true;
      Request()
        .get("/api/quality_standard/get/" + id)
        .then(response => {
          this.data = response;
          setTimeout(() => {
            this.dataloading = false;
          }, 0.01 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    chooseFile() {
      this.$refs.file.click();
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    downloadFile() {
      axios
        .get(Urls.API_BASE_URL() + this.data.files, {
          responseType: "blob"
        })
        .then(({ data }) => {
          const blob = new Blob([data], {});
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.click().catch(error => console.error(error));
        });
    }
  }
};
</script>

<style scoped>
</style>