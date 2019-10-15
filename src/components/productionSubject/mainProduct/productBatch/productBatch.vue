<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }">监管对象</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">产品批次</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <el-button type="primary" v-if="loggedinUserType === 3 || loggedinUserType === 0" plain>添加</el-button>
          <el-button type="primary" plain @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" :row-class-name="rowIndex">
        <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="batchName" label="批次名称"></el-table-column>
        <el-table-column prop="batchNumber" label="批次号"></el-table-column>
        <el-table-column prop="operation" label="作业"></el-table-column>
        <el-table-column prop="sales" label="销售"></el-table-column>
        <el-table-column prop="attributeName" label="属性名称"></el-table-column>
        <el-table-column prop="testReport" label="检测报告"></el-table-column>
        <el-table-column
          label="操作"
          v-if="loggedinUserType === 3 || loggedinUserType === 0"
          class-name="text-center"
        >
          <template>
            <el-button plain>修改</el-button>
            <el-button plain>作业</el-button>
            <el-button plain>上传检测报告</el-button>
            <el-button plain>属性</el-button>
            <el-button plain>销售</el-button>
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
import sampleData from "./_data";
import Pagination from "@/components/common/pagination";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "productBatch",
  components: { Pagination },
  data() {
    return {
      loggedinUserType: null,
      id: -1,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      radio: "1",
      tableData: sampleData
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getList();
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {
    // gotoWarehousingEnvironmentPage(row) {
    //   this.$router.push(`/warehouseEnv`)
    // },
    getList() {
      this.listLoading = true;
      // fetchListAPI(this.status, this.page.pageIndex, this.page.pageSize, "credit_gradeid")
      //   .then(response => {
      this.tableData = sampleData; // this.tableData = response;
      this.total = this.tableData.length;
      setTimeout(() => {
        this.listLoading = false;
      }, 0.5 * 1000);
      // })
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
@import "./productBatch.scss";
</style>
