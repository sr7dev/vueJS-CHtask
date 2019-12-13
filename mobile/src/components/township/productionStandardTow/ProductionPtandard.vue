<template>
    <div>
      <mt-header fixed title="生产标准">
        <router-link to="/homeTow" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="header">
        <div class="mui-input-row mui-search mui-active">
          <input type="search" class="mui-input-clear" placeholder="请输入标准名称"
                 data-input-clear="1" data-input-search="1"
                 v-model="productName"  v-on:change="getProductionStandardList()"><span class="mui-icon mui-icon-clear mui-hidden"></span><span class="mui-placeholder"><span class="mui-icon mui-icon-search"></span><span></span></span>
        </div>
        <select name="industry" id="select" v-model="category" v-on:change="getProductionStandardList()">
          <option v-for="item in categoryOption" :key="item.value" :value="item.value">{{item.name}}</option>
        </select>
        <ul class="credit">
          <li>标准名称</li>
        </ul>

        <div class="mui-card" style="margin-bottom: 35px;" v-if="data.length">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell" v-for="row in data" :key="row.id" @click="standardDetails(row.id)">
              <a class="mui-navigate-right">
                {{row.productName}}
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
  import Request from "@/configs/request.js"
  export default {
    name: "ProductionPtandard",
    data() {
      return{
        data:[],
        productName:"",
        categoryOption : [
          {name:"全部", value:"0"},
          {name:"种植业", value:"1"},
          {name:"养殖业", value:"2"},
          {name:"畜牧业", value:"3"}
        ],
        category:'0'
      };
    },
    methods: {
      standardDetails(selectedId) {
        this.$router.push({path:'/standardDetailsTow',query:{
            selectedId : selectedId
          }})
      },
      //获取生产标准列表
      getProductionStandardList() {
        let loader = this.$loading.show();
        Request()
          .get("/api/production_standard/all", {
            category: this.category,
            productName: this.productName,
            sortBy: "id"
          })
          .then(response => {
            this.data = response.data;
            setTimeout(() => {
              loader.hide();
            },500)
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
    created: function () {
      let that = this;
      that.getProductionStandardList();
    }
  }
</script>

<style scoped>
  .mui-input-clear{
    height: 3rem;
  }
  #select{
    width: 75%;
    height: 2.8rem;
    margin-top: -0.7rem;
  }
  option{
    width:10rem;
  }
  .credit{
    border: none;
    display: flex;
    height: 3rem;
    background-color: #ccc;
    margin-left: 0;
    margin-top: -0.7rem;
  }
  .credit li{
    width: 50%;
    line-height: 3rem;
    text-align: left;
    border: none;
    padding-left: 0;
  }
  .mui-table-view-cell{
    line-height: 2rem;
  }
 .no-data{
   text-align: center;
 }
</style>
