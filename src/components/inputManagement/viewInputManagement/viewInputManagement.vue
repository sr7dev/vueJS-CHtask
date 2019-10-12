<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>投入品管理</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">查看详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form 
        ref="formData" 
        :model="formData" 
        label-width="100px"
        class="form-width" 
    >
        <el-form-item label="企业名称" prop="companyId" class="input-width label-align">
            <el-select v-model="formData.companyId" disabled>
                <el-option
                    v-for="item in companyProduction"
                    :key="item.companyId"
                    :label="item.companyName"
                    :value="item.companyId"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="样品名称" prop="sampleName" class="input-width label-align">
             <el-input 
                v-model="formData.sampleName" 
                auto-complete="off"
                disabled
            >
            </el-input>
        </el-form-item>
        <el-form-item label="使用数量" prop="amount" class="input-width label-align">
            <el-input 
                v-model="formData.amount" 
                auto-complete="off"
                disabled
            >
            </el-input>
        </el-form-item>
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
            companyId: "",
            amount: "",
            sampleName: "",
        },
        companyProduction: [],
        fileName: '',
        file_live_1: null,
        dataloading: false,
        bLeft: true,
    };
  },
  mounted() {
    this.getCompanyProduct();
    this.bLeft = this.$route.query.mode;
    this.id = this.$route.params.id;
    this.getData(this.$route.params.id, this.bLeft);
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
    getData(id, bLeft) {
        this.dataloading = true;
        if (bLeft) {
            Request()
                .get("/api/inputsUse/get/" + id)
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
        } else {
            Request()
            .get("/api/inputsPurchase/get/" + id)
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
        }
        
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
        mainFormData.append("companyId", this.formData.companyId);
        mainFormData.append("amount", this.formData.amount);
        mainFormData.append("sampleName", this.formData.sampleName);
        mainFormData.append("file", this.file_live_1);
        mainFormData.append("id", 0);
        return mainFormData;
    },
  }
};
</script>

<style lang="scss">
    @import "../inputManagement.scss";
</style>