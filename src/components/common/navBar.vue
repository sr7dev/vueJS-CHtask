<template>
  <el-row class="tac" style="margin-top: 50px">
    <el-col :span="24">
      <el-menu
        outer
        :default-active="$route.fullPath"
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#333"
      >
        <el-submenu index="/">
          <template slot="title">
            <span>监管对象</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/productionSubject">
              <router-link slot="title" to="/productionSubject">生产主体</router-link>
            </el-menu-item>
            <el-menu-item index="/companyBusiness">
              <router-link slot="title" to="/companyBusiness">经营主体</router-link>
            </el-menu-item>
            <!-- <el-menu-item index="/productionSubject">
              生产主体
            </el-menu-item>
            <el-menu-item index="/companyBusiness">经营主体</el-menu-item>-->
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/disabilityCheck">
          <router-link slot="title" to="/disabilityCheck">农残检测</router-link>
        </el-menu-item>
        <el-menu-item
          index="/jobDefinition"
          v-if="loggedinUserType === 3 || loggedinUserType === 0"
        >
          <router-link slot="title" to="/jobDefinition">作业定义</router-link>
        </el-menu-item>
        <el-menu-item
          index="/productionRecord"
          v-if="loggedinUserType === 3 || loggedinUserType === 0"
        >
          <router-link slot="title" to="/productionRecord">生产记录</router-link>
        </el-menu-item>
        <el-menu-item index="/supervisionGrid" v-if="loggedinUserType !== 3">
          <router-link slot="title" to="/supervisionGrid">监管网格</router-link>
        </el-menu-item>
        <el-menu-item index="/regulatoryRecord" v-if="loggedinUserType !== 3">
          <router-link slot="title" to="/regulatoryRecord">监管记录</router-link>
        </el-menu-item>
        <el-menu-item index="/workTask" v-if="loggedinUserType!==3">
          <router-link slot="title" to="/workTask">工作任务</router-link>
        </el-menu-item>
        <el-menu-item index="/notice" v-if="loggedinUserType!== 3">
          <router-link slot="title" to="/notice">通知管理</router-link>
        </el-menu-item>
        <el-menu-item index="/aquatic" v-if="loggedinUserType!== 3">
          <router-link slot="title" to="/aquatic">水产站</router-link>
        </el-menu-item>
        <el-menu-item index="/trainingFunds" v-if="loggedinUserType!==3">
          <router-link slot="title" to="/trainingFunds">培训经费管理</router-link>
        </el-menu-item>
        <el-menu-item index="/seed" v-if="loggedinUserType !== 3">
          <router-link slot="title" to="/seed">种子管理</router-link>
        </el-menu-item>
        <el-menu-item index="/userManagement" v-if="loggedinUserType!==3">
          <router-link slot="title" to="/userManagement">用户管理</router-link>
        </el-menu-item>
        <el-menu-item index="/threeProductsCertification" v-if="loggedinUserType!== 3">
          <router-link slot="title" to="/threeProductsCertification">三品一标管理</router-link>
        </el-menu-item>
        <el-menu-item index="/sampleCheck">
          <router-link slot="title" to="/sampleCheck">例行抽样管理</router-link>
        </el-menu-item>
        <el-menu-item
          index="/inputManagement"
          v-if="loggedinUserType === 3 || loggedinUserType === 0"
        >
          <router-link slot="title" to="/inputManagement">投入品管理</router-link>
        </el-menu-item>
        <el-menu-item index="/">
          <router-link slot="title" to="/corporateCreditFile">企业信用档案</router-link>
        </el-menu-item>
        <el-menu-item index="/creditRating">
          <router-link slot="title" to="/creditRating">信用评级</router-link>
        </el-menu-item>
        <el-menu-item index="/redBlackList">
          <router-link slot="title" to="/redBlackList">红黑名单</router-link>
        </el-menu-item>
        <el-menu-item
          index="/productionStandard"
          v-if="loggedinUserType === 3 || loggedinUserType === 0"
        >
          <router-link slot="title" to="/productionStandard">生产标准</router-link>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import Auth from "@/services/authentication/auth.js";
export default {
  data() {
    return {
      menu: [
        {
          menuName: "微信扫码",
          routerUrl: "productionSubject"
        }
      ],
      openeds: [1],
      activeMenu: "",
      loggedinUserType: null
    };
  },
  created() {
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {
    handleSelect(key) {
      //let that = this;
      // that.SET_ACTIVEMENU(key)
      /*防止刷新后拿不到对应显示的栏目*/
      sessionStorage.setItem("activeMenu", key);
    }
  }
};
</script>

<style lang="scss">
ul li {
  list-style: none;
}
.el-menu-item-group__title {
  display: none !important;
}
.el-menu-item {
  a {
    display: block;
    color: black;
    text-decoration: none;
  }
  a.router-link-active {
    color: #409eff;
  }
}

.tac .active {
  background: #919d9d !important;
}
</style>
