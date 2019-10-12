<template>
  <div>
    <div class="login-container">
      <el-dialog title="Or connect with" :visible.sync="showDialog">
        Can not be simulated on local, so please combine you own business simulation! ! !
        <br />
        <br />
        <br />
        <social-sign />
      </el-dialog>
    </div>
    <div class="form-div">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">常熟巿农业委员会&nbsp;&nbsp;</h3>
          <h3 class="title blue-colored">智慧农业系统</h3>
        </div>

        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="账号"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="CapsLock 在" placement="right" manual>
          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
        <el-link>忘记密码?</el-link>
      </el-form>
    </div>
  </div>
</template>

<script>
import Toast from "@/utils/toast";
import EventBus from "@/utils/event";
import Auth from "@/services/authentication/auth";
export default {
  name: "login",
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
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    if (Auth().check()) {
      this.$router.push({
        path: this.redirect || "/"
      });
      return;
    }
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
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
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          //   this.$store
          //     .dispatch("user/login", this.loginForm)
          //     .then(() => {
          //       this.$router.push({
          //         path: this.redirect || "/",
          //         query: this.otherQuery
          //       });
          //       this.loading = false;
          //     })
          //     .catch(() => {
          //       this.loading = false;
          //     });
          //   const params = this.$route.fullPath.split("?");
          //   let redirect = false;
          //   if (params.length === 2 && params[1].indexOf("redirect=") !== -1) {
          //     redirect = decodeURIComponent(params[1].substr(9));
          //   }
          Auth()
            .login(this.loginForm)
            .then(
              success => {
                Toast.success("Welcome to Intelligent Agriculture!");
                this.$router.push({
                  path: this.redirect || "/",
                  query: this.otherQuery
                });
                // emit login event
                this.loading = false;
                EventBus().publish("App.loggedIn");
              },
              error => {
                console.log(error);
                this.loading = false;
                Toast.error(error["message"]);
              }
            );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "./login.scss";
</style>


