<template>
    <div class="container">
        <div class="title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">监管对象</el-breadcrumb-item>
                <el-breadcrumb-item >三品认证</el-breadcrumb-item>
                <el-breadcrumb-item class="actived">添加认证</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="box">
            <el-form ref="form" :model="form" label-width="100px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="企业">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="产品名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="认证类别">
                    <el-radio-group v-model="form.name">
                        <el-radio label="无公害产品"></el-radio>
                        <el-radio label="绿色食品"></el-radio>
                        <el-radio label="有机食品"></el-radio>
                        <el-radio label="地理标志"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="认证类别">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="农业分类">
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
                </el-row>
                <el-form-item label="认证有效期" style="text-align: center">
                    <el-col :span="5">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="5">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="产量">
                            <el-input v-model="form.name"></el-input>
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
                    name:''
                }
            }
        }
    }
</script>

<style scoped>

</style>