<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管记录</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加监管记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <span>请选择图片 !!!</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" type="primary" plain>Cancel</el-button>
        </span>
      </el-dialog>
      <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="companyType">
              <el-radio-group v-model="ruleFormValue.companyType">
                <el-radio label="1">企业</el-radio>
                <el-radio label="2">农户</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="乡镇" prop="townShip">
              <el-select v-model="ruleFormValue.townShip" placeholder="请选择">
                <el-option
                  v-for="item in township"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业" prop="companyID">
              <el-select v-model="ruleFormValue.companyID" placeholder="请选择">
                <el-option
                  v-for="item in companyList"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                ></el-option>
              </el-select>
              <el-button type="primary" plain icon="el-icon-plus" size="mini" class="min-plus"></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择日期" prop="date">
              <el-date-picker
                v-model="ruleFormValue.date"
                align="right"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检查人" prop="checker">
              <el-input v-model="ruleFormValue.checker" style="width:60%"></el-input>
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
              <el-radio-group v-model="ruleFormValue.productionRecord">
                <el-radio label="1">有</el-radio>
                <el-radio label="2">真实完整</el-radio>
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
              <el-radio-group v-model="ruleFormValue.proofOfProduct">
                <el-radio label="1">有</el-radio>
                <el-radio label="2">真实完整</el-radio>
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
              <el-radio-group v-model="ruleFormValue.productInputRecord">
                <el-radio label="1">有</el-radio>
                <el-radio label="2">真实完整</el-radio>
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
              <el-radio-group v-model="ruleFormValue.testRecord">
                <el-radio label="1">有</el-radio>
                <el-radio label="2">真实完整</el-radio>
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
              <el-checkbox v-model="ruleFormValue.isDisableInput" true-label="1" false-label="0">有</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <div class="left-margin">“三品一标使用”</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <el-checkbox v-model="ruleFormValue.isThreeProduct" true-label="1" false-label="0">合规</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="常用语" class="left-margin" prop="commonLang">
              <el-select v-model="wordValue" multiple placeholder="请插入">
                <el-option
                  v-for="item in wordsList"
                  :key="item.id"
                  :label="item.word"
                  :value="item.word"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item>
              <div class="left-margin">现场发现的其他问题</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="otherProblems">
              <el-input type="textarea" :rows="5" v-model="ruleFormValue.otherProblems"></el-input>
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
                        v-model="ruleFormValue.conclusion"
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
                                v-model="ruleFormValue.orderToAmend"
                                style="width:100%"
                                :disabled="ruleFormValue.conclusion == true"
                              ></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td>建议处罚</td>
                            <td>
                              <el-input
                                v-model="ruleFormValue.recommendPunishment"
                                style="width:100%"
                                :disabled="ruleFormValue.conclusion == true"
                              ></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td>其他处理</td>
                            <td>
                              <el-input
                                v-model="ruleFormValue.otherProcessing"
                                style="width:100%"
                                :disabled="ruleFormValue.conclusion == true"
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
                  <td>
                    <div class="img-container" @click="chooseFile_Live()">
                      <img v-for="src in images" :src="src" :key="src" class="preview" />
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
                      <img v-for="src in signs" :src="src" :key="src" class="preview" />
                    </div>
                    <p>{{ signName }}</p>
                    <div class="image-box">
                      <input
                        type="file"
                        id="file1"
                        ref="file_sign"
                        class="image-upload"
                        accept="image/*"
                        v-on:change="handleFileUpload_Sign()"
                        name="signs"
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
          <el-button type="success" plain @click="onSubmit('ruleForm')">保存</el-button>
          <el-button type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
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
      images: [],
      fileName: "",
      signs: [],
      signName: "",
      ruleFormValue: {
        companyType: "1",
        townShip: "",
        companyID: "",
        date: "",
        checker: "",
        productionRecord: "1",
        productInputRecord: "1",
        proofOfProduct: "1",
        testRecord: "1",
        isDisableInput: "1",
        isThreeProduct: "1",
        commonLang: "",
        otherProblems: "",
        conclusion: "1",
        orderToAmend: "",
        recommendPunishment: "",
        otherProcessing: ""
      },
      township: [],
      companyList: [],
      imageUrl_Live: "",
      imageUrl_Sign: "",
      file_live_1: null,
      file_sign: null,
      wordsList: [],
      wordValue: 0,
      dialogVisible: false,
      rules: {
        townShip: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        companyID: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        checker: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        otherProblems: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.getTown();
    this.getCompanyProduct();
    this.getWords();
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
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = new FormData();
          formData = this.makeFormData();
          Request()
            .post("/api/supervision_record/create", formData)
            .then(response => {
              this.$router.push({ path: "/regulatoryRecord" });
            })
            .catch(error => {});
        }
      });
    },
    makeFormData() {
      var mainFormData = new FormData();
      var conclusionData =
        this.ruleFormValue.conclusion == 1
          ? {
              order: " ",
              suggestion: " ",
              others: " "
            }
          : {
              order: this.ruleFormValue.orderToAmend
                ? this.ruleFormValue.orderToAmend
                : " ",
              suggestion: this.ruleFormValue.recommendPunishment
                ? this.ruleFormValue.recommendPunishment
                : " ",
              others: this.ruleFormValue.otherProcessing
                ? this.ruleFormValue.otherProcessing
                : " "
            };
      conclusionData = JSON.stringify(conclusionData);
      var supervisionInfo = {
        production: this.ruleFormValue.productionRecord,
        input: this.ruleFormValue.isDisableInput,
        abuse: this.ruleFormValue.proofOfProduct,
        origin: this.ruleFormValue.testRecord,
        inspection: this.ruleFormValue.productInputRecord,
        standard: this.ruleFormValue.isThreeProduct
      };
      supervisionInfo = JSON.stringify(supervisionInfo);

      mainFormData.append("companyId", this.ruleFormValue.companyID);
      mainFormData.append("conclusion", this.ruleFormValue.conclusion);
      mainFormData.append("conclusionFalseInfo", conclusionData);
      mainFormData.append("createTime", this.ruleFormValue.date);
      mainFormData.append("inspector", this.ruleFormValue.checker);
      mainFormData.append("otherProblems", this.ruleFormValue.otherProblems);
      mainFormData.append(
        "productionSubjectType",
        this.ruleFormValue.companyType
      );
      mainFormData.append("supervisionInfo", supervisionInfo);
      mainFormData.append("townId", this.ruleFormValue.townShip);
      mainFormData.append("createUserId", "");
      mainFormData.append("id", 0);
      mainFormData.append("scenePhotos", "");
      mainFormData.append("sign", "");
      mainFormData.append("supervisionRecordTime", this.ruleFormValue.date);
      mainFormData.append("updateTime", this.ruleFormValue.date);
      mainFormData.append("updateUserId", "");
      mainFormData.append(
        "usefulExpressions",
        this.selectWords(this.wordValue)
      );
      mainFormData.append("scenePhotoFile", this.file_live_1);
      mainFormData.append("signFile", this.file_sign);
      return mainFormData;
    },
    chooseFile_Live() {
      document.getElementById("file").click();
    },
    chooseFile_Sign() {
      document.getElementById("file1").click();
    },
    handleFileUpload_Live(e) {
      this.file_live_1 = this.$refs.file_live_1.files[0];
      this.images = [];
      let reader = new FileReader();
      let that = this;
      reader.onload = function(e) {
        that.images.push(e.target.result);
      };
      if (this.file_live_1) {
        reader.readAsDataURL(this.file_live_1);
        this.fileName = this.file_live_1.name;
      } else {
        this.fileName = "";
      }
    },
    handleFileUpload_Sign() {
      this.file_sign = this.$refs.file_sign.files[0];
      this.signs = [];
      let reader = new FileReader();
      let that = this;
      reader.onload = function(e) {
        that.signs.push(e.target.result);
      };
      if (this.file_sign) {
        reader.readAsDataURL(this.file_sign);
        this.signName = this.file_sign.name;
      } else {
        this.signName = "";
      }
    },
    getWords() {
      Request()
        .get("/api/common_word/all")
        .then(response => {
          this.wordsList = this.wordsList.concat(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectWords(string) {
      let strTemp = JSON.stringify(string);
      strTemp = strTemp.substr(2, strTemp.length - 4);
      strTemp = strTemp.replace('","', ",");
      return strTemp;
    }
  }
};
</script>

<style lang="scss">
@import "./addRegulatoryRecord.scss";
</style>