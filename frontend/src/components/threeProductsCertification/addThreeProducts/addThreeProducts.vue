<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >三品认证</el-breadcrumb-item>
                <el-breadcrumb-item class="actived">添加认证</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="box">
            <el-form ref="form" :model="form" label-width="100px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="企业名称">
                          <el-autocomplete 
                            v-model="form.companyName"
                            :fetch-suggestions="querySearch_Company"
                            @select="handleSelect_Company"
                            :trigger-on-focus="true">
                          </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="产品名称">
                          <el-autocomplete 
                            v-model="form.productName"
                            :fetch-suggestions="querySearch_Product"
                            @select="handleSelect_Company"
                            :trigger-on-focus="true">
                          </el-autocomplete>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="认证类别">
                    <el-radio-group v-model="form.authType">
                        <el-radio label="无公害产品"></el-radio>
                        <el-radio label="绿色食品"></el-radio>
                        <el-radio label="有机食品"></el-radio>
                        <el-radio label="地理标志"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="认证类别">
                            <el-input v-model="form.certCategory"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="农业分类">
                          <el-select v-model="form.agriClass" placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="认证有效期" style="text-align: center">
                    <el-col :span="5">
                        <el-date-picker type="date" placeholder="" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">至</el-col>
                    <el-col :span="5">
                        <el-date-picker type="date" placeholder="" v-model="form.date2" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="产量">
                            <el-input v-model="form.yield"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                      <el-form-item>
                        <!-- <el-upload 
                          class="upload-demo"
                          multiple
                          :limit="3"
                         >
                          <el-button>添加附件</el-button>
                          <div slot="tip" class="el-upload__tip">请选择需要上传的文件...</div>
                        </el-upload> -->
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="success" @click="onSubmit" plain>保存</el-button>
                    <el-button type="danger" @click="goBack" plain>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "addThreeProducts",
        data(){
            return{
                form:{
                    companyName:'',
                    poductName:'',
                    authType:'',
                    certCategory: '',
                    agriClass: '',
                    date1: '',
                    date2:'',
                    yield: ''
                },
                companyNameList:[],
                productNameList:[],
                options: [
                  {value:"1", label:"test1" },
                  {value:"2", label:"test2" },
                  {value:"3", label:"test3" },
                  {value:"4", label:"test4" },
                ]
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            goBack() {
                this.$router.go(-1);
            },
             querySearch_Company(query, cb) {
                let companyNameList = this.companyNameList;
      
                let results = query ? companyNameList.filter(this.createFilter(query)) : companyNameList;
                let top10 = results.slice(0, 10);
               
                cb(top10); // number of things returned
              },
              querySearch_Product(query, cb) {
                let productNameList = this.productNameList;
      
                let results = query ? productNameList.filter(this.createFilter(query)) : productNameList;
                let top10 = results.slice(0, 10);
               
                cb(top10); // number of things returned
              },
              createFilter(query) {
                return (element) => {
                  return element.name.toLowerCase().includes(query.toLowerCase());
                };
              },
              loadAll1() {
                return [
                  { "name": "vue", "CREDIT_CODE": "1" }, 
                  { "name": "vuex", "CREDIT_CODE": "2" },
                  { "name": "vue-router", "CREDIT_CODE": "3" }, 
                  { "name": "vue-resource", "CREDIT_CODE": "4" }, 
                  { "name": "vue-resource", "CREDIT_CODE": "4" }, 
                  { "name": "vue-resource", "CREDIT_CODE": "4" }, 
                  { "name": "element", "CREDIT_CODE": "5" }, 
                ];
              },
              loadAll2() {
                return [
                  { "name": "vue", "PRODUCT_ID": "1" }, 
                  { "name": "vuex", "PRODUCT_ID": "2" },
                  { "name": "vue-router", "PRODUCT_ID": "3" }, 
                  { "name": "vue-resource", "PRODUCT_ID": "4" }, 
                  { "name": "vue-resource", "PRODUCT_ID": "4" },
                  { "name": "vue-resource", "PRODUCT_ID": "4" },
                  { "name": "vue-resource", "PRODUCT_ID": "4" },
                  { "name": "element", "PRODUCT_ID": "5" }, 
                ];
              },
              handleSelect_Company(item) {
                this.companyName = item.CREDIT_CODE;
                console.log(this.companyName);
              },
              handleSelect_Product(item) {
                this.productName = item.PRODUCT_ID;
                console.log(this.productName);
              }
        },
        mounted() {
          this.companyNameList = this.loadAll1();
          for(let el of this.companyNameList){
            el.value = el.name;
          }
          this.productNameList = this.loadAll2();
          for(let el of this.productNameList){
            el.value = el.name;
          }
        }
    }
</script>

<style scoped>

</style>
