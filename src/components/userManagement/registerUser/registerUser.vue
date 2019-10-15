<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form
        ref="ruleForm"
        :model="ruleFormValue"
        :rules="rules"
        label-width="150px"
        v-loading="listLoading"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="登录名：" prop="userId">
              <el-input v-model="ruleFormValue.userId" placeholder="例: admin"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="名称：" prop="contactName">
              <el-input v-model="ruleFormValue.contactName" placeholder="例: 管理员"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="角色：" prop="userType">
              <el-select
                class="w-100"
                v-model="ruleFormValue.userType"
                v-if="loggedinUserType === 2"
                disabled
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select class="w-100" v-model="ruleFormValue.userType" v-else>
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-tooltip v-model="capsTooltip" content="CapsLock 在" placement="right" manual>
              <el-form-item label="密码：" prop="password">
                <el-input
                  v-model="ruleFormValue.password"
                  type="password"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                ></el-input>
              </el-form-item>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="联系人：" prop="contactPerson">
              <el-input v-model="ruleFormValue.contactPerson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="联系方式：" prop="contactWay">
              <el-input v-model="ruleFormValue.contactWay"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="统一社会信用代码：" prop="creditCode">
              <el-input v-model="ruleFormValue.creditCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="success" @click="onSubmit('ruleForm')" plain>保存</el-button>
          <el-button type="primary" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "registerUser",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("用户名不能少于3位数字"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位数字"));
      } else {
        callback();
      }
    };
    return {
      capsTooltip: false,
      listLoading: false,
      ruleFormValue: {
        creditCode: "",
        contactName: "",
        contactPerson: "",
        contactWay: "",
        password: "",
        userId: "",
        userType: null
      },
      rules: {
        creditCode: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        contactName: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        contactPerson: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        contactWay: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            trigger: "change",
            validator: validatePassword
          }
        ],
        userId: [
          {
            required: true,
            trigger: "change",
            validator: validateUsername
          }
        ],
        userType: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ]
      },
      options: [
        { id: 1, name: "市级管理员" },
        { id: 2, name: "乡镇管理员" },
        { id: 3, name: "普通用户" }
      ],
      loggedinUserType: null
    };
  },
  created() {
    this.loggedinUserType = Auth().user().attrs.userType;
    if (this.loggedinUserType === 2) this.ruleFormValue.userType = 3;
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          Request()
            .post("/api/user/create", {
              contactName: this.ruleFormValue.contactName,
              contactPerson: this.ruleFormValue.contactPerson,
              contactWay: this.ruleFormValue.contactWay,
              createUserId: this.loggedinUserType,
              creditCode: this.ruleFormValue.creditCode,
              id: 0,
              password: this.ruleFormValue.password,
              userId: this.ruleFormValue.userId,
              userType: this.ruleFormValue.userType
            })
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.$router.push({ path: "/userManagement" });
            })
            .catch(error => {});
        } else {
          console.log("错误 !!");
          return false;
        }
      });
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= "a" && key <= "z")) ||
          (!shiftKey && (key >= "A" && key <= "Z"))
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>
