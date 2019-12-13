let domain = "http://intelligent-agriculture-agile-badger-pe.cfapps.io/api";

export default {
  BaseUrl: domain,
  //登录
  login: domain + "/user/login ",
  //获取乡镇列表
  tonwlist: domain + "/town/all",

  //监管记录
  supervision_record: domain + "/supervision_record/all",
  //监管记录详情
  supervision_recordDetails: domain + "/supervision_record/get/{id}",
  //整改记录详情

  //生产标准列表
  production_standard: domain + "/production_standard/all",
  //生产标准详情
  production_standardDetails: domain + "/production_standard/get/{id}",
  //获取产品
  product_production: domain + "/product_production/all",

  //企业信息列表
  company_productionAllList: domain + "/company_ production/getAllList",
  //企业详情
  company_productionDetails: domain + "/company_ production / get/{id}",

  //诚信公示列表
  getCreditList: domain + "/company_production/getCreditList",
  //企业名称
  enterpriseName: domain + "/company_production/name",

  //溯源扫码
  //产品批次
  product_batch: domain + "/product_batch/all",

  //生产记录列表
  production_record: domain + "/production_record/all",
  //生产记录详情
  production_recordDetails: domain + "/production_record/get/{id}",

  //投入品使用
  inputsUse: domain + "/inputsUse/all",
  //投入品使用详情
  inputsUseDetails: domain + "/inputsUse/get/{id}",
  //投入品采购
  inputsPurchase: domain + "/inputsPurchase/all",
  //投入品采购详情
  inputsPurchaseDetails: domain + "/inputsPurchase/get/{id}",
  //公示生产名称***
  company_production: domain + "/company_production/name"
};
