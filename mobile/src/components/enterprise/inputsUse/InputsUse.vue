<template>
  <div>
    <mt-header fixed :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="header">
      <ul class="credit">
        <li @click="use">使用信息</li>
        <li @click="Purchase">采购信息</li>
      </ul>
      <div
        class="page-infinite-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <ul v-for="item in tableData" @click="go(item.id)" :key="item.id">
          <li>
            产品名称<span>{{ filterCompnay(item.companyId) }}</span>
          </li>
          <span class="mui-icon mui-icon-arrowright"></span>
          <li>
            样品名称<span
              >{{ item.sampleName }}<a class="a">产量(公斤)</a
              >{{ item.amount }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import apiConfig from "@/configs/api";
import Request from "@/configs/request.js";
import Storage from "store";
import TokenManager from "@/configs/token-manager";
import { MessageBox } from "mint-ui";
export default {
  name: "InputsUse",
  data() {
    return {
      page: {
        pageIndex: 0,
        pageSize: 20
      },
      total: 0,
      tableData: [],
      companyProduction: [],
      title: "投入品使用",
      loading: false,
      type: 1
    };
  },
  methods: {
    //跳转详情页面
    go(id) {
      if (this.title == "投入品使用") {
        console.log("使用");
        this.$router.push({
          path: "/inputsUseDetails",
          query: {
            id: id,
            type: 1
          }
        });
      } else {
        console.log("采购");
        this.$router.push({
          path: "/inputsUseDetails",
          query: {
            id: id,
            type: 2
          }
        });
      }
      //this.$router.push('/inputsUseDetails')
    },
    //使用按钮事件
    use() {
      this.title = "投入品使用";
      this.tableData = [];
      this.type = 1;
      this.getUseList();
    },
    //采购按钮事件
    Purchase() {
      this.title = "投入品采购";
      this.tableData = [];
      this.type = 2;
      this.getPurchaseList();
    },
    //获取投入品使用列表
    getUseList() {
      this.loading = true;
      let loader = this.$loading.show();
      Request()
        .get("/api/inputsUse/all", {
          pageNo: this.page.pageIndex,
          pageSize: this.page.pageSize,
          sortBy: "id"
        })
        .then(response => {
          console.log(response);
          this.total = response.total;
          this.page.pageIndex = this.page.pageIndex + 1;
          this.tableData = this.tableData.concat(response.data);
          if (response.data.length < this.page.pageSize) {
            this.loading = true;
          } else {
            this.loading = false;
          }
          setTimeout(() => {
            loader.hide();
          }, 500);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取采购信息列表
    getPurchaseList() {
      this.loading = true;
      let loader = this.$loading.show();
      Request()
        .get("/api/inputsPurchase/all", {
          pageNo: this.page.pageIndex,
          pageSize: this.page.pageSize,
          sortBy: "id"
        })
        .then(response => {
          console.log(response);
          this.total = response.total;
          this.total = response.total;
          this.page.pageIndex = this.page.pageIndex + 1;
          this.tableData = this.tableData.concat(response.data);
          if (response.data.length < this.page.pageSize) {
            this.loading = true;
          } else {
            this.loading = false;
          }
          setTimeout(() => {
            loader.hide();
          }, 500);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取公司名称
    getCompanyProduction() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
          console.log(response);
          this.companyProduction = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //匹配公司名称
    filterCompnay(id) {
      let company = this.companyProduction.find(x => x.companyId === id);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
    //上拉加载更多
    loadMore() {
      if (
        TokenManager().accessToken &&
        Storage.get("authData") === "entThird"
      ) {
        if (this.type == 1) {
          this.getUseList();
        } else {
          this.getPurchaseList();
        }
      }
    }
  },
  created() {
    //获取公司名称
    if (!TokenManager().accessToken) {
      MessageBox.alert("Token 错误", "提示").then(action => {
        this.$router.push("/");
      });
    } else {
      if (Storage.get("authData") !== "entThird") {
        MessageBox.alert("不允许", "提示").then(action => {
          this.$router.push("/");
        });
      } else {
        this.getCompanyProduction();
      }
    }
  }
};
</script>

<style scoped>
.header {
  padding-top: 1rem;
  margin-left: -1.2rem;
}
.credit {
  border: none;
  display: flex;
  height: 3.5rem;
  background-color: #ccc;
  margin-top: -0.8rem;
}
.credit li {
  width: 50%;
  line-height: 3.5rem;
  text-align: center;
}
.a {
  text-decoration: none;
  color: #333;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
}
ul {
  border-bottom: 0.03rem black solid;
  padding-left: 1.5rem;
}
li {
  position: relative;
  margin-bottom: 2rem;
  font-weight: 600;
}
span {
  position: absolute;
  left: 5rem;
  font-weight: 500;
}
.mui-icon {
  margin-left: 70%;
  margin-top: -1.2rem;
}
</style>
