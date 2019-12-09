<template>
  <div class="box">
    <el-dialog
      :visible.sync="openDialog"
      width="90%"
      :before-close="handleClose"
    >
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm">
        <el-form-item class="left-margin flex-box w-100 no-margin-IE">
          <el-row
            v-for="(rowData, index) in dynamicValidateForm.data"
            :key="index"
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
            <el-col :span="2">
              <el-form-item
                label="创建单位："
                :prop="'data.' + index + '.companyName'"
                :rules="{ required: true, message: '请插入', trigger: 'blur' }"
                class="margin-left-10"
              >
                <el-input v-model="rowData.companyName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item
                label="产品类型:"
                :prop="'data.' + index + '.productType'"
                :rules="{ required: true, message: '请插入', trigger: 'blur' }"
                class="margin-left-10"
              >
                <el-input v-model="rowData.productType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item
                label="基地面积:"
                :prop="'data.' + index + '.area'"
                :rules="[
                  { required: true, message: '请插入', trigger: 'blur' },
                  { type: 'number', message: '插入号码', trigger: 'blur' }
                ]"
                class="margin-left-10"
              >
                <el-input v-model.number="rowData.area"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item
                label="基地地址(到村)："
                :prop="'data.' + index + '.location'"
                :rules="{ required: true, message: '请插入', trigger: 'blur' }"
                class="margin-left-10"
              >
                <el-input v-model="rowData.location"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item
                label="与部基地,产品基地重合："
                :prop="'data.' + index + '.isCoincidence'"
                :rules="{ required: true, message: '请插入', trigger: 'blur' }"
                class="margin-left-10"
              >
                <el-select v-model="rowData.isCoincidence" placeholder="请选择">
                  <el-option
                    v-for="item in [
                      { value: 0, label: '否' },
                      { value: 1, label: '是' }
                    ]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="3" class="margin-left-10">
              <el-form-item
                label="重合企业/部基地："
                :prop="'data.' + index + '.coincidenceBase'"
                class="margin-left-10"
              >
                <el-input
                  v-model="rowData.coincidenceBase"
                  :disabled="rowData.isCoincidence == 0"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2" class="margin-left-10">
              <el-form-item
                label="重合面积："
                :prop="'data.' + index + '.coincidneceArea'"
                :rules="[{ type: 'number', message: '插入号码' }]"
                class="margin-left-10"
              >
                <el-input
                  v-model.number="rowData.coincidneceArea"
                  :disabled="rowData.isCoincidence == 0"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-form-item
                label="备注："
                :prop="'data.' + index + '.other'"
                class="margin-left-10"
              >
                <el-input v-model="rowData.other"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="margin-left-40 margin-top-20">
            <el-col :span="17">
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
            <el-col :span="4" v-show="dynamicValidateForm.data.length > 0">
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
      <el-header>建设中待验收种植业绿色优质基地</el-header>
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
          <el-col :span="9">
            <span>创建单位:&nbsp;</span>
            <el-input v-model="companyName" class="w-80"></el-input>
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
        :span-method="objectSpanMethod"
        v-loading="listLoading"
        highlight-current-row
      >
        <el-table-column
          :formatter="order"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column prop="companyName" label="创建单位"></el-table-column>
        <el-table-column prop="productType" label="产品类型"></el-table-column>
        <el-table-column prop="area" label="基地面积"></el-table-column>
        <el-table-column
          prop="location"
          label="基地地址(到村)"
        ></el-table-column>
        <el-table-column label="与部基地,产品基地重合">
          <el-table-column prop="isCoincidence" label="(是/否)" align="center">
            <template slot-scope="{ row }">{{
              row.isCoincidence == "0"
                ? "否"
                : row.isCoincidence == "1"
                ? "是"
                : row.isCoincidence
            }}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="应扣除的重合部分" align="center">
          <el-table-column
            :prop="col.prop"
            :label="col.label"
            v-for="col in columns"
            :key="col.prop"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          prop="other"
          label="备注"
          align="center"
        ></el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<script>
