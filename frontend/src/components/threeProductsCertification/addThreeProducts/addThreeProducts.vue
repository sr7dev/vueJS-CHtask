<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>认证工作</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加认证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form
        ref="ruleForm"
        :model="ruleFormValue"
        :rules="rules"
        label-width="100px"
        v-loading="listLoading"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="企业名称" prop="creditCode">
              <el-select
                v-model="ruleFormValue.creditCode"
                v-on:change="getProductionDetail()"
                :disabled="!(companyNameList.length > 0)"
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
              <el-select
                v-model="ruleFormValue.productId"
                :disabled="!(productNameList.length > 0)"
              >
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
        <el-form-item label="认证类型" prop="certificationType">
          <el-radio-group v-model="ruleFormValue.certificationType">
            <el-radio label="1">无公害产品</el-radio>
            <el-radio label="2">绿色食品</el-radio>
            <el-radio label="3">有机食品</el-radio>
            <el-radio label="4">绿色优质基地</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="认证类别" prop="certificationCategory">
              <el-input v-model="ruleFormValue.certificationCategory"></el-input>
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
        <el-row>
          <el-col :span="6">
            <el-form-item label="证书编号" prop="certificationNo">
              <el-input v-model="ruleFormValue.certificationNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="认证有效期" style="text-align: center" required>
          <el-col :span="4" class="text-left">
            <el-form-item prop="certificationStartTime">
              <el-date-picker
                type="datetime"
                class="w-80"
                v-model="ruleFormValue.certificationStartTime"
                style="width: 100%;"
                value-format="dd.MM.yyyy HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="text-left" :span="1">至</el-col>
          <el-col :span="4" class="text-left">
            <el-form-item prop="certificationEndTime">
              <el-date-picker
                class="w-100"
                type="datetime"
                value-format="dd.MM.yyyy HH:mm:ss"
                v-model="ruleFormValue.certificationEndTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="产量" prop="output">
              <el-input v-model.number="ruleFormValue.output"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <div class="item" style="display:flex">
              <el-form-item class="item-label" style="margin-bottom:20px;">
                <input
                  type="file"
                  id="file"
                  style="display: none"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
                <el-button size="small" type="warning" plain @click="chooseFile()">添加附件</el-button>
                <span v-if="file" class="margin-left-10">{{ file.name }}</span>
                <span v-else class="margin-left-10">请选择需要上传的文件...</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button size="small" type="success" @click="onSubmit('ruleForm')" plain>保存</el-button>
          <el-button size="small" type="danger" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import Auth from "@/services/authentication/auth.js";

export default {
  name: "addThreeProducts",
  data() {
    return {
      listLoading: false,
      ruleFormValue: {
        creditCode: "",
        productId: "",
        certificationType: "",
        certificationCategory: "",
        argriculturalClassification: "1",
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
        certificationType: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        certificationCategory: [
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
        certificationNo: [
          {
            required: true,
            message: "请插入",
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
          },
          { type: "number", message: "插入号码" }
        ]
      },
      file: null,
      companyNameList: [{ id: -1, name: "全部" }],
      productNameList: [],
      options: [
        { value: "1", label: "养殖业" },
        { value: "2", label: "畜牧业" },
        { value: "3", label: "种植业" },
      ]
      // ["全部", "养殖业", "已同意", "畜牧业", "种植业"]
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
      this.listLoading = true;
      Request()
        .get("/api/product_production/all", {
          company_id: companyId,
          sortBy: "productId"
        })
        .then(response => {
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
          this.productNameList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          var formData = new FormData();

          formData.append("creditCode", this.ruleFormValue.creditCode);
          formData.append("productId", this.ruleFormValue.productId);
          formData.append("productName", this.filterProduct(this.ruleFormValue.productId));
          formData.append(
            "certificationType",
            this.ruleFormValue.certificationType
          );
          formData.append(
            "certificationCategory",
            this.ruleFormValue.certificationCategory
          );
          formData.append(
            "argriculturalClassification",
            this.ruleFormValue.argriculturalClassification
          );
          formData.append(
            "certificationNo",
            this.ruleFormValue.certificationNo
          );
          formData.append(
            "certificationStartTime",
            this.ruleFormValue.certificationStartTime
          );
          formData.append(
            "certificationEndTime",
            this.ruleFormValue.certificationEndTime
          );
          formData.append(
            "createDate",
            this.ruleFormValue.certificationStartTime
          );
          // formData.append(
          //   "createTime",
          //   this.ruleFormValue.certificationStartTime
          // );
          formData.append(
            "updateDate",
            this.ruleFormValue.certificationStartTime
          );
          formData.append("output", this.ruleFormValue.output);
          // formData.append(
          //   "updateTime",
          //   this.ruleFormValue.certificationStartTime
          // );
          formData.append("updater", "string");
          formData.append("updateUserId", Auth().user().id);
          formData.append("createUserId", Auth().user().id);
          formData.append("creater", "string");
          formData.append("creater", "string");
          formData.append("id", 0);
          if (this.file) {
            formData.append("file", this.file);
          }
          Request()
            .post("/api/quality_standard/create", formData)
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.$router.push({ path: "/threeProductsCertification" });
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
    filterProduct(id) {
      let product = this.productNameList.find(x => x.productId === id);
      if (product) {
        return product.productName;
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
