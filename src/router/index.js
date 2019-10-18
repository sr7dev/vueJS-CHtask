import Vue from "vue";
import Router from "vue-router";

import login from "@/components/login/login";
import home from "@/components/common/home";
import threeProductsCertification from "@/components/threeProductsCertification/threeProductsCertification";
import addThreeProducts from "@/components/threeProductsCertification/addThreeProducts/addThreeProducts";
import detailsThreeProducts from "@/components/threeProductsCertification/detailsThreeProducts/detailsThreeProducts";
import regulatoryRecord from "@/components/regulatoryRecord/regulatoryRecord";
import addRegulatoryRecord from "@/components/regulatoryRecord/addRegulatoryRecord/addRegulatoryRecord";
import rectificationRecord from "@/components/regulatoryRecord/rectificationRecord/rectificationRecord";
import detailsRegulatoryRecord from "@/components/regulatoryRecord/detailsRegulatoryRecord/detailsRegulatoryRecord";
import commonWords from "@/components/regulatoryRecord/commonWords/commonWords";
import management from "@/components/management/management";
import businessProducts from "@/components/management/businessProducts";
import companyDetails from "@/components/management/companyDetails";
import redBlackList from "@/components/redBlackList/redBlackList";
import disabilityCheck from "@/components/disabilityCheck/disabilityCheck";
import workTask from "@/components/workTask/workTask";
import addWorkTask from "@/components/workTask/addWorkTask/addWorkTask";
import editWorkTask from "@/components/workTask/editWorkTask/editWorkTask";
import addWorkTaskReport from "@/components/workTask/addWorkTaskReport/addWorkTaskReport";
import detailWorkTaskReport from "@/components/workTask/detailWorkTaskReport/detailWorkTaskReport";
import seed from "@/components/seed/seed";
import uploadSeed from "@/components/seed/uploadSeed/uploadSeed";
import detailSeed from "@/components/seed/detailSeed/detailSeed";
import userManagement from "@/components/userManagement/userManagement";
import registerUser from "@/components/userManagement/registerUser/registerUser";
import editUser from "@/components/userManagement/editUser/editUser";
import changePassword from "@/components/userManagement/changePassword/changePassword";
import productionStandard from "@/components/productionStandard/productionStandard";
import addProductionStandard from "@/components/productionStandard/addProductionStandard/addProductionStandard";
import detailProductionStandard from "@/components/productionStandard/detailProductionStandard/detailProductionStandard";
import editProductionStandard from "@/components/productionStandard/editProductionStandard/editProductionStandard";
import shareFiles from "@/components/shareFiles/shareFiles";
import addShareFiles from "@/components/shareFiles/addShareFiles/addShareFiles";
import editShareFiles from "@/components/shareFiles/editShareFiles/editShareFiles";
import detailShareFiles from "@/components/shareFiles/detailShareFiles/detailShareFiles";
import specialCategory from "@/components/specialCategory/specialCategory";

import creditRating from "@/components/creditRating/creditRating";
import editRating from "@/components/creditRating/editRating/editRating";
import detailsRating from "@/components/creditRating/detailsRating/detailsRating";

import corporateCreditFile from "@/components/corporateCreditFile/corporateCreditFile";
import adminPenaltyInfo from "@/components/corporateCreditFile/adminPenaltyInfo/adminPenaltyInfo";
import adminLicenseInfo from "@/components/corporateCreditFile/adminLicenseInfo/adminLicenseInfo";
import threeProduction from "@/components/corporateCreditFile/threeProduction/threeProduction";
import ratingInfo from "@/components/corporateCreditFile/ratingInfo/ratingInfo";

