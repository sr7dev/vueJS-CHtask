<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>共享文件</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">新建文件夹</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="文件夹名称" prop="productId">
              <el-input v-model="productId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="创建者" prop="category">
              <el-input v-model="category"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="是否可见" prop="createTime">
              <el-select v-model="ruleFormValue.category" class="w-100">
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
        <el-form-item class="left-margin">
          <el-button type="success" plain @click="onSubmit('ruleForm')" disabled>保存</el-button>
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
  name: "addSharedFiles",
  data() {
    return {
      file: null,
      productionList: [],
      selloading: false,
      options: [{ id: 0, name: "不可见" }, { id: 2, name: "可见" }],
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
            message: "请选择"
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
        .get("/api/product_production/all")
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
          var formData = new FormData();
          formData = this.makeFormData();
          Request()
            .post("/api/production_standard/create", formData)
            .then(response => {
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