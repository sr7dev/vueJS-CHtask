<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管记录</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">整改记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-row>
        <div v-if="listLoading">请选择</div>
      </el-row>
      <el-form ref="form" v-if="!listLoading" :rules="rules">
        <el-row>
          <el-col :span="5">
            <el-form-item label="乡镇">
              <el-select v-model="data.townId" placeholder="请选择">
                <el-option
                  v-for="item in township"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业">
              <el-select v-model="data.companyId">
                <el-option
                  v-for="item in companyList"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择日期">
              <el-date-picker
                v-model="data.createTime"
                align="right"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检查人">
              <el-input v-model="data.inspector" style="width:60%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="bg-blue">检查内容与结果</div>
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
                                :disabled="data.conclusion == 1"
                                style="width:100%"
                              ></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td>建议处罚</td>
                            <td>
                              <el-input
                                v-model="conclusionData.suggestion"
                                :disabled="data.conclusion == 1"
                                style="width:100%"
                              ></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td>其他处理</td>
                            <td>
                              <el-input
                                v-model="conclusionData.others"
                                :disabled="data.conclusion == 1"
                                style="width:100%"
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
                  <td>现场图片</td>
                  <td colspan="3">
                    <div class="img-container" @click="chooseFile_Live()">
                      <img v-for="src in images" :src="src" :key="src" class="preview">
                    </div>
                    <p>{{ fileName }}</p>
                    <div class="image-box">
                      <input
                        type="file"
                        id="file"
                        ref="file_live_1"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_Live()"
                        name="images"
                        style="display:none"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>签名</td>
                  <td>
                    <div class="img-container" @click="chooseFile_Sign()">
                      <img v-for="src in signs" :src="src" :key="src" class="preview">
                    </div>
                    <p>{{ signName }}</p>
                    <div class="image-box">
                      <input
                        type="file"
                        id="file1"
                        ref="file_live_2"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_Sign()"
                        name="signs"
                        style="display:none"
                      />
                    </div>
                  </td>
                  <td>确认人签名</td>
                  <td>
                    <div class="img-container" @click="chooseFile_CofirmSign()">
                      <img v-for="src in confirmSigns" :src="src" :key="src" class="preview">
                    </div>
                    <p>{{ confirmSignName }}</p>
                    <div class="image-box">
                      <input
                        type="file"
                        id="file2"
                        ref="file_live_3"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_ConfirmSign()"
                        name="confirmSigns"
                        style="display:none"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-col>
        </el-row>

        <el-form-item class="left-margin">
          <el-button type="success" plain v-on:click="onSubmit">保存</el-button>
          <el-button type="danger" v-on:click="$router.go(-1)" plain
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import axios from "axios";
export default {
  data() {
    return {
      images:[],
      fileName: '',
      signs:[],
      signName: '',
      confirmSigns:[],
      confirmSignName: '',
      id: -1,
      listLoading: false,
      data: null,
      imageUrl_Live: "",
      imageUrl_Sign: "",
      imageUrl_ConfirmSign: "",
      file_live_1: null,
      file_live_2: null,
      file_live_3: null,
      township: [],
      companyList: [],
      rules: {},
      conclusionData: null
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getTown();
    this.getCompanyProduct();
    this.getData();
  },
  methods: {
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
    getCompanyProduct() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyList = this.companyList.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getData() {
      this.listLoading = true;
      Request()
        .get("/api/supervision_record/get/" + this.id, {
          id: this.id
        })
        .then(response => {
          this.data = response;
          this.conclusionData = JSON.parse(this.data.conclusionFalseInfo);
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit() {
      var formData = new FormData();
      var conclusionData = {
        order: this.conclusionData.order ? this.conclusionData.order : " ",
        suggestion: this.conclusionData.suggestion
          ? this.conclusionData.suggestion
          : " ",
        others: this.conclusionData.others ? this.conclusionData.others : " "
      };
      conclusionData = JSON.stringify(conclusionData);

      if (this.file_live_1) {
        formData.append("file1", this.file_live_1);
      }
      if (this.file_live_2) {
        formData.append("file2", this.file_live_2);
      }
      if (this.file_live_3) {
        formData.append("file2", this.file_live_3);
      }
      formData.append("towId", this.data.townId);
      formData.append("id", this.id);
      formData.append("inspector", this.data.inspector);
      formData.append("companyId", this.data.companyId);
      this.data.createTime = new Date(this.data.createTime).toDateString(
        "YYYY-MM-DD"
      );
      formData.append("createTime", this.data.createTime);
      formData.append("conclusionFalseInfo", conclusionData);
      formData.append("conclusion", this.data.conclusion);
      formData.append("data", this.data);

      Request()
        .put("/api/supervision_record/update/" + this.data.id, formData)
        .then(response => {
          this.$router.push({ path: "/regulatoryRecord" });
        })
        .catch(error => {});
    },
    chooseFile_Live() {
      // this.$refs.file_live_1.click();
      document.getElementById('file').click()
    },
    chooseFile_Sign() {
      // this.$refs.file_sign.click();
      document.getElementById('file1').click()
    },
    chooseFile_CofirmSign() {
      // this.$refs.file_confirmsign.click();
      document.getElementById('file2').click()
    },
    handleFileUpload_Live() {
      this.file_live_1 = this.$refs.file_live_1.files[0];
      this.images = [];
      let reader = new FileReader();
      let that = this;
      reader.onload = function (e) {
        that.images.push(e.target.result);

      }
      reader.readAsDataURL(this.file_live_1); 
      this.fileName = this.file_live_1.name;
    },
    handleFileUpload_Sign() {
      this.file_live_2 = this.$refs.file_live_2.files[0];
      this.signs = [];
      let reader = new FileReader();
      let that = this;
      reader.onload = function (e) {
        that.signs.push(e.target.result);

      }
      reader.readAsDataURL(this.file_live_2);
      this.signName = this.file_live_2.name;
    },
    handleFileUpload_ConfirmSign() {
      this.file_live_3 = this.$refs.file_live_3.files[0];
      this.confirmSigns = [];
      let reader = new FileReader();
      let that = this;
      reader.onload = function (e) {
        that.confirmSigns.push(e.target.result);

      }
      reader.readAsDataURL(this.file_live_3);
      this.confirmSignName = this.file_live_3.name;
    }
  }
};
</script>

<style lang="scss">
</style>