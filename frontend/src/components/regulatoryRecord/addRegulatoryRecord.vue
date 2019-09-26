<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">监管记录</el-breadcrumb-item>
                <el-breadcrumb-item >添加监管记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="box">
            <el-form ref="form" :model="form" label-width="250px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="">
                            <el-radio v-model="form.name" label="1">企业</el-radio>
                            <el-radio v-model="form.name" label="2">农户</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="乡镇">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="企业">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="选择日期">
                            <el-date-picker
                                    v-model="value2"
                                    align="right"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="检查人">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="">检查内容与结果</div>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="生产记录(种养殖档案)">
                            <el-radio v-model="form.name" label="1">有</el-radio>
                            <el-radio v-model="form.name" label="2">真实完整</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="农产品产地准出证明(销售记录)">
                            <el-radio v-model="form.name" label="1">有</el-radio>
                            <el-radio v-model="form.name" label="2">真实完整</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="农产品产投入品记录(进、销、使用)">
                            <el-radio v-model="form.name" label="1">有</el-radio>
                            <el-radio v-model="form.name" label="2">真实完整</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="检验记录">
                            <el-radio v-model="form.name" label="1">有</el-radio>
                            <el-radio v-model="form.name" label="2">真实完整</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="农产品产投入品记录(进、销、使用)">
                            <el-radio v-model="form.name" label="1">有</el-radio>
                            <el-radio v-model="form.name" label="2">真实完整</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="检验记录">
                            <el-radio v-model="form.name" label="1">有</el-radio>
                            <el-radio v-model="form.name" label="2">真实完整</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="禁用投入品及滥用添加剂行为">
                            <el-radio v-model="form.name" label="1">有</el-radio>
                            <el-radio v-model="form.name" label="2">无</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="三品一标使用">
                            <el-radio v-model="form.name" label="1">合规</el-radio>
                            <el-radio v-model="form.name" label="2">不合规</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="常用语">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="现场发现的其他问题">
                            <el-input
                                    type="textarea"
                                    :rows="3"
                                    placeholder="请输入内容"
                                    v-model="textarea">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="结论">
                            <el-radio v-model="form.result" label="1">合规</el-radio>
                            <el-radio v-model="form.result" label="2">不合规</el-radio>
                        </el-form-item>
                        <div v-if="form.result==2">
                            <el-form-item label="责令修改">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="建议处罚">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="其他处理">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </div>
                    </el-col >
                    <el-col :span="12">
                        <el-form-item label="现场图片">
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="签名">
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
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
        data(){
            return{
                form:{
                    name:'',
                    result:'1'
                },
                pickerOptions: {
                      disabledDate(time) {
                          return time.getTime() > Date.now();
                      },
                      shortcuts: [{
                          text: '今天',
                          onClick(picker) {
                              picker.$emit('pick', new Date());
                          }
                      }, {
                          text: '昨天',
                          onClick(picker) {
                              const date = new Date();
                              date.setTime(date.getTime() - 3600 * 1000 * 24);
                              picker.$emit('pick', date);
                          }
                      }, {
                          text: '一周前',
                          onClick(picker) {
                              const date = new Date();
                              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                              picker.$emit('pick', date);
                          }
                      }]
                  },
                value2: '',
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }
    }
</script>

<style scoped>

</style>