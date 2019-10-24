<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">生产主体</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item>添加品种</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" modal>
      <span>
        <i class="el-icon-warning">&nbsp;选择文件 !!!</i>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false" type="primary" plain>取消</el-button>
      </span>
    </el-dialog>
    <div class="box">
      <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules" label-width="100px" v-loading="dialogLoading">
        <el-row>
          <el-col :span="6">
            <el-form-item label="是否共享" prop="filter_Share">
              <el-select v-model="filter_Share" placeholder="请选择是否共享">
                <el-option
                  v-for="item in options"
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
            <el-form-item label="品种名称" prop="varietyName">
              <el-input v-model="ruleFormValue.varietyName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="品种排序" prop="varietySort">
              <el-input v-model.number="ruleFormValue.varietySort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button size="small" type="success" plain @click="onSubmit('ruleForm')">保存</el-button>
          <el-button size="small" type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../../services/api/request.js";
import Auth from "../../../../services/authentication/auth";
export default {
  name: "addVarietyDefinition",
  data() {
    return {
      filter_Share: 0,
      dialogLoading: true,
      dialogVisible: false,
      productId: -1,
      ruleFormValue: {
        varietyName: "",
        varietySort: ""
      },
      options: [{ value: 0, label: "否" }, { value: 1, label: "是" }],
      rules: {
        varietyName: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        varietySort: [
          {
            required: true,
            message: "请选择",
          },
         {
            type: "number",
            message: "插入号码"
          }
        ]
      }
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.dialogLoading = false;
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogLoading = true;
          Request()
            .post("/api/product_variety/create", {
              createTime: new Date().toJSON(),
              createUserId: Auth().user().attrs.id,
              doShare: this.filter_Share,
              id: 0,
              productId: this.productId,
              updateTime: new Date().toJSON(),
              updateUserId: Auth().user().attrs.id,
              varietyName: this.ruleFormValue.varietyName,
              varietySort: this.ruleFormValue.varietySort
            })
            .then(response => {
              setTimeout(() => { this.dialogLoading = false; }, 0.01 * 1000);
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