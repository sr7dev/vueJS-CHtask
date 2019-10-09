<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">经营主体</el-breadcrumb-item>
        <el-breadcrumb-item>企业详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="introduce_title">公司简介</div>
      <el-row :gutter="30">
        <el-col :span="5">
          <el-image style="width: 100%;" :src="url" :fit="cover"></el-image>
        </el-col>
        <el-col :span="12">
          <div class="company_title">福鼎白茶</div>
          <p>
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          </p>
        </el-col>
      </el-row>
      <div class="introduce_title">主营产品</div>
      <el-row :gutter="50">
        <el-col :span="8">
          <div class="company_title">福鼎白茶</div>
          <p>
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          </p>
        </el-col>
        <el-col :span="8">
          <div class="company_title">福鼎白茶</div>
          <p>
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          </p>
        </el-col>
        <el-col :span="8">
          <div class="company_title">福鼎白茶</div>
          <p>
            啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
          </p>
        </el-col>
      </el-row>
      <div class="introduce_title">联系我们</div>
      <el-row :gutter="50">
        <el-col :span="6">
          <div class="company_title">联系人</div>
          <p>啊啊啊啊</p>
        </el-col>
        <el-col :span="6">
          <div class="company_title">电话</div>
          <p>15951580999</p>
        </el-col>
        <el-col :span="6">
          <div class="company_title">地址</div>
          <p>无锡市新吴区国家软件园</p>
        </el-col>
      </el-row>
      <el-button style="margin-top: 50px" plain type="primary">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  }
};
</script>

<style scoped>
.introduce_title {
  font-size: 22px;
  margin: 50px auto 25px auto;
}
.company_title {
  font-size: 18px;
  margin: 0 auto 10px auto;
}
</style>