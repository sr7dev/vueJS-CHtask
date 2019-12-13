<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工作任务</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加工作任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form
        ref="ruleForm"
        :model="ruleFormValue"
        :rules="rules"
        label-width="100px"
        v-loading="listLoading"
      >
        <el-row>
          <el-col :span="9">
            <el-form-item label="发布日期" prop="releaseTime">
              <el-date-picker
                v-model="ruleFormValue.releaseTime"
                align="right"
                type="date"
                placeholder="开始日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="发布者" prop="releasePerson">
              <el-input v-model="ruleFormValue.releasePerson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input v-model="ruleFormValue.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="内容" prop="content">
              <el-input type="textarea" :rows="10" v-model="ruleFormValue.content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <div class="item" style="display:flex">
              <div class="item-label" style="margin-bottom:20px;">
                <input
                  type="file"
                  id="file"
                  style="display: none"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
                <el-button size="small" type="warning" plain @click="chooseFile()">添加附件</el-button>
              </div>
              <div
                class="item-value"
                style="margin-left:10px;
                      display: flex;
                      align-items: center;
                      padding-bottom: 20px;"
              >
                <span v-if="file">({{ file.name }})</span>
                <span v-else>请选择需要上传的文件...</span>
              </div>
            </div>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button size="small" type="success" plain @click="onSubmit('ruleForm')">保存</el-button>
          <el-button size="small" type="primary" plain v-on:click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";

export default {
  name: "addWorkTask",
  data() {
    return {
      file: null,
      ruleFormValue: {
        releaseTime: "",
        releasePerson: "",
        title: "",
        content: ""
      },
      listLoading: false,
      rules: {
        releaseTime: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        releasePerson: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        title: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ]
      }
    };
  },

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          var formData = new FormData();
          formData = this.makeFormData();
          Request()
            .post("/api/work_task/create", formData)
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.$router.push({ path: "/workTask" });
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    makeFormData() {
      var mainFormData = new FormData();
      if (this.file) {
        mainFormData.append("file", this.file);
      }
      mainFormData.append("id", 0);
      this.ruleFormValue.releaseTime = new Date(
        this.ruleFormValue.releaseTime
      ).toDateString("YYYY-MM-DD");
      mainFormData.append("releaseTime", this.ruleFormValue.releaseTime);
      mainFormData.append("releasePerson", this.ruleFormValue.releasePerson);
      mainFormData.append("title", this.ruleFormValue.title);
      mainFormData.append("content", this.ruleFormValue.content);
      const createTime = new Date().toDateString("YYYY-MM-DD");
      mainFormData.append("createTime", createTime);
      return mainFormData;
    },
    chooseFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>

<style lang="scss">
</style>