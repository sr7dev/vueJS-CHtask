<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>共享文件</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">会议文件</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <div class="iptBox">
        <el-row class="w-100">
          <el-col :span="3">
            <el-button size="small" type="primary" v-on:click="openDialog=true" plain>上传文件</el-button>
            <el-button size="small" type="warning" v-on:click="$router.go(-1)" plain>返回</el-button>
          </el-col>
          <el-col :span="5" class="margin-left-20 flex-center">
            <div class="inline-block-IE">搜索</div>
            <el-input v-model="uploadCompany" class="w-80 margin-left-10"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button size="small" type="success" v-on:click="getList()" plain>搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <el-dialog :visible.sync="dialogVisible" width="30%" modal>
        <span>
          <i class="el-icon-warning">&nbsp;你确定你要删除?</i>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false" type="primary" plain>取消</el-button>
          <el-button size="small" @click="handleDelete" type="success" plain>确认</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="openDialog" width="60%">
        <el-row>
          <el-col :span="3" class="margin-bottom-30 margin-left-30">文件上传</el-col>
        </el-row>
        <el-form ref="ruleForm" :model="ruleFormValue" label-width="100px">
          <el-row>
            <el-col :span="7">
              <el-form-item label="上传单位" prop="uploadCompany">
                <el-input v-model="ruleFormValue.uploadCompany"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="上传者" prop="uploadPerson">
                <el-input v-model="ruleFormValue.uploadPerson"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15">
              <div class="item margin-left-30" style="display:flex">
                <div class="item-label" style="margin-bottom:20px;">
                  <input
                    type="file"
                    id="file"
                    style="display: none"
                    ref="file"
                    v-on:change="handleFileUpload()"
                  />
                  <el-button size="small" type="warning" plain @click="chooseFile()">添加附件</el-button>
                </div>
                <div
                  class="item-value"
                  style="margin-left:10px;
                      display: flex;
                      align-items: center;
                      padding-bottom: 20px;"
                >
                  <span v-if="file">({{ file.name }})</span>
                  <span v-else>请选择需要上传的文件...</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-form-item class="left-margin">
            <el-button size="small" @click="onSubmit('ruleForm')" type="primary" plain>添加</el-button>
            <el-button size="small" @click="openDialog = false" type="warning" plain>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-container>
        <el-table
          :data="tableData"
          v-loading="listLoading"
          style="width: 100%"
          :row-class-name="rowIndex"
          highlight-current-row
        >
          <el-table-column :formatter="order" label="序号" width="100"></el-table-column>
          <el-table-column prop="uploadProfile" label="文件名" class-name="text-center">
            <template slot-scope="{ row }">{{ getFileName(row.uploadProfile) }}</template>
          </el-table-column>
          <el-table-column prop="createTime" label="修改时间">
            <template slot-scope="{ row }">{{ row.createTime | formatDate }}</template>
          </el-table-column>
          <el-table-column prop="uploadCompany" label="上传单位"></el-table-column>
          <el-table-column label="操作" class-name="text-center">
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="success"
                plain
                @click="downloadFile(row.uploadProfile)"
              >下载</el-button>
              <el-button size="small" type="danger" plain @click="confirmDelete(row.id)">删除</el-button>
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
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Pagination from "@/components/common/pagination";
import Request from "../../../services/api/request.js";
import Auth from "@/services/authentication/auth.js";
import { Urls } from "@/services/constants";

export default {
  name: "workTask",
  components: { Pagination },
  data() {
    return {
      openDialog: false,
      dialogVisible: false,
      uploadCompany: "",
      shareFilesId: null,
      selectedId: null,
      userId: null,
      page: {
        pageIndex: 1,
        pageSize: 20
      },
      listLoading: true,
      total: 0,
      tableData: [],
      file: null,
      options: [{ id: 0, name: "不可见" }, { id: 2, name: "可见" }],
      ruleFormValue: {
        uploadCompany: null,
        uploadPerson: null
      },
      rules: {
        uploadCompany: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        uploadPerson: [
          {
            required: true,
            message: "请插入"
          }
        ]
      }
    };
  },
  created() {
    this.shareFilesId = this.$route.params.id;
    this.getList();
    this.userId = Auth().user().id;
  },
  methods: {
    getList() {
      this.listLoading = true;
      Request()
        .get("/api/shareFilesRecord/all", {
          uploadCompany: this.uploadCompany,
          shareFilesId: this.shareFilesId,
          pageNo: this.page.pageIndex - 1,
          pageSize: this.page.pageSize,
          sortBy: "id"
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
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.openDialog = false;
          this.listLoading = true;
          let formdata = new FormData();
          const createDate = new Date();
          formdata.append("createTime", createDate);
          formdata.append("createUserId", this.userId);
          formdata.append("file", this.file);
          formdata.append("id", 0);
          formdata.append("shareFilesId", this.shareFilesId);
          formdata.append("updateTime", createDate);
          formdata.append("updateUserId", this.userId);
          formdata.append("uploadCompany", this.ruleFormValue.uploadCompany);
          formdata.append("uploadPerson", this.ruleFormValue.uploadPerson);
          formdata.append("uploadProfile", "");
          Request()
            .post("/api/shareFilesRecord/create", formdata)
            .then(response => {
              this.getList();
              this.ruleFormValue.uploadCompany = "";
              this.ruleFormValue.uploadPerson = "";
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    getFileName(str) {
      if (str) return str.replace("/uploads/", "");
      else return "";
    },
    handleDelete() {
      this.dialogVisible = false;
      this.listLoading = true;
      Request()
        .delete("/api/shareFilesRecord/delete/" + this.selectedId)
        .then(response => {
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
          this.getList();
        })
        .catch(error => {
          console.log(error);
        });
    },
    downloadFile(fileUrl) {
      console.log(fileUrl);
      axios({
        url: Urls.DOWNLOAD_URL() + fileUrl,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileUrl.replace("/uploads/", "")); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
    confirmDelete(id) {
      this.dialogVisible = true;
      this.selectedId = id;
    },
    rowIndex({ row, rowIndex }) {
      row.rowIndex = rowIndex;
    },
    order(row) {
      return this.page.pageSize * (this.page.pageIndex - 1) + row.rowIndex + 1;
    },
    chooseFile() {
      this.$refs.file.click();
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>

<style scoped>
</style>