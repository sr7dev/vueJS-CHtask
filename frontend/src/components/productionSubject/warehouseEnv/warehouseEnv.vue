<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }">监管对象</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">仓储环境</el-breadcrumb-item>
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
        <el-table-column prop="warehouseName" label="仓库名称" width="150"></el-table-column>
        <el-table-column prop="warehouseAddress" label="仓库地址" width="150"></el-table-column>
        <el-table-column prop="warehouseArea" label="仓库面积" width="150"></el-table-column>
        <el-table-column prop="warehouseScope" label="仓库规模"></el-table-column>
        <el-table-column prop="operations" label="操作"  width="150">
          <template slot-scope="{row}">
            <el-button  v-on:click="showDetailWarehouse(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <pagination v-show="total>0" :total="total" :page.sync="page.pageIndex" 
            :limit.sync="page.pageSize" @pagination="getList" />
      </div>
    </div>
  </div>
</template>

<script>
import Request from '@/services/api/request'
import Pagination from '@/components/common/pagination'
export default {
  name: 'warehouseEnv',
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
      tableData: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getList(this.id);
  },
  methods: {
    showDetailWarehouse(row) {
      console.log(row);
      this.$router.push({
        path:`/productionSubject/warehouseEnv/detailsWarehouse/${row.id}`,
        query: {company: row}});
    },
    getList(id) {
      this.listLoading = true;
      console.log(id);
      Request()
        .get("/api/warehose/all",{
          company_id: id,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          sortBy: 'id'
        })
        .then(response => {
          this.tableData = response;
          this.total = this.tableData.length;
          console.log(this.tableData);
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 1000);
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
  }
};
</script>

<style lang="scss" scoped>
@import "./warehouseEnv.scss";
</style>
