<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">修改评级</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form v-if="data" v-loading="updateLoading">
        <div class="item-row">
          <div class="item">
            <div class="item-label">状态</div>
            <div class="item-value">{{ allStatus[data.approvalStatus] }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item inline-block-IE">
            <div class="item-label">评级时间</div>
            <div class="item-value">{{ data.gradeTime | formatDate }}</div>
          </div>
          <div class="item inline-block-IE">
            <div class="item-label">名称</div>
            <div class="item-value">{{ companyName }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">原信用评级</div>
            <div class="item-value">{{ options[grades.indexOf(data.originalGrade)] }}</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">现信用评级</div>
            <div class="item-value">
              <el-select v-model="data.nowGrade" placeholder="请选择" disabled>
                <el-option
                  v-for="(item, optionIndex) in options"
                  :key="item"
                  :label="item"
                  :value="grades[optionIndex]"
                ></el-option>
              </el-select>
            </div>
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
              <input
                type="file"
                id="file"
                style="display: none"
                ref="file"
                v-on:change="handleFileUpload()"
              />
              <el-button size="small" type="warning" plain @click="downloadFile()">下载附件</el-button>
            </div>
            <div class="item-value" v-if="!file">
              <el-link @click="downloadFile()">
                {{
                data.uploadFileName.replace("/uploads/", "")
                }}
              </el-link>
            </div>
            <div class="item-value" v-if="file">({{ file.name }})</div>
          </div>
        </div>
        <div class="item-row">
          <div class="item">
            <!-- <div class="item-label">
              <el-button size="small" type="success" plain @click="saveChanges()">保存修改</el-button>
            </div> -->
            <div class="item-value">
              <el-button size="small" type="danger" plain @click="$router.go(-1)">返回</el-button>
            </div>
          </div>
        </div>
      </el-form>
      <el-form v-if="!data">装货...</el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import axios from "axios";

export default {
  name: "EditRating",
  data() {
    return {
      updateLoading: false,
      id: -1,
      file: null,
      pageName: this.$route.name,
      data: null,
      grades: ["A", "B", "C"],
      options: ["A级（守信）", "B级（基本守信）", "C级（失信）"],
      allStatus: ["待审批", "已同意", "已拒绝"],
      companyName: ""
    };
  },
  created() {
    this.companyName = this.$route.query.company;
    this.id = this.$route.params.id;
    this.getData(this.$route.params.id);
  },
  methods: {
    getData(id) {
      Request()
        .get("/api/company_credit_grade/get/" + id)
        .then(response => {
          this.data = response;
        })
        .catch(error => {
          console.log(error);
        });
    },

    chooseFile() {
      this.$refs.file.click();
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    saveChanges(event) {
      this.updateLoading = true;
      var formData = new FormData();
      formData.append("updatedNowGrade", this.data.nowGrade);
      formData.append("id", this.data.creditGradeId);
      if (this.file) {
        formData.append("file", this.file);
      }
      formData.append("data", this.data);
      Request()
        .put(
          "/api/company_credit_grade/update/" + this.data.creditGradeId,
          formData
        )
        .then(response => {
          this.saveChangeUpdateGrade();
        })
        .catch(error => {});
    },

    saveChangeUpdateGrade() {
      let data = [];
      data.push({
        approvalStatus: 2,
        creditCode: this.data.creditCode,
        grade: this.data.nowGrade
      });
      Request()
        .put(
          "/api/company_production/updateGrade/" +
            this.data.creditCode +
            "?approvalStatus=2" +
            "&grade" +
            this.data.nowGrade
        )
        .then(response => {
          this.updateLoading = false;
          this.$router.push({ path: "/creditRating" });
        })
        .catch(error => {});
    },

    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.data.uploadFileName,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          this.data.uploadFileName.replace("/uploads/", "")
        ); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./detailsRating.scss";
</style>
