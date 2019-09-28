<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">企业信用档案</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="select_label">乡镇</div>
        <el-select v-model="currTown" placeholder="请选择" @change="getList()">
          <el-option v-for="item in township" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <div class="select_label">类型</div>
        <el-radio v-model="bTypes" label="1" v-on:change="getList(true)">是</el-radio>
        <el-radio v-model="bTypes" label="2" v-on:change="getList(true)">否</el-radio>
        <div class="select_label">行政许可</div>
        <el-select v-model="public_license" placeholder="请选择" @change="onSelectPubLicense">
          <el-option
            v-for="item in publicOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="select_label">行政处罚</div>
        <el-select v-model="public_punish" placeholder="请选择" @change="onSelectPubPunish">
          <el-option
            v-for="item in publicOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="select_label">
          <el-button type="outline-primary" v-on:click="getList()" disabled>导入</el-button>
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
          <el-table-column label="企业名称" width="150">
            <template slot-scope="{row}">{{filterCompnay(row.creditCode)}}</template>
          </el-table-column>
          <el-table-column prop="creditCode" label="统一社会信用代码"></el-table-column>
          <el-table-column prop="public_license" label="行政许可信息">
            <template slot-scope="{row}">
              <el-button
                v-on:click="$router.push(`/corporateCreditFile/adminLicenseInfo/${row.creditCode}`)"
              >行政许可信息</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="public_punish" label="行政处罚信息">
            <template slot-scope="{row}">
              <el-button
                v-on:click="$router.push(`/corporateCreditFile/adminPenaltyInfo/${row.creditCode}`)"
              >行政许可信息</el-button>
            </template>
          </el-table-column>
          <el-table-column label="评级信息">
            <template slot-scope="{row}">{{getGrade(row)}}</template>
          </el-table-column>
          <el-table-column label="三品一标认证" width="200">
            <template slot-scope="{row}">
              <el-button v-on:click="$router.push(`/creditRating/${row.creditCode}`)">三品一标</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
      <div class="pageBox">
        <pagination
          v-show="total>0"
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

export default {
  name: "creditRating",
  components: { Pagination },
  data() {
    return {
      township: [{ id: 0, name: "全部" }],
      publicOptions: [
        { id: 0, name: "全部" },
        { id: 1, name: "有" },
        { id: 2, name: "无" }
      ],
      currTown: 0,
      public_license: 0,
      public_punish: 0,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      bTypes: 0,
      status: 0,
      total: 100,
      tableData: [],
      companyProduction: [],
      gradData: []
    };
  },
  mounted() {
    this.getTown();
    this.getList();
    this.getCompanyProduction();
  },
  methods: {
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    onSelectPubLicense() {
      this.getList();
    },
    onSelectPubPunish() {
      this.getList();
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
    getList(update = false) {
      this.listLoading = true;
      Request()
        .get("/api/company_production/all", {
          companyType: this.bTypes,
          approvalStatus: this.status - 1,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          townId: this.currTown
        })
        .then(response => {
          var tmpData = response;
          if (this.publicOptions == 1) {
            tmpData = tmpData.filter(function(licesnse) {
              return licesnse.public_license > 0;
            });
          } else if (this.public_license == 2) {
            tmpData = tmpData.filter(function(licesnse) {
              return licesnse.public_license == 0;
            });
          }
          if (this.public_punish == 1) {
            tmpData = tmpData.filter(function(punish) {
              return punish.public_punish > 0;
            });
          } else if (this.public_punish == 2) {
            tmpData = tmpData.filter(function(punish) {
              return punish.public_punish == 0;
            });
          }
          this.tableData = tmpData;
          this.total = this.tableData.length;

          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterCompnay(credit) {
      let company = this.companyProduction.find(x => x.creditCode === credit);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
    getGrade(dataTable) {
      let strGrade = "";
      Request()
        .get("/api/company_credit_grade/all", {
          approvalStatus: this.status - 1,
          creditCode: dataTable.creditCode,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          townId: this.currTown
        })
        .then(response => {
          this.gradData = response;
          let nSIze = this.gradData.length;
          strGrade = this.getGradeString(this.gradData[nSIze - 1].nowGrade);
          dataTable.nowGrade = strGrade;
        })
        .catch(error => {
          console.log(error);
          return "";
        });

      return dataTable.nowGrade;
    },
    getGradeString(grade) {
      let strGrade = "";
      switch (grade) {
        case "A":
          strGrade = "A级（守信）";
          break;
        case "B":
          strGrade = "B级（基本守信）";
          break;
        case "C":
          strGrade = "C级（失信）";
          break;
        default:
          strGrade = "A级（守信）";
      }
      return strGrade;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./corporateCreditFile.scss";
</style>