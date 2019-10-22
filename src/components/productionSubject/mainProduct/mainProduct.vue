<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">主营产品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <el-button
            type="primary"
            v-if="loggedinUserType === 3 || loggedinUserType === 0"
            @click="$router.push(`/companyBusiness/productBusiness/create/${id}`)"
            plain
          >添加</el-button>
          <el-button type="primary" plain @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
        v-loading="listLoading"
      >
        <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="doOrganic" label="是否为有机产品">
          <template slot-scope="{ row }">{{ row.doOrganic ? "是" : "否" }}</template>
        </el-table-column>
        <el-table-column prop="atunitprice" label="单价"></el-table-column>
        <el-table-column prop="productArea" label="产地"></el-table-column>
        <el-table-column prop="variety" label="品种"></el-table-column>
        <el-table-column prop="specification" label="规格"></el-table-column>
        <el-table-column prop="grade" label="评级"></el-table-column>
        <el-table-column prop="operations" label="操作" width="270" class-name="text-right">
          <template slot-scope="{ row }">
            <el-button
              v-on:click="showSamplingRecord(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
            >第三方抽检记录</el-button>
            <el-button
              v-on:click="showProductBatch(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
            >产品批次</el-button>
            <el-button
              v-on:click="showProductVariety(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
              v-if="loggedinUserType === 3 || loggedinUserType === 0"
            >品种定义</el-button>
            <el-button
              v-on:click="showProductGrade(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
              v-if="loggedinUserType === 3 || loggedinUserType === 0"
            >定义等级</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="operations" label width="230" class="text-left">
          <template slot-scope="{ row }">
            <el-button
              v-on:click="showInventoryDynamics(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
            >库存动态</el-button>
            <el-button
              v-on:click="showProcessDefinition(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
              v-if="loggedinUserType === 3 || loggedinUserType === 0"
            >作业定义</el-button>
            <el-button
              v-on:click="showProductProperty(row)"
              type="success"
              plain
              style="margin-bottom: 5px;"
              class="no-margin-left"
              v-if="loggedinUserType === 3 || loggedinUserType === 0"
            >属性管理</el-button>
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
import Request from "@/services/api/request";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "mainProduct",
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
      tableData: [],
      listLoading: true
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getList();
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {
    showSamplingRecord(row) {
      this.$router.push(
        `/productionSubject/mainProduct/thirdPartySamplingRecord/${row.productId}`
      );
    },
    showProductBatch(row) {
      this.$router.push({
        path: `/productionSubject/mainProduct/productBatch/${row.productId}`,
        query: { companyId: this.id }
      });
    },
    showInventoryDynamics(row) {
      this.$router.push({
        path: `/productionSubject/mainProduct/inventoryDynamics/${this.$route.params.id}`,
        query: { productId: row.productId }
      });
    },
    showProcessDefinition(row) {
      this.$router.push({
        path: `/productionSubject/mainProduct/processDefinition/${this.$route.params.id}`,
        query: { productId: row.productId }
      });
    },
    showProductProperty(row) {
      this.$router.push({
        path: `/productionSubject/mainProduct/productProperty/${this.$route.params.id}`,
        query: { productId: row.productId }
      });
    },
    showProductVariety(row) {
      this.$router.push({
        path: `/productVariety/${row.productId}`
      });
    },
    showProductGrade(row) {
      this.$router.push({
        path: `/productionGrade/${row.productId}`
      });
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/product_production/all", {
          company_id: this.id,
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
@import "./mainProduct.scss";
</style>
