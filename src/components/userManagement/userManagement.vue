<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button
          size="small"
          type="primary"
          plain
          v-on:click="$router.push(`/userManagement/create`)"
          class="no-margin-left"
          >添加用户</el-button
        >
      </div>
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
      <el-container>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          v-loading="listLoading"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号"></el-table-column>
          <el-table-column prop="contactName" label="名称"></el-table-column>
          <el-table-column
            prop="contactPerson"
            label="联系人"
          ></el-table-column>
          <el-table-column prop="userId" label="登录名"></el-table-column>
          <el-table-column prop="userType" label="角色">
            <template slot-scope="{ row }">{{
              userTypeLsit[row.userType]
            }}</template>
          </el-table-column>
          <el-table-column
            prop="creditCode"
            label="统一社会信用代码"
          ></el-table-column>
          <el-table-column
            label="操作"
            class-name="text-center"
            v-if="loggedinUserType === 2"
            width="300"
          >
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="primary"
                v-if="row.userType === 3"
                plain
                class="no-margin-left"
                v-on:click="
                  $router.push({
                    path: `/userManagement/edit/${row.id}`
                  })
                "
                >管理</el-button
              >
              <el-button
                size="small"
                type="success"
                plain
                v-if="row.userType === 3"
                v-on:click="
                  $router.push({
                    path: `/userManagement/changePwd/${row.id}`
                  })
                "
                >修改密码</el-button
              >
              <el-button
                size="small"
                v-if="row.userType === 3"
                type="danger"
                v-on:click="confirmDelete(`${row.id}`)"
                plain
                >删除</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            class-name="text-center"
            width="300"
            v-if="loggedinUserType === 1 || loggedinUserType === 0"
          >
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="primary"
                plain
                v-on:click="
                  $router.push({
                    path: `/userManagement/edit/${row.id}`
                  })
                "
                >管理</el-button
              >
              <el-button
                size="small"
                type="success"
                plain
                v-on:click="
                  $router.push({
                    path: `/userManagement/changePwd/${row.id}`
                  })
                "
                >修改密码</el-button
              >
              <el-button
                size="small"
                type="danger"
                v-on:click="confirmDelete(`${row.id}`)"
                plain
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
          @pagination="getData"
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
  name: "userManagement",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      dialogVisible: false,
      total: 0,
      tableData: [],
      listLoading: false,
      companyProduction: null,
      userTypeLsit: { 1: "市级管理员", 2: "乡镇管理员", 3: "普通用户" },
      loggedinUserType: ""
    };
  },
  created() {
    this.getData();
    // this.loggedinUserType = Auth().user().userType;
  },
  methods: {
    getData() {
      this.listLoading = true;
      Request()
        .get("/api/user/all", {
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
    filterCompnay(id) {
      let company = this.companyProduction.find(x => x.companyId === id);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
    confirmDelete(id) {
      this.dialogVisible = true;
      this.selectedId = id;
    },
    handleDelete() {
      this.dialogVisible = false;
      this.listLoading = true;
      Request()
        .delete("/api/user/delete/" + this.selectedId)
        .then(response => {
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
          this.getData();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss"></style>
