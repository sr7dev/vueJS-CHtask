<template>
  <div>
    <mt-header fixed title="监管记录">
      <router-link to="/homeTow" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
   <div class="header page-infinite-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
     <div class="mui-card" v-for="item in tableData" @click="recordDetail(item.id,item.townId,item.companyId)">
       <div class="mui-card-content">
         <div class="mui-card-content-inner">
           <ul>
             <li><span class="title">日期</span><span class="span">{{item.createTime | formatDate}}
          <span class="title" style="margin-left: 3rem;margin-right: 1.5rem">乡镇</span>{{filterTownship(item.townId)}}</span>
             </li>
             <li><span class="title">受检单位</span><span class="span">{{filterCompanyName(item.companyId)}}</span></li>
             <li><span class="title">检查人</span><span class="span">{{item.inspector}}</span><span
               class="mui-icon mui-icon-arrowright"></span></li>
             <li><span class="title" style="margin-right: 1.5rem">结论</span>{{item.conclusion == 1 ? "合格" : "不合格" }}<span class="title" style="margin-left:3.5rem;margin-right: 1.5rem">其他</span>{{item.otherProblems}}
             </li>
             <li style="margin-right: 0.5rem">
               <mt-button size="large" type="primary" @click.stop="exit(item.id)">整改详情</mt-button>
             </li>
           </ul>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
  import Request from "@/configs/request.js"
    export default {
        name: "RegulatoryRecord",
      data() {
        return {
          companyId: -1,
          page: {
            pageIndex: 1,
            pageSize: 20
          },
          total: 0,
          tableData: [],
          sortBy: "id",
          companyList: [{ id: -1, name: "全部" }],
          township: [{ id: -1, name: "全部" }],
          loading:false
        }
      },
      methods:{
        //跳转整改详情页
        exit(id){
          this.$router.push({path:'/rectificationDetailsTow',query:{id:id}})
        },
        //监管详情
        recordDetail(id,townId,companyId){
          let company = this.filterCompanyName(companyId);
          let town = this.filterTownship(townId);
          this.$router.push({path:'/regulatoryRecordDetailsTow',query:{ id: id,company:company,town:town }})
        },
        //获取监管记录列表
        getData() {
          this.loading = true ;
          let loader = this.$loading.show();
          Request()
            .get("/api/supervision_record/all", {
              companyId: this.companyId,
              pageNo: this.page.pageIndex - 1,
              pageSize: this.page.pageSize,
              sortBy: "id"
            })
            .then(response => {
              console.log(response.data)
              this.page.pageIndex=this.page.pageIndex+1;
              this.tableData = this.tableData.concat(response.data);
              this.total = response.total;
              if(response.data.length<this.page.pageSize){
                this.loading = true ;
              }else{
                this.loading = false ;
              }
              setTimeout(() => {
                loader.hide();
              }, 0.5 * 1000);
            })
            .catch(error => {
              console.log(error);
            });
        },
        //获取乡镇列表
        getTown() {
          Request()
            .get("/api/town/all")
            .then(response => {
              this.township = this.township.concat(response);
            })
            .catch(error => {
              console.log(error);
            });
        },
        //获取公司列表
        getCompanyProduct() {
          Request()
            .get("/api/company_production/name")
            .then(response => {
              this.companyList = this.companyList.concat(response);
            })
            .catch(error => {
              console.log(error);
            });
        },
        //获取乡镇名
        filterTownship(townId) {
          let town = this.township.find(x => x.id === townId);
          if (town) {
            return town.name;
          } else {
            return "";
          }
        },
        //获取公司名
        filterCompanyName(companyId) {
          let company = this.companyList.find(x => x.companyId === companyId);
          if (company) {
            return company.companyName;
          } else {
            return "";
          }
        },
        //上拉加载更多
        loadMore(){
          console.log(11)
          this.getData();
        }
      },
      //日期过滤器
      filters: {
        formatDate: function (value) {
          return value.split(" ")[0]
        }
      },
      created() {
        this.getData()
        this.getTown();
        this.getCompanyProduct();
      }
    }
</script>

<style scoped>
  ul{
    font-weight: 100;
    margin-left: -1.8rem;
  }
  li{
    position: relative;
    line-height: 3rem;
  }
  .title{
    font-size: 1rem;
    font-weight:800;
  }
  .span{
    position: absolute;
    left: 5.5rem;
  }
  .mui-icon{
    margin-left: 75%;
  }
</style>
