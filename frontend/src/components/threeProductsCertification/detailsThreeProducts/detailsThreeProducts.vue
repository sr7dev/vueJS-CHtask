<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >三品认证</el-breadcrumb-item>
                <el-breadcrumb-item class="actived">认证详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="box">
            <el-form label-width="100px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="企业名称">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="产品名称">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="认证类别">
                    <el-radio-group>
                        <el-radio label="无公害产品"></el-radio>
                        <el-radio label="绿色食品"></el-radio>
                        <el-radio label="有机食品"></el-radio>
                        <el-radio label="地理标志"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="认证类别">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="农业分类">
                            <el-select v-model="agriClass" placeholder="请选择">
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
                        <el-date-picker type="date" placeholder="" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">至</el-col>
                    <el-col :span="5">
                        <el-date-picker type="date" placeholder="" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="产量">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item>
                            <!-- <el-upload     //temp
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
                    <el-button type="danger" @click="goBack" plain>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
  import sampleData from "../_data.js";
    export default {
        name: "detailsThreeProducts",
        data(){
            return{
              id: -1,
              pageName: this.$route.name,
              datas: sampleData,
							data: null,
							agriClass:'',
							options: [
									{value:"1", label:"test1" },
									{value:"2", label:"test2" },
									{value:"3", label:"test3" },
									{value:"4", label:"test4" },
							]
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        },
        created() {
          this.id = this.$route.params.id;
          const pos = this.datas.findIndex(i=> i.creditGradeId == this.id);
          if(pos >= 0) {
            this.data = this.datas[pos];
          }
        }
    }
</script>

<style scoped>

</style>