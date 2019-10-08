<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>例行抽样</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">抽样计划</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div
          class="tab-header"
          type
          @click="mode = true"
          v-bind:class="{ active: mode }"
        >
          抽样计划
        </div>
        <div
          class="tab-header"
          type
          @click="mode = false"
          v-bind:class="{ active: !mode }"
        >
          抽样结果
        </div>
      </div>
      <div class="iptBox">
        <el-button type="primary" plain @click="addSample()">添加</el-button>
      </div>
      <el-table
        v-show="mode"
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
      >
        <el-table-column
          :formatter="order"
          label="序号"
          width="80"
        ></el-table-column>
        <el-table-column prop="sampleName" label="检测名称"></el-table-column>
        <el-table-column prop="sampleTime" label="检测时间">
          <template slot-scope="{ row }">
            {{ getDateString(row.sampleTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="checkPerson" label="检测人员"></el-table-column>
        <el-table-column prop="operations" label="操作">
          <template slot-scope="{ row }">
            <el-button
              v-on:click="showDetailsSampleCheck(row)"
              type="success"
              plain
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="!mode"
        :data="tableData1"
        style="width: 100%"
        :row-class-name="rowIndex"
      >
        <el-table-column
          :formatter="order1"
          label="序号"
          width="80"
        ></el-table-column>
        <el-table-column prop="sampleName" label="检测名称"></el-table-column>
        <el-table-column prop="checkUnit" label="检测单位"></el-table-column>
        <el-table-column prop="sampleTime" label="检测时间">
          <template slot-scope="{ row }">
            {{ getDateString(row.sampleTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="checkResult" label="检测结果">
          <template slot-scope="{ row }">
            {{ row.checkResult == 1 ? "合格" : "不合格" }}
          </template>
        </el-table-column>
        <el-table-column prop="checkPerson" label="检测人员"></el-table-column>
        <el-table-column prop="operations" label="操作">
          <template slot-scope="{ row }">
            <el-button
              v-on:click="showDetailsSampleCheckResult(row)"
              type="success"
              plain
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <pagination
          v-show="total1 > 0"
          :total="total1"
          :page.sync="page1.pageIndex"
          :limit.sync="page1.pageSize"
          @pagination="getList1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request";
import Pagination from "@/components/common/pagination";
export default {
  name: "sampleCheck",
  components: { Pagination },
  data() {
    return {
      mode: true,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 100,
      tableData: [],

      page1: {
        pageIndex: 1,
        pageSize: 20
      },
      total1: 100,
      tableData1: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getList(this.id);
    this.getList1(this.id);
  },
  methods: {
    showDetailsSampleCheck(row) {
      this.$router.push(`/sampleCheck/detailsSampleCheck/${row.id}`);
    },
    showDetailsSampleCheckResult(row) {
      this.$router.push(`/sampleCheck/detailsSampleCheckResult/${row.id}`);
    },
    addSample() {
      if (this.mode) {
        this.$router.push(`/sampleCheck/addSampleCheck`);
      } else {
        this.$router.push(`/sampleCheck/addSampleCheckResult`);
      }
    },
    addSampleResult() {},
    getDateString(dt) {
      const date = new Date(dt);
      return date.toLocaleDateString();
    },
    getList(id) {
      Request()
        .get("/api/sample_check/all", {
          company_id: id,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          sortBy: "id"
        })
        .then(response => {
          this.tableData = response;
          this.total = this.tableData.length;
        })
        .catch(error => {
          console.log(error);
        });
    },

    getList1(id) {
      Request()
        .get("/api/sample_check_result/all", {
          company_id: id,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          sortBy: "id"
        })
        .then(response => {
          this.tableData1 = response;
          this.total1 = this.tableData1.length;
        })
        .catch(error => {
          console.log(error);
        });
    },

    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    order1(row) {
      return (
        this.page1.pageSize * (this.page1.pageIndex - 1) + row.rowIndex + 1
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./sampleCheck.scss";
</style>
