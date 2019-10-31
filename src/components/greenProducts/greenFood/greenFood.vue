<template>
  <div class="box">
    <el-dialog
      :visible.sync="show_addDialog"
      width="80%"
      :before-close="handleClose"
      title="添加绿色食品"
    >
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm">
        <el-row v-for="(rowData, index) in dynamicValidateForm.rowDatas" :key="index">
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
          <el-col :span="3" class="margin-left-10">
            <el-form-item
              label="板块："
              :prop="'rowDatas.'+index+'.town'"
              :rules="{ required: true, message: '请选择', trigger: 'blur' }"
            >
              <el-select v-model="rowData.town" class="w-100">
                <el-option
                  v-for="town in township"
                  :key="town.id"
                  :label="town.name"
                  :value="town.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="margin-left-10">
            <el-form-item
              label="生产单位:"
              :prop="'rowDatas.'+index+'.companyId'"
              :rules="{ required: true, message: '请选择', trigger: 'blur' }"
            >
              <el-select v-model="rowData.companyId" class="w-100">
                <el-option
                  v-for="company in companyProduction"
                  :key="company.companyId"
                  :label="company.companyName"
                  :value="company.companyId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="margin-left-10">
            <el-form-item
              label="产品名称:"
              :prop="'rowDatas.'+index+'.productName'"
              :rules="{required: true, message: '请插入',trigger: 'blur'}"
            >
              <el-input v-model="rowData.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" class="margin-left-10">
            <el-form-item label="产品证书编号:" :prop="'rowDatas.'+index+'.productCreditCode'">
              <el-input v-model="rowData.productCreditCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="margin-left-10">
            <el-form-item
              label="基地面积(亩):"
              :prop="'rowDatas.'+index+'.area'"
              :rules="[{ required: true, message: '请插入', trigger: 'blur' },
                { type: 'number',message: '插入号码'}]"
            >
              <el-input v-model.number="rowData.area"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="margin-left-10">
            <el-form-item
              label="产量(吨):"
              :prop="'rowDatas.'+index+'.amount'"
              :rules="[{ required: true, message: '请插入', trigger: 'blur' },
                { type: 'number',message: '插入号码'}]"
            >
              <el-input v-model.number="rowData.amount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" class="margin-left-10">
            <el-form-item
              label="基地地址(到村):"
              :prop="'rowDatas.'+index+'.location'"
              :rules="{ required: true, message: '请插入', trigger: 'blur' }"
            >
              <el-input v-model="rowData.location"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15"></el-col>
        </el-row>
        <el-row class="left-margin flex-box w-100 no-margin-IE">
          <el-col :span="4">
            <el-button size="small" @click="addFormRow()" type="primary" plain>添加</el-button>
            <el-button size="small" @click="deleteSelectedRows()" type="danger" plain>删除</el-button>
          </el-col>
          <el-col :span="16" class="margin-top-10 text-right">插入时间：</el-col>
          <el-col :span="3">
            <el-date-picker v-model="registerTime" align="right" class="w-80" type="date"></el-date-picker>
          </el-col>
          <el-col :span="1">
            <el-button
              size="small"
              @click="onSubmit('dynamicValidateForm')"
              type="success"
              plain
              style="float:right"
              class="margin-right-40"
            >保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="confirm_dialogVisible" width="30%" modal>
      <span>
        <i class="el-icon-warning">&nbsp;继续？请再次检查</i>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="confirm_dialogVisible = false" type="primary" plain>取消</el-button>
        <el-button size="small" type="success" @click="updateSelectedRows()" plain>确认</el-button>
      </span>
    </el-dialog>
    <el-row class="margin-bottom-10">
      <el-col :span="1">
        <el-button plain type="success" size="small" @click="showAddDialog()">添加</el-button>
      </el-col>
      <!-- </el-row>
      <el-row class="margin-bottom-10">-->
      <el-col :span="4">
        <div class="select_label margin-left-20 margin-right-5">开始日期 :</div>
        <el-date-picker v-model="registerTimeFrom" align="right" type="date" placeholder="插入时间 "></el-date-picker>
      </el-col>
      <el-col :span="4">
        <div class="select_label margin-left-20 margin-right-5">结束日期 :</div>
        <el-date-picker v-model="registerTimeTo" align="right" type="date" placeholder="插入时间 "></el-date-picker>
      </el-col>

      <el-col :span="4">
        <div class="select_label margin-left-20 margin-right-5">板块 :</div>
        <el-input v-model="searchTown" align="right" class="w-60"></el-input>
      </el-col>
      <el-col :span="4">
        <div class="select_label no-margin-left margin-right-5">生产单位 :</div>
        <el-input v-model="searchCompanyName" align="right" class="w-60"></el-input>
      </el-col>
      <el-col :span="4">
        <div class="select_label no-margin-left margin-right-5">已获证书 :</div>
        <el-select v-model="isCredit" align="right" type="date" class="w-50">
          <el-option v-for="item in option" :key="item.val" :label="item.label" :value="item.val"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button plain type="primary" size="small" @click="getData()">搜索</el-button>
      </el-col>
    </el-row>
    <el-container>
      <el-header>常熟市2019年上半年度种植业绿色食品统计汇总</el-header>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :row-class-name="rowIndex"
        :span-method="mainSpanMethod"
        v-loading="listLoading"
        highlight-current-row
      >
        <el-table-column :formatter="order" label="序号" width="100"></el-table-column>
        <el-table-column prop="plate.value" label="板块"></el-table-column>
        <el-table-column prop="productionUnit.value" label="生产单位"></el-table-column>
        <el-table-column prop="productName.value" label="产品名称"></el-table-column>
        <el-table-column prop="productCertificateNum.value" label="产品证书编号" width="200"></el-table-column>
        <el-table-column prop="baseArea.value" label="基地面积(亩)"></el-table-column>
        <el-table-column prop="production.value" label="产量(吨)"></el-table-column>
        <el-table-column prop="baseAddress.value" label="基地地址(到村)"></el-table-column>
        <el-table-column label="面积统计" align="center" style="color: black">
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
</template>

