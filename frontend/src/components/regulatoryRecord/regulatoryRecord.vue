<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator=" ">
        <el-breadcrumb-item :to="{ path: '/' }" class="actived">监管记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button
          type="primary"
          plain
          v-if="!companyId"
          v-on:click="$router.push(`/regulatoryRecord/create`)"
        >添加监管记录</el-button>
        <div v-else class="fixed-value">
          <p v-if="filterCompanyName(companyId)">{{filterCompanyName(companyId)}}</p>
          <p v-else>没有数据</p>
        </div>
        <el-button type="primary" plain v-if="!companyId" v-on:click="$router.push(`/commonWords`)">常用语管理</el-button>
        <el-button type="primary" plain v-if="!companyId">扫码下载客户端</el-button>
        <el-button type="primary" plain v-if="!companyId">说明书下载</el-button>
      </div>

      <el-container>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="rowIndex"
          v-loading="listLoading"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
          <el-table-column prop="createTime" label="日期" width="100"></el-table-column>
          <el-table-column prop="township" label="乡镇" width="70">
            <template slot-scope="{row}">{{filterTownship(row.townId)}}</template>
          </el-table-column>
          <el-table-column prop="unitinspec" label="受检单位">
            <template slot-scope="{row}">{{filterCompanyName(row.companyId)}}</template>
          </el-table-column>
          <el-table-column prop="inspector" label="检查人"></el-table-column>
          <el-table-column prop="conclusion" label="结论" width="70"></el-table-column>
          <el-table-column prop="otherProblems" label="其他" width="80"></el-table-column>
          <el-table-column prop="scenePhotos" label="照片" width="70"></el-table-column>
          <el-table-column prop="sign" label="确认" width="70"></el-table-column>
          <el-table-column prop="confirm" label="操作">
            <template slot-scope="{row}">
              <el-button
                type="success"
                plain
                v-on:click="$router.push({path:`/regulatoryRecord/${row.id}`, query: {company:filterCompanyName(row.companyId),township:filterTownship(row.townId)}})"
              >查看</el-button>
              <el-button
                type="danger"
                v-on:click="$router.push(`/regulatoryRecord/edit/${row.id}`)"
                plain
              >整改记录</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="yield" label="专利1" align="center" width="100">
            <template>
              <i class="el-icon-check"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
      <div class="pageBox">
        <Pagination
          v-show="total>0"
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
export default {
  name: "regulatoryRecord",
  components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 100,
      tableData: [],
      listLoading: false,
      companyList: [],
      companyId: 0,
      township: []
    };
  },
  created() {
    this.companyId = this.$route.params.id;
    this.getData();
    this.getTown();
    this.getCompanyProduct();
  },
  methods: {
    //分页数量改变
    getData() {
      this.listLoading = true;
      Request()
        .get("/api/supervision_record/all", {
          companyId: this.companyId,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize
        })
        .then(response => {
          this.tableData = response;
          this.total = this.tableData.length;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTown() {
      Request()
        .get("/api/town/all")
        .then(response => {
          this.township = this.township.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCompanyProduct() {
      Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyList = this.companyList.concat(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterTownship(townId) {
      let town = this.township.find(x => x.id === townId);
      if (town) {
        return town.name;
      } else {
        return "";
      }
    },
    filterCompanyName(companyId) {
      let company = this.township.find(x => x.id === companyId);
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
@import "./regulatoryRecord.scss";
</style>