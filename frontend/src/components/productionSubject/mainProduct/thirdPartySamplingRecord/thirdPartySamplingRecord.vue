<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }">监管对象</el-breadcrumb-item>
        <el-breadcrumb-item >主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">第三方抽检记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <el-button type="primary" plain style="margin-left: 20px;" @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
      <div class="iptBox">
        <div class="filter-item">银针 第三方质量安全检测记录</div>
      </div>
      <el-table :data="tableData" style="width: 100%" :row-class-name="rowIndex">
        <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="productCheckTime" label="日期" width="150">
          <template slot-scope="{row}">{{getDateString(row.productCheckTime)}}</template>
        </el-table-column>
        <el-table-column prop="specimen" label="样品" width="150"></el-table-column>
        <el-table-column prop="checkItem" label="检测项目" width="150"></el-table-column>
        <el-table-column prop="checkResult" label="检测结果">
          <template slot-scope="{row}">{{row.checkResult==1?'阴性':'阳性'}}</template>
        </el-table-column>
        <el-table-column prop="determine" label="判定">
          <template slot-scope="{row}">{{row.determine?'合格':'不合格'}}</template>
        </el-table-column>
        <el-table-column prop="checkStandard" label="检测标准"></el-table-column>
        <el-table-column prop="checkOrganization" label="检测机构"></el-table-column>
      </el-table>
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
import sampleData from "./_data";
import Pagination from "@/components/common/pagination";
import Request from "@/services/api/request";
export default {
  name: "thirdPartySamplingRecord",
  components: { Pagination },
  data() {
    return {
      id: -1,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 100,
      radio: "1",
      tableData: sampleData
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getList(this.id);
  },
  methods: {
    getDateString(strDt) {
      let date = new Date(strDt);
      return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + (date.getDate());
    },
    getList(id) {
      this.listLoading = true;
      Request()
        .get("/api/product_check_record/all", {
          product_id: this.id,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize
        })
        .then(response => {
          this.tableData = response;
          this.total = this.tableData.length;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./thirdPartySamplingRecord.scss";
</style>
