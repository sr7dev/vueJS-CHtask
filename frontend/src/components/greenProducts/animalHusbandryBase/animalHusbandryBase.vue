<template>
  <div class="box">
    <el-dialog
      :visible.sync="openDialog"
      width="60%"
      :before-close="handleClose"
    >
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm">
        <el-form-item label="年度：" class="margin-left-10">
          <el-row>
            <el-col :span="4">
              <el-input
                v-model="inYear"
                :rules="[
                  { required: true, message: '请插入', trigger: 'blur' },
                  { type: 'number', message: '插入号码', trigger: 'blur' }
                ]"
                :span="3"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="left-margin flex-box w-100 no-margin-IE">
          <el-row
            v-for="(rowData, index) in dynamicValidateForm.data"
            :key="index"
            class="margin-top-10"
          >
            <el-col :span="1">
              <el-form-item class="margin-left-20">
                <el-checkbox
                  @change="changeCheckStatus(index)"
                  true-label="1"
                  false-label="0"
                  class="form-checkbox"
                  v-model="checked[index]"
                ></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="板块："
                :prop="'data.' + index + '.town'"
                :rules="{ required: true, message: '请插入', trigger: 'blur' }"
                class="margin-left-10"
              >
                <el-input v-model="rowData.town" class="w-80"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="1-6月实绩:"
                :prop="'data.' + index + '.halfYear'"                
                class="margin-left-20"
              >
                <el-input
                  v-model.number="rowData.halfYear"
                  class="w-60"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="全年实绩:"
                :prop="'data.' + index + '.fullYear'"                
                class="margin-left-20"
              >
                <el-input
                  v-model.number="rowData.fullYear"
                  class="w-60"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="margin-left-40 margin-top-20">
            <el-col :span="14">
              <el-button size="small" @click="addFormRow()" type="primary" plain
                >添加</el-button
              >
              <el-button
                size="small"
                @click="deleteSelectedRows()"
                type="danger"
                plain
                >删除</el-button
              >
            </el-col>
            <el-col :span="7" v-show="dynamicValidateForm.data.length > 0">
              <span>插入时间:&nbsp;</span>
              <el-date-picker
                type="date"
                v-model="registerTime"
              ></el-date-picker>
            </el-col>
            <el-col :span="2" v-show="dynamicValidateForm.data.length > 0">
              <el-button
                size="small"
                @click="onSubmit('dynamicValidateForm')"
                type="success"
                plain
                >保存</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="confirm_dialogVisible" width="30%" modal>
      <span>
        <i class="el-icon-warning">&nbsp;继续？请再次检查</i>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="confirm_dialogVisible = false"
          type="primary"
          plain
          >取消</el-button
        >
        <el-button
          size="small"
          type="success"
          @click="updateSelectedRows()"
          plain
          >确认</el-button
        >
      </span>
    </el-dialog>

    <el-container>
      <el-header>镇（街道）、开发区推进高质量发展考核指标数据填报表</el-header>
      <div class="iptBox">
        <el-row>
          <el-col :span="2">
            <el-button
              size="small"
              type="success"
              plain
              v-on:click="showAddDialog()"
              >添加</el-button
            >
          </el-col>
          <el-col :span="6">
            <span>开始日期:&nbsp;</span>
            <el-date-picker
              type="date"
              v-model="registerTimeFrom"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <span>结束日期:&nbsp;</span>
            <el-date-picker
              type="date"
              v-model="registerTimeTo"
            ></el-date-picker>
          </el-col>
          <el-col :span="4">
            <span>年度:&nbsp;</span>
            <el-input
              v-model="searchYear"
              class="w-60"
              @keyup.native="handleChange"
            ></el-input>
          </el-col>
          <el-col :span="1">
            <el-button
              size="small"
              type="primary"
              plain
              v-on:click="changeFilter()"
              class="margin-left-10"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
        v-loading="listLoading"
        highlight-current-row
        :span-method="spanMethod"
      >
        <el-table-column
          :formatter="order"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column prop="town" label="板块"></el-table-column>
        <el-table-column label="绿色优质农产品比重(畜牧)" align="center">
          <el-table-column
            :prop="col.prop"
            :label="col.label"
            v-for="col in columns"
            :key="col.prop"
            align="center"
          ></el-table-column>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<script>
