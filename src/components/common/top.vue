<template>
  <div class="xyh_top flex-box justify-right">
    <div class="changshu_left">
      <img src="../../assets/images/logo.jpg" alt />
    </div>
    <el-menu
      outer
      :default-active="$route.fullPath"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#253032"
      text-color="#ffffff"
      v-if="loggedinUserType!==3"
    >
      <el-menu-item index="/productionStandard" v-if="!loggedinUserType === 3">
        <router-link slot="title" to="/productionStandard">生产标准</router-link>
      </el-menu-item>
      <el-menu-item index="/shareFiles">
        <router-link slot="title" to="/shareFiles">共享文件</router-link>
      </el-menu-item>
      <el-menu-item index="/internalMessage">
        <router-link slot="title" to="/internalMessage">站内消息</router-link>
      </el-menu-item>
    </el-menu>
    <div class="quit">
      <span style="padding-right: 20px">
        <img src="../../assets/images/head.png" alt />admin
      </span>
      <span @click="quit()">
        <img src="../../assets/images/quit.png" alt />
        退出
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Toast from "@/utils/toast";
import EventBus from "@/utils/event";
import Auth from "@/services/authentication/auth";
export default {
  name: "",
  data() {
    return {
      title: "平台",
      userName: "",
      loggedinUserType: null
    };
  },
  created() {
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {
    quit: function() {
      let that = this;
      that
        .$confirm("确定要退出吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(async () => {
          Auth().logout();
          Toast.success("再 见");
          /**
           * THIS IS SO BAD!
           * @TODO
           */
          setTimeout(() => {
            this.$router.push({
              path: "/login"
            });
          }, 500);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  components: {}
};
</script>

<style scoped>
.changshu_left {
  width: 200px;
  background: #253032;
  height: 80px;
  float: left;
}
.xyh_top h2 {
  text-align: left;
  font-weight: normal;
  padding: 0 0 0 260px;
  margin: 0;
  line-height: 80px;
  color: #fff;
  position: relative;
}
.quit {
  position: relative;
  height: 60px;
  float: right;
  color: #fff;
  font-size: 16px;
  text-align: center;
}
.quit span {
  padding: 0 60px 0 20px;
  margin-left: 20px;
  line-height: 80px;
  display: inline-block;
}
.quit span img {
  position: relative;
  top: 4px;
  margin-right: 8px;
}
.quit span:hover {
  background: #424242;
  cursor: pointer;
}
.xyh_top {
  position: relative;
}
.changshu_left img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 310px;
}
</style>
