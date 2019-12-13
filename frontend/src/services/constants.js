let environment = "production";
// let environment = "local";

let Urls = {
  API_AUTH_URL: () => {
    return process.env.VUE_APP_AUTH_API;
  },
  API_BASE_URL: () => {
    if (environment == "local") {
      return process.env.VUE_APP_API;
    } else if (environment == "production") {
      return process.env.VUE_APP_API;
    }

    return "NOTHING";
  },
  DOWNLOAD_URL: () => {
    return process.env.VUE_APP_DOWNLOAD;
  }
};

let StorageKeys = {
  AUTH_TOKEN_KEY: "auth_token",
  ACCESS_TOKEN_KEY: "access_token",
  REFRESH_TOKEN_KEY: "refresh_token"
};

export { Urls, StorageKeys };