import axios from 'axios';
import { Urls } from '../constants';
import EventBus from '../../utils/event';
import TokenManager from '../authentication/token-manager';

const http = axios;

class Request {

	/**
	 * Singleton constructor
	 * @return {Request} this
	 */
	static d() {
		return this.instance ? this.instance : this.instance = new Request;
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
			options['params'] = params;

			if (this.authToken) {
				options['params'] = Object.assign(options['params'], this.authToken)
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
			options['params'] = params;

			if (this.authToken) {
				options['params'] = Object.assign(options['params'], this.authToken);
			}
		}

		return this.makeRequest(method, url, options, false, norefresh);
	}

	makeRequest(method, url, options, refreshed = false, norefresh = false) {
		console.log('heressss');
		console.log(http.defaults.headers);
		return http[method](this.baseUrl(url), options)
			.then(
				success => {
					let response = success.data;

					// if (response['status'] === 'error') {
					// 	// TODO: Implement norefresh on backend side for endpoints 
					// 	// that makes no sense to refresh like login, signup
					// 	if (!refreshed && !norefresh && response['authenticated'] === false) {
					// 		console.log('token error', response);

					// 		// refresh access token and send request again.
					// 		return this.refreshAccessToken()
					// 			.then(
					// 				success => {
					// 					console.log('Refreshed the auth token successfully.');
					// 					return this.makeRequest(method, url, options, true);
					// 				},
					// 				error => {
					// 					// notify to resign-in
					// 					console.log('Failed to refresh the auth token...', error);
					// 					EventBus().publish('App.authTokenExpired');
					// 					return Promise.reject({});
					// 				}
					// 			);
					// 	}

					// 	return Promise.reject(response);
					// }
					return Promise.resolve(response);
					// if (response['status'] === 'success') {
					// 	return Promise.resolve(response);
					// }

					// return Promise.reject({
					// 	status: 'error',
					// 	message: 'No status value set!'
					// })
				},

				error => {
					return Promise.reject({
						status: 'error',
						message: 'Internal server error',
						data: {
							error
						}
					});
				}
			);
	}

	// TODO: Refactor auth token refresh logic
	// refreshAccessToken() {
	// 	//Check whether there's refresh token set or not.
	// 	if (!TokenManager().refreshToken) {
	// 		return Promise.reject('no refresh token');
	// 	}

	// 	return http['post'](this.baseUrl('auth/refresh_token'), {
	// 		'refresh_token': TokenManager().refreshToken
	// 	}).then(
	// 		success => {
	// 			// update access token
	// 			TokenManager().accessToken = success['data']['id_token'];
	// 			axios.defaults.headers.common['token'] = TokenManager().accessToken;
	// 			return Promise.resolve();
	// 		},
	// 		error => {
	// 			return Promise.reject(error);
	// 		}
	// 	)
	// }

	get(url, params = {}) {
		return this.request('get', url, params);
	}

	post(url, data, params = {}, norefresh = false) {
		return this.request('post', url, params, data, norefresh);
	}

	put(url, data, params = {}) {
		return this.request('put', url, params, data);
	}

	delete(url, params = {}) {
		return this.request('delete', url, params);
	}
}

export default () => {
	return Request.d();
};
