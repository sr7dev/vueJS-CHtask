<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">培训经费管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox" v-if="loggedinUserType === 2">
        <el-button type="primary" v-on:click="$router.push(`/trainingFunds/add`)" plain>添加</el-button>
      </div>

      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号"></el-table-column>
          <el-table-column prop="projectName" label="项目名称"></el-table-column>
          <el-table-column prop="appliedAmount" label="申请金额">
            <template slot-scope="{ row }">{{ row.appliedAmount }}元</template>
          </el-table-column>
          <el-table-column prop="proposer" label="申请人"></el-table-column>
          <el-table-column prop="companyId" label="所在单位">
            <template slot-scope="{ row }">{{ filterCompnay(row.companyId) }}</template>
          </el-table-column>
          <!-- <el-table-column prop="status" label="状态">
          </el-table-column>-->
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="success"
                plain
                v-on:click="$router.push({path: `/trainingFunds/view/${row.id}`})"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
      <div class="pageBox">
        <Pagination
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
import Request from "../../services/api/request.js";
import Auth from "@/services/authentication/auth.js";

export default {
  name: "jobDefinition",
  components: { Pagination },
  data() {
    return {
      projectName: "",
      appliedAmount: 0,
      proposer: "",
      createTime: "",
      companyId: 0,
      status: "",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: false,
      total: 0,
      tableData: [],
      loggedinUserType: null,
      companyProduction: [],
      appStatus: ["全部", "待审批", "已同意", "已拒绝"]
    };
  },
  mounted() {
    this.getCompanyProduction();
    this.getList();
  },
  created() {
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/trainingfunds/all", {
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
          console.log(error);
        });
    },
    getCompanyProduction() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyProduction = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterCompnay(id) {
      let company = this.companyProduction.find(x => x.companyId === id);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss">
@import "./trainingFunds.scss";
</style>