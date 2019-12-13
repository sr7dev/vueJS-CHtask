<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">修改属性</el-breadcrumb-item>
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
            <el-form-item label="属性名称" prop="propertyName">
              <el-input v-model="ruleFormValue.propertyName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="属性可选项" prop="propertyOptions">
              <el-input v-model="ruleFormValue.propertyOptions" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="属性排序" prop="propertySort">
              <el-input v-model="ruleFormValue.propertySort" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button
            size="small"
            type="success"
            plain
            @click="$router.push({
            path: `/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/${ruleFormValue.id}`,
            query: {
              productId: ruleFormValue.productId,
              optionData: optionList,
              companyId: companyId,
              sortFlag: sortFlag
            }
          })"
          >编辑选项</el-button>
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
  name: "editProductProperty",
  data() {
    return {
      listLoading: false,
      companyId: -1,
      optionList: [],
      sortFlag: 1,
      ruleFormValue: {
        propertyName: "",
        propertyOptions: "",
        propertySort: null,
        productId: 0,
        doShare: "",
        id: -1
      },
      rules: {
        propertyName: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        propertySort: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ]
      },
      customValue: 0,
      optionData: null
    };
  },
  created() {
    this.ruleFormValue.productId = this.$route.query.productId;
    this.companyId = this.$route.query.companyId;
    this.ruleFormValue.id = this.$route.params.id;
    this.customValue = this.$route.query.customValue;
    if (this.customValue == 0) {
      this.getProductPropertyInfo();
    } else {
      this.getCustomValue();
    }
  },
  methods: {
    getCustomValue() {      
      this.ruleFormValue.optionData = this.$route.query.optionData;
      if (this.ruleFormValue.optionData == null ) {
         this.getProductPropertyInfo();
      }
      else
      {
        this.ruleFormValue.propertyOptions = this.ruleFormValue.optionData[0].name;
        for (
          var index = 1;
          index < this.ruleFormValue.optionData.length;
          index++
        ) {
          this.ruleFormValue.propertyOptions =
            this.ruleFormValue.propertyOptions +
            "," +
            this.ruleFormValue.optionData[index].name;
        }
        this.splitStatus(this.ruleFormValue.propertyOptions);
        this.listLoading = true;
        Request()
          .get("/api/product_property/get/" + this.$route.params.id)
          .then(response => {
            setTimeout(() => {
              this.listLoading = false;
            }, 0.5 * 100);
            this.ruleFormValue.propertyName = response.propertyName;
            this.ruleFormValue.propertySort = parseInt(response.propertySort);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    getProductPropertyInfo() {
      this.listLoading = true;
      Request()
        .get("/api/product_property/get/" + this.ruleFormValue.id)
        .then(response => {
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 100);
          this.ruleFormValue.propertyName = response.propertyName;
          this.ruleFormValue.propertyOptions = response.propertyOptions;
          this.splitStatus(this.ruleFormValue.propertyOptions);
          this.ruleFormValue.propertySort = parseInt(response.propertySort);
          this.ruleFormValue.doShare = response.doShare;
        })
        .catch(error => {});
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = {
            productId: this.ruleFormValue.productId,
            propertyName: this.ruleFormValue.propertyName,
            propertyOptions: this.ruleFormValue.propertyOptions,
            propertySort: this.ruleFormValue.propertySort.toString(),
            doShare: this.ruleFormValue.doShare
          };
          this.listLoading = true;
          Request()
            .put(
              "/api/product_property/update/" + this.ruleFormValue.id,
              formData
            )
            .then(response => {
              setTimeout(() => {
                this.listLoading = false;
              }, 0.5 * 100);
              this.$router.push({
                path: `/productionSubject/mainProduct/productProperty/${this.companyId}`,
                query: {
                  productId: this.ruleFormValue.productId
                }
              });
            })
            .catch(error => {});
        } else {
          console.log("错误 !!");
          return false;
        }
      });
    },
    goBack() {
      this.$router.push({
        path: `/productionSubject/mainProduct/productProperty/${this.companyId}`,
        query: {
          productId: this.ruleFormValue.productId
        }
      });
    },
    splitStatus(propertyOptions) {
      let stringPropertyOption = propertyOptions.replace(" ", "");
      let stringPropertyArray = stringPropertyOption.split(",");
      for (var index in stringPropertyArray) {
        this.optionList.push({
          id: parseInt(index),
          name: stringPropertyArray[index]
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
