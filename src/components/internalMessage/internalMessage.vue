<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">站内消息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号"></el-table-column>
          <el-table-column prop="createTime" label="时间">
            <template slot-scope="{ row }">{{ row.createTime | formatDate }}</template>
          </el-table-column>
          <el-table-column prop="contents" label="内容"></el-table-column>
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
import Auth from "../../services/authentication/auth.js";

export default {
  name: "jobDefinition",
  components: { Pagination },
  data() {
    return {
      contents: "",
      receiveUserId: 0,
      createTime: "",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      tableData: []
    };
  },
  mounted() {
    this.getList();
    if (Auth().user() == null) {
      Auth().logout();
    } else {
      this.receiveUserId = Auth().user().id;
    }
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
        .get("/api/internal_message/all", {
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          receiveUserId: this.receiveUserId
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
  }
};
</script>

<style lang="scss">
</style>