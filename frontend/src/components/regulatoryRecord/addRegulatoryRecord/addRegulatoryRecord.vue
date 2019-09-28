<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">监管记录</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加监管记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
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
              <el-button type="primary" icon="el-icon-plus" size="mini" class="min-plus"></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择日期">
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
              <el-checkbox v-model="ruleFormValue.isDisableInput">有</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <div class="left-margin">“三品一标使用”</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <el-checkbox v-model="ruleFormValue.isThreeProduct">合规</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="常用语" class="left-margin" prop="commonLang">
              <!-- <el-select v-model="ruleFormValue.commonLang" placeholder="请选择">
                <el-option
                  v-for="item in options_tmp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>-->
              <el-input v-model="ruleFormValue.commonLang" style="width:30%"></el-input>
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
                      <el-checkbox v-model="ruleFormValue.conclusion"></el-checkbox>
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
                              <el-form-item prop="orderToAmend">
                                <el-input
                                  v-model="ruleFormValue.orderToAmend"
                                  style="width:100%"
                                  :disabled="ruleFormValue.conclusion==true"
                                ></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>建议处罚</td>
                            <td>
                              <el-form-item prop="recommendPunishment">
                                <el-input
                                  v-model="ruleFormValue.recommendPunishment"
                                  style="width:100%"
                                  :disabled="ruleFormValue.conclusion==true"
                                ></el-input>
                              </el-form-item>
                            </td>
                          </tr>
                          <tr>
                            <td>其他处理</td>
                            <td>
                              <el-form-item prop="otherProcessing">
                                <el-input
                                  v-model="ruleFormValue.otherProcessing"
                                  style="width:100%"
                                  :disabled="ruleFormValue.conclusion==true"
                                ></el-input>
                              </el-form-item>
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
                    <el-upload
                      class="avatar-uploader"
                      action="#"
                      list-type="picture-card"
                      :auto-upload="false"
                      :on-preview="handlePictureCardPreview"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </td>
                </tr>
                <tr>
                  <td>签名</td>
                  <td>
                    <el-upload
                      class="avatar-uploader"
                      action="#"
                      list-type="picture-card"
                      :auto-upload="false"
                      :on-preview="handlePictureCardPreview"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
        isDisableInput: true,
        isThreeProduct: true,
        commonLang: "",
        otherProblems: "",
        conclusion: true,
        orderToAmend: "",
        recommendPunishment: "",
        otherProcessing: ""
      },
      township: [],
      companyList: [],
      // options_tmp: [
      //   { value: "1", label: "天荷香稻" },
      //   { value: "2", label: "福鼎白茶" }
      // ],
      imageUrl: "",
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
        commonLang: [
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
        ],
        orderToAmend: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        recommendPunishment: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        otherProcessing: [
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
          console.log(this.imageUrl);
        }
      });
    },
    handlePictureCardPreview(file) {
      this.imageUrl = file.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("Avatar picture must be JPG format!");
      }
      if (!isLt2M) {
        this.$message.error("Avatar picture size can not exceed 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./addRegulatoryRecord.scss";
</style>