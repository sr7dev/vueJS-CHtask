<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生产标准</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form
        ref="ruleForm"
        :model="ruleFormValue"
        :rules="rules"
        label-width="100px"
        v-loading="pageLoading"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="产品名称：" prop="productId">
              <el-select v-model="ruleFormValue.productId" class="w-100" :loading="selloading">
                <el-option
                  v-for="item in productionList"
                  :key="item.productId"
                  :label="item.productName"
                  :value="item.productId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="类别：" prop="category">
              <el-select v-model="ruleFormValue.category" class="w-80">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="发布日期：" prop="releaseTime">
              <el-date-picker
                v-model="ruleFormValue.releaseTime"
                align="right"
                class="w-100"
                type="date"
                placeholder="开始日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发布者：" prop="releasePerson">
              <el-input class="w-80" v-model="ruleFormValue.releasePerson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="生产标准：" prop="productionStandard">
              <el-input type="textarea" rows="5" v-model="ruleFormValue.productionStandard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label>
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
                <el-button size="small" type="warning" plain @click="chooseFile()">添加附件</el-button>
              </div>
              <div
                class="item-value"
                style="margin-left:10px;
                      display: flex;
                      align-items: center;
                      padding-bottom: 20px;"
              >
                <span v-if="file">{{ file.name }}</span>
                <span v-else>请选择需要上传的文件...</span>
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item label>
          <el-button size="small" type="success" plain @click="onSubmit('ruleForm')">保存</el-button>
          <el-button size="small" type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";

export default {
  name: "addProductionStandard",
  data() {
    return {
      file: null,
      productionList: [],
      selloading: false,
      pageLoading: false,
      options: [
        { id: 1, name: "畜牧业" },
        { id: 2, name: "水产业" },
        { id: 3, name: "养殖业" }
      ],
      ruleFormValue: {
        productId: null,
        category: null,
        releaseTime: "",
        releasePerson: "",
        productionStandard: ""
      },
      rules: {
        productId: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        category: [
          {
            required: true,
            message: "请选择"
          }
        ],
        releaseTime: [
          {
            required: true,
            message: "请选择"
          }
        ],
        releasePerson: [
          {
            required: true,
            message: "请插入"
          }
        ],
        productionStandard: [
          {
            required: true,
            message: "请选择"
          }
        ]
      }
    };
  },
  created() {
    this.getProduction();
  },
  methods: {
    getProduction() {
      this.selloading = true;
      Request()
        .get("/api/product_production/all", {
          sortBy:"productId"
        })
        .then(response => {
          this.productionList = response.data;
          setTimeout(() => {
            this.selloading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.pageLoading = true;
          var formData = new FormData();
          formData = this.makeFormData();
          Request()
            .post("/api/production_standard/create", formData)
            .then(response => {
              setTimeout(() => {
                this.pageLoading = false;
              }, 0.5 * 1000);
              this.$router.push({ path: "/productionStandard" });
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
      mainFormData.append("productId", this.ruleFormValue.productId);
      const productName = this.filterProduct(this.ruleFormValue.productId);
      mainFormData.append("productName", productName);
      this.ruleFormValue.releaseTime = new Date(
        this.ruleFormValue.releaseTime
      ).toDateString("YYYY-MM-DD");
      mainFormData.append("category", this.ruleFormValue.category);
      mainFormData.append("releaseTime", this.ruleFormValue.releaseTime);
      mainFormData.append("releasePerson", this.ruleFormValue.releasePerson);
      mainFormData.append(
        "productStandard",
        this.ruleFormValue.productionStandard
      );
      return mainFormData;
    },
    chooseFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    filterProduct(id) {
      let Product = this.productionList.find(x => x.productId === id);
      if (Product) {
        return Product.productName;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss">
</style>