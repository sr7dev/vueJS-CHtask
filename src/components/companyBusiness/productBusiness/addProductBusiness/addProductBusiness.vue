<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">经营主体</el-breadcrumb-item>
        <el-breadcrumb-item>经营产品</el-breadcrumb-item>
        <el-breadcrumb-item>添加产品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品名称">
              <el-input v-model="ruleFormValue.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="单价">
              <el-input v-model.number="ruleFormValue.atunitprice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="评级">
              <el-input v-model="ruleFormValue.grade"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产地">
              <el-input v-model="ruleFormValue.productArea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="品种">
              <el-input v-model="ruleFormValue.variety"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规格">
              <el-input v-model="ruleFormValue.specification"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品介绍">
              <el-input
                v-model="ruleFormValue.productProfile"
                ato-complete="off"
                type="textarea"
                :rows="10"
              ></el-input>
            </el-form-item>
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
import Request from "@/services/api/request.js";
import Auth from "@/services/authentication/auth";
export default {
  name: "addProductBusiness",
  data() {
    return {
      companyId: -1,
      ruleFormValue: {
        productName: "",
        atunitprice: 0,
        grade: "",
        productArea: "",
        variety: "",
        specification: "",
        productProfile: ""
      },
      rules: {
        productName: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        atunitprice: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        grade: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        productArea: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        variety: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        specification: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ]
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
            var formData = new FormData();
            formData.append("atunitprice", this.ruleFormValue.atunitprice);
            formData.append("companyId", this.companyId);
            formData.append("createTime", new Date());
            formData.append("createUserId", Auth().user().attrs.id);
           // formData.append("file", "");
            formData.append("grade", this.ruleFormValue.grade);
            formData.append("id", 0);
            formData.append("productArea", this.ruleFormValue.productArea);
            formData.append("productName", this.ruleFormValue.productName);
            formData.append("productProfile", this.ruleFormValue.productProfile);
            formData.append("specification", this.ruleFormValue.specification);
            formData.append("updateTime", new Date());
            formData.append("updateUserId", Auth().user().attrs.id);
            formData.append("variety", this.ruleFormValue.variety);

          Request()
            .post("/api/product_business/create", formData)
            .then(response => {
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