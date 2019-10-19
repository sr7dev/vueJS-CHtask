<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">三品认证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="select_label">{{ getCompanyName() }}</div>
        <div class="select_label">分类</div>
        <el-select
          v-model="filterStatus"
          placeholder="请选择"
          @change="getList"
          style="margin-right: 30px"
        >
          <el-option
            v-for="(item, index) in argriculturalClassification"
            :key="item"
            :label="item"
            :value="index"
          ></el-option>
        </el-select>
        <div class="select_label">认证类型</div>
        <el-select
          v-model="certificationType"
          placeholder="请选择"
          @change="getList"
          style="margin-right: 30px"
        >
          <el-option
            v-for="(item, index) in certificationTypes"
            :key="item"
            :label="item"
            :value="index"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          v-on:click="$router.push({path:`/productionSubject/threeProduct/addThreeProduct`,
                                    query: {creditCode:creditCode}})"
          plain
        >添加认证</el-button>
        <el-button type="primary" v-on:click="$router.go(-1)" plain>返回</el-button>
      </div>
      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          fit
          style="width: 100%;"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
          <el-table-column prop="productName" label="产品" width>
            <template slot-scope="{ row }">
              {{
              filterProduct(row.productId)
              }}
            </template>
          </el-table-column>
          <el-table-column prop="argriculturalClassification" label="分类" width>
            <template slot-scope="{ row }">
              {{
              appStatus1[row.argriculturalClassification]
              }}
            </template>
          </el-table-column>
          <el-table-column prop="certificationType" label="认证类型" width>
            <template slot-scope="{ row }">
              {{
              certificationTypes[row.certificationType]
              }}
            </template>
          </el-table-column>
          <el-table-column prop="certificationNo" label="证书编号" width></el-table-column>
          <el-table-column label="证书有效期" width>
            <template slot-scope="{ row }">
              {{
              getCertification(
              row.certificationStartTime,
              row.certificationEndTime
              )
              }}
            </template>
          </el-table-column>
          <el-table-column label="有效时间" width>
            <template slot-scope="{ row }">
              {{
              getPeriod(row.certificationStartTime, row.certificationEndTime)
              }}
            </template>
          </el-table-column>
          <el-table-column prop="output" label="产量" width></el-table-column>
        </el-table>
      </el-container>
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
import Pagination from "@/components/common/pagination";
import Request from "../../../services/api/request.js";
export default {
  name: "threeProduct",
  components: { Pagination },
  data() {
    return {
      companyData: [],
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      tableData: [],
      creditCode: -1,
      productName: "",
      productCategory: 0,
      productDetail: [],
      filterStatus: 0,
      certificationType: 0,
      appStatus1: ["全部", "养殖业", "畜牧业", "种植业"],
      argriculturalClassification: ["全部", "养殖业", "畜牧业", "种植业"],
      certificationTypes: [
        "全部",
        "无公害产品",
        "绿色食品",
        "有机食品",
        "地理标志"
      ]
    };
  },
  created() {
    this.creditCode = this.$route.query.creditCode;
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
          creditCode: this.$route.query.creditCode,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          argriculturalClassification: this.filterStatus,
          certificationType: this.certificationType
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
      let product = this.companyData.find(
        x => x.creditCode === this.$route.query.creditCode
      );
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
      let startYear = parseInt(startDate.substr(0, 4));
      let endYear = parseInt(endDate.substr(0, 4));
      return (endYear - startYear <= 0 ? 0 : endYear - startYear) + "年";
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    }
  }
};
</script>
<style lang="scss">
</style>