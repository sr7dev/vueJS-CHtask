<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">生产主体</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="单价">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="评级">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产地">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="品种">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规格">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品介绍" style="text-align: center">
              <el-input
                v-model="form.name"
                type="textarea"
                :rows="5"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="是否有机" style="text-align: center">
              <el-radio v-model="form.radio" label="1">是</el-radio>
              <el-radio v-model="form.radio" label="2">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="success" plain>保存</el-button>
          <el-button type="danger" plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        radio: "1"
      }
    };
  }
};
</script>

<style scoped>
.formBox {
  width: 60%;
  padding: 60px 60px 40px 60px;
  box-sizing: border-box;
  border: 1px solid #eee;
  margin-bottom: 22px;
}
</style>