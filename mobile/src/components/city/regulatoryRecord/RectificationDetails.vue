<template>
  <div>
    <mt-header fixed title="整改记录详情">
      <router-link to="/regulatoryRecord" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <!--有数据-->
    <div class="header" v-if="!listLoading && !isNanData">
      <div class="mui-card top-margin" >
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <form class="mui-input-group">
              <div class="mui-input-row low-height" @click="openPicker">
                <label style="padding:4px 15px">日期</label>
                {{ formatDate(data.rectificationRecordTime) }}
              </div>
              <div class="mui-input-row">
                <label>乡镇</label>
                <select v-model="data.townId">
                  <option
                    v-for="item in township"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="mui-input-row">
                <label>受检单位</label>
                <select v-model="data.companyId">
                  <option
                    v-for="item in companyList"
                    :key="item.companyId"
                    :value="item.companyId"
                    >{{ item.companyName }}
                  </option>
                </select>
              </div>
              <div class="mui-input-row">
                <label>检查人</label>
                <input
                  type="text"
                  placeholder="请输入检查人"
                  v-model="data.inspector"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <mt-datetime-picker
        v-model="data.rectificationRecordTime"
        @confirm="handleConfirm"
        ref="picker"
        type="date"
        year-format="{value} 年"
        month-format="{value}月"
        date-format="{value} 日"
      >
      </mt-datetime-picker>
      <div class="mui-card">
        <div class="mui-card-header">整改记录</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <tr>
              <td style="padding-right: 2rem">结论</td>
              <td><span
                  class="mui-input-row mui-checkbox mui-left"
                  style="margin-top:-0.5rem;left:2.5rem"
                >
                <label>合规</label>
                <input type="checkbox" v-model="data.conclusion" @change="onChangeCheck"/>
              </span></td>
            </tr>

            <mt-field
              label="责令修改"
              placeholder="减少农药用量和频次"
              v-model="conclusionData.order"
              :disabled="data.conclusion"
            ></mt-field>
            <mt-field
              label="责令处罚"
              placeholder="减少农药用量和频次"
              v-model="conclusionData.suggestion"
              :disabled="data.conclusion"
            ></mt-field>
            <mt-field
              label="其他处理"
              v-model="conclusionData.others"
              :disabled="data.conclusion"
            ></mt-field>

            <table class="image-upload-table">
              <tbody>
                <tr>
                  <td>现场图片</td>
                  <td colspan="3">
                    <div class="img-container" @click="chooseFile_Live()">
                      <img :src="images" class="preview" v-if="images" />
                      <img
                        :src="downloadURL + data.scenePhotos"
                        class="preview"
                        v-if="!images && data.scenePhotos"
                      />
                    </div>
                    <a
                      @click="downloadFile(data.scenePhotos)"
                      style=" display: table"
                      v-if="!file_live_1 && data.scenePhotos"
                    >
                      {{ data.scenePhotos.replace("/uploads/", "") }}
                    </a>
                    <p v-if="file_live_1">{{ fileName }}</p>
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
                      <img :src="signs" class="preview" v-if="signs" />
                      <img
                        :src="downloadURL + data.supervisionSign"
                        class="preview"
                        v-if="!signs && data.supervisionSign"
                      />
                    </div>
                    <a
                      @click="downloadFile(data.supervisionSign)"
                      style=" display: table"
                      v-if="!file_live_2 && data.supervisionSign"
                    >
                      {{ data.supervisionSign.replace("/uploads/", "") }}
                    </a>
                    <p v-if="file_live_2">{{ signName }}</p>
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
                </tr>
                <tr>
                  <td>确认人签名</td>
                  <td>
                    <div class="img-container" @click="chooseFile_CofirmSign()">
                      <img
                        :src="confirmSigns"
                        class="preview"
                        v-if="confirmSigns"
                      />
                      <img
                        :src="downloadURL + data.confirmorSign"
                        class="preview"
                        v-if="!confirmSigns && data.confirmorSign"
                      />
                    </div>
                    <a
                      @click="downloadFile(data.confirmorSign)"
                      style=" display: table"
                      v-if="!file_live_3 && data.confirmorSign"
                    >
                      {{ data.confirmorSign.replace("/uploads/", "") }}
                    </a>
                    <p v-if="file_live_3">{{ confirmSignName }}</p>
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
          </div>
        </div>
      </div>
    </div>

    <!--没有数据-->
    <div class="header" v-if="!listLoading && isNanData">
      <ul>
        <li>
          <div class="mui-input-row" @click="openPicker">
            <label style="padding-left:0;margin-top:1rem">日期</label>
            {{ formatDate(ruleFormValue.rectificationRecordTime) }}
          </div>
        </li>
          <mt-datetime-picker
            v-model="ruleFormValue.rectificationRecordTime"
            @confirm="handleConfirm"
            ref="picker"
            type="date"
            year-format="{value} 年"
            month-format="{value}月"
            date-format="{value} 日"
          >
        </mt-datetime-picker>
        <li>
          乡镇
          <select
            style="width: 50% ;margin-left: 2.5rem"
            v-model="ruleFormValue.townId"
          >
            <option
              v-for="item in township"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></option>
          </select>
        </li>
        <li>
          受检单位
          <select
            style="width: 70% ;margin-left: 0.5rem"
            v-model="ruleFormValue.companyId"
          >
            <option
              v-for="item in companyList"
              :key="item.companyId"
              :label="item.companyName"
              :value="item.companyId"
            ></option>
          </select>
        </li>
        <li style="border: none">
          检查人
          <input
            style="margin-left: 1rem;padding-bottom:0.5rem;width: 70%"
            v-model="ruleFormValue.inspector"
          />
        </li>
      </ul>
      <div class="mui-card">
        <div class="mui-card-header">整改记录</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <tr>
              <td style="padding-right: 2rem">结论</td>
              <td>
                <span
                  class="mui-input-row mui-checkbox mui-left"
                  style="margin-top:-0.5rem;left:2.5rem"
                >
                <label>合规</label>
                <input type="checkbox" v-model="ruleFormValue.conclusion" @change="onChangeCheck"/>
              </span></td>
            </tr>
            <mt-field
              label="责令修改"
              v-model="ruleFormValue.order"
              :disabled="ruleFormValue.conclusion"
            ></mt-field>
            <mt-field
              label="责令处罚"
              v-model="ruleFormValue.suggestion"
              :disabled="ruleFormValue.conclusion"
            ></mt-field>
            <mt-field
              label="其他处理"
              v-model="ruleFormValue.others"
              :disabled="ruleFormValue.conclusion"
            ></mt-field>

            <table class="image-upload-table">
              <tbody>
                <tr>
                  <td>现场图片</td>
                  <td colspan="3">
                    <div class="img-container" @click="chooseFile_Live()">
                      <img :src="images" class="preview" />
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
                      <img :src="signs" class="preview" />
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
                </tr>
                <tr>
                  <td>确认人签名</td>
                  <td>
                    <div class="img-container" @click="chooseFile_CofirmSign()">
                      <img :src="confirmSigns" class="preview" />
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
          </div>
        </div>
      </div>
    </div>
    <mt-button size="large" type="primary" @click="onSubmit">保存</mt-button>
  </div>
