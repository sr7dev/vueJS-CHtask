<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }">监管对象</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">主营产品/产品批次</el-breadcrumb-item>
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
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="warehouse" label="所在仓库"></el-table-column>
        <el-table-column prop="storageQuantity" label="储存数量"></el-table-column>
        <el-table-column prop="variety" label="品种"></el-table-column>
        <el-table-column prop="rating" label="评级"></el-table-column>
      </el-table>
      <div class="pageBox">
        <pagination v-show="total>0" :total="total" :page.sync="page.pageIndex" 
            :limit.sync="page.pageSize" @pagination="getList" />
      </div>
    </div>
  </div>
</template>

<script>
import sampleData from './_data';
import Pagination from '@/components/common/pagination'
export default {
  name: 'inventoryDynamics',
  components: { Pagination },
  data() {
    return {
      id: -1,
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 100,
      radio: "1",
      tableData: sampleData
    };
  },
  created() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.getList();
  },
  methods: {
    gotoWarehousingEnvironmentPage(row) {
      console.log(row);
      this.$router.push(`/warehouseEnv`)

    },
    getList() {
      this.listLoading = true;
      // fetchListAPI(this.status, this.page.pageIndex, this.page.pageSize, "credit_gradeid")
      //   .then(response => {
          this.tableData = sampleData;  // this.tableData = response;  
          this.total = this.tableData.length;
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 1000);
      // })
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
  }
};
</script>

<style lang="scss">
@import "./inventoryDynamics.scss";
</style>
