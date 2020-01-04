<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>作业定义</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">修改作业</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form 
        ref="editForm" 
        :model="editForm" 
        :rules="rules" 
        label-width="120px"
        v-loading="dataloading"
    >
        <el-form-item prop="jobName" label="作业名称" class="job-name-width">
            <el-input 
                v-model="editForm.jobName" 
                auto-complete="off"
            >
            </el-input>
        </el-form-item>
        <el-form-item label="作业类型" prop="jobType">
            <el-select v-model="editForm.jobType" placeholder="请选择">
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
            <div class="image-box">
                <input
                    type="file"
                    id="file"
                    ref="file"
                    class="image-upload"
                    accept="image/*"
                    v-on:change="handleFileUpload()"
                    name="images"
                    style="display:none"
                />
            </div>
            <div class="item-value" v-if="!file">
                <el-link @click="downloadFile()">
                    {{ editForm.jobFile.replace("/uploads/", "") }}
                </el-link>
            </div>
            <div class="item-value" v-if="file">
                ({{ file.name }})
            </div>
        </el-form-item>
        <el-form-item class="left-margin">
            <el-button size="small" type="success" plain @click="onSubmit('editForm')">
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
import axios from "axios";
export default {
  data() {
    return {
        editForm: {
            jobName: "",
            jobType: "",
            jobFile: ""
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
        file: null,
        dataloading: true,
        id: 0,
        is_ie:null
    };
  },
  created(){
    this.isIE();
  },
  mounted() {
    this.editForm.jobName = this.$route.query.jobName;
    this.editForm.jobType = this.$route.query.jobType;
    this.id = this.$route.params.id;
    this.getData(this.$route.params.id);
  },
  methods: {
    getData(id) {
        this.dataloading = true;
        Request()
            .get("/api/job_definition/get/" + id)
            .then(response => {
                this.editForm = response;
                this.images = [];
                this.images.push(Urls.DOWNLOAD_URL() + this.editForm.jobFile)
                setTimeout(() => {
                    this.dataloading = false;
                }, 0.01 * 1000);
            })
            .catch(error => {
                console.log(error);
            });
    },
    downloadFile() {
        axios({
            url: Urls.DOWNLOAD_URL() + this.editForm.jobFile,
            method: "GET",
            responseType: "blob" // important
        }).then(response => {
            if(!this.is_ie){
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                
                link.setAttribute(
                    "download",
                    this.editForm.jobFile.replace("/uploads/", "")
                ); //or any other extension
                document.body.appendChild(link);
                link.click();
                link.remove();
            }else{
                const newBlob = new Blob([response.data], {type: 'application/octet-stream'});
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(newBlob, this.editForm.jobFile.replace("/uploads/", ""));
                    return;
                }
            }
        });
    },
    onSubmit(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                this.dataloading = true;
                var formData = new FormData();
                formData = this.makeFormData();
                Request()
                    .put("/api/job_definition/update/" + this.id, formData)
                    .then(response => {
                        this.$router.push({ path: "/jobDefinition" });
                        setTimeout(() => {
                            this.dataloading = false;
                        }, 0.01 * 1000);
                    })
                    .catch(error => {});
            }
        });
    },
    chooseFile() {
      document.getElementById('file').click()
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      this.is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    },
    handleFileUpload() {
        this.file = this.$refs.file.files[0];
        this.images = [];
        let reader = new FileReader();
        let that = this;
        reader.onload = function (e) {
            that.images.push(e.target.result);

        }
        reader.readAsDataURL(this.file); 
    },
    makeFormData() {
        var mainFormData = new FormData();
        mainFormData.append("jobName", this.editForm.jobName);
        mainFormData.append("jobType", this.editForm.jobType);
        mainFormData.append("file", this.file);
        mainFormData.append("id", this.id);
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

