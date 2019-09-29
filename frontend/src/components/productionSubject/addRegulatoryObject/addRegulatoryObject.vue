<template>
  <div class="container">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/productionSubject' }">监管对象</el-breadcrumb-item>
        <el-breadcrumb-item class="actived">添加监管对象</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="box">
      <el-form ref="form" :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item >
              <el-radio v-model="form.companyType" label="1">企业</el-radio>
              <el-radio v-model="form.companyType" label="2">农户</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="对象类型">
              <el-input v-model="form.companyType" style="width:60%" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="乡镇">
              <el-input v-model="form.townShip" style="width:60%" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="行业">
              <el-select v-model="form.agriculturalClassification">
                <el-option v-for="(item, index) in [{value:0, label:'养殖业'}, {value:1, label:'畜牧业'}, {value:2, label: '种植业'}]"                 
                    :label="item.label" :value="item.value" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-show="form.companyType == '1'">
          <el-row>
            <el-col :span="6">
              <el-form-item label="单位名称">
                <el-input v-model="form.companyName" style="width:60%"></el-input>
                <span>必填</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="负责人">
                <el-input v-model="form.chargePerson" style="width:60%"></el-input>
                <span>必填</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="地址">
                <el-input v-model="form.companyAddress" style="width:60%"></el-input>
                <span>必填</span>
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
                  <el-input v-model="form.productInfo.data_0_0" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植面积">
                  <el-input v-model="form.productInfo.data_0_1" style="width:60%"></el-input>
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
                  <el-input v-model="form.productInfo.data_1_0" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植面积">
                  <el-input v-model="form.productInfo.data_1_1" style="width:60%"></el-input>
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
                  <el-input v-model="form.productInfo.data_2_0" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植面积">
                  <el-input v-model="form.productInfo.data_2_1" style="width:60%"></el-input>
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
                  <el-input v-model="form.productInfo.data_3_0" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植面积">
                  <el-input v-model="form.productInfo.data_3_1" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="（羽）"></el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="6">
              <el-form-item label="三品认证">
                <el-input v-model="form.qualityStandardId" style="width:60%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系人">
                <el-input v-model="form.contactPerson" style="width:60%"></el-input>
                <span>必填</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系人手机">
                <el-input v-model="form.contactMobile" style="width:60%"></el-input>
                <span>必填</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div v-show="form.companyType == '2'">
          <el-row>
            <el-col :span="6">
              <el-form-item label="姓名">
                <el-input v-model="form.companyName" style="width:60%"></el-input>
                <span>必填</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系方式">
                <el-input v-model="form.chargePerson" style="width:60%"></el-input>
                <span>必填</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="地址">
                <el-input v-model="form.companyAddress" style="width:60%"></el-input>
                <span>必填</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="种养殖面积">
                <el-input v-model="form.companyName" style="width:60%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="土地来源">
                <el-input v-model="form.chargePerson" style="width:60%"></el-input>
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
                  <el-input v-model="form.productInfo.data_0_0" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="蔬菜">
                  <el-input v-model="form.productInfo.data_0_1" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="水果">
                  <el-input v-model="form.productInfo.data_0_2" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="食用菌">
                  <el-input v-model="form.productInfo.data_0_3" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-form-item label="水产品养殖面积（亩）"></el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="鱼">
                  <el-input v-model="form.productInfo.data_1_0" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="虾蟹">
                  <el-input v-model="form.productInfo.data_1_1" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="其他">
                  <el-input v-model="form.productInfo.data_1_2" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-form-item label="畜养殖规模（头）"></el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="猪">
                  <el-input v-model="form.productInfo.data_2_0" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="奶牛">
                  <el-input v-model="form.productInfo.data_2_1" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <el-form-item label="禽养殖规模（羽）"></el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="肉禽">
                  <el-input v-model="form.productInfo.data_3_0" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="蛋禽">
                  <el-input v-model="form.productInfo.data_3_1" style="width:60%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="社会信用统一代码">
              <el-input v-model="form.creditCode" style="width:60%"></el-input>
              <span>必填</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="企业荣誉">
              <el-input type="textarea" :rows="5" v-model="form.companyHonor" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="备注">
              <el-input type="textarea" :rows="5" v-model="form.remarks" style="width:80%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="是否监管">
              <el-select v-model="form.doSupervision" placeholder="">
                <el-option :label="item" :value="item" v-for="(item, index) in ['是', '否']" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item >
          <el-button type="success" plain @click="onSubmit">保存</el-button>
          <el-button type="danger" plain v-on:click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Request from '@/services/api/request'
export default {
  name: "addRegulatoryObject",
  data() {
    return {
      form: {
        townShip: "梅里镇",
        agriculturalClassification: '养殖业',
        chargePerson: "",
        companyAddress: "梅李镇赵市村",
        companyHonor: "",
        companyId: 1,
        companyName: "稻米专业合作社",
        companyType: "1",
        contactMobile: "",
        contactPerson: "程晓刚",
        contactWay: "0512-52380296",
        createTime: "",
        createUserId: "",
        creditCode: "sdf",
        doSupervision: "",
        landSource: "",
        plantArea: "",
        productInfo: {
          data_0_0: '',
          data_0_1: '',
          data_0_2: '',
          data_0_3: '',
          data_1_0: '',
          data_1_1: '',
          data_1_2: '',
          data_2_0: '',
          data_2_1: '',
          data_3_0: '',
          data_3_1: '',
        },
        qualityStandardId: "",
        remarks: "",
        townId: "",
        updateTime: "",
        updateUserId: ""
      },
    };
  },
  methods: {
    onSubmit() {
      // const data = JSON.parse(JSON.stringify(this.form));
      Request().post('/api/company_production/create', 
        // {
        //   agriculturalClassification: this.form.agriculturalClassification,
        //   "creditCode": "string",
        //   "companyId": 0,
        //   "companyType": "string",
        //   "chargePerson": "string",
        //   "companyAddress": "string",
        //   "companyHonor": "string",
        //   "companyName": "string",
        //   "contactMobile": "string",
        //   "contactPerson": "string",
        //   "contactWay": "string",
        //   "createTime": "2019-09-28T01:39:26.863Z",
        //   "createUserId": 0,
        //   "doSupervision": "string",
        //   "landSource": "string",
        //   "plantArea": 0,
        //   "productInfo": "string",
        //   "public_license": 0,
        //   "public_punish": 0,
        //   "qualityStandardId": 0,
        //   "quality_standard": 0,
        //   "remarks": "string",
        //   "updateTime": "2019-09-28T01:39:26.863Z",
        //   "townId": 0,
        //   "updateUserId": 0
        // }
      ).then(res => {
        console.log(res);
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./addRegulatoryObject.scss";
</style>