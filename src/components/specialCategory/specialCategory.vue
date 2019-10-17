<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>专项：绿色优质农产品生产基地</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form>
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
          <div class="cate-item-panel">
            <el-form-item label="巡查">({{tableData.length}})</el-form-item>
            <el-container>
              <el-table
                style="width: 100%"
                :data="tableData"
                :row-class-name="rowIndex"
                v-loading="listLoading"
                highlight-current-row
              >
                <el-table-column prop="createTime" label="日期">
                  <template slot-scope="{ row }">{{ row.createTime | formatDate }}</template>
                </el-table-column>
                <el-table-column prop="township" label="乡镇">
                  <template slot-scope="{ row }">
                    {{
                    filterTownship(row.townId)
                    }}
                  </template>
                </el-table-column>
                <el-table-column prop="inspector" label="检查人"></el-table-column>
                <el-table-column prop="unitinspec" label="检查单位">
                  <template slot-scope="{ row }">
                    {{
                    getCompanyName(row.companyId)
                    }}
                  </template>
                </el-table-column>
              </el-table>
            </el-container>
          </div>
          <div class="cate-item-panel">
            <el-form-item label="检测">({{detectTableData.length}})</el-form-item>
            <el-container>
              <el-table
                style="width: 100%"
                :data="detectTableData"
                :row-class-name="rowIndex"
                v-loading="listLoading"
                highlight-current-row
              >
                <el-table-column label="日期">
                  <template slot-scope="{ row }">{{ row.detectTime | formatDate }}</template>
                </el-table-column>
                <el-table-column label="项目">
                  <template slot-scope="{ row }">{{ row.item }}</template>
                </el-table-column>
                <el-table-column label="样品">
                  <template slot-scope="{ row }">{{ row.sample }}</template>
                </el-table-column>
                <el-table-column label="结果">
                  <template slot-scope="{ row }">{{ row.resultDxDesc }}</template>
                </el-table-column>
              </el-table>
            </el-container>
          </div>
          <div class="cate-item-panel">
            <div style="display: flex; justify-content: space-between;">
              <el-form-item label="培训记录"></el-form-item>
              <el-button
                type="danger"
                plain
                v-if="loggedinUserType === 1 || loggedinUserType === 0"
              >删除</el-button>
              <el-button
                type="primary"
                plain
                v-if="loggedinUserType === 2 || loggedinUserType === 0"
              >添加附件</el-button>
            </div>
            <el-container>
              <el-table
                style="width: 100%"
                :data="trainTableData"
                :row-class-name="rowIndex"
                v-loading="listLoading"
                highlight-current-row
              >
                <el-table-column label="日期">
                  <template slot-scope="{ row }">{{ row.createTime | formatDate }}</template>
                </el-table-column>
                <el-table-column label="乡镇">
                  <template slot-scope="{ row }">
                    {{ 
                      getTownName(row.companyId)
                    }}
                  </template>
                </el-table-column>
                <el-table-column label="文件">                  
                  <template slot-scope="{ row }">
                    <el-button type="success" plainv @click="downloadFile(row.trainingFundsProfiles)">下载附件</el-button>
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
      companyId: 0,
      companyName: "",
      township: [],
      townName: "",
      year: "",
      supervisionRecordTimeFrom: "",
      supervisionRecordTimeTo: "",
      detectTimeFrom: "",
      detectTimeTo: "",
      createTimeFrom: "",
      createTimeTo: "",
      specialFlag: -1,
      options:[
        { value: "2018" },
        { value: "2019" },
        { value: "2020" },
        { value: "2021" },
        { value: "2022" },
        { value: "2023" }
      ]
    };
  },
  created() {
    this.companyId = 0;
    this.specialFlag = 1;
    this.supervisionRecordTimeFrom = "";
    this.supervisionRecordTimeTo = "";
    this.detectTimeFrom = "";
    this.detectTimeTo = "";
    this.getList();
    this.getDetectList();
    this.getTrainList();
    this.getTown();
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/supervision_record/all", {
          companyId: this.companyId,
          specialFlag: this.specialFlag,
          supervisionRecordTimeFrom: this.supervisionRecordTimeFrom,
          supervisionRecordTimeTo: this.supervisionRecordTimeTo
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
          specialFlag: this.specialFlag,
          detectTimeFrom: this.detectTimeFrom,
          detectTimeTo: this.detectTimeTo
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
      this.listLoading = true;
      Request()
        .get("/api/training_funds/all", {
          specialFlag: this.specialFlag,
          createTimeFrom: this.createTimeFrom,
          createTimeTo: this.createTimeTo
        })
        .then(response => {
          this.trainTableData = response.data;
          this.trainTotal = response.total;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getYear() {
      this.supervisionRecordTimeFrom = this.year+"-"+"01"+"-"+"01"+" "+"00:00:00";
      this.supervisionRecordTimeTo = this.year+"-"+"12"+"-"+"31"+" "+"00:00:00";
      this.detectTimeFrom = this.year+"-"+"01"+"-"+"01"+" "+"00:00:00";
      this.detectTimeTo = this.year+"-"+"12"+"-"+"31"+" "+"00:00:00";
      this.createTimeFrom = this.year+"-"+"01"+"-"+"01"+" "+"00:00:00";
      this.createTimeTo = this.year+"-"+"12"+"-"+"31"+" "+"00:00:00";
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
      });
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