<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">经营主体</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="box">      
        <template v-if="data">
          <div class="item-row">
            <div class="item">
              <div class="item-label">状态</div>
              <div class="item-value">{{data.approvalStatus}}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item">
              <div class="item-label">评级时间</div>
              <div class="item-value">{{data.gradeTime}}</div>
            </div>
            <div class="item">
              <div class="item-label">名称</div>
              <div class="item-value">{{data.approvalGrade}}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item">
              <div class="item-label">原信用评级</div>
              <div class="item-value">{{data.originalGrade}}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item">
              <div class="item-label">现信用评级</div>
              <div class="item-value">
                <el-select v-model="data.nowGrade" placeholder="请选择">
                  <el-option v-for="item in ['A级（守信）', 'B级（基本守信）', 'C级（失信）']" 
                  :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="item-row">
            <div class="item">
              <div class="item-label">评级单位</div>
              <div class="item-value">{{data.gradeUnit}}</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item">
              <div class="item-label">
                <input type="file" id="file" style="display: none" ref="file" v-on:change="handleFileUpload()"/>
                <el-button type="warning" plain @click="chooseFile()">保存修改</el-button>
              </div>
              <div class="item-value">{{data.creditCode}} </div>
              <div class="item-value" v-if="file"> ({{file.name}})</div>
            </div>
          </div>
          <div class="item-row">
            <div class="item">
              <div class="item-label">
                <el-button type="success" plain @click="saveChanges()">同意</el-button>
              </div>
              <div class="item-value">
                <el-button type="danger" plain @click="$router.go(-1)">拒绝</el-button>
              </div>
            </div>
          </div>
        </template>
        <template v-if="!data">
          No matching data!
        </template>
    </div>
  </div>
</template>

<script>
import sampleData from '../_data';
  export default {
    name: "EditRating",
    data() {
      return {
        id: -1,
        file: null,
        pageName: this.$route.name,
        datas: sampleData,
        data: null,
        options: ["A级（守信）", "B级（基本守信）", "C级（失信）"],
      }
    },
    created() {
      this.id = this.$route.params.id;
      const pos = this.datas.findIndex(i=> i.creditGradeId == this.id);
      if(pos >= 0) {
        this.data = this.datas[pos];
      }
    },
    methods: {
      chooseFile() {
        this.$refs.file.click();
      },
      handleFileUpload() {
        this.file = this.$refs.file.files[0];
        console.log(this.file);
      },
      saveChanges(event) {
        //event.preventDefault();
        var formData = new FormData();
        formData.append('test','df');
        if(this.file) {
          formData.append('file', this.file);
        }
        formData.append('data', this.data);

        console.log(formData.getAll('test'));

        // this.$router.go(-1);
      }
    },
  };
</script>

<style lang="scss">
@import "./editRating.scss";
</style>
