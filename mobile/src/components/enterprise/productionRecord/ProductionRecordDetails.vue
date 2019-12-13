<template>
    <div>
      <mt-header fixed title="生产记录详情">
        <router-link to="/productionRecord" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="header">
        <ul>
          <li>产品 <span>{{data.productName}}</span></li>
          <li>产量(公斤)<span>{{data.productionQuantity}}</span></li>
          <li>产地<span>{{data.productionArea}}</span></li>
          <li style="border: none">生产时长<span>{{data.productionTime}}天</span></li>
        </ul>
        <mt-tabbar>
          <mt-button  size="large" type="primary" @click="downloadFile()">附件下载</mt-button>
        </mt-tabbar>
      </div>
    </div>
</template>

<script>
  import Request from "@/configs/request.js"
  import { Urls } from "@/configs/constants";
  import axios from "axios";
  import { Toast } from 'mint-ui';
    export default {
        name: "ProductionRecordDetails",
      data(){
          return{
            data:{}
          }
      },
      methods:{
        //获取记录详情
        getData(id) {
          let loader = this.$loading.show();
          Request()
            .get("/api/production_record/get/" + id)
            .then(response => {
              console.log(response);
              this.data = response;
              setTimeout(() => {
                loader.hide();
              },500)
            })
            .catch(error => {
              console.log(error);
            });
        },
        //下载
        downloadFile() {
          if(this.data.productionProfiles){
            console.log(this.data.productionProfiles)
            axios({
              url: Urls.DOWNLOAD_URL() + this.data.productionProfiles,
              method: "GET",
              responseType: "blob" // important
            }).then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute(
                "download",
                this.data.productionProfiles.replace("/uploads/", "")
              ); //or any other extension
              document.body.appendChild(link);
              link.click();
              link.remove();
            });
          }else{
            console.log("没有需要下载的文件");
            Toast({
              message: '没有可下载的文件',
              duration: 3000
            });
          }

        }
      },

  created() {
          console.log(this.$route.query.id)
    this.getData(this.$route.query.id);
  }
    }
</script>

<style scoped>
  ul{
    margin-left: -3.5rem;
  }
  li{
    position: relative;
    line-height: 4rem;
    padding-left: 2rem;
    border-bottom: 0.03rem black solid;
  }
  span{
    position: absolute;
    left: 9rem;
  }
</style>
