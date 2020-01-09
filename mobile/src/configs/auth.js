import * as _ from "lodash";
import Storage from "store";
import Request from "./request";
import { User } from "../models/user";
import TokenManager from "./token-manager";
import axios from "axios";

class Auth {
  constructor() {}

  /**
   * Singleton constructor
   * @return {Auth} this
   */

  static d() {
    return this.instance ? this.instance : (this.instance = new Auth());
  }

  /**
   * Set token to axios global header
   */
  setToken() {
    axios.defaults.headers.common["Authorization"] = TokenManager().accessToken;
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
    if (Storage.get("userData")) {
      return Storage.get("userData");
    }
    return null;
  }

  /**
   * Create and login user with response data
   * @param  {Object} data Response data
   * @return {Void}
   */
  createUserFrom(data) {
    // save or remove user's info
    const rememberStatus = Storage.get("isRemember");
    if (rememberStatus) {
      Storage.set("userName", data["userId"]);
    } else {
      if (data["userID"] == Storage.get("userName")) {
        Storage.remove("userName");
        Storage.remove("password");
      }
    }
    // save user's tokens
    TokenManager().accessToken =
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzMzMzMzMzMzOCIsImF1dGhvcml0aWVzIjoiW10iLCJleHAiOjE1NzUwMTY5Njd9.Or-sYUXJTIvo2GT0q5T-mxN10bgh9TUtwUmQzTSyZrwvOpLRL6S5h039zXE8_tmGQCO6DDsIv7panj3c_7elBQ";
    // // bind token to api request
    this.setToken();

    // // instantiate current user
    this.loggedInUser = User.create({
      id: data["id"],
      userId: data["userId"],
      userType: data["userType"],
      contactName: data["contactName"],
      contactPerson: data["contactPerson"],
      contactWay: data["contactWay"],
      createTime: data["createTime"],
      createUserId: data["createUserId"],
      creditCode: data["creditCode"],
      updateTime: data["updateTime"],
      updateUserId: data["updateUserId"],
      townId: data["townId"],
      companyId: data["companyId"]
    });
    // // save user locally
    //Storage.set("userData", JSON.stringify(this.loggedInUser.attrs));
    Storage.set("userData", JSON.stringify(this.loggedInUser));
  }

  /**
   * if error clear password and isremember from storage
   * @return {Void}
   */

  clearSavedData() {
    Storage.remove("password");
  }

  /**
   * Sign up a new user using data provider
   * @param  {Object} data Packaged data for creating new user
   * @return {Promise}      Response
   */
  signup(data) {
    return Request()
      .post("auth/signup", data, {}, true)
      .then(
        success => {
          this.createUserFrom(_.merge(success["data"], data));
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
    return Request()
      .post("auth/verify-host", data, {}, true)
      .then(
        success => {
          this.createUserFrom(_.merge(success["data"], data));
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
  //登录
  login(formData) {
    return Request()
      .post(
        "/api/user/login", {
          password: formData.password,
          username: formData.username
        }, {},
        true
      )
      .then(
        success => {
          this.createUserFrom(success);
          return Promise.resolve(success);
        },
        error => {
          this.clearSavedData();
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
    return Request()
      .post("auth/reset_password", { username: email })
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
      this.loggedInUser = null;

      // remove user tokens
      TokenManager().removeAccessToken();
      //TokenManager().removeRefreshToken();
    }
  }
}

export default () => {
  return Auth.d();
};