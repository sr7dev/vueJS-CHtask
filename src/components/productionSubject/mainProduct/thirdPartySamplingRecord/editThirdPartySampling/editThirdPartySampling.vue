<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">修改认证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form
        label-width="100px"
        ref="dataForm"
        :model="data"
        :rules="rules"
        v-loading="dataloading"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="日期">
              <el-input v-model="this.oldDate" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="样品">
              <el-input v-model="data.specimen"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检测项目">
              <el-input v-model="data.checkItem"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检测结果">
              <el-select v-model="data.checkResult" placeholder>
                <el-option
                  v-for="item in [{value:'1', label:'阴性'}, {value: '2', label:'阳性'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="判定">
              <el-select v-model="data.determine" placeholder>
                <el-option
                  v-for="item in [{value:'0', label:'不合格'}, {value: '1', label:'合格'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检测标准">
              <el-input v-model="data.checkStandard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="检测机构">
              <el-input v-model="data.checkOrganization"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button size="small" type="success" @click="onSubmit('dataForm')" plain>保存</el-button>
          <el-button size="small" type="danger" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "@/services/api/request.js";
import { Urls } from "@/services/constants";
import Auth from "@/services/authentication/auth";

export default {
  name: "detailThirdPartySampling",
  data() {
    return {
      id: -1,
      oldDate: null,
      data: {
        specimen: "",
        checkItem: "",
        checkResult: "",
        determine: "",
        checkStandard: "",
        checkOrganization: ""
      },
      dataloading: true,
      rules: {
        createTime: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        specimen: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        checkItem: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        checkResult: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        determine: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        checkStandard: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        checkOrganization: [
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
    this.getData(this.$route.query.checkId);
  },
  methods: {
    getData(id) {
      this.dataloading = true;
      Request()
        .get("/api/product_check_record/get/" + id)
        .then(response => {
          this.data = response;
          this.oldDate = this.data.createTime.slice(0, 10);
          setTimeout(() => {
            this.dataloading = false;
          }, 0.01 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dataloading = true;
          Request()
            .put("/api/product_check_record/update/" + this.data.id, {
              checkItem: this.data.checkItem,
              checkOrganization: this.data.checkOrganization,
              checkResult: this.data.checkResult,
              checkStandard: this.data.checkStandard,
              createTime: this.data.createTime,
              createUserId: this.data.createUserId,
              determine: this.data.determine,
              id: this.data.id,
              productCheckTime: new Date().toJSON(),
              productId: this.data.productId,
              specimen: this.data.specimen,
              updateTime: new Date().toJSON(),
              updateUserId: Auth().user().id
            })
            .then(response => {
              //this.$router.push({ path: "/threeProductsCertification" });
              setTimeout(() => {
                this.dataloading = false;
              }, 0.01 * 1000);
              this.$router.go(-1);
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
