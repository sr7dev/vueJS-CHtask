<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="actived">溯源标签管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="w-100">
          <el-tab-pane label="基地" name="base">
            <el-dialog :visible.sync="confirm_dialogVisible" width="30%" modal>
              <span>
                <i class="el-icon-warning">&nbsp;继续？请再次检查</i>
              </span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="confirm_dialogVisible = false" type="primary" plain>取消</el-button>
                <el-button type="success" @click="deleteSelectedRow()" plain>确认</el-button>
              </span>
            </el-dialog>
            <el-dialog :visible.sync="show_AddDialog" width="30%" modal>
              <el-row>
                <el-col :span="24" class="margin-bottom-30 text-center">
                  <h1>添加基地</h1>
                </el-col>
              </el-row>
              <el-form label-width="100px" ref="ruleForm" :model="ruleFormValue">
                <el-row>
                  <el-col :span="18">
                    <el-form-item
                      label="基地名称"
                      prop="locationName"
                      :rules="{ required: true, message: '请插入', trigger:'change' }"
                    >
                      <el-input class="w-100" v-model="ruleFormValue.locationName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">
                    <el-form-item
                      label="地址"
                      prop="locationAddress"
                      :rules="{ required: true, message: '请插入', trigger:'change' }"
                    >
                      <el-input class="w-100" v-model="ruleFormValue.locationAddress"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22" class="text-right">
                    <el-form-item class="flex-box w-100">
                      <el-button @click="show_AddDialog = false" type="primary" plain>关闭</el-button>
                      <el-button @click="onSubmitBase('ruleForm')" type="success" plain>保存</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-dialog>
            <el-button
              type="primary"
              plain
              @click="show_AddDialog = true"
              class="margin-bottom-30"
            >添加</el-button>
            <el-table
              :data="tableData"
              style="width: 100%"
              v-loading="listLoading"
              :row-class-name="rowIndex"
            >
              <el-table-column :formatter="order" label="序号" width="80"></el-table-column>
              <el-table-column prop="locationName" label="基地名称"></el-table-column>
              <el-table-column prop="locationAddress" label="地址"></el-table-column>
              <el-table-column prop="locationNumber" label="编号"></el-table-column>
              <el-table-column prop="operations" label="操作" class-name="text-center">
                <template slot-scope="{ row }">
                  <el-button v-on:click="editSelectedBase(row)" type="success" plain>修改</el-button>
                  <el-button v-on:click="deleteSelectedBase(row.id)" type="danger" plain>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pageBox">
              <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="page.pageIndex"
                :limit.sync="page.pageSize"
                @pagination="getBaseList"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="打印设置" name="printerSetting">
            <el-form label-width="200px" ref="ruleForm1" :model="ruleFormValue1">
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="打印机串口"
                    prop="tmp1"
                    :rules="{ required: true, message: '请选择', trigger:'change' }"
                  >
                    <el-select class="w-100" v-model="ruleFormValue1.tmp1">
                      <el-option
                        v-for="item in ['com3','com4','com5']"
                        :key="item.index"
                        :value="item"
                        :label="item"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="单次最多打印标签个数"
                    prop="tmp2"
                    :rules="{ required: true, message: '请插入', trigger:'change' }"
                  >
                    <el-input class="w-100" v-model="ruleFormValue1.tmp2"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="标签规格"
                    prop="tmp3"
                    :rules="{ required: true, message: '请插入', trigger:'change' }"
                  >
                    <el-input class="w-100" v-model="ruleFormValue1.tmp3"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-form-item class="flex-box w-100">
                    <el-button type="success" plain>保存打印设置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="标签查询" name="tagQuery">
            <el-table
              :data="tableData1"
              style="width: 100%"
              v-loading="listLoading"
              :row-class-name="rowIndex"
            >
              <el-table-column :formatter="order" label="序号" width="80"></el-table-column>
              <el-table-column prop="productId" label="品名">
                <template slot-scope="{row}">{{filterProductName(row.productId)}}</template>
              </el-table-column>
              <el-table-column prop="productionTime" label="生产日期">
                <template slot-scope="{row}">{{row.productionTime | formatDate}}</template>
              </el-table-column>
              <el-table-column prop="locationId" label="基地">
                <template slot-scope="{row}">{{filterTracingLocation(row.locationId)}}</template>
              </el-table-column>
              <el-table-column prop="charge" label="负责人"></el-table-column>
              <el-table-column prop="batchNumber" label="批次号"></el-table-column>
              <el-table-column prop="tracingNumber" label="溯源码"></el-table-column>
              <el-table-column prop="printStatus" label="标签生成" class-name="text-center">
                <template slot-scope="{row}">
                  <span v-if="row.printStatus==0">待生成</span>
                  <el-button
                    @click="goToTagGeneration(row)"
                    type="success"
                    class="margin-left-10"
                    plain
                    v-if="row.printStatus==0"
                  >标签打印</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pageBox">
              <pagination
                v-show="total1 > 0"
                :total="total1"
                :page.sync="page1.pageIndex"
                :limit.sync="page1.pageSize"
                @pagination="getTracingList"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="标签打印" name="labelPrinting">
            <el-dialog :visible.sync="show_QRCode" width="20%" modal>
              <el-row>
                <el-col :span="24" class="margin-bottom-30 text-center">
                  <h1>二 维 码</h1>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="margin-bottom-30 text-center">
                  <qrcode-vue :value="qrValue" :size="size" level="H"></qrcode-vue>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22" class="text-right">
                  <el-button type="success" plain @click="onPrint()">打印</el-button>
                </el-col>
              </el-row>
            </el-dialog>
            <el-form
              label-width="200px"
              ref="ruleForm2"
              :model="ruleFormValue2"
              v-loading="listLoading"
            >
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="品名"
                    prop="productId"
                    :rules="{ required: true, message: '请选择', trigger:'change' }"
                  >
                    <el-select
                      class="w-100"
                      v-model="ruleFormValue2.productId"
                      @change="onChangeProductId()"
                    >
                      <el-option
                        v-for="item in productionList"
                        :key="item.productId"
                        :value="item.productId"
                        :label="item.productName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="批号"
                    prop="batchNumber"
                    :rules="{ required: true, message: '请选择', trigger:'change' }"
                  >
                    <el-select
                      class="w-100"
                      v-model="ruleFormValue2.batchNumber"
                      @change="onChangeBatch()"
                    >
                      <el-option
                        v-for="item in batchList"
                        :key="item.id"
                        :value="item.batchNumber"
                        :label="item.batchName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-form-item
                    label="标签日期"
                    prop="tracingTimeType"
                    :rules="{ required: true, message: '请选择', trigger:'change' }"
                  >
                    <el-select class="w-100" v-model="ruleFormValue2.tracingTimeType">
                      <el-option
                        v-for="item in dateOption"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item
                    prop="tracingTime"
                    class="margin-left-10"
                    :rules="{ required: true, message: '请插入', trigger:'change' }"
                  >
                    <el-date-picker
                      class="w-100"
                      type="datetime"
                      v-model="ruleFormValue2.tracingTime"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-form-item
                    label="网页日期"
                    prop="webTimeType"
                    :rules="{ required: true, message: '请选择', trigger:'change' }"
                  >
                    <el-select class="w-100" v-model="ruleFormValue2.webTimeType">
                      <el-option
                        v-for="item in dateOption"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item
                    prop="webTime"
                    class="margin-left-10"
                    :rules="{ required: true, message: '请选择', trigger:'change' }"
                  >
                    <el-date-picker type="datetime" class="w-100" v-model="ruleFormValue2.webTime"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="责任人"
                    prop="charge"
                    :rules="{ required: true, message: '请插入', trigger:'change' }"
                  >
                    <el-input class="w-100" v-model="ruleFormValue2.charge"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="地址"
                    prop="locationId"
                    :rules="{ required: true, message: '请选择', trigger:'change' }"
                  >
                    <el-select class="w-100" v-model="ruleFormValue2.locationId">
                      <el-option
                        v-for="item in tableData"
                        :key="item.id"
                        :value="item.id"
                        :label="item.locationAddress"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="标签数量"
                    prop="tracingAmount"
                    :rules="[{ required: true, message: '请插入', trigger:'change' },{type: 'number',message: '插入号码'}]"
                  >
                    <el-input class="w-100" v-model.number="ruleFormValue2.tracingAmount"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item
                    label="有效期至"
                    prop="validTime"
                    :rules="{ required: true, message: '请插入', trigger:'change' }"
                  >
                    <el-date-picker
                      class="w-100"
                      type="datetime"
                      v-model="ruleFormValue2.validTime"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-form-item class="flex-box w-100">
                    <el-button type="success" plain @click="createQRCode('ruleForm2')">打印二维码</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import Request from "@/services/api/request";
