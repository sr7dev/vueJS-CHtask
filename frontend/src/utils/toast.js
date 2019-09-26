import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';

class Toast {

	/**
	 * Toast a success message
	 * @param  {String} message  Message to show
	 * @param  {Number} duration Millisecs to show
	 * @return {Void}          
	 */
	static success(message, duration = 2500) {
		alertify.notify(message, 'success', duration/1000)

	}

	/**
	 * Toast an error message
	 * @param  {String} message  Message to show
	 * @param  {Number} duration Millisecs to show
	 * @return {Void}          
	 */
	static error(message, duration = 2500) {
		alertify
			.alert('Oops...', message, function () {
			});
	}

	/**
	 * Toast a message
	 * @param  {String} message  Message to show
	 * @return {Void}          
	 */
	static message(message) {
		alertify
			.alert('PARQYT', message, function () {});
	}

	/**
	 * Toast an login message       
	 */
	static auth() {
		alertify
			.alert('Login Required', 'Please login, the details of this parking lot will be shown after login', function () {
			});
	}

}

export default Toast