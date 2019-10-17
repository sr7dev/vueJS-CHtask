<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }"
          >监管对象</el-breadcrumb-item
        >
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item>属性管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑选项</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">修改属性</el-breadcrumb-item>
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
            <el-form-item label="选项名称" prop="name">
              <el-input v-model="ruleFormValue.name" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="选项排序" prop="sort">
              <el-input v-model="ruleFormValue.sort" ></el-input>
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
import Request from "../../../../../../../services/api/request.js";
export default {
  name: "editCustomProductProperty",
  data() {
    return {
      listLoading: false,
      ruleFormValue: {
        id: -1,
        name: "",
        sort: ""      
      },
      rules: {
        name: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        sort: [
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
    this.ruleFormValue.id = this.$route.query.id;
    this.ruleFormValue.name = this.$route.query.name;
    this.ruleFormValue.sort = this.$route.query.sort;
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = {
            "id": 0,
            "name": this.ruleFormValue.name,
            "sort": this.ruleFormValue.sort
          }
          this.listLoading = true;
          Request()
            .put("/api/product_property_option/update/" + this.ruleFormValue.id, formData)
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;          
              }, 0.5*100);
              this.$router.push({
                path: `/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/${this.ruleFormValue.id}`
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
