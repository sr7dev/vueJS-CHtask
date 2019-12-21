<template>
    <div>
      <mt-header fixed title="企业详情">
        <router-link to="/enterpriseInformation" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="header">
        <ul>
          <li>企业名称<span>{{form.companyName}}</span></li>
          <li>乡镇 <span>{{filterTownship(form.townId)}}</span></li>
          <li>行业<span>{{form.agriculturalClassification|filter}}</span></li>
          <li>地址<span>{{form.companyAddress}}</span></li>
          <li>社会信用统一代码<span>{{form.creditCode}}</span></li>
          <li>联系人<span>{{form.contactPerson}}</span></li>
          <li>联系手机<span>{{form.contactMobile}}</span></li>
          <li>种植<span>{{form.productInfo.data_0_0}}</span></li>
          <li>种植面积<span>{{form.productInfo.data_0_1}}</span></li>
        </ul>
        <div class="mui-card">
          <div class="mui-card-header">企业荣誉</div>
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              {{form.companyHonor}}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import Request from "@/configs/request.js"
    export default {
        name: "CompanyDetails",
      data(){
          return{
            township:[],
            form: {
              agriculturalClassification: 1,
              chargePerson: "",
              companyAddress: "",
              companyHonor: "",
              companyId: 0,
              companyName: "",
              companyType: "1",
              contactMobile: "",
              contactPerson: "",
              contactWay: "",
              createUserId: 0,
              creditCode: "",
              doSupervision: "",
              landSource: "",
              plantArea: 0,
              public_license: 0,
              public_punish: 0,
              qualityStandardId: 0,
              quality_standard: 0,
              remarks: "",
              townId: 1,
              updateUserId: 0,
              productInfo: {
                data_0_0: "",
                data_0_1: "",
                data_0_2: "",
                data_0_3: "",
                data_1_0: "",
                data_1_1: "",
                data_1_2: "",
                data_2_0: "",
                data_2_1: "",
                data_3_0: "",
                data_3_1: ""
              }
            },
          }
      },
      filters: {
        filter: function (value) {
               switch (value) {
                 case "1":
                   return "养殖业";
                 case "2":
                   return "畜牧业";
                 case "3":
                   return "种植业"
               }
        }
      },
      methods:{
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
        //获取乡镇名
        filterTownship(townId) {
          let town = this.township.find(x => x.id === townId);
          if (town) {
            return town.name;
          } else {
            return "";
          }
        },
        //企业详情

        getCompanyInfo(id) {
        let loader = this.$loading.show();
          Request()
            .get("/api/company_production/get/"+id)
            .then(response => {
              this.form = response;
              //将后台JSON字符串转为一个对象
              
              var regex = new RegExp(/(?<=name:\")(.*)(?=, )/g),
                results = regex.exec(response.productInfo);
                const tmpname = results ? results[1] :"";

              regex = new RegExp(/(?<=area:)(.*)(?=\"})/g),
                results = regex.exec(response.productInfo);
                const tmparea = results ? results[1] :"";
              this.form.productInfo = {
                data_0_0 : tmpname,
                data_0_1 : tmparea
              };
              setTimeout(() => {
                loader.hide();
              },500)
            })
            .catch(error => {
              console.log(error);
            });
        },

      },
      created() {
          let id = this.$route.query.companyId;
          this.getCompanyInfo(id);
          this.getTown();
      }
    }
</script>

<style scoped>
  ul{
    margin-top: 4rem;
    margin-left: -2rem;
  }
  li{
    position: relative;
    border-bottom: 0.02rem black solid;
    line-height: 3rem;
    padding-left: 1.5rem;
  }
  span{
    position: absolute;
    left: 12rem;
  }
  .mui-card-content-inner{
    height: 10rem;
  }
</style>
