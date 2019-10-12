<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">统计（农残）</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-checkbox v-model="checked">全部</el-checkbox>
        <div class="select_label">按年</div>
        <el-input v-model="input" class="input-layout"></el-input>
        <div class="select_label">按月</div>
        <el-input v-model="input" class="input-layout"></el-input>
        <el-button type="primary" v-on:click="$router.push(`#`)" plain>开始统计</el-button>
      </div>

      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="180"></el-table-column>
          <el-table-column prop="productName" label="站点">
          </el-table-column>
          <el-table-column prop="productionQuantity" label="检测数量">
          </el-table-column>
          <el-table-column prop="productionQuantity" label="数量对比">
              <div class="sub-title">50</div>
              <el-progress :percentage="50"></el-progress>
          </el-table-column>
          <el-table-column prop="productionQuantity" label="合格"></el-table-column>
          <el-table-column prop="productionQuantity" label="不合格"></el-table-column>
          <el-table-column prop="productionQuantity" label="合格率比">
              <div class="sub-title">100</div>
              <el-progress :percentage="100"></el-progress>
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
          layout="prev, pager, next, sizes, jumper"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/common/pagination";
import Request from "../../services/api/request.js";
export default {
  name: "statisticsFarmers",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      tableData: [],
      listLoading: false,
      confirm_dialogVisible: false,
      selectedId: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      Request()
        .get("/api/production_record/all", {
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
    deleteRow() {
      Request()
        .delete("/api/production_record/delete/" + this.selectedId)
        .then(response => {
          setTimeout(() => {
            this.confirm_dialogVisible = false;
          }, 0.5 * 1000);
          this.getData();
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
    showConfirmDialog(id) {
      this.selectedId = id;
      this.confirm_dialogVisible = true;
    }
  }
};
</script>

<style scoped>
@import "./statisticsFarmers.scss";
</style>