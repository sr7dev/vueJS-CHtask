<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>企业信用档案</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="select_label">乡镇</div>
        <el-select v-model="currTown" placeholder="请选择" @change="getList()">
          <el-option
            v-for="item in township"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="select_label">类型</div>
        <el-radio v-model="bTypes" label="1" v-on:change="getList(true)"
          >企业</el-radio
        >
        <el-radio v-model="bTypes" label="2" v-on:change="getList(true)"
          >农户</el-radio
        >
        <div class="select_label">行政许可</div>
        <el-select
          v-model="plCount"
          placeholder="请选择"
          @change="onSelectFilterPub"
        >
          <el-option
            v-for="item in publicOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="select_label">行政处罚</div>
        <el-select
          v-model="ppCount"
          placeholder="请选择"
          @change="onSelectFilterPub"
        >
          <el-option
            v-for="item in publicOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="select_label" v-if="isShowAddButton">
          <!-- <el-button
            size="small"
            type="primary"
            v-on:click="getList()"
            disabled
            plain
            >导入</el-button
          > -->
        </div>
      </div>

      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          fit
          style="width: 100%;"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column
            :formatter="order"
            label="序号"
            width="70"
          ></el-table-column>
          <el-table-column
            label="企业名称"
            width="150"
            v-if="isShowEditButton"
            prop="companyName"
          >
            <!-- <template slot-scope="{row}">{{filterCompnay(row.creditCode)}}</template> -->
          </el-table-column>
          <el-table-column
            label="名称"
            width="150"
            prop="companyName"
            v-if="isShowDetail"
          >
            <!-- <template slot-scope="{row}">{{filterCompnay(row.creditCode)}}</template> -->
          </el-table-column>
          <el-table-column
            prop="creditCode"
            label="统一社会信用代码"
            v-if="isShowEditButton"
          ></el-table-column>
          <el-table-column
            prop="creditCode"
            label="信用代码"
            v-if="isShowDetail"
          ></el-table-column>
          <el-table-column
            prop="plCount"
            label="行政许可信息"
            class-name="text-center"
          >
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="success"
                plain
                v-if="row.plCount > 0"
                v-on:click="
                  $router.push({
                    path: `/corporateCreditFile/adminLicenseInfo`,
                    query: { creditCode: row.creditCode }
                  })
                "
                >行政许可信息</el-button
              >
              <el-button size="small" v-else disabled type="success" plain
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="ppCount"
            label="行政处罚信息"
            class-name="text-center"
          >
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="success"
                plain
                v-if="row.ppCount > 0"
                v-on:click="
                  $router.push({
                    path: `/corporateCreditFile/adminPenaltyInfo`,
                    query: { creditCode: row.creditCode }
                  })
                "
                >行政处罚信息</el-button
              >
              <el-button size="small" v-else disabled type="success" plain
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="评级信息">
            <template slot-scope="{ row }">
              <span
                class="rating-action"
                v-on:click="
                  $router.push({
                    path: `/corporateCreditFile/ratingInfo`,
                    query: { creditCode: row.creditCode }
                  })
                "
              >
                <el-rate
                  :value="getGradeString(row.grade)"
                  :max="getGradeString(row.grade)"
                  :texts="['C:失信', 'B:基本守信', 'A:守信']"
                  :colors="colors"
                  disabled
                  show-text
                ></el-rate>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="三品一标认证"
            width="200"
            class-name="text-center"
          >
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="primary"
                plain
                v-on:click="
                  $router.push({
                    path: `/corporateCreditFile/threeProduction`,
                    query: { creditCode: row.creditCode }
                  })
                "
                >三品一标</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-container>
      <div class="pageBox">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="page.pageIndex"
          :limit.sync="page.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Storage from "store";
import Pagination from "@/components/common/pagination";
import Request from "../../services/api/request.js";
import Auth from "@/services/authentication/auth.js";

