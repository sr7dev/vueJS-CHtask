<template>
  <div>
    <mt-header fixed title="溯源详情">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="header" v-if="tracingData">
      <div class="mui-card">
        <div class="mui-card-header mui-header" style="position: relative">
          <div>寸草堂</div>
          <div>
            溯源档案(编号:<span style="font-size:12px">{{
              productBatchNumber
            }}</span
            >)
          </div>
        </div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <table>
              <tr>
                <td>商品名称:</td>
                <td>
                  {{ productInfo ? productInfo.productName : " " }}
                </td>
              </tr>
              <tr>
                <td>产地:</td>
                <td>{{ locationInfo ? locationInfo.locationName : " " }}</td>
              </tr>
              <tr>
                <td>品种:</td>
                <td>
                  {{
                    tracingData.batchName
                      ? tracingData.batchName.split(",")[0]
                      : " "
                  }}
                </td>
              </tr>
              <tr>
                <td>采摘时间:</td>
                <td>
                  {{
                    tracingData.productionTime
                      ? tracingData.productionTime.substr(0, 10)
                      : " "
                  }}
                </td>
              </tr>
              <tr>
                <td>种植园:</td>
                <td>{{ companyInfo ? companyInfo.companyName : " " }}</td>
              </tr>
              <tr>
                <td>详细地址:</td>
                <td>{{ locationInfo ? locationInfo.locationAddress : " " }}</td>
              </tr>
              <tr>
                <td>园主:</td>
                <td>{{ tracingData.charge }}</td>
              </tr>
              <tr>
                <td>批次:</td>
                <td>{{ productBatchNumber }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div class="mui-card" v-if="batchTaskData && batchTaskData.length > 0">
        <div class="mui-card-header">
          作业:
        </div>
        <div
          class="mui-card-content"
          :key="item.id"
          v-for="item in batchTaskData"
        >
          <span style="padding-left: 1rem"
            >施肥 &nbsp;&nbsp;&nbsp;&nbsp;{{
              item.taskDate.substr(0, 10)
            }}</span
          >
          <div class="mui-card-content-inner picter">
            <img :src="baseUrl + item.productTaskFile" />
          </div>
        </div>
      </div>
      <div class="mui-card" v-else>
        <div class="mui-card-header">
          作业:
        </div>
        <div class="mui-card-content">
          <span style="padding-left: 1rem">没有数据</span>
        </div>
      </div>
    </div>
    <div class="header" v-else>
      <p style="text-align:center">没有数据</p>
    </div>
  </div>
</template>

<script>
import Request from "@/configs/request.js";
import { Urls } from "@/configs/constants.js";
export default {
  name: "sweepCode",
  data() {
    return {
      productBatchNumber: null,
      companyInfo: null,
      tracingData: null,
      locationInfo: null,
      productInfo: null,
      batchTaskData: null,
      baseUrl: Urls.DOWNLOAD_URL()
    };
  },
  methods: {
    /* getting tracingdata using batchnumber */
    async getTracingData() {
      await Request()
        .get("/api/tracing/getByBatchNumber/" + this.productBatchNumber)
        .then(response => {
          this.tracingData = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /* getting company information using companyid of tracingdata */
    getCompanyData() {
      Request()
        .get("/api/company_production/name", {
          companyid: this.tracingData.companyId
        })
        .then(response => {
          this.companyInfo = response[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    /* getting location information using locationId of tracingdata */
    getTracing_location() {
      Request()
        .get("/api/tracing_location/get/" + this.tracingData.locationId)
        .then(response => {
          this.locationInfo = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /* getting product information using productId of tracingdata */
    getProductInfo() {
      Request()
        .get("/api/product_production/name", {
          productid: this.tracingData.productId
        })
        .then(response => {
          this.productInfo = response[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    /* getting task history using productBatchNumber */
    getBatchTaskInfo() {
      Request()
        .get("/api/product_batch/getByBatchNumber/" + this.productBatchNumber)
        .then(response => {
          Request()
            .get("/api/product_batch_task/all", {
              productBatchId: response.id
            })
            .then(response => {
              this.batchTaskData = response.data;
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  async created() {
    let loader = this.$loading.show();
    this.productBatchNumber = this.$route.params.batchNumber; //getting batchnumber from path
    // this.getData();
    await this.getTracingData();
    await this.getBatchTaskInfo();
    this.tracingData.locationId && this.getTracing_location();
    this.tracingData.companyId && this.getCompanyData();
    this.tracingData.productId && this.getProductInfo();

    setTimeout(() => {
      loader.hide();
    }, 1000);
  }
};
</script>

<style scoped>
.header {
  padding-top: 0.5rem;
}
.mui-header {
  height: 4rem;
  padding: 10px !important;
  margin-bottom: 0.5rem;
  display: block !important;
}

.mui-card-content {
  margin-top: 1rem;
}
.picter {
  height: 10rem;
}
table {
  width: 100%;
  border-top: 0.01rem #ccc solid;
  border-left: 0.01rem #ccc solid;
}
tr {
  line-height: 2rem;
  border-bottom: 0.01rem #ccc solid;
}
td {
  text-align: center;
  border-right: 0.01rem #ccc solid;
}
img {
  width: 100%;
  height: 100%;
}
</style>
