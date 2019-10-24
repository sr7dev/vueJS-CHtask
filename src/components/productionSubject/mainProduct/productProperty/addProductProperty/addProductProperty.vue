<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }"
          >监管对象</el-breadcrumb-item
        >
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加属性</el-breadcrumb-item>
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
              <el-input v-model="ruleFormValue.propertySort" type="number"></el-input>
            </el-form-item>  
          </el-col>
        </el-row>
        <el-form-item>
          <el-button size="small" type="success" @click="onSubmit('ruleForm')" plain
            >保存</el-button
          >
          <el-button size="small" type="danger" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../../../services/api/request.js";
export default {
  name: "addProductProperty",
  data() {
    return {
      listLoading: false,
      ruleFormValue: {
        doShare: "1",
        propertyName: "",
        propertyOptions: "",
        propertySort: "",
        productId: 0        
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
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = {
            "id": 0,
            "productId": this.ruleFormValue.productId,
            "propertyName": this.ruleFormValue.propertyName,
            "propertyOptions": this.ruleFormValue.propertyOptions,
            "propertySort": this.ruleFormValue.propertySort.toString(),
            "doShare": this.ruleFormValue.doShare
          }
          this.listLoading = true;
          Request()
            .post("/api/product_property/create", formData)
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.goBack();
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
