<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工作任务</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加工作任务</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" modal>
      <span>
        <i class="el-icon-warning">&nbsp;你确定你要删除?</i>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary" plain>取消</el-button>
        <el-button @click="handleDelete" type="success" plain>确认</el-button>
      </span>
    </el-dialog>
    <div class="box">
      <el-form
        ref="ruleForm"
        :model="ruleFormValue"
        :rules="rules"
        label-width="100px"
        v-loading="listLoading"
      >
        <el-row>
          <el-col :span="9">
            <el-form-item label="发布日期" prop="releaseTime">
              <el-date-picker
                v-model="ruleFormValue.releaseTime"
                align="right"
                type="date"
                placeholder="开始日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="发布者" prop="releasePerson">
              <el-input v-model="ruleFormValue.releasePerson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input v-model="ruleFormValue.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="内容" prop="content">
              <el-input type="textarea" :rows="10" v-model="ruleFormValue.content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-col :span="18">
            <div class="item" style="display:flex">
              <div class="item-label" style="margin-bottom:20px;">
                <input
                  type="file"
                  id="file"
                  style="display: none"
                  ref="file"
                  v-on:change="handleFileUpload()"
                />
                <el-button type="warning" plain @click="chooseFile()">添加附件</el-button>
              </div>
              <div
                class="item-value"
                style="margin-left:10px;
                      display: flex;
                      align-items: center;
                      padding-bottom: 20px;"
              >
                <span v-if="file">({{ fileName }})</span>
                <span v-else>请选择需要上传的文件...</span>
              </div>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="success" plain @click="onSubmit('ruleForm')">保存</el-button>
          <el-button type="primary" plain v-on:click="$router.go(-1)">取消</el-button>
          <el-button type="danger" plain v-on:click="confirmDelete">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";

export default {
  name: "editWorkTask",
  data() {
    return {
      file: null,
      fileName: "",
      selectedId: null,
      data: null,
      dialogVisible: false,
      listLoading: false,
      ruleFormValue: {
        releaseTime: "",
        releasePerson: "",
        title: "",
        content: ""
      },
      rules: {
        releaseTime: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        releasePerson: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        title: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        content: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.selectedId = this.$route.params.id;
    this.getData(this.$route.params.id);
  },
  methods: {
    getData(id) {
      this.listLoading = true;
      Request()
        .get("/api/work_task/get/" + id)
        .then(response => {
          this.data = response;
          this.ruleFormValue.releaseTime = this.data.releaseTime;
          this.ruleFormValue.releasePerson = this.data.releasePerson;
          this.ruleFormValue.title = this.data.title;
          this.ruleFormValue.content = this.data.content;
          this.file = response.workTaskProfiles;
          this.fileName = response.workTaskProfiles;
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
          this.listLoading = true;
          var formData = new FormData();
          formData = this.makeFormData();
          Request()
            .put("/api/work_task/update/" + this.selectedId, formData)
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.$router.push({ path: "/workTask" });
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    makeFormData() {
      var mainFormData = new FormData();
      if (this.file) {
        mainFormData.append("file", this.file);
      }
      mainFormData.append("id", 0);
      this.ruleFormValue.releaseTime = new Date(
        this.ruleFormValue.releaseTime
      ).toDateString("YYYY-MM-DD");
      mainFormData.append("releaseTime", this.ruleFormValue.releaseTime);
      mainFormData.append("releasePerson", this.ruleFormValue.releasePerson);
      mainFormData.append("title", this.ruleFormValue.title);
      mainFormData.append("content", this.ruleFormValue.content);
      const createTime = new Date().toDateString("YYYY-MM-DD");
      mainFormData.append("createTime", createTime);
      return mainFormData;
    },
    chooseFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.fileName = this.file.name;
    },
    handleDelete() {
      this.dialogVisible = false;
      this.listLoading = true;
      Request()
        .delete("/api/work_task/delete/" + this.selectedId)
        .then(response => {
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
          this.$router.push({ path: "/workTask" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    confirmDelete() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss">
</style>