<template>
  <div class="xyh_top flex-box justify-right">
    <div class="changshu_left">
      <img src="../../assets/images/logo.png" alt />
    </div>
    <el-menu
      outer
      :default-active="$route.fullPath"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#253032"
      text-color="#ffffff"
      v-if="menuShowArr['statisticsSupervision'] && creditMode<0"
    >
      <el-menu-item index="/statisticsCredit">
        <router-link slot="title" to="/statisticsCredit">
          <span>
            <i class="el-icon-data-analysis vertical-text-bottom"></i
            >诚信系统看板
          </span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="/statisticsSupervision">
        <router-link slot="title" to="/statisticsSupervision">
          <span>
            <i class="el-icon-s-check vertical-text-bottom"></i>监管记录看板
          </span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="/statisticsTracing">
        <router-link slot="title" to="/statisticsTracing">
          <span>
            <i class="el-icon-s-data vertical-text-bottom"></i>溯源记录看板
          </span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="/statisticsTracingCompany">
        <router-link slot="title" to="/statisticsTracingCompany">
          <span>
            <i class="el-icon-s-marketing vertical-text-bottom"></i>溯源企业看板
          </span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="/statisticsFarmers">
        <router-link slot="title" to="/statisticsFarmers">
          <span>
            <i class="el-icon-pie-chart vertical-text-bottom"></i>农残检测看板
          </span>
        </router-link>
      </el-menu-item>
    </el-menu>
    <div class="quit">
      <span style="padding-right: 20px">
        <img src="../../assets/images/head.png" alt />
        {{ userName }}
      </span>
      <span @click="quit()">
        <!-- <img src="../../assets/images/quit.png" alt />
        退出 -->
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Toast from "@/utils/toast";
import EventBus from "@/utils/event";
import Storage from "store";
import Auth from "@/services/authentication/auth";
export default {
  name: "",
  data() {
    return {
      title: "平台",
      userName: "",
      menuList: null,
      menuShowArr: new Array(),
      creditMode: "",
    };
  },
  created() {
    this.creditMode = Storage.get("creditMode");
     this.menuList = Storage.get("authList").filter(el => el.type == 1);
    for (let i = 0; i < this.menuList.length; i++) {
      let index = this.menuList[i].privilegeCode;
      this.menuShowArr[index] = 1;
    }
    // this.userName = Auth().user().contactName;
    this.userName = Storage.get("userData").username ? Storage.get("userData").username : Storage.get("userData").mobile;
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
.quit span:nth-child(2) {
  margin-right: 40px;
}
.quit span {
  padding: 0 20px;
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
