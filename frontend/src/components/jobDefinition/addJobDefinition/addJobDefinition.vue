<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>作业定义</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加作业</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form 
        ref="addForm" 
        :model="addForm" 
        :rules="rules" 
        label-width="120px"
        v-loading="dataLoading"
      >
        <el-form-item prop="jobName" label="作业名称" class="job-name-width">
            <el-input 
                v-model="addForm.jobName" 
                auto-complete="off"
            >
            </el-input>
        </el-form-item>
        <el-form-item label="作业类型" prop="jobType">
            <el-select v-model="addForm.jobType" placeholder="请选择">
                <el-option
                    v-for="item in jobTypes"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="现场图片">
            <div 
                @click="chooseFile()"
                class="image-container"
            >
                <img 
                    v-for="src in images" 
                    :src="src" 
                    :key="src" 
                    class="preview"
                >
            </div>
            <p>{{ fileName }}</p>
            <div class="image-box">
                <input
                    type="file"
                    id="file"
                    ref="file_live_1"
                    class="image-upload"
                    accept="image/*"
                    v-on:change="handleFileUpload()"
                    name="images"
                    style="display:none"
                />
            </div>
        </el-form-item>
        <el-form-item label="">
            <el-button size="small" type="success" plain @click="onSubmit('addForm')">
                保存
            </el-button>
            <el-button size="small" type="danger" plain v-on:click="$router.go(-1)">
                取消
            </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";

export default {
  data() {
    return {
        addForm: {
            jobName: "",
            jobType: "",
        },
        jobTypes: [
            { id: 0, name: "收获前" },
            { id: 1, name: "收获" },
            { id: 2, name: "收获后" }
        ],
        rules: {
            jobName: [
            {
                required: true,
                message: "请插入",
                trigger: "change"
            }],
            jobType: [
            {
                required: true,
                message: "请选择",
                trigger: "change"
            }],
        },
        images:[],
        fileName: '',
        file_live_1: null,
        dataLoading: false

    };
  },
  mounted() {
  },
  methods: {
    onSubmit(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                this.dataLoading = true;
                var formData = new FormData();
                formData = this.makeFormData();
                Request()
                    .post("/api/job_definition/create", formData)
                    .then(response => {
                        this.$router.push({ path: "/jobDefinition" });
                        setTimeout(() => {
                            this.dataLoading = false;
                        }, 0.01 * 1000);
                    })
                    .catch(error => {});
            }
        });
    },
    chooseFile() {
      document.getElementById('file').click()
    },
    handleFileUpload() {
        this.file_live_1 = this.$refs.file_live_1.files[0];
        this.images = [];
        let reader = new FileReader();
        let that = this;
        reader.onload = function (e) {
            that.images.push(e.target.result);

        }
        reader.readAsDataURL(this.file_live_1); 
        this.fileName = this.file_live_1.name;
    },
    makeFormData() {
        var mainFormData = new FormData();
        mainFormData.append("jobName", this.addForm.jobName);
        mainFormData.append("jobType", this.addForm.jobType);
        mainFormData.append("file", this.file_live_1);
        mainFormData.append("id", 0);
        return mainFormData;
    },
  }
};
</script>

<style scoped>
.image-container {
    border: 1px solid;
    cursor: pointer;
}
</style>