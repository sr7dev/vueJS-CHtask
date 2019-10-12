<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生产记录</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">修改记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules" label-width="100px" v-if="data">
        <el-row>
          <el-col :span="6">
            <el-form-item label="产品名称" prop="productId">
              <el-select v-model="ruleFormValue.productId" placeholder="请选择">
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
        <el-row>
          <el-col :span="6">
            <el-form-item label="产量" prop="productionQuantity">
              <el-input v-model.number="ruleFormValue.productionQuantity"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="产地" prop="productionArea">
              <el-input v-model="ruleFormValue.productionArea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="生产时长" prop="productionTime">
              <el-input v-model.number="ruleFormValue.productionTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="item" style="display:flex">
              <div class="item-label" style="margin-bottom:20px;">
                <input
                  type="file"
                  id="file"
                  style="display: none"
                  ref="file"
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
                <div class="item-value" v-else>
                  <el-link @click="downloadFile()">
                    {{
                    data.productionProfiles.replace("/uploads/", "")
                    }}
                  </el-link>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-form-item class="left-margin">
          <el-button type="success" plain @click="onSubmit('ruleForm')">保存</el-button>
          <el-button type="primary" plain v-on:click="$router.go(-1)">取消</el-button>
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
  name: "editProductionRecord",
  data() {
    return {
      file: null,
      id: "",
      data: null,
      productNameList: [],
      ruleFormValue: {
        productId: "",
        productionQuantity: "",
        productionArea: "",
        productionTime: ""
      },
      rules: {
        productId: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        productionQuantity: [
          {
            required: true,
            message: "请插入"
          },
          {
            type: "number",
            message: "插入号码"
          }
        ],
        productionArea: [
          {
            required: true,
            message: "请插入"
          }
        ],
        productionTime: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          },
          {
            type: "number",
            message: "插入号码"
          }
        ]
      }
    };
  },
  created() {
    this.getProductionDetail();
    this.getData(this.$route.params.id);
  },
  methods: {
    getData(id) {
      Request()
        .get("/api/production_record/get/" + id)
        .then(response => {
          this.data = response;
          this.ruleFormValue.productId = this.data.productId;
          this.ruleFormValue.productionQuantity = this.data.productionQuantity;
          this.ruleFormValue.productionArea = this.data.productionArea;
          this.ruleFormValue.productionTime = this.data.productionTime;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getProductionDetail() {
      Request()
        .get("/api/product_production/all")
        .then(response => {
          this.productNameList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = new FormData();
          formData = this.makeFormData();
          Request()
            .put("/api/production_record/update/" + this.data.id, formData)
            .then(response => {
              this.$router.push({ path: "/productionRecord" });
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
      mainFormData.append("id", this.data.id);
      mainFormData.append("productId", this.ruleFormValue.productId);
      const productName = this.filterProduct(this.ruleFormValue.productId);
      mainFormData.append("productName", productName);
      mainFormData.append("productionArea", this.ruleFormValue.productionArea);
      mainFormData.append(
        "productionQuantity",
        this.ruleFormValue.productionQuantity
      );
      mainFormData.append("productionTime", this.ruleFormValue.productionTime);
      return mainFormData;
    },
    chooseFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    filterProduct(productId) {
      let product = this.productNameList.find(x => x.productId === productId);
      if (product) {
        return product.productName;
      } else {
        return "";
      }
    },
    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.data.productionProfiles,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          this.data.productionProfiles.replace("/uploads/", "")
        ); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    }
  }
};
</script>

<style lang="scss">
</style>