<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生产主体</el-breadcrumb-item>
        <el-breadcrumb-item>仓储环境</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">仓库详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form
        ref="ruleForm"
        :model="ruleFormValue"
        label-width="100px"
        v-loading="listLoading"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓库名称" prop="warehouseName">
              <el-input v-model="ruleFormValue.warehouseName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓库地址" prop="warehouseAddress">
              <el-input v-model="ruleFormValue.warehouseAddress" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓库面积" prop="warehouseArea">
              <el-input v-model="ruleFormValue.warehouseArea" type="number" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓库规模" prop="warehouseScope">
              <el-input v-model="ruleFormValue.warehouseScope" type="textarea" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item >
          <el-button size="small" type="primary" @click="goBack" plain>返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../../services/api/request.js";
export default {
  name: "detailsWarehouse",
  data() {
    return {
      id: -1,
      companyId: 0,
      pageName: this.$route.name,
      listLoading: true,
      ruleFormValue: {
        warehouseAddress: "",
        warehouseArea: null,
        warehouseName: "",
        warehouseScope: ""
      },
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.companyId = this.$route.params.id;
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.listLoading = true;
      Request()
        .get("/api/warehose/get/" + this.id)
        .then(response => {
          this.ruleFormValue.warehouseAddress = response.warehouseAddress;
          this.ruleFormValue.warehouseArea = response.warehouseArea;
          this.ruleFormValue.warehouseName = response.warehouseName;
          this.ruleFormValue.warehouseScope = response.warehouseScope;
          setTimeout(() => {
            this.listLoading = false;          
          }, 0.5*100);
        })
        .catch(error => {});
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./viewWarehouse.scss";
</style>
