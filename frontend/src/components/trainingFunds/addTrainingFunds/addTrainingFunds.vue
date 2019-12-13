<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>培训经费管理</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加经费</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form 
        ref="addForm" 
        :model="addForm" 
        :rules="rules" 
        label-width="100px"
        class="form-width" 
        v-loading="dataLoading"
    >
        <el-form-item prop="projectName" label="项目名称:" class="input-width label-align">
            <el-input 
                v-model="addForm.projectName" 
                auto-complete="off"
            >
            </el-input>
        </el-form-item>
        <el-form-item label="申请金额:" prop="appliedAmount" class="input-width label-align">
             <el-input 
                v-model="addForm.appliedAmount" 
                auto-complete="off"
                type="number"
            >
            </el-input>
        </el-form-item>
        <el-form-item label="申请人：" prop="proposer" class="input-width label-align" style="margin-right:30px">
            <el-input 
                v-model="addForm.proposer" 
                auto-complete="off"
            >
            </el-input>
        </el-form-item>
        <el-form-item label="所在单位：" prop="companyId" class="input-width label-align2">
            <el-select v-model="addForm.companyId">
                <el-option
                    v-for="item in companyProduction"
                    :key="item.companyId"
                    :label="item.companyName"
                    :value="item.companyId"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="" prop="file_live_1">
            <input
                type="file"
                id="file"
                style="display: none"
                ref="file_live_1"
                v-on:change="handleFileUpload()"
            />
            <el-button size="small" type="warning" plain @click="chooseFile()">添加附件</el-button>
            <span v-if="file_live_1">({{ fileName }})</span>
            <span v-else>请选择需要上传的文件...</span>
        </el-form-item>
        <el-form-item class="left-margin">
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
            projectName: "",
            appliedAmount: "",
            proposer: "",
            companyId: "",
        },
        companyProduction: [],
        rules: {
            projectName: [
            {
                required: true,
                message: "请插入",
                trigger: "change"
            }],
            appliedAmount: [
            {
                required: true,
                message: "请插入",
                trigger: "change",
            }],
            companyId: [
            {
                required: true,
                message: "请选择",
                trigger: "change"
            }],
            proposer: [
            {
                required: true,
                message: "请插入",
                trigger: "change"
            }],
        },
        fileName: '',
        file_live_1: null,
        dataLoading: false
    };
  },
  mounted() {
      this.getCompanyProduct();
  },
  methods: {
    getCompanyProduct() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
            this.companyProduction = this.companyProduction.concat(response);
        })
        .catch(error => {
            console.log(error);
        });
    },
    onSubmit(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                this.dataLoading = true;
                var formData = new FormData();
                formData = this.makeFormData();
                Request()
                    .post("/api/training_funds/create", formData)
                    .then(response => {
                        this.$router.push({ path: "/trainingFunds" });
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
        this.fileName = this.file_live_1.name;
    },
    makeFormData() {
        var mainFormData = new FormData();
        mainFormData.append("projectName", this.addForm.projectName);
        mainFormData.append("appliedAmount", this.addForm.appliedAmount);
        mainFormData.append("proposer", this.addForm.proposer);
        mainFormData.append("companyId", this.addForm.companyId);
        mainFormData.append("id", 0);
        mainFormData.append("file", this.file_live_1);
        return mainFormData;
    },
  }
};
</script>

<style lang="scss">
</style>