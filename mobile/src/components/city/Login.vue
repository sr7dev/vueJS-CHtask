<template>
    <div>
      <mt-header fixed title="登录"></mt-header>
      <p class="title">常熟市农业监管平台</p>
      <div class="content">
        <div class="mui-input-row">
          <label>账户</label>
          <input type="text" v-model="obj.username" placeholder="请输入账号">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input type="text" v-model="obj.password" placeholder="请输入密码">
        </div>
      <mt-button class="field" size="large" type="primary" @click="login()">登录</mt-button>
       <div style="text-align: right; margin-top:1rem">忘记密码？</div>
      </div>
    </div>
</template>

<script>
  import Auth from "@/configs/auth.js"
    export default {
        name: "Login",
      data(){
          return{
            obj:{
              password: "password",
              username: "admin"
            },
            //重定向
            redirect: undefined,
            //其他查询
            otherQuery: {}
          }
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
      methods:{
        async login(){
          Auth()
            .login(this.obj)
            .then(
              success => {
                this.$router.push({
                  path: this.redirect || "/",
                  query:{ accessToken:"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzMzMzMzMzMzNiIsImF1dGhvcml0aWVzIjoiW10iLCJleHAiOjE1NzUzMzk3NjF9.6IahavpywNbcT_7Ow54ndlNWIAPmSsO5eu5-zRCwqO-xJpS0LAQJSNRpB_rnjAuneGiQX1ORcBatmFvZqU05tw",
                        timestamp:"111111111",
                        sign:"222222"
                  }
                });
              },
              error => {
                console.log(error);
              }
            );
        },
        getOtherQuery(query) {
          return Object.keys(query).reduce((acc, cur) => {
            if (cur !== "redirect") {
              acc[cur] = query[cur];
            }
            return acc;
          }, {});
        }
      },
      created() {

      }
    }
</script>

<style scoped>
  .mui-input-row{
    border:0.01rem black solid;
    margin-top: 1.5rem;
  }
.title{
  font-size:1.8rem;
  text-align: center;
  margin-top: 11rem;
  margin-bottom: 5rem;
}
  .content{
    width: 80%;
    margin: 0 auto;
  }
  .field{
    margin-top: 1rem;
  }
</style>
