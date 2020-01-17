import Vue from "vue";
import Router from "vue-router";
import Storage from "store";

import Toast from "@/utils/toast";

const home = () =>
  import ("@/components/common/home");
const threeProductsCertification = () =>
  import ("@/components/threeProductsCertification/threeProductsCertification");
const addThreeProducts = () =>
  import ("@/components/threeProductsCertification/addThreeProducts/addThreeProducts");
const detailsThreeProducts = () =>
  import ("@/components/threeProductsCertification/detailsThreeProducts/detailsThreeProducts");
const regulatoryRecord = () =>
  import ("@/components/regulatoryRecord/regulatoryRecord");
const addRegulatoryRecord = () =>
  import ("@/components/regulatoryRecord/addRegulatoryRecord/addRegulatoryRecord");
const rectificationRecord = () =>
  import ("@/components/regulatoryRecord/rectificationRecord/rectificationRecord");
const detailsRegulatoryRecord = () =>
  import ("@/components/regulatoryRecord/detailsRegulatoryRecord/detailsRegulatoryRecord");
const commonWords = () =>
  import ("@/components/regulatoryRecord/commonWords/commonWords");
const management = () =>
  import ("@/components/management/management");
const businessProducts = () =>
  import ("@/components/management/businessProducts");
const companyDetails = () =>
  import ("@/components/management/companyDetails");
const redBlackList = () =>
  import ("@/components/redBlackList/redBlackList");
const disabilityCheck = () =>
  import ("@/components/disabilityCheck/disabilityCheck");
const workTask = () =>
  import ("@/components/workTask/workTask");
const addWorkTask = () =>
  import ("@/components/workTask/addWorkTask/addWorkTask");
const editWorkTask = () =>
  import ("@/components/workTask/editWorkTask/editWorkTask");
const addWorkTaskReport = () =>
  import ("@/components/workTask/addWorkTaskReport/addWorkTaskReport");
const detailWorkTaskReport = () =>
  import ("@/components/workTask/detailWorkTaskReport/detailWorkTaskReport");
const seed = () =>
  import ("@/components/seed/seed");
const uploadSeed = () =>
  import ("@/components/seed/uploadSeed/uploadSeed");
const detailSeed = () =>
  import ("@/components/seed/detailSeed/detailSeed");
const userManagement = () =>
  import ("@/components/userManagement/userManagement");
const registerUser = () =>
  import ("@/components/userManagement/registerUser/registerUser");
const editUser = () =>
  import ("@/components/userManagement/editUser/editUser");
const changePassword = () =>
  import ("@/components/userManagement/changePassword/changePassword");
const productionStandard = () =>
  import ("@/components/productionStandard/productionStandard");
const addProductionStandard = () =>
  import ("@/components/productionStandard/addProductionStandard/addProductionStandard");
const detailProductionStandard = () =>
  import ("@/components/productionStandard/detailProductionStandard/detailProductionStandard");
const editProductionStandard = () =>
  import ("@/components/productionStandard/editProductionStandard/editProductionStandard");
const shareFiles = () =>
  import ("@/components/shareFiles/shareFiles");
const addShareFiles = () =>
  import ("@/components/shareFiles/addShareFiles/addShareFiles");
const editShareFiles = () =>
  import ("@/components/shareFiles/editShareFiles/editShareFiles");
const detailShareFiles = () =>
  import ("@/components/shareFiles/detailShareFiles/detailShareFiles");
const specialCategory = () =>
  import ("@/components/specialCategory/specialCategory");

const creditRating = () =>
  import ("@/components/creditRating/creditRating");
const editRating = () =>
  import ("@/components/creditRating/editRating/editRating");
const detailsRating = () =>
  import ("@/components/creditRating/detailsRating/detailsRating");

const corporateCreditFile = () =>
  import ("@/components/corporateCreditFile/corporateCreditFile");
const adminPenaltyInfo = () =>
  import ("@/components/corporateCreditFile/adminPenaltyInfo/adminPenaltyInfo");
const adminLicenseInfo = () =>
  import ("@/components/corporateCreditFile/adminLicenseInfo/adminLicenseInfo");
const threeProduction = () =>
  import ("@/components/corporateCreditFile/threeProduction/threeProduction");
