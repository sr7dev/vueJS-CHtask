<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/companyBusiness' }">监管对象</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">企业详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form ref="form" :model="form" v-if="form">
        <el-row>
          <el-col :span="6">
            <span class="title">公司简介</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">>
          </el-col>
          <el-col :span="6">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
          </el-col>
        </el-row>
        <el-form-item >
          <el-button type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
      <span v-if="!form">No matching data</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailsCompanyBusiness",
  data() {
    return {
      data: null
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getData(this.id);
  },
  methods: {
    onSubmit() {
      console.log(this.data);
    },
    getData(id) {
      // Request()
      //   .get("/api/company_credit_grade/get/" + id)
      //   .then(response => {
      //     this.data = response;
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./detailsCompanyBusiness.scss";
</style>