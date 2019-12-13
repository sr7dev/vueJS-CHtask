import axios from 'axios';
import baseURL from '@/api'
import router from '@/router/index'
import Vue from 'vue'

let jsonFlag = true;
let header = 'application/json;charset=utf-8';
let loginUrl = '#';
let uploadFlag = false;

let http = axios.create({
  baseURL: baseURL,//请求头
  withCredentials: true,
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  transformRequest: [function (data) {
    if (!uploadFlag) {
      if (jsonFlag) {
        return JSON.stringify(data);
      } else {
        let newData = [];
        for (let k in data) {
          if (data.hasOwnProperty(k) === true) {
            newData.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
          }
        }
        return newData.join('&');
      }
    } else {
      return data;
    }
  }]
});
//  添加请求拦截器
http.interceptors.request.use(
  config => {
    console.log("2222");
    config.headers.token = localStorage.getItem('token');
    // config.headers.token ="Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU3MzUzNzM1OX0.zJX3rRr-YtHdttHdxRtzzIh6WEWeyad40OA4-4m7GceNQJStFiwd3D1dPg-Pao2z8aodKN8v7V0hZhoN5NHB0w"
    return config;
  },
  error => {
    console.log("0000");
    return Promise.reject(error);
  });

//添加response响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  console.log("响应拦截错误");
  // 响应头发生错误发生的操作
  if (error.response.status) {
    console.log(error.response.status + '报错');
    switch (error.response.status) {
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 500:
        // 清除token
        //localStorage.removeItem('token');
        router.replace({
          path: '/login'
        });
        Vue.prototype.$message.error("账号未登录!");
        break;
      case 502:
        // 清除token
        //localStorage.removeItem('token');
        router.replace({
          path: '/login'
        });
        Vue.prototype.$message.error("账号已过期!");
        break;
      case 503:
        // 清除token
        //localStorage.removeItem('token');
        router.replace({
          path: '/login'
        });
        Vue.prototype.$message.error("账号在其它地方登录!")
        break;
      // 其他错误，直接抛出错误提示
      default:
    }
    return Promise.reject(error.response);
  }
});

function apiAxios(method, url, params, downLoadFileFlag) {
  if (params && params.header && params.header['Content-Type'] == "application/x-www-form-urlencoded;charset=utf-8") {
    jsonFlag = false;
    uploadFlag = false;
    header = 'application/x-www-form-urlencoded;charset=utf-8';
  } else if (params && params.header && params.header['Content-Type'] == "multipart/form-data") {
    header = 'multipart/form-data';
    uploadFlag = true;
  } else {
    jsonFlag = true;
    uploadFlag = false;
    header = 'application/json;charset=utf-8'
  }
  var temHeader = {
    'Content-Type': header,
  };
  return new Promise((resolve, reject) => {
    console.log(4444);
    console.log(url);
    http({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' || method === 'DELETE' ? (params || {}).data : null,
      params: method === 'GET' ? (params || {}).data : null,
      headers: temHeader,
      responseType: downLoadFileFlag ? 'arraybuffer' : 'json'
    }).then((res) => {
      console.log("res=>", res);
      if (res.status == 200) {
        resolve(res.data);
      } else {
        reject(res.message);
      }
    }).catch(function (err) {
      console.log("err=>", err);
      if (err.response && err.response.status == 403) {
        location.href = loginUrl;
        sessionStorage.setItem("loginOut", true);
      } else {
        reject(err.message);
      }
    })
  })
}

export default {
  get(url, params, downLoadFileFlag) {
    console.log(url);
    console.log(params);
    return apiAxios('GET', url, params, downLoadFileFlag)
  },
  post(url, params, response, downLoadFileFlag) {
    return apiAxios('POST', url, params, downLoadFileFlag)
  },
  put(url, params, response) {
    return apiAxios('PUT', url, params)
  },
  delete(url, params, response) {
    return apiAxios('DELETE', url, params)
  }
}
