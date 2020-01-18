import Vue from "vue";
import Router from "vue-router";

import Home from "@/components/city/Home";
import RegulatoryRecord from "@/components/city/regulatoryRecord/RegulatoryRecord";
import RectificationDetails from "@/components/city/regulatoryRecord/RectificationDetails";
import RegulatoryRecordDetails from "@/components/city/regulatoryRecord/RegulatoryRecordDetails";
//溯源详情
import SweepCode from "@/components/city/sweepCode/sweepCode";
import RecognizeQR from "@/components/city/sweepCode/recognizeQR";
//生产标准
import ProductionPtandard from "@/components/city/productionStandard/ProductionPtandard";
//生产标准详情
import StandardDetails from "@/components/city/productionStandard/StandardDetails";
//企业信息
import EnterpriseInformation from "@/components/city/enterpriseInformation/EnterpriseInformation";
//企业详情
import CompanyDetails from "@/components/city/enterpriseInformation/CompanyDetails";
//诚信公示
import Sincerity from "@/components/city/sincerity/Sincerity";
//企业信息
import EnterpriseInformationEp from "@/components/enterprise/enterpriseInformation/EnterpriseInformationEp";
//企业详情
import CompanyDetailsEp from "@/components/enterprise/enterpriseInformation/CompanyDetailsEp";
//生产记录
import ProductionRecord from "@/components/enterprise/productionRecord/ProductionRecord";
//生产记录详情
import ProductionRecordDetails from "@/components/enterprise/productionRecord/ProductionRecordDetails";
//投入品使用
import InputsUse from "@/components/enterprise/inputsUse/InputsUse";
//投入品使用详情
import InputsUseDetails from "@/components/enterprise/inputsUse/InputsUseDetails";

Vue.use(Router);
export default new Router({
  routes: [{
      path: "/",
      name: "index",
      component: Home
    },
    {
      path: "/regulatoryRecord",
      name: "regulatoryRecord",
      component: RegulatoryRecord
    },
    //整改详情
    {
      path: "/rectificationDetails",
      name: "rectificationDetails",
      component: RectificationDetails
    },
    //监管记录详情
    {
      path: "/regulatoryRecordDetails",
      name: "regulatoryRecordDetails",
      component: RegulatoryRecordDetails
    },
    //生产标准
    {
      path: "/productionPtandard",
      name: "productionPtandard",
      component: ProductionPtandard
    },
    //生产标准详情
    {
      path: "/StandardDetails",
      name: "StandardDetails",
      component: StandardDetails
    },
    //企业信息
    {
      path: "/enterpriseInformation",
      name: "enterpriseInformation",
      component: EnterpriseInformation
    },
    //企业详情
    {
      path: "/companyDetails",
      name: "companyDetails",
      component: CompanyDetails
    },
    //诚信公示
    {
      path: "/sincerity",
      name: "sincerity",
      component: Sincerity
    },
    //溯源详情
    {
      path: "/sweepCode/:batchNumber",
      name: "sweepCode",
      component: SweepCode
    },
    {
      path: "/recognizeQR",
      name: "recognizeQR",
      component: RecognizeQR
    },
    //企业信息
    {
      path: "/enterpriseInformationEp",
      name: "EnterpriseInformationEp",
      component: EnterpriseInformationEp
    },
    //企业详情
    {
      path: "/companyDetailsEp",
      name: "CompanyDetailsEp",
      component: CompanyDetailsEp
    },
    //生产记录
    {
      path: "/productionRecord",
      name: "ProductionRecord",
      component: ProductionRecord
    },
    //生产记录详情
    {
      path: "/productionRecordDetails",
      name: "ProductionRecordDetails",
      component: ProductionRecordDetails
    },
    //投入品使用
    {
      path: "/inputsUse",
      name: "InputsUse",
      component: InputsUse
    },
    //投入品使用详情
    {
      path: "/inputsUseDetails",
      name: "InputsUseDetails",
      component: InputsUseDetails
    },

    { path: "*", redirect: "/", hidden: true }
  ]
});