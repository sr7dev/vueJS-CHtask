<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">信用评级</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="select_label">{{ companyName }}</div>
        <el-button size="small" type="primary" v-on:click="$router.go(-1)" plain>返回</el-button>
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
          <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
          <el-table-column prop="gradeTime" label="评级时间">
            <template slot-scope="{ row }">
              {{
              row.gradeTime | formatDate
              }}
            </template>
          </el-table-column>
          <el-table-column prop="creditAvailableStart" label="评级有效期">
            <template slot-scope="{ row }">
              {{ row.creditAvailableStart | formatDate }}至{{
              row.creditAvailableEnd | formatDate
              }}
            </template>
          </el-table-column>
          <el-table-column label="单位名称">
            <template>{{ companyName }}</template>
          </el-table-column>
          <el-table-column label="评级">
            <template slot-scope="{ row }">
              <el-rate
                :value="getGradeString(row.nowGrade)"
                :max="getGradeString(row.nowGrade)"
                :texts="['C级（失信）', 'B级（基本守信）', 'A级（守信）']"
                :colors="colors"
                disabled
                show-text
              ></el-rate>
            </template>
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
      total: 0,
      tableData: [],
      creditCode: null,
      companyName: "",
      colors: { 1: "#f00", 2: "#F7BA2A", 3: "#0f0" }
    };
  },
  created() {
    this.creditCode = this.$route.query.creditCode;
    this.getCompanyName();
    this.getList();
  },
  methods: {
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
          townId: -1,
          sortBy: "creditGradeId"
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
@import "./ratingInfo.scss";
</style>