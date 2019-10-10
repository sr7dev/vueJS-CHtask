<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/sampleCheck' }">例行抽样</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加结果</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">
      <el-form v-if="data" :rules="dataRulse" ref="data" :model="data">
        <div class="item-row">
          <el-form-item label="检测名称:" prop="sampleName">
            <el-input v-model="data.sampleName" style="width: 300px;" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label">检测时间:</div>
            <div class="item-value">
              <el-date-picker v-model="data.sampleTime" type="date" placeholder="date"></el-date-picker>
            </div>
          </div>
          <div class="item">
            <div class="item-label">检测人员:</div>
            <el-form-item prop="checkPerson">
              <el-input v-model="data.checkPerson" placeholder="" style="margin-top: 15px;"></el-input>
            </el-form-item>
          </div>

        </div>
        
        <div class="item-row">
          <div class="item">
            <div class="item-label">检测结果:</div>
            <el-form-item prop="checkResult">
              <el-select v-model="data.checkResult" placeholder="" style="margin-top: 15px;">
                <el-option v-for="item in [{value:0, label:'不合格'}, {value: 1, label:'合格'}]"
                  :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item">
            <div class="item-label">检测单位:</div>
            <el-form-item prop="checkUnit">
              <el-input v-model="data.checkUnit" placeholder="" style="margin-top: 15px;"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="item-row">
          <el-form-item prop="checkFiles">
            <div style="display: flex;">
              <div class="item-label">
                <input type="file" id="file" style="display: none" ref="file"
                       v-on:change="handleFileUpload()"/>
                <el-button plain @click="chooseFile()">添加附件</el-button>
              </div>
              <span class="item-value" style="width: 500px;">
                {{data.checkFiles}}
            </span>
            </div>
          </el-form-item>
        </div>
        <div class="item-row">
          <div class="item">
            <div class="item-label"></div>
            <div class="item-label">
              <el-button plain @click="onSubmit()">保存</el-button>
            </div>
            <div class="item-value">
              <el-button plain @click="$router.go(-1)">取消</el-button>
            </div>
          </div>
        </div>
      </el-form>
      <template v-if="!data">No matching data!</template>
    </div>
  </div>
</template>

<script>
import Request from '@/services/api/request'
export default {
  name: "addSampleCheckResult",
  data() {
    return {
      id: -1,
      file: null,
      data: {
        checkFiles: "",
        checkPerson: "",
        checkResult: '',
        checkUnit: '',
        createUserId: 0,
        id: 0,
        sampleId: 0,
        sampleName: "",
        sampleTime: new Date(),
        updateUserId: 0
      },
      dataRulse: {
        sampleName: [{required: true, message: '请输入', trigger: 'blur,change'}],
        checkPerson: [{required: true, message: '请输入', trigger: 'blur,change'}],
        checkFiles: [{required: true, message: '请输入', trigger: 'blur,change'}],
        checkResult: [{required: true, message: '请输入', trigger: 'blur,change'}],
        checkUnit: [{required: true, message: '请输入', trigger: 'blur,change'}],
      },
    };
  },
  methods: {
    chooseFile() {
      this.$refs.file.click();
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.data.checkFiles = this.file.name;
    },
    onSubmit() {
      let formData = new FormData();
      formData.append("checkFiles", this.data.checkFiles);
      formData.append("checkPerson", this.data.checkPerson);
      formData.append("createUserId", this.data.createUserId);
      formData.append("id", this.data.id);
      formData.append("sampleId", this.data.sampleId);
      formData.append("sampleName", this.data.sampleName);
      formData.append("updateUserId", this.data.updateUserId);
      formData.append("file", this.file);
      formData.append("sampleTime", this.data.sampleTime);
      formData.append("checkResult", this.data.checkResult);
      formData.append("checkUnit", this.data.checkUnit);
      formData.append("createTime", this.data.sampleTime); // not sure
      formData.append("updateTime", this.data.sampleTime); // not sure

      this.$refs.data.validate((valid) => {
        if (valid) {
          Request()
                  .post("/api/sample_check_result/create", formData)
                  .then(response => {
                    this.$router.push(`/sampleCheck`);
                  })
                  .catch(error => {
                    console.error(error);
                  });
        }
      });
    },
    getDateString(dt) {
      const date = new Date(dt);
      return date.toLocaleDateString();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./addSampleCheckResult.scss";
</style>
