<template>
  <div>
    <mt-header fixed :title="title">
      <router-link to="/inputsUse" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="header">
      <ul>
        <li>企业名称<span>{{filterCompnay(formData.companyId)}}</span></li>
        <li>样品名称<span>{{formData.sampleName}}</span></li>
        <li style="border: none">产量(公斤)<span>{{formData.amount}}</span></li>
      </ul>
      <mt-tabbar>
        <mt-button size="large" type="primary" @click="downloadFile()">附件下载</mt-button>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
  import Request from "@/configs/request.js"
  import { Urls } from "@/configs/constants";
  import axios from "axios";
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';

  export default {
    name: "InputsUseDetails",
    data() {
      return {
        formData: {
          companyId: "-1",
          amount: "",
          sampleName: "",
        },
        fileName: '',
        file: null,
        title: "",
        companyProduction: [{ id: -1, name: "全部" }],
      }
    },
    methods: {
      //获取投入品使用详情
      getData(id, type) {
        if (type == 1) {
          //let loader = this.$loading.show();
          Indicator.open('数据加载中...');
          this.title = "投入品使用详情";
          Request()
            .get("/api/inputsUse/get/" + id)
            .then(response => {
              console.log(12333333);
              console.log(response);
              this.formData = response;
              if(response.inputProfiles){
                this.file = response.inputProfiles;
                this.fileName = this.file.replace("/uploads/", "");
              }else {
                this.file = "";
                this.fileName ="";
              }
              setTimeout(() => {
                Indicator.close();
              },500)
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          Indicator.open('数据加载中...');
          this.title = "投入品采购详情";
          Request()
            .get("/api/inputsPurchase/get/" + id)
            .then(response => {
              console.log(response);
              this.formData = response;
              if(response.inputProfiles){
                this.file = response.inputProfiles;
                this.fileName = this.file.replace("/uploads/", "");
              }else {
                this.file = "";
                this.fileName ="";
              }
              setTimeout(() => {
                Indicator.close();
              },500)
            })
            .catch(error => {
              console.log(error);
            });
        }
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
      //下载
      downloadFile() {
        if(this.file) {
          axios({
            url: Urls.DOWNLOAD_URL() + this.file,
            method: "GET",
            responseType: "blob" // important
          }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              this.file.replace("/uploads/", "")
            ); //or any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
          });
        }else{
          Toast({
            message: '没有可下载的文件',
            duration: 3000
          });
          console.log("图片不存在")
        }
      }
    },
    created() {
      console.log(this.$route);
      let type = this.$route.query.type;
      let id = this.$route.query.id;
      this.getData(id, type);
      //获取公司名称
      this.getCompanyProduction()
    }
  }
</script>

<style scoped>
  ul {
    margin-left: -3.5rem;
  }

  li {
    position: relative;
    line-height: 4rem;
    padding-left: 2rem;
    border-bottom: 0.03rem black solid;
  }

  span {
    position: absolute;
    left: 9rem;
  }
</style>
