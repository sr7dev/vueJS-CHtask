let environment = "production";

let Urls = {
  API_BASE_URL: () => {

    if (environment == "local") {
      return "http://118.31.54.197:8040/agricultural_product_monitor";
    } else if (environment == "production") {
      return "http://118.31.54.197:8040/agricultural_product_monitor";
    }

    return "NOTHING"
  },
  DOWNLOAD_URL: () => {
    return "http://118.31.54.197:8040/agricultural_product_monitor/api";
  }
};

let StorageKeys = {
  ACCESS_TOKEN_KEY: "access_token",

  REFRESH_TOKEN_KEY: "refresh_token"
};

export { Urls, StorageKeys };