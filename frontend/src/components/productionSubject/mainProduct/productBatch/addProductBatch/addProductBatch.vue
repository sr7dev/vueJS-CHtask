<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>例行抽样</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item>产品批次</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加批次</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form
        :rules="dataRules"
        ref="ruleForm"
        :model="ruleFormdata"
        label-width="100px"
        v-loading="listLoading"
      >
        <el-form-item label="品种" prop="varietyId">
          <el-select v-model="ruleFormdata.varietyId">
            <el-option
              v-for="item in varietyList"
              :key="item.id"
              :value="item.id"
              :label="item.varietyName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="等级名称" prop="varietyGrade">
          <el-select v-model="ruleFormdata.varietyGrade">
            <el-option
              v-for="item in gradeOption"
              :key="item.gradeId"
              :value="item.gradeId"
              :label="item.gradeName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-button size="small" type="success" plain @click="onSubmit('ruleForm')">保存</el-button>
          <el-button size="small" type="danger" plain @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request";
import Auth from "@/services/authentication/auth.js";
import Storage from "store";
export default {
  name: "addProductBatch",
  data() {
    return {
      id: -1,
      ruleFormdata: {
        varietyId: null,
        varietyGrade: null
      },
      varietyList: [],
      productId: null,
      listLoading: false,
      gradeOption: [
        { gradeId: 1, gradeName: "特级" },
        { gradeId: 2, gradeName: "高级" },
        { gradeId: 3, gradeName: "中级" },
        { gradeId: 4, gradeName: "低级" }
      ],
      dataRules: {
        varietyId: [{ required: true, message: "请选择", trigger: "change" }],
        varietyGrade: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.getVarietyData();
  },
  methods: {
    getVarietyData() {
      this.listLoading = true;
      Request()
        .get("/api/product_variety/all", { 
          productId: this.productId,
          sortBy: "id" })
        .then(response => {
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
          this.varietyList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    onSubmit(formName) {
      let formData = new FormData();
      const createTime = new Date();
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          formData.append("batchNumber", "");
          formData.append("createTime", createTime);
          formData.append("companyId", Storage.get("selectedCompanyId"));
          formData.append("id", 0);
          formData.append("createUserId", Auth().user().id);
          formData.append("productId", this.productId);
          formData.append("property", "");
          formData.append("varietyGrade", this.ruleFormdata.varietyGrade);
          formData.append("varietyId", this.ruleFormdata.varietyId);
          formData.append("updateTime", createTime); // not sure
          Request()
            .post("/api/product_batch/create", formData)
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.$router.push({
                path: `/productionSubject/mainProduct/productBatch/${this.productId}`
              });
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