import productionSubject from "@/components/productionSubject/productionSubject";
import addRegulatoryObject from "@/components/productionSubject/addRegulatoryObject/addRegulatoryObject";
import editRegulatoryObject from "@/components/productionSubject/editRegulatoryObject/editRegulatoryObject";
import detailsRegulatoryObject from "@/components/productionSubject/detailsRegulatoryObject/detailsRegulatoryObject";
import supervisionGrid from "@/components/supervisionGrid/supervisionGrid"
import manageSupervisionGrid from "@/components/supervisionGrid/manageSupervisionGrid/manageSupervisionGrid"
import warehouseEnv from "@/components/productionSubject/warehouseEnv/warehouseEnv";
import detailsWarehouse from "@/components/productionSubject/warehouseEnv/detailsWarehouse/detailsWarehouse";
import viewWarehouse from "@/components/productionSubject/warehouseEnv/viewWarehouse/viewWarehouse";
import addWarehouse from "@/components/productionSubject/warehouseEnv/addWarehouse/addWarehouse";
import mainProduct from "@/components/productionSubject/mainProduct/mainProduct";
import thirdPartySamplingRecord from "@/components/productionSubject/mainProduct/thirdPartySamplingRecord/thirdPartySamplingRecord";
import addThirdPartySampling from "@/components/productionSubject/mainProduct/thirdPartySamplingRecord/addThirdPartySampling/addThirdPartySampling";
import editThirdPartySampling from "@/components/productionSubject/mainProduct/thirdPartySamplingRecord/editThirdPartySampling/editThirdPartySampling";
import productBatch from "@/components/productionSubject/mainProduct/productBatch/productBatch";
import inventoryDynamics from "@/components/productionSubject/mainProduct/inventoryDynamics/inventoryDynamics";
import varietyDefinition from "@/components/productionSubject/varietyDefinition/varietyDefinition";
import addVarietyDefinition from "@/components/productionSubject/varietyDefinition/addVarietyDefinition/addVarietyDefinition";
import editVarietyDefinition from "@/components/productionSubject/varietyDefinition/editVarietyDefinition/editVarietyDefinition";
import addInventoryDynamics from "@/components/productionSubject/mainProduct/inventoryDynamics/addInventoryDynamics/addInventoryDynamics";
import editInventoryDynamics from "@/components/productionSubject/mainProduct/inventoryDynamics/editInventoryDynamics/editInventoryDynamics";
import definitionLevel from "@/components/productionSubject/definitionLevel/definitionLevel";
import addDefinitionLevel from "@/components/productionSubject/definitionLevel/addDefinitionLevel/addDefinitionLevel";
import editDefinitionLevel from "@/components/productionSubject/definitionLevel/editDefinitionLevel/editDefinitionLevel";
import processDefinition from "@/components/productionSubject/mainProduct/processDefinition/processDefinition";
import addProcessDefinition from "@/components/productionSubject/mainProduct/processDefinition/addProcessDefinition/addProcessDefinition";
import editProcessDefinition from "@/components/productionSubject/mainProduct/processDefinition/editProcessDefinition/editProcessDefinition";
import productProperty from "@/components/productionSubject/mainProduct/productProperty/productProperty";
import addProductProperty from "@/components/productionSubject/mainProduct/productProperty/addProductProperty/addProductProperty";
import editProductProperty from "@/components/productionSubject/mainProduct/productProperty/editProductProperty/editProductProperty";
import customProductProperty from "@/components/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/customProductProperty";
import addCustomProductProperty from "@/components/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/addCustomProductProperty/addCustomProductProperty";
import editCustomProductProperty from "@/components/productionSubject/mainProduct/productProperty/editProductProperty/customProductProperty/editCustomProductProperty/editCustomProductProperty";
import threeProduct from "@/components/productionSubject/threeProduct_ps/threeProduct";
import addThreeProduct from "@/components/productionSubject/threeProduct_ps/addThreeProduct/addThreeProduct";


import companyBusiness from "@/components/companyBusiness/companyBusiness";
import productBusiness from "@/components/companyBusiness/productBusiness/productBusiness";
import addProductBusiness from "@/components/companyBusiness/productBusiness/addProductBusiness/addProductBusiness";
import detailsCompanyBusiness from "@/components/companyBusiness/detailsCompanyBusiness/detailsCompanyBusiness";

import sampleCheck from "@/components/sampleCheck/sampleCheck";
import addSampleCheck from "@/components/sampleCheck/addSampleCheck/addSampleCheck";
import addSampleCheckResult from "@/components/sampleCheck/addSampleCheckResult/addSampleCheckResult";
import detailsSampleCheck from "@/components/sampleCheck/detailsSampleCheck/detailsSampleCheck";
import detailsSampleCheckResult from "@/components/sampleCheck/detailsSampleCheckResult/detailsSampleCheckResult";

import jobDefinition from "@/components/jobDefinition/jobDefinition";
import addJobDefinition from "@/components/jobDefinition/addJobDefinition/addJobDefinition";
import editJobDefinition from "@/components/jobDefinition/editJobDefinition/editJobDefinition";
import productionRecord from "@/components/productionRecord/productionRecord";
import addProductionRecord from "@/components/productionRecord/addProductionRecord/addProductionRecord";
import editProductionRecord from "@/components/productionRecord/editProductionRecord/editProductionRecord";

import notice from "@/components/notice/notice";
import detailsNotice from "@/components/notice/detailsNotice/detailsNotice";
import createNotice from "@/components/notice/createNotice/createNotice";
import editNotice from "@/components/notice/editNotice/editNotice";

import aquaticStatistics from "@/components/aquaticStatistics/aquaticStatistics";
import statisticsFarmers from "@/components/statisticsFarmers/statisticsFarmers";

import greenProducts from "@/components/greenProducts/greenProducts";

import internalMessage from "@/components/internalMessage/internalMessage";
import addInternalMessage from "@/components/internalMessage/addInternalMessage/addInternalMessage";

import trainingFunds from "@/components/trainingFunds/trainingFunds";
import addTrainingFunds from "@/components/trainingFunds/addTrainingFunds/addTrainingFunds";
import viewTrainingFunds from "@/components/trainingFunds/viewTrainingFunds/viewTrainingFunds";

import inputManagement from "@/components/inputManagement/inputManagement";
import addInputPurchase from "@/components/inputManagement/addInputManagement/addInputPurchase";
import addInputUse from "@/components/inputManagement/addInputManagement/addInputUse";
import viewInputManagement from "@/components/inputManagement/viewInputManagement/viewInputManagement";
import uploadSituation from "@/components/uploadSituation/uploadSituation";

import Auth from "@/services/authentication/auth";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "home",
      component: home,
      redirect: "productionSubject",
      beforeEnter(to, from, next) {
        if (!Auth().check()) {
          next({
            path: "/login",
            query: { redirect: to.fullPath }
          });
        } else {
          next();
        }
      },
      children: [{
          path: "/sampleCheck",
          name: "sampleCheck",
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
          path: "/redBlackList",
          name: "redBlackList", // 红黑名单
          component: redBlackList
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
          path: "/uploadSituation",
          name: "uploadSituation", // 上传情况
          component: uploadSituation
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    { path: "*", redirect: "/", hidden: true }
  ]
});