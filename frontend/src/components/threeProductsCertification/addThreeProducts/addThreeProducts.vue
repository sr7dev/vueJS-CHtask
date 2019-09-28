<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>三品认证</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加认证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="企业名称" prop="creditCode">
              <el-select
                v-model="ruleFormValue.creditCode"
                v-on:change="getProductionDetail()"
                :disabled="!(companyNameList.length>0)"
              >
                <el-option
                  v-for="item in companyNameList"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.creditCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品名称" prop="productId">
              <el-select v-model="ruleFormValue.productId" :disabled="!(productNameList.length>0)">
                <el-option
                  v-for="item in productNameList"
                  :key="item.productId"
                  :label="item.productName"
                  :value="item.productId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="认证类型" prop="certficationType">
          <el-radio-group v-model="ruleFormValue.certficationType">
            <el-radio label="1">无公害产品</el-radio>
            <el-radio label="2">绿色食品</el-radio>
            <el-radio label="3">有机食品</el-radio>
            <el-radio label="4">地理标志</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="认证类别" prop="certficationCategory">
              <el-input v-model="ruleFormValue.certficationCategory"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="农业分类" prop="argriculturalClassification">
              <el-select v-model="ruleFormValue.argriculturalClassification">
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
        <el-form-item label="认证有效期" style="text-align: center" required>
          <el-col :span="5">
            <el-form-item prop="certificationStartTime">
              <el-date-picker
                type="datetime"
                v-model="ruleFormValue.certificationStartTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="5">
            <el-form-item prop="certificationEndTime">
              <el-date-picker
                type="datetime"
                v-model="ruleFormValue.certificationEndTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="产量" prop="output">
              <el-input v-model="ruleFormValue.output"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="item">
              <div class="item-label" style="margin-bottom:20px;display:inline-block">
                <input
                  type="file"
                  id="file"
                  style="display: none"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
                <el-button type="warning" plain @click="chooseFile()">添加附件</el-button>
              </div>
              <div class="item-value" style="display:inline-block;margin-left:10px;">
                <span v-if="file">({{file.name}})</span>
                <span v-else>请选择需要上传的文件...</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="success" @click="onSubmit('ruleForm')" plain>保存</el-button>
          <el-button type="danger" @click="goBack" plain>取消</el-button>
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
  name: "addThreeProducts",
  data() {
    return {
      ruleFormValue: {
        creditCode: "",
        productId: "",
        certficationType: "",
        certficationCategory: "",
        argriculturalClassification: "",
        certificationStartTime: "",
        certificationEndTime: "",
        output: ""
      },
      rules: {
        creditCode: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        productId: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        certficationType: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        certficationCategory: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        argriculturalClassification: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        certificationStartTime: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        certificationEndTime: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        output: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ]
      },
      file: null,
      companyNameList: [],
      productNameList: [],
      options: [
        { value: "1", label: "养殖业" },
        { value: "2", label: "畜牧业" },
        { value: "3", label: "种植业" }
      ]
    };
  },
  created() {
    this.getCompanyProduction();
  },
  methods: {
    getCompanyProduction() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyNameList = response;
        })
        .catch(error => {
          console.log(error);
        });
    },

    getProductionDetail() {
      var companyId = this.filterCompany(this.ruleFormValue.creditCode);

      Request()
        .get("/api/product_production/all", {
          company_id: companyId
        })
        .then(response => {
          this.productNameList = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = new FormData();

          formData.append("creditCode", this.ruleFormValue.creditCode);
          formData.append("productId", this.ruleFormValue.productId);
          formData.append(
            "certficationType",
            this.ruleFormValue.certficationType
          );
          formData.append(
            "certficationCategory",
            this.ruleFormValue.certficationCategory
          );
          formData.append(
            "argriculturalClassification",
            this.ruleFormValue.argriculturalClassification
          );
          formData.append(
            "certificationStartTime",
            this.ruleFormValue.certificationStartTime
          );
          formData.append(
            "certificationEndTime",
            this.ruleFormValue.certificationEndTime
          );
          if (this.file) {
            formData.append("files", this.file);
          }
          Request()
            .post("/api/quality_standard/create", formData, {
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(response => {
              this.$router.push({ path: "threeProductsCertification" });
            })
            .catch(error => {});
        } else {
          console.log("错误 !!");
          return false;
        }
      });
    },
    filterCompany(credit) {
      let company = this.companyNameList.find(x => x.creditCode === credit);
      if (company) {
        return company.companyId;
      } else {
        return "";
      }
    },
    goBack() {
      this.$router.go(-1);
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

<style scoped>
</style>
