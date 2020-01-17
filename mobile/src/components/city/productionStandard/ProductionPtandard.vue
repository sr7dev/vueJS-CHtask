<template>
  <div>
    <mt-header fixed title="生产标准">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="header">
      <div class="mui-input-row mui-search mui-active">
        <input
          type="search"
          class="mui-input-clear"
          placeholder="请输入标准名称"
          data-input-clear="1"
          data-input-search="1"
          v-model="productName"
          v-on:change="getProductionStandardList()"
        />
        <span class="mui-icon mui-icon-clear mui-hidden"></span
        ><span class="mui-placeholder">
          <span class="mui-icon mui-icon-search"></span>
          <span></span
        ></span>
      </div>
      <select
        name="industry"
        id="select"
        v-model="category"
        v-on:change="getProductionStandardList()"
      >
        <option
          v-for="item in categoryOption"
          :key="item.value"
          :value="item.value"
          >{{ item.name }}</option
        >
      </select>
      <ul class="credit">
        <li>产品</li>
      </ul>
      <div class="mui-card" style="margin-bottom: 35px;" v-if="data.length"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="20"
      >
        <ul class="mui-table-view">
          <li
            class="mui-table-view-cell"
            v-for="row in data"
            :key="row.id"
            @click="standardDetails(row.id)"
          >
            <a class="mui-navigate-right">
              {{ row.productName }}
            </a>
          </li>
        </ul>
      </div>
      <div class="no-data" v-else>
        <p>没有数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import Request from "@/configs/request.js";
import TokenManager from "@/configs/token-manager";
import { MessageBox } from "mint-ui";
import Storage from "store";
export default {
  name: "ProductionPtandard",
  data() {
    return {
      data: [],
      page: {
        pageIndex: 0,
        pageSize: 10
      },
      total: 0,
      productName: "",
      categoryOption: [
        { name: "全部", value: "0" },
        { name: "种植业", value: "1" },
        { name: "养殖业", value: "2" },
        { name: "畜牧业", value: "3" }
      ],
      category: "0",
      loading: false
    };
  },
  methods: {
    standardDetails(selectedId) {
      this.$router.push({
        path: "/StandardDetails",
        query: {
          selectedId: selectedId
        }
      });
    },
    loadMore() {
      if (TokenManager().accessToken)
        this.getProductionStandardList();
    },
    //获取生产标准列表
    getProductionStandardList() {
      this.loading = true;
      let loader = this.$loading.show();
      Request()
        .get("/api/production_standard/all", {
          category: this.category,
          productName: this.productName,
          pageNo: this.page.pageIndex,
          pageSize: this.page.pageSize,
          sortBy: "id"
        })
        .then(response => {
          this.page.pageIndex = this.page.pageIndex + 1;
          this.data = this.data.concat(response.data);
          this.total = response.total;
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
    }
  },
  created: function() {
    if (!TokenManager().accessToken) {
      MessageBox.alert("Token 错误", "提示").then(action => {
        this.$router.push("/");
      });
    } else {
      let that = this;
      that.getProductionStandardList();
    }
  }
};
</script>

<style scoped>
.mui-input-clear {
  height: 3rem;
}

#select {
  width: 75%;
  border: 0.01rem black solid;
  margin-top: -0.7rem;
}

option {
  width: 10rem;
}

.credit {
  border: none;
  display: flex;
  height: 3rem;
  background-color: #ccc;
  margin-left: 0;
  margin-top: -0.7rem;
}
.credit li {
  width: 50%;
  line-height: 3rem;
  text-align: left;
  border: none;
  padding-left: 0;
}
.mui-table-view-cell {
  line-height: 2rem;
}
/*ul {*/
/*margin-left: -2rem;*/
/*}*/
/*.no-data {*/
/*text-align: center;*/
/*}*/
/*li {*/
/*position: relative;*/
/*margin-bottom: 1rem;*/
/*line-height: 5rem;*/
/*padding-left: 2rem;*/
/*border-bottom: 0.03rem black solid;*/
/*}*/

/*span {*/
/*position: absolute;*/
/*left: 12rem;*/
/*}*/

.right {
  margin-left: 8rem;
  margin-top: 1.6rem;
}
</style>
