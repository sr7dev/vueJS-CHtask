<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }"
          >监管对象</el-breadcrumb-item
        >
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加认证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form label-width="100px" ref="dataForm" :model="data" :rules="rules" v-if="!dataloading">
        <el-row>
          <el-col :span="6">
            <el-form-item label="日期">
              <el-input v-model="this.oldDate" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="样品">
              <el-input v-model="data.specimen"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检测项目">
              <el-input v-model="data.checkItem"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检测结果">
              <el-input v-model="data.checkResult"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="判定">
              <el-input v-model="data.determine"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检测标准">
              <el-input v-model="data.checkStandard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检测机构">
              <el-input v-model="data.checkOrganization"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="success" @click="onSubmit('dataForm')" plain>保存</el-button>
          <el-button type="danger" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../../../services/api/request.js";
import { Urls } from "../../../../../services/constants";
import axios from "axios";
export default {
  name: "detailThirdPartySampling",
  data() {
    return {
      id : -1,
      oldDate: null,
      data: null,     
      dataloading: false,
      rules: {
        createTime: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        specimen: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        checkItem: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        checkResult: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        determine: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        checkStandard: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        checkOrganization: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
      },
    };
  },
  created() {   
    this.getData(this.$route.query.product);
  },
  methods: {    
    getData(id) {
      this.dataloading = true;
      Request()
        .get("/api/product_check_record/get/" + id)
        .then(response => {
          this.data = response;
          this.oldDate = this.data.createTime.slice(0,10);
          setTimeout(()=>{ this.dataloading = false }, 0.01*1000);
        })
        .catch(error => {
          console.log(error);
        });
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = new FormData();

          formData.append( "id", this.data.id);
          formData.append("checkItem", this.data.checkItem);
          formData.append("checkOrganization", this.data.checkOrganization);
          formData.append( "checkResult", this.data.checkResult);
          formData.append( "createTime", this.data.createTime);
          formData.append( "createUserId", this.data.createUserId);
          formData.append( "determine", this.data.determine);
          formData.append( "productCheckTime", new Date().toJSON());
          formData.append( "productId", this.data.productId);
          formData.append( "specimen", this.data.specimen);
          formData.append( "updateTime", new Date().toJSON());
          formData.append( "updateUserId", this.data.updateUserId);
          
          Request()
            .post("/api/product_check_record/update/" + this.data.id, formData)
            .then(response => {
              this.$router.push({ path: "/threeProductsCertification" });
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

<style scoped>
</style>