export default {
  name: "creditRating",
  components: { Pagination },
  data() {
    return {
      township: [{ id: -1, name: "全部" }],
      publicOptions: [
        { id: 0, name: "全部" },
        { id: 1, name: "有" },
        { id: 2, name: "无" }
      ],
      currTown: 0,
      isShowAddButton: null,
      isShowEditButton: null,
      isShowDetail: null,
      plCount: 0,
      ppCount: 0,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      bTypes: 0,
      status: 0,
      total: 0,
      tableData: [],
      tableDataOrigin: [],
      companyProduction: [],
      gradData: [],
      loggedinUserType: null,
      colors: { 1: "#f00", 2: "#F7BA2A", 3: "#0f0" }
    };
  },
  mounted() {
    this.getTown();
    this.getList();
    this.getCompanyProduction();
  },
  created() {
    this.isShowAddButton = Storage.get("authList").find(
      x => x.privilegeCode == "searchcorporateCreditFile"
    )
      ? true
      : false;
    this.isShowEditButton = Storage.get("authList").find(
      x => x.privilegeCode == "editRegulatoryObject"
    )
      ? true
      : false;
    this.isShowDetail = Storage.get("authList").find(
      x => x.privilegeCode == "detailCreditRating"
    )
      ? true
      : false;
  },
  methods: {
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    onSelectFilterPub() {
      var tmpData = this.tableDataOrigin;
      if (this.plCount == 1) {
        tmpData = tmpData.filter(function(licesnse) {
          return licesnse.plCount > 0;
        });
      } else if (this.plCount == 2) {
        tmpData = tmpData.filter(function(licesnse) {
          return licesnse.plCount == null || licesnse.plCount == 0;
        });
      }
      if (this.ppCount == 1) {
        tmpData = tmpData.filter(function(punish) {
          return punish.ppCount > 0;
        });
      } else if (this.ppCount == 2) {
        tmpData = tmpData.filter(function(punish) {
          return punish.ppCount == null || punish.ppCount == 0;
        });
      }
      this.tableData = [];
      this.tableData = tmpData;
    },
    // onSelectPubPunish() {
    //   var tmpData = this.tableDataOrigin;
    //   if (this.ppCount == 1) {
    //     tmpData = tmpData.filter(function(punish) {
    //       return punish.ppCount > 0;
    //     });
    //   } else if (this.public_punish == 2) {
    //     tmpData = tmpData.filter(function(punish) {
    //       return punish.ppCount == 0;
    //     });
    //   }

    //   this.tableData = [];
    //   this.tableData = tmpData;
    // },
    getCompanyProduction() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyProduction = response;
        })
        .catch(error => {
          console.log(error);
        });
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
    /* eslint-disable */
    getList(update = false) {
      this.listLoading = true;
      Request()
        .get("/api/company_production/getCreditList", {
          companyType: this.bTypes,
          // approvalStatus: this.status - 1,
          // pageNo: this.page.pageIndex - 1,
          // pageSize: this.page.pageSize,
          townId: this.currTown
        })
        .then(response => {
          // var tmpData = response.data;
          // if (this.public_license == 1) {
          //   tmpData = tmpData.filter(function(licesnse) {
          //     return licesnse.public_license > 0;
          //   });
          // } else if (this.public_license == 2) {
          //   tmpData = tmpData.filter(function(licesnse) {
          //     return licesnse.public_license == 0;
          //   });
          // }
          // if (this.public_punish == 1) {
          //   tmpData = tmpData.filter(function(punish) {
          //     return punish.public_punish > 0;
          //   });
          // } else if (this.public_punish == 2) {
          //   tmpData = tmpData.filter(function(punish) {
          //     return punish.public_punish == 0;
          //   });
          // }
          // this.tableData = [];
          // tmpData.forEach(e => {
          //   e.nowGrade = this.getGradeString(e);
          // });
          this.tableDataOrigin = response;
          this.tableData = response;
          // let indexItem = 0;
          // tmpData.map(item => {
          //   let gradeArrayName = "credit_grade_data_" + indexItem;
          //   this.getNowGrade(response[gradeArrayName]).then(res => {
          //     item.nowGrade = this.getGradeString(res);
          //     this.tableData.push(item);
          //     this.total = this.tableData.length;
          //   });
          //   indexItem++;
          // });
          this.total = this.tableData.length;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
          this.tableData = [];
          this.srcData = [];
          this.total = 0;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        });
    },
    /* eslint-enable */
    filterCompnay(credit) {
      let company = this.companyProduction.find(x => x.creditCode === credit);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
    async getNowGrade(creditCode, gradeArray) {
      let nowGrade = "";
      if (!gradeArray || !gradeArray.length) {
        nowGrade = "";
      } else {
        nowGrade = gradeArray.pop().nowGrade;
      }
      return nowGrade;
    },
    // getGrade(dataTable) {
    //   let strGrade = "";
    //   Request()
    //     .get("/api/company_credit_grade/all", {
    //       approvalStatus: this.status - 1,
    //       creditCode: dataTable.creditCode,
    //       pageNo: this.page.pageIndex - 1,
    //       pageSize: this.page.pageSize,
    //       townId: this.currTown
    //     })
    //     .then(response => {
    //       this.gradData = response;
    //       let nSIze = this.gradData.length;
    //       strGrade = this.getGradeString(this.gradData[nSIze - 1].nowGrade);
    //       dataTable.nowGrade = strGrade;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       return "";
    //     });

    //   return dataTable.nowGrade;
    // },
    getGradeString(grade) {
      let strGrade = "";
      switch (grade) {
        case "A":
          strGrade = 3;
          break;
        case "B":
          strGrade = 2;
          break;
        case "C":
          strGrade = 1;
          break;
        default:
          strGrade = 3;
      }
      return strGrade;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./corporateCreditFile.scss";
</style>
