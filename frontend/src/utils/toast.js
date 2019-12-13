import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';

class Toast {

  /**
   * Toast a success message
   * @param  {String} message  Message to show
   * @param  {Number} duration Millisecs to show
   * @return {Void}          
   */
  static success(message, duration = 2500) {
    alertify.notify(message, 'success', duration / 1000)

  }

  /**
   * Toast an error message
   * @param  {String} message  Message to show
   * @param  {Number} duration Millisecs to show
   * @return {Void}          
   */
  static error(message, duration = 2500) {
    alertify
      .alert('错误', message, function() {}).set('label', '取 消');
  }

  /**
   * Toast a message
   * @param  {String} message  Message to show
   * @return {Void}          
   */
  static message(message) {
    alertify
      .alert('注意', message, function() {});
  }

  /**
   * Toast an login message       
   */
  static auth() {
    alertify
      .alert('需要登录', '请登录，登录后将显示停车场的详细信息。', function() {});
  }

}

export default Toast