<template>
  <div>
    <mt-header fixed title="企业信息">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="header">
      <div class="mui-input-row mui-search mui-active">
        <input
          type="search"
          class="mui-input-clear"
          placeholder="请输入企业名称"
          data-input-clear="1"
          data-input-search="1"
        /><span class="mui-icon mui-icon-clear mui-hidden"></span
        ><span class="mui-placeholder"
          ><span class="mui-icon mui-icon-search"></span><span></span
        ></span>
      </div>
      <div class="credit">
        <p>
          <select
            name="township"
            class="select"
            v-model="townId"
            @change="getList(1)"
          >
            <option label="全部" :value="-1">全部</option>
            <option v-for="item in TonwList" :key="item.id" :value="item.id">{{
              item.name
            }}</option>
          </select>
        </p>
        <p>
          <select
            name="industry"
            class="select"
            v-model="agriculturalClassification"
            @change="getList(1)"
          >
            <option
              v-for="item in agricultural"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</option
            >
          </select>
        </p>
      </div>
      <div
        class="page-infinite-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <div class="mui-card" style="margin-bottom: 35px;">
          <ul class="mui-table-view">
            <li
              class="mui-table-view-cell"
              v-for="item in tableData"
              @click="companyDetails(item.companyId)"
              :key="item.companyName"
            >
              <a class="mui-navigate-right">
                <tr>
                  <td style="width: 5rem">名称</td>
                  <td>{{ item.companyName }}</td>
                </tr>
                <tr>
                  <td>信用评级</td>
                  <td>{{ item.creditCode }}</td>
                </tr>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Request from "@/configs/request.js";
import TokenManager from "@/configs/token-manager";
import { MessageBox } from "mint-ui";
export default {
  name: "EnterpriseInformation",
  data() {
    return {
      //农业分类
      agriculturalClassification: 0,
      //生产主体类型
      companyType: "",
      //乡镇
      townId: -1,
      page: {
        pageIndex: 0,
        pageSize: 20
      },
      agricultural: [
        { value: 0, label: "全部" },
        { value: 1, label: "养殖业" },
        { value: 2, label: "已同意" },
        { value: 3, label: "畜牧业" },
        { value: 4, label: "种植业" },
      ],
      //乡镇列表
      TonwList: [{ id: -1, name: "全部" }],
      //企业信息列表
      tableData: [],
      loading: false
    };
  },
  methods: {
    //进入企业详细页面
    companyDetails(id) {
      this.$router.push({ path: "/companyDetails", query: { companyId: id } });
    },
    //获取乡镇列表
    getTonwList() {
      Request()
        .get("/api/town/all")
        .then(response => {
          this.TonwList = response;
        });
    },
    //获取企业信息列表
    getList(type) {
      if (type == 1) {
        this.page.pageIndex = 0;
      }
      this.loading = true;
      this.tableData = [];
      let loader = this.$loading.show();
      Request()
        .get("/api/company_production/getAllList", {
          agriculturalClassification: this.agriculturalClassification,
          companyType: this.companyType,
          pageNo: this.page.pageIndex,
          pageSize: this.page.pageSize,
          townId: this.townId
        })
        .then(response => {
          this.page.pageIndex = this.page.pageIndex + 1;
          this.tableData = this.tableData.concat(response);
          if (response.length < this.page.pageSize) {
            this.loading = true;
          } else {
            this.loading = false;
          }
          setTimeout(() => {
            loader.hide();
          }, 500);
        });
    },
    //上拉加载更多
    loadMore() {
      if (TokenManager().accessToken) this.getList();
    }
  },
  created() {
    if (!TokenManager().accessToken) {
      MessageBox.alert("Token 错误", "提示").then(action => {
        this.$router.push("/");
      });
    } else {
      this.getTonwList();
    }
  }
};
</script>

<style scoped>
/* 重写逻辑 开始 */
.select {
  width: 84.5%;
  height: 100%;
  margin-top: -0.8rem;
}
.mui-input-clear {
  height: 3.3rem;
}

.credit {
  display: flex;
  height: 4rem;
}

.credit p {
  width: 50%;
  line-height: 3rem;
  text-align: left;
}

.mui-icon {
  margin-left: 50%;
  margin-top: 1rem;
}
.mui-card {
    width: 93%;
}
td {
  letter-spacing: -1px;
  white-space: normal!important;
}
/* 重写逻辑 结束 */
</style>
