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
          class="tab-header inline-block-IE"
          type
          @click="clickTabLeft"
          v-bind:class="{ active: mode }"
        >抽样计划</div>
        <div
          class="tab-header inline-block-IE"
          type
          @click="clickTabRight"
          v-bind:class="{active: !mode}"
        >抽样结果</div>
      </div>
      <div class="iptBox">
        <el-button size="small" type="primary" plain @click="addSample()">添加</el-button>
      </div>
      <el-table
        v-show="mode"
        v-loading="listLoading"
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
      >
        <el-table-column :formatter="order" label="序号" width="80"></el-table-column>
        <el-table-column prop="sampleName" label="检测名称"></el-table-column>
        <el-table-column prop="sampleTime" label="检测时间">
          <template slot-scope="{ row }">{{ row.sampleTime | formatDate }}</template>
        </el-table-column>
        <el-table-column prop="checkPerson" label="检测人员"></el-table-column>
        <el-table-column prop="operations" label="操作" class-name="text-center">
          <template slot-scope="{ row }">
            <el-button size="small" v-on:click="showDetailsSampleCheck(row)" type="success" plain>查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="!mode"
        v-loading="listLoading"
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
      >
        <el-table-column :formatter="order" label="序号" width="80"></el-table-column>
        <el-table-column prop="sampleName" label="检测名称"></el-table-column>
        <el-table-column prop="checkUnit" label="检测单位"></el-table-column>
        <el-table-column prop="sampleTime" label="检测时间">
          <template slot-scope="{ row }">{{ row.sampleTime | formatDate }}</template>
        </el-table-column>
        <el-table-column prop="checkResult" label="检测结果">
          <template slot-scope="{ row }">{{ row.checkResult == 1 ? "合格" : "不合格" }}</template>
        </el-table-column>
        <el-table-column prop="checkPerson" label="检测人员"></el-table-column>
        <el-table-column prop="operations" label="操作" class-name="text-center">
          <template slot-scope="{ row }">
            <el-button
              size="small"
              v-on:click="showDetailsSampleCheckResult(row)"
              type="success"
              plain
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      total: 0,
      tableData: [],
      listLoading: false,
      status: 1
    };
  },
  created() {
    this.getList();
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
    getList() {
      this.listLoading = true;
      let newStatus = this.mode ? 1 : 2;
      if (this.status !== newStatus) {
        this.status = newStatus;
        this.page.pageIndex = 1;
      }
      if (this.mode) {
        Request()
          .get("/api/sample_check/all", {
            pageNo: this.page.pageIndex - 1,
            pageSize: this.page.pageSize
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
      } else {
        Request()
          .get("/api/sample_check_result/all", {
            pageNo: this.page.pageIndex - 1,
            pageSize: this.page.pageSize
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
      }
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    clickTabLeft() {
      this.mode = true;
      this.getList();
    },
    clickTabRight() {
      this.mode = false;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./sampleCheck.scss";
</style>