<script>
import Pagination from "@/components/common/pagination";
import Request from "@/services/api/request.js";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "greenFood",
  components: { Pagination },
  props: {
    year: {
      required: true,
      type: Number
    }
  },

  data() {
    return {
      option: [
        { val: 0, label: "全部" },
        { val: 1, label: "是" },
        { val: 2, label: "否" }
      ],
      columns: [
        {
          prop: "certified.value",
          label: "已获证"
        },
        {
          prop: "declared.value",
          label: "已申报"
        }
      ],
      isCredit: 0,
      searchTown: "",
      searchCompanyName: "",
      registerTimeTo: "",
      registerTimeFrom: "",
      show_addDialog: false,
      confirm_dialogVisible: false,
      selectedTown: null,
      selectedRows: [],
      township: [],
      companyProduction: [],
      dynamicValidateForm: {
        rowDatas: [
          {
            town: null,
            companyId: null,
            productName: "",
            productCreditCode: "",
            area: null,
            amount: null,
            location: ""
          }
        ]
      },
      registerTime: new Date(),
      loggedinUserType: null,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      checked: [],
      total: 0,
      tableData: [],
      objectData: [],
      listLoading: false
    };
  },

  created() {
    this.getTown();
    this.getCompanyProduction();
    this.loggedinUserType = Auth().user().userType;
    this.getData();
  },
  methods: {
    arrangeData() {
      let data = this.objectData;
      this.total = data.length;
      let index = 0;
      data.forEach(pltUnit => {
        let pltotal = 0;

        pltUnit.productionInfo.forEach(puin => {
          let puintotal = 0;

          puin.productUnitInfo.forEach(pduin => {
            this.tableData.push({
              plate: { value: pltUnit.plate, spaning: 0 }, //plLen * puinLen},
              productionUnit: { value: puin.productionUnit, spaning: 0 }, // puinLen},
              productName: { value: pduin.productName, spaning: 0 },
              productCertificateNum: {
                value: pduin.productCertificateNum,
                spaning: 0
              },
              baseArea: { value: pduin.baseArea, spaning: 0 },
              production: { value: pduin.production, spaning: 0 },
              baseAddress: { value: puin.baseAddress, spaning: 0 }, // puinLen},
              certified: { value: pltUnit.certified, spaning: 0 }, //plLen * puinLen },
              declared: { value: pltUnit.declared, spaning: 0 } //plLen * puinLen},
            });
            puintotal++;
            index++;
          });
          this.tableData[index - puintotal].productionUnit.spaning = puintotal;
          this.tableData[index - puintotal].baseAddress.spaning = puintotal;
          pltotal += puintotal;
        });

        this.tableData[index - pltotal].plate.spaning = pltotal;
        this.tableData[index - pltotal].certified.spaning = pltotal;
        this.tableData[index - pltotal].declared.spaning = pltotal;
      });

      this.tableData.push({
        plate: { value: "合计", spaning: 0 },
        productionUnit: { value: "", spaning: 0 },
        productName: { value: "", spaning: 0 },
        productCertificateNum: { value: "", spaning: 0 },
        baseArea: { value: this.baseQuality(), spaning: 0 },
        production: { value: this.productionQuality(), spaning: 0 },
        baseAddress: { value: "", spaning: 0 },
        certified: { value: this.cetifiyQuality(), spaning: 0 },
        declared: { value: this.declareQuality(), spaning: 0 }
      });
    },

    baseQuality() {
      let total = 0;
      this.objectData.forEach(obj => {
        obj.productionInfo.forEach(pro => {
          pro.productUnitInfo.forEach(product => {
            total += product.baseArea;
          });
        });
      });

      return total;
    },

    productionQuality() {
      let total = 0;
      this.objectData.forEach(obj => {
        obj.productionInfo.forEach(pro => {
          pro.productUnitInfo.forEach(product => {
            total += product.production;
          });
        });
      });

      return total;
    },

    cetifiyQuality() {
      let total = 0;
      this.objectData.forEach(obj => {
        total += obj.certified;
      });

      return total;
    },

    declareQuality() {
      let total = 0;
      this.objectData.forEach(obj => {
        total += obj.declared;
      });
      return total;
    },

    mainSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex < this.tableData.length - 1) {
        if (columnIndex === 1) {
          if (row.plate.spaning > 0) {
            return {
              rowspan: row.plate.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }

        if (columnIndex === 2) {
          if (row.productionUnit.spaning > 0) {
            return {
              rowspan: row.productionUnit.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if (columnIndex === 7) {
          if (row.baseAddress.spaning > 0) {
            return {
              rowspan: row.baseAddress.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if (columnIndex === 8) {
          if (row.certified.spaning > 0) {
            return {
              rowspan: row.certified.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if (columnIndex === 9) {
          if (row.declared.spaning > 0) {
            return {
              rowspan: row.declared.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      } else {
        if (rowIndex == this.tableData.length - 1) {
          if (columnIndex == 1) {
            return {
              rowspan: 1,
              colspan: 2
            };
          } else if (columnIndex == 2) {
            return {
              rowspan: 1,
              colspan: 3
            };
          } else if (columnIndex == 0 || columnIndex == 3 || columnIndex == 4) {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    },

    getData() {
      this.listLoading = true;
      this.objectData = [];
      this.tableData = [];
      Request()
        .get("/api/green/green_food/all", {
          registerTimeTo: this.registerTimeTo,
          registerTimeFrom: this.registerTimeFrom,
          companyName: this.searchCompanyName,
          town: this.searchTown,
          isCredit: this.isCredit
        })
        .then(response => {
          let tmpData = response.data;
          let rowData;
          let tmpPlate = "";
          let tmpCertified;
          let tmpDeclared;
          let tmpProductionInfo = [];
          let tmpProductUnitInfo = [];

          if (tmpData.length > 0) {
            for (let i = 0; i < tmpData.length; i++) {
              if (tmpPlate !== tmpData[i].town) {
                if (tmpProductionInfo.length > 0) {
                  this.objectData.push({
                    plate: tmpPlate,
                    productionInfo: tmpProductionInfo,
                    certified: tmpCertified,
                    declared: tmpDeclared
                  });
                }
                tmpPlate = tmpData[i].town;
                if (tmpData[i].productCreditCode) {
                  tmpCertified = parseInt(tmpData[i].area);
                  tmpDeclared = 0;
                } else {
                  tmpDeclared = parseInt(tmpData[i].area);
                  tmpCertified = 0;
                }
                tmpProductUnitInfo = [];
                tmpProductionInfo = [];
                tmpProductUnitInfo.push({
                  productName: tmpData[i].productName,
                  productCertificateNum: tmpData[i].productCreditCode,
                  baseArea: tmpData[i].area,
                  production: tmpData[i].amount
                });
                tmpProductionInfo.push({
                  productionUnit: tmpData[i].companyName,
                  productUnitInfo: tmpProductUnitInfo,
                  baseAddress: tmpData[i].location
                });
              } else {
                if (tmpData[i].productCreditCode)
                  tmpCertified = tmpCertified + parseInt(tmpData[i].area);
                else if (!tmpData[i].productCreditCode)
                  tmpDeclared = tmpDeclared + parseInt(tmpData[i].area);
                if (tmpData[i - 1].companyName === tmpData[i].companyName) {
                  tmpProductUnitInfo.push({
                    productName: tmpData[i].productName,
                    productCertificateNum: tmpData[i].productCreditCode,
                    baseArea: tmpData[i].area,
                    production: tmpData[i].amount
                  });
                } else if (
                  tmpData[i - 1].companyName !== tmpData[i].companyName
                ) {
                  tmpProductUnitInfo = [];
                  tmpProductUnitInfo.push({
                    productName: tmpData[i].productName,
                    productCertificateNum: tmpData[i].productCreditCode,
                    baseArea: tmpData[i].area,
                    production: tmpData[i].amount
                  });
                  tmpProductionInfo.push({
                    productionUnit: tmpData[i].companyName,
                    productUnitInfo: tmpProductUnitInfo,
                    baseAddress: tmpData[i].location
                  });
                }
              }
            }
            if (tmpProductionInfo.length > 0) {
              this.objectData.push({
                plate: tmpPlate,
                productionInfo: tmpProductionInfo,
                certified: tmpCertified,
                declared: tmpDeclared
              });
            }
            this.arrangeData();
          } else {
            this.tableData = [];
          }
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
    /*----------------add part-----------------*/
    showAddDialog() {
      this.dynamicValidateForm.rowDatas = [];
      this.addFormRow();
      this.show_addDialog = true;
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
    addFormRow() {
      this.dynamicValidateForm.rowDatas.push({
        town: null,
        companyId: null,
        productName: "",
        productCreditCode: "",
        area: null,
        amount: null,
        location: "",
        registerTime: new Date()
      });
    },
    showDialog(data, supervisorType) {
      if (supervisorType === 2) this.showWebMaster = true;
      else this.showWebMaster = false;
      this.selectedSupervisupervisorType = supervisorType;
      this.dynamicValidateForm.rowDatas = data;
      this.openDialog = true;
      this.header = this.supervisorType[supervisorType - 1];
    },
    changeCheckStatus(rowIndex) {
      let index = this.selectedRows.indexOf(rowIndex);
      if (index > -1) this.selectedRows.splice(index, 1);
      if (this.checked[rowIndex] == 1) {
        this.selectedRows.push(rowIndex);
      }
    },
    deleteSelectedRows() {
      if (this.selectedRows.length) {
        this.selectedRows = this.selectedRows.sort((a, b) => (a > b ? -1 : 1));
        for (let index in this.selectedRows) {
          let checkId = this.dynamicValidateForm.rowDatas[
            this.selectedRows[index]
          ].id;
          if (checkId) this.deletedRows.push(checkId);
          this.checked[this.selectedRows[index]] = false;
          this.dynamicValidateForm.rowDatas.splice(this.selectedRows[index], 1);
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
    handleClose(done) {
      this.$confirm("您确定要关闭此对话框吗？")
        .then(_ => {
          this.getData();
          this.deletedRows = [];
          done();
        })
        .catch(_ => {});
    },
    updateSelectedRows() {
      this.confirm_dialogVisible = false;
      this.show_addDialog = false;
      const updateTime = new Date();
      const createTime = new Date();

      if (this.dynamicValidateForm.rowDatas.length) {
        for (let i = 0; i < this.dynamicValidateForm.rowDatas.length; i++) {
          //create

          this.listLoading = true;
          let formdata = new FormData();
          formdata.append(
            "amount",
            this.dynamicValidateForm.rowDatas[i].amount
          );
          formdata.append("area", this.dynamicValidateForm.rowDatas[i].area);
          formdata.append("id", 0);
          formdata.append(
            "companyId",
            this.dynamicValidateForm.rowDatas[i].companyId
          );
          formdata.append(
            "companyName",
            this.filterCompnay(this.dynamicValidateForm.rowDatas[i].companyId)
          );
          formdata.append("createTime", createTime);
          formdata.append("createUserId", Auth().user().id);
          formdata.append(
            "location",
            this.dynamicValidateForm.rowDatas[i].location
          );
          formdata.append(
            "productCreditCode",
            this.dynamicValidateForm.rowDatas[i].productCreditCode
          );
          formdata.append(
            "productName",
            this.dynamicValidateForm.rowDatas[i].productName
          );
          formdata.append("registerTime", this.registerTime);
          formdata.append(
            "town",
            this.filterTownship(this.dynamicValidateForm.rowDatas[i].town)
          );
          formdata.append("updateTime", updateTime);
          formdata.append("updateUserId", Auth().user().id);
          Request()
            .post("/api/green/green_food/create", formdata)
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.getData();
            });
        }
      }
    },
    filterCompnay(id) {
      let company = this.companyProduction.find(x => x.companyId === id);
      if (company) {
        return company.companyName;
      } else {
        return "";
      }
    },
    filterTownship(townId) {
      let town = this.township.find(x => x.id === townId);
      if (town) {
        return town.name;
      } else {
        return "";
      }
    }

    /*----------------add part-----------------*/
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

.el-table thead {
  color: #333 !important;
}

.el-table--border td {
  border-right: 1px solid #ebeef5 !important;
}
</style>