<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>共享文件</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">新建文件夹</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form
        ref="ruleForm"
        :model="ruleFormValue"
        :rules="rules"
        label-width="100px"
        v-loading="listLoading"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="文件夹名称" prop="fileName">
              <el-input v-model="ruleFormValue.fileName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="创建者" prop="creater">
              <el-input v-model="ruleFormValue.creater"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="是否可见" prop="isVisible">
              <el-select v-model="ruleFormValue.isVisible" class="w-100">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="left-margin">
          <el-button size="small" type="success" plain @click="onSubmit('ruleForm')">保存</el-button>
          <el-button size="small" type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../services/api/request.js";
import { Urls } from "../../../services/constants";
import Auth from "@/services/authentication/auth.js";

export default {
  name: "addSharedFiles",
  data() {
    return {
      listLoading: false,
      userId: null,
      options: [{ id: 0, name: "不可见" }, { id: 2, name: "可见" }],
      ruleFormValue: {
        fileName: null,
        creater: null,
        isVisible: 0
      },
      rules: {
        fileName: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        creater: [
          {
            required: true,
            message: "请插入"
          }
        ],
        isVisible: [
          {
            required: true,
            message: "请选择"
          }
        ]
      }
    };
  },
  created() {
    this.userId = Auth().user().id;
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.listLoading = true;
          let createDate = new Date();
          Request()
            .post("/api/shareFiles/create", {
              createTime: createDate,
              createUserId: this.userId,
              creater: this.ruleFormValue.creater,
              fileName: this.ruleFormValue.fileName,
              id: 0,
              isVisible: this.ruleFormValue.isVisible,
              updateTime: createDate,
              updateUserId: this.userId
            })
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.$router.push({ path: "/shareFiles" });
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    }
  }
};
</script>

<style lang="scss">
</style>