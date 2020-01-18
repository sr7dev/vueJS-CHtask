<template>
 <!-- // --------- 重写逻辑 开始------//  -->
  <div>
    <mt-header fixed title="监管记录详情">
      <router-link to="/regulatoryRecord" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="header">
      <div class="mui-card margin-top-3">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <ul>
              <li>
               日期
               <span>{{ data.createTime && data.createTime.substr(0,10) }}</span> 
              </li>             
              <li>
                乡镇<span>{{ townShip }}</span>
              </li>
              <li>
                受检单位<span>{{ companyName }}</span>
              </li>
              <li style="border: none">
                检查人<span>{{ data.inspector }}</span>
              </li>
            </ul> 
          </div>
        </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-header">检查内容与结果</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p class="Title">
              生产记录（种养殖档案)
              <span
                class="mui-input-row mui-radio mui-left"
                style="margin-left:6rem;margin-top:-0.5rem"
              >
                <label>有</label>
                <input
                  type="radio"
                  name="production"
                  value="1"
                  v-model="supervisionInfo.production"
                />
              </span>
              <span
                class="mui-input-row mui-radio mui-left"
                style="margin-left:8rem; margin-top:-0.5rem"
              >
                <label>真实完整</label>
                <input
                  type="radio"
                  name="production"
                  value="2"
                  v-model="supervisionInfo.production"
                />
              </span>
            </p>

            <p class="Title">
              农产品产投入品记录（进、销、使用）
              <span
                class="mui-input-row mui-radio mui-left"
                style="margin-left:6rem;margin-top:-0.5rem"
              >
                <label>有</label>
                <input
                  type="radio"
                  name="inspection"
                  value="1"
                  v-model="supervisionInfo.inspection"
                />
              </span>
              <span
                class="mui-input-row mui-radio mui-left"
                style="margin-left:8rem; margin-top:-0.5rem"
              >
                <label>真实完整</label>
                <input
                  type="radio"
                  value="2"
                  v-model="supervisionInfo.inspection"
                />
              </span>
            </p>
            <p class="Title">
              禁用投入品及滥用添加剂行为
              <span
                class="mui-input-row mui-radio mui-left"
                style="margin-left:6rem;margin-top:-0.5rem"
              >
                <label>有</label>
                <input type="radio" value="1"
                  v-model="supervisionInfo.input" name="input"/>
              </span>
              <span
                class="mui-input-row mui-radio mui-left"
                style="margin-left:8rem; margin-top:-0.5rem"
              >
                <label>真实完整</label>
                <input type="radio" value="0"
                  v-model="supervisionInfo.input" name="input"/>
              </span>
            </p>
            <p class="Title">
              农产品产地准出证明（销售记录）
              <span
                class="mui-input-row mui-radio mui-left"
                style="margin-left:6rem;margin-top:-0.5rem"
              >
                <label>有</label>
                <input type="radio" value="1"
                  v-model="supervisionInfo.abuse" name="abuse"/>
              </span>
              <span
                class="mui-input-row mui-radio mui-left"
                style="margin-left:8rem; margin-top:-0.5rem"
              >
                <label>真实完整</label>
                <input type="radio" value="2"
                  v-model="supervisionInfo.abuse" name="abuse"/>
              </span>
            </p>

            <p class="Title">
              检验记录
              <span
                class="mui-input-row mui-radio mui-left"
                style="margin-left:6rem;margin-top:-0.6rem"
              >
                <label>有</label>
                <input type="radio" value="1"
                  v-model="supervisionInfo.origin" name="origin"/>
              </span>
              <span
                class="mui-input-row mui-radio mui-left"
                style="margin-left:8rem; margin-top:-0.5rem"
              >
                <label>真实完整</label>
                <input type="radio" value="2"
                  v-model="supervisionInfo.origin" name="origin"/>
              </span>
            </p>
            <p class="Title">
              “三品一标使用”
              <span
                class="mui-input-row mui-checkbox mui-left"
                style="margin-left:6rem;margin-top:-0.5rem"
              >
                <label>合规</label>
                <input type="checkbox" v-model="supervisionInfo.standard"/>
              </span>
            </p>
            <p style="font-size: 1rem;font-weight:500;color: black">常用语</p>
            <div class="mui-text-row input">
              <input type="text" v-model="data.usefulExpressions" disabled/>
            </div>
            <p style="font-size: 1rem;font-weight:500;color: black">
              现场发现的其他问题
            </p>
            <div class="mui-input-row input">
              <input type="text" v-model="data.otherProblems" disabled/>
            </div>
            <p style="margin-left: 1rem;margin-top:2rem">
              结论&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{data.conclusion>0 ? "合格" : "不合格"}}
            </p>
            <div class="mt-field">
              <mt-field
                v-model="conclusionData.order"
                label="责令修改"
                 disabled
              ></mt-field>
              <mt-field
                v-model="conclusionData.suggestion"
                label="建议处罚"
                 disabled
              ></mt-field>
              <mt-field
                v-model="conclusionData.others"
                label="其他处理"
                 disabled
              ></mt-field>
            </div>
            <div class="scene">
              <table class="image-upload-table">
                <tbody>
                  <tr>
                    <td width="40%">现场图片</td>
                    <td>
                      <div class="image-container">
                        <img
                          class="live_photo"
                          :src="downloadUrl + data.scenePhotos"
                          v-if="data.scenePhotos"
                        />
                      </div>
                      <a
                        v-if="data.scenePhotos"
                        style=" display: table"
                        @click="downloadFile_Live()"
                        >{{ data.scenePhotos.replace("/uploads/", "") }}</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td width="30%">签名</td>
                    <td>
                      <div class="image-container">
                        <img
                          class="sign_photo"
                          :src="downloadUrl + data.sign"
                          v-if="data.sign"
                        />
                      </div>
                      <a
                        style=" display: table"
                        v-if="data.sign"
                        @click="downloadFile_Sign()"
                        >{{ data.sign.replace("/uploads/", "") }}</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="supervisor" v-if="data && data.id">
              <p style="color:#000; padding:2px 5px 0 5px">GPS定位</p>
              <baidu-map class="map" 
                :center="center" 
                :zoom="zoom" 
                ak="xaM7HHYaG0KjyOcouj09IWHavrggGUH5" 
                @ready="handler"
                :double-click-zoom="false"
                :map-click="true"
                :auto-resize="true"
                @click="onClickMap"
              >
          　　　<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-geolocation 
                  anchor="BMAP_ANCHOR_BOTTOM_RIGHT" 
                  :showAddressBar="true" 
                  :autoLocation="true"
                  @locationSuccess="locationSuccess"
                  @locationError="locationError"
                ></bm-geolocation>
                <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                  <bm-label :content="content" :offset="{width: -35, height: 30}"/>
                </bm-marker>
          　　</baidu-map>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-left: 1rem"></div>
    </div>
  </div>
  <!-- //-------------重写逻辑 结束 -------// -->
