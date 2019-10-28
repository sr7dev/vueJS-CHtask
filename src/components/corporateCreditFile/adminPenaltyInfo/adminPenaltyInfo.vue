<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">行政处罚信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="select_label no-margin-left">稻米专业合作社</div>
        <el-button size="small" type="primary" v-on:click="$router.go(-1)" plain
          >返回</el-button
        >
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
          <el-table-column
            :formatter="order"
            label="序号"
            width="70"
          ></el-table-column>
          <el-table-column
            prop="docCode"
            label="行政许可决定书文号"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="punishName"
            label="处罚名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="addressCode!!!"
            label="行政许可编码"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="punishTypeF"
            label="处罚类别1"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="punishTypeS"
            label="处罚类别2"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="punishReason"
            label="处罚事由"
            width="450"
          ></el-table-column>
          <el-table-column
            prop="punishFoundation"
            label="处罚依据"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="punishObjectName"
            label="行政相对人名称"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="creditCode"
            label="统一社会信用代码"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="businessRegisterCode"
            label="工商登记码"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="organizationCode"
            label="组织机构代码"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="taxRegisterCode"
            label="税务登记号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="idCode"
            label="居民身份证号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="legalName"
            label="法定代表人姓名"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="punishResult"
            label="处罚结果"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="punishDate"
            label="处罚决定日期"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="punishUnit"
            label="处罚机关"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="status"
            label="当前状态"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="addressCode"
            label="地方编码"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="updateDate"
            label="数据更新时间戳"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="informationScope"
            label="信息使用范围"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="loseCreditGrade"
            label="失信严重程度"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="publicExpireDate"
            label="公示截止期"
            width="150"
          ></el-table-column>
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
import sampleData from "../_data";
import Pagination from "@/components/common/pagination";
import Request from "../../../services/api/request.js";
export default {
  name: "adminPenaltyInfo",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      tableData: sampleData,
      creditCode: -1
    };
  },
  created() {
    this.getList();
    this.creditCode = this.$route.query.creditCode;
  },
  methods: {
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/public_punish/all", {
          creditCode: this.$route.query.creditCode,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          sortBy: "id"
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
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./adminPenaltyInfo.scss";
</style>