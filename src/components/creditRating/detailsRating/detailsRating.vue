<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>经营主体</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <template v-if="data">
        <div class="item-row">
          <div class="item">
            <div class="item-label">状态</div>
            <div class="item-value">{{ data.approvalStatus }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">评级时间</div>
            <div class="item-value">{{ data.gradeTime }}</div>
          </div>
          <div class="item">
            <div class="item-label">名称</div>
            <div class="item-value">{{ data.approvalGrade }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">原信用评级</div>
            <div class="item-value">{{ data.originalGrade }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">现信用评级</div>
            <div class="item-value">{{ data.nowGrade }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">评级单位</div>
            <div class="item-value">{{ data.gradeUnit }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">
              <el-button size="small" type="warning" plain variant="outline-dark">下载附件</el-button>
            </div>
            <div class="item-value">{{ data.creditCode }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">
              <el-button size="small" type="success" plain @click="$router.go(-1)">同意</el-button>
            </div>
            <div class="item-value">
              <el-button size="small" type="danger" plain @click="$router.go(-1)">拒绝</el-button>
            </div>
          </div>
        </div>
      </template>
      <template v-if="!data">装货...</template>
    </div>
  </div>
</template>

<script>
import sampleData from "../_data";
export default {
  name: "detailsRating",
  data() {
    return {
      id: -1,
      pageName: this.$route.name,
      datas: sampleData,
      data: null
    };
  },
  created() {
    this.id = this.$route.params.id;
    const pos = this.datas.findIndex(i => i.creditGradeId == this.id);
    if (pos >= 0) {
      this.data = this.datas[pos];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./detailsRating.scss";
</style>
