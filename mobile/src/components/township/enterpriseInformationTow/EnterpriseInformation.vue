<template>
  <div>
    <mt-header fixed title="企业信息">
      <router-link to="/homeTow" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="header">
      <div class="mui-input-row mui-search mui-active">
        <input type="search" class="mui-input-clear" placeholder="请输入产品名称" data-input-clear="1" data-input-search="1"><span class="mui-icon mui-icon-clear mui-hidden"></span><span class="mui-placeholder"><span class="mui-icon mui-icon-search"></span><span></span></span>
      </div>
      <div class="credit">
        <p>
          <select name="township" class="select"  v-model="townId" @change="getList(1)">
            <option label="全部" :value="0">全部</option>
            <option v-for="item in TonwList" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
        </p>
        <p>
          <select name="industry" class="select" v-model="agriculturalClassification" @change="getList(1)">
            <option v-for="item in agricultural" :value="item.value">{{item.label}}</option>
          </select>
        </p>
      </div>
      <div class="page-infinite-list"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <div class="mui-card" style="margin-bottom: 35px;">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell" v-for="item in tableData" @click="companyDetails(item.companyId)">
              <a class="mui-navigate-right">
                <tr>
                  <td style="width: 6rem">名称</td>
                  <td>{{item.companyName}}</td>
                </tr>
                <tr>
                  <td>信用评级</td>
                  <td>{{item.creditCode}}</td>
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
  import Request from "@/configs/request.js"
    export default {
        name: "EnterpriseInformation",
      data() {
        return {
          //农业分类
          agriculturalClassification: 0,
          //生产主体类型
          companyType:"",
          //乡镇
          townId: -1,
          page: {
            pageIndex: 0,
            pageSize: 20
          },
          agricultural: [
            {value: 0, label: '全部'},
            {value: 1, label: '养殖业'},
            {value: 2, label: '畜牧业'},
            {value: 3, label: '种植业'}
          ],
          //乡镇列表
          TonwList: [{ id: -1, name: "全部" }],
          //企业信息列表
          tableData: [],
          loading:false
        }
      },
      methods:{
        //进入企业详细页面
        companyDetails(id) {
          console.log(id);
          this.$router.push({path:'/companyDetailsTow',query:{ companyId: id }})
        },
        //获取乡镇列表
        getTonwList() {
          console.log(111);
          Request()
            .get("/api/town/all")
            .then(
              response => {
                console.log(response);
                this.TonwList = response;
              }
            )
        },
        //获取企业信息列表
        getList(type) {
          if(type==1){
            this.page.pageIndex=0;
          }
          this.loading = true ;
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
            .then(
              response => {
                console.log(response);
                this.page.pageIndex=this.page.pageIndex+1;
                this.tableData = this.tableData.concat(response);
                if(response.length<this.page.pageSize){
                  this.loading = true ;
                }else{
                  this.loading = false ;
                }
                setTimeout(() => {
                  loader.hide();
                }, 500)
              }
            )
        },
        //下拉加载更多
        loadMore(){
          this.getList()
        }
      },
      created() {
        this.getTonwList();
        this.getList()
      }
    }
</script>

<style scoped>
  .select{
    width: 100%;
    height: 100%;
    margin-top: -0.8rem;
  }
  .mui-input-clear{
    height: 3.3rem;
  }
  .credit{
    display: flex;
    height: 4rem;
  }
  .credit p{
    width: 50%;
    line-height: 3rem;
    text-align: left;
  }
  .mui-icon{
    margin-left: 50%;
    margin-top: 1rem
  }
</style>
