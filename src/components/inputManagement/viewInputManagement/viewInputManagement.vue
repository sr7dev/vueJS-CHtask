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
        v-loading="dataloading"
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
        <el-form-item 
          label="使用数量" 
          prop="amount" 
          class="input-width label-align"
          v-if="bLeft"
        >
          <el-input 
              v-model="formData.amount" 
              auto-complete="off"
              disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item 
          label="采购数量" 
          prop="amount" 
          class="input-width label-align"
          v-else
        >
            <el-input 
                v-model="formData.amount" 
                auto-complete="off"
                disabled
            >
            </el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button plain @click="downloadFile()">附件下载</el-button>
            <span class="item-value" v-if="!file">
                <el-link @click="downloadFile()">
                    {{ fileName }}
                </el-link>
            </span>
            <span class="item-value" v-if="file">
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
        file: null,
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
                    this.file = response.inputProfiles;
                    this.fileName = this.file.replace("/uploads/", "");
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
                this.file = response.inputProfiles;
                this.fileName = this.file.replace("/uploads/", "");
                
                setTimeout(() => {
                    this.dataloading = false;
                }, 0.01 * 1000);
            })
            .catch(error => {
                console.log(error);
            });   
        }
        
    },
    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.file,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download", 
          this.file.replace("/uploads/", "")
        ); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    }
  }
}
</script>

<style lang="scss">
    @import "../inputManagement.scss";
</style>