<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>专项：绿色优质农产品生产基地</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form>
        <div class="row year-select-panel">
          <el-form-item label="年度">
            <el-select v-model="value1">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="cate-content-panel">
          <div class="cate-item-panel">
            <el-form-item label="巡查">({{tableData.length}})</el-form-item>
            <el-container>
              <el-table
                style="width: 100%"
                :data="tableData"
                :row-class-name="rowIndex"
                v-loading="listLoading"
                highlight-current-row
              >
                <el-table-column prop="createTime" label="日期">
                  <template slot-scope="{ row }">{{ row.createTime | formatDate }}</template>
                </el-table-column>
                <el-table-column prop="township" label="乡镇">
                  <template slot-scope="{ row }">
                    {{
                    filterTownship(row.townId)
                    }}
                  </template>
                </el-table-column>
                <el-table-column prop="inspector" label="检查人"></el-table-column>
                <el-table-column prop="unitinspec" label="检查单位">
                  <template slot-scope="{ row }">
                    {{
                    filterCompanyName(row.companyId)
                    }}
                  </template>
                </el-table-column>
              </el-table>
            </el-container>
          </div>
          <div class="cate-item-panel">
            <el-form-item label="检测"></el-form-item>
            <el-container>
              <el-table
                style="width: 100%"
                :data="detectTableData"
                :row-class-name="rowIndex"
                highlight-current-row
              >
                <el-table-column label="日期"></el-table-column>
                <el-table-column label="项目"></el-table-column>
                <el-table-column label="样品"></el-table-column>
                <el-table-column label="结果"></el-table-column>
              </el-table>
            </el-container>
          </div>
          <div class="cate-item-panel">
            <div style="display: flex; justify-content: space-between;">
              <el-form-item label="培训记录"></el-form-item>
              <el-button 
                type="danger" 
                plain
                v-if="loggedinUserType === 1"
              >删除</el-button>
              <el-button 
                type="danger" 
                plain
                v-if="loggedinUserType === 2"
              >添加附件</el-button>
            </div>
            <el-container>
              <el-table
                style="width: 100%"
                :data="trainTableData"
                :row-class-name="rowIndex"
                highlight-current-row
              >
                <el-table-column label="日期"></el-table-column>
                <el-table-column label="乡镇"></el-table-column>
                <el-table-column label="文件"></el-table-column>
              </el-table>
            </el-container>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import Request from "../../services/api/request.js";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "specialCategory",
  data() {
    return {
      loggedinUserType: null,
      total: 0,
      tableData: [],
      trainTableData: [],
      detectTableData: [],
      options: [
        { value: "1", label: "2017" },
        { value: "2", label: "2018" }
      ],
      listLoading: true,
      companyList: [],
      companyId: 0,
      township: [],
      value1: 0
    };
  },
  created() {
    this.companyId = 0;
    this.getList();
    this.getTown();
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {    
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/supervision_record/all", {
          companyId: this.companyId
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
    }
  }
};
</script>

<style lang="scss">
.year-select-panel {
    width: 100%;
    margin-top: 2rem;
}
.cate-content-panel {
    display: flex;
    justify-content: center;
}
.cate-item-panel {
  width: 100%;
  margin: .2rem;
}
</style>