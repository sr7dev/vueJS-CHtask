<template>
  <el-row class="tac">
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
            <el-menu-item index="/companyBusiness">经营主体</el-menu-item>-->
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item
          index="/disabilityCheck"
          v-if="menuShowArr['disabilityCheck']"
        >
          <router-link slot="title" to="/disabilityCheck">农残检测</router-link>
        </el-menu-item>
        <el-menu-item
          index="/jobDefinition"
          v-if="menuShowArr['jobDefinition']"
        >
          <router-link slot="title" to="/jobDefinition">作业定义</router-link>
        </el-menu-item>
        <el-menu-item
          index="/productionRecord"
          v-if="menuShowArr['productionRecord']"
        >
          <router-link slot="title" to="/productionRecord"
            >生产记录</router-link
          >
        </el-menu-item>
        <el-menu-item
          index="/supervisionGrid"
          v-if="menuShowArr['supervisionGrid']"
        >
          <router-link slot="title" to="/supervisionGrid">监管网格</router-link>
        </el-menu-item>
        <el-menu-item
          index="/regulatoryRecord"
          v-if="menuShowArr['regulatoryRecord']"
        >
          <router-link slot="title" to="/regulatoryRecord"
            >监管记录</router-link
          >
        </el-menu-item>
        <el-menu-item index="/workTask" v-if="menuShowArr['workTask']">
          <router-link slot="title" to="/workTask">工作任务</router-link>
        </el-menu-item>
        <el-menu-item index="/notice" v-if="menuShowArr['notice']">
          <router-link slot="title" to="/notice">通知管理</router-link>
        </el-menu-item>
        <el-menu-item index="/aquatic" v-if="menuShowArr['aquatic']">
          <router-link slot="title" to="/aquatic">水产站</router-link>
        </el-menu-item>
        <el-menu-item
          index="/trainingFunds"
          v-if="menuShowArr['trainingFunds']"
        >
          <router-link slot="title" to="/trainingFunds"
            >培训经费管理</router-link
          >
        </el-menu-item>
        <el-menu-item index="/seed" v-if="menuShowArr['seed']">
          <router-link slot="title" to="/seed">种子管理</router-link>
        </el-menu-item>
        <el-menu-item
          index="/userManagement"
          v-if="menuShowArr['userManagement']"
        >
          <router-link slot="title" to="/userManagement">用户管理</router-link>
        </el-menu-item>
        <el-menu-item
          index="/threeProductsCertification"
          v-if="menuShowArr['threeProductsCertification']"
        >
          <router-link slot="title" to="/threeProductsCertification"
            >三品一标管理</router-link
          >
        </el-menu-item>
        <el-menu-item
          index="/tracingLabelManagement"
          v-if="menuShowArr['tracingLabelManagement']"
        >
          <router-link slot="title" to="/tracingLabelManagement"
            >溯源标签管理</router-link
          >
        </el-menu-item>
        <el-menu-item index="/sampleCheckMain">
          <router-link slot="title" to="/sampleCheckMain/0"
            >例行抽样管理</router-link
          >
        </el-menu-item>
        <el-menu-item
          index="/inputManagement"
          v-if="menuShowArr['inputManagement']"
        >
          <router-link slot="title" to="/inputManagement"
            >投入品管理</router-link
          >
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
        <el-menu-item
          index="/specialCategory"
          v-if="menuShowArr['specialCategory']"
        >
          <router-link slot="title" to="/specialCategory">专项</router-link>
        </el-menu-item>
        <el-menu-item
          index="/greenProducts"
          v-if="menuShowArr['greenProducts']"
        >
          <router-link slot="title" to="/greenProducts"
            >绿色优质产品</router-link
          >
        </el-menu-item>
        <el-menu-item
          index="/productionStandard"
          v-if="menuShowArr['productionStandard']"
        >
          <router-link slot="title" to="/productionStandard"
            >生产标准</router-link
          >
        </el-menu-item>
        <el-menu-item index="/shareFiles" v-if="menuShowArr['shareFiles']">
          <router-link slot="title" to="/shareFiles">共享文件</router-link>
        </el-menu-item>
        <el-menu-item
          index="/internalMessage"
          v-if="menuShowArr['internalMessage']"
        >
          <router-link slot="title" to="/internalMessage">站内消息</router-link>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import Auth from "@/services/authentication/auth.js";
import Storage from "store";

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
      menuList: null,
      menuShowArr: new Array()
    };
  },
  created() {
    this.menuList = Storage.get("authList").filter(el => el.type == 1);
    for (let i = 0; i < this.menuList.length; i++) {
      let index = this.menuList[i].privilegeCode;
      this.menuShowArr[index] = 1;
    }
  },
  methods: {
    handleSelect(key) {
      //let that = this;
      // that.SET_ACTIVEMENU(key)
      /*防止刷新后拿不到对应显示的栏目*/
      sessionStorage.setItem("activeMenu", key);
    },
    IsMenuExists(menuName) {
      return this.menuList.find(x => x.privilegeCode == menuName);
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
