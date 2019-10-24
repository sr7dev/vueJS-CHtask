<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box" v-if="!this.ruleFormValue.contactName" v-loading="listLoading">装货...</div>
    <div class="box" v-if="this.ruleFormValue.contactName" v-loading="pageLoading">
      <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules" label-width="150px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="名称：" prop="contactName">
              <el-input v-model="ruleFormValue.contactName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="登录名：" prop="userId">
              <el-input v-model="ruleFormValue.userId" disabled></el-input>
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
                  @keyup.enter.native="onSubmit('ruleForm')"
                ></el-input>
              </el-form-item>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button size="small" type="success" @click="onSubmit('ruleForm')" plain>保存</el-button>
          <el-button size="small" type="primary" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import Auth from "@/services/authentication/auth.js";
import Toast from "@/utils/toast";
export default {
  name: "addThreeProducts",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位数字"));
      } else {
        callback();
      }
    };
    return {
      listLoading: true,
      pageLoading: false,
      ruleFormValue: {
        contactName: "",
        password: "",
        userId: ""
      },
      capsTooltip: false,
      oldPassword: "",
      rules: {
        contactName: [
          {
            required: true,
            message: "请选择",
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
            message: "请选择",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.selectedId = this.$route.params.id;
    this.getData();
  },
  methods: {
    getData() {
      Request()
        .get("/api/user/get/" + this.selectedId)
        .then(response => {
          this.ruleFormValue.contactName = response.contactName;
          this.ruleFormValue.userId = response.userId;
          this.oldPassword = response.password;
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit(formName) {
      let userData = Auth().user().attrs;
      if (userData) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.pageLoading = true;
            Request()
              .post(
                "/api/user/changePassword?" +
                  "newPassword=" +
                  this.ruleFormValue.password +
                  "&" +
                  "userId=" +
                  this.ruleFormValue.userId
              )
              .then(response => {
                setTimeout(() => {
                  this.pageLoading = false;
                }, 0.5 * 1000);
                this.$router.push({ path: "/userManagement" });
              })
              .catch(error => {});
          } else {
            console.log("错误 !!");
            return false;
          }
        });
      } else {
        this.quit();
      }
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
    },
    quit() {
      Auth().logout();
      Toast.error("未经授权的用户");
      setTimeout(() => {
        this.$router.push({
          path: "/login"
        });
      }, 500);
    }
  }
};
</script>

<style scoped>
</style>
