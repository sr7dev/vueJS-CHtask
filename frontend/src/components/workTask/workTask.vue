<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">任务发布</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-row class="w-100">
          <el-col :span="6">
            <div class="select_label no-margin-left">开始日期</div>
            <el-date-picker
              v-model="releaseTimeFrom"
              align="right"
              type="date"
              placeholder="开始日期"
              v-on:change="getList"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <div class="select_label no-margin-left">结束日期</div>
            <el-date-picker
              v-model="releaseTimeTo"
              align="right"
              type="date"
              placeholder="结束日期"
              v-on:change="getList"
            ></el-date-picker>
          </el-col>
          <el-col :span="3">
            <el-button
              size="small"
              type="primary"
              v-on:click="$router.push(`/workTask/create`)"
              plain
              v-if="isShowAddButton"
            >添加工作任务</el-button>
          </el-col>
        </el-row>
      </div>

      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="100"></el-table-column>
          <el-table-column prop="releaseTime" label="发布时间" class-name="text-center">
            <template slot-scope="{ row }">
              {{
              row.releaseTime | formatDate
              }}
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="releasePerson" label="发布者"></el-table-column>
          <el-table-column label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="warning"
                plain
                v-if="isShowAddButton"
                v-on:click="
                  $router.push({
                    path: `/workTask/edit/${row.id}`
                  })
                "
              >修改</el-button>
              <el-button
                size="small"
                type="success"
                plain
                v-if="isShowEditButton"
                v-on:click="
                  $router.push({
                    path: `/workTask/report/create`,
                    query: {
                      id: row.id
                    }
                  })
                "
              >查看任务</el-button>
              <el-button
                size="small"
                type="primary"
                plain
                v-if="isShowAddButton"
                v-on:click="
                  $router.push({
                    path: `/workTask/report/detail/` + row.id
                  })
                "
              >查看任务进度</el-button>
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
import Storage from "store";
import Pagination from "@/components/common/pagination";
import Request from "../../services/api/request.js";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "workTask",
  components: { Pagination },
  data() {
    return {
      releaseTimeFrom: "",
      releaseTimeTo: "",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      isShowAddButton: null,
      isShowEditButton: null,
      tableData: []
    };
  },
  created() {
    this.isShowAddButton = Storage.get("authList").find(
      x => x.privilegeCode == "addWorkTask"
    )
      ? true
      : false;
    this.isShowEditButton = Storage.get("authList").find(
      x => x.privilegeCode == "addWorkTaskReport"
    )
      ? true
      : false;
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      if (this.releaseTimeTo) {
        this.releaseTimeTo = new Date(this.releaseTimeTo);
        // releaseTimeTo.setDate(releaseTimeTo.getDate() + 1);
        var toDate = new Date(this.releaseTimeTo.getFullYear(),
                this.releaseTimeTo.getMonth(),
                this.releaseTimeTo.getDate(),
                23, 59, 59
              );
      }
      Request()
        .get("/api/work_task/all", {
          fromDate: this.releaseTimeFrom,
          toDate: toDate,
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
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    }
  }
};
</script>

<style scoped></style>
