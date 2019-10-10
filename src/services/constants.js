let environment = "production";
// let environment = "local";

let Urls = {
	API_BASE_URL: () => {
		if (environment == "local") {
			return "http://intelligent-agriculture-funny-dingo.cfapps.io"
		} else if (environment == "production") {
			return "http://intelligent-agriculture-funny-dingo.cfapps.io"
		}
		return "NOTHING"
	},
	DOWNLOAD_URL: () => {
		return "http://intelligent-agriculture-funny-dingo.cfapps.io/api"
	}

};

let StorageKeys = {

	ACCESS_TOKEN_KEY: "access_token",

	REFRESH_TOKEN_KEY: "refresh_token"

};

export { Urls, StorageKeys };