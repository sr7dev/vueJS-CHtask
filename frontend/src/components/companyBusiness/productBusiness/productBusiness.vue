<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/companyBusiness' }">监管对象</el-breadcrumb-item>
        <el-breadcrumb-item>经营产品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <el-button plain @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
      <el-container>
        <el-table :data="tableData" style="width: 100%" :row-class-name="rowIndex">
          <el-table-column :formatter="order" label="序号"></el-table-column>
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="atunitprice" label="单价"></el-table-column>
          <el-table-column prop="productArea" label="产地"></el-table-column>
          <el-table-column prop="variety" label="品种"></el-table-column>
          <el-table-column prop="grade" label="评级"></el-table-column>
          <el-table-column prop="specification" label="规格"></el-table-column>
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
import Pagination from "@/components/common/pagination";
import Request from "@/services/api/request";
export default {
  name: "productBusiness",
  components: { Pagination },
  data() {
    return {
      companyScale: 0,
      productType: 0,
      sortBy: "id",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 100,
      options: [
        {
          value: "全部",
          label: ""
        }
      ],
      tableData: [],
      listLoading: false
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/product_business/all", {
          company_id: this.id,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          sortBy: this.sortBy
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
@import "./productBusiness.scss";
</style>
