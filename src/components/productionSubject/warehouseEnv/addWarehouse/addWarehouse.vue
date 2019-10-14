<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生产主体</el-breadcrumb-item>
        <el-breadcrumb-item>仓储环境</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加环境</el-breadcrumb-item>
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
          <el-col :span="8">
            <el-form-item label="仓库名称" prop="warehouseName">
              <el-input v-model="ruleFormValue.warehouseName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓库地址" prop="warehouseAddress">
              <el-input v-model="ruleFormValue.warehouseAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓库面积" prop="warehouseArea">
              <el-input v-model="ruleFormValue.warehouseArea" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓库规模" prop="warehouseScope">
              <el-input v-model="ruleFormValue.warehouseScope"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="success" @click="onSubmit('ruleForm')" plain
            >保存</el-button
          >
          <el-button type="danger" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../../services/api/request.js";
export default {
  name: "addWarehouse",
  data() {
    return {
      companyId: 0,
      listLoading: false,
      ruleFormValue: {
        warehouseAddress: "",
        warehouseArea: null,
        warehouseName: "",
        warehouseScope: ""
      }
    };
  },
  created() {
    this.companyId = this.$route.params.id;
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = {
            "warehouseAddress": this.ruleFormValue.warehouseAddress,
            "warehouseArea": this.ruleFormValue.warehouseArea,
            "warehouseName": this.ruleFormValue.warehouseName,
            "warehouseScope": this.ruleFormValue.warehouseScope,
            "companyId": this.companyId,
            "id": 0
          }
          this.listLoading = true;
          Request()
            .post("/api/warehose/create", formData)
            .then(response => {
              this.$router.push({
                path: `/productionSubject/warehouseEnv/${this.companyId}`
              });
              setTimeout(() => {
                this.listLoading = false;          
              }, 0.5*100);
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

<style lang="scss" scoped>
@import "./addWarehouse.scss";
</style>
