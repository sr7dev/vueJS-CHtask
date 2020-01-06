<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>专项：绿色优质农产品生产基地</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form v-loading="listLoading">
        <div class="row year-select-panel">
          <el-form-item label="年度">
            <el-select
              v-model="year"
              v-on:change="getYear()"
              v-loading="listLoading"
              :disabled="!(options.length > 0)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="cate-content-panel">
          <div class="cate-item-panel inline-block-IE">
            <el-form-item label="巡查">({{ tableData.length }})</el-form-item>
            <el-container>
              <el-table
                style="width: 100%"
                :data="tableData"
                :row-class-name="rowIndex"
                v-loading="listLoading"
                highlight-current-row
              >
                <el-table-column prop="createTime" label="日期">
                  <template slot-scope="{ row }">{{
                    row.createTime | formatDate
                  }}</template>
                </el-table-column>
                <el-table-column prop="township" label="乡镇">
                  <template slot-scope="{ row }">
                    {{ filterTownship(row.townId) }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="inspector"
                  label="检查人"
                ></el-table-column>
                <el-table-column prop="unitinspec" label="检查单位">
                  <template slot-scope="{ row }">
                    {{ getCompanyName(row.companyId) }}
                  </template>
                </el-table-column>
              </el-table>
            </el-container>
          </div>
          <div class="cate-item-panel inline-block-IE">
            <el-form-item label="检测"
              >({{ detectTableData.length }})</el-form-item
            >
            <el-container>
              <el-table
                style="width: 100%"
                :data="detectTableData"
                :row-class-name="rowIndex"
                v-loading="listLoading"
                highlight-current-row
              >
                <el-table-column label="日期">
                  <template slot-scope="{ row }">{{
                    row.detectTime | formatDate
                  }}</template>
                </el-table-column>
                <el-table-column label="项目">
                  <template slot-scope="{ row }">{{ row.item }}</template>
                </el-table-column>
                <el-table-column label="样品">
                  <template slot-scope="{ row }">{{ row.sample }}</template>
                </el-table-column>
                <el-table-column label="结果">
                  <template slot-scope="{ row }">{{
                    row.resultDxDesc
                  }}</template>
                </el-table-column>
              </el-table>
            </el-container>
          </div>
          <div class="cate-item-panel inline-block-IE">
            <div style="display: flex; justify-content: space-between;">
              <el-form-item
                label="培训记录"
                class="margin-bottom-reverse-40"
              ></el-form-item>
              <div class="inline-block-IE align-right-IE">
                <el-button
                  size="small"
                  type="danger"
                  class="margin-bottom-22"
                  plain
                  v-if="!isShowAddButton"
                  @click="updateSelectedRows()"
                  :disabled="!(trainTableData.length > 0)"
                  >删除</el-button
                >
                <el-checkbox
                  v-model="isShowCheckbox"
                  true-label="1"
                  false-label="0"
                  @change="showCheckbox"
                  v-if="trainTableData.length > 0 && !isShowAddButton"
                  style="margin-top: 10px; margin-left: 20px;"
                />
              </div>
              <el-button
                size="small"
                class="inline-block-IE float-right-IE"
                type="primary"
                style="height:40px"
                plain
                v-if="isShowAddButton"
                @click="
                  $router.push({
                    path: `/trainingFunds`
                  })
                "
                >添加附件</el-button
              >
            </div>
            <el-container>
              <el-table
                style="width: 100%"
                :data="trainTableData"
                :row-class-name="rowIndex"
                highlight-current-row
              >
                <el-table-column label width="35" v-if="isShowCheckbox != 0">
                  <template slot-scope="{ row }">
                    <el-checkbox
                      style="margin-left:auto"
                      @change="changeCheckStatus(row.id)"
                      true-label="1"
                      false-label="0"
                      v-model="checked[row.id]"
                    ></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="日期">
                  <template slot-scope="{ row }">{{
                    row.createTime | formatDate
                  }}</template>
                </el-table-column>
                <el-table-column label="乡镇">
                  <template slot-scope="{ row }">
                    {{ getTownName(row.companyId) }}
                  </template>
                </el-table-column>
                <el-table-column label="文件">
                  <template slot-scope="{ row }">
                    <el-button
                      size="small"
                      type="success"
                      plain
                      :disabled="!row.trainingFundsProfiles"
                      @click="downloadFile(row.trainingFundsProfiles)"
                      >下载附件</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-container>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import Request from "../../services/api/request.js";
import { Urls } from "../../services/constants";
import axios from "axios";
import Storage from "store";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "specialCategory",
  data() {
    return {
      loggedinUserType: null,
      total: 0,
      trainTotal: 0,
      detectTotal: 0,
      tableData: [],
      trainTableData: [],
      detectTableData: [],
      listLoading: true,
      companyList: [],
      companyId: -1,
      companyName: "",
      township: [{ id: -1, name: "全部" }],
      townName: "",
      year: "全部",
      supervisionRecordTimeFrom: "",
      supervisionRecordTimeTo: "",
      detectTimeFrom: "",
      detectTimeTo: "",
      createTimeFrom: "",
      createTimeTo: "",
      specialFlag: -1,
      options: [
        { value: "全部" },
        { value: "2018" },
        { value: "2019" },
        { value: "2020" },
        { value: "2021" },
        { value: "2022" },
        { value: "2023" }
      ],
      isShowCheckbox: 0,
      selectedRows: [],
      checked: [],
      isShowAddButton: null
    };
  },
  created() {
    this.companyId = -1;
    this.specialFlag = 1;
    this.supervisionRecordTimeFrom = "";
    this.supervisionRecordTimeTo = "";
    this.detectTimeFrom = "";
    this.detectTimeTo = "";
    this.getList();
    this.getDetectList();
    this.getTrainList();
    this.getTown();
    this.isShowAddButton = Storage.get("authList").find(
      x => x.privilegeCode == "addTrainingFunds"
    )
      ? true
      : false;
  },
  methods: {
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/supervision_record/all", {
          companyId: this.companyId,
          specialFlag: this.specialFlag,
          supervisionRecordTimeFrom: this.supervisionRecordTimeFrom,
          supervisionRecordTimeTo: this.supervisionRecordTimeTo,
          sortBy: "id"
        })
        .then(response => {
          this.tableData = response.data;
          this.total = response.total;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDetectList() {
      this.listLoading = true;
      Request()
        .get("/api/disability_check/all", {
          detectUnit:-1,
          item:-1,
          sample:-1,
          specialFlag: this.specialFlag,
          detectTimeFrom: this.detectTimeFrom,
          detectTimeTo: this.detectTimeTo,
          sortBy: "id"
        })
        .then(response => {
          this.detectTableData = response.data;
          this.detectTotal = response.total;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTrainList() {
      Request()
        .get("/api/training_funds/all", {
          specialFlag: this.specialFlag,
          createTimeFrom: this.createTimeFrom,
          createTimeTo: this.createTimeTo,
          sortBy: "id"
        })
        .then(response => {
          this.trainTableData = response.data;
          this.trainTotal = response.total;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getYear() {
      if(this.year!=="全部"){
        this.supervisionRecordTimeFrom =
          this.year + "-" + "01" + "-" + "01" + " " + "00:00:00";
        this.supervisionRecordTimeTo =
          this.year + "-" + "12" + "-" + "31" + " " + "00:00:00";
        this.detectTimeFrom =
          this.year + "-" + "01" + "-" + "01" + " " + "00:00:00";
        this.detectTimeTo =
          this.year + "-" + "12" + "-" + "31" + " " + "00:00:00";
        this.createTimeFrom =
          this.year + "-" + "01" + "-" + "01" + " " + "00:00:00";
        this.createTimeTo =
          this.year + "-" + "12" + "-" + "31" + " " + "00:00:00";
      }
      this.tableData = [];
      this.detectTableData = [];
      this.total = [];
      this.detectTotal = [];
      this.getList();
      this.getDetectList();
    },
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
    getCompanyName(id) {
      Request()
        .get("/api/company_production/name", {
          companyId: id
        })
        .then(response => {
          this.companyName = response[0].companyName;
        })
        .catch(error => {
          console.log(error);
        });
      return this.companyName;
    },
    getTownName(id) {
      Request()
        .get("/api/company_production/name", {
          companyId: id
        })
        .then(response => {
          this.townName = this.filterTownship(response[0].townId);
        })
        .catch(error => {
          console.log(error);
        });
      return this.townName;
    },
    filterTownship(townId) {
      let town = this.township.find(x => x.id === townId);
      if (town) {
        return town.name;
      } else {
        return "";
      }
    },
    filterCompanyName(companyId) {
      let company = this.township.find(x => x.id === companyId);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    downloadFile(downloadFileName) {
      axios({
        url: Urls.DOWNLOAD_URL() + downloadFileName,
        method: "GET",
        responseType: "blob"
      }).then(response => {
        if(!this.isIE()){
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            downloadFileName.replace("/uploads/", "")
          );
          document.body.appendChild(link);
          link.click();
          link.remove();
        }else{
          const newBlob = new Blob([response.data], {type: 'application/octet-stream'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob, downloadFileName.replace("/uploads/", ""));
            return;
          }
        }
      });
    },
    isIE() {
      let ua = navigator.userAgent;
      /* MSIE used to detect old browsers and Trident used to newer ones*/
      return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    },
    changeCheckStatus(id) {
      let index = this.selectedRows.indexOf(id);
      if (index > -1) this.selectedRows.splice(index, 1);
      if (this.checked[id]) {
        this.selectedRows.push(id);
      }
    },
    updateSelectedRows() {
      this.$confirm("确认删除该记录吗?", "提示", { type: "warning" }).then(
        () => {
          this.listLoading = true;
          for (let index in this.selectedRows) {
            let specialFlag = 0;
            Request()
              .put(
                "/api/training_funds/update_special_flag/" +
                  this.selectedRows[index] +
                  "/" +
                  specialFlag
              )
              .then(response => {
                this.selectedRows = [];
                this.checked = [];
                this.isShowCheckbox = 0;
                this.getTrainList();
                setTimeout(() => {
                  this.listLoading = false;
                }, 0.5 * 1000);
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      );
    },
    showCheckbox() {
      if (this.isShowCheckbox == 1) {
        this.selectedRows = [];
        this.checked = [];
      }
    }
  }
};
</script>

<style lang="scss">
.year-select-panel {
  width: 100%;
  margin-top: 2rem;
}
.cate-content-panel {
  display: flex;
  justify-content: center;
}
.cate-item-panel {
  width: 100%;
  margin: 0.2rem;
}
</style>
