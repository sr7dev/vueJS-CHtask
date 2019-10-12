<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button type="primary" plain v-on:click="$router.push(`/userManagement/create`)">添加用户</el-button>
      </div>
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
          <el-table-column prop="contactPerson" label="联系人"></el-table-column>
          <el-table-column prop="userId" label="登录名"></el-table-column>
          <el-table-column prop="userType" label="角色">
            <template slot-scope="{ row }">{{ userTypeLsit[row.userType] }}</template>
          </el-table-column>
          <el-table-column prop="creditCode" label="统一社会信用代码"></el-table-column>
          <el-table-column label="操作" class-name="text-center" v-if="loggedinUserType === 2">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                v-if="row.userType === 3"
                plain
                v-on:click="
                  $router.push({
                    path: `/userManagement/edit/${row.id}`
                  })
                "
              >管理</el-button>
              <el-button
                type="success"
                plain
                v-if="row.userType === 3"
                v-on:click="
                  $router.push({
                    path: `/userManagement/changePwd/${row.id}`
                  })
                "
              >修改密码</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" class-name="text-center" v-if="loggedinUserType === 1">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                plain
                v-on:click="
                  $router.push({
                    path: `/userManagement/edit/${row.id}`
                  })
                "
              >管理</el-button>
              <el-button
                type="success"
                plain
                v-on:click="
                  $router.push({
                    path: `/userManagement/changePwd/${row.id}`
                  })
                "
              >修改密码</el-button>
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
          layout="prev, pager, next, sizes, jumper"
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
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {
    getData() {
      this.listLoading = true;
      Request()
        .get("/api/user/all", {
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
</style>