<template>
  <div>
    <mt-header fixed title="首页"></mt-header>
    <div class="header">
      <img src="../../images/header.jpg">
    </div>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li @click="regulatoryRecord" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <img src="../../images/2019120208.jpg"></li>
      <li @click="productionPtandard" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <img src="../../images/2019120201.jpg"></li>
      <li @click="companyDetails" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <img src="../../images/2019120202.jpg"></li>
      <li @click="sincerity" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <img src="../../images/2019120203.jpg"></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <img src="../../images/2019120204.jpg"></li>
    </ul>
    <mt-tabbar>
      <mt-button size="large" type="primary" @click="exit">退出登录</mt-button>
    </mt-tabbar>
  </div>
</template>

<script>
  export default {
    name: "Home",
    methods: {
      exit() {
        this.$router.push('/')
      },
      //监管记录
      regulatoryRecord() {
        this.$router.push('/regulatoryRecordTow')
      },
      //生产标准
      productionPtandard() {
        this.$router.push('/productionPtandardTow')
      },
      //企业信息
      companyDetails() {
        this.$router.push('/enterpriseInformationTow')
      },
      //诚信公示
      sincerity() {
        this.$router.push('/sincerityTow')
      }
    }
  }
</script>

<style scoped>
  .header {
    margin-top: 3rem;
    height: 12rem;
  }
  .mui-grid-view.mui-grid-9{
    background-color: #fff;
    border: none;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;
  }
  img{
    width: 100%;
    height: 100%;
  }
</style>
