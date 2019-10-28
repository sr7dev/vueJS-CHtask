<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加动态</el-breadcrumb-item>
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
          <el-col :span="6">
            <el-form-item label="产品名称" prop="productName">
              <el-input v-model="ruleFormValue.productName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="仓库地址" prop="warehouseId">
              <el-select
                v-model="ruleFormValue.warehouseId"
                :disabled="!(this.warehouseOptions.length > 0)"
              >
                <el-option
                  v-for="item in warehouseOptions"
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
            <el-form-item label="储存数量" prop="repertoryAmount">
              <el-input v-model="ruleFormValue.repertoryAmount" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="品种" prop="variety">
              <el-input v-model="ruleFormValue.variety"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="评级" prop="grade">
              <el-select v-model="ruleFormValue.grade" :disabled="!(options.length > 0)">
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

        <el-form-item>
          <el-button size="small" type="success" @click="onSubmit('ruleForm')" plain>保存</el-button>
          <el-button size="small" type="danger" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../../../services/api/request.js";
export default {
  name: "addInventoryDynamics",
  data() {
    return {
      listLoading: false,
      warehouseOptions: [],
      productDetail: [],
      ruleFormValue: {
        createTime: "",
        updateTime: "",
        grade: "",
        productId: 0,
        companyId: 0,
        repertoryAmount: "",
        variety: "",
        warehouseId: null,
        productName: ""
      },
      rules: {
        variety: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        repertoryAmount: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        grade: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        warehouseId: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ]
      },
      options: [
        { value: "1", label: "低级" },
        { value: "2", label: "中级" },
        { value: "3", label: "高级" },
        { value: "4", label: "特级" }
      ]
    };
  },
  created() {
    this.ruleFormValue.productId = this.$route.query.productId;
    this.ruleFormValue.companyId = this.$route.params.id;
    this.getProductionDetail();
    this.getWarehouseList();
    this.getCurrentTime();
  },
  methods: {
    getProductionDetail() {
      this.listLoading = true;
      Request()
        .get("/api/product_production/name", {
          productid: this.ruleFormValue.productId
        })
        .then(response => {
          this.ruleFormValue.productName = response[0].productName;
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCurrentTime() {
      var currentDate = new Date();
      this.ruleFormValue.createTime = currentDate.toISOString();
      this.ruleFormValue.updateTime = currentDate.toISOString();
    },
    getWarehouseList() {
      this.listLoading = true;
      Request()
        .get("/api/warehose/all", {
          company_id: this.ruleFormValue.companyId
        })
        .then(response => {
          for (var index in response.data) {
            this.warehouseOptions.push({
              value: response.data[index].id,
              label: response.data[index].warehouseName
            });
          }
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {});
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = {
            createTime: this.ruleFormValue.createTime,
            updateTime: this.ruleFormValue.updateTime,
            grade: this.ruleFormValue.grade,
            id: 0,
            productId: this.ruleFormValue.productId,
            repertoryAmount: this.ruleFormValue.repertoryAmount,
            variety: this.ruleFormValue.variety,
            warehouseId: this.ruleFormValue.warehouseId
          };
          this.listLoading = true;
          Request()
            .post("/api/product_repetory/create", formData)
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 1000);
              this.goBack();
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
