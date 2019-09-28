<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">行政处罚信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="select_label">稻米专业合作社</div>
        <el-button type="outline-primary" v-on:click="$router.go(-1)">返回</el-button>
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
          <el-table-column prop="docCode" label="评级时间" width="250"></el-table-column>
          <el-table-column prop="punishName" label="单位名称" width="150"></el-table-column>
          <el-table-column prop="addressCode!!!" label="评级" width="150"></el-table-column>
          <!-- <el-table-column prop="punishTypeF" label="评级有效期" width="150"></el-table-column> -->
          <el-table-column prop="punishTypeS" label="评级单位" width="150"></el-table-column>
        </el-table>
      </el-container>
      <div class="pageBox">
        <pagination
          v-show="total>0"
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
import sampleData from "../_data";
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
      tableData: sampleData,
      creditCode: ""
    };
  },
  created() {
    this.creditCode = this.$route.query.creditCode;
    this.getList();
  },
  methods: {
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    getList() {
      this.listLoading = true;
      console.log(this.creditCode);
      Request()
        .get("/api/company_credit_grade/all", {
          creditCode: creditCode
        })
        .then(response => {
          console.log(response);
          // this.tableData = response;
          // this.total = this.tableData.length;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
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