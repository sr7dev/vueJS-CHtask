import axios from "axios";
import { Urls } from "./constants";
import TokenManager from "./token-manager";

const http = axios;

class Request {
  /**
   * Singleton constructor
   * @return {Request} this
   */
  static d() {
    return this.instance ? this.instance : (this.instance = new Request());
  }

  /**
   * Get the API request url with base url
   * @param  {String} url Url for request
   * @return {String}     Final url
   */
  baseUrl(url) {
    return Urls.API_BASE_URL() + url;
  }
  /**
   * Initiate a HTTP request
   * @param  {String} method Http verb
   * @param  {String} url    Partial url of api url
   * @param  {Object} params Query strings
   * @param  {Object} data   Post body
   * @return {Promise}       Response
   */
  request(method, url, params = {}, data = {}, norefresh = false) {
    let options = {};

    if (method.toLowerCase() == "get") {
      options["params"] = params;

      if (this.authToken) {
        options["params"] = Object.assign(options["params"], this.authToken);
      }
    }

    if (method.toLowerCase() == "post") {
      options = data;
      if (this.authToken) {
        options = Object.assign(options, this.authToken);
      }
    }

    if (method.toLowerCase() == "put") {
      options = data;

      if (this.authToken) {
        options = Object.assign(options, this.authToken);
      }
    }

    if (method.toLowerCase() == "delete") {
      options["params"] = params;

      if (this.authToken) {
        options["params"] = Object.assign(options["params"], this.authToken);
      }
    }
    return this.makeRequest(method, url, options, false, norefresh);
  }
  //

  makeRequest(method, url, options, refreshed = false, norefresh = false) {
    // if (url.indexOf("/api/user/login") == -1) {
    if (url.indexOf("/api/user/getAuthByAliToken") == -1) {
      http.defaults.headers.common[
        "Authorization"
      ] = TokenManager().accessToken; //设置token
    }
    if (url.indexOf("/userAuthList") != -1) {
      http.defaults.headers.common["accessToken"] = TokenManager().authToken;
    }
    return http[method](this.baseUrl(url), options).then(
      success => {
        let response = success.data;
        return Promise.resolve(response);
      },
      error => {
        console.log(error);
        return Promise.reject({
          status: "error",
          message: "错误的用户名或密码!",
          data: {
            error
          }
        });
      }
    );
  }

  get(url, params = {}) {
    return this.request("get", url, params);
  }

  post(url, data, params = {}, norefresh = false) {
    return this.request("post", url, params, data, norefresh);
  }

  put(url, data, params = {}) {
    return this.request("put", url, params, data);
  }

  delete(url, params = {}) {
    return this.request("delete", url, params);
  }
}

export default () => {
  return Request.d();
};
