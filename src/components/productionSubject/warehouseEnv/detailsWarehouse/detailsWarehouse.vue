<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>仓储环境</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">修改环境</el-breadcrumb-item>
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
            <el-form-item label-width="仓库名称" prop="warehouseName">
              <el-input v-model="ruleFormValue.warehouseName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="仓库地址" prop="warehouseAddress">
              <el-input v-model="ruleFormValue.warehouseAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="仓库面积" prop="warehouseArea">
              <el-input v-model="ruleFormValue.warehouseArea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="仓库规模" prop="warehouseScope">
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
  name: "detailsWarehouse",
  data() {
    return {
      id: -1,
      companyId: 0,
      pageName: this.$route.name,
      ruleFormValue: {
        warehouseAddress: "",
        warehouseArea: 0,
        warehouseName: "",
        warehouseScope: ""
      }
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
          }, 0.5*1000);
        })
        .catch(error => {});
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = new FormData();
          formData.append("warehouseAddress", this.ruleFormValue.warehouseAddress);
          formData.append("warehouseArea", this.ruleFormValue.warehouseArea);
          formData.append("warehouseName", this.ruleFormValue.warehouseName);
          formData.append("warehouseScope", this.ruleFormValue.warehouseScope);
          formData.append("companyId", this.companyId);

          Request()
            .put("/api/warehose/update/" + this.id, formData)
            .then(response => {
              this.$router.push({
                path: `/productionSubject/warehouseEnv/${this.companyId}`
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

<style lang="scss" scoped>
@import "./detailsWarehouse.scss";
</style>
