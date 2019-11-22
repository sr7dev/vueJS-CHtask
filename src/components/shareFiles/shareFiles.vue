<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">共享文件</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox" v-if="isShowAddButton">
        <el-row class="w-100">
          <el-col :span="3">
            <el-button
              size="small"
              type="primary"
              v-on:click="$router.push(`/shareFiles/create`)"
              plain
              >新建文件夹</el-button
            >
          </el-col>
        </el-row>
      </div>

      <el-container>
        <el-dialog :visible.sync="dialogVisible" width="30%" modal>
          <span>
            <i class="el-icon-warning">&nbsp;你确定你要删除?</i>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button
              size="small"
              @click="dialogVisible = false"
              type="primary"
              plain
              >取消</el-button
            >
            <el-button size="small" @click="handleDelete" type="success" plain
              >确认</el-button
            >
          </span>
        </el-dialog>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column
            :formatter="order"
            label="序号"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="fileName"
            label="文件名"
            class-name="text-center"
          ></el-table-column>
          <el-table-column prop="title" label="修改时间">
            <template slot-scope="{ row }">{{
              row.createTime | formatDate
            }}</template>
          </el-table-column>
          <el-table-column prop="creater" label="创建者"></el-table-column>
          <el-table-column label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="success"
                plain
                v-on:click="
                  $router.push({
                    path: `/shareFiles/detail/` + row.id
                  })
                "
                >查看</el-button
              >
              <el-button
                size="small"
                type="primary"
                plain
                v-if="isShowAddButton"
                v-on:click="
                  $router.push({
                    path: `/shareFiles/edit/` + row.id,
                    query: {
                      id: row.id
                    }
                  })
                "
                >修改</el-button
              >
              <el-button
                size="small"
                type="danger"
                plain
                v-if="isShowAddButton"
                @click="confirmDelete(row.id)"
                >删除</el-button
              >
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
      tableData: [],
      isShowAddButton: null,
      dialogVisible: false,
      selectedId: null
    };
  },
  created() {
    this.getList();
    this.isShowAddButton = Storage.get("authList").find(
      x => x.privilegeCode == "addShareFiles"
    )
      ? true
      : false;
  },
  methods: {
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/shareFiles/all", {
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
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    confirmDelete(id) {
      this.dialogVisible = true;
      this.selectedId = id;
    },
    handleDelete() {
      this.dialogVisible = false;
      this.listLoading = true;
      Request()
        .delete("/api/shareFiles/delete/" + this.selectedId)
        .then(response => {
          this.listLoading = false;
          this.getList();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped></style>
