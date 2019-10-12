<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">生产主体</el-breadcrumb-item>
        <el-breadcrumb-item>主营产品/定义等级</el-breadcrumb-item>
        <el-breadcrumb-item>添加品种</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" modal>
      <span>选择文件 !!!</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary" plain>取消</el-button>
      </span>
    </el-dialog>
     <div class="box">
      <el-form ref="ruleForm" :model="ruleFormValue" :rules="rules" label-width="100px">   
          <el-row>
              <el-col :span="6">
                <el-form-item label="是否共享">
                  <el-select v-model="filter_Share" placeholder="请选择是否共享">
                    <el-option  v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :selected = "filter_Share == 'item.value'">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>            
          </el-row>       
          <el-row>
          <el-col :span="6">
            <el-form-item label="等级名称">
              <el-input v-model="ruleFormValue.gradeName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="等级排序">
              <el-input v-model="ruleFormValue.gradeSort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="left-margin">
          <el-button type="success" plain @click="onSubmit('ruleForm')">保存</el-button>
          <el-button type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
     </div>
  </div>
</template>

<script>
import Request from "../../../../services/api/request.js";
import Auth from "../../../../services/authentication/auth";
export default{
    name:"addDefinitionLevel",
    data(){
        return {
            filter_Share: 0,
            dialogVisible:false,
            productId: -1,
            ruleFormValue:{
                varietyName: "",
                varietySort: "",
            },
            options: [        
                { value: 0, label: "否" },
                { value: 1, label: "是" },
            ],    
            rules:{
                varietyName:[{
                    required: true,
                    message: "请选择",
                    trigger: "change"
                }],
                varietySort:[{
                    required: true,
                    message: "请选择",
                    trigger: "change"
                }],
            },
        };
    },
    created(){
        this.productId = this.$route.params.id;      
    },
    methods:{
        onSubmit(formName){            
             this.$refs[formName].validate(valid => {
                if (valid) {
                    Request()
                    .post("/api/product_grade/create", {
                        "createTime": new Date().toJSON(),
                        "createUserId": Auth().user().attrs.id,
                        "doShare": this.filter_Share,
                        "gradeName": this.ruleFormValue.gradeName,
                        "gradeSort": this.ruleFormValue.gradeSort,
                        "id": 0,
                        "productId": this.productId,
                        "updateTime": new Date().toJSON(),
                        "updateUserId": Auth().user().attrs.id                       
                        })
                    .then(response => {
                        this.$router.go(-1);
                    })
                    .catch(error => {});
                } else {
                    console.log("错误 !!");
                    return false;
                }
            });
        },
    }
}
</script>