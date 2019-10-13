<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生产记录</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" modal>
      <span>选择文件 !!!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary" plain>取消</el-button>
      </span>
    </el-dialog>
    <div class="box">
      <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules" label-width="100px">
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
                <span v-else>请选择需要上传的文件...</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-form-item class="left-margin">
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
  name: "addProductionRecord",
  data() {
    return {
      file: null,
      productNameList: [],
      ruleFormValue: {
        productId: "",
        productionQuantity: "",
        productionArea: "",
        productionTime: ""
      },
      dialogVisible: false,
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
  },
  methods: {
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
          if (!this.file) {
            this.dialogVisible = true;
          } else {
            var formData = new FormData();
            formData = this.makeFormData();
            Request()
              .post("/api/production_record/create", formData)
              .then(response => {
                this.$router.push({ path: "/productionRecord" });
              })
              .catch(error => {
                console.log(error);
              });
          }
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
    }
  }
};
</script>

<style lang="scss">
</style>