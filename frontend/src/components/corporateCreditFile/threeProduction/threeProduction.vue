<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">三品认证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="select_label">{{getCompanyName()}}</div>
        <el-button type="outline-primary" v-on:click="$router.go(-1)">返回</el-button>
      </div>
      <el-container>
        <el-table :data="tableData" v-loading="listLoading" fit style="width: 100%;"
        :row-class-name="rowIndex" highlight-current-row>
          <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
          <el-table-column prop="productName" label="产品" width="">
            <template slot-scope="{row}">{{filterProduct(row.productId)}}</template>
          </el-table-column>
          <el-table-column prop="cretficationType" label="分类" width="">
            <template slot-scope="{row}">{{appStatus1[row.argriculturalClassification]}}</template>
          </el-table-column>
          <el-table-column prop="cretficationCategory" label="认证类型" width="">
          </el-table-column>
          <el-table-column prop="certificationNo" label="证书编号" width=""></el-table-column>
          <el-table-column label="证书有效期" width="">
            <template slot-scope="{row}">{{getCertification(row.certificationStartTime, row.certificationEndTime)}}</template>
          </el-table-column>
          <el-table-column label="有效时间" width="">
            <template slot-scope="{row}">{{getPeriod(row.certificationStartTime, row.certificationEndTime)}}</template>
          </el-table-column>
          <el-table-column prop="output" label="产量" width=""></el-table-column>
        </el-table>
      </el-container>
      <div class="pageBox">
        <pagination v-show="total>0" :total="total" :page.sync="page.pageIndex" 
            :limit.sync="page.pageSize" @pagination="getList" />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/common/pagination';
import Request from "../../../services/api/request.js";
export default {
  name: 'threeProduction',
  components: { Pagination },
  data() {
    return {
      companyData: [],
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 100,
      tableData: [],
      id: -1,
      productName:'',
      productCategory: 0,
      productDetail: [],
      appStatus1: ["全部", "养殖业", "已同意", "畜牧业", "种植业"],
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getProductionDetail();
    this.getCompanyProduction();
    this.getList();
  },
  methods: {
    getCompanyProduction() {
      Request()
              .get("/api/company_production/name")
              .then(response => {
                this.companyData = response;
              })
              .catch(error => {
                console.log(error);
              });
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/quality_standard/all", {
          creditCode: this.$route.params.id,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
        })
        .then(response => {
          this.tableData = response;
          this.total = this.tableData.length;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getProductionDetail() {
      Request()
              .get("/api/product_production/name")
              .then(response => {
                this.productDetail = response;
              })
              .catch(error => {
                console.log(error);
              });
    },
    filterProduct(ID) {
      let product = this.productDetail.find(x => x.productId === ID);
      if (product) {
        return product.productName;
      } else {
        return "";
      }
    },
    getCompanyName() {
      let product = this.companyData.find(x => x.creditCode === this.$route.params.id);
      if (product) {
        return product.companyName;
      } else {
        return "";
      }
    },
    getCertification(startDate, endDate) {
      return startDate.substr(0, 10) + "至" + endDate.substr(0, 10);
    },
    getPeriod(startDate, endDate) {
      let startYear =  parseInt(startDate.substr(0,4));
      let endYear =  parseInt(endDate.substr(0,4));
      return ((endYear - startYear) <= 0 ? 0 : (endYear-startYear)) + "年";
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
  }
};
</script>
<style lang="scss">
  @import "./threeProduction.scss";
</style>