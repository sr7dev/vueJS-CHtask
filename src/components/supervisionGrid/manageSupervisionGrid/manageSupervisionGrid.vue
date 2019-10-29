<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管网格</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box no-padding-bottom">
      <div class="container no-padding-bottom">
        <el-button size="small" type="primary" plain v-on:click="$router.go(-1)">返回</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="openDialog" width="60%" :before-close="handleClose" :title="header">
      <!-- <el-row>
        <el-col :span="3" class="margin-bottom-30 margin-left-30">{{header}}</el-col>
      </el-row>-->
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="100px">
        <el-row v-if="showWebMaster">
          <el-col :span="5">
            <el-form-item
              prop="webMaster"
              label="站长："
              :rules="{ required: true, message: '请插入', trigger: 'change' }"
            >
              <el-input v-model="dynamicValidateForm.webMaster"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
          <el-col :span="7">
            <el-form-item
              label="职能："
              :prop="'rowDatas.'+index+'.function'"
              :rules="{ required: true, message: '请插入', trigger: 'blur' }"
            >
              <el-input v-model="rowData.function"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label="姓名:"
              :prop="'rowDatas.'+index+'.name'"
              :rules="{ required: true, message: '请插入', trigger: 'blur' }"
            >
              <el-input v-model="rowData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="年龄:"
              :prop="'rowDatas.'+index+'.age'"
              :rules="[{required: true, message: '请插入'},
                { type: 'number',message: '插入号码'}]"
            >
              <el-input v-model.number="rowData.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label="手机号:"
              :prop="'rowDatas.'+index+'.phoneNumber'"
              :rules="{ required: true, message: '请插入', trigger: 'blur' }"
            >
              <el-input v-model="rowData.phoneNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15"></el-col>
        </el-row>
        <el-form-item class="left-margin flex-box w-100 no-margin-IE">
          <el-button size="small" @click="addFormRow()" type="primary" plain>添加</el-button>
          <el-button size="small" @click="deleteSelectedRows()" type="danger" plain>删除</el-button>
          <el-button
            size="small"
            @click="onSubmit('dynamicValidateForm')"
            type="success"
            plain
            style="float:right"
            class="margin-right-40"
          >保存</el-button>
        </el-form-item>
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
    <div class="box">
      <el-row>
        <el-col :span="6" v-for="i in 4" :key="i">
          <div class="container">
            <div class="iptBox margin-bottom-10">
              <div class="w-50 inline-block-IE">
                <p>{{supervisorType[i-1]}}</p>
              </div>
              <div style="margin-left:auto" class="w-50 inline-block-IE text-right">
                <el-button
                  size="small"
                  type="success"
                  plain
                  class="margin-left-60-IE"
                  @click="showDialog(tableData['group'+i],i)"
                >修改</el-button>
              </div>
            </div>
            <el-container>
              <el-table
                :data="tableData['group'+i]"
                style="width: 100%"
                v-loading="listLoading"
                highlight-current-row
                v-if="i!==2"
              >
                <el-table-column prop="function" :label="functionName[i-1]"></el-table-column>
                <el-table-column prop="name" :label="headerName[i-1]"></el-table-column>
              </el-table>
              <el-table
                :data="tableData['group'+i]"
                style="width: 100%"
                v-loading="listLoading"
                highlight-current-row
                v-else-if="i===2"
              >
                <el-table-column prop="function" :label="'站长：'+ dynamicValidateForm.webMaster">
                  <el-table-column prop="function" :label="functionName[i-1]"></el-table-column>
                  <el-table-column prop="name" :label="headerName[i-1]"></el-table-column>
                </el-table-column>
              </el-table>
            </el-container>

            <!-- <div class="pageBox">
              <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="page.pageIndex"
                :limit.sync="page.pageSize"
                @pagination="getData"
              />
            </div>-->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request.js";
