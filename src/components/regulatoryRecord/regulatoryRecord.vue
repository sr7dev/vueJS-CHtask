<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">监管记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-button
          type="primary"
          plain
          v-if="!companyId && (loggedinUserType === 2 || loggedinUserType === 0)"
          v-on:click="$router.push(`/regulatoryRecord/create`)"
        >添加监管记录</el-button>
        <div v-else-if="companyId" class="fixed-value">
          <p v-if="filterCompanyName(companyId)">{{ filterCompanyName(companyId) }}</p>
          <p v-else>没有数据</p>
        </div>
        <el-button
          type="primary"
          v-on:click="$router.push(`/commonWords`)"
          plain
          v-if="!companyId"
        >常用语管理</el-button>
        <el-button type="primary" plain v-if="!companyId">扫码下载客户端</el-button>
        <el-button type="primary" plain v-if="!companyId">说明书下载</el-button>
        <div class="special-container" style="margin-left:auto">
          <el-button
            type="success"
            icon="el-icon-plus"
            v-if="isShowCheckbox != 0"
            plain
            @click="actionConfirm(1)"
          >添加到专项</el-button>
          <el-button
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
          >专项1:绿色优质农产品生产基地</el-checkbox>
        </div>
      </div>
      <el-dialog :visible.sync="alert_dialogVisible" width="30%" modal>
        <span>
          <i class="el-icon-warning">&nbsp;请选择 !!!</i>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="alert_dialogVisible = false" type="primary" plain>取消</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="confirm_dialogVisible" width="30%" modal>
        <span>
          <i class="el-icon-warning">&nbsp;继续？请再次检查</i>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="confirm_dialogVisible = false" type="primary" plain>取消</el-button>
          <el-button :type="btnColor" @click="updateSelectedRows()" plain>确认</el-button>
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
          <el-table-column label width="35" v-if="isShowCheckbox != 0">
            <template slot-scope="{ row }">
              <el-checkbox style="margin-left:auto" @change="changeCheckStatus(row.id)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
          <el-table-column prop="createTime" label="日期" width="100">
            <template slot-scope="{ row }">
              {{
              row.createTime | formatDate
              }}
            </template>
          </el-table-column>
          <el-table-column prop="township" label="乡镇" width="70">
            <template slot-scope="{ row }">
              {{
              filterTownship(row.townId)
              }}
            </template>
          </el-table-column>
          <el-table-column prop="unitinspec" label="受检单位">
            <template slot-scope="{ row }">
              {{
              filterCompanyName(row.companyId)
              }}
            </template>
          </el-table-column>
          <el-table-column prop="inspector" label="检查人"></el-table-column>
          <el-table-column prop="conclusion" label="结论" width="70">
            <template slot-scope="{ row }">{{ row.conclusion == 1 ? "合格" : "不合格" }}</template>
          </el-table-column>
          <el-table-column prop="otherProblems" label="其他" width="80"></el-table-column>
          <el-table-column prop="scenePhotos" label="照片" width="70" class-name="text-center">
            <template slot-scope="{ row }">{{ getCountElement(row.scenePhotos, row.sign) }}</template>
          </el-table-column>
          <el-table-column prop="sign" label="确认" width="70" class-name="text-center">
            <template slot-scope="{ row }">{{ checkSign(row.sign) }}</template>
            <!-- <template slot-scope="{ row }">{{ getCountElement(row.sign) }}</template> -->
          </el-table-column>
          <el-table-column label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button
                type="success"
                plain
                v-on:click="
                  $router.push({
                    path: `/regulatoryRecord/${row.id}`,
                    query: {
                      company: filterCompanyName(row.companyId),
                      township: filterTownship(row.townId)
                    }
                  })
                "
              >查看</el-button>
              <el-button
                type="danger"
                v-on:click="$router.push(`/regulatoryRecord/edit/${row.id}`)"
                plain
              >整改记录</el-button>
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
  name: "regulatoryRecord",
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
      companyList: [],
      companyId: 0,
      township: [],
      isShowCheckbox: 0,
      selectedRows: [],
      alert_dialogVisible: false,
      confirm_dialogVisible: false,
      btnColor: "",
      action: ""
    };
  },
  created() {
    this.companyId = this.$route.params.id;
    this.getData();
    this.getTown();
    this.getCompanyProduct();
    this.loggedinUserType = Auth().user().attrs.userType;
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
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    getCountElement(val1, val2) {
      if (!val1 && !val2) return 0;
      else return val1.split(",").length + val2.split(",").length;
    },
    checkSign(val) {
      if (!val) return "";
      else return "签名";
    },
    changeCheckStatus(id) {
      let index = this.selectedRows.indexOf(id);
      if (index > -1) this.selectedRows.splice(index, 1);
      if (event.target.checked) {
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
            "/api/supervision_record/update_special_flag/" +
              this.selectedRows[index] +
              "?specialFlag=" +
              this.action
          )
          .then(response => {
            setTimeout(() => {
              this.listLoading = false;
            }, 0.5 * 1000);
            this.selectedRows = [];
            this.isShowCheckbox = 0;
            this.getData();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    showCheckbox() {
      if (!event.target.checked) {
        this.selectedRows = [];
      }
    }
  }
};
</script>

<style lang="scss">
@import "./regulatoryRecord.scss";
</style>