<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator=" ">
        <el-breadcrumb-item class="actived">红黑名单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-tabs v-model="activeTabName" type="border-card" @tab-click="getList">
        <el-tab-pane label="红名单" name="first"></el-tab-pane>
        <el-tab-pane label="黑名单" name="second"></el-tab-pane>

        <div style="margin-bottom:20px">
          <label style="margin-right: 30px">乡镇</label>
          <el-select v-model="currTown" placeholder="Select" @change="getList">
            <el-option
              v-for="item in township"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <el-container>
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="rowIndex"
          >
            <el-table-column :formatter="order" label="序号" width="180">
            </el-table-column>
            <el-table-column label="企业名称">
              <template slot-scope="{ row }">{{
                filterCompnay(row.creditCode)
              }}</template>
            </el-table-column>
            <el-table-column label="现信用评级">
              <template slot-scope="{ row }">{{
                getGrade(row.nowGrade)
              }}</template>
            </el-table-column>
            <el-table-column prop="gradeTime" label="评级时间">
            </el-table-column>
            <el-table-column prop="gradeUnit" label="评级单位">
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
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/common/pagination";
import Request from "../../services/api/request.js";

export default {
  name: "redBlackList",
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 100,
      options: [
        {
          value: "全部",
          label: ""
        }
      ],
      activeTabName: "first",
      township: [{ id: 0, name: "全部" }],
      currTown: 0,
      status: 1,
      tableData: [],
      companyProduction: []
    };
  },
  created() {
    this.getTown();
    this.getList();
    this.getCompanyProduction();
  },
  methods: {
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
    getList() {
      this.listLoading = true;
      this.status = this.activeTabName === "first" ? 1 : 2;
      Request()
        .get("/api/blacklist/all", {
          blacklistType: this.status,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          townId: this.currTown
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
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    goAdd() {
      this.$router.push({ path: "addRedBlackList" });
    },
    filterCompnay(credit) {
      let company = this.companyProduction.find(x => x.creditCode === credit);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
    getGrade(grade) {
      switch (grade) {
        case "A":
          return "A级（守信）";
        case "B":
          return "B级（基本守信）";
        case "C":
          return "C级（失信）";
        default:
          return "A级（守信）";
      }
    }
  }
};
</script>

<style scoped>
</style>