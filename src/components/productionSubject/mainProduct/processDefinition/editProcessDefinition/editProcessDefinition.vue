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
            <el-form-item label="添加图片" prop="file" style="display:flex; align-items:center;">
              <div class="item" style="display:flex; align-items:center;">
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
                  style="margin-left: 1rem;
                        display: flex;
                        align-items: center;"
                >
                  <img :src="imageUrl + ruleFormValue.taskImages" style="width: 7rem; height: 7rem;"/>
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
import { Urls } from "../../../../../services/constants";
export default {
  name: "editProcessDefinition",
  data() {
    return {
      file: null,
      listLoading: false,
      imageUrl: "",
      ruleFormValue: {
        doShare: "",
        taskName: "",
        taskType: "",
        file: null,
        productId: 0,
        id: 0,
        taskImages: ""              
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
    this.ruleFormValue.id = this.$route.query.id;
    this.ruleFormValue.productId = this.$route.params.id;
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.listLoading = true;
      Request()
        .get("/api/product_task/get/" + this.ruleFormValue.id)
        .then(response => {          
          this.ruleFormValue.taskType = response.taskType;
          this.ruleFormValue.taskName = response.taskName;
          this.ruleFormValue.doShare = response.doShare;
          this.ruleFormValue.taskImages = response.taskImages;
          this.imageUrl = Urls.DOWNLOAD_URL();
          setTimeout(() => {
            this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(error => {});        
    },
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
          formData.append("taskName", this.ruleFormValue.taskName);
          formData.append("taskType", this.ruleFormValue.taskType);
          formData.append("productId", this.ruleFormValue.productId);
          if (this.file != null) formData.append("file", this.file);

          Request()
            .put("/api/product_task/update/" + this.ruleFormValue.id, formData)
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