import Pagination from "@/components/common/pagination";
import Auth from "@/services/authentication/auth.js";

export default {
  name: "tracingLabelManagement",
  components: { Pagination, QrcodeVue },
  data() {
    return {
      companyId: null,
      show_AddDialog: false,
      confirm_dialogVisible: false,
      show_QRCode: false,
      selectedRowId: "",
      selectedRowData: null,
      activeName: "base",
      qrValue: null,
      size: 300,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      page1: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      total1: 0,
      tableData: [],
      tableData1: [],
      batchList: [],
      varietyList: [],
      selectedTracingRow: null,
      gradeOption: [
        { gradeId: 1, gradeName: "特级" },
        { gradeId: 2, gradeName: "高级" },
        { gradeId: 3, gradeName: "中级" },
        { gradeId: 4, gradeName: "低级" }
      ],
      dateOption: [{ id: 0, name: "出货日期" }, { id: 1, name: "到货日期" }],
      listLoading: false,
      ruleFormValue: {
        locationName: null,
        locationAddress: null
      },
      ruleFormValue1: {
        tmp1: null,
        tmp2: null,
        tmp3: null
      },
      ruleFormValue2: {
        productId: null,
        batchNumber: null,
        tracingTimeType: null,
        tracingTime: null,
        webTimeType: null,
        webTime: null,
        charge: null,
        locationId: null,
        validTime: null,
        tracingAmount: null
      },
      productionList: []
    };
  },
  created() {
    this.companyId = Auth().user().attrs.companyId;
    this.getBaseList();
    this.getVarietyData();
  },
  methods: {
    showDetailsSampleCheck(row) {
      this.$router.push(`/sampleCheck/detailsSampleCheck/${row.id}`);
    },
    showDetailsSampleCheckResult(row) {
      this.$router.push(`/sampleCheck/detailsSampleCheckResult/${row.id}`);
    },
    getBaseList() {
      this.listLoading = true;
      Request()
        .get("/api/tracing_location/all", {
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
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
    getTracingList() {
      this.listLoading = true;
      Request()
        .get("/api/tracing/all", {
          pageNo: this.page1.pageIndex - 1,
          pageSize: this.page1.pageSize,
          companyId: this.companyId
        })
        .then(response => {
          this.tableData1 = response.data;
          this.total1 = response.total;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getProductProduction() {
      this.listLoading = true;
      Request()
        .get("/api/product_production/all", {
          company_id: this.companyId
        })
        .then(response => {
          this.productionList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getVarietyData() {
      this.listLoading = true;
      Request()
        .get("/api/product_variety/all", { productId: this.productId })
        .then(response => {
          this.varietyList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    onChangeProductId() {
      this.listLoading = true;
      Request()
        .get("/api/product_batch/all", {
          company_id: this.companyId,
          productId: this.ruleFormValue2.productId
        })
        .then(response => {
          this.batchList = response.data;
          for (let i in this.batchList) {
            let varietyName = this.getVarietyName(this.batchList[i].varietyId);
            let varietyGrade = this.getGradeName(
              this.batchList[i].varietyGrade
            );
            this.batchList[i].batchName =
              this.batchList[i].batchNumber +
              " " +
              varietyName +
              " " +
              varietyGrade;
          }
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    onChangeBatch() {
      let tracingRow = this.tableData1.find(
        x => x.batchNumber == this.ruleFormValue2.batchNumber
      );
      if (tracingRow) {
        if (tracingRow.charge) this.ruleFormValue2.charge = tracingRow.charge;
        if (tracingRow.locationId)
          this.ruleFormValue2.locationId = tracingRow.locationId;
        if (tracingRow.tracingAmount)
          this.ruleFormValue2.tracingAmount = tracingRow.tracingAmount;
        if (tracingRow.tracingTime)
          this.ruleFormValue2.tracingTime = tracingRow.tracingTime;
        if (tracingRow.tracingTimeType > -1)
          this.ruleFormValue2.tracingTimeType = tracingRow.tracingTimeType;
        if (tracingRow.validTime)
          this.ruleFormValue2.validTime = tracingRow.validTime;
        if (tracingRow.webTime)
          this.ruleFormValue2.webTime = tracingRow.webTime;
        if (tracingRow.webTimeType > -1)
          this.ruleFormValue2.webTimeType = tracingRow.webTimeType;
      }
    },
    onSubmitBase(formName) {
      this.$refs[formName].validate(valid => {
        let formData = new FormData();
        if (valid) {
          if (!this.selectedRowData) {
            this.show_AddDialog = false;
            this.listLoading = true;
            formData.append("id", 0);
            formData.append("companyId", this.companyId);
            formData.append("createTime", new Date());
            formData.append("createUserId", Auth().user().attrs.id);
            formData.append(
              "locationAddress",
              this.ruleFormValue.locationAddress
            );
            formData.append("locationName", this.ruleFormValue.locationName);
            Request()
              .post("/api/tracing_location/create", formData)
              .then(response => {
                this.ruleFormValue.locationName = "";
                this.ruleFormValue.locationAddress = "";
                setTimeout(() => {
                  this.getBaseList();
                }, 0.5 * 1000);
              })
              .catch(error => {
                console.error(error);
              });
          } else {
            this.show_AddDialog = false;
            this.listLoading = true;
            Request()
              .put("/api/tracing_location/update/" + this.selectedRowData.id, {
                id: this.selectedRowData.id,
                companyId: this.companyId,
                createUserId: this.selectedRowData.createUserId,
                locationAddress: this.ruleFormValue.locationAddress,
                locationName: this.ruleFormValue.locationName,
                updateUserId: Auth().user().attrs.id
              })
              .then(response => {
                this.ruleFormValue.locationName = "";
                this.ruleFormValue.locationAddress = "";
                this.selectedRowData = null;
                setTimeout(() => {
                  this.getBaseList();
                }, 0.5 * 1000);
              })
              .catch(error => {
                console.error(error);
              });
          }
        }
      });
    },
    createQRCode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let tmpData = JSON.stringify(this.ruleFormValue2);
          this.qrValue = tmpData;
          this.show_QRCode = true;
        }
      });
    },
    onPrint() {
      this.show_QRCode = false;
      this.listLoading = true;
      let targetbatchName = "";
      let targetbatch = this.batchList.find(
        x => x.batchNumber == this.ruleFormValue2.batchNumber
      );
      if (targetbatch) {
        targetbatchName = targetbatch.batchName.split(" ");
        targetbatchName = targetbatchName[1] + "," + targetbatchName[2];
      }
      Request()
        .put("/api/tracing/update/" + this.selectedTracingRow.id, {
          id: this.selectedTracingRow.id,
          companyId: this.companyId,
          createUserId: this.selectedTracingRow.createUserId,
          createTime: new Date(this.selectedTracingRow.createTime),
          batchNumber: this.ruleFormValue2.batchNumber,
          batchName: targetbatchName,
          printStatus: 1,
          validTime: new Date(this.ruleFormValue2.validTime),
          tracingAmount: this.ruleFormValue2.tracingAmount,
          productId: this.ruleFormValue2.productId,
          tracingTimeType: this.ruleFormValue2.tracingTimeType,
          tracingTime: new Date(this.ruleFormValue2.tracingTime),
          webTimeType: this.ruleFormValue2.webTimeType,
          webTime: new Date(this.ruleFormValue2.webTime),
          productionTime: new Date(this.selectedTracingRow.productionTime),
          locationId: this.ruleFormValue2.locationId,
          charge: this.ruleFormValue2.charge,
          updateUserId: Auth().user().attrs.id
        })
        .then(response => {
          this.ruleFormValue2.productId = null;
          this.ruleFormValue2.batchNumber = null;
          this.ruleFormValue2.tracingTimeType = null;
          this.ruleFormValue2.tracingTime = null;
          this.ruleFormValue2.webTimeType = null;
          this.ruleFormValue2.webTime = null;
          this.ruleFormValue2.charge = null;
          this.ruleFormValue2.locationId = null;
          this.ruleFormValue2.validTime = null;
          this.ruleFormValue2.tracingAmount = null;
          setTimeout(() => {
            this.listLoading = false;
            document.getElementById("tab-tagQuery").click();
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    handleClick(tab, event) {
      if (tab.index == 0) {
        this.getBaseList();
      }
      if (tab.index == 2) {
        this.getProductProduction();
        this.getTracingList();
      }
      if (tab.index == 3) {
        this.getProductProduction();
        this.getTracingList();
      }
    },
    goToTagGeneration(rowData) {
      this.selectedTracingRow = rowData;
      document.getElementById("tab-labelPrinting").click();
      if (rowData) {
        if (rowData.productId)
          this.ruleFormValue2.productId = rowData.productId;
        this.onChangeProductId();
        if (rowData.batchNumber)
          this.ruleFormValue2.batchNumber = rowData.batchNumber;
        if (rowData.charge) this.ruleFormValue2.charge = rowData.charge;
        if (rowData.locationId)
          this.ruleFormValue2.locationId = rowData.locationId;
        if (rowData.tracingAmount)
          this.ruleFormValue2.tracingAmount = rowData.tracingAmount;
        if (rowData.tracingTime)
          this.ruleFormValue2.tracingTime = rowData.tracingTime;
        if (rowData.tracingTimeType > -1)
          this.ruleFormValue2.tracingTimeType = rowData.tracingTimeType;
        if (rowData.validTime)
          this.ruleFormValue2.validTime = rowData.validTime;
        if (rowData.webTime) this.ruleFormValue2.webTime = rowData.webTime;
        if (rowData.webTimeType > -1)
          this.ruleFormValue2.webTimeType = rowData.webTimeType;
      }
    },
    deleteSelectedBase(rowId) {
      this.selectedRowId = rowId;
      this.confirm_dialogVisible = true;
    },
    deleteSelectedRow() {
      this.listLoading = true;
      this.confirm_dialogVisible = false;
      this.show_AddDialog = false;
      Request()
        .delete("/api/tracing_location/delete/" + this.selectedRowId)
        .then(response => {
          this.ruleFormValue.locationName = "";
          this.ruleFormValue.locationAddress = "";
          setTimeout(() => {
            this.getBaseList();
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    editSelectedBase(rowData) {
      this.selectedRowData = rowData;
      this.ruleFormValue.locationAddress = rowData.locationAddress;
      this.ruleFormValue.locationName = rowData.locationName;
      this.show_AddDialog = true;
    },
    filterProductName(id) {
      let product = this.productionList.find(x => x.productId === id);
      if (product) {
        return product.productName;
      } else {
        return "";
      }
    },
    filterTracingLocation(id) {
      let location = this.tableData.find(x => x.id === id);
      if (location) {
        return location.locationName;
      } else {
        return "";
      }
    },
    getVarietyName(id) {
      let variety = this.varietyList.find(x => x.id === id);
      if (variety) {
        return variety.varietyName;
      } else {
        return "";
      }
    },
    getGradeName(id) {
      let grade = this.gradeOption.find(x => x.gradeId === id);
      if (grade) {
        return grade.gradeName;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
