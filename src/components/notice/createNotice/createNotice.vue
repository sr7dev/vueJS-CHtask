<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>通知管理</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">发布公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="rules"
        label-width="100px"
        class="form-width"
        v-loading="dataloading"
      >
        <el-form-item
          prop="timingRelease"
          label="定时发布"
          class="input-width label-align"
        >
          <el-date-picker
            v-model="addForm.timingRelease"
            auto-complete="off"
            type="datetime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="紧急程度"
          prop="emergencyDegree"
          class="input-width label-align"
        >
          <el-select v-model="addForm.emergencyDegree" placeholder="请选择">
            <el-option
              v-for="item in emergencyDegrees"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type" class="input-width label-align">
          <el-input v-model="addForm.type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="日期"
          prop="releaseTime"
          class="input-width label-align"
        >
          <el-date-picker
            type="date"
            v-model="addForm.releaseTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="发布人"
          prop="releasePerson"
          class="input-width label-align"
        >
          <el-input
            v-model="addForm.releasePerson"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="title" label="标题" class="label-align">
          <el-input v-model="addForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容" class="label-align">
          <el-input
            v-model="addForm.content"
            auto-complete="off"
            type="textarea"
            :rows="10"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="file">
          <input
            type="file"
            id="file"
            style="display: none"
            ref="file_live_1"
            v-on:change="handleFileUpload()"
          />
          <el-button size="small" plain @click="chooseFile()"
            >添加附件</el-button
          >
          <span style="width: 300px;" class="margin-left-10">{{
            fileName
          }}</span>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="success"
            plain
            @click="onSubmit('addForm')"
            >保存</el-button
          >
          <el-button
            size="small"
            type="danger"
            plain
            v-on:click="$router.go(-1)"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import Auth from "@/services/authentication/auth.js";
export default {
  data() {
    return {
      addForm: {
        timingRelease: "",
        emergencyDegree: 0,
        type: "",
        releaseTime: "",
        releasePerson: "",
        title: "",
        content: ""
      },
      emergencyDegrees: [
        { id: 0, name: "高" },
        { id: 1, name: "中" },
        { id: 2, name: "低" }
      ],
      rules: {
        content: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        releaseTime: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        title: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        timingRelease: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        emergencyDegree: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        releasePerson: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ]
      },
      images: [],
      fileName: "",
      file_live_1: null,
      dataloading: false
      // loggedinUserType: null
    };
  },
  mounted() {
    // this.loggedinUserType = Auth().user().userType;
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dataloading = true;
          var formData = new FormData();
          formData = this.makeFormData();
          Request()
            .post("/api/notice/create", formData)
            .then(response => {
              this.$router.push({ path: "/notice" });
              setTimeout(() => {
                this.dataloading = false;
              }, 0.01 * 1000);
            })
            .catch(error => {});
        }
      });
    },
    chooseFile() {
      document.getElementById("file").click();
    },
    handleFileUpload() {
      this.file_live_1 = this.$refs.file_live_1.files[0];
      this.fileName = this.file_live_1.name;
    },
    makeFormData() {
      var mainFormData = new FormData();
      mainFormData.append("timingRelease", this.addForm.timingRelease);
      mainFormData.append("emergencyDegree", this.addForm.emergencyDegree);
      mainFormData.append("type", this.addForm.type);
      mainFormData.append("releaseTime", this.addForm.releaseTime);
      mainFormData.append("releasePerson", this.addForm.releasePerson);
      mainFormData.append("title", this.addForm.title);
      mainFormData.append("content", this.addForm.content);
      mainFormData.append("id", 0);
      mainFormData.append("file", this.file_live_1);
      mainFormData.append("createUserId", Auth().user().id);
      mainFormData.append("updateUserId", Auth().user().id);
      return mainFormData;
    }
  }
};
</script>

<style lang="scss"></style>
