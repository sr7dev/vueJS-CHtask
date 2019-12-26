<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>监管对象</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form ref="form" :model="form" label-width="150px" :rules="rules" class="data-form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="对象类型">
              <el-input style="width:100%" disabled :value="form.companyType==1?'企业':'农户'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="乡镇">
              <el-select v-model="form.townId" disabled>
                <el-option
                  v-for="(item, index) in townList"
                  :label="item.name"
                  :value="item.id"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行业">
              <el-select v-model="form.agriculturalClassification" disabled>
                <el-option
                  v-for="(item, index) in [
                    { value: '1', label: '养殖业' },
                    { value: '2', label: '畜牧业' },
                    { value: '3', label: '种植业' }
                  ]"
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-show="form.companyType == '1'">
          <el-row>
            <el-col :span="8">
              <el-form-item label="单位名称" prop="companyName">
                <el-input v-model="form.companyName" style="width:100%" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人" prop="chargePerson">
                <el-input v-model="form.chargePerson" style="width:100%" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址" prop="companyAddress">
                <el-input v-model="form.companyAddress" style="width:100%" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="data-group-border">
            <el-row>
              <el-col :span="2">
                <el-form-item label="种植"></el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品种">
                  <el-input v-model="form.productInfo.data_0_0" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植面积">
                  <el-input v-model="form.productInfo.data_0_1" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="（亩）"></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-form-item label="水产品"></el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品种">
                  <el-input v-model="form.productInfo.data_1_0" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植面积">
                  <el-input v-model="form.productInfo.data_1_1" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="（亩）"></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-form-item label="畜产品"></el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品种">
                  <el-input v-model="form.productInfo.data_2_0" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植面积">
                  <el-input v-model="form.productInfo.data_2_1" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="（头）"></el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-form-item label="禽产品"></el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品种">
                  <el-input v-model="form.productInfo.data_3_0" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植面积">
                  <el-input v-model="form.productInfo.data_3_1" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="（羽）"></el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="三品认证" prop="qualityStandardId">
                <el-input v-model="form.qualityStandardId" style="width:100%" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人" prop="contactPerson">
                <el-input v-model="form.contactPerson" style="width:100%" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人手机" prop="contactMobile">
                <el-input v-model="form.contactMobile" style="width:100%" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-show="form.companyType == '2'">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名" prop="companyName">
                <el-input v-model="form.companyName" style="width:100%" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式" prop="chargePerson">
                <el-input v-model="form.chargePerson" style="width:100%" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址" prop="companyAddress">
                <el-input v-model="form.companyAddress" style="width:100%" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="种养殖面积">
                <el-input v-model="form.companyName" style="width:100%" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="土地来源">
                <el-input v-model="form.chargePerson" style="width:100%" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="data-group-border">
            <el-row>
              <el-col :span="3">
                <el-form-item label="种植面积（亩）"></el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="稻麦">
                  <el-input v-model="form.productInfo.data_0_0" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="蔬菜">
                  <el-input v-model="form.productInfo.data_0_1" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="水果">
                  <el-input v-model="form.productInfo.data_0_2" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="食用菌">
                  <el-input v-model="form.productInfo.data_0_3" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-form-item label="水产品养殖面积（亩）"></el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="鱼">
                  <el-input v-model="form.productInfo.data_1_0" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="虾蟹">
                  <el-input v-model="form.productInfo.data_1_1" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="其他">
                  <el-input v-model="form.productInfo.data_1_2" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-form-item label="畜养殖规模（头）"></el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="猪">
                  <el-input v-model="form.productInfo.data_2_0" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="奶牛">
                  <el-input v-model="form.productInfo.data_2_1" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-form-item label="禽养殖规模（羽）"></el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="肉禽">
                  <el-input v-model="form.productInfo.data_3_0" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="蛋禽">
                  <el-input v-model="form.productInfo.data_3_1" style="width:100%" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="社会信用统一代码" prop="creditCode">
              <el-input v-model="form.creditCode" style="width:100%" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="企业荣誉">
              <el-input
                type="textarea"
                :rows="5"
                v-model="form.companyHonor"
                style="width:80%"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="备注">
              <el-input type="textarea" :rows="5" v-model="form.remarks" style="width:80%" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="是否监管" disabled>
              <el-select v-model="form.doSupervision" placeholder>
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in [{value: '1', label: '是'}, {value: '0', label:'否'}]"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button size="small" type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sampleData from "../_data";
import Request from "@/services/api/request";
export default {
  name: "detailsRegulatoryObject",
  data() {
    const defaultRule = [
      {
        required: true,
        message: "必填",
        trigger: "blur"
      }
    ];
    return {
      townList: [{ id: -1, name: "全部" }],
      form: {
        agriculturalClassification: 1,
        chargePerson: "",
        companyAddress: "",
        companyHonor: "",
        companyId: 0,
        companyName: "",
        companyType: "1",
        contactMobile: "",
        contactPerson: "",
        contactWay: "",
        createUserId: 0,
        creditCode: "",
        doSupervision: "",
        landSource: "",
        plantArea: 0,
        public_license: 0,
        public_punish: 0,
        qualityStandardId: 0,
        quality_standard: 0,
        remarks: "",
        townId: -1,
        updateUserId: 0,
        productInfo: {
          data_0_0: "",
          data_0_1: "",
          data_0_2: "",
          data_0_3: "",
          data_1_0: "",
          data_1_1: "",
          data_1_2: "",
          data_2_0: "",
          data_2_1: "",
          data_3_0: "",
          data_3_1: ""
        }
      },
      rules: {
        chargePerson: defaultRule,
        companyAddress: defaultRule,
        companyHonor: defaultRule,
        companyName: defaultRule,
        companyType: defaultRule,
        contactMobile: defaultRule,
        contactPerson: defaultRule,
        creditCode: defaultRule,
        doSupervision: defaultRule,
        landSource: defaultRule,
        plantArea: defaultRule,
        qualityStandardId: defaultRule,
        remarks: defaultRule
      },
      id: 0
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getCompanyInfo(this.id);
    this.getTownList();
  },
  methods: {
    getCompanyInfo(id) {
      Request()
        .get("/api/company_production/get/" + id)
        .then(response => {          
          this.form = response;
          this.form.productInfo = JSON.parse(response.productInfo);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTownList() {
      Request()
        .get("/api/town/all", {})
        .then(response => {
          this.townList = response;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./detailsRegulatoryObject.scss";
</style>