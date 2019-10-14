<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>种子管理</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">上传原料</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="输入市，区" prop="cityId">
              <el-select v-model="ruleFormValue.cityId" placeholder="请选择">
                <el-option
                  v-for="item in cityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="输入乡镇" prop="townId">
              <el-select v-model="ruleFormValue.townId" placeholder="请选择" @change="getCompanyList">
                <el-option
                  v-for="item in townList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="输入村" prop="villageId">
              <el-select v-model="ruleFormValue.villageId" placeholder="请选择">
                <el-option
                  v-for="item in villageList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="输入企业" prop="companyId">
              <el-select v-model="ruleFormValue.companyId" placeholder="请选择">
                <el-option
                  v-for="item in companyProduction"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-col :span="18">
            <div class="item" style="display:flex">
              <div class="item-label" style="margin-bottom:20px;">
                <input
                  type="file"
                  id="file"
                  style="display: none"
                  ref="file"
                  accept=".xls, .xlsx"
                  v-on:change="handleFileUpload()"
                />
                <el-button type="warning" plain @click="chooseFile()">添加附件</el-button>
              </div>
              <div
                class="item-value"
                style="margin-left:10px;
                      display: flex;
                      align-items: center;
                      padding-bottom: 20px;"
              >
                <span v-if="file">({{ file.name }})</span>
                <span v-else>请选择需要上传的文件...</span>
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain @click="onSubmit('ruleForm')">保存</el-button>
          <el-button type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
export default {
  name: "uploadSeed",
  data() {
    return {
      file: null,
      cityList: [],
      villageList: [],
      townList: [],
      companyProduction: [],
      ruleFormValue: {
        cityId: null,
        townId: null,
        villageId: null,
        companyId: null
      },
      rules: {
        cityId: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        townId: [
          {
            required: true,
            message: "请选择"
          }
        ],
        villageId: [
          {
            required: true,
            message: "请选择"
          }
        ],
        companyId: [
          {
          required: true,
          message: "请选择",
          trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.getCity();
    this.getVillage();
    this.getTown();
  },
  methods: {
    getCity() {
      Request()
        .get("/api/city/all")
        .then(response => {
          this.cityList = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getVillage() {
      Request()
        .get("/api/village/all")
        .then(response => {
          this.villageList = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTown() {
      Request()
        .get("/api/town/all")
        .then(response => {
          this.townList = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCompany() {
      Request()
        .get("/api/company_production/all", {
          townId: this.ruleFormValue.townId
        })
        .then(response => {
          this.companyProduction = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCompanyList() {
      this.getCompany();
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = new FormData();
          formData = this.makeFormData();
          Request()
            .post("/api/seed/create", formData)
            .then(response => {
              this.$router.push({ path: "/seed" });
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    makeFormData() {
      var mainFormData = new FormData();
      if (this.file) {
        mainFormData.append("file", this.file);        
      }
      mainFormData.append("id", 0);
      mainFormData.append("cityId", this.ruleFormValue.cityId);
      mainFormData.append("companyId", this.ruleFormValue.companyId);
      mainFormData.append("townId", this.ruleFormValue.townId);
      mainFormData.append("villageId", this.ruleFormValue.villageId);
      return mainFormData;
    },
    chooseFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>

<style lang="scss">
</style>