import Request from "@/services/api/request.js";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "animalHusbandryBase",
  props: {
    year: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      inYear: 0,
      searchYear: new Date().getFullYear().toString(),
      openDialog: false,
      columns: [
        {
          prop: "halfYear",
          label: "1-6月实绩"
        },
        {
          prop: "fullYear",
          label: "全年实绩"
        }
      ],
      dynamicValidateForm: {
        data: []
      },
      selectedRows: [],
      confirm_dialogVisible: false,
      checked: [],
      registerTime: new Date().toString("YYYY-MM-DD"),
      registerTimeFrom: new Date(new Date().getFullYear(), 0, 1),
      registerTimeTo: new Date(),
      sendcount: 0,

      alert_dialogVisible: false,
      loggedinUserType: null,

      total: 0,
      tableData: [],
      listLoading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    showAddDialog() {
      this.dynamicValidateForm.data = [];
      this.selectedRows = [];
      this.checked = [];
      this.inYear = Number(new Date().getFullYear());
      this.addFormRow();
      this.openDialog = true;
    },

    handleClose(done) {
      this.$confirm("您确定要关闭此对话框吗？")
        .then(_ => {
          this.getData();
          done();
        })
        .catch(_ => {});
    },

    addFormRow() {
      this.dynamicValidateForm.data.push({
        town: "",
        fullYear: 0,
        halfYear: 0
      });
    },

    deleteSelectedRows() {
      if (this.selectedRows.length) {
        this.selectedRows = this.selectedRows.sort((a, b) => (a > b ? -1 : 1));
        for (let index in this.selectedRows) {
          let checkId = this.dynamicValidateForm.data[this.selectedRows[index]]
            .id;
          if (checkId) this.deletedRows.push(checkId);
          this.checked[this.selectedRows[index]] = false;
          this.dynamicValidateForm.data.splice(this.selectedRows[index], 1);
        }
        this.selectedRows = [];
      }
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.confirm_dialogVisible = true;
        }
      });
    },

    changeCheckStatus(rowIndex) {
      let index = this.selectedRows.indexOf(rowIndex);
      if (index > -1) this.selectedRows.splice(index, 1);
      if (this.checked[rowIndex] == 1) {
        this.selectedRows.push(rowIndex);
      }
    },

    updateSelectedRows() {
      this.confirm_dialogVisible = false;
      this.openDialog = false;
      let updateTime = new Date();
      let createTime = new Date();
      this.listLoading = true;
      this.sendcount = 0;

      this.dynamicValidateForm.data.forEach(item => {
        let formdata = new FormData();
        formdata.append("createTime", createTime.toDateString("YYYY-MM-DD"));
        formdata.append("createUserId", Auth().user().id);
        formdata.append("fullYear", (item.fullYear == undefined || item.fullYear == ""? -1: item.fullYear));
        formdata.append("halfYear", (item.halfYear == undefined || item.halfYear == ""? -1: item.halfYear));
        formdata.append("id", 0);
        formdata.append(
          "registerTime",
          this.registerTime.toString("YYYY-MM-DD")
        );
        formdata.append("town", item.town);
        formdata.append("year", this.inYear);
        formdata.append("updateTime", updateTime.toDateString("YYYY-MM-DD"));
        formdata.append("updateUserId", Auth().user().id);

        Request()
          .post("/api/green/livestock/create", formdata)
          .then(res => {
            this.sendcount++;
            if (this.sendcount === this.dynamicValidateForm.data.length) {
              this.listLoading = false;
              this.getData();
            }
          });
      });
    },

    changeFilter() {
      this.getData();
    },

    handleChange() {
      if (this.searchYear > 1990) {
        this.registerTimeFrom = new Date(this.searchYear, 0, 1);
      }
    },

    getData() {
      this.listLoading = true;
      let toDate = new Date(this.registerTimeTo.getFullYear(),
                this.registerTimeTo.getMonth(),
                this.registerTimeTo.getDate(),
                23, 59, 59
              );

      Request()
        .get("/api/green/livestock/all", {
          registerTimeFrom:
            this.registerTimeFrom == "" || this.registerTimeFrom == null
              ? ""
              : this.registerTimeFrom,
          registerTimeTo:
            this.registerTimeTo == "" || this.registerTimeTo == null
              ? ""
              : toDate,
          sortBy: "id",
          year: this.searchYear
        })
        .then(res => {
          this.tableData = res.data;
          this.total = this.tableData.length;
          this.calculateTotal();
          this.listLoading = false;
          this.tableData.forEach(item =>{
            item.halfYear = (item.halfYear == -1? "/": parseFloat(item.halfYear).toFixed(2) );
            item.fullYear = (item.fullYear == -1? "/": parseFloat(item.fullYear).toFixed(2));
          })
        });
    },

    calculateTotal() {
      let fnum = 0;
      let snum = 0;
      this.tableData.forEach(data => {        
        fnum += (data.halfYear == -1? 0:data.halfYear);
        snum += (data.fullYear == -1? 0:data.fullYear);
      });

      this.tableData.push({
        town: "合计",
        halfYear: fnum,
        fullYear: snum
      });
    },

    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == this.tableData.length - 1) {
        if (columnIndex == 1) {
          return {
            rowspan: 1,
            colspan: 2
          };
        } else if (columnIndex == 0) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return row.rowIndex + 1;
    }
  }
};
</script>

<style>
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 25px;
}
</style>
