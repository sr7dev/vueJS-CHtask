<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加认证</el-breadcrumb-item>
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
            <el-form-item label="日期" prop="createTime">
              <el-input v-model="ruleFormValue.createTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="样品" prop="specimen">
              <el-input v-model="ruleFormValue.specimen"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检测项目" prop="checkItem">
              <el-input v-model="ruleFormValue.checkItem"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检测结果" prop="checkResult">
              <el-select
                v-model="ruleFormValue.checkResult"
                placeholder
                class="w-100"
              >
                <el-option
                  v-for="item in [{value:1, label:'阴性'}, {value: 2, label:'阳性'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="判定" prop="determine">
              <el-select
                v-model="ruleFormValue.determine"
                placeholder
                class="w-100"
              >
                <el-option
                  v-for="item in [{value:0, label:'不合格'}, {value: 1, label:'合格'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检测标准" prop="checkStandard">
              <el-input v-model="ruleFormValue.checkStandard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检测机构" prop="checkOrganization">
              <el-input v-model="ruleFormValue.checkOrganization"></el-input>
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
import Request from "@/services/api/request.js";
import { Urls } from "@/services/constants";
import Auth from "@/services/authentication/auth";

export default {
  name: "addThirdPartySampling",
  data() {
    return {
      productId: -1,
      listLoading: true,
      ruleFormValue: {
        createTime: new Date().toISOString().slice(0, 10),
        specimen: "",
        checkItem: "",
        checkResult: "",
        determine: "",
        checkStandard: "",
        checkOrganization: ""
      },
      rules: {
        createTime: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        specimen: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        checkItem: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        checkResult: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        determine: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        checkStandard: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        checkOrganization: [
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
    this.productId = this.$route.params.id;
    this.listLoading = false;
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          Request()
            .post("/api/product_check_record/create", {
              checkItem: this.ruleFormValue.checkItem,
              checkOrganization: this.ruleFormValue.checkOrganization,
              checkResult: this.ruleFormValue.checkResult,
              checkStandard: this.ruleFormValue.checkStandard,
              createTime: new Date().toJSON(),
              createUserId: Auth().user().id,
              determine: this.ruleFormValue.determine,
              id: 0,
              productCheckTime: new Date().toJSON(),
              productId: this.productId,
              specimen: this.ruleFormValue.specimen,
              updateTime: new Date().toJSON(),
              updateUserId: Auth().user().id
            })
            .then(response => {
              this.$router.go(-1);
              setTimeout(() => {
                this.listLoading = false;
              }, 0.01 * 1000);
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