import Pagination from "@/components/common/pagination";
import Auth from "@/services/authentication/auth.js";
export default {
  name: "manageSupervisionGrid",
  // components: { Pagination },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 50
      },
      dynamicValidateForm: {
        rowDatas: [
          {
            id: null,
            function: "",
            name: "",
            age: null,
            phoneNumber: ""
          }
        ],
        webMaster: ""
      },
      openDialog: false,
      checked: [],
      selectedTownId: null,
      total: 0,
      tableData: {},
      listLoading: false,
      supervisorType: ["分管副镇长", "农服办", "站所", "村级协管"],
      functionName: ["职能", "职能", "站所", "村"],
      headerName: ["姓名", "姓名", "人员", "协管员"],
      webMasterData: null,
      selectedRows: [],
      deletedRows: [],
      showWebMaster: false,
      confirm_dialogVisible: false,
      selectedSupervisupervisorType: null,
      header: ""
    };
  },
  created() {
    this.selectedTownId = this.$route.params.id;
    this.getData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      Request()
        .get("/api/supervision_grid/get/{townId}", {
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          townId: this.selectedTownId
        })
        .then(response => {
          let rawData = response.data;
          for (let i = 1; i < 5; i++) {
            let row = rawData.filter(el => el.supervisorType === i);
            if (row) {
              if (i === 2) {
                // let tmp = row.find(x => x.function === "站长");
                let tmp = row.find(x => x.function === "站长");
                if (tmp) {
                  this.webMasterData = tmp;
                  this.dynamicValidateForm.webMaster = tmp.name;
                } else {
                  this.webMasterData = "";
                  this.dynamicValidateForm.webMaster = "";
                }
                let index = row.indexOf(tmp);
                if (index > -1) row.splice(index, 1);
              }
              this.tableData["group" + i] = row;
            } else this.tableData["group" + i] = [];
          }
          this.total = response.total;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addFormRow() {
      this.dynamicValidateForm.rowDatas.push({
        id: null,
        function: "",
        name: "",
        age: null,
        phoneNumber: ""
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
    updateSelectedRows() {
      this.confirm_dialogVisible = false;
      this.openDialog = false;
      const updateTime = new Date();
      const createTime = new Date();
      if (this.selectedSupervisupervisorType === 2) {
        if (this.webMasterData) {
          this.listLoading = true;
          Request()
            .put("/api/supervision_grid/update/" + this.webMasterData.id, {
              age: 0,
              function: "站长",
              id: this.webMasterData.id,
              name: this.dynamicValidateForm.webMaster,
              phoneNumber: "",
              supervisorType: this.webMasterData.supervisorType,
              townId: this.webMasterData.townId,
              updateTime: updateTime,
              updateUserId: Auth().user().id
            })
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.getData();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.listLoading = true;
          Request()
            .post("/api/supervision_grid/create", {
              age: 0,
              function: "站长",
              id: 0,
              name: this.dynamicValidateForm.webMaster,
              phoneNumber: "",
              supervisorType: this.selectedSupervisupervisorType,
              townId: this.selectedTownId,
              createTime: createTime,
              createUserId: Auth().user().id
            })
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
                this.checked.fill["0"];
              }, 0.5 * 1000);
              this.getData();
            });
        }
      }
      if (this.deletedRows.length) {
        for (let index in this.deletedRows) {
          this.listLoading = true;
          Request()
            .delete("/api/supervision_grid/delete/" + this.deletedRows[index])
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.getData();
            })
            .catch(error => {
              console.log(error);
            });
        }
        this.deletedRows = [];
      }
      if (this.dynamicValidateForm.rowDatas.length) {
        for (let i = 0; i < this.dynamicValidateForm.rowDatas.length; i++) {
          if (this.dynamicValidateForm.rowDatas[i].id) {
            //update
            this.listLoading = true;
            Request()
              .put(
                "/api/supervision_grid/update/" +
                  this.dynamicValidateForm.rowDatas[i].id,
                {
                  age: this.dynamicValidateForm.rowDatas[i].age,
                  function: this.dynamicValidateForm.rowDatas[i].function,
                  id: this.dynamicValidateForm.rowDatas[i].id,
                  name: this.dynamicValidateForm.rowDatas[i].name,
                  phoneNumber: this.dynamicValidateForm.rowDatas[i].phoneNumber,
                  supervisorType: this.dynamicValidateForm.rowDatas[i]
                    .supervisorType,
                  townId: this.dynamicValidateForm.rowDatas[i].townId,
                  updateTime: updateTime,
                  updateUserId: Auth().user().id
                }
              )
              .then(response => {
                setTimeout(() => {
                  this.listLoading = false;
                }, 0.5 * 1000);
                this.getData();
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            //create
            this.listLoading = true;
            Request()
              .post("/api/supervision_grid/create", {
                age: this.dynamicValidateForm.rowDatas[i].age,
                function: this.dynamicValidateForm.rowDatas[i].function,
                id: 0,
                name: this.dynamicValidateForm.rowDatas[i].name,
                phoneNumber: this.dynamicValidateForm.rowDatas[i].phoneNumber,
                supervisorType: this.selectedSupervisupervisorType,
                townId: this.selectedTownId,
                createTime: createTime,
                createUserId: Auth().user().id
              })
              .then(response => {
                setTimeout(() => {
                  this.listLoading = false;
                }, 0.5 * 1000);
                this.getData();
              });
          }
        }
      }
    },
    handleClose(done) {
      this.$confirm("您确定要关闭此对话框吗？")
        .then(_ => {
          this.getData();
          this.deletedRows = [];
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>