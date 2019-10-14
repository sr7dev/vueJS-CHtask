<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">种子管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button 
          type="primary" 
          plain v-on:click="$router.push(`/seed/upload`)"
          v-if="loggedinUserType === 2"
        >上传种子</el-button>
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
          <el-table-column prop="companyId" label="企业名称">
            <template slot-scope="{ row }">{{filterCompany( row.companyId )}}</template>
          </el-table-column>
          <el-table-column label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button
                type="success"
                plain
                v-on:click="
                  $router.push({
                    path: `/seed/detail/${row.id}`, query:{
                      cityId:row.cityId,
                      townId: row.townId,
                      villageId:row.villageId
                    }
                  })
                "
              >种子</el-button>
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
  name: "seed",
  components: { Pagination },
  data() {
    return {
      loggedinUserType: null,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      tableData: [],
      listLoading: false,
      companyProduction: null
    };
  },
  created() {
    this.getData();
    this.getCompanyProduction();
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {
    getData() {
      this.listLoading = true;
      Request()
        .get("/api/seed/all", {
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
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    filterCompany(id) {
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