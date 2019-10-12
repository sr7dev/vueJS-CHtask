<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }"
          >监管对象</el-breadcrumb-item
        >
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">修改属性</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form
        ref="ruleForm"
        :model="ruleFormValue"
        :rules="rules"
        label-width="100px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="属性名称" prop="propertyName">
              <el-input v-model="ruleFormValue.propertyName" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="属性可选项" prop="propertyOptions">
              <el-input v-model="ruleFormValue.propertyOptions" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="属性排序" prop="propertySort">
              <el-input v-model="ruleFormValue.propertySort" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="success" plain
          @click="$router.push({
            path: `/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/${ruleFormValue.productId}`,
            query: {
              id: ruleFormValue.id
            }
          })"
          >编辑选项</el-button>
          <el-button type="success" @click="onSubmit('ruleForm')" plain>保存</el-button>
          <el-button type="danger" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../../../services/api/request.js";
export default {
  name: "editProductProperty",
  data() {
    return {
      ruleFormValue: {
        propertyName: "",
        propertyOptions: "",
        propertySort: "",
        productId: 0,
        id: -1
      },
      rules: {
        propertyName: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        propertyOptions: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        propertySort: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {    
    this.ruleFormValue.productId = this.$route.params.id;
    this.ruleFormValue.id = this.$route.query.id;
    this.getProductPropertyInfo();
  },
  methods: {
    getProductPropertyInfo() {
      Request()
        .get("/api/product_property/get/" + this.ruleFormValue.id)
        .then(response => {
          this.ruleFormValue.propertyName = response.propertyName;
          this.ruleFormValue.propertyOptions = response.propertyOptions;
          this.ruleFormValue.propertySort = response.propertySort;
        })
        .catch(error => {});
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = new FormData();
          formData.append("productId", this.ruleFormValue.productId);
          formData.append("propertyName", this.ruleFormValue.propertyName);
          formData.append("propertyOptions", this.ruleFormValue.propertyOptions);
          formData.append("propertySort", this.propertySort);

          Request()
            .put("/api/product_property/update/" + this.ruleFormValue.id, formData)
            .then(response => {
              this.$router.push({
                path: `/productionSubject/mainProduct/productProperty/${this.ruleFormValue.productId}`
              });
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
