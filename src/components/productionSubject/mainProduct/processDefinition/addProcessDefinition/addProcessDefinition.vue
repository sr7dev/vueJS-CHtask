<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }"
          >监管对象</el-breadcrumb-item
        >
        <el-breadcrumb-item>主营产品</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加作业</el-breadcrumb-item>
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
            <el-form-item label="作业名称" prop="taskName">
              <el-input v-model="ruleFormValue.taskName" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="仓库地址" prop="taskType">
              <el-select
                v-model="ruleFormValue.taskType"
                :disabled="!(options.length > 0)"
              >
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
          <el-col :span="12">
            <el-form-item label="添加图片" prop="file">
              <div class="item" style="display:flex">
                <div class="item-label">
                  <input
                    type="file"
                    id="file"
                    style="display: none"
                    ref="file"
                    v-on:change="handleFileUpload()"
                  />
                  <el-button type="warning" plain @click="chooseFile()">选择文件</el-button>
                </div>
                <div
                  class="item-value"
                  style="margin-left:.1rem;
                        display: flex;
                        align-items: center;"
                >
                  <span v-if="file" style="margin-left: .5rem">({{ file.name }})</span>
                  <span v-else style="margin-left: .5rem">请选择需要上传的文件...</span>
                </div>
              </div>
            </el-form-item>  
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="success" @click="onSubmit('ruleForm')" plain
            >保存</el-button
          >
          <el-button type="danger" @click="goBack" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from "../../../../../services/api/request.js";
export default {
  name: "addProcessDefinition",
  data() {
    return {
      file: null,
      listLoading: false,
      ruleFormValue: {
        file: null,
        taskType: "",
        taskName: "",
        taskImages: "",
        doShare: "",
        productId: 0
        
      },
      rules: {
        taskName: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ],
        taskType: [
          {
            required: true,
            message: "请插入",
            trigger: "change"
          }
        ]
      },
      options: [
        { value: "1", label: "收获前" },
        { value: "2", label: "收获" },
        { value: "3", label: "收获后" }
      ]
    };
  },
  created() {    
    this.ruleFormValue.productId = this.$route.params.id;
    this.ruleFormValue.doShare = this.$route.query.doShare;
  },
  methods: {
    chooseFile() {
      this.$refs.file.click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var formData = new FormData();
          formData.append("doShare", this.ruleFormValue.doShare);
          formData.append("id", "0");
          formData.append("productId", this.ruleFormValue.productId);
          formData.append("taskName", this.ruleFormValue.taskName);
          formData.append("taskType", this.ruleFormValue.taskType);
          formData.append("file", this.file);

          Request()
            .post("/api/product_task/create", formData)
            .then(response => {
              this.$router.push({
                path: `/productionSubject/mainProduct/processDefinition/${this.ruleFormValue.productId}`
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
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>
