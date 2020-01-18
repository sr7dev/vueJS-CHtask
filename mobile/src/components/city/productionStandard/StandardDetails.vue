<template>
    <div>
      <mt-header fixed title="生产标准详情">
        <router-link to="/productionPtandard" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="header" v-if="data">
        <ul>
          <li>标准名称 <span>{{data.productStandard && data.productStandard.indexOf("png") > -1 ? data.productStandard.replace(".png","") : data.productStandard}}</span></li>
          <li>发布日期<span>{{data.releaseTime}}</span></li>
          <li>发布者 <span>{{data.releasePerson}}</span></li>
        </ul>
        <div class="mui-card">
          <div class="mui-card-header">生产标准</div>
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              {{data.productStandard && data.productStandard.indexOf("png") > -1 ? data.productStandard.replace(".png","") : data.productStandard}}
            </div>
          </div>
        </div>
        <mt-popup
          v-model="popupVisible"
          v-if="data.productionStandardProfiles"
          popup-transition="popup-fade">
          <img :src="baseUrl+data.productionStandardProfiles" style="width:200px;height:100vh"/>
        </mt-popup>
        <mt-tabbar>
          <mt-button  size="large" type="primary" @click="popupVisible=true" :disabled="!data.productionStandardProfiles">查看</mt-button>
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
      name: "StandardDetails",
    data() {
      return{
        baseUrl:Urls.DOWNLOAD_URL(),
        popupVisible:false,
        data:{
        }
      }
    },
    created() {
        this.getProductionStandardDetails(this.$route.query.selectedId);
    },
    methods: {
      getProductionStandardDetails(id) {
        let loader = this.$loading.show();
        Request()
        .get("/api/production_standard/get/" + id)
        .then(response => { 
          this.data = response;
          
          if(response.releaseTime){
            this.data.releaseTime = response.releaseTime.substring(0, response.releaseTime.lastIndexOf('T'));
          }
          var formData = new FormData();
          
          formData.append("visitCount", response.visitCount+1);
          formData.append("id", response.id);
          formData.append("productName", response.productName);
          formData.append("category", response.category);
          if(response.releaseTime) formData.append("releaseTime", new Date(response.releaseTime));
          formData.append("releasePerson", response.releasePerson);
          formData.append("productStandard", response.productStandard);
          formData.append("productionStandardProfiles", response.productionStandardProfiles);
          formData.append("productId", response.productId);
          if(response.createUserId) formData.append("createUserId", response.createUserId);
          if(response.updateTime) formData.append("updateTime", response.updateTime);
          if(response.updateUserId) formData.append("updateUserId", response.updateUserId);

          Request()
          .put("/api/production_standard/update/" + id, formData)
          .then(response => {
          
          })
          .catch(error => {
            console.log(error);
          });
          setTimeout(() => {
            loader.hide();
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
      },
      // 重写逻辑 开始 //
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
      // 重写逻辑 结束 //
    }
  }
</script>

<style scoped>
  ul{
    margin-left: -2.5rem;
  }
  li{
    position: relative;
    line-height: 4rem;
    padding-left: 0.5rem;
    border-bottom: 0.03rem black solid;
  }
  span{
    position: absolute;
    left: 6rem;
    font-size: 0.9rem;
  }
  .mui-card-content-inner{
    height: 10rem;
  }
</style>