const ratingInfo = () =>
  import ("@/components/corporateCreditFile/ratingInfo/ratingInfo");

const productionSubject = () =>
  import ("@/components/productionSubject/productionSubject");
const addRegulatoryObject = () =>
  import ("@/components/productionSubject/addRegulatoryObject/addRegulatoryObject");
const editRegulatoryObject = () =>
  import ("@/components/productionSubject/editRegulatoryObject/editRegulatoryObject");
const detailsRegulatoryObject = () =>
  import ("@/components/productionSubject/detailsRegulatoryObject/detailsRegulatoryObject");
const supervisionGrid = () =>
  import ("@/components/supervisionGrid/supervisionGrid");
const manageSupervisionGrid = () =>
  import ("@/components/supervisionGrid/manageSupervisionGrid/manageSupervisionGrid");
const warehouseEnv = () =>
  import ("@/components/productionSubject/warehouseEnv/warehouseEnv");
const detailsWarehouse = () =>
  import ("@/components/productionSubject/warehouseEnv/detailsWarehouse/detailsWarehouse");
const viewWarehouse = () =>
  import ("@/components/productionSubject/warehouseEnv/viewWarehouse/viewWarehouse");
const addWarehouse = () =>
  import ("@/components/productionSubject/warehouseEnv/addWarehouse/addWarehouse");
const mainProduct = () =>
  import ("@/components/productionSubject/mainProduct/mainProduct");
const addMainProduct = () =>
  import ("@/components/productionSubject/mainProduct/addMainProduct/addMainProduct");
const editMainProduct = () =>
  import ("@/components/productionSubject/mainProduct/editMainProduct/editMainProduct");
const thirdPartySamplingRecord = () =>
  import ("@/components/productionSubject/mainProduct/thirdPartySamplingRecord/thirdPartySamplingRecord");
const addThirdPartySampling = () =>
  import ("@/components/productionSubject/mainProduct/thirdPartySamplingRecord/addThirdPartySampling/addThirdPartySampling");
const editThirdPartySampling = () =>
  import ("@/components/productionSubject/mainProduct/thirdPartySamplingRecord/editThirdPartySampling/editThirdPartySampling");
const productBatch = () =>
  import ("@/components/productionSubject/mainProduct/productBatch/productBatch");
const addProductBatch = () =>
  import ("@/components/productionSubject/mainProduct/productBatch/addProductBatch/addProductBatch");
const editProductBatch = () =>
  import ("@/components/productionSubject/mainProduct/productBatch/editProductBatch/editProductBatch");
const inventoryDynamics = () =>
  import ("@/components/productionSubject/mainProduct/inventoryDynamics/inventoryDynamics");
const varietyDefinition = () =>
  import ("@/components/productionSubject/varietyDefinition/varietyDefinition");
const addVarietyDefinition = () =>
  import ("@/components/productionSubject/varietyDefinition/addVarietyDefinition/addVarietyDefinition");
const editVarietyDefinition = () =>
  import ("@/components/productionSubject/varietyDefinition/editVarietyDefinition/editVarietyDefinition");
const addInventoryDynamics = () =>
  import ("@/components/productionSubject/mainProduct/inventoryDynamics/addInventoryDynamics/addInventoryDynamics");
const editInventoryDynamics = () =>
  import ("@/components/productionSubject/mainProduct/inventoryDynamics/editInventoryDynamics/editInventoryDynamics");
const definitionLevel = () =>
  import ("@/components/productionSubject/definitionLevel/definitionLevel");
const addDefinitionLevel = () =>
  import ("@/components/productionSubject/definitionLevel/addDefinitionLevel/addDefinitionLevel");
const editDefinitionLevel = () =>
  import ("@/components/productionSubject/definitionLevel/editDefinitionLevel/editDefinitionLevel");
const processDefinition = () =>
  import ("@/components/productionSubject/mainProduct/processDefinition/processDefinition");
const addProcessDefinition = () =>
  import ("@/components/productionSubject/mainProduct/processDefinition/addProcessDefinition/addProcessDefinition");
const editProcessDefinition = () =>
  import ("@/components/productionSubject/mainProduct/processDefinition/editProcessDefinition/editProcessDefinition");
const productProperty = () =>
  import ("@/components/productionSubject/mainProduct/productProperty/productProperty");
