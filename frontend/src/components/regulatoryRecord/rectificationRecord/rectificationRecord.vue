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
                type="datetime"
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
                    <div class="image-box">
                      <div class="js--image-preview" @click="chooseFile_Live()">
                        <img :src="imageUrl_Live" />
                      </div>
                      <input
                        type="file"
                        id="file"
                        ref="file_live_1"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_Live()"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>签名</td>
                  <td>
                    <div
                      class="image-box"
                      style="width:100px;height:100px;border:1px #001528;border-radius:5px"
                    >
                      <div class="js--image-preview" @click="chooseFile_Sign()">
                        <img :src="imageUrl_Sign" />
                      </div>
                      <input
                        type="file"
                        id="file"
                        ref="file_sign"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_Sign()"
                      />
                    </div>
                  </td>
                  <td>确认人签名</td>
                  <td>
                    <div
                      class="image-box"
                      style="width:100px;height:100px;border:1px #001528;border-radius:5px"
                    >
                      <div
                        class="js--image-preview"
                        @click="chooseFile_ConfirmSign()"
                      >
                        <img :src="imageUrl_ConfirmSign" />
                      </div>
                      <input
                        type="file"
                        id="file"
                        ref="file_sign_conformsign"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_ConfirmSign()"
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
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import axios from "axios";
export default {
  data() {
    return {
      id: -1,
      listLoading: false,
      data: null,
      imageUrl_Live: "",
      imageUrl_Sign: "",
      imageUrl_ConfirmSign: "",
      file_live_1: null,
      file_sign: null,
      file_confirmsign: null,
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
      console.log(conclusionData);
      if (this.file_live_1) {
        formData.append("file1", this.file_live_1);
      }
      if (this.file_sign) {
        formData.append("file2", this.file_sign);
      }
      formData.append("towId", this.data.townId);
      formData.append("id", this.id);
      formData.append("inspector", this.data.inspector);
      formData.append("companyId", this.data.companyId);
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
      this.$refs.file_live_1.click();
    },
    chooseFile_Sign() {
      this.$refs.file_sign.click();
    },
    chooseFile_CofirmSign() {
      this.$refs.file_confirmsign.click();
    },
    handleFileUpload_Live() {
      this.file_live_1 = this.$refs.file_live_1.files[0];
    },
    handleFileUpload_Sign() {
      this.file_sign = this.$refs.file_sign.files[0];
    },
    handleFileUpload_ConfirmSign() {
      this.file_confirmsign = this.$refs.file_confirmsign.files[0];
    }
  }
};
</script>

<style lang="scss">
</style>