<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>培训经费管理</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">经费详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form 
        ref="formData" 
        :model="formData" 
        label-width="100px"
        class="form-width" 
    >
        <el-form-item prop="projectName" label="项目名称:" class="input-width label-align">
            <el-input 
                v-model="formData.projectName" 
                auto-complete="off"
                disabled
            >
            </el-input>
        </el-form-item>
        <el-form-item label="申请金额:" prop="appliedAmount" class="input-width label-align">
             <el-input 
                v-model="formData.appliedAmount" 
                auto-complete="off"
                disabled
            >
            </el-input>
        </el-form-item>
        <div style="display:flex">
            <el-form-item label="申请人：" prop="proposer" class="input-width label-align" style="margin-right:30px">
                <el-input 
                    v-model="formData.proposer" 
                    auto-complete="off"
                    disabled
                >
                </el-input>
            </el-form-item>
            <el-form-item label="所在单位：" prop="companyId" class="input-width label-align2">
                <el-select v-model="formData.companyId" disabled>
                    <el-option
                        v-for="item in companyProduction"
                        :key="item.companyId"
                        :label="item.companyName"
                        :value="item.companyId"
                    ></el-option>
                </el-select>
            </el-form-item>
        </div>
        <!-- <el-form-item label="申请状态：" prop="status" class="input-width label-align">
             <el-input 
                v-model="formData.appliedAmount" 
                auto-complete="off"
                disabled
            >
            </el-input>
        </el-form-item> -->
        <el-form-item label="" prop="file">
            <el-button plain @click="downloadFile()">附件下载</el-button>
            <span class="item-value" v-if="!file_live_1">
                <el-link @click="downloadFile()">
                    {{ fileName }}
                </el-link>
            </span>
            <span class="item-value" v-if="file_live_1">
                ({{ fileName }})
            </span>
        </el-form-item>
        <el-form-item>
            <el-button plain v-on:click="$router.go(-1)" type="success">
                返回
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
        formData: {
            projectName: "",
            appliedAmount: "",
            proposer: "",
            companyId: "",
            status:""
        },
        companyProduction: [],
        fileName: '',
        file_live_1: null,
        dataloading: false,
        id: 0,
        appStatus: ["全部", "待审批", "已同意", "已拒绝"],
    };
  },
  mounted() {
    this.getCompanyProduct();
    this.id = this.$route.params.id;
    this.getData(this.$route.params.id);
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
    getData(id) {
        this.dataloading = true;
        Request()
            .get("/api/traningfunds/get/" + id)
            .then(response => {
                this.formData = response;
                this.file_live_1 = response.noticeProfiles;
                this.fileName = this.file_live_1.replace("/uploads/", "");
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
            url: Urls.DOWNLOAD_URL() + this.file_live_1,
            method: "GET",
            responseType: "blob" // important
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                this.file_live_1.replace("/uploads/", "")
            ); //or any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    },
  }
};
</script>

<style lang="scss">
</style>