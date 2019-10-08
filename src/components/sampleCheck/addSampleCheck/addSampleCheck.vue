<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>例行抽样</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加计划</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <template v-if="data">
        <div class="item-row">
          <div class="item">
            <div class="item-label">检测名称:</div>
            <div class="item-value">
              <el-input v-model="data.sampleName" placeholder=""></el-input>
            </div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">检测时间:</div>
            <div class="item-value">
              <el-date-picker
                v-model="data.sampleTime"
                type="date"
                placeholder="date"
              ></el-date-picker>
            </div>
          </div>
          <div class="item">
            <div class="item-label">检测人员:</div>
            <div class="item-value">
              <el-input v-model="data.checkPerson" placeholder=""></el-input>
            </div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label"></div>
            <div class="item-label">
              <input
                type="file"
                id="file"
                style="display: none"
                ref="file"
                v-on:change="handleFileUpload()"
              />
              <el-button plain @click="chooseFile()" type="primary"
                >添加附件</el-button
              >
            </div>
            <span class="item-value">{{ data.checkFiles }}</span>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label"></div>
            <div class="item-label">
              <el-button plain @click="onSubmit()" type="success"
                >保存</el-button
              >
            </div>
            <div class="item-value">
              <el-button plain @click="$router.go(-1)" type="warning"
                >取消</el-button
              >
            </div>
          </div>
        </div>
      </template>
      <template v-if="!data"
        >No matching data!</template
      >
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request";
export default {
  name: "addSampleCheck",
  data() {
    return {
      id: -1,
      data: {
        checkFiles: "",
        checkPerson: "",
        createUserId: 0,
        id: 0,
        sampleId: 0,
        sampleName: "",
        sampleTime: new Date(),
        updateUserId: 0
      }
    };
  },
  methods: {
    chooseFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.data.checkFiles = this.file.name;
    },
    onSubmit() {
      Request()
        .post("/api/sample_check/create", {
          checkFiles: this.data.checkFiles,
          checkPerson: this.data.checkPerson,
          createUserId: this.data.createUserId,
          id: this.data.id,
          sampleId: this.data.sampleId,
          sampleName: this.data.sampleName,
          sampleTime: this.data.sampleTime,
          updateUserId: this.data.updateUserId
        })
        .then(response => {
          this.$router.push(`/sampleCheck`);
        })
        .catch(error => {
          console.error(error);
        });
    },
    getDateString(dt) {
      const date = new Date(dt);
      return date.toLocaleDateString();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./addSampleCheck.scss";
</style>
