<template>
  <div class="box padding-top-10">
    <el-dialog
      :visible.sync="show_addDialog"
      width="85%"
      :before-close="handleClose"
      title="添加有机农产品"
    >
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm">
        <el-row
          v-for="(rowData, index) in dynamicValidateForm.rowDatas"
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
          <el-col :span="3" class="margin-left-10">
            <el-form-item
              label="所在镇(区)："
              :prop="'rowDatas.' + index + '.town'"
              :rules="{ required: true, message: '请插入', trigger: 'blur' }"
            >
              <el-input v-model="rowData.town" class="w-100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" class="margin-left-10">
            <el-form-item
              label="申报单位名称:"
              :prop="'rowDatas.' + index + '.companyId'"
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
          <el-col :span="3" class="margin-left-10">
            <el-form-item
              label="编号:"
              :prop="'rowDatas.' + index + '.productCreditCode'"
              :rules="{ required: true, message: '请选择', trigger: 'blur' }"
            >
              <el-input v-model="rowData.productCreditCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="margin-left-10">
            <el-form-item
              label="产品种类:"
              :prop="'rowDatas.' + index + '.productType'"
            >
              <el-input v-model="rowData.productType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="margin-left-10">
            <el-form-item
              label="产品名称:"
              :prop="'rowDatas.' + index + '.productName'"
            >
              <el-input v-model="rowData.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="margin-left-10">
            <el-form-item
              label="面积(亩):"
              :prop="'rowDatas.' + index + '.area'"
              :rules="[                
                { type: 'number', message: '插入号码', trigger:'blur' }
              ]"
            >
              <el-input-number
                v-model="rowData.area"
                :controls="false"
                class="w-90"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item
              label="产量(吨):"
              :prop="'rowDatas.' + index + '.amount'"
              :rules="[                
                { type: 'number', message: '插入号码', trigger:'blur' }
              ]"
            >
              <el-input-number
                v-model="rowData.amount"
                :controls="false"
                class="w-90"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item
              label="详细地址:"
              :prop="'rowDatas.' + index + '.location'"
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
          <el-col :span="16" class="margin-top-10 text-right"
            >插入时间：</el-col
          >
          <el-col :span="3">
            <el-date-picker
              v-model="registerTime"
              align="right"
              class="w-80"
              type="date"
            ></el-date-picker>
          </el-col>
          <el-col :span="1">
            <el-button
              size="small"
              @click="onSubmit('dynamicValidateForm')"
              type="success"
              plain
              style="float:right"
              class="margin-right-40"
              >保存</el-button
            >
          </el-col>
        </el-row>
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
      <el-header class="margin-bottom-10">有机农产品清单</el-header>
      <el-row class="margin-bottom-20">
        <el-col :span="1">
          <el-button plain type="success" size="small" @click="showAddDialog()"
            >添加</el-button
          >
        </el-col>
        <el-col :span="4">
          <div class="select_label margin-left-20 margin-right-5">
            开始日期 :
          </div>
          <el-date-picker
            v-model="registerTimeFrom"
            align="right"
            type="date"
            placeholder="插入时间 "
          ></el-date-picker>
        </el-col>
        <el-col :span="4">
          <div class="select_label margin-left-20 margin-right-5">
            结束日期 :
          </div>
          <el-date-picker
            v-model="registerTimeTo"
            align="right"
            type="date"
            placeholder="插入时间 "
          ></el-date-picker>
        </el-col>

        <el-col :span="4">
          <div class="select_label margin-left-20 margin-right-5">
            所在镇(区) :
          </div>
          <el-input v-model="searchTown" align="right" class="w-50"></el-input>
        </el-col>
        <el-col :span="4">
          <div class="select_label no-margin-left margin-right-5">
            申报单位名称 :
          </div>
          <el-input
            v-model="searchCompanyName"
            align="right"
            class="w-50"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <div class="select_label margin-left-20 margin-right-5">
            已获证书 :
          </div>
          <el-select v-model="isCredit" align="right" type="date" class="w-50">
            <el-option
              v-for="item in option"
              :key="item.val"
              :label="item.label"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button
            plain
            type="primary"
            size="small"
            @click="getData()"
            class="margin-left-10"
            >搜索</el-button
          >
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :row-class-name="rowIndex"
        :span-method="objectSpanMethod"
        v-loading="listLoading"
        fit
        highlight-current-row
      >
        <el-table-column
          :formatter="order"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="townDistrict.value"
          label="所在镇(区)"
        ></el-table-column>
        <el-table-column
          prop="declarationUnitName.value"
          label="申报单位名称"
        ></el-table-column>
        <el-table-column prop="numbering.value" label="编号"></el-table-column>
        <el-table-column prop="kind.value" width="150"></el-table-column>
        <el-table-column
          prop="productName.value"
          label="产品名称"
          align="center"
        ></el-table-column>
        <el-table-column prop="area.value" label="面积(亩)">          
        </el-table-column>
        <el-table-column prop="production.value" label="产量(吨)">          
        </el-table-column>
        <el-table-column
          prop="address.value"
          label="详细地址"
        ></el-table-column>
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
  name: "organicProduce",
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

      isCredit: 0,
      searchTown: "",
      searchCompanyName: "",
      registerTimeTo: new Date(),
      registerTimeFrom: new Date(new Date().getFullYear(), 0, 1),
      show_addDialog: false,
      confirm_dialogVisible: false,
      selectedTown: null,
      selectedRows: [],
      township: [{ id: -1, name: "全部" }],
      companyProduction: [{ id: -1, name: "全部" }],
      dynamicValidateForm: {
        rowDatas: [
          {
            town: null,
            companyId: -1,
            productName: "",
            productType: "",
            productCreditCode: "",
            area: null,
            amount: null,
            location: ""
          }
        ]
      },
      registerTime: new Date(),
      // loggedinUserType: null,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      checked: [],
      total: 0,
      tableData: [],
      objData: [],
      listLoading: false
    };
  },

  created() {
    this.getCompanyProduction();
    // this.loggedinUserType = Auth().user().userType;
    this.getData();
  },
  methods: {
    arrangData() {
      let data = this.objData;
      this.total = data.length;
      let index = 0;
      data.forEach(obj => {
        let objtotal = 0;

        obj.declarationUnit.forEach(declare => {
          let dectotal = 0;

          declare.declaration.forEach(deunit => {
            let deunitotal = 0;

            deunit.product.forEach(pro => {
              this.tableData.push({
                townDistrict: { value: obj.townDistrict, spaning: 0 },
                declarationUnitName: {
                  value: declare.declarationUnitName,
                  spaning: 0
                },
                kind: { value: deunit.kind, spaning: 0 },
                numbering: { value: deunit.numbering, spaning: 0 },
                productName: { value: pro.productName, spaning: 0 },
                production: { value: pro.production, spaning: 0 },
                address: { value: deunit.address, spaning: 0 },
                area: { value: declare.area, spaning: 0 }
              });

              deunitotal++;
              index++;
            });

            this.tableData[index - deunitotal].numbering.spaning = deunitotal;
            this.tableData[index - deunitotal].address.spaning = deunitotal;
            if (this.tableData[index - deunitotal].kind.value !== "") {
              this.tableData[index - deunitotal].kind.spaning = deunitotal;
            }
            dectotal += deunitotal;
          });

          this.tableData[
            index - dectotal
          ].declarationUnitName.spaning = dectotal;
          this.tableData[index - dectotal].area.spaning = dectotal;
          objtotal += dectotal;
        });

        this.tableData[index - objtotal].townDistrict.spaning = objtotal;
      });

      this.tableData.push({
        townDistrict: { value: "合计", spaning: 0 },
        declarationUnitName: { value: "", spaning: 0 },
        numbering: { value: "", spaning: 0 },
        productName: { value: "", spaning: 0 },
        production: { value: this.productionQuality(), spaning: 0 },
        address: { value: "预计下半年通过15000亩认证面积", spaning: 0 },
        area: { value: this.areaQualtiy(), spaning: 0 }
      });
    },

    areaQualtiy() {
      let total = 0;
      this.objData.forEach(obj => {
        obj.declarationUnit.forEach(dec => {
          total += parseFloat(dec.area == "/"? 0.00: dec.area);
        });
      });
      return parseFloat(total).toFixed(2);
    },

    productionQuality() {
      let total = 0;
      this.objData.forEach(obj => {
        obj.declarationUnit.forEach(dec => {
          dec.declaration.forEach(pro => {
            pro.product.forEach(p => {
              total += parseFloat(p.production == "/"? 0.00: p.production);
            });
          });
        });
      });
      return parseFloat(total).toFixed(2);
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex < this.tableData.length - 1) {
        if (columnIndex == 1) {
          if (row.townDistrict.spaning > 0) {
            return {
              rowspan: row.townDistrict.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }

        if (columnIndex == 2) {
          if (row.declarationUnitName.spaning > 0) {
            return {
              rowspan: row.declarationUnitName.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if (columnIndex == 3) {
          if (row.numbering.spaning > 0) {
            return {
              rowspan: row.numbering.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }

        if (columnIndex == 4) {
          if (row.kind.spaning > 0) {
            return {
              rowspan: row.kind.spaning,
              colspan: 1
            };
          } else if (row.kind.spaning == 0 && row.kind.value === "") {
            return {
              rowspan: 0,
              colspan: 2
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }

        if (columnIndex == 6) {
          if (row.area.spaning > 0) {
            return {
              rowspan: row.area.spaning,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }

        if (columnIndex == 8) {
          if (row.address.spaning > 0) {
            return {
              rowspan: row.address.spaning,
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
        } else if (columnIndex == 0 || columnIndex == 3 || columnIndex == 5) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

    getData() {
      this.listLoading = true;
      this.objData = [];
      this.tableData = [];
      let toDate = new Date(this.registerTimeTo.getFullYear(),
                this.registerTimeTo.getMonth(),
                this.registerTimeTo.getDate(),
                23, 59, 59
              );

      Request()
        .get("/api/green/organic_product/all", {
          registerTimeTo: toDate,
          registerTimeFrom: this.registerTimeFrom,
          companyName: this.searchCompanyName,
          town: this.searchTown,
          isCredit: this.isCredit
        })
        .then(response => {
          let tmpData = response.data;
          let rowData;
          let tmpTownDistrict = "";
          let tmpDeclarationUnit = [];
          let tmpDeclaration = [];
          let tmpProduct = [];
          if (tmpData.length > 0) {
            for (let i = 0; i < tmpData.length; i++) {
              if (tmpTownDistrict !== tmpData[i].town) {
                if (tmpDeclarationUnit.length > 0) {
                  this.objData.push({
                    townDistrict: tmpTownDistrict,
                    declarationUnit: tmpDeclarationUnit
                  });
                }
                tmpTownDistrict = tmpData[i].town;

                tmpProduct = [];
                tmpDeclaration = [];
                tmpDeclarationUnit = [];
                tmpProduct.push({
                  productName: tmpData[i].productName,
                  production: tmpData[i].amount == -1? "/": parseFloat(tmpData[i].amount).toFixed(2)
                });
                tmpDeclaration.push({
                  numbering: tmpData[i].productCreditCode,
                  kind: tmpData[i].productType,
                  product: tmpProduct,
                  address: tmpData[i].location
                });
                tmpDeclarationUnit.push({
                  declarationUnitName: tmpData[i].companyName,
                  declaration: tmpDeclaration,
                  area: tmpData[i].area == -1? "/": parseFloat(tmpData[i].area).toFixed(2)
                });
              } else {
                if (tmpData[i - 1].companyName === tmpData[i].companyName) {
                  if (
                    tmpData[i - 1].productCreditCode ===
                    tmpData[i].productCreditCode
                  ) {
                    tmpProduct.push({
                      productName: tmpData[i].productName,
                      production: tmpData[i].amount == -1? "/": parseFloat(tmpData[i].amount).toFixed(2)
                    });
                  } else {
                    tmpProduct = [];
                    tmpProduct.push({
                      productName: tmpData[i].productName,
                      production: tmpData[i].amount == -1? "/": parseFloat(tmpData[i].amount).toFixed(2)
                    });
                    tmpDeclaration.push({
                      numbering: tmpData[i].productCreditCode,
                      kind: tmpData[i].productType,
                      product: tmpProduct,
                      address: tmpData[i].location
                    });
                  }
                } else {
                  tmpProduct = [];
                  tmpProduct.push({
                    productName: tmpData[i].productName,
                    production: tmpData[i].amount == -1? "/": parseFloat(tmpData[i].amount).toFixed(2)
                  });
                  tmpDeclaration = [];
                  tmpDeclaration.push({
                    numbering: tmpData[i].productCreditCode,
                    kind: tmpData[i].productType,
                    product: tmpProduct,
                    address: tmpData[i].location
                  });
                  tmpDeclarationUnit.push({
                    declarationUnitName: tmpData[i].companyName,
                    declaration: tmpDeclaration,
                    area: tmpData[i].area == -1? "/": parseFloat(tmpData[i].area).toFixed(2)
                  });
                }
              }
            }
            if (tmpDeclarationUnit.length > 0) {
              this.objData.push({
                townDistrict: tmpTownDistrict,
                declarationUnit: tmpDeclarationUnit
              });
            }
            this.arrangData();
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
        town: "",
        companyId: null,
        productType: "",
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
            this.dynamicValidateForm.rowDatas[i].amount == null ||  
            this.dynamicValidateForm.rowDatas[i].amount == 'undefined'? 
            -1:
            this.dynamicValidateForm.rowDatas[i].amount
          );

          formdata.append("area", 
          this.dynamicValidateForm.rowDatas[i].area == null ||  
          this.dynamicValidateForm.rowDatas[i].area == 'undefined'? 
          -1:
          this.dynamicValidateForm.rowDatas[i].area);

          formdata.append("id", 0);
          formdata.append(
            "productType",
            this.dynamicValidateForm.rowDatas[i].productType == ""? " ": this.dynamicValidateForm.rowDatas[i].productType
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
          formdata.append("town", this.dynamicValidateForm.rowDatas[i].town);
          formdata.append("updateTime", updateTime);
          formdata.append("updateUserId", Auth().user().id);
          
          Request()
            .post("/api/green/organic_product/create", formdata)
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

.el-table--border td {
  border-right: 1px solid #ebeef5 !important;
}
</style>
