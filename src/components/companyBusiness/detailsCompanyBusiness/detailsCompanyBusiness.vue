<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">企业详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form v-loading="dataLoading">
        <el-row>
          <el-col :span="6">
            <div class="title">公司简介</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <img
              class="content img"
              :src="url + '/api' + data.profileImage"
              alt=""
            />
          </el-col>
          <el-col :span="6">
            <div class="title">福鼎白茶</div>
            <div class="content">{{ data.companyProfile }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="title">主营产品</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="6"
            v-for="(item, index) in companyProducts"
            :key="index"
          >
            <div class="sub-title">{{ item.productName }}</div>
            <div class="content">{{ item.productArea }}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="title">联系我们</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="content">联系人：{{ data.legalPerson }}</div>
          </el-col>
          <el-col :span="6">
            <div class="content">电话：{{ data.contactWay }}</div>
          </el-col>
          <el-col :span="6">
            <div class="content">地址：{{ data.companyAddress }}</div>
          </el-col>
        </el-row>
        <el-button plain v-on:click="$router.go(-1)" type="success"
          >返回</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request";
import { Urls } from "@/services/constants";
export default {
  name: "detailsCompanyBusiness",
  data() {
    return {
      data: null,
      companyProducts: [],
      url: Urls.API_BASE_URL(),
      dataLoading: true
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getData(this.id);
  },
  methods: {
    getData(id) {
      this.dataLoading = true;
      Request()
        .get("/api/company_business/get/" + id)
        .then(response => {
          this.data = response;
          Request()
            .get("/api/product_business/all", {
              company_id: this.data.id,
              pageNo: 0,
              pageSize: 20
            })
            .then(res => {
              this.companyProducts = res;
              setTimeout(() => {
                this.dataLoading = false;
              }, 0.5 * 1000);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./detailsCompanyBusiness.scss";
</style>