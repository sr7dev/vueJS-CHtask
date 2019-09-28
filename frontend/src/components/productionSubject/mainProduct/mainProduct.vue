<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }">监管对象</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">主营产品</el-breadcrumb-item>
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
        <el-table-column prop="productName" label="产品名称" width="120"></el-table-column>
        <el-table-column prop="doOrganic" label="是否为有机产品" width="180">
          <template slot-scope="{row}">
            {{row.doOrganic?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column prop="atunitprice" label="单价"></el-table-column>
        <el-table-column prop="productArea" label="产地" width="200"></el-table-column>
        <el-table-column prop="variety" label="品种"></el-table-column>
        <el-table-column prop="specification" label="规格"></el-table-column>
        <el-table-column prop="grade" label="评级"></el-table-column>
        <el-table-column prop="operations" label=""  width="270">
          <template slot-scope="{row}">
            <el-button  v-on:click="showSamplingRecord(row)">第三方抽检记录</el-button>
            <el-button  v-on:click="showProductBatch(row)">产品批次</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="operations" label=""  width="120">
          <template slot-scope="{row}">
            <el-button  v-on:click="showInventoryDynamics(row)">库存动态</el-button>
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
import sampleData from './_data';
import Pagination from '@/components/common/pagination'
import Request from '@/services/api/request'
export default {
  name: 'mainProduct',
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
    showSamplingRecord(row) {
      this.$router.push(`/productionSubject/mainProduct/thirdPartySamplingRecord/${row.id}`);
    },
    showProductBatch(row) {
      this.$router.push(`/productionSubject/mainProduct/productBatch/${row.id}`);
    },
    showInventoryDynamics(row) {
      this.$router.push(`/productionSubject/mainProduct/inventoryDynamics/${row.id}`);

    },
    getList() {
      this.listLoading = true;
       Request()
        .get("/api/product_production/all", {
          companyId: this.id,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
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
          console.error(error);
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

<style lang="scss">
@import "./mainProduct.scss";
</style>
