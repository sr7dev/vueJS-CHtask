import * as _ from 'lodash';
import Storage from 'store';
import Request from '../api/request';
import { User } from '../../models/user';
import TokenManager from './token-manager';
import axios from 'axios';

class Auth {

	constructor() { }

	/**
	 * Singleton constructor
	 * @return {Auth} this
	 */

	static d() {
		return this.instance ? this.instance : this.instance = new Auth;
	}

	/**
	 * Set token to axios global header
	 */
	setToken() {
		axios.defaults.headers.common['token'] = TokenManager().accessToken;
	}

	/**
	 * Whether a user has logged in
	 * @return {Boolean} 
	 */
	check() {
		return this.user() != null && Boolean(TokenManager().accessToken);
	}

	/**
	 * Retrieve details of loggedin user
	 * @return {Object} user data
	 */
	user() {
		if (this.loggedInUser) return this.loggedInUser;

		if (Storage.get('userData')) {
			return User.create(JSON.parse(Storage.get('userData')));
		}

		return null;
	}

	/**
	 * Create and login user with response data
	 * @param  {Object} data Response data
	 * @return {Void}      
	 */
	createUserFrom(data) {
		// save user's tokens
		TokenManager().accessToken = data['id_token'];
		TokenManager().refreshToken = data['refresh_token'];

		// bind token to api request
		this.setToken();

		// instantiate current user
		console.log(data['user_meta']);

		this.loggedInUser = User.create({
			'id': data['uid'],
			'first_name': data['user_meta']['first_name'],
			'last_name': data['user_meta']['last_name'],
			'email': data['user_meta']['email'],
			'is_provider': data['user_meta']['is_provider'],
			'profile_img_url': data['user_meta']['profile_img_url']
		});

		// save user locally
		Storage.set('userData', JSON.stringify(this.loggedInUser.attrs));
	}

	/**
	 * Sign up a new user using data provider
	 * @param  {Object} data Packaged data for creating new user
	 * @return {Promise}      Response
	 */
	signup(data) {
		return Request().post('auth/signup', data, {}, true)
			.then(
				success => {
					this.createUserFrom(
						_.merge(
							success['data'],
							data
						)
					);
					return Promise.resolve(success);
				},

				error => {
					return Promise.reject(error);
				}
			);
	}

	/**
	 * Verify a new host using data provider
	 * @param  {Object} data Packaged data for creating new user
	 * @return {Promise}      Response
	 */
	verifyHost(data) {
		return Request().post('auth/verify-host', data, {}, true)
			.then(
				success => {
					this.createUserFrom(
						_.merge(
							success['data'],
							data
						)
					);
					return Promise.resolve(success);
				},

				error => {
					return Promise.reject(error);
				}
			);
	}

	/**
	 * Login with email and password
	 * @param  {String} email    
	 * @param  {String} password 
	 * @return {Promise}          API response
	 */
	login(email, password) {
		return Request()
			.post('auth/login', {
				'username': email,
				'password': password
			}, {}, true).then(
				success => {
					this.createUserFrom(success['data']);
					return Promise.resolve(success);
				},
				error => {
					return Promise.reject(error);
				}
			);
	}

	/**
	 * Login admin with UID and target user UID
	 * @param  {String} uid    
	 * @param  {String} targetUser 
	 * @return {Promise}          API response
	 */
	adminLogin(uid, targetUser) {
		return Request()
			.post('auth/admin', {
				'uid': uid,
				'targetUser': targetUser
			}, {}, true).then(
				success => {
					this.createUserFrom(success['data']);
					return Promise.resolve(success);
				},
				error => {
					return Promise.reject(error);
				}
			);
	}

	/**
	 * Reset a user's password from email
	 * @param  {String} email Email of user
	 * @return {Promise}       API Response
	 */
	resetPassword(email) {
		return Request().post('auth/reset_password', { 'username': email })
			.then(
				success => {
					return Promise.resolve(success);
				},
				error => {
					return Promise.reject(error);
				}
			);
	}

	/**
	 * Logout the current user
	 * @return {void} 
	 */
	logout() {

		if (this.check()) {

			// remove logged in user
			this.loggedInUser = null

			// remove user tokens
			TokenManager().removeAccessToken();
			TokenManager().removeRefreshToken();
			this.setToken();
		}

	}

	/**
	 * Refresh access token for a new session
	 * @return {Promise} Response 
	 */
	refreshAccessToken() {

		return Request().post('auth/refresh_token', {
			'refresh_token': TokenManager().refreshToken
		}).then(
			success => {
				// update access token
				TokenManager().accessToken = success['data']['id_token'];
				this.setToken();
				return Promise.resolve();
			},
			error => {
				return Promise.reject(error);
			}
		)

	}

}

export default () => {

	return Auth.d();

};