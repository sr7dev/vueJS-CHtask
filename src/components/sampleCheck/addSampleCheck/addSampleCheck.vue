<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>例行抽样</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加计划</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box" v-loading="creatingsample">
      <el-form v-if="data" :rules="dataRulse" ref="data" :model="data" label-width="100px">
        <el-form-item label="检测名称:" prop="sampleName">
          <el-input v-model="data.sampleName" style="width: 300px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="检测时间:" prop="sampleTime">
          <el-date-picker v-model="data.sampleTime" style="width: 300px !important;"></el-date-picker>
        </el-form-item>
        <el-form-item label="检测人员:" prop="checkPerson">
          <el-input v-model="data.checkPerson" placeholder style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item prop="checkFiles" label>
          <div style="display: flex;">
            <div class="item-label">
              <input
                type="file"
                id="file"
                style="display: none"
                ref="file"
                v-on:change="handleFileUpload()"
              />
              <el-button size="small" plain @click="chooseFile()">添加附件</el-button>
            </div>
            <span class="item-value" style="width: 500px;">{{data.checkFiles}}</span>
          </div>
        </el-form-item>
        <el-form-item label>
          <el-button size="small" type="success" plain @click="onSubmit()">保存</el-button>
          <el-button size="small" type="danger" plain @click="$router.push(`/sampleCheckMain/0`)">取消</el-button>
        </el-form-item>
      </el-form>
      <template v-if="!data">No matching data!</template>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request";
import Auth from "@/services/authentication/auth.js"
export default {
  name: "addSampleCheck",
  data() {
    return {
      id: -1,
      file: null,
      creatingsample: false,
      data: {
        checkFiles: "",
        checkPerson: "",
        createUserId: 0,
        id: 0,
        sampleId: 0,
        sampleName: "",
        sampleTime: "",
        updateUserId: 0
      },
      dataRulse: {
        sampleName: [
          { required: true, message: "请输入", trigger: "blur,change" }
        ],
        sampleTime: [
          { required: true, message: "请选择", trigger: "blur,change" }
        ],
        checkPerson: [
          { required: true, message: "请输入", trigger: "blur,change" }
        ],
        checkFiles: [
          { required: true, message: "请输入", trigger: "blur,change" }
        ]
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
      
      let formData = new FormData();
      formData.append("checkFiles", this.data.checkFiles);
      formData.append("checkPerson", this.data.checkPerson);
      formData.append("createUserId", Auth().user().id);
      formData.append("id", this.data.id);
      formData.append("sampleId", this.data.sampleId);
      formData.append("sampleName", this.data.sampleName);
      formData.append("updateUserId", Auth().user().id);
      formData.append("file", this.file);
      formData.append("sampleTime", this.data.sampleTime);
      formData.append("checkResult", "");
      formData.append("checkUnit", "");
      formData.append("createTime", this.data.sampleTime); // not sure
      formData.append("updateTime", this.data.sampleTime); // not sure
      this.$refs.data.validate(valid => {
        if (valid) {
          this.creatingsample = true;
          Request()
            .post("/api/sample_check/create", formData)
            .then(response => {
              this.creatingsample = false;
              this.$router.push(`/sampleCheckMain/0`);
            })
            .catch(error => {
              console.error(error);
            });
        }
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
