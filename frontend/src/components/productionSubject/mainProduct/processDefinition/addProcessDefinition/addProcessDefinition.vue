<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加作业</el-breadcrumb-item>
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
          <el-col :span="6">
            <el-form-item label="作业名称" prop="taskName">
              <el-input v-model="ruleFormValue.taskName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="作业类型" prop="taskType">
              <el-select v-model="ruleFormValue.taskType" :disabled="!(options.length > 0)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="添加图片" prop="file" class="label-margin">
          <input
            type="file"
            id="file"
            style="display: none"
            ref="file"
            accept="image/*"
            v-on:change="handleFileUpload()"
          />
          <div style="border:solid 1px; width:100px; height:100px" @click="chooseFile()">
            <img
              v-if="!imageSelectedUrl && ruleFormValue.taskImages"
              :src="imageUrl + ruleFormValue.taskImages"
              style="width: 7rem; height: 7rem;"
            />
            <img v-if="imageSelectedUrl" :src="imageSelectedUrl" style="width: 7rem; height: 7rem;" />
          </div>
          <div class="item-value">
            <div v-if="file" style>{{ file.name }}</div>
            <div v-else style>请选择需要上传的文件...</div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="success" @click="onSubmit('ruleForm')" plain>保存</el-button>
          <el-button size="small" type="danger" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../../../services/api/request.js";
export default {
  name: "addProcessDefinition",
  data() {
    return {
      file: null,
      listLoading: false,
      imageUrl: "",
      imageSelectedUrl: "",
      companyId: -1,
      ruleFormValue: {
        file: null,
        taskType: "",
        taskName: "",
        taskImages: "",
        doShare: "",
        productId: 0
      },
      rules: {
        taskName: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        taskType: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ]
      },
      options: [
        { value: "1", label: "收获前" },
        { value: "2", label: "收获" },
        { value: "3", label: "收获后" }
      ]
    };
  },
  created() {
    this.ruleFormValue.productId = this.$route.params.id;
    this.ruleFormValue.doShare = this.$route.query.doShare;
    this.companyId = this.$route.query.companyId;
  },
  methods: {
    chooseFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let reader = new FileReader();
      this.imageSelectedUrl = "";
      let that = this;
      reader.onload = function(e) {
        that.imageSelectedUrl = e.target.result;
      };
      if (this.file) {
        reader.readAsDataURL(this.file);
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = new FormData();
          formData.append("doShare", this.ruleFormValue.doShare);
          formData.append("id", "0");
          formData.append("productId", this.ruleFormValue.productId);
          formData.append("taskName", this.ruleFormValue.taskName);
          formData.append("taskType", this.ruleFormValue.taskType);
          formData.append("file", this.file);
          this.listLoading = true;
          Request()
            .post("/api/product_task/create", formData)
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.goBack();
            })
            .catch(error => {});
        } else {
          console.log("错误 !!");
          return false;
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
@import "../processDefinition.scss";
</style>
