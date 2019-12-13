import api from './index.js';
export default {
  formatTime(date) {
    var date = new Date(date);
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Y + '-' + M + '-' + D;
  },
  formatTimeH(date) {
    var date = new Date(date);
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
  },
  dealStrToArray(val) {
    return val.split(",")
  },
  dealArrayToStr(val) {
    return val.join(",")
  },
  //排序从小到大
  sortSToL(arr, key) {
    return arr.sort((val1, val2) => {
      return val1[key] * 1 > val2[key] * 1
    });
  },
  /*--------Ajax--------*/
  //登录
  Login(url,req) {
    return new Promise((resolve, reject) => {
      console.log("登录=>"+url);
      console.log(req);
      api.post(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //监管记录
  supervisionRecord(url,req) {
    console.log("url",url)
    console.log("req",req)
    return new Promise((resolve, reject) => {
      console.log("url",url)
      console.log("req",req)
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //监管记录详情
  supervisionRecordDetails(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //整改记录详情
  rectificationRecordDetails(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //生产标准列表
  productionStandard(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //生产标准详情
  productionStandardDetails(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //企业信息列表
  enterpriseinformationList(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //获取乡镇列表
  tonwList(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //企业详情
  enterpriseinformationDetails(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },

  //获取诚信公示列表
  creditList(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //获取生产记录列表
  production_record(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //生产记录详情
  production_recordDetails(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
   //获取投入品使用列表
  inputsUse(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //获取采购信息列表
  inputsPurchase(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //获取投入品使用详情
  inputsUseDetails(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
  //获取采购详情
  inputsPurchaseDetails(url,req) {
    return new Promise((resolve, reject) => {
      api.get(url,{
        data: req
      }).then(response => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject(error)
      });
    })
  },
}
