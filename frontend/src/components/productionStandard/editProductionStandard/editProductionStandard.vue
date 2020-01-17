<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生产标准</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">修改生产标准</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box" v-if="listLoading" v-loading="listLoading">装货...</div>
    <div class="box" v-else>
      <el-form
        ref="dataFormRef"
        :model="dataForm"
        :rules="rules"
        label-width="100px"
        v-loading="pageLoading"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="产品名称：" prop="productId">
              <el-select v-model="dataForm.productId" class="w-100">
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
              <el-select v-model="dataForm.category" class="w-80">
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
            <el-form-item label="发布日期：" prop="createTime">
              <el-date-picker
                v-model="dataForm.releaseTime"
                align="right"
                class="w-100"
                type="date"
                placeholder="开始日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发布者：" prop="releasePerson">
              <el-input class="w-80" v-model="dataForm.releasePerson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="生产标准：" prop="productStandard">
              <el-input type="textarea" rows="5" v-model="dataForm.productStandard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-col :span="18">
            <div class="item-label" style="margin-bottom:20px;">
              <input
                type="file"
                id="file"
                style="display: none"
                ref="file"
                v-on:change="handleFileUpload()"
              />
              <el-button size="small" type="warning" plain @click="chooseFile()">添加附件</el-button>
              <el-link
                class="margin-left-20"
                v-if="dataForm.productionStandardProfiles"
                @click="downloadFile()"
              >{{ dataForm.productionStandardProfiles.replace("/uploads/", "")}}</el-link>
              <span class="margin-left-20" v-else>没有数据</span>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="success" plain @click="onSubmit('dataFormRef')">保存</el-button>
          <el-button size="small" type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
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
  name: "editProdcutionStandard",
  data() {
    return {
      file: null,
      productionList: [],
      pageLoading: false,
      listLoading: false,
      options: [
        { id: "1", name: "畜牧业" },
        { id: "2", name: "水产业" },
        { id: "3", name: "养殖业" }
      ],
      dataForm: null,
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
        productStandard: [
          {
            required: true,
            message: "请插入"
          }
        ]
      }
    };
  },
  created() {
    this.getData(this.$route.params.id);
    this.getProduction();
  },
  methods: {
    getProduction() {
      Request()
        .get("/api/product_production/all", {
          sortBy: "productId"
        })
        .then(response => {
          this.productionList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getData(id) {
      this.listLoading = true;
      Request()
        .get("/api/production_standard/get/" + id)
        .then(response => {
          this.dataForm = response;
          var formData = new FormData();
          formData.append("visitCount", response.visitCount+1);
          formData.append("id", response.id);
          formData.append("productName", response.productName);
          formData.append("category", response.category);
          if(response.releaseTime) formData.append("releaseTime", new Date(response.releaseTime));
          formData.append("releasePerson", response.releasePerson);
          formData.append("productStandard", response.productStandard);
          formData.append("productionStandardProfiles", response.productionStandardProfiles);
          formData.append("productId", response.productId);
          if(response.createUserId) formData.append("createUserId", response.createUserId);
          if(response.updateTime) formData.append("updateTime", response.updateTime);
          if(response.updateUserId) formData.append("updateUserId", response.updateUserId);
        
          Request()
          .put("/api/production_standard/update/" + id, formData)
          .then(response => {
          
          })
          .catch(error => {
            console.log(error);
          });
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
      
    },
    downloadFile() {
      axios({
        url: Urls.DOWNLOAD_URL() + this.dataForm.productionStandardProfiles,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        if(!this.isIE()){
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            this.dataForm.productionStandardProfiles.replace("/uploads/", "")
          ); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        }else{
          const newBlob = new Blob([response.data], {type: 'application/octet-stream'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, this.data.productionStandardProfiles.replace("/uploads/", ""));
            return;
          }
        }
      });
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.pageLoading = true;
          var formData = new FormData();
          formData = this.makeFormData();
          Request()
            .put(
              "/api/production_standard/update/" + this.dataForm.id,
              formData
            )
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
      mainFormData.append("id", this.$route.params.id);
      mainFormData.append("productId", this.dataForm.productId);
      const productName = this.filterProduct(this.dataForm.productId);
      mainFormData.append("productName", productName);
      mainFormData.append("category", this.dataForm.category);
      this.dataForm.releaseTime = new Date(
        this.dataForm.releaseTime
      ).toDateString("YYYY-MM-DD");
      mainFormData.append("releaseTime", this.dataForm.releaseTime);
      mainFormData.append("releasePerson", this.dataForm.releasePerson);
      mainFormData.append("productStandard", this.dataForm.productStandard);
      mainFormData.append(
        "productionStandardProfiles",
        this.dataForm.productionStandardProfiles
      );
      return mainFormData;
    },
    chooseFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.dataForm.productionStandardProfiles = "/uploads/" + this.file.name;
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