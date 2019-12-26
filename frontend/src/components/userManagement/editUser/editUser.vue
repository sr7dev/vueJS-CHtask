<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box" v-if="!this.ruleFormValue.contactName" v-loading="listLoading">装货...</div>
    <div class="box" v-if="this.ruleFormValue.contactName" v-loading="pageLoading">
      <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules" label-width="150px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="登录名：" prop="userId">
              <el-input v-model="ruleFormValue.userId" placeholder="例: admin"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="名称：" prop="contactName">
              <el-input v-model="ruleFormValue.contactName" placeholder="例: 管理员"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="角色：" prop="userType">
              <el-select
                class="w-100"
                v-model="ruleFormValue.userType"
                v-if="loggedinUserType === 2"
                disabled
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-select class="w-100" v-model="ruleFormValue.userType" v-else>
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="乡镇：" prop="townId" v-if="ruleFormValue.userType === 2">
              <el-select v-model="ruleFormValue.townId" class="w-100">
                <el-option
                  v-for="town in township"
                  :key="town.id"
                  :label="town.name"
                  :value="town.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业：" prop="companyId" v-if="ruleFormValue.userType === 3">
              <el-select v-model="ruleFormValue.companyId" class="w-100">
                <el-option
                  v-for="item in companyData"
                  :key="item.companyId"
                  :label="item.companyName"
                  :value="item.companyId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="联系人：" prop="contactPerson">
              <el-input v-model="ruleFormValue.contactPerson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="联系方式：" prop="contactWay">
              <el-input v-model="ruleFormValue.contactWay"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="统一社会信用代码：" prop="creditCode">
              <el-input v-model="ruleFormValue.creditCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button size="small" type="success" @click="onSubmit('ruleForm')" plain>保存</el-button>
          <el-button size="small" type="primary" @click="goBack" plain>取消</el-button>
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
  name: "editUser",
  data() {
    return {
      listLoading: true,
      pageLoading: false,
      ruleFormValue: {
        creditCode: "",
        contactName: "",
        contactPerson: "",
        contactWay: "",
        userId: "",
        userType: null,
        townId: -1,
        companyId: -1
      },
      rules: {
        creditCode: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        contactName: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        contactPerson: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        contactWay: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        userType: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        userId: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ]
      },
      options: [
        { id: 1, name: "市级管理员" },
        { id: 2, name: "乡镇管理员" },
        { id: 3, name: "普通用户" }
      ],
      loggedinUserType: null,
      township: [{ id: -1, name: "全部" }],
      companyData: [{ id: -1, name: "全部" }]
    };
  },
  created() {
    this.loggedinUserType = Auth().user().userType;
    if (this.loggedinUserType === 2) this.ruleFormValue.userType = 3;
    this.selectedId = this.$route.params.id;
    this.getData();
    this.getTown();
    this.getCompanyProduction();
  },
  methods: {
    getData() {
      Request()
        .get("/api/user/get/" + this.selectedId)
        .then(response => {
          this.ruleFormValue.contactName = response.contactName;
          this.ruleFormValue.contactPerson = response.contactPerson;
          this.ruleFormValue.contactWay = response.contactWay;
          this.ruleFormValue.creditCode = response.creditCode;
          this.ruleFormValue.userType = response.userType;
          this.ruleFormValue.userId = response.userId;
          this.ruleFormValue.townId = response.townId;
          this.ruleFormValue.companyId = response.companyId;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTown() {
      this.listLoading = true;
      Request()
        .get("/api/town/all")
        .then(response => {
          this.township = this.township.concat(response);
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCompanyProduction() {
      this.listLoading = true;
      Request()
        .get("/api/company_production/name")
        .then(response => {
          this.companyData = response;
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
          this.pageLoading = true;
          Request()
            .put("/api/user/update/" + this.selectedId, {
              contactName: this.ruleFormValue.contactName,
              contactPerson: this.ruleFormValue.contactPerson,
              contactWay: this.ruleFormValue.contactWay,
              updateUserId: Auth().user().id,
              // updateTime: new Date(),
              creditCode: this.ruleFormValue.creditCode,
              id: this.selectedId,
              password: "",
              userId: this.ruleFormValue.userId,
              userType: this.ruleFormValue.userType,
              townId: this.ruleFormValue.townId ? this.ruleFormValue.townId : -1,
              companyId: this.ruleFormValue.companyId
                ? this.ruleFormValue.companyId
                : 0
            })
            .then(response => {
              setTimeout(() => {
                this.pageLoading = false;
              }, 0.5 * 1000);
              this.$router.push({ path: "/userManagement" });
            })
            .catch(error => {});
        } else {
          console.log("错误 !!");
          return false;
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>
