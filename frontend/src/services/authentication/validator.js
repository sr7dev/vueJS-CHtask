/**
 * Authentication related validators
 */
export default class AuthValidator {

  static validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // return object with status and message
  static validatePassword(password) {

    if (!/^(?=.*[a-z])/.test(password)) {
      return {
        status: false,
        message: 'Password should have at least one lowercase letter.'
      }
    }

    if (!/^(?=.*[A-Z])/.test(password)) {
      return {
        status: false,
        message: 'Password should have at least one uppercase letter.'
      }
    }

    if (!/^(?=.*\d)/.test(password)) {
      return {
        status: false,
        message: 'Password should have at least one digit.'
      }
    }

    if (password.length < 6) {
      return {
        status: false,
        message: 'Password length should be at least 10 characters.'
      }
    }

    return {
      status: true,
      message: 'Valid password'
    }
  }
}