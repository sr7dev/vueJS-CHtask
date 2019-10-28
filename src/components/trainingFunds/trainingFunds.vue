<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">培训经费管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox" v-if="loggedinUserType === 2 || loggedinUserType === 0">
        <div class="iptBox w-100">
          <div class="filter-item">
            <el-button
              size="small"
              type="primary"
              v-on:click="$router.push(`/trainingFunds/add`)"
              plain
            >添加</el-button>
          </div>
          <div class="special-container inline-block-IE float-right-IE" style="margin-left:auto">
            <el-button
              size="small"
              type="success"
              icon="el-icon-plus"
              v-if="isShowCheckbox != 0"
              plain
              @click="actionConfirm(1)"
            >添加到专项</el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-minus"
              v-if="isShowCheckbox != 0"
              plain
              @click="actionConfirm(0)"
              style="margin-right:10px"
            >从专项1移除</el-button>
            <el-checkbox
              v-model="isShowCheckbox"
              true-label="1"
              false-label="0"
              @change="showCheckbox"
              class="margin-top-10"
            >专项1:绿色优质农产品生产基地</el-checkbox>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="alert_dialogVisible" width="30%" modal>
        <span>
          <i class="el-icon-warning">&nbsp;请选择 !!!</i>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="alert_dialogVisible = false" type="primary" plain>取消</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="confirm_dialogVisible" width="30%" modal>
        <span>
          <i class="el-icon-warning">&nbsp;继续？请再次检查</i>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="confirm_dialogVisible = false" type="primary" plain>取消</el-button>
          <el-button size="small" :type="btnColor" @click="updateSelectedRows()" plain>确认</el-button>
        </span>
      </el-dialog>
      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column label width="35" v-if="isShowCheckbox != 0">
            <template slot-scope="{ row }">
              <el-checkbox
                style="margin-left:auto"
                @change="changeCheckStatus(row.id)"
                true-label="1"
                false-label="0"
                v-model="checked[row.id]"
              ></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column :formatter="order" label="序号"></el-table-column>
          <el-table-column prop="projectName" label="项目名称"></el-table-column>
          <el-table-column prop="appliedAmount" label="申请金额">
            <template slot-scope="{ row }">{{ row.appliedAmount }}元</template>
          </el-table-column>
          <el-table-column prop="proposer" label="申请人"></el-table-column>
          <el-table-column prop="companyId" label="所在单位">
            <template slot-scope="{ row }">{{ filterCompnay(row.companyId) }}</template>
          </el-table-column>
          <!-- <el-table-column prop="status" label="状态">
          </el-table-column>-->
          <el-table-column label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="success"
                plain
                v-on:click="$router.push({path: `/trainingFunds/view/${row.id}`})"
              >查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="yield" label="专利1" align="center" width="100">
            <template slot-scope="{ row }">
              <i class="el-icon-check" v-if="row.specialFlag"></i>
            </template>
          </el-table-column>
        </el-table>
      </el-container>
      <div class="pageBox">
        <Pagination
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
  name: "jobDefinition",
  components: { Pagination },
  data() {
    return {
      projectName: "",
      appliedAmount: 0,
      proposer: "",
      createTime: "",
      companyId: 0,
      status: "",
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: false,
      total: 0,
      tableData: [],
      loggedinUserType: null,
      companyProduction: [],
      appStatus: ["全部", "待审批", "已同意", "已拒绝"],
      isShowCheckbox: 0,
      selectedRows: [],
      alert_dialogVisible: false,
      confirm_dialogVisible: false,
      btnColor: "",
      action: "",
      checked: []
    };
  },
  mounted() {
    this.getCompanyProduction();
    this.getList();
  },
  created() {
    this.loggedinUserType = Auth().user().userType;
  },
  methods: {
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/training_funds/all", {
          createTimeFrom: "",
          createTimeTo: "",
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
    filterCompnay(id) {
      let company = this.companyProduction.find(x => x.companyId === id);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
    changeCheckStatus(id) {
      let index = this.selectedRows.indexOf(id);
      if (index > -1) this.selectedRows.splice(index, 1);
      if (this.checked[id] == 1) {
        this.selectedRows.push(id);
      }
    },
    actionConfirm(action) {
      this.action = action;
      if (!this.selectedRows.length) {
        this.alert_dialogVisible = true;
      } else {
        this.confirm_dialogVisible = true;
        this.btnColor = action > 0 ? "success" : "danger";
      }
    },
    updateSelectedRows() {
      for (let index in this.selectedRows) {
        this.confirm_dialogVisible = false;
        this.listLoading = true;
        Request()
          .put(
            "/api/training_funds/update_special_flag/" +
              this.selectedRows[index] +
              "/" +
              this.action
          )
          .then(response => {
            setTimeout(() => {
              this.listLoading = false;
            }, 0.5 * 1000);
            this.selectedRows = [];
            this.checked = [];
            this.isShowCheckbox = 0;
            this.getList();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    showCheckbox() {
      if (this.isShowCheckbox == 1) {
        this.selectedRows = [];
        this.checked = [];
      }
    }
  }
};
</script>

<style lang="scss">
@import "./trainingFunds.scss";
</style>