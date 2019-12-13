<template>
    <div>
      <mt-header fixed title="生产标准详情">
        <router-link to="/productionPtandardEp" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="header">
        <ul>
          <li>产品名称 <span>{{data.productName}}</span></li>
          <li>类别<span>{{data.category | Type}}</span></li>
          <li>发布日期<span>{{data.releaseTime}}</span></li>
          <li>发布者 <span>{{data.releasePerson}}</span></li>
        </ul>
        <div class="mui-card">
          <div class="mui-card-header">生产标准</div>
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              {{data.productStandard}}
            </div>
          </div>
        </div>
        <mt-tabbar>
          <mt-button  size="large" type="primary" @click="">查看</mt-button>
          <mt-button  size="large" :disabled="!data.productionStandardProfiles" type="primary" @click="downloadFile">下载</mt-button>
        </mt-tabbar>
      </div>
    </div>
</template>

<script>
  import Request from "@/configs/request.js"
  import axios from "axios";
  import { Urls } from "@/configs/constants";
    export default {
        name: "StandardDetailsEp",
      data() {
        return{
          data:{}
        }
      },
      methods:{
        //生产标准详情
        getProductionStandardDetails(id) {
          let loader = this.$loading.show();
          Request()
            .get("/api/production_standard/get/" + id)
            .then(response => {
              console.log(response);
              this.data = response;
              if(response.releaseTime){
                this.data.releaseTime = response.releaseTime.substring(0, response.releaseTime.lastIndexOf('T'));
              }
              setTimeout(() => {
                loader.hide();
              }, 0.5 * 1000);
            })
            .catch(error => {
              console.log(error);
            });
        },
        //下载
        downloadFile() {
          axios({
            url: Urls.DOWNLOAD_URL() + this.data.productionStandardProfiles,
            method: "GET",
            responseType: "blob" // important
          }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              this.data.productionStandardProfiles.replace("/uploads/", "")
            ); //or any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
          });
        }
      },
      //类别过滤器
      filters: {
        Type: function (value) {
          switch (value) {
            case "1":
              value ="种植业";
              break;
            case "2":
              value ="养殖业";
              break;
            case "3":
              value ="畜牧业";
              break;
          }
          return value
        }
      },
      created() {
        this.getProductionStandardDetails(this.$route.query.selectedId);
      }
    }
</script>

<style scoped>
  ul{
    margin-left: -2rem;
  }
  li{
    position: relative;

    line-height: 4rem;
    padding-left: 2rem;
    border-bottom: 0.03rem black solid;
  }
  span{
    position: absolute;
    left: 11rem;
  }
  .mui-card-content-inner{
    height: 10rem;
  }
</style>
