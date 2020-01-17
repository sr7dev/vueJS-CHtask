import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/city/Login";
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

//企业  首页
import EnterpriseHome from "@/components/enterprise/EnterpriseHome";
//生产标准
import ProductionPtandardEp from "@/components/enterprise/ProductionPtandard/ProductionPtandardEp";
//生产标准详情
import StandardDetailsEp from "@/components/enterprise/ProductionPtandard/StandardDetailsEp";
//企业信息
import EnterpriseInformationEp from "@/components/enterprise/enterpriseInformation/EnterpriseInformationEp";
//企业详情
import CompanyDetailsEp from "@/components/enterprise/enterpriseInformation/CompanyDetailsEp";
//诚信公示
import SincerityEp from "@/components/enterprise/Sincerity/SincerityEp";
//生产记录
import ProductionRecord from "@/components/enterprise/productionRecord/ProductionRecord";
//生产记录详情
import ProductionRecordDetails from "@/components/enterprise/productionRecord/ProductionRecordDetails";
//投入品使用
import InputsUse from "@/components/enterprise/inputsUse/InputsUse";
//投入品使用详情
import InputsUseDetails from "@/components/enterprise/inputsUse/InputsUseDetails";
//投诉交流
import ComplaintCommunication from "@/components/enterprise/complaintCommunication/ComplaintCommunication";
//乡镇
import TowHome from "@/components/township/TowHome";
//监管记录
import RegulatoryRecordTow from "@/components/township/regulatoryRecordTow/RegulatoryRecord";
//整改记录详情
import RectificationDetailsTow from "@/components/township/regulatoryRecordTow/RectificationDetails";
//监管记录详情
import RegulatoryRecordDetailsTow from "@/components/township/regulatoryRecordTow/RegulatoryRecordDetails";
//生产标准
import ProductionPtandardTow from "@/components/township/productionStandardTow/ProductionPtandard";
//生产标准详情
import StandardDetailsTow from "@/components/township/productionStandardTow/StandardDetails";
//企业信息
import EnterpriseInformationTow from "@/components/township/enterpriseInformationTow/EnterpriseInformation";
//企业详情
import CompanyDetailsTow from "@/components/township/enterpriseInformationTow/CompanyDetails";
//诚信公示
import SincerityTow from "@/components/township/sincerityTow/Sincerity";
import Auth from "../configs/auth";
Vue.use(Router);
export default new Router({
  routes: [{
      path: "/",
      name: "index",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
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

    //企业
    //企业首页
    {
      path: "/enterpriseHome",
      name: "EnterpriseHome",
      component: EnterpriseHome
    },
    //生产标准
    {
      path: "/productionPtandardEp",
      name: "ProductionPtandardEp",
      component: ProductionPtandardEp
    },
    //生产标准详情
    {
      path: "/standardDetailsEp",
      name: "StandardDetailsEp",
      component: StandardDetailsEp
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
    //诚信公示
    {
      path: "/sincerityEp",
      name: "SincerityEp",
      component: SincerityEp
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
    //投诉交流
    {
      path: "/complaintCommunication",
      name: "ComplaintCommunication",
      component: ComplaintCommunication
    },

    //乡镇
    {
      path: "/homeTow",
      name: "Towhome",
      component: TowHome
    },
    //监管记录
    {
      path: "/regulatoryRecordTow",
      name: "regulatoryRecordTow",
      component: RegulatoryRecordTow
    },
    //整改详情
    {
      path: "/rectificationDetailsTow",
      name: "rectificationDetailsTow",
      component: RectificationDetailsTow
    },
    //监管记录详情
    {
      path: "/regulatoryRecordDetailsTow",
      name: "regulatoryRecordDetailsTow",
      component: RegulatoryRecordDetailsTow
    },
    //生产标准
    {
      path: "/productionPtandardTow",
      name: "productionPtandardTow",
      component: ProductionPtandardTow
    },
    //生产标准详情
    {
      path: "/standardDetailsTow",
      name: "standardDetailsTow",
      component: StandardDetailsTow
    },
    //企业信息
    {
      path: "/enterpriseInformationTow",
      name: "enterpriseInformationTow",
      component: EnterpriseInformationTow
    },
    //企业详情
    {
      path: "/companyDetailsTow",
      name: "companyDetailsTow",
      component: CompanyDetailsTow
    },
    //诚信公示
    {
      path: "/sincerityTow",
      name: "sincerityTow",
      component: SincerityTow
    },
    { path: "*", redirect: "/", hidden: true }
  ]
});