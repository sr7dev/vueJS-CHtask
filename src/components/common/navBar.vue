<template>
  <el-row class="tac" style="margin-top: 50px">
    <el-col :span="24">
      <el-menu
        outer
        :default-active="$route.fullPath"
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#333"
        active-text-color="#4787c7"
      >
        <el-submenu index="/">
          <template slot="title">
            <span>监管对象</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/productionSubject">
              <router-link slot="title" to="/productionSubject"
                >生产主体</router-link
              >
            </el-menu-item>
            <el-menu-item index="/companyBusiness">
              <router-link slot="title" to="/companyBusiness"
                >经营主体</router-link
              >
            </el-menu-item>
            <!-- <el-menu-item index="/productionSubject">
              生产主体
            </el-menu-item>
            <el-menu-item index="/companyBusiness">经营主体</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/disabilityCheck">
          <router-link slot="title" to="/disabilityCheck">农残检测</router-link>
        </el-menu-item>
        <el-menu-item index="/regulatoryRecord">
          <router-link slot="title" to="/regulatoryRecord"
            >监管记录</router-link
          >
        </el-menu-item>

        <el-menu-item index="/threeProductsCertification">
          <router-link slot="title" to="/threeProductsCertification"
            >三品一标管理</router-link
          >
        </el-menu-item>
        <el-menu-item index="/sampleCheck">
          <router-link slot="title" to="/sampleCheck">例行抽样管理</router-link>
        </el-menu-item>
        <el-menu-item index="/">
          <router-link slot="title" to="/corporateCreditFile"
            >企业信用档案</router-link
          >
        </el-menu-item>
        <el-menu-item index="/creditRating">
          <router-link slot="title" to="/creditRating">信用评级</router-link>
        </el-menu-item>
        <el-menu-item index="/redBlackList">
          <router-link slot="title" to="/redBlackList">红黑名单</router-link>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
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
      activeMenu: ""
    };
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