</template>

<script>
import Request from "@/configs/request.js";
import { Urls } from "@/configs/constants";
import Auth from "@/configs/auth.js";
import { DatetimePicker } from 'mint-ui';
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue';
import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation.vue';
import BmMarker from 'vue-baidu-map/components/overlays/Marker';
import BmLabel from 'vue-baidu-map/components/overlays/Label';
import BmNavigation from 'vue-baidu-map/components/controls/Navigation.vue';
import axios from "axios";
export default {
  name: "RegulatoryRecordDetails",
  components: {
    BmNavigation,
    BaiduMap,
    BmGeolocation,
    BmMarker,
    BmLabel,
    DatetimePicker
　},
  data() {
    return {
      content:"",
      center: {lng: 0, lat: 0},  
      zoom: 1,
      id: 0,
      townShip: "",
      companyName: "",
      imageUrl: "",
      data: {},
      conclusionData: {},
      supervisionInfo: {},
      listLoading: true,
      downloadUrl: ""
    };
  },
  methods: {
    //监管记录详情
     // --------- 重写逻辑 开始------// 
    getData() {
      let loader = this.$loading.show();
      Request()
        .get("/api/supervision_record/get/" + this.id, {
          id: this.id
        })
        .then(response => {
          this.data = response;
          this.conclusionData = JSON.parse(this.data.conclusionFalseInfo);
          this.supervisionInfo = JSON.parse(this.data.supervisionInfo);
          this.data.scenePhotos = this.data.scenePhotos.indexOf("/uploads/") >-1 ?
                             this.data.scenePhotos : "/uploads/"+this.data.scenePhotos;
          this.data.sign = this.data.sign.indexOf("/uploads/") >-1 ?
                             this.data.sign : "/uploads/"+this.data.sign;
          setTimeout(() => {
            loader.hide();
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //下载
    downloadFile_Live() {
      axios({
        url: this.downloadUrl + this.data.scenePhotos,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          this.data.scenePhotos.indexOf("/uploads/") >-1 ? this.data.scenePhotos.replace("/uploads/", "") : this.data.scenePhotos   
        ); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
    downloadFile_Sign() {
      axios({
        url: this.downloadUrl + this.data.sign,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download", 
          this.data.sign.indexOf("/uploads/") >-1 ? this.data.sign.replace("/uploads/", "") :this.data.sign
        ); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
    handler ({BMap, map}) {
      this.center.lng = this.data.longitude ? this.data.longitude : 116.404
      this.center.lat = this.data.latitude ? this.data.latitude : 39.915
      this.zoom = 15;
    },
    locationSuccess (point, AddressComponent, marker) {
      //定位成功后
      this.data.longitude = point.point.lng;
      this.data.latitude = point.point.lat;
      const addr = point.addressComponent.city + point.addressComponent.district + point.addressComponent.province + point.addressComponent.street + point.addressComponent.streetNumber;
      this.center = point.point
    },
    locationError(StatusCode) {
      this.$message({
        showClose: true,
        message: '不能指出你的位置',
        type: 'error'
      });
    },
    //-------------重写逻辑 结束 -------//
    handleConfirm() {
      console.log(this.data.createTime);
    },
    onSubmit() {
      let loader = this.$loading.show();
      var formData = new FormData();
      formData = this.makeFormData();
      Request()
        .put("/api/supervision_record/update/"+ this.id, formData)
        .then(response => {
          setTimeout(() => {
            loader.hide();
          }, 0.5 * 1000);
          this.$router.push({ path: "/regulatoryRecord" });
        })
        .catch(error => {
          setTimeout(() => {
            loader.hide();
          }, 0.5 * 1000);
        });
    },
    makeFormData() {
      var mainFormData = new FormData();
      var conclusionData =
        this.data.conclusion == 1
          ? {
              order: " ",
              suggestion: " ",
              others: " "
            }
          : {
              order: this.data.order
                ? this.data.order
                : " ",
              suggestion: this.data.suggestion
                ? this.data.suggestion
                : " ",
              others: this.data.others
                ? this.data.others
                : " "
            };
      conclusionData = JSON.stringify(conclusionData);
      var supervisionInfo = {
        production: this.supervisionInfo.production ? this.supervisionInfo.production : "",
        input: this.supervisionInfo.input ? this.supervisionInfo.input : "",
        abuse: this.supervisionInfo.abuse ? this.supervisionInfo.abuse : "",
        origin: this.supervisionInfo.origin ? this.supervisionInfo.origin : "",
        inspection: this.supervisionInfo.inspection ? this.supervisionInfo.inspection : "",
        standard: this.supervisionInfo.standard ? "1" : "0"
      };
      supervisionInfo = JSON.stringify(supervisionInfo);
      mainFormData.append("latitude", this.data.latitude);
      mainFormData.append("longitude", this.data.longitude);
      mainFormData.append("companyId", this.data.companyId);
      mainFormData.append("conclusion", this.data.conclusion);
      mainFormData.append("conclusionFalseInfo", conclusionData);
      mainFormData.append("createTime", this.data.createTime);
      mainFormData.append("inspector", this.data.inspector);
      mainFormData.append("otherProblems", this.data.otherProblems);
      mainFormData.append(
        "productionSubjectType",
        this.data.productionSubjectType
      );
      mainFormData.append("supervisionInfo", supervisionInfo);
      mainFormData.append("townId", this.data.townId);
      mainFormData.append("createUserId", Auth().user().id);
      mainFormData.append("id", this.data.id);
      mainFormData.append("supervisionRecordTime", new Date(this.data.supervisionRecordTime));
      mainFormData.append("updateTime", this.data.updateTime);
      mainFormData.append("updateUserId", Auth().user().id);
      mainFormData.append(
        "usefulExpressions",
        this.data.usefulExpressions
      );
      return mainFormData;
    },
    onClickMap(e) {
      this.data.longitude = e.point.lng;
      this.data.latitude = e.point.lat;
      this.center = e.point;
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.townShip = this.$route.query.town;
    this.companyName = this.$route.query.company;
    this.downloadUrl = Urls.DOWNLOAD_URL();
    this.getData();
  }
};
</script>

<style scoped>
ul {
  margin-left: -3rem;
  font-weight: 800;
}

li {
  position: relative;
  line-height: 4rem;
  padding-left: 1rem;
  border-bottom: 0.03rem black solid;
}

span {
  position: absolute;
  left: 5rem;
  font-weight: 500;
}
.mui-checkbox input[type=checkbox] {
  top:6px!important
}
.mui-radio input[type=radio] {
  top:6px!important
}
.mui-radio input[type=radio]:before {
  font-size: 15px!important;
}
.mui-checkbox input[type=checkbox]:before {
  font-size: 15px!important;
}

.margin-top-3 {
  margin-top:3.5rem!important;
}

.mui-card-content-inner {
  margin-right: -1rem;
  padding:5px!important;
}

.Title {
  font-size: 0.8rem;
  margin-top: 1rem;
  letter-spacing: -1.5px;
}

.scene {
  height: 15.5rem;
  border: 0.01rem black solid;
  margin-top: 1rem;
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0 0 2rem;
}

.scene span {
  left: 3rem;
  line-height: 7rem;
}

.supervisor {
  height: 185px;
  widows: 100%;
  border: 0.01rem black solid;
  margin-bottom: 1rem;
  margin-right: 1.5rem;
}

.supervisor span {
  left: 3rem;
  line-height: 8rem;
}
.mt-field {
  margin-right: 1rem;
}
.input {
  margin-right: 1.5rem;
}

.image-container {
  max-width: 110px;
  width: 100%;
  height: 80px;
  margin: 5px 0;
  border-radius: 5px;
  text-align: center;
  box-shadow: 1px 2px 5px 1px rgba(10, 8, 10, 0.61);
}
.image-container p {
  margin-top: 20px;
}
img {
  max-width: 100%;
  height: 100%;
}
.mui-checkbox.mui-left label, .mui-radio.mui-left label {
  padding-right: 15px;
  padding-left: 37px!important;
}

.map {
  width: 98%;
  margin: 0 auto;
  height: 150px;
}
</style>
