let environment = "production";
// let environment = "local";

let Urls = {
	API_BASE_URL: () => {
		if (environment == "local") {
			return "http://192.168.2.191:8040"
		} else if (environment == "production") {
			return "http://192.168.2.191:8040"
		}
		return "NOTHING"
	}

};

let StorageKeys = {

	ACCESS_TOKEN_KEY: "access_token",

	REFRESH_TOKEN_KEY: "refresh_token"

};

export { Tokens, Urls, StorageKeys };