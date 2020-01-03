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
              :prop="'rowDatas.'+index+'.title'"
              :rules="{ required: true, message: '请插入', trigger: 'blur' }"
            >
              <el-input v-model="rowData.title"></el-input>
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
              :rules="{ type: 'number',message: '插入号码'}"
            >
            <!-- <el-form-item
              label="年龄:"
              :prop="'rowDatas.'+index+'.age'"
              :rules="[{required: true, message: '请插入'},
                { type: 'number',message: '插入号码'}]"
            > -->
              <el-input v-model.number="rowData.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              label="手机号:"
              :prop="'rowDatas.'+index+'.phoneNumber'"
            >
            <!-- <el-form-item
              label="手机号:"
              :prop="'rowDatas.'+index+'.phoneNumber'"
              :rules="{ required: true, message: '请插入', trigger: 'blur' }"
            > -->
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
                <el-table-column prop="title" :label="functionName[i-1]"></el-table-column>
                <el-table-column prop="name" :label="headerName[i-1]"></el-table-column>
              </el-table>
              <el-table
                :data="tableData['group'+i]"
                style="width: 100%"
                v-loading="listLoading"
                highlight-current-row
                v-else-if="i===2"
              >
                <el-table-column prop="title" :label="'站长：'+ dynamicValidateForm.webMaster">
                  <el-table-column prop="title" :label="functionName[i-1]"></el-table-column>
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
            title: "",
            name: "",
            age: null,
            phoneNumber: ""
          }
        ],
        webMaster: ""
      },
      openDialog: false,
      checked: [],
      selectedTownId: -1,
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
        .get("/api/town/get/" + this.selectedTownId)
        .then(response => {
          let rawData = response;
          // for (let i = 1; i < 5; i++) {
          //   let row = rawData.filter(el => el.supervisorType === i);
          //   if (row) {
          //     if (i === 2) {
          //       // let tmp = row.find(x => x.function === "站长");
          //       let tmp = row.find(x => x.function === "站长");
          //       if (tmp) {
          //         this.webMasterData = tmp;
          //         this.dynamicValidateForm.webMaster = tmp.name;
          //       } else {
          //         this.webMasterData = "";
          //         this.dynamicValidateForm.webMaster = "";
          //       }
          //       let index = row.indexOf(tmp);
          //       if (index > -1) row.splice(index, 1);
          //     }
          //     this.tableData["group" + i] = row;
          //   } else this.tableData["group" + i] = [];
          // }
          var regex = new RegExp(/(?<="level1":)(.*)(?=,"level2leader")/g),
            results = regex.exec(rawData.superviseSystem);
          const group1 = results ? results[1] : "[]";
          var regex1 = new RegExp(/(?<="level2leader":)(.*)(?=,"level2")/g),
            results1 = regex1.exec(rawData.superviseSystem);
          const tmplevel2leader = results1 ? results1[1] : {};
          var regex2 = new RegExp(/(?<="level2":)(.*)(?=,"level3")/g),
            results2 = regex2.exec(rawData.superviseSystem);
          const group2 = results2 ? results2[1] : "[]";
          var regex3 = new RegExp(/(?<="level3":)(.*)(?=,"level4")/g),
            results3 = regex3.exec(rawData.superviseSystem);
          const group3 = results3 ? results3[1] : "[]";
          var regex4 = new RegExp(/(?<="level4":)(.*)(?=})/g),
            results4 = regex4.exec(rawData.superviseSystem);
          const group4 = results4 ? results4[1] : "[]";
          rawData["level2leader"] = JSON.parse(tmplevel2leader);
          if (rawData["level2leader"]["name"]) {
            this.webMasterData = rawData["level2leader"];
            this.dynamicValidateForm.webMaster =
              rawData["level2leader"]["name"];
          } else {
            this.webMasterData = "";
            this.dynamicValidateForm.webMaster = "";
          }
          rawData["group1"] = JSON.parse(group1);
          rawData["group2"] = JSON.parse(group2);
          rawData["group3"] = JSON.parse(group3);
          rawData["group4"] = JSON.parse(group4);
          this.tableData = rawData;
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
        title: "",
        name: "",
        age: null,
        phoneNumber: "",
        $$hashKey: ""
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
      // console.log(this.dynamicValidateForm.rowDatas);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.confirm_dialogVisible = true;
        }
      });
    },
    updateSelectedRows() {
      this.confirm_dialogVisible = false;
      this.openDialog = false;
        this.listLoading = true;
        let updateSuperData = {};
        console.log(this.dynamicValidateForm.rowDatas);
        for (let i = 1; i < 5; i++) {
          if (this.selectedSupervisupervisorType == i)
            updateSuperData["level" + i] = this.dynamicValidateForm.rowDatas;
          else updateSuperData["level" + i] = this.tableData["group" + i];
          if (i == 1)
            updateSuperData["level2leader"] = {
              name: this.dynamicValidateForm.webMaster
            };
        }
        // console.log(updateSuperData);
        // updateSuperData["level1"] = this.dynamicValidateForm.rowDatas;
        // updateSuperData["level2leader"] = this.dynamicValidateForm.webMaster;
        // updateSuperData["level2"] = this.tableData.group2;
        // updateSuperData["level3"] = this.tableData.group3;
        // updateSuperData["level4"] = this.tableData.group4;

        Request()
          .put("/api/town/update/" + this.selectedTownId, {
            divisionCode: this.tableData.divisionCode,
            id: this.selectedTownId,
            name: this.tableData.name,
            superviseSystem: JSON.stringify(updateSuperData)
          })
          .then(response => {
            setTimeout(() => {
              this.listLoading = false;
            }, 0.5 * 1000);
            this.getData();
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
    }
  }
};
</script>