<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">信用评级</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox" v-if="loggedinUserType !== 3">
        <div class="select_label no-margin-left">乡镇</div>
        <el-select placeholder v-model="currTown" @change="getList">
          <el-option v-for="town in township" :key="town.id" :label="town.name" :value="town.id"></el-option>
        </el-select>
        <div class="select_label">状态</div>
        <el-select v-model="status" placeholder="请选择" @change="getList">
          <el-option v-for="(item, index) in appStatus" :key="item" :label="item" :value="index"></el-option>
        </el-select>
        <div class="select_label">
          <el-button size="small" disabled type="primary" plain>同步数据</el-button>
        </div>
      </div>

      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          fit
          style="width: 100%;"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
          <el-table-column label="名称" width="150">
            <template slot-scope="{ row }">
              {{
              filterCompnay(row.creditCode)
              }}
            </template>
          </el-table-column>
          <el-table-column label="原信用评级">
            <template slot-scope="{ row }">
              <el-rate
                :value="getGradeString(row.originalGrade)"
                :max="getGradeString(row.originalGrade)"
                :texts="['C级（失信）', 'B级（基本守信）', 'A级（守信）']"
                :colors="colors"
                disabled
                show-text
              ></el-rate>
            </template>
          </el-table-column>
          <el-table-column label="现信用评级">
            <template slot-scope="{ row }">
              <el-rate
                :value="getGradeString(row.nowGrade)"
                :max="getGradeString(row.nowGrade)"
                :texts="['C级（失信）', 'B级（基本守信）', 'A级（守信）']"
                :colors="colors"
                disabled
                show-text
              ></el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="gradeTime" label="评级时间">
            <template slot-scope="{ row }">
              {{
              row.gradeTime | formatDate
              }}
            </template>
          </el-table-column>
          <el-table-column prop="creditAvailableStart" label="评级有效期">
            <template slot-scope="{ row }">
              {{ row.creditAvailableStart | formatDate }}至{{
              row.creditAvailableEnd | formatDate
              }}
            </template>
          </el-table-column>
          <el-table-column prop="gradeUnit" label="评级单位"></el-table-column>
          <!-- <el-table-column prop="approvalStatus" label="状态" width="100"></el-table-column> -->
          <el-table-column label="状态" width="100">
            <template slot-scope="{ row }">
              {{
              getStatus(row.approvalStatus)
              }}
            </template>
          </el-table-column>
          <el-table-column label="操作" v-if="loggedinUserType !== 3" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button
                size="small"
                v-on:click="$router.push(`/creditRating/${row.creditGradeId}`)"
                plain
                type="success"
                v-if="loggedinUserType === 1 || loggedinUserType === 0"
              >查看</el-button>
              <el-button
                size="small"
                plain
                type="success"
                v-if="loggedinUserType === 2 || loggedinUserType === 0"
                v-on:click="
                  $router.push({
                    path: `/creditRating/edit/${row.creditGradeId}`,
                    query: { company: filterCompnay(row.creditCode) }
                  })"
              >修改评级</el-button>
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
import Pagination from "@/components/common/pagination";
import Request from "../../services/api/request.js";
import Auth from "@/services/authentication/auth.js";

export default {
  name: "creditRating",
  components: { Pagination },
  data() {
    return {
      township: [{ id: 0, name: "全部" }],
      currTown: 0,
      appStatus: ["全部", "待审批", "已同意", "已拒绝"],
      status: 0,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      companyProduction: [],
      listLoading: true,
      total: 100,
      tableData: [],
      loggedinUserType: null,
      colors: { 1: "#f00", 2: "#F7BA2A", 3: "#0f0" }
    };
  },
  created() {
    this.getTown();
    this.getList();
    this.getCompanyProduction();
    this.loggedinUserType = Auth().user().userType;
  },
  methods: {
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
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
      Request()
        .get("/api/company_credit_grade/all", {
          approvalStatus: this.status - 1,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          townId: this.currTown,
          sortBy: "creditGradeId"
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
    getStatus(status) {
      let changedStatus = parseInt(status);
      return this.appStatus[changedStatus + 1];
    },
    filterCompnay(credit) {
      let company = this.companyProduction.find(x => x.creditCode === credit);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
    getGradeString(grade) {
      let strGrade = "";
      switch (grade) {
        case "A":
          strGrade = 3;
          break;
        case "B":
          strGrade = 2;
          break;
        case "C":
          strGrade = 1;
          break;
        default:
          strGrade = 3;
      }
      return strGrade;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    }
  }
};
</script>