import Request from "@/services/api/request.js";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "plantingGreenBase",
  props: {
    year: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      openDialog: false,
      dynamicValidateForm: {
        data: []
      },
      selectedRows: [],
      confirm_dialogVisible: false,
      checked: [],
      registerTime: new Date().toString("YYYY-MM-DD"),
      registerTimeFrom: new Date(new Date().getFullYear(), 0, 1),
      registerTimeTo: new Date(),
      companyName: "",
      sendcount: 0,

      columns: [
        {
          prop: "coincidenceBase",
          label: "重合企业/部基地"
        },
        {
          prop: "coincidneceArea",
          label: "重合面积"
        }
      ],
      alert_dialogVisible: false,
      // loggedinUserType: null,

      total: 0,
      tableData: [],
      listLoading: true
    };
  },
  created() {
    // this.loggedinUserType = Auth().user().userType;
    this.getData();
  },

  methods: {
    showAddDialog() {
      this.dynamicValidateForm.data = [];
      this.selectedRows = [];
      this.checked = [];
      this.openDialog = true;
      this.addFormRow();
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
        companyName: "",
        productType: "",
        area: 0,
        location: "",
        isCoincidence: 0,
        coincidenceBase: "",
        coincidneceArea: 0,
        other: ""
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
          if (this.selectedRows.length > 0) this.confirm_dialogVisible = true;
          else this.openDialog = false;
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
        formdata.append("area", item.area);
        formdata.append(
          "coincidenceBase",
          item.isCoincidence == 0 ? "" : item.coincidenceBase
        );
        formdata.append(
          "coincidneceArea",
          item.isCoincidence == 0 ? 0 : item.coincidneceArea
        );
        formdata.append("companyName", item.companyName);
        formdata.append("createTime", createTime.toDateString("YYYY-MM-DD"));
        formdata.append("createUserId", Auth().user().id);
        formdata.append("id", 0);
        formdata.append("isCoincidence", item.isCoincidence);
        formdata.append("location", item.location);
        formdata.append("other", item.other);
        formdata.append("productType", item.productType);
        formdata.append(
          "registerTime",
          this.registerTime.toString("YYYY-MM-DD")
        );
        formdata.append("updateTime", updateTime.toDateString("YYYY-MM-DD"));
        formdata.append("updateUserId", Auth().user().id);

        Request()
          .post("/api/green/green_quality_base/create", formdata)
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

    getData() {
      this.listLoading = true;
      Request()
        .get("/api/green/green_quality_base/all", {
          companyName: this.companyName,
          registerTimeFrom:
            this.registerTimeFrom == "" || this.registerTimeFrom == null
              ? ""
              : this.registerTimeFrom,
          registerTimeTo:
            this.registerTimeTo == "" || this.registerTimeTo == null
              ? ""
              : this.registerTimeTo,
          sortBy: "id"
        })
        .then(res => {
          this.tableData = res.data;
          this.total = this.tableData.length;
          this.calculateTotal();
          this.Total();
          this.listLoading = false;
        });
    },

    calculateTotal() {
      this.tableData.push({
        companyName: "合计",
        productType: "",
        area: this.baseQuality(),
        location: "",
        isCoincidence: "",
        coincidenceBase: "",
        coincidneceArea: this.coincidentQuality(),
        other: ""
      });
    },
    baseQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.area;
      });
      return total;
    },
    coincidentQuality() {
      let total = 0;
      this.tableData.forEach(data => {
        total += data.coincidneceArea;
      });
      return total;
    },
    Total() {
      this.tableData.push({
        companyName: "纳入统计范围的基地面积（扣除重合后）：",
        productType: "",
        area: 0,
        location: "",
        isCoincidence: this.totalQuality(),
        coincidenceBase: "",
        coincidneceArea: 0,
        other: ""
      });
    },
    totalQuality() {
      let total = 0;
      let index = 0;
      this.tableData.forEach(data => {
        if (index === this.tableData.length - 1) return total;

        total += data.area - data.coincidneceArea;
        index++;
      });
      return total;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == this.tableData.length - 2) {
        if (columnIndex == 0) {
          return {
            rowspan: 0,
            colspan: 0
          };
        } else if (columnIndex == 1) {
          return {
            rowspan: 1,
            colspan: 2
          };
        }
      } else if (rowIndex == this.tableData.length - 1) {
        if (columnIndex == 1) {
          return {
            rowspan: 1,
            colspan: 5
          };
        } else if (columnIndex == 5) {
          return {
            rowspan: 1,
            colspan: 4
          };
        } else if (
          columnIndex == 0 ||
          columnIndex == 2 ||
          columnIndex == 3 ||
          columnIndex == 4 ||
          columnIndex == 6 ||
          columnIndex == 7 ||
          columnIndex == 8
        ) {
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