const addProductProperty = () =>
  import ("@/components/productionSubject/mainProduct/productProperty/addProductProperty/addProductProperty");
const editProductProperty = () =>
  import ("@/components/productionSubject/mainProduct/productProperty/editProductProperty/editProductProperty");
const customProductProperty = () =>
  import ("@/components/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/customProductProperty");
const addCustomProductProperty = () =>
  import ("@/components/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/addCustomProductProperty/addCustomProductProperty");
const editCustomProductProperty = () =>
  import ("@/components/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/editCustomProductProperty/editCustomProductProperty");
const threeProduct = () =>
  import ("@/components/productionSubject/threeProduct_ps/threeProduct");
const addThreeProduct = () =>
  import ("@/components/productionSubject/threeProduct_ps/addThreeProduct/addThreeProduct");

const companyBusiness = () =>
  import ("@/components/companyBusiness/companyBusiness");
const productBusiness = () =>
  import ("@/components/companyBusiness/productBusiness/productBusiness");
const addProductBusiness = () =>
  import ("@/components/companyBusiness/productBusiness/addProductBusiness/addProductBusiness");
const detailsCompanyBusiness = () =>
  import ("@/components/companyBusiness/detailsCompanyBusiness/detailsCompanyBusiness");

const sampleCheck = () =>
  import ("@/components/sampleCheck/sampleCheck");
const addSampleCheck = () =>
  import ("@/components/sampleCheck/addSampleCheck/addSampleCheck");
const addSampleCheckResult = () =>
  import ("@/components/sampleCheck/addSampleCheckResult/addSampleCheckResult");
const detailsSampleCheck = () =>
  import ("@/components/sampleCheck/detailsSampleCheck/detailsSampleCheck");
const detailsSampleCheckResult = () =>
  import ("@/components/sampleCheck/detailsSampleCheckResult/detailsSampleCheckResult");

const tracingLabelManagement = () =>
  import ("@/components/tracingLabelManagement/tracingLabelManagement");

const jobDefinition = () =>
  import ("@/components/jobDefinition/jobDefinition");
const addJobDefinition = () =>
  import ("@/components/jobDefinition/addJobDefinition/addJobDefinition");
const editJobDefinition = () =>
  import ("@/components/jobDefinition/editJobDefinition/editJobDefinition");
const productionRecord = () =>
  import ("@/components/productionRecord/productionRecord");
const addProductionRecord = () =>
  import ("@/components/productionRecord/addProductionRecord/addProductionRecord");
const editProductionRecord = () =>
  import ("@/components/productionRecord/editProductionRecord/editProductionRecord");

const notice = () =>
  import ("@/components/notice/notice");
const detailsNotice = () =>
  import ("@/components/notice/detailsNotice/detailsNotice");
const createNotice = () =>
  import ("@/components/notice/createNotice/createNotice");
const editNotice = () =>
  import ("@/components/notice/editNotice/editNotice");
const smsNotice = () =>
  import ("@/components/notice/smsNotice/smsNotice");
const detailSms = () =>
  import ("@/components/notice/detailSms/detailSms");

const aquaticStatistics = () =>
  import ("@/components/aquaticStatistics/aquaticStatistics");

const greenProducts = () =>
  import ("@/components/greenProducts/greenProducts");

const internalMessage = () =>
  import ("@/components/internalMessage/internalMessage");
const addInternalMessage = () =>
  import ("@/components/internalMessage/addInternalMessage/addInternalMessage");

const trainingFunds = () =>
  import ("@/components/trainingFunds/trainingFunds");
const addTrainingFunds = () =>
  import ("@/components/trainingFunds/addTrainingFunds/addTrainingFunds");
const viewTrainingFunds = () =>
  import ("@/components/trainingFunds/viewTrainingFunds/viewTrainingFunds");

const inputManagement = () =>
  import ("@/components/inputManagement/inputManagement");
const addInputPurchase = () =>
  import ("@/components/inputManagement/addInputManagement/addInputPurchase");
const addInputUse = () =>
  import ("@/components/inputManagement/addInputManagement/addInputUse");
const viewInputManagement = () =>
  import ("@/components/inputManagement/viewInputManagement/viewInputManagement");

