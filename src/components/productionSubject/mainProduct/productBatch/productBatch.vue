<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">产品批次</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <div class="filter-item">
          <el-button size="small"
            type="primary"
            v-if="loggedinUserType === 3 || loggedinUserType === 0"
            plain
            v-on:click="$router.push({path: `/productionSubject/mainProduct/productBatch/${productId}/create`})"
          >添加</el-button>
          <el-button size="small" type="primary" plain @click="$router.go(-1)">返回</el-button>
        </div>
      </div>
      <el-dialog :visible.sync="confirm_dialogVisible" width="30%" modal>
        <span>
          <i class="el-icon-warning">&nbsp;继续？请再次检查</i>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="confirm_dialogVisible = false" type="primary" plain>取消</el-button>
          <el-button size="small" type="success" @click="deleteSelectedRow()" plain>确认</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="show_TaskDialog" width="30%" modal>
        <el-row>
          <el-col :span="24" class="margin-bottom-30 text-center">
            <h1>作业</h1>
          </el-col>
        </el-row>
        <el-form label-width="100px" ref="ruleForm1" :model="ruleFormValue1">
          <el-row>
            <el-col :span="20">
              <el-form-item
                label="作业名称"
                prop="productTask"
                :rules="{ required: true, message: '请选择', trigger:'change' }"
              >
                <el-select class="w-100" v-model="ruleFormValue1.productTask">
                  <el-option
                    v-for="item in taskList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.taskName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item
                label="日期"
                prop="taskDate"
                :rules="{ required: true, message: '请选择', trigger:'change' }"
              >
                <el-date-picker class="w-100" type="datetime" v-model="ruleFormValue1.taskDate"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">&nbsp;</el-col>
            <el-col :span="10">
              <el-button size="small"
                type="warning"
                plain
                @click="chooseFile_Live()"
                class="margin-bottom-10"
              >选择文件</el-button>
              <el-link
                style="display:table"
                @click="downloadFile(fileName1)"
                v-if="!file_live_1 && fileName1"
              >
                {{
                fileName1.replace("/uploads/", "")
                }}
              </el-link>
              <p v-if="file_live_1">({{ file_live_1.name }})</p>
              <p v-if="!file_live_1 && !fileName1">请选择需要上传的文件...</p>
            </el-col>
            <el-col :span="5">
              <div class="img-container no-margin-top margin-bottom-30 margin-left-10">
                <img
                  :src="downloadUrl + fileName1"
                  class="preview"
                  v-if="!file_live_1 && fileName1"
                />
                <img :src="image" class="preview" v-if="file_live_1 && fileName1" />
              </div>
              <div class="image-box">
                <input
                  type="file"
                  id="file1"
                  ref="file_live_1"
                  class="image-upload"
                  accept="image/*"
                  v-on:change="handleFileUpload_Live()"
                  name="images"
                  style="display:none"
                />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="text-right">
              <el-form-item class="flex-box w-100">
                <el-button size="small" @click="show_TaskDialog = false" type="primary" plain>关闭</el-button>
                <el-button size="small"
                  @click="showConfirmDialog(1)"
                  type="danger"
                  plain
                  v-if="!isHideDeleteButton"
                >删除</el-button>
                <el-button size="small" @click="onSubmitTask('ruleForm1')" type="success" plain>保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="show_ReportDialog" width="30%" modal>
        <el-row>
          <el-col :span="24" class="margin-bottom-30 text-center">
            <h1>上传检测报告</h1>
          </el-col>
        </el-row>
        <el-form label-width="100px" ref="ruleForm2" :model="ruleFormValue2">
          <el-row>
            <el-col :span="20">
              <el-form-item
                label="日期"
                prop="reportDate"
                :rules="{ required: true, message: '请选择', trigger:'change' }"
              >
                <el-date-picker class="w-100" type="datetime" v-model="ruleFormValue2.reportDate"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item
                label="结果"
                prop="reportResult"
                :rules="{ required: true, message: '请选择', trigger:'change' }"
              >
                <el-select class="w-100" type="datetime" v-model="ruleFormValue2.reportResult">
                  <el-option
                    v-for="item in resultOption"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">&nbsp;</el-col>
            <el-col :span="18" class="margin-bottom-30">
              <el-button size="small"
                type="warning"
                plain
                @click="chooseFile_Report()"
                class="margin-bottom-10"
              >选择文件</el-button>
              <el-link
                @click="downloadFile(fileName2)"
                v-if="!file_live_2 && fileName2"
                class="margin-left-10"
              >
                {{
                fileName2.replace("/uploads/", "")
                }}
              </el-link>
              <p v-if="file_live_2">({{ file_live_2.name }})</p>
              <p v-if="!file_live_2 && !fileName2">请选择需要上传的文件...</p>
            </el-col>
            <el-col :span="5">
              <div class="image-box">
                <input
                  type="file"
                  id="file2"
                  ref="file_live_2"
                  class="image-upload"
                  v-on:change="handleFileUpload_Report()"
                  name="images"
                  style="display:none"
                />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="text-right">
              <el-form-item class="flex-box w-100">
                <el-button size="small" @click="show_ReportDialog = false" type="primary" plain>关闭</el-button>
                <el-button size="small" @click="onSubmitReport('ruleForm2')" type="success" plain>保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="show_PropertyDialog" width="30%" modal>
        <el-row>
          <el-col :span="24" class="margin-bottom-30 text-center">
            <h1>属性</h1>
          </el-col>
        </el-row>
        <el-form label-width="100px" ref="ruleForm3" :model="ruleFormValue3">
          <el-row>
            <el-col :span="20">
              <el-form-item
                label="属性名称"
                prop="propertyName"
                :rules="{ required: true, message: '请选择', trigger:'change' }"
              >
                <el-select
                  class="w-100"
                  v-model="ruleFormValue3.propertyName"
                  @change="makePropertyValueList()"
                >
                  <el-option
                    v-for="item in propertyList"
                    :key="item.id"
                    :label="item.propertyName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item
                label="属性值"
                prop="propertyValue"
                :rules="{ required: true, message: '请选择', trigger:'change' }"
              >
                <el-select class="w-100" v-model="ruleFormValue3.propertyValue">
                  <el-option
                    v-for="item in propertyValueList"
                    :key="item.index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="text-right">
              <el-form-item class="flex-box w-100">
                <el-button size="small" @click="show_PropertyDialog = false" type="primary" plain>关闭</el-button>
                <el-button size="small"
                  @click="showConfirmDialog(3)"
                  type="danger"
                  plain
                  v-if="!isHideDeleteButton"
                >删除</el-button>
                <el-button size="small" @click="onSubmitProperty('ruleForm3')" type="success" plain>保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="show_SaleDialog" width="30%" modal>
        <el-row>
          <el-col :span="24" class="margin-bottom-30 text-center">
            <h1>销售</h1>
          </el-col>
        </el-row>
        <el-form label-width="100px" ref="ruleForm4" :model="ruleFormValue4">
          <el-row>
            <el-col :span="15">
              <el-form-item
                label="销售去向"
                prop="productSaleDestination"
                :rules="{ required: true, message: '请插入', trigger:'change' }"
              >
                <el-input class="w-80" v-model="ruleFormValue4.productSaleDestination"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-select
                class="w-100"
                v-model="ruleFormValue4.selProductSaleDestination"
                @change="onChangeSaleList()"
              >
                <el-option v-for="item in saleList" :value="item" :key="item" :label="item"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item
                label="日期"
                prop="saleDate"
                :rules="{ required: true, message: '请选择', trigger:'change' }"
              >
                <el-date-picker class="w-100" type="datetime" v-model="ruleFormValue4.saleDate"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">&nbsp;</el-col>
            <el-col :span="18" class="margin-bottom-30">
              <el-button size="small"
                type="warning"
                plain
                @click="chooseFile_Sale()"
                class="margin-bottom-10"
              >选择文件</el-button>
              <el-link
                @click="downloadFile(fileName3)"
                v-if="!file_live_3 && fileName3"
                class="margin-left-10"
              >
                {{
                fileName3.replace("/uploads/", "")
                }}
              </el-link>
              <p v-if="file_live_3">({{ file_live_3.name }})</p>
              <p v-if="!file_live_3 && !fileName3">请选择需要上传的文件...</p>
            </el-col>
            <el-col :span="5">
              <div class="image-box">
                <input
                  type="file"
                  id="file3"
                  ref="file_live_3"
                  class="image-upload"
                  v-on:change="handleFileUpload_Sale()"
                  name="images"
                  style="display:none"
                />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="text-right">
              <el-form-item class="flex-box w-100">
                <el-button size="small" @click="show_SaleDialog = false" type="primary" plain>关闭</el-button>
                <el-button size="small"
                  @click="showConfirmDialog(2)"
                  type="danger"
                  plain
                  v-if="!isHideDeleteButton"
                >删除</el-button>
                <el-button size="small" @click="onSubmitSale('ruleForm4')" type="success" plain>保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="rowIndex"
        v-loading="listLoading"
      >
        <el-table-column :formatter="order" label="序号" width="70"></el-table-column>
        <el-table-column prop="grade" label="批次名称">
          <template slot-scope="{ row }">
            {{row.createTime | formatDateTime}}&nbsp;,&nbsp;
            {{getVarietyName(row.varietyId)}}&nbsp;,&nbsp;
            {{getGradeName(row.varietyGrade)}}
          </template>
        </el-table-column>
        <el-table-column prop="batchNumber" label="批次号"></el-table-column>
        <el-table-column prop="taskData" label="作业">
          <template slot-scope="{ row }">
            <div class="w-100">
              <el-link
                style="display:table"
                v-for="item in row.taskData"
                :key="item.id"
                @click="onClickTaskRow(item)"
              >{{item.taskDate | formatDate}}&nbsp;{{getTaskName(item.productTask)}}</el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="saleData" label="销售">
          <template slot-scope="{ row }">
            <div class="w-100">
              <el-link
                style="display:table"
                v-for="item in row.saleData"
                :key="item.id"
                @click="onClickSaleRow(item)"
              >{{item.saleDate | formatDate}}&nbsp;{{item.productSaleDestination}}</el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="property" label="属性名称">
          <template slot-scope="{ row }">
            <div class="w-100">
              <el-link
                style="display:table"
                v-for="item in row.property"
                :key="item.index"
                @click="onClickPropertyRow(item, row)"
              >{{getPropertyName(item.propertyName)}}</el-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="reportResult" label="检测报告">
          <template
            slot-scope="{row}"
          >{{ row.reportResult>-1 ? resultOption[row.reportResult].label : "没有报告" }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          v-if="loggedinUserType === 3 || loggedinUserType === 0"
          class-name="text-center"
        >
          <template slot-scope="{ row }">
            <el-button size="small"
              plain
              type="warning"
              class="margin-bottom-10"
              v-on:click="$router.push({path: `/productionSubject/mainProduct/productBatch/${productId}/edit/${row.id}`})"
            >修改</el-button>
            <el-button size="small"
              plain
              type="success"
              class="margin-bottom-10"
              @click="showDialog(row,'show_TaskDialog',true)"
            >作业</el-button>
            <el-button size="small"
              plain
              type="success"
              class="margin-bottom-10"
              @click="showDialog(row,'show_ReportDialog', true)"
              :disabled="row.taskData.length==0"
            >上传检测报告</el-button>
            <el-button size="small" plain type="success" @click="showDialog(row,'show_PropertyDialog', true)">属性</el-button>
            <el-button size="small" plain type="success" @click="showDialog(row,'show_SaleDialog', true)">销售</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox">
        <pagination
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
import Auth from "@/services/authentication/auth.js";
import Request from "@/services/api/request.js";
import { Urls } from "@/services/constants.js";
import axios from "axios";
import Storage from "store";
export default {
  name: "productBatch",
  components: { Pagination },
  data() {
    return {
      fileName1: "",
      file_live_1: null,
      image: null,
      fileName2: "",
      file_live_2: null,
      fileName3: "",
      file_live_3: null,
      loggedinUserType: null,
      productId: -1,
      itemId: null,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      radio: "1",
      tableData: null,
      confirm_dialogVisible: false,
      listLoading: false,
      show_TaskDialog: false,
      show_ReportDialog: false,
      show_PropertyDialog: false,
      show_SaleDialog: false,
      varietyList: [],
      selectedBatchId: null,
      isHideDeleteButton: false,
      taskList: [],
      saleList: [],
      originPropertyName: null,
      originPropertyValue: null,
      downloadUrl: null,
      batchTaskList: [],
      batchSaleList: [],
      propertyList: [],
      selectedBatchRow: [],
      propertyValueList: [],
      companyId: null,
      ruleFormValue1: {
        productTask: null,
        taskDate: ""
      },
      ruleFormValue2: {
        reportDate: "",
        reportResult: null
      },
      ruleFormValue4: {
        productSaleDestination: "",
        selProductSaleDestination: "",
        saleDate: ""
      },
      ruleFormValue3: {
        propertyName: "",
        propertyValue: ""
      },
      gradeOption: [
        { gradeId: 1, gradeName: "特级" },
        { gradeId: 2, gradeName: "高级" },
        { gradeId: 3, gradeName: "中级" },
        { gradeId: 4, gradeName: "低级" }
      ],
      resultOption: [{ value: 0, label: "不合格" }, { value: 1, label: "合格" }]
    };
  },
  async created() {
    this.productId = this.$route.params.id;
    this.downloadUrl = Urls.DOWNLOAD_URL();
    this.companyId = this.$route.query.companyId;
    if (this.companyId) {
      Storage.set("selectedCompanyId", this.companyId);
    }
    this.getVarietyData();
    this.getTaskList();
    this.getProductProperty();
    this.getList();
    this.loggedinUserType = Auth().user().attrs.userType;
  },
  methods: {
    async getList() {
      await this.getBatchTaskList();
      await this.getBatchSaleList();
      this.listLoading = true;
      Request()
        .get("/api/product_batch/all", {
          productId: this.productId,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize
        })
        .then(res => {
          let tmpData = res.data;
          this.total = res.total;
          for (let index in tmpData) {
            if (tmpData[index].property) {
              tmpData[index].property = JSON.parse(tmpData[index].property);
            }
            let task = this.batchTaskList.filter(
              el => el.productBatchId === tmpData[index].id
            );
            let sale = this.batchSaleList.filter(
              el => el.productBatchId === tmpData[index].id
            );
            if (task) {
              tmpData[index].taskData = task;
            }
            if (sale) {
              tmpData[index].saleData = sale;
              for (let i in sale) {
                this.saleList.push(sale[i].productSaleDestination);
              }
              this.saleList = [...new Set(this.saleList)];
            }
          }
          this.tableData = tmpData;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    getTaskList() {
      this.listLoading = true;
      Request()
        .get("/api/product_task/all", {
          productId: this.productId
        })
        .then(res => {
          this.taskList = res.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getVarietyData() {
      Request()
        .get("/api/product_variety/all", { productId: this.productId })
        .then(response => {
          this.varietyList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getBatchTaskList() {
      this.listLoading = true;
      return Request()
        .get("/api/product_batch_task/all", {
          productId: this.productId
        })
        .then(response => {
          this.batchTaskList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getBatchSaleList() {
      this.listLoading = true;
      return Request()
        .get("/api/product_sale/all", {
          productId: this.productId
        })
        .then(response => {
          this.batchSaleList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getProductProperty() {
      Request()
        .get("/api/product_property/all", {
          productId: this.productId
        })
        .then(response => {
          this.propertyList = response.data;
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
    chooseFile_Live() {
      document.getElementById("file1").click();
    },
    chooseFile_Report() {
      document.getElementById("file2").click();
    },
    chooseFile_Sale() {
      document.getElementById("file3").click();
    },
    handleFileUpload_Live(e) {
      this.file_live_1 = this.$refs.file_live_1.files[0];
      this.image = null;
      let reader = new FileReader();
      let that = this;
      reader.onload = function(e) {
        that.image = e.target.result;
      };
      if (this.file_live_1) {
        reader.readAsDataURL(this.file_live_1);
        this.fileName1 = this.file_live_1.name;
      } else {
        this.fileName1 = "";
      }
    },
    handleFileUpload_Report() {
      this.file_live_2 = this.$refs.file_live_2.files[0];
    },
    handleFileUpload_Sale() {
      this.file_live_3 = this.$refs.file_live_3.files[0];
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
    },
    showDialog(rowData, dialogName, isHideDeleteButton) {
      this.ruleFormValue2.reportDate = rowData.reportTime;
      this.ruleFormValue2.reportResult = rowData.reportResult;
      this.fileName2 = rowData.reportFile;
      this.formatData();
      switch (dialogName) {
        case "show_TaskDialog":
          this.show_TaskDialog = true;
          break;
        case "show_ReportDialog":
          this.show_ReportDialog = true;
          break;
        case "show_PropertyDialog":
          this.show_PropertyDialog = true;
          break;
        case "show_SaleDialog":
          this.show_SaleDialog = true;
          break;
      }
      this.selectedBatchId = rowData.id;
      this.selectedBatchRow = rowData;
      this.isHideDeleteButton = isHideDeleteButton;
    },
    onSubmitTask(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isHideDeleteButton) {
            this.show_TaskDialog = false;
            let formData = new FormData();
            const createTime = new Date();
            this.listLoading = true;
            formData.append("createTime", createTime);
            formData.append("companyId", Storage.get("selectedCompanyId"));
            formData.append("file", this.file_live_1);
            formData.append("id", 0);
            formData.append("createUserId", Auth().user().attrs.id);
            formData.append("productId", this.productId);
            formData.append("productBatchId", this.selectedBatchId);
            formData.append("productTask", this.ruleFormValue1.productTask);
            formData.append("taskDate", this.ruleFormValue1.taskDate);
            formData.append("updateTime", createTime); // not sure
            Request()
              .post("/api/product_batch_task/create", formData)
              .then(response => {
                this.formatData();
                setTimeout(() => {
                  this.listLoading = false;
                  this.getList();
                }, 0.5 * 1000);
              })
              .catch(error => {
                console.error(error);
              });
          } else {
            this.show_TaskDialog = false;
            let formData = new FormData();
            const createTime = new Date();
            this.listLoading = true;
            formData.append("companyId", Storage.get("selectedCompanyId"));
            if (this.file_live_1) {
              formData.append("file", this.file_live_1);
            }
            formData.append("id", this.itemId);
            formData.append("productId", this.productId);
            formData.append("productBatchId", this.selectedBatchId);
            formData.append("productTask", this.ruleFormValue1.productTask);
            let tmpDate = this.ruleFormValue1.taskDate;
            tmpDate = new Date(tmpDate).toDateString();
            formData.append("taskDate", tmpDate);
            formData.append("updateTime", createTime); // not sure
            Request()
              .put("/api/product_batch_task/update/" + this.itemId, formData)
              .then(response => {
                this.formatData();
                setTimeout(() => {
                  this.listLoading = false;
                  this.getList();
                }, 0.5 * 1000);
              })
              .catch(error => {
                console.error(error);
              });
          }
        }
      });
    },
    onSubmitSale(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isHideDeleteButton) {
            this.show_SaleDialog = false;
            let formData = new FormData();
            const createTime = new Date();
            this.listLoading = true;
            formData.append("createTime", createTime);
            formData.append("companyId", Storage.get("selectedCompanyId"));
            formData.append("file", this.file_live_3);
            formData.append("id", 0);
            formData.append("createUserId", Auth().user().attrs.id);
            formData.append("productId", this.productId);
            formData.append("productBatchId", this.selectedBatchId);
            formData.append(
              "productSaleDestination",
              this.ruleFormValue4.productSaleDestination
            );
            formData.append("saleDate", this.ruleFormValue4.saleDate);
            formData.append("updateTime", createTime); // not sure
            Request()
              .post("/api/product_sale/create", formData)
              .then(response => {
                this.formatData();
                setTimeout(() => {
                  this.listLoading = false;
                  this.getList();
                }, 0.5 * 1000);
              })
              .catch(error => {
                console.error(error);
              });
          } else {
            this.show_SaleDialog = false;
            let formData = new FormData();
            const createTime = new Date();
            this.listLoading = true;
            formData.append("companyId", Storage.get("selectedCompanyId"));
            if (this.file_live_3) {
              formData.append("file", this.file_live_3);
            }
            formData.append("id", this.itemId);
            formData.append("productId", this.productId);
            formData.append("productBatchId", this.selectedBatchId);
            formData.append(
              "productSaleDestination",
              this.ruleFormValue4.productSaleDestination
            );
            let tmpDate = this.ruleFormValue4.saleDate;
            tmpDate = new Date(tmpDate).toDateString();
            formData.append("saleDate", tmpDate);
            formData.append("updateTime", createTime); // not sure
            Request()
              .put("/api/product_sale/update/" + this.itemId, formData)
              .then(response => {
                this.formatData();
                setTimeout(() => {
                  this.listLoading = false;
                  this.getList();
                }, 0.5 * 1000);
              })
              .catch(error => {
                console.error(error);
              });
          }
        }
      });
    },
    onSubmitReport(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.show_ReportDialog = false;
          this.listLoading = true;
          const tmpDate = new Date(this.ruleFormValue2.reportDate);
          if (this.ruleFormValue2.reportResult > 0) {
            let tracingFormData = new FormData();
            const batchSubName1 = this.getVarietyName(
              this.selectedBatchRow.varietyId
            );
            const batchSubName2 = this.getGradeName(
              this.selectedBatchRow.varietyGrade
            );
            tracingFormData.append("id", 0);
            tracingFormData.append("productId", this.productId);
            tracingFormData.append(
              "companyId",
              Storage.get("selectedCompanyId")
            ); //temporary - later this.companyId
            let tmpTaskDate;
            if (this.selectedBatchRow.taskData.length > 0) {
              tmpTaskDate = new Date(
                this.selectedBatchRow.taskData[0].taskDate
              );
            }
            tracingFormData.append("productionTime", tmpTaskDate);
            tracingFormData.append("locationId", 0);
            tracingFormData.append("charge", "");

            tracingFormData.append("reportTime", tmpDate);
            tracingFormData.append(
              "batchNumber",
              this.selectedBatchRow.batchNumber
            );
            tracingFormData.append(
              "batchName",
              batchSubName1 + "," + batchSubName2
            );
            tracingFormData.append("tracingNumber", "");
            // tracingFormData.append("tracingTime", createTime);
            tracingFormData.append("tracingTimeType", 0);
            // tracingFormData.append("webTime", createTime);
            tracingFormData.append("webTimeType", 0);
            tracingFormData.append("tracingAmount", 0);
            tracingFormData.append("printStatus", 0);
            tracingFormData.append("createTime", new Date());
            tracingFormData.append("createUserId", Auth().user().attrs.id);
            tracingFormData.append("updateTime", new Date());
            tracingFormData.append("updateUserId", 0);

            Request()
              .post("/api/tracing/create", tracingFormData)
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.error(error);
              });
          }
          let formData = new FormData();
          const createTime = new Date();
          formData.append("batchNumber", this.selectedBatchRow.batchNumber);
          formData.append("createTime", this.selectedBatchRow.createTime);
          formData.append("companyId", Storage.get("selectedCompanyId"));
          formData.append("id", this.selectedBatchId);
          formData.append("createUserId", this.selectedBatchRow.createUserId);
          formData.append("productId", this.productId);
          formData.append(
            "property",
            JSON.stringify(this.selectedBatchRow.property)
          );
          formData.append("varietyGrade", this.selectedBatchRow.varietyGrade);
          formData.append("varietyId", this.selectedBatchRow.varietyId);
          formData.append("updateTime", createTime);
          formData.append("updateUserId", Auth().user().attrs.id);
          if (this.file_live_2) {
            formData.append("file", this.file_live_2);
          }
          formData.append("reportResult", this.ruleFormValue2.reportResult);
          formData.append("reportTime", tmpDate);
          Request()
            .put("/api/product_batch/update/" + this.selectedBatchId, formData)
            .then(response => {
              this.getList();
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    },
    onSubmitProperty(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.show_PropertyDialog = false;
          this.listLoading = true;
          if (this.selectedBatchRow.property) {
            let checkRepeat = this.selectedBatchRow.property.find(
              x =>
                x.propertyName === this.ruleFormValue3.propertyName &&
                x.propertyValue === this.ruleFormValue3.propertyValue
            );

            let repeatIndex = this.selectedBatchRow.property.indexOf(
              checkRepeat
            );
            if (repeatIndex > -1)
              this.selectedBatchRow.property.splice(repeatIndex, 1);
          }
          let formData = new FormData();
          const createTime = new Date();
          if (this.isHideDeleteButton) {
            let tmp = [];
            if (this.selectedBatchRow.property)
              tmp = this.selectedBatchRow.property;

            tmp.push({
              propertyName: this.ruleFormValue3.propertyName,
              propertyValue: this.ruleFormValue3.propertyValue
            });
            formData.append("property", JSON.stringify(tmp)); //////
          } else {
            let tmp = this.selectedBatchRow.property.find(
              x =>
                x.propertyName === this.originPropertyName &&
                x.propertyValue === this.originPropertyValue
            );

            let index = this.selectedBatchRow.property.indexOf(tmp);
            this.selectedBatchRow.property[
              index
            ].propertyName = this.ruleFormValue3.propertyName;
            this.selectedBatchRow.property[
              index
            ].propertyValue = this.ruleFormValue3.propertyValue;
            tmp = this.selectedBatchRow.property;
            formData.append("property", JSON.stringify(tmp)); //////
          }
          formData.append("batchNumber", this.selectedBatchRow.batchNumber);
          formData.append("createTime", this.selectedBatchRow.createTime);
          formData.append("companyId", Storage.get("selectedCompanyId"));
          formData.append("id", this.selectedBatchId);
          formData.append("createUserId", this.selectedBatchRow.createUserId);
          formData.append("productId", this.productId);

          formData.append("varietyGrade", this.selectedBatchRow.varietyGrade);
          formData.append("varietyId", this.selectedBatchRow.varietyId);
          formData.append("updateTime", createTime);
          formData.append("updateUserId", Auth().user().attrs.id);
          if (this.selectedBatchRow.reportResult > -1)
            formData.append("reportResult", this.selectedBatchRow.reportResult);
          if (this.selectedBatchRow.reportTime) {
            const tmpDate = new Date(this.selectedBatchRow.reportTime);
            formData.append("reportTime", tmpDate);
          }
          Request()
            .put("/api/product_batch/update/" + this.selectedBatchId, formData)
            .then(response => {
              this.getList();
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    },
    getTaskName(taskId) {
      let task = this.taskList.find(x => x.id === taskId);
      if (task) {
        return task.taskName;
      } else {
        return "";
      }
    },
    getPropertyName(id) {
      let property = this.propertyList.find(x => x.id === id);
      if (property) {
        return property.propertyName;
      } else {
        return "";
      }
    },
    downloadFile(url) {
      axios({
        url: Urls.DOWNLOAD_URL() + url,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", url.replace("/uploads/", "")); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
    formatData() {
      this.ruleFormValue1.taskDate = "";
      this.ruleFormValue1.productTask = null;
      this.file_live_1 = null;
      this.fileName1 = "";
      this.ruleFormValue4.saleDate = "";
      this.ruleFormValue4.productSaleDestination = "";
      this.file_live_3 = null;
      this.fileName3 = "";
      this.file_live_2 = null;
      this.ruleFormValue3.propertyName = null;
      this.ruleFormValue3.propertyValue = null;
    },
    onClickTaskRow(item) {
      this.isHideDeleteButton = false;
      this.itemId = item.id;
      this.selectedBatchId = item.productBatchId;
      this.ruleFormValue1.productTask = item.productTask;
      this.ruleFormValue1.taskDate = item.taskDate;
      this.fileName1 = item.productTaskFile;
      this.show_TaskDialog = true;
    },
    onClickSaleRow(item) {
      this.isHideDeleteButton = false;
      this.itemId = item.id;
      this.selectedBatchId = item.productBatchId;
      this.ruleFormValue4.productSaleDestination = item.productSaleDestination;
      this.ruleFormValue4.saleDate = item.saleDate;
      this.fileName3 = item.productSaleFile;
      this.show_SaleDialog = true;
    },
    onClickPropertyRow(item, rowData) {
      this.isHideDeleteButton = false;
      this.itemId = item.productName;
      this.selectedBatchRow = rowData;
      this.selectedBatchId = rowData.id;
      this.ruleFormValue3.propertyName = item.propertyName;
      this.ruleFormValue3.propertyValue = item.propertyValue;
      this.makePropertyValueList();
      this.originPropertyName = item.propertyName;
      this.originPropertyValue = item.propertyValue;
      this.show_PropertyDialog = true;
    },
    deleteSelectedTask() {
      this.show_TaskDialog = false;
      this.listLoading = true;
      Request()
        .delete("/api/product_batch_task/delete/" + this.itemId)
        .then(response => {
          this.formatData();
          setTimeout(() => {
            this.listLoading = false;
            this.getList();
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteSelectedSale() {
      this.show_SaleDialog = false;
      this.listLoading = true;
      Request()
        .delete("/api/product_sale/delete/" + this.itemId)
        .then(response => {
          this.formatData();
          setTimeout(() => {
            this.listLoading = false;
            this.getList();
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteSelectedProperty() {
      this.show_PropertyDialog = false;
      this.listLoading = true;
      let tmp = this.selectedBatchRow.property.find(
        x =>
          x.propertyName === this.originPropertyName &&
          x.propertyValue === this.originPropertyValue
      );

      let index = this.selectedBatchRow.property.indexOf(tmp);
      if (index > -1) this.selectedBatchRow.property.splice(index, 1);
      let formData = new FormData();
      const createTime = new Date();
      tmp = this.selectedBatchRow.property;
      formData.append("property", JSON.stringify(tmp)); //////

      formData.append("batchNumber", this.selectedBatchRow.batchNumber);
      formData.append("createTime", this.selectedBatchRow.createTime);
      formData.append("companyId", Storage.get("selectedCompanyId"));
      formData.append("id", this.selectedBatchId);
      formData.append("createUserId", this.selectedBatchRow.createUserId);
      formData.append("productId", this.productId);

      formData.append("varietyGrade", this.selectedBatchRow.varietyGrade);
      formData.append("varietyId", this.selectedBatchRow.varietyId);
      formData.append("updateTime", createTime);
      formData.append("updateUserId", Auth().user().attrs.id);
      if (this.selectedBatchRow.reportTime) {
        const tmpDate = new Date(this.selectedBatchRow.reportTime);
        formData.append("reportTime", tmpDate);
      }
      if (this.selectedBatchRow.reportResult > -1) {
        formData.append("reportResult", this.selectedBatchRow.reportResult);
      }
      Request()
        .put("/api/product_batch/update/" + this.selectedBatchId, formData)
        .then(response => {
          this.getList();
        })
        .catch(error => {
          console.error(error);
        });
    },
    onChangeSaleList() {
      this.ruleFormValue4.productSaleDestination = this.ruleFormValue4.selProductSaleDestination;
    },
    makePropertyValueList() {
      // this.ruleFormValue3.propertyValue = null;
      let property = this.propertyList.find(
        x => x.id === this.ruleFormValue3.propertyName
      );
      let tmpList = property.propertyOptions;
      this.propertyValueList = tmpList.split(",");
      this.propertyValueList = [...new Set(this.propertyValueList)];
    },
    showConfirmDialog(category) {
      this.confirm_dialogVisible = true;
      this.category = category;
    },
    deleteSelectedRow() {
      this.confirm_dialogVisible = false;
      switch (this.category) {
        case 1:
          this.deleteSelectedTask();
          break;
        case 2:
          this.deleteSelectedSale();
          break;
        case 3:
          this.deleteSelectedProperty();
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./productBatch.scss";
</style>
