<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工作任务</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">汇报任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box" v-if="!workData" v-loading="pageLoading">
      <div>装货...</div>
    </div>
    <div class="box" v-loading="listLoading" v-else>
      <el-row class="w-100 text-center margin-bottom-30">
        <el-col>
          <h1 class="middle-font">{{workData.title}}</h1>
        </el-col>
      </el-row>
      <el-row class="w-100 text-center margin-bottom-30 flex-justify-center">
        <el-col :span="5">发布日期：{{workData.releaseTime | formatDate}}</el-col>
        <el-col :span="5">发布者：{{workData.releasePerson}}</el-col>
      </el-row>
      <el-row class="w-100 text-center flex-justify-center margin-bottom-30">
        <el-col :span="12">{{workData.content}}</el-col>
      </el-row>
      <el-row class="w-100 flex-justify-center margin-bottom-30" v-if="workData.workTaskProfiles">
        <el-col :span="12">
          <el-button size="small" type="warning" plain @click="downloadFile()">附件下载</el-button>
          <span class="margin-left-20">{{workData.workTaskProfiles.replace("/uploads/", "")}}</span>
        </el-col>
      </el-row>
      <el-row class="margin-bottom-30">
        <el-col class="middle-font margin-left-20">工作任务汇报</el-col>
      </el-row>
      <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="汇报日期：" prop="reportTime">
              <el-date-picker
                class="w-100"
                v-model="ruleFormValue.reportTime"
                align="right"
                type="date"
                placeholder="汇报日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="汇报单位：" prop="townId">
              <el-select placeholder="请选择" v-model="ruleFormValue.townId" disabled>
                <el-option
                  v-for="town in township"
                  :key="town.id"
                  :label="town.name"
                  :value="town.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="汇报人：" prop="reportPerson">
              <el-input v-model="ruleFormValue.reportPerson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="汇报内容：" prop="reportContent">
              <el-input type="textarea" :rows="10" v-model="ruleFormValue.reportContent"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="left-margin">
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
import Auth from "@/services/authentication/auth.js";
import axios from "axios";
export default {
  name: "addWorkTaskReport",
  data() {
    return {
      file: null,
      selectedId: null,
      workData: null,
      township: [],
      listLoading: false,
      pageLoading: true,
      ruleFormValue: {
        townId: "",
        reportPerson: "",
        title: "",
        reportTime: ""
      },
      rules: {
        townId: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        reportPerson: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        reportTime: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        reportContent: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.selectedId = this.$route.query.id;
    this.getData(this.$route.query.id);
    this.getTown();
    this.ruleFormValue.townId = Auth().user().townId;
  },
  methods: {
    getData(id) {
      Request()
        .get("/api/work_task/get/" + id)
        .then(response => {
          this.workData = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTown() {
      Request()
        .get("/api/town/all")
        .then(response => {
          this.township = this.township.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          var formData = new FormData();
          formData = this.makeFormData();
          Request()
            .post("/api/work_task_report/create", formData)
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

      mainFormData.append("id", 0);
      this.ruleFormValue.reportTime = new Date(
        this.ruleFormValue.reportTime
      ).toDateString("YYYY-MM-DD");
      mainFormData.append("reportContent", this.ruleFormValue.reportContent);
      mainFormData.append("reportPerson", this.ruleFormValue.reportPerson);
      mainFormData.append("townId", this.ruleFormValue.townId);
      mainFormData.append("reportTime", this.ruleFormValue.reportTime);
      const createTime = new Date().toDateString("YYYY-MM-DD");
      mainFormData.append("createTime", createTime);
      mainFormData.append("workTaskId", this.selectedId);
      return mainFormData;
    },
    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.workData.workTaskProfiles,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          this.workData.workTaskProfiles.replace("/uploads/", "")
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