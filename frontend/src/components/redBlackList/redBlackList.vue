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
            ></el-option>
          </el-select>
          <el-button-group class="margin-left-20" v-if="!isShowAddButton">
            <el-button type="primary" plain size="medium" :disabled="tableData.length==0 || tableData[0].publishStatus>0" @click="setPublish(1)">公示</el-button>
            <el-button type="info" plain size="medium" :disabled="tableData.length==0 || tableData[0].publishStatus<1" @click="setPublish(0)">取消</el-button>
          </el-button-group>
        </div>
        <el-container>
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="rowIndex"
            v-loading="listLoading"
          >
            <el-table-column
              :formatter="order"
              label="序号"
              width="180"
            ></el-table-column>
            <el-table-column label="企业名称" v-if="isShowAddButton">
              <template slot-scope="{ row }">
                {{ filterCompnay(row.creditCode) }}
              </template>
            </el-table-column>
            <el-table-column label="名称">
              <template slot-scope="{ row }" v-if="!isShowAddButton">
                {{ filterCompnay(row.creditCode) }}
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
                {{ row.gradeTime | formatDate }}
              </template>
            </el-table-column>
            <el-table-column
              prop="gradeUnit"
              label="评级单位"
            ></el-table-column>
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
import Storage from "store";
import Request from "../../services/api/request.js";
import Auth from "@/services/authentication/auth.js";
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
      total: 0,
      options: [
        {
          value: "全部",
          label: ""
        }
      ],
      activeTabName: "first",
      township: [{ id: -1, name: "全部" }],
      currTown: -1,
      status: 1,
      nowGrade: "A",
      tableData: [],
      companyProduction: [],
      isShowAddButton: null,
      colors: { 1: "#f00", 2: "#F7BA2A", 3: "#0f0" }
    };
  },
  created() {
    this.getTown();
    this.getList();
    this.getCompanyProduction();
    this.isShowAddButton = Storage.get("authList").find(
      x => x.privilegeCode == "addTrainingFunds"
    )
      ? true
      : false;
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
      let newStatus = this.activeTabName === "first" ? 1 : 2;
      if (this.status !== newStatus) {
        this.status = newStatus;
        this.page.pageIndex = 1;
        this.nowGrade = this.status === 1 ? "A" : "C";
      }
      Request()
        .get("/api/company_credit_grade/all", {
          approvalStatus: 2,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          townId: this.currTown,
          nowGrade: this.nowGrade,
          sortBy: "creditGradeId",
          publishStatus : this.isShowAddButton? 1 : -1
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
    setPublish(val) {
       let newStatus = this.activeTabName === "first" ? 1 : 2;
      if (this.status !== newStatus) {
        this.status = newStatus;
        this.nowGrade = this.status === 1 ? "A" : "C";
      }
       Request()
        .put("/api/company_credit_grade/set_publish_status?townId="+this.currTown +
              "&nowGrade=" +
              this.nowGrade + 
              "&publishStatus=" + val)
        .then(response => {
          this.getList();
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
    }
  }
};
</script>

<style scoped></style>
