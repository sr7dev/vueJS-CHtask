/*
 * @Author: your name
 * @Date: 2019-12-01 17:25:22
 * @LastEditTime: 2019-12-01 17:26:30
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /mobile/src/services/constants.js
 */
let environment = "production";
// let environment = "local";

let Urls = {
  API_BASE_URL: () => {
    if (environment == "local") {
      return process.env.VUE_APP_API
    } else if (environment == "production") {
      return process.env.VUE_APP_API
    }

    return "NOTHING"
  },
  DOWNLOAD_URL: () => {
    return process.env.VUE_APP_DOWNLOAD
  }
};

// let StorageKeys = {

//   ACCESS_TOKEN_KEY: "access_token",

//   REFRESH_TOKEN_KEY: "refresh_token"

// };

// export {
//   Urls,
//   StorageKeys
// };

export {
  Urls
};