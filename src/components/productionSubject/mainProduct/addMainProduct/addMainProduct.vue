<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生产主体</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加产品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form
        ref="ruleFormValue"
        :model="ruleFormValue"
        :rules="rules"
        label-width="100px"
        v-loading="listLoading"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品名称" prop="productName">
              <el-input v-model="ruleFormValue.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="单价" prop="atunitprice">
              <el-input v-model.number="ruleFormValue.atunitprice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="评级" prop="grade">
              <el-input v-model="ruleFormValue.grade"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产地" prop="productArea">
              <el-input v-model="ruleFormValue.productArea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="品种" prop="variety">
              <el-input v-model="ruleFormValue.variety"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规格" prop="specification">
              <el-input v-model="ruleFormValue.specification"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品介绍" prop="productProfile">
              <el-input
                class="no-margin-bottom"
                v-model="ruleFormValue.productProfile"
                auto-complete="off"
                type="textarea"
                :rows="10"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label prop="doOrganic">
              <el-checkbox v-model="ruleFormValue.doOrganic" true-label="1" false-label="0">有机</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button size="small" type="success" plain @click="onSubmit('ruleFormValue')">保存</el-button>
          <el-button size="small" type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
import Request from "@/services/api/request.js";
import Auth from "@/services/authentication/auth";
export default {
  name: "addMainProduct",
  data() {
    return {
      listLoading: true,
      companyId: -1,
      ruleFormValue: {
        productName: "",
        atunitprice: 0,
        grade: "",
        productArea: "",
        variety: "",
        specification: "",
        productProfile: "",
        doOrganic: "0"
      },
      rules: {
        productName: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        atunitprice: [
          {
            required: true,
            message: "请插入"
          },
          {
            type: "number",
            message: "插入号码"
          }
        ],
        grade: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        productArea: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        variety: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        specification: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        productProfile: [
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
    this.companyId = this.$route.params.id;
    this.listLoading = false;
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          Request()
            .post("/api/product_production/create", {
              atunitprice: this.ruleFormValue.atunitprice,
              companyId: this.companyId,
              createTime: new Date(),
              createUserId: Auth().user().attrs.id,
              doOrganic: this.ruleFormValue.doOrganic,
              grade: this.ruleFormValue.grade,
              productArea: this.ruleFormValue.productArea,
              productId: 0,
              productName: this.ruleFormValue.productName,
              productProfile: this.ruleFormValue.productProfile,
              specification: this.ruleFormValue.specification,
              updateTime: new Date(),
              updateUserId: Auth().user().attrs.id,
              variety: this.ruleFormValue.variety
            })
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.$router.go(-1);
            })
            .catch(error => {});
        } else {
          console.log("错误 !!");
          return false;
        }
      });
    }
  }
};
</script>