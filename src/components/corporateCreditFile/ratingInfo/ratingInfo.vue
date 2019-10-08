<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"
          >行政处罚信息</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="select_label">{{ companyName }}</div>
        <el-button type="primary" v-on:click="$router.go(-1)" plain
          >返回</el-button
        >
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
          <el-table-column prop="gradeTime" label="评级时间">
            <template slot-scope="{ row }">{{
              getDateString(row.gradeTime)
            }}</template>
          </el-table-column>
          <el-table-column prop="creditAvailableStart" label="评级有效期">
            <template slot-scope="{ row }">
              {{ getDateString(row.creditAvailableStart) }}至{{
                getDateString(row.creditAvailableEnd)
              }}
            </template>
          </el-table-column>
          <el-table-column label="单位名称">
            <template>{{ companyName }}</template>
          </el-table-column>
          <el-table-column label="评级">
            <template slot-scope="{ row }">{{
              getGradeString(row.nowGrade)
            }}</template>
          </el-table-column>
          <!-- <el-table-column prop="punishTypeF" label="评级有效期" width="150"></el-table-column> -->
          <el-table-column prop="gradeUnit" label="评级单位"></el-table-column>
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
import Pagination from "@/components/common/pagination";
import Request from "../../../services/api/request.js";
export default {
  name: "ratingInfo",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 100,
      tableData: [],
      creditCode: null,
      companyName: ""
    };
  },
  created() {
    this.creditCode = this.$route.query.creditCode;
    this.getCompanyName();
    this.getList();
  },
  methods: {
    getDateString(strDt) {
      let date = new Date(strDt);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/company_credit_grade/all", {
          creditCode: this.creditCode,
          approvalStatus: -1,
          pageNo: 0,
          pageSize: 20,
          townId: 0
        })
        .then(response => {
          this.tableData = response;
          // this.total = this.tableData.length;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCompanyName() {
      Request()
        .get("/api/company_production/name", {
          creditCode: this.creditCode
        })
        .then(response => {
          this.companyName = response[0].companyName;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getGradeString(grade) {
      let strGrade = "";
      switch (grade) {
        case "A":
          strGrade = "A级（守信）";
          break;
        case "B":
          strGrade = "B级（基本守信）";
          break;
        case "C":
          strGrade = "C级（失信）";
          break;
        default:
          strGrade = "A级（守信）";
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
@import "./ratingInfo.scss";
</style>