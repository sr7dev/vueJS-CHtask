<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管记录</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form ref="form" v-if="data">
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-radio-group v-model="data.productionSubjectType">
                <el-radio label="1" disabled>企业</el-radio>
                <el-radio label="2" disabled>农户</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="乡镇">
              <el-input
                v-model="townShip"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业">
              <el-input
                v-model="companyName"
                style="width:70%"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="选择日期">
              <el-date-picker
                v-model="data.createTime"
                align="right"
                type="date"
                placeholder="选择日期"
                disabled
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="检查人">
              <el-input v-model="data.inspector" style="width:60%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="bg-blue">检查内容与结果</div>
        <el-row>
          <el-col :span="5">
            <el-form-item label>
              <div class="left-margin">生产记录(种养殖档案)</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <el-radio-group v-model="supervisionInfo.production">
                <el-radio label="1" disabled>有</el-radio>
                <el-radio label="2" disabled>真实完整</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <div class="left-margin">农产品产地准出证明(销售记录)</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <el-radio-group v-model="supervisionInfo.abuse">
                <el-radio label="1" disabled>有</el-radio>
                <el-radio label="2" disabled>真实完整</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label>
              <div class="left-margin">农产品产投入品记录（进、销、使用）</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <el-radio-group v-model="supervisionInfo.inspection">
                <el-radio label="1" disabled>有</el-radio>
                <el-radio label="2" disabled>真实完整</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <div class="left-margin">检验记录</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <el-radio-group v-model="supervisionInfo.origin">
                <el-radio label="1" disabled>有</el-radio>
                <el-radio label="2" disabled>真实完整</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label>
              <div class="left-margin">禁用投入品及滥用添加剂行为</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <el-checkbox
                v-model="supervisionInfo.input"
                disabled
                true-label="1"
                false-label="0"
                >有</el-checkbox
              >
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <div class="left-margin">“三品一标使用”</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <el-checkbox
                v-model="supervisionInfo.standard"
                disabled
                true-label="1"
                false-label="0"
                >合规</el-checkbox
              >
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="常用语" class="left-margin">
              <el-input
                disabled
                style="width:30%"
                v-model="data.otherProblems"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <div class="left-margin">现场发现的其他问题</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-input
                type="textarea"
                :rows="5"
                v-model="data.otherProblems"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="left-margin">
              <table>
                <tbody>
                  <tr>
                    <td rowspan="2">结论</td>
                    <td>合格</td>
                    <td>
                      <el-checkbox
                        v-model="data.conclusion"
                        true-label="1"
                        false-label="0"
                        disabled
                      ></el-checkbox>
                    </td>
                  </tr>
                  <tr>
                    <td>不合格</td>
                    <td>
                      <table class="no-border">
                        <tbody>
                          <tr>
                            <td>责令修改</td>
                            <td>
                              <el-input
                                v-model="conclusionData.order"
                                style="width:100%"
                                :disabled="data.conclusion == 1"
                              ></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td>建议处罚</td>
                            <td>
                              <el-input
                                v-model="conclusionData.suggestion"
                                style="width:100%"
                                :disabled="data.conclusion == 1"
                              ></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td>其他处理</td>
                            <td>
                              <el-input
                                v-model="conclusionData.others"
                                style="width:100%"
                                :disabled="data.conclusion == 1"
                              ></el-input>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-col>
          <el-col :span="11">
            <table class="image-upload-table">
              <tbody>
                <tr>
                  <td width="30%">现场图片</td>
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
                      >{{ data.scenePhotos.replace("/uploads/", "") }}</el-link
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
                    <el-link
                      style=" display: table"
                      v-if="data.sign"
                      @click="downloadFile_Sign()"
                      >{{ data.sign.replace("/uploads/", "") }}</el-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </el-col>
        </el-row>
        <el-form-item class="left-margin">
          <el-button
            size="small"
            type="primary"
            plain
            v-on:click="$router.go(-1)"
            >返回</el-button
          >
        </el-form-item>
      </el-form>
      <template v-if="!data">
        <div v-loading="listLoading">装货...</div>
      </template>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import axios from "axios";
export default {
  data() {
    return {
      id: 0,
      townShip: "",
      companyName: "",
      imageUrl: "",
      data: null,
      conclusionData: null,
      supervisionInfo: null,
      listLoading: true,
      downloadUrl: "",
      is_ie:null
    };
  },
  created() {
    this.isIE();
    this.id = this.$route.params.id;
    this.townShip = this.$route.query.township;
    this.companyName = this.$route.query.company;
    this.getData();
    this.downloadUrl = Urls.DOWNLOAD_URL();
  },
  methods: {
    getData() {
      this.listLoading = true;
      Request()
        .get("/api/supervision_record/get/" + this.id, {
          id: this.id
        })
        .then(response => {
          this.data = response;
          this.conclusionData = JSON.parse(this.data.conclusionFalseInfo);
          this.supervisionInfo = JSON.parse(this.data.supervisionInfo);
          if(this.data.scenePhotos && this.data.scenePhotos.indexOf("/uploads/")<0)
          this.data.scenePhotos =  "/uploads/"+this.data.scenePhotos;
          if(this.data.sign && this.data.sign.indexOf("/uploads/")<0)
          this.data.sign =  "/uploads/"+this.data.sign;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    downloadFile_Live() {
      axios({
        url: this.downloadUrl + this.data.scenePhotos,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        if(!this.isIE()){
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
        }else{
          const newBlob = new Blob([response.data], {type: 'application/octet-stream'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, this.data.scenePhotos.replace("/uploads/", ""));
            return;
          }
        }
      });
    },
    downloadFile_Sign() {
      axios({
        url: this.downloadUrl + this.data.sign,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        if(!this.isIE()){
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", this.data.sign.replace("/uploads/", "")); //or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        }else{
          const newBlob = new Blob([response.data], {type: 'application/octet-stream'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, this.data.sign.replace("/uploads/", ""));
            return;
          }
        }
      });
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    }
  }
};
</script>

<style lang="scss">
@import "./detailsRegulatoryRecord.scss";
</style>
