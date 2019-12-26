<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
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
              <el-input v-model="ruleFormValue.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="选项排序" prop="sort">
              <el-input v-model="ruleFormValue.sortId" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button size="small" type="success" @click="onSubmit('ruleForm')" plain>保存</el-button>
          <el-button size="small" type="danger" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "editCustomProductProperty",
  data() {
    return {
      listLoading: false,
      rootId: null,
      companyId: -1,
      productId: null,
      ruleFormValue: {
        id: 1,
        name: "",
        sortId: "",
        optionData: null
      },
      rules: {
        name: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        sortId: [
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
    this.ruleFormValue.optionData = this.$route.query.optionData;
    this.ruleFormValue.name = this.ruleFormValue.optionData[
      this.ruleFormValue.id
    ].name;
    this.ruleFormValue.sortId = this.ruleFormValue.optionData[
      this.ruleFormValue.id
    ].sortId;
    this.companyId = this.$route.query.companyId;
    this.rootId = this.$route.params.id;
    this.productId = this.$route.query.productId;
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleFormValue.optionData[
            this.ruleFormValue.id
          ].name = this.ruleFormValue.name;
          this.ruleFormValue.optionData[
            this.ruleFormValue.id
          ].sortId = this.ruleFormValue.sortId;
          this.$router.push({
            path: `/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/${this.rootId}`,
            query: {
              id: this.ruleFormValue.id,
              productId: this.productId,
              optionData: this.ruleFormValue.optionData,
              companyId: this.companyId
            }
          });
        }
      });
    },
    goBack() {
      this.$router.push({
        path: `/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/${this.rootId}`,
        query: {
          id: this.ruleFormValue.id,
          productId: this.productId,
          optionData: this.ruleFormValue.optionData,
          companyId: this.companyId
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
