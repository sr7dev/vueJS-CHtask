<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">生产主体</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品/定义等级</el-breadcrumb-item>
        <el-breadcrumb-item>修改等级</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" modal>
      <span>
        <i class="el-icon-warning">&nbsp;选择文件 !!!</i>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary" plain>取消</el-button>
      </span>
    </el-dialog>
    <div class="box">
      <el-form
        ref="ruleForm"
        :model="ruleFormValue"
        :rules="rules"
        label-width="100px"
        v-loading="dataloading"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="是否共享">
              <el-select v-model="filter_Share" placeholder="请选择是否共享">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :selected="filter_Share == 'item.value'"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="等级名称" prop="gradeName">
              <el-input v-model="ruleFormValue.gradeName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="等级排序" prop="gradeSort">
              <el-input v-model="ruleFormValue.gradeSort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="success" plain @click="onSubmit('ruleForm')">保存</el-button>
          <el-button type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../../services/api/request.js";
import Auth from "../../../../services/authentication/auth";

export default {
  name: "editDefinitionLevel",
  data() {
    return {
      filter_Share: 0,
      dialogVisible: false,
      dataloading: true,
      varietyId: -1,
      ruleFormValue: {
        gradeName: "",
        gradeSort: ""
      },
      options: [{ value: "0", label: "否" }, { value: "1", label: "是" }],
      rules: {
        gradeName: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        gradeSort: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.varietyId = this.$route.params.id;
    this.getVariety(this.varietyId);
  },
  methods: {
    getVariety(id) {
      this.dataloading = true;
      Request()
        .get("/api/product_grade/get/" + id)
        .then(response => {
          this.ruleFormValue = response;
          console.log(this.ruleFormValue);
          this.filter_Share = this.ruleFormValue.doShare;
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
            .put("/api/product_grade/update/" + this.varietyId, {
              createTime: this.ruleFormValue.createTime,
              createUserId: this.ruleFormValue.createUserId,
              doShare: this.filter_Share,
              gradeName: this.ruleFormValue.gradeName,
              gradeSort: this.ruleFormValue.gradeSort,
              id: 0,
              productId: this.ruleFormValue.productId,
              updateTime: new Date().toJSON(),
              updateUserId: Auth().user().attrs.id
            })
            .then(response => {
              setTimeout(() => { this.dataloading = false; }, 0.01 * 1000);
              this.$router.go(-1);
            })
            .catch(error => {});
        } else {
          console.log("错误 !!");
          return false;
        }
      });
    }
  }
};
</script>
