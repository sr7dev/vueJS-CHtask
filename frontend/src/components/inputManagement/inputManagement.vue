<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">投入品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div
          class="tab-header inline-block-IE"
          type
          @click="clickTabLeft"
          v-bind:class="{ active: mode }"
        >使用信息</div>
        <div
          class="tab-header inline-block-IE"
          type
          @click="clickTabRight"
          v-bind:class="{ active: !mode }"
        >采购信息</div>
      </div>
      <div class="iptBox">
        <el-button
          size="small"
          type="primary"
          plain
          @click="$router.push({path: `/inputManagement/addPurchase`})"
          v-if="!mode"
        >添加</el-button>
        <el-button
          size="small"
          type="primary"
          plain
          @click="$router.push({path: `/inputManagement/addUse`})"
          v-else
        >添加</el-button>
      </div>
      <el-table v-show="mode" :data="tableData" :row-class-name="rowIndex" v-loading="listLoading">
        <el-table-column :formatter="order" label="序号" width="100px"></el-table-column>
        <el-table-column prop="companyId" label="企业名称">
          <template slot-scope="{ row }">{{ filterCompnay(row.companyId) }}</template>
        </el-table-column>
        <el-table-column prop="sampleName" label="样品名称"></el-table-column>
        <el-table-column prop="amount" label="使用数量(公斤)"></el-table-column>
        <el-table-column prop="operations" label="操作" class-name="text-center">
          <template slot-scope="{ row }">
            <el-button
              size="small"
              type="success"
              plain
              v-on:click="$router.push({
                path: `/inputManagement/view/${row.id}`,
                query: { mode: mode }})"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="!mode"
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
        v-loading="listLoading"
      >
        <el-table-column :formatter="order" label="序号"></el-table-column>
        <el-table-column prop="companyId" label="企业名称">
          <template slot-scope="{ row }">{{ filterCompnay(row.companyId) }}</template>
        </el-table-column>
        <el-table-column prop="sampleName" label="样品名称"></el-table-column>
        <el-table-column prop="amount" label="采购数量(公斤)"></el-table-column>
        <el-table-column label="操作" class-name="text-center">
          <template slot-scope="{ row }">
            <el-button
              size="small"
              type="success"
              plain
              v-on:click="$router.push({
                                path: `/inputManagement/view/${row.id}`,
                                query: { mode: mode }})"
            >查看</el-button>
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
import Request from "@/services/api/request";
import Pagination from "@/components/common/pagination";
export default {
  name: "sampleCheck",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      tableData: [],
      companyProduction: [{ id: -1, name: "全部" }],
      mode: true,
      listLoading: true
    };
  },
  created() {
    this.getList();
    this.getCompanyProduction();
  },
  methods: {
    clickTabLeft() {
      this.mode = true;
      this.getList();
      this.getCompanyProduction();
    },
    clickTabRight() {
      this.mode = false;
      this.getList();
      this.getCompanyProduction();
    },
    getList() {
      if (this.mode) {
        this.listLoading = true;
        Request()
          .get("/api/inputsUse/all", {
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
      } else {
        this.listLoading = true;
        Request()
          .get("/api/inputsPurchase/all", {
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
      }
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
@import "./inputManagement.scss";
</style>
