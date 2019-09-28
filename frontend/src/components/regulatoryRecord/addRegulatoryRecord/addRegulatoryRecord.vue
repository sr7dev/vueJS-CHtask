<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">监管记录</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加监管记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form ref="form" :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-radio v-model="form.companyType" label="1">企业</el-radio>
              <el-radio v-model="form.companyType" label="2">农户</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="乡镇">
              <el-input v-model="form.townShip" style="width:60%" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业">
              <el-select v-model="form.enterprise" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button type="primary" icon="el-icon-plus" size="mini" class="min-plus"></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择日期">
              <el-date-picker v-model="form.date" align="right" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检查人">
              <el-input v-model="form.checker" style="width:60%"></el-input>
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
              <el-radio v-model="form.productionRecord" label="1">有</el-radio>
              <el-radio v-model="form.productionRecord" label="2">真实完整</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <div class="left-margin">农产品产地准出证明(销售记录)</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <el-radio v-model="form.proofOfProduct" label="1">有</el-radio>
              <el-radio v-model="form.proofOfProduct" label="2">真实完整</el-radio>
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
              <el-radio v-model="form.productInputRecord" label="1">有</el-radio>
              <el-radio v-model="form.productInputRecord" label="2">真实完整</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <div class="left-margin">检验记录</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <el-radio v-model="form.testRecord" label="1">有</el-radio>
              <el-radio v-model="form.testRecord" label="2">真实完整</el-radio>
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
              <el-checkbox v-model="form.isDisableInput">有</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <div class="left-margin">“三品一标使用”</div>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label>
              <el-checkbox v-model="form.isThreeProduct">合规</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="常用语" class="left-margin">
              <el-select v-model="form.commonLang" placeholder="请选择">
                <el-option
                  v-for="item in options_tmp"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
            <el-form-item>
              <el-input type="textarea" :rows="5" v-model="form.otherProblems"></el-input>
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
                      <el-checkbox v-model="form.isQualified"></el-checkbox>
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
                              <el-input v-model="form.orderToAmend" style="width:100%"></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td>建议处罚</td>
                            <td>
                              <el-input v-model="form.recommendPunishment" style="width:100%"></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td>其他处理</td>
                            <td>
                              <el-input v-model="form.otherProcessing" style="width:100%"></el-input>
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
          <el-button type="success" plain @click="onSubmit">保存</el-button>
          <el-button type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        companyType: "1",
        townShip: "梅里镇",
        enterprise: "1",
        date: "",
        checker: "",
        productionRecord: "1",
        productInputRecord: "1",
        proofOfProduct: "1",
        testRecord: "1",
        isDisableInput: true,
        isThreeProduct: true,
        commonLang: "1",
        otherProblems: "",
        isQualified: true,
        orderToAmend: "",
        recommendPunishment: "",
        otherProcessing: ""
      },
      options: [
        { value: "1", label: "天荷香稻米专业合作社" },
        { value: "2", label: "福鼎白茶" }
      ],
      options_tmp: [
        { value: "1", label: "天荷香稻" },
        { value: "2", label: "福鼎白茶" }
      ],
      imageUrl: ""
    };
  },
  methods: {
    onSubmit() {
      console.log(this.imageUrl);
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