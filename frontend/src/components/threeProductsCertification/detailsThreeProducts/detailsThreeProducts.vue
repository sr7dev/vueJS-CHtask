<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>认证工作</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">认证详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form label-width="100px" v-model="data" v-loading="listLoading">
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
        <el-form-item label="认证类型">
          <el-radio-group v-model="data.certificationType" disabled>
            <el-radio label="1">无公害产品</el-radio>
            <el-radio label="2">绿色食品</el-radio>
            <el-radio label="3">有机食品</el-radio>
            <el-radio label="4">地理标志</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="7">
            <el-form-item label="认证类别">
              <el-input v-model="data.certificationCategory" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="农业分类">
              <el-select v-model="data.argriculturalClassification" placeholder="请选择" disabled>
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
              <el-input v-model="data.certificationNo" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="认证有效期" style="text-align: center">
          <el-col :span="7">
            <el-date-picker
              type="date"
              v-model="data.certificationStartTime"
              placeholder
              style="width: 100% !important;"
              disabled
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="7">
            <el-date-picker
              type="date"
              v-model="data.certificationEndTime"
              placeholder
              style="width: 100% !important;"
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
          <el-col :span="16">
            <el-form-item>
              <div class="item-row">
                <div class="item">
                  <div class="item-label">
                    <input
                      type="file"
                      id="files"
                      style="display: none"
                      ref="files"
                      v-on:change="handleFileUpload()"
                    />
                    <el-button size="small" type="warning" plain @click="downloadFile()">下载附件</el-button>
                    <span class="item-value" v-if="files">
                      <el-link @click="downloadFile()" class="margin-left-10">
                        {{
                        files.replace("/uploads/","")
                        }}
                      </el-link>
                    </span>
                    <span class="item-value" v-if="!files">({{ fileName }})</span>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button size="small" type="danger" @click="goBack" plain>返回</el-button>
        </el-form-item>
      </el-form>
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
      data: [],
      files: null,
      fileName: "",
      companyName: "",
      productName: "",
      listLoading: false,
      argriculturalClassification: 0,
       options: [
        { value: 1, label: "养殖业" },
        { value: 2, label: "已同意" },
        { value: 3, label: "畜牧业" },
        { value: 4, label: "种植业" },
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
      this.listLoading = true;
      Request()
        .get("/api/quality_standard/get/" + id)
        .then(response => {
          this.data = response;
          this.data.argriculturalClassification = parseInt(
            response.argriculturalClassification
          );
          this.files = response.files;
          if (!response.files) this.fileName = "";
          setTimeout(() => {
            this.listLoading = false;
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
      this.$refs.files.click();
    },

    handleFileUpload() {
      this.files = this.$refs.files.files[0];
    },
    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.files,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        if(!this.isIE()){
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", this.files.replace("/uploads/", "")); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        }else{
          const newBlob = new Blob([response.data], {type: 'application/octet-stream'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, this.files.replace("/uploads/", ""));
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

<style scoped>
</style>