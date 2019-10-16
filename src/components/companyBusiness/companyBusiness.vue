<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">监管对象</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <div class="select_label no-margin-left">行业</div>
          <el-select v-model="productType" placeholder="请选择" @change="getList()">
            <el-option
              v-for="item in productTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div class="filter-item">
          <div class="select_label">行业</div>
          <el-select v-model="companyScale" placeholder="请选择" @change="getList()">
            <el-option
              v-for="item in companyScales"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <el-container>
        <el-table :data="tableData" style="width: 100%" :row-class-name="rowIndex">
          <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
          <el-table-column prop="companyName" label="企业名称" width="120"></el-table-column>
          <el-table-column prop="companyScale" label="企业规模" width="120">
            <template slot-scope="{ row }">{{ companyScales[row.companyScale].label }}</template>
          </el-table-column>
          <el-table-column prop="productType" label="产品类型" width="120">
            <template slot-scope="{ row }">{{ productTypes[row.productType].label }}</template>
          </el-table-column>
          <el-table-column prop="legalPerson" label="法定代表人" width="150"></el-table-column>
          <el-table-column prop="companyAddress" label="企业地址" width="120"></el-table-column>
          <el-table-column prop="creditCode" label="社会信用统一代码" width="200"></el-table-column>
          <el-table-column prop="contactWay" label="联系方式" width="120"></el-table-column>
          <el-table-column prop="supervisionNature" label="监管对象性质" width="180">
            <template slot-scope="{ row }">{{ supervisions[row.supervisionNature] }}</template>
          </el-table-column>
          <el-table-column prop="operations" label="操作" width="250" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button v-on:click="gotoDetailPage(row)" plain type="primary">企业详情</el-button>
              <el-button v-on:click="gotoProductBusinessPage(row)" plain type="success">经营产品</el-button>
            </template>
          </el-table-column>
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
import Request from "@/services/api/request";
export default {
  name: "companyBusiness",
  components: { Pagination },
  data() {
    return {
      companyScales: [
        { value: 0, label: "全部" },
        { value: 1, label: "小型企业" },
        { value: 2, label: "中型企业" },
        { value: 3, label: "大型企业" }
      ],
      productTypes: [
        { value: 0, label: "全部" },
        { value: 1, label: "农药" },
        { value: 2, label: "种子" },
        { value: 3, label: "饲料" },
        { value: 4, label: "肥料" }
      ],
      supervisions: ["Unknown", "法人", "其他组织"],
      companyScale: 0,
      productType: 0,
      sortBy: "id",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
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
    this.getList();
  },
  methods: {
    gotoDetailPage(row) {
      this.$router.push(`/companyBusiness/detailsCompanyBusiness/${row.id}`);
    },
    gotoProductBusinessPage(row) {
      this.$router.push(`/companyBusiness/productBusiness/${row.id}`);
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/company_business/all", {
          company_scale: this.companyScale,
          product_type: this.productType,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          sortBy: this.sortBy
        })
        .then(response => {
          this.tableData = response.data;
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
@import "./companyBusiness.scss";
</style>
