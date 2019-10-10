<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>作业定义</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加作业</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form ref="addForm" :model="addForm" :rules="rules">
        <el-form-item prop="jobName" label="作业名称">
            <el-input v-model="addForm.jobName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="作业类型" prop="jobType">
            <el-select v-model="addForm.jobType" placeholder="请选择">
                <el-option
                  v-for="item in jobTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="jobFile" label="现场图片">
            <input
                type="file"
                id="file"
                style="display: none"
                ref="file"
                v-on:change="handleFileUpload()"
            />
            <el-button type="warning" plain @click="chooseFile()">
                添加附件
            </el-button>
            <div
                class="item-value"
                style="display:inline-block;margin-left:10px;"
            >
                <span v-if="file">({{ file.name }})</span>
                <span v-else>请选择需要上传的文件...</span>
            </div>
        </el-form-item>
        <el-form-item class="left-margin">
            <el-button type="success" plain @click="onSubmit('ruleForm')">
                保存
            </el-button>
            <el-button type="danger" plain v-on:click="$router.go(-1)">
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
      addForm: {
        jobName: "1",
        jobType: "",
        jobFile: ""
      },
      rules: {
        jobName: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        jobType: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        jobFile: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
      }
    };
  },
  mounted() {
  },
  methods: {
    onSubmit(formName) {
        this.$refs.addForm.validate(valid => {
                if (valid) {
                    var formData = new FormData();
                    formData = this.makeFormData();
                    Request()
                        .post("/api/supervision_record/create", formData)
                        .then(response => {
                            this.$router.push({ path: "/regulatoryRecord" });
                        })
                        .catch(error => {});
                }
        });
    },
    chooseFile() {
        
    },
    handleFileUpload() {

    }
  }
};
</script>

<style lang="scss">
</style>