<template>
  <div>
    <mt-header fixed title="诚信公示">
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
          v-model="enterpriseName"
          @change="getList()"
        />
        <span class="mui-icon mui-icon-clear mui-hidden"></span
        ><span class="mui-placeholder"
          ><span class="mui-icon mui-icon-search"></span><span></span
        ></span>
      </div>
      <ul class="credit">
        <li @click="since('A')">A级(守信)</li>
        <li @click="since('C')">C级(失信)</li>
      </ul>
      <div class="mui-card" v-for="row in List" :key="row.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <tr>
              <td style="width: 10rem">名称</td>
              <td>{{ row.companyName }}</td>
            </tr>
            <tr>
              <td>社会统一信用代码</td>
              <td>{{ row.creditCode }}</td>
            </tr>
            <tr>
              <td>信用评级</td>
              <td>{{ row.Grade }}</td>
            </tr>
          </div>
        </div>
      </div>
      <!--<ul  v-for="row in List" :key="row.id">-->
      <!--<li>名称<span>{{row.companyName}}</span></li>-->
      <!--<li>社会统一信用代码 <span>{{row.creditCode}}</span></li>-->
      <!--<li>信用评级 <span>{{row.Grade}}</span></li>-->
      <!--</ul>-->
    </div>
  </div>
</template>

<script>
import Request from "@/configs/request.js";
import TokenManager from "@/configs/token-manager";
import { MessageBox } from "mint-ui";
export default {
  name: "Sincerity",
  data() {
    return {
      active: "tab-container1",
      List: [],
      bTypes: "",
      currTown: 0,
      enterpriseName: ""
    };
  },
  methods: {
    //诚信切换
    since(Type) {
      this.bTypes = Type;
      this.getList();
    },
    //获取诚信公示列表
    getList() {
      let loader = this.$loading.show();

      Request()
        .get("/api/company_production/getCompanyProductionByName", {
          grade: this.bTypes, //公司类型
          companyName: this.enterpriseName
        })
        .then(response => {
          let list = response;
          list.forEach(function(item, i) {
            if (item.grade == null) {
              item.Grade = "无评级";
            } else if (item.grade == "A") {
              item.Grade = "A级(守信)";
            } else if (item.grade == "B") {
              item.Grade = "B级(守信)";
            } else if (item.grade == "C") {
              item.Grade = "C级(失信)";
            }
          });
          this.List = list;
          console.log(this.List);
          setTimeout(() => {
            loader.hide();
          }, 500);
        });
    }
  },
  created() {
    if (!TokenManager().accessToken) {
      MessageBox.alert("Token 错误", "提示").then(action => {
        this.$router.push("/");
      });
    } else {
      this.getList();
    }
  }
};
</script>

<style scoped>
.mui-input-clear {
  height: 3rem;
}
.credit {
  border: none;
  display: flex;
  height: 3.5rem;
  background-color: #ccc;
  margin-top: -0.7rem;
}
.credit li {
  width: 50%;
  line-height: 3.5rem;
}
</style>