</template>

<script>
import Request from "@/configs/request.js";
import { Urls } from "@/configs/constants";
import Auth from "@/configs/auth.js";
import axios from "axios";
import { DatetimePicker } from "mint-ui";
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  name: "RectificationDetails",
  data() {
    return {
      currentTags: {},
      images: "",
      fileName: "",
      signs: "",
      signName: "",
      confirmSigns: "",
      confirmSignName: "",
      superId: -1,
      listLoading: false,
      data: {},
      pageLoading: false,
      imageUrl_Live: "",
      imageUrl_Sign: "",
      imageUrl_ConfirmSign: "",
      file_live_1: null,
      file_live_2: null,
      file_live_3: null,
      township: [{ id: "", name: "请选择" }],
      companyList: [{ companyId: "", companyName: "请选择" }],
      conclusionData: {},
      isNanData: null,
      downloadURL: "",
      ruleFormValue: {
        rectificationRecordTime:new Date(),
        townId: "",
        companyId: "",
        createTime: "",
        inspector: "",
        conclusion: true,
        order: "",
        suggestion: "",
        others: ""
      }
    };
  },
  components: {
    DatetimePicker
  },
  created() {
    this.superId = this.$route.query.id;
    this.ruleFormValue.townId = this.$route.query.townId;
    this.ruleFormValue.companyId = this.$route.query.companyId;
    this.downloadURL = Urls.DOWNLOAD_URL();
    this.getTown();
    this.getCompanyProduct();
    this.getData();
  },
  methods: {
    //日期选择
    openPicker() {
      this.$refs.picker.open();
    },
    onChangeCheck() {
      if(this.ruleFormValue.conclusion) {
        this.ruleFormValue.order = "";
        this.ruleFormValue.suggestion = "";
        this.ruleFormValue.others = "";
      }
      if(this.data.conclusion) {
        this.conclusionData.order = "";
        this.conclusionData.suggestion = "";
        this.conclusionData.others = "";
      }
    },
    formatDate(date) {
      if(date){
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
      }
      return "";
    },
    //时间选择确认
    handleConfirm(value) {
      this.$refs.picker.close();
    },
    //获取乡镇列表
    getTown() {
      Request()
        .get("/api/town/all")
        .then(response => {
          let townshipStr = [];
          response.forEach(function(item, key) {
            townshipStr.push(item.name);
          });
          this.townshipStr = townshipStr;
          this.township = this.township.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取企业列表
    getCompanyProduct() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyList = this.companyList.concat(response);
          let companyListStr = [];
          this.companyList.forEach(function(item) {
            companyListStr.push(item.companyName);
          });
          this.companyListStr = companyListStr;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取整改记录详情
    getData() {
      Indicator.open("加载中...");
      Request()
        .get(
          "/api/rectification_record/all?supervisionRecordId=" + this.superId,
          {
            sortBy: "id"
          }
        )
        .then(response => {
          let tmpdata = response.data;
          this.data = tmpdata[0];
          this.isNanData = this.data ? false : true;
          if (!this.isNanData){
            this.data.conclusion = this.data.conclusion == 1 ? true : false; 
            this.conclusionData = JSON.parse(this.data.conclusionFalseInfo);
          }
          setTimeout(function() {
            Indicator.close();
          }, 500);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //保存提交
    onSubmit() {
      var formData = new FormData();
      this.file_live_1 && formData.append("scenePhotoFile", this.file_live_1); //required
      this.file_live_2 && formData.append("signFile", this.file_live_2); //required
      this.file_live_3 && formData.append("confirmor", this.file_live_3); //required
      formData.append("supervisionRecordId", this.superId); //required
      var newConclusionData;
      //没有数据
      if (this.isNanData) {
        newConclusionData =
          this.ruleFormValue.conclusion
            ? {
                order: " ",
                suggestion: " ",
                others: " "
              }
            : {
                order: this.ruleFormValue.order
                  ? this.ruleFormValue.order
                  : " ",
                suggestion: this.ruleFormValue.suggestion
                  ? this.ruleFormValue.suggestion
                  : " ",
                others: this.ruleFormValue.others
                  ? this.ruleFormValue.others
                  : " "
              };
        newConclusionData = JSON.stringify(newConclusionData);
        formData.append("rectificationRecordTime", this.ruleFormValue.rectificationRecordTime);
        formData.append("id", 0); //required
        formData.append("townId", this.ruleFormValue.townId);
        formData.append("conclusion", this.ruleFormValue.conclusion ? 1:0);
        formData.append("inspector", this.ruleFormValue.inspector);
        formData.append("companyId", this.ruleFormValue.companyId);
        //formData.append("updateTime", this.ruleFormValue.createTime);
        formData.append("updateUserId", Auth().user().id);
        formData.append("createUserId", Auth().user().id);
        //formData.append("createTime", this.ruleFormValue.createTime);
        // formData.append(
        //   "rectificationRecordTime",
        //   this.ruleFormValue.createTime
        // );
        formData.append("conclusionFalseInfo", newConclusionData);

        this.listLoading = true;
        Request()
          .post("/api/rectification_record/create", formData)
          .then(response => {
            setTimeout(() => {
              this.listLoading = false;
            }, 1000);
            this.$router.push({ path: "/regulatoryRecord" });
          })
          .catch(error => {
            console.log(error);
          });
      }
      //有数据
      else {
        newConclusionData = {
          order: this.conclusionData.order ? this.conclusionData.order : " ",
          suggestion: this.conclusionData.suggestion
            ? this.conclusionData.suggestion
            : " ",
          others: this.conclusionData.others ? this.conclusionData.others : " "
        };
        newConclusionData = JSON.stringify(newConclusionData);
        formData.append("townId", this.data.townId);
        formData.append("id", this.data.id); //required
        formData.append("inspector", this.data.inspector);
        formData.append("companyId", this.data.companyId);
        formData.append("conclusion", this.data.conclusion ? 1 : 0);
        formData.append("rectificationRecordTime", this.data.rectificationRecordTime);
        // this.data.rectificationRecordTime = new Date(
        //   this.data.rectificationRecordTime
        // ).toDateString("YYYY-MM-DD");
        // formData.append("createTime",  this.data.rectificationRecordTime);
        // formData.append(
        //   "rectificationRecordTime",
        //    this.data.rectificationRecordTime
        // );
        formData.append("updateUserId", Auth().user().id);
        formData.append("conclusionFalseInfo", newConclusionData);
        this.pageLoading = true;
        Request()
          .put("/api/rectification_record/update/" + this.data.id, formData)
          .then(response => {
            Toast({
              message: "修改成功",
              duration: 1000
            });
            setTimeout(() => {
              this.pageLoading = false;
              this.$router.push({ path: "/regulatoryRecord" });
            }, 1000);
          })
          .catch(error => {});
      }
    },
    //
    chooseFile_Live() {
      document.getElementById("file").click();
    },
    chooseFile_Sign() {
      document.getElementById("file1").click();
    },
    chooseFile_CofirmSign() {
      document.getElementById("file2").click();
    },
    handleFileUpload_Live() {
      this.file_live_1 = this.$refs.file_live_1.files[0];
      this.images = "";
      let reader = new FileReader();
      let that = this;
      reader.onload = function(e) {
        that.images = e.target.result;
      };
      if (this.file_live_1) {
        reader.readAsDataURL(this.file_live_1);
        this.fileName = this.file_live_1.name;
      } else {
        this.fileName = "";
      }
    },
    handleFileUpload_Sign() {
      this.file_live_2 = this.$refs.file_live_2.files[0];
      this.signs = "";
      let reader = new FileReader();
      let that = this;
      reader.onload = function(e) {
        that.signs = e.target.result;
      };
      if (this.file_live_2) {
        reader.readAsDataURL(this.file_live_2);
        this.signName = this.file_live_2.name;
      } else {
        this.signName = "";
      }
    },
    handleFileUpload_ConfirmSign() {
      this.file_live_3 = this.$refs.file_live_3.files[0];
      this.confirmSigns = "";
      let reader = new FileReader();
      let that = this;
      reader.onload = function(e) {
        that.confirmSigns = e.target.result;
      };
      if (this.file_live_3) {
        reader.readAsDataURL(this.file_live_3);
        this.confirmSignName = this.file_live_3.name;
      } else {
        this.confirmSignName = "";
      }
    },
    //下载
    downloadFile(imgURL) {
      axios({
        url: Urls.DOWNLOAD_URL() + imgURL,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", imgURL.replace("/uploads/", "")); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    }
  }
};
</script>

<style scoped>
ul {
  margin-left: -2rem;
}

li {
  position: relative;
  line-height: 4rem;
  padding-left: 1rem;
  border-bottom: 0.03rem black solid;
}

span {
  position: absolute;
  left: 8rem;
  font-weight: 500;
}

.mui-checkbox input[type=checkbox] {
  top:6px;
}

.mui-checkbox input[type=checkbox]:before {
  font-size: 22px;
}

.mui-checkbox.mui-left label {
  padding-left: 45px;
}

.top-margin {
  margin-top:3.5rem;
}
.low-height {
  height: 30px;
}
.scene {
  height: 8rem;
  border: 0.01rem black solid;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
}
.scene span {
  left: 3rem;
  line-height: 8rem;
}
.supervisor {
  height: 10rem;
  border: 0.01rem black solid;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
}
.supervisor span {
  left: 3rem;
  line-height: 10rem;
}
.confirming {
  height: 10rem;
  border: 0.01rem black solid;
  margin-right: 0.5rem;
}
.confirming span {
  left: 3rem;
  line-height: 10rem;
}
.img-container {
  max-width: 110px;
  width: 5rem;
  height: 80px;
  margin: 5px 1rem;
  border-radius: 5px;
  text-align: center;
  box-shadow: 1px 2px 5px 1px rgba(10, 8, 10, 0.61);
}
.img-container p {
  margin-top: 20px;
}
img {
  max-width: 100%;
  height: 100%;
}
/*乡镇选择*/
.mint-popup {
  width: 100%;
}
.mui-radio.mui-left label{
  padding-right: 15px;
  padding-left: 40px;
}
</style>
