<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生产标准</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box" v-if="!data">
      <div>装货...</div>
    </div>
    <div class="box" v-else>
      <el-form ref="ruleForm" label-width="100px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="产品名称：" prop="productId">
              <el-select v-model="data.productId" class="w-100" disabled>
                <el-option
                  v-for="item in productionList"
                  :key="item.productId"
                  :label="item.productName"
                  :value="item.productId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="类别：" prop="category">
              <el-select v-model="data.category" class="w-80" disabled>
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="发布日期：" prop="createTime" disabled>
              <el-date-picker
                v-model="data.releaseTime"
                align="right"
                class="w-100"
                type="date"
                placeholder="开始日期"
                disabled
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发布者：" prop="releasePerson">
              <el-input class="w-80" v-model="data.releasePerson" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="生产标准：" prop="productionStandard">
              <el-input type="textarea" rows="5" v-model="data.productStandard" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="">
          <el-col :span="8">
            <el-button
              type="warning"
              plain
              @click="downloadFile()"
              :disabled="!data.productionStandardProfiles"
            >附件下载</el-button>
            <span
              class="margin-left-20"
              v-if="data.productionStandardProfiles"
            >{{data.productionStandardProfiles.replace("/uploads/", "")}}</span>
            <span class="margin-left-20" v-else>没有数据</span>
          </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-button type="danger" plain v-on:click="$router.go(-1)">返回</el-button>
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
  name: "detailProdcutionStandard",
  data() {
    return {
      file: null,
      productionList: [],
      data: [],
      options: [
        { id: "1", name: "畜牧业" },
        { id: "2", name: "水产业" },
        { id: "3", name: "养殖业" }
      ]
    };
  },
  created() {
    this.getProduction();
    this.getData(this.$route.params.id);
  },
  methods: {
    getProduction() {
      Request()
        .get("/api/product_production/all")
        .then(response => {
          this.productionList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getData(id) {
      Request()
        .get("/api/production_standard/get/" + id)
        .then(response => {
          this.data = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.data.productionStandardProfiles,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          this.data.productionStandardProfiles.replace("/uploads/", "")
        ); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    }
  }
};
</script>

<style lang="scss">
</style>