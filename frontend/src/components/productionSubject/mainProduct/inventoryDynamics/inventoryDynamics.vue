<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }">监管对象</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">主营产品/库存动态</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <el-button type="primary" plain style="margin-left: 20px;" @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" :row-class-name="rowIndex">
        <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="productId" label="产品名称">
          <template>{{productName}}</template>
        </el-table-column>
        <el-table-column prop="warehouse" label="所在仓库">
          <template slot-scope="{row}">{{getWarehouseName(row.warehouseId)}}</template>
        </el-table-column>
        <el-table-column prop="repertoryAmount" label="储存数量">
          <template slot-scope="{row}">{{row.repertoryAmount}}</template>
        </el-table-column>
        <el-table-column prop="variety" label="品种"></el-table-column>
        <el-table-column prop="grade" label="等级">
          <template slot-scope="{row}">{{['Unknown', '低级', '中级', '高级', '特级'][row.grade]}}</template>
        </el-table-column>
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
  name: "inventoryDynamics",
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
      tableData: sampleData,
      productName: "",
      warehouses: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.productName = this.$route.query.productName;
    this.getList(this.id);
  },
  methods: {
    getWarehouseName(id) {
      for (let index = 0; index < this.warehouses.length; index++) {
        const element = this.warehouses[index];
        if (element.id == id) return element.warehouseName;
      }
      return "";
    },
    // gotoWarehousingEnvironmentPage(row) {
    //   this.$router.push(`/warehouseEnv`)
    // },
    getList(id) {
      this.listLoading = true;
      Request()
        .get("/api/warehose/all", {
          company_id: 0,
          pageNo: 0,
          pageSize: 20,
          sortBy: "id"
        })
        .then(response => {
          this.warehouses = response;
          Request()
            .get("/api/product_repetory/all", {
              product_id: id,
              pageNo: this.page.pageIndex - 1,
              pageSize: this.page.pageSize,
              sortBy: "id"
            })
            .then(res => {
              this.tableData = res;
              this.total = res.length;
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
            })
            .catch(error => {
              console.error(error);
            });
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
@import "./inventoryDynamics.scss";
</style>