import statisticsFarmers from "@/components/statisticsFarmers/statisticsFarmers";
import statisticsCredit from "@/components/statisticsCredit/statisticsCredit";
import statisticsSupervision from "@/components/statisticsSupervision/statisticsSupervision";
import statisticsTracing from "@/components/statisticsTracing/statisticsTracing";
import statisticsTracingCompany from "@/components/statisticsTracingCompany/statisticsTracingCompany";

import Auth from "@/services/authentication/auth";
Storage.set("creditMode", window.location.href.indexOf("creditMode"));
Vue.use(Router);
const router = window.location.href.indexOf("creditMode") < 0 ?
  new Router({
    routes: [{
        path: "/",
        name: "home",
        component: home,
        redirect: "productionSubject",
        beforeEnter(to, from, next) {
          if (!Auth().check())
            Toast.error("确认 accessToken, sign, timestamp!!!");
          else
            Auth()
            .check()
            .then(
              success => {
                next();
              },
              error => {
                console.log(error);
                Toast.error("Token 错误");
              }
            );
        },
        children: [{
            path: "/sampleCheckMain",
            name: "sampleCheckMain",
            component: sampleCheck
          },
          {
            path: "/sampleCheck/addSampleCheck",
            name: "addSampleCheck",
            component: addSampleCheck
          },
          {
            path: "/sampleCheck/addSampleCheckResult",
            name: "addSampleCheckResult",
            component: addSampleCheckResult
          },
          {
            path: "/sampleCheck/detailsSampleCheck/:id",
            name: "detailsSampleCheck",
            component: detailsSampleCheck
          },
          {
            path: "/sampleCheck/detailsSampleCheckResult/:id",
            name: "detailsSampleCheckResult",
            component: detailsSampleCheckResult
          },
          {
            path: "/tracingLabelManagement",
            name: "tracingLabelManagement",
            component: tracingLabelManagement
          },
          {
            path: "/companyBusiness",
            name: "companyBusiness",
            component: companyBusiness
          },
          {
            path: "/companyBusiness/productBusiness/:id",
            name: "productBusiness",
            component: productBusiness
          },
          {
            path: "/companyBusiness/productBusiness/create/:id",
            name: "addProductBusiness",
            component: addProductBusiness
          },
          {
            path: "/companyBusiness/detailsCompanyBusiness/:id",
            name: "detailsCompanyBusiness",
            component: detailsCompanyBusiness
          },
          {
            path: "/productionSubject",
            name: "productionSubject",
            component: productionSubject
          },
          {
            path: "/productionSubject/addRegulatoryObject",
            name: "addRegulatoryObject",
            component: addRegulatoryObject
          },
          {
            path: "/productionSubject/editRegulatoryObject/:id",
            name: "editRegulatoryObject",
            component: editRegulatoryObject
          },
          {
            path: "/productionSubject/detailsRegulatoryObject/:id",
            name: "detailsRegulatoryObject",
            component: detailsRegulatoryObject
          },

          {
            path: "/productionSubject/warehouseEnv/:id",
            name: "warehouseEnv",
            component: warehouseEnv
          },
          {
            path: "/productionSubject/warehouseEnv/detailsWarehouse/:id",
            name: "detailsWarehouse",
            component: detailsWarehouse
          },
          {
            path: "/productionSubject/warehouseEnv/viewWarehouse/:id",
            name: "viewWarehouse",
            component: viewWarehouse
          },
          {
            path: "/productionSubject/warehouseEnv/addWarehouse/:id",
            name: "addWarehouse",
            component: addWarehouse
          },
          {
            path: "/productionSubject/mainProduct/:id",
            name: "mainProduct",
            component: mainProduct
          },
          {
            path: "/productionSubject/mainProduct/create/:id",
            name: "addMainProduct",
            component: addMainProduct
          },
          {
            path: "/productionSubject/mainProduct/edit/:id",
            name: "editMainProduct",
            component: editMainProduct
          },
          {
            path: "/productionSubject/mainProduct/thirdPartySamplingRecord/:id",
            name: "thirdPartySamplingRecord",
            component: thirdPartySamplingRecord
          },
          {
            path: "/productionSubject/mainProduct/thirdPartySampling/create/:id",
            name: "addThirdPartySampling",
            component: addThirdPartySampling
          },
          {
            path: "/productionSubject/mainProduct/thirdPartySampling/edit/:id",
            name: "editThirdPartySampling",
            component: editThirdPartySampling
          },
          {
            path: "/productionSubject/mainProduct/productBatch/:id",
            name: "productBatch",
            component: productBatch
          },
          {
            path: "/productionSubject/mainProduct/productBatch/:id/create",
            name: "addProductBatch",
            component: addProductBatch
          },
          {
            path: "/productionSubject/mainProduct/productBatch/:id/edit/:id1",
            name: "editProductBatch",
            component: editProductBatch
          },
          {
            path: "/productionSubject/mainProduct/inventoryDynamics/:id",
            name: "inventoryDynamics",
            component: inventoryDynamics
          },
          {
            path: "/productionSubject/mainProduct/inventoryDynamics/addInventoryDynamics/:id",
            name: "addInventoryDynamics",
            component: addInventoryDynamics
          },
          {
            path: "/productionSubject/mainProduct/inventoryDynamics/editInventoryDynamics/:id",
            name: "editInventoryDynamics",
            component: editInventoryDynamics
          },
          {
            path: "/productionSubject/mainProduct/processDefinition/:id",
            name: "processDefinition",
            component: processDefinition
          },
          {
            path: "/productionSubject/mainProduct/processDefinition/addProcessDefinition/:id",
            name: "addProcessDefinition",
            component: addProcessDefinition
          },
          {
            path: "/productionSubject/mainProduct/processDefinition/editProcessDefinition/:id",
            name: "editProcessDefinition",
            component: editProcessDefinition
          },
          {
            path: "/productionSubject/mainProduct/productProperty/:id",
            name: "productProperty",
            component: productProperty
          },
          {
            path: "/productionSubject/mainProduct/productProperty/addProductProperty/:id",
            name: "addProductProperty",
            component: addProductProperty
          },
          {
            path: "/productionSubject/mainProduct/productProperty/editProductProperty/:id",
            name: "editProductProperty",
            component: editProductProperty
          },
          {
            path: "/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/:id",
            name: "customProductProperty",
            component: customProductProperty
          },
          {
            path: "/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/addCustomProductProperty/:id",
            name: "addCustomProductProperty",
            component: addCustomProductProperty
          },
          {
            path: "/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/editCustomProductProperty/:id",
            name: "editCustomProductProperty",
            component: editCustomProductProperty
          },
          {
            path: "/productionSubject/threeProduct",
            name: "threeProduct",
            component: threeProduct
          },
          {
            path: "/productionSubject/threeProduct/addThreeProduct",
            name: "addThreeProduct",
            component: addThreeProduct
          },
          {
            path: "/threeProductsCertification",
            name: "threeProductsCertification",
            component: threeProductsCertification
          },
          {
            path: "/threeProductsCertification/create",
            name: "addThreeProducts",
            component: addThreeProducts
          },
          {
            path: "/threeProductsCertification/:id",
            name: "detailsThreeProducts",
            component: detailsThreeProducts
          },
          {
            path: "/regulatoryRecord",
            name: "regulatoryRecord",
            component: regulatoryRecord
          },
          {
            path: "/regulatoryRecord/create",
            name: "addRegulatoryRecord",
            component: addRegulatoryRecord
          },
          {
            path: "/regulatoryRecord/edit/:id",
            name: "rectificationRecord",
            component: rectificationRecord
          },
          {
            path: "/regulatoryRecord/:id",
            name: "detailsRegulatoryRecord",
            component: detailsRegulatoryRecord
          },
          {
            path: "/commonWords",
            name: "commonWords",
            component: commonWords
          },
          {
            path: "/management",
            name: "management",
            component: management
          },
          {
            path: "/businessProducts",
            name: "businessProducts",
            component: businessProducts
          },
          {
            path: "/companyDetails",
            name: "companyDetails",
            component: companyDetails
          },
          {
            path: "/disabilityCheck",
            name: "disabilityCheck", // 农残检测
            component: disabilityCheck
          },
          {
            path: "/productionRecord",
            name: "productionRecord", // 生产记录
            component: productionRecord
          },
          {
            path: "/productionRecord/create",
            name: "addProductionRecord", // 生产记录
            component: addProductionRecord
          },
          {
            path: "/productionRecord/editProductionRecord/:id",
            name: "editProductionRecord", // 生产记录
            component: editProductionRecord
          },
          {
            path: "/notice",
            name: "notice", // 通知管理
            component: notice
          },
          {
            path: "/notice/view/:id",
            name: "detailsNotice", // 通知管理
            component: detailsNotice
          },
          {
            path: "/notice/create",
            name: "createNotice", // 通知管理
            component: createNotice
          },
          {
            path: "/notice/smsNotice/:id",
            name: "smsNotice", // 短信通知
            component: smsNotice
          },
          {
            path: "/notice/detailSms",
            name: "detailSms", // 短信记录
            component: detailSms
          },
          {
            path: "/aquatic",
            name: "aquaticStatistics", // 通知管理
            component: aquaticStatistics
          },
          {
            path: "/notice/edit/:id",
            name: "editNotice", // 通知管理
            component: editNotice
          },
          {
            path: "/jobDefinition",
            name: "jobDefinition", // 作业定义
            component: jobDefinition
          },
          {
            path: "/jobDefinition/create",
            name: "addJobDefinition", // 作业定义
            component: addJobDefinition
          },
          {
            path: "/jobDefinition/:id",
            name: "editJobDefinition", // 作业定义
            component: editJobDefinition
          },
          {
            path: "/productVariety/:id",
            name: "productVariety", // 作业定义
            component: varietyDefinition
          },
          {
            path: "/productVariety/create/:id",
            name: "addProductVariety", // 作业定义
            component: addVarietyDefinition
          },
          {
            path: "/productVariety/edit/:id",
            name: "editProductVariety", // 作业定义
            component: editVarietyDefinition
          },
          {
            path: "/statisticsFarmers",
            name: "statisticsFarmers", // 统计（农残）
            component: statisticsFarmers
          },
          {
            path: "/greenProducts",
            name: "greenProducts", // 绿色优质产品
            component: greenProducts
          },
          {
            path: "/internalMessage",
            name: "internalMessage", // 站内消息
            component: internalMessage
          },
          {
            path: "/internalMessage/add",
            name: "addInternalMessage", // 站内消息
            component: addInternalMessage
          },
          {
            path: "/inputManagement",
            name: "inputManagement", // 投入品管理
            component: inputManagement
          },
          {
            path: "/inputManagement/addPurchase",
            name: "addInputPurchase", // 投入品管理
            component: addInputPurchase
          },
          {
            path: "/inputManagement/addUse",
            name: "addInputUse", // 投入品管理
            component: addInputUse
          },
          {
            path: "/inputManagement/view/:id",
            name: "viewInputManagement", // 投入品管理
            component: viewInputManagement
          },
          {
            path: "/workTask",
            name: "workTask", // 工作任务
            component: workTask
          },
          {
            path: "/workTask/create",
            name: "addWorkTask", // 工作任务
            component: addWorkTask
          },
          {
            path: "/workTask/edit/:id",
            name: "editWorkTask", // 工作任务
            component: editWorkTask
          },
          {
            path: "/workTask/report/create",
            name: "addWorkTaskReport", // 工作任务
            component: addWorkTaskReport
          },
          {
            path: "/workTask/report/detail/:id",
            name: "detailWorkTaskReport", // 工作任务
            component: detailWorkTaskReport
          },
          {
            path: "/trainingFunds",
            name: "trainingFunds", // 培训经费管理
            component: trainingFunds
          },
          {
            path: "/trainingFunds/add",
            name: "addTrainingFunds", // 培训经费管理
            component: addTrainingFunds
          },
          {
            path: "/trainingFunds/view/:id",
            name: "viewTrainingFunds", // 培训经费管理
            component: viewTrainingFunds
          },
          {
            path: "/seed",
            name: "seed", // 种子管理
            component: seed
          },
          {
            path: "/seed/upload",
            name: "uploadSeed", // 种子管理
            component: uploadSeed
          },
          {
            path: "/seed/detail/:id",
            name: "detailSeed", // 种子管理
            component: detailSeed
          },
          {
            path: "/userManagement",
            name: "userManagement", // 用户管理
            component: userManagement
          },
          {
            path: "/userManagement/create",
            name: "registerUser", // 用户管理
            component: registerUser
          },
          {
            path: "/userManagement/edit/:id",
            name: "editUser", // 用户管理
            component: editUser
          },
          {
            path: "/userManagement/changePwd/:id",
            name: "changePassword", // 用户管理
            component: changePassword
          },
          {
            path: "/productionStandard",
            name: "productionStandard", // 生产标准
            component: productionStandard
          },
          {
            path: "/productionStandard/create",
            name: "addProductionStandard", // 生产标准
            component: addProductionStandard
          },
          {
            path: "/productionStandard/detail/:id",
            name: "detailProductionStandard", // 生产标准
            component: detailProductionStandard
          },
          {
            path: "/productionStandard/edit/:id",
            name: "editProductionStandard", // 生产标准
            component: editProductionStandard
          },
          {
            path: "/productionGrade/:id",
            name: "definitionLevel",
            component: definitionLevel
          },
          {
            path: "/productionGrade/create/:id",
            name: "addDefinitionLevel",
            component: addDefinitionLevel
          },
          {
            path: "/productionGrade/edit/:id",
            name: "editDefinitionLevel",
            component: editDefinitionLevel
          },
          {
            path: "/shareFiles",
            name: "shareFiles", // 共享文件editShareFiles
            component: shareFiles
          },
          {
            path: "/shareFiles/create",
            name: "addShareFiles", // 共享文件
            component: addShareFiles
          },
          {
            path: "/shareFiles/edit/:id",
            name: "editShareFiles", // 共享文件
            component: editShareFiles
          },
          {
            path: "/shareFiles/detail/:id",
            name: "detailShareFiles", // 共享文件
            component: detailShareFiles
          },
          {
            path: "/specialCategory",
            name: "specialCategory",
            component: specialCategory
          },
          {
            path: "/supervisionGrid",
            name: "supervisionGrid", // 监管网格
            component: supervisionGrid
          },
          {
            path: "/supervisionGrid/manage/:id",
            name: "manageSupervisionGrid", // 监管网格
            component: manageSupervisionGrid
          },
          {
            path: "/statisticsSupervision",
            name: "statisticsSupervision", // 上传情况
            component: statisticsSupervision
          },
          {
            path: "/statisticsTracing",
            name: "statisticsTracing", // 上传情况
            component: statisticsTracing
          },
          {
            path: "/statisticsTracingCompany",
            name: "statisticsTracingCompany", // 上传情况
            component: statisticsTracingCompany
          }
        ]
      },
      { path: "*", redirect: "/", hidden: true }
    ]
  }) :
  new Router({
    routes: [{
        path: "/",
        name: "home",
        component: home,
        redirect: "corporateCreditFile",
        beforeEnter(to, from, next) {
          if (!Auth().check())
            Toast.error("确认 accessToken, sign, timestamp!!!");
          else
            Auth()
            .check()
            .then(
              success => {
                next();
              },
              error => {
                console.log(error);
                Toast.error("Token 错误");
              }
            );
        },
        children: [{
            path: "/creditRating",
            name: "creditRating",
            component: creditRating
          },
          {
            path: "/creditRating/:id",
            name: "detailsRating",
            component: detailsRating
          },
          {
            path: "/creditRating/edit/:id",
            name: "editRating",
            component: editRating
          },
          {
            path: "/corporateCreditFile",
            name: "corporateCreditFile",
            component: corporateCreditFile
          },
          {
            path: "/corporateCreditFile/adminLicenseInfo/",
            name: "adminLicenseInfo",
            component: adminLicenseInfo
          },
          {
            path: "/corporateCreditFile/adminPenaltyInfo/",
            name: "adminPenaltyInfo",
            component: adminPenaltyInfo
          },
          {
            path: "/corporateCreditFile/ratingInfo",
            name: "ratingInfo",
            component: ratingInfo
          },
          {
            path: "/corporateCreditFile/threeProduction/",
            name: "threeProduction",
            component: threeProduction
          },
          {
            path: "/redBlackList",
            name: "redBlackList", // 红黑名单
            component: redBlackList
          },
          {
            path: "/statisticsCredit",
            name: "statisticsCredit", // 上传情况
            component: statisticsCredit
          }
        ]
      },
      { path: "*", redirect: "/", hidden: true }
    ]
  });
export default router;