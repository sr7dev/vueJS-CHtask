<template>
  <div>
    <mt-header fixed title="监管记录详情">
      <router-link to="/regulatoryRecordTow" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="header">
      <ul>
        <li>日期<span>{{data.createTime}}</span></li>
        <li>乡镇<span>{{townShip}}</span></li>
        <li>受检单位<span>{{companyName}}</span></li>
        <li style="border: none">检查人<span>{{data.inspector}}</span></li>
      </ul>

      <div class="mui-card">
        <div class="mui-card-header">检查内容与结果</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p class="Title" v-model="supervisionInfo.production">生产记录（种养殖档案)
              <span class="mui-input-row mui-radio mui-left" style="margin-left:5.5rem;margin-top:-0.5rem">
          <label>有</label>
          <input type="radio" :checked="supervisionInfo.production==1">
        </span>
              <span class="mui-input-row mui-radio mui-left" style="margin-left:9rem; margin-top:-0.5rem">
          <label>真实完整</label>
          <input type="radio" :checked="supervisionInfo.production==2">
        </span>
            </p>
            <p class="Title">农产品产投入品记录（进、销、使用）
              <span class="mui-input-row mui-radio mui-left" style="margin-left:5.5rem;margin-top:-0.5rem">
          <label>有</label>
          <input type="radio" :checked="supervisionInfo.inspection==1">
        </span>
              <span class="mui-input-row mui-radio mui-left" style="margin-left:9rem; margin-top:-0.5rem">
          <label>真实完整</label>
          <input type="radio" :checked="supervisionInfo.inspection==2">
        </span>
            </p>
            <p class="Title">禁用投入品及滥用添加剂行为
              <span class="mui-input-row mui-radio mui-left" style="margin-left:5.5rem;margin-top:-0.5rem">
          <label>有</label>
          <input type="radio" :checked="supervisionInfo.input==1">
        </span>
              <span class="mui-input-row mui-radio mui-left" style="margin-left:9rem; margin-top:-0.5rem">
          <label>真实完整</label>
          <input type="radio" :checked="supervisionInfo.input==2">
        </span>
            </p>
            <p class="Title">农产品产地准出证明（销售记录）
              <span class="mui-input-row mui-radio mui-left" style="margin-left:5.5rem;margin-top:-0.5rem">
          <label>有</label>
          <input type="radio" :checked="supervisionInfo.abuse==1">
        </span>
              <span class="mui-input-row mui-radio mui-left" style="margin-left:9rem; margin-top:-0.5rem">
          <label>真实完整</label>
          <input type="radio" :checked="supervisionInfo.abuse==2">
        </span>
            </p>
            <p class="Title">检验记录
              <span class="mui-input-row mui-radio mui-left" style="margin-left:5.5rem;margin-top:-0.5rem">
          <label>有</label>
          <input type="radio" :checked="supervisionInfo.origin==1">
        </span>
              <span class="mui-input-row mui-radio mui-left" style="margin-left:9rem; margin-top:-0.5rem">
          <label>真实完整</label>
          <input type="radio" :checked="supervisionInfo.origin==2">
        </span>
            </p>
            <p class="Title">“三品一标使用”
              <span class="mui-input-row mui-radio mui-left" style="margin-left:5.5rem;margin-top:-0.5rem">
          <label>合规</label>
          <input type="radio" :checked="supervisionInfo.standard==1">
        </span>
            </p>
            <p style="font-size: 1rem;font-weight:500;color: black">其他</p>
            <div class="mui-input-row input">
              <input type="text" placeholder="水稻种植情况检查">
            </div>
            <p style="font-size: 1rem;font-weight:500;color: black">现场发现的其他问题</p>
            <div class="mui-input-row input">
              <input type="text" :placeholder="data.otherProblems">
            </div>
            <p style="margin-left: 1rem;margin-top:2rem">结论&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp不合格</p>
            <div class="mt-field">
              <mt-field  v-model="conclusionData.order" label="责令修改" ></mt-field>
              <mt-field  v-model="conclusionData.suggestion" label="建议处罚"></mt-field>
              <mt-field  v-model="conclusionData.others" label="其他处理"></mt-field>
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
                    <el-link
                      v-if="data.scenePhotos"
                      style=" display: table"
                      @click="downloadFile_Live()"
                    >{{ data.scenePhotos.replace("/uploads/", "") }}</el-link>
                  </td>
                </tr>
                <tr>
                  <td width="30%">签名</td>
                  <td>
                    <div class="image-container">
                      <img class="sign_photo" :src="downloadUrl + data.sign" v-if="data.sign" />
                    </div>
                    <el-link
                      style=" display: table"
                      v-if="data.sign"
                      @click="downloadFile_Sign()"
                    >{{ data.sign.replace("/uploads/", "") }}</el-link>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="supervisor">
              <span>GPS定位</span>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-left: 1rem">
      </div>
    </div>
  </div>
</template>

<script>
  import Request from "@/configs/request.js";
  import { Urls } from "@/configs/constants";
  import axios from "axios";
  export default {
    name: "RegulatoryRecordDetails",
    data(){
      return{
        id: 0,
        townShip: "",
        companyName: "",
        imageUrl: "",
        data: {},
        conclusionData: {},
        supervisionInfo: {},
        listLoading: true,
        downloadUrl: ""
      }
    },
    methods:{
      //监管记录详情
      getData() {
        Request()
          .get("/api/supervision_record/get/" + this.id, {
            id: this.id
          })
          .then(response => {
            console.log(response);
            this.data = response;
            this.conclusionData = JSON.parse(this.data.conclusionFalseInfo);
            this.supervisionInfo = JSON.parse(this.data.supervisionInfo);
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
            this.data.scenePhotos.replace("/uploads/", "")
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
          link.setAttribute("download", this.data.sign.replace("/uploads/", "")); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
      },
    },
    created(){
      console.log(this.$route);
      this.id = this.$route.query.id;
      this.townShip = this.$route.query.town;
      this.companyName = this.$route.query.company;
      this.downloadUrl = Urls.DOWNLOAD_URL();
      this.getData();
    }
  }
</script>

<style scoped>
  ul {
    margin-left: -2rem;
    font-weight: 800;
  }

  li {
    position: relative;
    line-height: 4rem;
    padding-left: 2rem;
    border-bottom: 0.03rem black solid;
  }

  span {
    position: absolute;
    left: 8rem;
    font-weight: 500;
  }

  .mui-card-content-inner {
    margin-right: -2rem;
  }

  .Title {
    font-size: 0.8rem;
    margin-top: 1rem;
  }

  .scene {
    height: 12rem;
    border: 0.01rem black solid;
    margin-top: 1rem;
    margin-right: 1.5rem;
    margin-bottom: 1rem;
  }

  .scene span {
    left: 3rem;
    line-height: 7rem;
  }

  .supervisor {
    height: 8rem;
    border: 0.01rem black solid;
    margin-bottom: 1rem;
    margin-right: 1.5rem;
  }

  .supervisor span {
    left: 3rem;
    line-height: 8rem;
  }
  .mt-field{
    margin-right: 1rem;
  }
  .input{
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
  .image-container p{
    margin-top: 20px;
  }
  img {
    max-width: 100%;
    height: 100%;
  }
</style>
